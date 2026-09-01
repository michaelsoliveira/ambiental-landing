import type { Metadata } from "next";

import { ProjetosGrid } from "@/components/sections/ProjetosGrid";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getLandingContent } from "@/lib/content/get-landing-content";
import { getLocalLandingContent } from "@/lib/content/providers/local";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Uma amostra dos trabalhos técnicos que a Ambiental Consultoria já entregou para clientes no Amapá e no Brasil.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjetosPage() {
  const content = await getLandingContent();
  // Payloads remotos (ambiental-system) ainda podem não ter este campo — cai no fallback local.
  const projetos = content.projetos ??
    getLocalLandingContent().projetos ?? {
      eyebrow: "Nosso trabalho",
      title: "Projetos",
      description: "",
      items: [],
    };

  return (
    <>
      <Header content={content.header} servicos={content.solucoes.items} />
      <main className="site-main-offset flex-1">
        <section className="bg-neutral-900 px-6 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-micro font-semibold uppercase text-primary-400">
              {projetos.eyebrow}
            </p>
            <h1 className="mt-3 text-h1 text-white">{projetos.title}</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-neutral-300">
              {projetos.description}
            </p>
          </div>
        </section>

        <ProjetosGrid items={projetos.items} categorias={content.solucoes.items} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
