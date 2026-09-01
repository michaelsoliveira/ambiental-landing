import { FadeInUp } from "@/components/motion/FadeInUp";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CONTENT_ICONS } from "@/lib/content/icon-map";
import { buildSolucaoTree } from "@/lib/content/solucoes-tree";
import type { SolucoesContent } from "@/lib/content/types";

type Props = {
  content: SolucoesContent;
};

export function Solucoes({ content }: Props) {
  const tree = buildSolucaoTree(content.items);

  return (
    <section id="solucoes" className="bg-white py-12 lg:py-16">
      <Container>
        <SectionHeading eyebrow={content.eyebrow} title={content.title} />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tree.map((solucao, index) => {
            const Icon = CONTENT_ICONS[solucao.iconKey];
            return (
              <FadeInUp
                key={solucao.id}
                delay={index * 0.06}
                className="h-full"
              >
                <a
                  href={`/servicos#${solucao.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-neutral-100 bg-neutral-50 p-8 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary-900/5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                    <Icon className="h-6 w-6 text-primary-700" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-h3 text-neutral-900">{solucao.titulo}</h3>
                  <p className="mt-2 text-body text-neutral-500">{solucao.descricao}</p>
                  {solucao.children.length > 0 && (
                    <ul className="mt-4 space-y-1 border-t border-neutral-200/80 pt-3">
                      {solucao.children.map((child) => (
                        <li
                          key={child.id}
                          className="text-small font-medium text-primary-700"
                        >
                          {child.titulo}
                        </li>
                      ))}
                    </ul>
                  )}
                </a>
              </FadeInUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
