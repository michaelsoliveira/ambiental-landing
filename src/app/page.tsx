import { LandingSections } from "@/components/LandingSections";
import { DraftModeBanner } from "@/components/shared/DraftModeBanner";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getLandingContent } from "@/lib/content/get-landing-content";

/** Conteúdo vem do CMS — nunca servir HTML estático antigo. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
