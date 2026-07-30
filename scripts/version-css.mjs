// Carimba um hash de conteudo no nome dos CSS gerados.
//
// Por que: o Turbopack nomeia os chunks de forma estavel (derivada do modulo,
// nao do conteudo). Dois builds com CSS diferente saem com o MESMO nome de
// arquivo — e como servimos `_next/static` com cache longo, o Cloudflare segue
// entregando a versao antiga por semanas. Foi exatamente o que aconteceu com o
// basePath do GitHub Pages vazando pro build de dominio proprio: a origem ja
// estava corrigida e o site continuava quebrado.
//
// Renomeia `<nome>.css` -> `<nome>.<hash8>.css` e reescreve as referencias.
import { createHash } from "node:crypto";
import { readdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = "out";
const cssDirectory = join(outputDirectory, "_next", "static", "chunks");
const REWRITABLE = /\.(html|js|json|txt|css)$/;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

const cssFiles = (await readdir(cssDirectory)).filter(
  (name) => name.endsWith(".css") && !/\.[a-f0-9]{8}\.css$/.test(name),
);

if (cssFiles.length) {
  const renames = [];

  for (const name of cssFiles) {
    const path = join(cssDirectory, name);
    const content = await readFile(path);
    const hash = createHash("sha256").update(content).digest("hex").slice(0, 8);
    const versioned = name.replace(/\.css$/, `.${hash}.css`);
    await rename(path, join(cssDirectory, versioned));
    renames.push([name, versioned]);
  }

  const files = await walk(outputDirectory);
  let touched = 0;

  await Promise.all(
    files
      .filter((path) => REWRITABLE.test(path))
      .map(async (path) => {
        const original = await readFile(path, "utf8");
        let updated = original;
        for (const [from, to] of renames) {
          updated = updated.split(from).join(to);
        }
        if (updated !== original) {
          await writeFile(path, updated);
          touched += 1;
        }
      }),
  );

  console.log(
    `[version-css] ${renames.length} css versionado(s), ${touched} arquivo(s) reescrito(s)`,
  );
}
