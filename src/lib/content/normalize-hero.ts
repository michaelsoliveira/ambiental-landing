import type { HeroContent, HeroSlide } from "@/lib/content/schema";

/** Conteúdo hero com slides sempre resolvidos (legado → slide único). */
export type NormalizedHeroContent = HeroContent & { slides: HeroSlide[] };

export function buildLegacyHeroSlide(hero: HeroContent): HeroSlide {
  return {
    id: "legacy",
    eyebrow: hero.eyebrow,
    headline: hero.headline,
    subheadline: hero.subheadline,
    ctas: hero.ctas,
    media: hero.media,
  };
}

export function normalizeHeroContent(hero: HeroContent): NormalizedHeroContent {
  const rawSlides =
    hero.slides && hero.slides.length > 0
      ? hero.slides
      : [buildLegacyHeroSlide(hero)];

  const isImmersive = hero.layout === "immersive";
  const slides = rawSlides.map((slide) => {
    if (!isImmersive || slide.media.kind !== "image") return slide;
    if (slide.media.motion === "none") return slide;
    return {
      ...slide,
      media: { ...slide.media, motion: "none" as const },
    };
  });

  return { ...hero, slides };
}
