import type { NextConfig } from "next";

// STATIC_EXPORT liga o export estatico (GITHUB_PAGES continua valendo como
// alias, pra nao quebrar o workflow do Pages que ja usa essa variavel).
const isStaticExport =
  process.env.STATIC_EXPORT === "true" || process.env.GITHUB_PAGES === "true";

// No GitHub Pages o site vive em /<repo>/; em dominio proprio
// (ilikia-verao.koko.ag) a raiz e "/" — dai o basePath ser configuravel.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/ilikia-verao-2026";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
        typescript: {
          tsconfigPath: "tsconfig.pages.json",
        },
      }
    : {}),
};

export default nextConfig;
