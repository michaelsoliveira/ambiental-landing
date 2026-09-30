import { LandingSections } from "@/components/LandingSections";
import { DraftModeBanner } from "@/components/shared/DraftModeBanner";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getLandingContent } from "@/lib/content/get-landing-content";

/**
 * O conteúdo vem da API em tempo de requisição. A URL do CMS não existe
 * durante o `docker build`, então a página não pode ser pré-renderizada na imagem.
 */

export default async function Home() {
  const content = await getLandingContent();

  return (
    <>
      <DraftModeBanner preview={content.meta.preview} />
      <Header
        content={content.header}
        servicos={content.solucoes.items}
        overHero={content.hero.layout === "immersive"}
      />
      <main className="flex-1">
        <LandingSections content={content} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
