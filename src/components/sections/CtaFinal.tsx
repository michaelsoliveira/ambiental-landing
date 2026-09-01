import { ContactForm } from "@/components/sections/ContactForm";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { CtaFinalContent, SolucoesContent } from "@/lib/content/types";

type Props = {
  content: CtaFinalContent;
  servicos: SolucoesContent["items"];
};

export function CtaFinal({ content, servicos }: Props) {
  const byId = new Map(servicos.map((s) => [s.id, s]));
  const servicoOptions = servicos.map((s) => {
    const parent = s.parentId ? byId.get(s.parentId) : undefined;
    return {
      value: s.servicoParam,
      label: parent ? `${parent.titulo} › ${s.titulo}` : s.titulo,
    };
  });

  return (
    <section id="contato" className="bg-neutral-50 py-16 lg:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          align="center"
          className="mx-auto"
        />

        <FadeInUp
          delay={0.1}
          className="mt-8 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-10"
        >
          <ContactForm servicos={servicoOptions} />
        </FadeInUp>
      </Container>
    </section>
  );
}
