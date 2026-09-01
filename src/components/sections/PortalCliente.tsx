import { Check } from "lucide-react";

import { FadeInUp } from "@/components/motion/FadeInUp";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { CONTENT_ICONS } from "@/lib/content/icon-map";
import type { PortalClienteContent } from "@/lib/content/types";

type Props = {
  content: PortalClienteContent;
};

export function PortalCliente({ content }: Props) {
  return (
    <section id="portal-cliente" className="bg-tech-900 py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          tone="tech"
          inverted
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
          {content.items.map((bloco, index) => {
            const Icon = CONTENT_ICONS[bloco.iconKey];
            return (
              <FadeInUp
                key={bloco.id}
                delay={index * 0.1}
                className={`md:col-span-12 ${bloco.colSpan}`}
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tech-600">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-h3 text-white">{bloco.titulo}</h3>
                  <p className="mt-2 text-body text-sky-100/80">{bloco.descricao}</p>
                  <ul className="mt-5 space-y-2.5">
                    {bloco.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-small text-sky-100">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-tech-400" strokeWidth={2} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            );
          })}
        </div>

        <FadeInUp delay={0.2} className="mt-12 flex justify-center">
          <Button asChild variant="portal">
            <a href={content.portalUrl} target="_self">
              {content.ctaLabel}
            </a>
          </Button>
        </FadeInUp>
      </Container>
    </section>
  );
}
