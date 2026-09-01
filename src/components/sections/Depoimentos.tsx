"use client";

import { Quote } from "lucide-react";

import { ContentCarousel } from "@/components/motion/ContentCarousel";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { DepoimentosContent } from "@/lib/content/types";

type Props = {
  content: DepoimentosContent;
};

export function Depoimentos({ content }: Props) {
  return (
    <section id="depoimentos" className="bg-neutral-50 py-12 lg:py-16">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <div className="mt-8">
          <ContentCarousel
            items={content.items}
            config={content.carousel}
            keyOf={(d) => d.id}
            renderItem={(depoimento) => (
              <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">
                <Quote className="h-6 w-6 text-primary-400" strokeWidth={1.75} />
                <p className="mt-4 flex-1 text-body text-neutral-700">
                  &ldquo;{depoimento.texto}&rdquo;
                </p>
                <div className="mt-6 border-t border-neutral-100 pt-4">
                  {depoimento.nome ? (
                    <p className="text-small font-medium text-neutral-800">{depoimento.nome}</p>
                  ) : null}
                  <p className="text-small font-semibold text-neutral-900">{depoimento.cargo}</p>
                  <p className="text-small text-neutral-500">{depoimento.empresa}</p>
                </div>
              </div>
            )}
          />
        </div>

        {content.items.some((d) => d.isPlaceholder) && (
          <p className="mt-6 text-center text-small text-neutral-500/70">
            * Depoimentos ilustrativos, a substituir por citações reais e autorizadas.
          </p>
        )}
      </Container>
    </section>
  );
}
