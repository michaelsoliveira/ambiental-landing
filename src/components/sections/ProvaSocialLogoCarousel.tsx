"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";

import type { CarouselConfig, LogoCliente } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const VISIBLE_COUNT = 6;

type Props = {
  logos: LogoCliente[];
  carousel: CarouselConfig;
};

function chunkLogos(logos: LogoCliente[], size: number): LogoCliente[][] {
  const pages: LogoCliente[][] = [];
  for (let i = 0; i < logos.length; i += size) {
    pages.push(logos.slice(i, i + size));
  }
  return pages;
}

function LogoCard({ logo }: { logo: LogoCliente }) {
  return (
    <div className="flex h-[3.25rem] items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-2.5">
      {logo.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.imageUrl}
          alt={logo.nome}
          className="max-h-6 w-auto max-w-[7rem] object-contain"
        />
      ) : (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
          <span className="text-small font-medium text-neutral-500">{logo.nome}</span>
        </div>
      )}
    </div>
  );
}

function LogoGrid({ logos }: { logos: LogoCliente[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {logos.map((logo) => (
        <LogoCard key={logo.id} logo={logo} />
      ))}
    </div>
  );
}

export function ProvaSocialLogoCarousel({ logos, carousel }: Props) {
  const reduceMotion = useReducedMotion();
  const pages = useMemo(() => chunkLogos(logos, VISIBLE_COUNT), [logos]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = pages.length;
  const useCarousel = carousel.enabled && count > 1 && !reduceMotion;

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => {
        const next = i + dir;
        if (carousel.loop) return (next + count) % count;
        return Math.min(count - 1, Math.max(0, next));
      });
    },
    [carousel.loop, count],
  );

  useEffect(() => {
    setIndex(0);
  }, [logos.length]);

  useEffect(() => {
    if (!useCarousel || !carousel.autoplay || paused) return;
    const id = window.setInterval(() => go(1), carousel.intervalMs);
    return () => window.clearInterval(id);
  }, [useCarousel, carousel.autoplay, carousel.intervalMs, paused, go]);

  if (logos.length === 0) return null;

  if (!useCarousel) {
    return <LogoGrid logos={pages[0] ?? logos.slice(0, VISIBLE_COUNT)} />;
  }

  const page = pages[index] ?? pages[0]!;

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Empresas parceiras"
    >
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page.map((l) => l.id).join("-")}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoGrid logos={page} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition hover:border-primary-300 hover:text-primary-700"
          aria-label="Logos anteriores"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="Páginas de logos">
          {pages.map((p, i) => (
            <button
              key={p.map((l) => l.id).join("-")}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Página ${i + 1} de ${count}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-primary-600" : "w-2 bg-neutral-300 hover:bg-neutral-400",
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition hover:border-primary-300 hover:text-primary-700"
          aria-label="Próximos logos"
          onClick={() => go(1)}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
