"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  text?: string;
  slideId: string;
};

/** Tipografia grande à direita — referência Ambipar (ESG, regenerar…). */
export function HeroAccentText({ text, slideId }: Props) {
  if (!text?.trim()) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideId}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 12 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none hidden select-none lg:flex lg:items-center lg:justify-end"
        aria-hidden
      >
        <p className="hero-accent-text max-w-[14rem] text-right leading-[0.9] tracking-tight">
          {text}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
