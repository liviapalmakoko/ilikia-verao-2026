import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryBasePath = "/ilikia-verao-2026";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: repositoryBasePath,
        assetPrefix: repositoryBasePath,
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
