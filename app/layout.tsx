import type { Metadata } from "next";
import "./globals.css";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/ilikia-verao-2026" : "";
const publicUrl = "https://liviapalmakoko.github.io/ilikia-verao-2026";
const title = "Corpo & Alma Brasileira | Protocolos de Verão 2026";
const description =
  "Protocolos que unem ciência, tecnologia e experiência clínica para transformar o verão da sua clínica.";

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title,
  description,
  icons: {
    icon: {
      url: `${basePath}/favicon-ilikia.png`,
      type: "image/png",
      sizes: "64x64",
    },
    shortcut: `${basePath}/favicon-ilikia.png`,
    apple: {
      url: `${basePath}/apple-touch-icon-ilikia.png`,
      sizes: "180x180",
    },
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    url: publicUrl,
    images: [
      {
        url: `${publicUrl}/og.png`,
        width: 1800,
        height: 943,
        alt: "Corpo & Alma Brasileira - Protocolos de Verão 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${publicUrl}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
