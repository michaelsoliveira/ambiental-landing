import { normalizeHeroContent } from "@/lib/content/normalize-hero";
import type { HeroContent } from "@/lib/content/types";

import { HeroImmersive } from "./hero/HeroImmersive";
import { HeroSplit } from "./hero/HeroSplit";

type Props = {
  content: HeroContent;
};

export function Hero({ content }: Props) {
  const hero = normalizeHeroContent(content);

  if (hero.layout === "immersive") {
    return <HeroImmersive content={hero} />;
  }

  return <HeroSplit content={hero} />;
}
