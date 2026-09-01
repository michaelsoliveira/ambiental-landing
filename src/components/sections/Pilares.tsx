import { ArrowRight } from "lucide-react";

import { FadeInUp } from "@/components/motion/FadeInUp";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CONTENT_ICONS } from "@/lib/content/icon-map";
import type { PilaresContent } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const toneStyles = {
  primary: {
    iconBg: "bg-primary-100",
    iconColor: "text-primary-700",
    link: "text-primary-700",
  },
  accent: {
    iconBg: "bg-amber-100",
    iconColor: "text-accent-600",
    link: "text-accent-600",
  },
} as const;

type Props = {
  content: PilaresContent;
};

export function Pilares({ content }: Props) {
  return (
    <section id="pilares" className="bg-neutral-50 py-12 lg:py-16">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {content.items.map((pilar, index) => {
            const tone = toneStyles[pilar.tone];
            const Icon = CONTENT_ICONS[pilar.iconKey];
            return (
              <FadeInUp key={pilar.id} delay={index * 0.1}>
                <div className="h-full rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary-900/5">
                  <span
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl",
                      tone.iconBg,
                    )}
                  >
                    <Icon className={cn("h-7 w-7", tone.iconColor)} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-h3 text-neutral-900">{pilar.titulo}</h3>
                  <p className="mt-2 text-body text-neutral-500">{pilar.descricao}</p>

                  <ul className="mt-6 space-y-3">
                    {pilar.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-body text-neutral-700">
                        <span
                          className={cn(
                            "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                            pilar.tone === "primary" ? "bg-primary-600" : "bg-accent-500",
                          )}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={pilar.href}
                    className={cn(
                      "mt-8 inline-flex items-center gap-1.5 text-small font-semibold",
                      tone.link,
                    )}
                  >
                    Ver soluções
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
