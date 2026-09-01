import type { Metadata } from "next";

import { Container } from "@/components/shared/Container";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getLandingContent } from "@/lib/content/get-landing-content";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade e tratamento de dados pessoais da Ambiental Consultoria, em conformidade com a LGPD.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PoliticaDePrivacidadePage() {
  const content = await getLandingContent();

  return (
    <>
      <Header content={content.header} servicos={content.solucoes.items} />
      <main className="site-main-offset flex-1 py-16 lg:py-20">
        <Container className="max-w-3xl">
          <h1 className="text-h1 text-neutral-900">Política de Privacidade</h1>
          <div className="mt-6 space-y-4 text-body text-neutral-700">
            <p>
              A Ambiental Consultoria e Serviços Ambientais e Segurança do Trabalho trata os
              dados pessoais coletados neste site em conformidade com a Lei Geral de Proteção de
              Dados (LGPD — Lei nº 13.709/2018).
            </p>
            <p>
              Os dados informados no formulário de contato (nome, empresa, e-mail, telefone,
              serviço de interesse e mensagem) são utilizados exclusivamente para retorno
              comercial e não são compartilhados com terceiros sem consentimento.
            </p>
            <p>
              Conteúdo completo desta política a ser detalhado com a equipe jurídica antes da
              publicação em produção.
            </p>
          </div>
        </Container>
      </main>
      <Footer content={content.footer} />
    </>
  );
}
