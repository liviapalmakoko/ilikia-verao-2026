import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "./cookie-banner";

const isStaticExport =
  process.env.STATIC_EXPORT === "true" || process.env.GITHUB_PAGES === "true";
const basePath = isStaticExport
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "/ilikia-verao-2026")
  : "";
// Dominio final do deploy (canonical/OG). Em dominio proprio, passar
// NEXT_PUBLIC_SITE_URL no build.
const publicUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://liviapalmakoko.github.io/ilikia-verao-2026";
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
        url: `${publicUrl}/og.jpg`,
        width: 1200,
        height: 627,
        alt: "Corpo & Alma Brasileira - Protocolos de Verão 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${publicUrl}/og.jpg`],
  },
};

// Tracking global ILIKIA/AICONIQ — Pixel + GA4 + CAPI (server-side) via gateway.
// O `__TRK__` so declara a config; quem dispara e o t.js, carregado pelo
// CookieBanner (opt-out). ga4Id vazio: a marca ILIKIA ainda nao tem GA4.
const TRK_CONFIG = {
  brand: "ilikia",
  pixelId: "666277432116339",
  ga4Id: "",
  collect: "https://track-ilikia.koko.ag/collect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* O hero e o LCP e vem de background-image no CSS — sem preload, o
            browser so descobre a imagem depois de baixar e casar o CSS. */}
        <link
          rel="preload"
          as="image"
          href={`${basePath}/assets/hero-oficial-mobile.webp`}
          media="(max-width: 900px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={`${basePath}/assets/hero-oficial.webp`}
          media="(min-width: 901px)"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__TRK__=${JSON.stringify(TRK_CONFIG)};`,
          }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${TRK_CONFIG.pixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
