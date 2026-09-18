import { ArrowRight, Check } from "lucide-react";

import { FadeInUp } from "@/components/motion/FadeInUp";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { CONTENT_ICONS } from "@/lib/content/icon-map";
import type {
  SistemaItem,
  SistemaMockVariant,
  SistemasContent,
} from "@/lib/content/types";
import { cn } from "@/lib/utils";

type Props = {
  content: SistemasContent;
};

const toneStyles = {
  primary: {
    iconBg: "bg-primary-100",
    iconColor: "text-primary-700",
    badge: "border-primary-200 bg-primary-50 text-primary-700",
    rail: "from-primary-500 to-primary-400",
    mockBorder: "border-primary-100",
    mockAccent: "bg-primary-600",
    mockSoft: "bg-primary-50 text-primary-800",
    ctaClass: undefined as string | undefined,
    ctaVariant: "primary" as const,
  },
  accent: {
    iconBg: "bg-amber-100",
    iconColor: "text-accent-600",
    badge: "border-amber-200 bg-amber-50 text-accent-600",
    rail: "from-accent-500 to-accent-400",
    mockBorder: "border-amber-100",
    mockAccent: "bg-accent-500",
    mockSoft: "bg-amber-50 text-amber-900",
    ctaClass: "bg-accent-500 text-white shadow-lg shadow-accent-500/25 hover:bg-accent-600",
    ctaVariant: "primary" as const,
  },
} as const;

function SistemaMock({
  variant,
  tone,
}: {
  variant: SistemaMockVariant;
  tone: SistemaItem["tone"];
}) {
  const styles = toneStyles[tone];

  if (variant === "financeiro") {
    return (
      <div
        className={cn(
          "rounded-xl border bg-neutral-50 p-3 shadow-sm",
          styles.mockBorder,
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
            Financeiro
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", styles.mockSoft)}>
            Em dia
          </span>
        </div>
        <ul className="space-y-1.5">
          {[
            { label: "Contrato Unidade Norte", status: "R$ 12.4k" },
            { label: "NFS-e #1842", status: "Paga" },
            { label: "Cobrança trimestral", status: "Aberta" },
          ].map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between rounded-lg border border-neutral-100 bg-white px-2.5 py-1.5"
            >
              <span className="text-[11px] font-medium text-neutral-800">{row.label}</span>
              <span className="text-[10px] text-neutral-500">{row.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === "condicionantes") {
    return (
      <div
        className={cn(
          "rounded-xl border bg-neutral-50 p-3 shadow-sm",
          styles.mockBorder,
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
            Condicionantes
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", styles.mockSoft)}>
            3 em prazo
          </span>
        </div>
        <ul className="space-y-1.5">
          {[
            { label: "Relatório semestral", status: "Em andamento" },
            { label: "Monitoramento de efluentes", status: "Vence em 12d" },
            { label: "Plano de gestão de resíduos", status: "Concluída" },
          ].map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between rounded-lg border border-neutral-100 bg-white px-2.5 py-1.5"
            >
              <span className="text-[11px] font-medium text-neutral-800">{row.label}</span>
              <span className="text-[10px] text-neutral-500">{row.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === "sst") {
    return (
      <div
        className={cn(
          "rounded-xl border bg-neutral-50 p-3 shadow-sm",
          styles.mockBorder,
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
            Checklist NR
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", styles.mockSoft)}>
            PCMSO
          </span>
        </div>
        <ul className="space-y-1.5">
          {[
            { label: "ASO admissional", done: true },
            { label: "Exames periódicos", done: true },
            { label: "Inventário de riscos", done: false },
          ].map((row) => (
            <li
              key={row.label}
              className="flex items-center gap-2 rounded-lg border border-neutral-100 bg-white px-2.5 py-1.5"
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded",
                  row.done ? styles.mockAccent : "bg-neutral-200",
                )}
              >
                {row.done && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
              </span>
              <span className="text-[11px] font-medium text-neutral-800">{row.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-neutral-50 p-3 shadow-sm",
        styles.mockBorder,
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
          Talhões
        </span>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", styles.mockSoft)}>
          4 áreas
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {["T-01", "T-02", "T-03", "T-04"].map((code, i) => (
          <div
            key={code}
            className="rounded-lg border border-neutral-100 bg-white px-2.5 py-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-neutral-800">{code}</span>
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  i % 2 === 0 ? styles.mockAccent : "bg-neutral-300",
                )}
              />
            </div>
            <p className="mt-1 text-[10px] text-neutral-500">
              {i % 2 === 0 ? "Inventário" : "Exploração"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sistemas({ content }: Props) {
  return (
    <section id="sistemas" className="bg-neutral-50 py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.items.map((item, index) => {
            const styles = toneStyles[item.tone];
            const Icon = CONTENT_ICONS[item.iconKey];
            const external = item.href.startsWith("http");

            return (
              <FadeInUp key={item.id} delay={index * 0.08}>
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary-900/5">
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                      styles.rail,
                    )}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        styles.iconBg,
                      )}
                    >
                      <Icon className={cn("h-6 w-6", styles.iconColor)} strokeWidth={1.75} />
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                        styles.badge,
                      )}
                    >
                      Sistema
                    </span>
                  </div>

                  <h3 className="mt-5 text-h3 text-neutral-900">{item.titulo}</h3>
                  <p className="mt-2 text-body text-neutral-500">{item.descricao}</p>

                  <ul className="mt-5 space-y-2.5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-small text-neutral-700">
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                            item.tone === "accent" ? "bg-accent-500" : "bg-primary-600",
                          )}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <SistemaMock variant={item.mockVariant} tone={item.tone} />
                  </div>

                  <div className="mt-auto pt-6">
                    <Button
                      asChild
                      variant={styles.ctaVariant}
                      size="sm"
                      className={cn("w-full", styles.ctaClass)}
                    >
                      <a
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                      >
                        {item.ctaLabel}
                        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                      </a>
                    </Button>
                  </div>
                </article>
              </FadeInUp>
            );
          })}
        </div>

        <FadeInUp delay={0.28} className="mt-10">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-100 bg-white px-6 py-5 sm:flex-row sm:items-center">
            <p className="text-body text-neutral-600">{content.portalHint}</p>
            <a
              href={content.portalHref}
              className="inline-flex shrink-0 items-center gap-1.5 text-small font-semibold text-primary-700 hover:text-primary-600"
            >
              Ver portal do cliente
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
