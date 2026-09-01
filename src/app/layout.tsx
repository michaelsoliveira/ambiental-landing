import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.ambientalconsultoria.com.br";
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
  description: siteDescription,
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ambiental Consultoria e Serviços Ambientais e Segurança do Trabalho",
  url: siteUrl,
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
