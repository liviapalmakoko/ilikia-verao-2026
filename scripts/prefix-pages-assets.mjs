import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = "out";
// Mesmo basePath do next.config.ts. Vazio (dominio proprio) = nada a prefixar.
const repositoryBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? "/ilikia-verao-2026";
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
