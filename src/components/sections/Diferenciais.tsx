import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CONTENT_ICONS } from "@/lib/content/icon-map";
import type { DiferenciaisContent } from "@/lib/content/types";

type Props = {
  content: DiferenciaisContent;
};

export function Diferenciais({ content }: Props) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((diferencial) => {
            const Icon = CONTENT_ICONS[diferencial.iconKey];
            return (
              <StaggerItem key={diferencial.id}>
                <div className="h-full rounded-2xl border border-neutral-100 bg-neutral-50 p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary-900/5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
                    <Icon className="h-6 w-6 text-primary-700" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-h3 text-neutral-900">{diferencial.titulo}</h3>
                  <p className="mt-2 text-body text-neutral-500">{diferencial.descricao}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
