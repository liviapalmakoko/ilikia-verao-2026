import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = "out";
// Mesmo basePath do next.config.ts. Vazio (dominio proprio) = nada a prefixar.
// O default e VAZIO de proposito: se a variavel nao chegar aqui, o build sai
// sem prefixo (e o Pages quebra de forma obvia) em vez de sair com o prefixo do
// Pages carimbado num deploy de dominio proprio — que quebra silenciosamente,
// so no CSS, e passa por qualquer smoke test que cheque arquivo por arquivo.
const repositoryBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPathPattern = /url\((["']?)\/(assets|fonts)\//g;

async function prefixCssAssets(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        await prefixCssAssets(path);
        return;
      }

      if (!entry.name.endsWith(".css")) {
        return;
      }

      const css = await readFile(path, "utf8");
      const prefixedCss = css.replace(
        assetPathPattern,
        `url($1${repositoryBasePath}/$2/`,
      );

      if (prefixedCss !== css) {
        await writeFile(path, prefixedCss);
      }
    }),
  );
}

if (repositoryBasePath) {
  await prefixCssAssets(outputDirectory);
}
