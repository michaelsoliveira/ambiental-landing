"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { HeroMediaSlide, HeroSlideScrim } from "@/components/sections/hero/HeroMediaSlide";
import { HeroWavyScrim } from "@/components/sections/hero/HeroWaveOverlay";
import type { CarouselConfig, HeroSlide } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type Props = {
  slides: HeroSlide[];
  config: CarouselConfig;
  index: number;
  onIndexChange: (index: number) => void;
  wavyScrim?: boolean;
};

export function HeroMediaCarousel({
  slides,
  config,
  index,
  onIndexChange,
  wavyScrim = true,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const indexRef = useRef(index);
  indexRef.current = index;
  const count = slides.length;
  const useCarousel = config.enabled && count > 1 && !reduceMotion;

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = indexRef.current + dir;
      if (config.loop) {
        onIndexChange((next + count) % count);
        return;
      }
      onIndexChange(Math.min(count - 1, Math.max(0, next)));
    },
    [config.loop, count, onIndexChange],
  );

  useEffect(() => {
    if (!useCarousel || !config.autoplay || paused) return;
    const id = window.setInterval(() => {
      const next = indexRef.current + 1;
      if (config.loop) {
        onIndexChange((next + count) % count);
        return;
      }
      onIndexChange(Math.min(count - 1, next));
    }, config.intervalMs);
    return () => window.clearInterval(id);
  }, [
    useCarousel,
    config.autoplay,
    config.intervalMs,
    config.loop,
    paused,
    count,
    onIndexChange,
  ]);

  const activeSlide = slides[index] ?? slides[0]!;

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={activeSlide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroMediaSlide
            media={activeSlide.media}
            slideIndex={index}
            active
            priority={index === 0}
          />
          <HeroSlideScrim />
          {wavyScrim && (
            <HeroWavyScrim className="pointer-events-none absolute inset-0 h-full w-full" />
          )}
        </motion.div>
      </AnimatePresence>

      {useCarousel && (
        <div className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 sm:bottom-8 lg:bottom-12">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Slide anterior"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Slides do hero">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60",
                )}
                onClick={() => onIndexChange(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Próximo slide"
            onClick={() => go(1)}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      )}
    </div>
  );
}
