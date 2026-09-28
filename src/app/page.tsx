import { LandingSections } from "@/components/LandingSections";
import { DraftModeBanner } from "@/components/shared/DraftModeBanner";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { getLandingContent } from "@/lib/content/get-landing-content";

/**
 * ISR curto — publish no CMS chama /api/revalidate.
 * Preview (draftMode) continua fresco via getLandingContent.
 */
export const revalidate = 120;

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
