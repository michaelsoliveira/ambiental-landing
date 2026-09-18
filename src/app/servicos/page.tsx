import type { Metadata } from "next";

import { ServicosDetail } from "@/components/sections/ServicosDetail";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getLandingContent } from "@/lib/content/get-landing-content";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Consultoria técnica completa em segurança do trabalho, meio ambiente e engenharia, adaptada à realidade da sua operação.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServicosPage() {
  const content = await getLandingContent();

  return (
    <>
      <Header content={content.header} servicos={content.solucoes.items} />
      <main className="site-main-offset flex-1">
        <section className="bg-neutral-900 px-6 py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-micro font-semibold uppercase text-primary-400">
              O que fazemos
            </p>
            <h1 className="mt-3 text-h1 text-white">Nossos Serviços</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-justify text-neutral-300">
              Consultoria técnica completa em segurança do trabalho, meio ambiente e
              engenharia, adaptada à realidade da sua operação.
            </p>
          </div>
        </section>

        <ServicosDetail items={content.solucoes.items} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
