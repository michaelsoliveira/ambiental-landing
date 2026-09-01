import { MapPin } from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { AbrangenciaContent } from "@/lib/content/types";

type Props = {
  content: AbrangenciaContent;
};

export function Abrangencia({ content }: Props) {
  return (
    <section className="bg-white py-16 lg:py-28">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {content.items.map((regiao) => (
            <StaggerItem key={regiao.regiao}>
              <div className="h-full rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                  <MapPin className="h-5 w-5 text-primary-700" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-h3 text-neutral-900">{regiao.regiao}</h3>
                <p className="mt-2 text-small text-neutral-500">
                  {regiao.estados.join(" · ")}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {content.footnote ? (
          <p className="mt-6 text-small text-neutral-500/70">{content.footnote}</p>
        ) : null}
      </Container>
    </section>
  );
}
