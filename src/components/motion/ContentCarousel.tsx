"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { CarouselConfig } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type Props<T> = {
  items: T[];
  config: CarouselConfig;
  keyOf: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  className?: string;
};

export function ContentCarousel<T>({
  items,
  config,
  keyOf,
  renderItem,
  className,
}: Props<T>) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const useCarousel = config.enabled && count > 1 && !reduceMotion;

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => {
        const next = i + dir;
        if (config.loop) return (next + count) % count;
        return Math.min(count - 1, Math.max(0, next));
      });
    },
    [config.loop, count],
  );

  useEffect(() => {
    if (!useCarousel || !config.autoplay || paused) return;
    const id = window.setInterval(() => go(1), config.intervalMs);
    return () => window.clearInterval(id);
  }, [useCarousel, config.autoplay, config.intervalMs, paused, go]);

  if (!useCarousel) {
    return (
      <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-3", className)}>
        {items.map((item) => (
          <div key={keyOf(item)}>{renderItem(item)}</div>
        ))}
      </div>
    );
  }

  const item = items[index];

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Depoimentos"
    >
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={keyOf(item)}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto max-w-2xl">{renderItem(item)}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-primary-300 hover:text-primary-700"
          aria-label="Anterior"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Slides">
          {items.map((it, i) => (
            <button
              key={keyOf(it)}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === index ? "bg-primary-600 w-6" : "bg-neutral-300 hover:bg-neutral-400",
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-primary-300 hover:text-primary-700"
          aria-label="Próximo"
          onClick={() => go(1)}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
