import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Corpo & Alma Brasileira | Protocolos de Verão 2026";
  const description =
    "Protocolos que unem ciência, tecnologia e experiência clínica para transformar o verão da sua clínica.";

  return {
    title,
    description,
    icons: {
      icon: { url: "/favicon-ilikia.png", type: "image/png", sizes: "64x64" },
      shortcut: "/favicon-ilikia.png",
      apple: { url: "/apple-touch-icon-ilikia.png", sizes: "180x180" },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: `${origin}/og.png`,
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
      images: [`${origin}/og.png`],
    },
  };
}

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
