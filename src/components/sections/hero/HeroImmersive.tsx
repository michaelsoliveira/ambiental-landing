"use client";

import { useState } from "react";

import { Container } from "@/components/shared/Container";
import { HeroAccentText } from "@/components/sections/hero/HeroAccentText";
import { HeroMediaCarousel } from "@/components/sections/hero/HeroMediaCarousel";
import { HeroSlideContent } from "@/components/sections/hero/HeroSlideContent";
import { HeroBottomWave } from "@/components/sections/hero/HeroWaveOverlay";
import type { NormalizedHeroContent } from "@/lib/content/normalize-hero";

type Props = {
  content: NormalizedHeroContent;
};

export function HeroImmersive({ content }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = content.slides;
  const activeSlide = slides[slideIndex] ?? slides[0]!;

  return (
    <section
      id="top"
      className="relative min-h-[92svh] overflow-hidden bg-neutral-950"
    >
      <HeroMediaCarousel
        slides={slides}
        config={content.carousel}
        index={slideIndex}
        onIndexChange={setSlideIndex}
        wavyScrim={content.wave.enabled}
      />

      <Container className="relative z-20 flex min-h-[92svh] flex-col justify-end pb-28 pt-32 lg:justify-center lg:pb-24 lg:pt-36">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="lg:col-span-7">
            <HeroSlideContent
              slide={activeSlide}
              trustMetrics={content.trustMetrics}
            />
          </div>
          <div className="lg:col-span-5">
            <HeroAccentText
              text={activeSlide.accentText}
              slideId={activeSlide.id}
            />
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute -bottom-px left-0 right-0 z-20 h-20 sm:h-24 lg:h-28">
        <HeroBottomWave className="h-full w-full" />
      </div>
    </section>
  );
}
