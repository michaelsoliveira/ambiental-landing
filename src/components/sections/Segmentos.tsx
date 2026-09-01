import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CONTENT_ICONS } from "@/lib/content/icon-map";
import type { SegmentosContent } from "@/lib/content/types";

type Props = {
  content: SegmentosContent;
};

export function Segmentos({ content }: Props) {
  return (
    <section id="segmentos" className="bg-neutral-50 py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          align="center"
          className="mx-auto"
        />

        <StaggerGroup className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {content.items.map((segmento) => {
            const Icon = CONTENT_ICONS[segmento.iconKey];
            return (
              <StaggerItem key={segmento.id}>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary-900/5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                    <Icon className="h-6 w-6 text-primary-700" strokeWidth={1.75} />
                  </span>
                  <span className="text-small font-semibold text-neutral-900">
                    {segmento.nome}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
