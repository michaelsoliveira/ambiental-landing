"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { HeroContent, HeroSlide } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const variantMap = {
  primary: "primary",
  outline: "outline",
  tech: "portal",
} as const;

const HIGHLIGHT_PILL_MAX = 28;

type Props = {
  slide: HeroSlide;
  trustMetrics: HeroContent["trustMetrics"];
};

function Highlight({ text }: { text: string }) {
  const usePill = text.length <= HIGHLIGHT_PILL_MAX;

  return (
    <span className={cn(usePill ? "hero-highlight-pill" : "hero-highlight-band")}>
      {text}
    </span>
  );
}

function renderHeadline(slide: HeroSlide) {
  const highlight = slide.highlight?.trim();
  const headlineLines = slide.headline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (highlight) {
    if (slide.headline.includes(highlight)) {
      const parts = slide.headline.split(highlight);
      return (
        <>
          <span className="text-white">{parts[0]}</span>
          <Highlight text={highlight} />
          {parts.slice(1).join(highlight) ? (
            <span className="text-white">{parts.slice(1).join(highlight)}</span>
          ) : null}
        </>
      );
    }

    const lead = headlineLines[0] ?? slide.headline;
    return (
      <>
        <span className="block text-white">{lead}</span>
        <Highlight text={highlight} />
      </>
    );
  }

  if (headlineLines.length > 1) {
    return (
      <>
        <span className="block text-white">{headlineLines[0]}</span>
        <Highlight text={headlineLines.slice(1).join(" ")} />
      </>
    );
  }

  return <span className="text-white">{slide.headline}</span>;
}

export function HeroSlideContent({ slide, trustMetrics }: Props) {
  const ctas = slide.ctas.length > 0 ? slide.ctas : [];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="hero-content-panel max-w-2xl lg:max-w-none"
        aria-live="polite"
      >
        {slide.eyebrow ? (
          <p className="hero-eyebrow">{slide.eyebrow}</p>
        ) : null}

        <h1 className="hero-display mt-3">{renderHeadline(slide)}</h1>

        {slide.subheadline ? (
          <p className="hero-subheadline mt-5 max-w-lg">{slide.subheadline}</p>
        ) : null}

        {ctas.length > 0 && (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {ctas.map((cta) => (
              <Button
                key={cta.href + cta.label}
                asChild
                variant={variantMap[cta.variant]}
                className={cn(
                  "h-11 px-6",
                  cta.variant === "outline" &&
                    "border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white",
                  cta.variant === "primary" && "shadow-lg shadow-primary-900/30",
                )}
              >
                <a href={cta.href}>{cta.label}</a>
              </Button>
            ))}
          </div>
        )}

        {trustMetrics.length > 0 && (
          <div className="hero-metrics-strip mt-8 lg:mt-10">
            {trustMetrics.map((badge, i) => (
              <div
                key={badge.id}
                className={cn(
                  "hero-metric-item",
                  i > 0 && "hero-metric-item-divider",
                )}
              >
                <p className="tabular-nums text-[1.75rem] font-extrabold leading-none text-white lg:text-h2">
                  {badge.valor}
                  {badge.sufixo}
                </p>
                <p className="mt-1 max-w-[9rem] text-micro leading-snug text-white/70">
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
