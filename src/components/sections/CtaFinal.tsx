import { ContactForm } from "@/components/sections/ContactForm";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { CtaFinalContent, SolucoesContent } from "@/lib/content/types";
import { getSolucaoPathLabel } from "@/lib/content/solucoes-tree";

type Props = {
  content: CtaFinalContent;
  servicos: SolucoesContent["items"];
};

export function CtaFinal({ content, servicos }: Props) {
  const servicoOptions = servicos.map((s) => ({
    value: s.servicoParam,
    label: getSolucaoPathLabel(servicos, s.id),
  }));

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
