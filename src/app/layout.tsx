import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteName = "Ambiental Consultoria";
const siteDescription =
  "Consultoria ambiental e segurança do trabalho com portal próprio para acompanhar licenciamento, laudos, programas obrigatórios e indicadores em tempo real.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Consultoria Ambiental e Segurança do Trabalho`,
    template: "%s | Ambiental Consultoria",
  },
  description: siteDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: `${siteName} — Consultoria Ambiental e Segurança do Trabalho`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: ["/og/cover.png"],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Consultoria Ambiental e Segurança do Trabalho`,
    description: siteDescription,
    images: ["/og/cover.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ambiental Consultoria e Serviços Ambientais e Segurança do Trabalho",
  url: siteUrl,
  logo: `${siteUrl}/apple-touch-icon.png`,
  image: `${siteUrl}/apple-touch-icon.png`,
  description: siteDescription,
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ambiental Consultoria e Serviços Ambientais e Segurança do Trabalho",
  url: siteUrl,
  logo: `${siteUrl}/apple-touch-icon.png`,
  areaServed: "BR",
  serviceType: [
    "Consultoria Ambiental",
    "Licenciamento Ambiental",
    "Segurança do Trabalho",
    "Laudos Técnicos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
