import { FadeInUp } from "@/components/motion/FadeInUp";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { ComoFuncionaContent } from "@/lib/content/types";

type Props = {
  content: ComoFuncionaContent;
};

export function ComoFunciona({ content }: Props) {
  return (
    <section id="como-funciona" className="bg-neutral-50 py-16 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.items.map((passo, index) => (
            <FadeInUp key={passo.id} delay={index * 0.1}>
              <div className="relative h-full rounded-2xl border border-neutral-100 bg-white p-8">
                <span className="tabular-nums text-h1 font-extrabold text-primary-100">
                  {passo.numero}
                </span>
                <h3 className="mt-2 text-h3 text-neutral-900">{passo.titulo}</h3>
                <p className="mt-2 text-body text-neutral-500">{passo.descricao}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
