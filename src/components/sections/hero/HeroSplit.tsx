import { Activity, Bell, LayoutDashboard, Wifi } from "lucide-react";

import { FadeInUp } from "@/components/motion/FadeInUp";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import type { NormalizedHeroContent } from "@/lib/content/normalize-hero";
import { cn } from "@/lib/utils";

const variantMap = {
  primary: "primary",
  outline: "outline",
  tech: "portal",
} as const;

type Props = {
  content: NormalizedHeroContent;
};

function HeroMediaCard({ content }: { content: NormalizedHeroContent }) {
  const slide = content.slides[0]!;
  const { media } = slide;
  const kenburns = media.motion === "kenburns";
  const parallax = media.motion === "parallax";

  if (media.kind === "image" && media.src) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-3xl border border-neutral-100 shadow-xl shadow-primary-900/5",
          kenburns && "hero-kenburns",
          parallax && "hero-parallax",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt={media.alt || ""}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
    );
  }

  if (media.kind === "video" && media.src) {
    const isMov =
      media.src.toLowerCase().endsWith(".mov") ||
      media.src.toLowerCase().includes(".mov?");
    const mimeType = isMov ? "video/quicktime" : undefined;
    return (
      <div
        className={cn(
          "overflow-hidden rounded-3xl border border-neutral-100 shadow-xl shadow-primary-900/5",
          parallax && "hero-parallax",
        )}
      >
        <video
          className="aspect-video w-full object-cover"
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay
        >
          <source src={media.src} type={mimeType} />
        </video>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-neutral-100 bg-white p-6 shadow-xl shadow-primary-900/5">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tech-600">
            <LayoutDashboard className="h-4 w-4 text-white" strokeWidth={1.75} />
          </span>
          <span className="text-small font-semibold text-neutral-900">
            Painel de monitoramento
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-micro font-semibold text-primary-700">
          <Wifi className="h-3 w-3" strokeWidth={2} />
          ao vivo
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-tech-900/[0.03] p-4">
          <Activity className="h-5 w-5 text-tech-600" strokeWidth={1.75} />
          <p className="mt-2 tabular-nums text-h3 text-neutral-900">98,2%</p>
          <p className="text-small text-neutral-500">conformidade</p>
        </div>
        <div className="rounded-xl bg-primary-50 p-4">
          <Bell className="h-5 w-5 text-primary-600" strokeWidth={1.75} />
          <p className="mt-2 tabular-nums text-h3 text-neutral-900">3</p>
          <p className="text-small text-neutral-500">alertas ativos</p>
        </div>
      </div>

      <div className="mt-4 flex h-24 items-end gap-2 rounded-xl bg-neutral-50 p-4">
        {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-tech-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroSplit({ content }: Props) {
  const slide = content.slides[0]!;

  return (
    <section id="top" className="relative overflow-hidden bg-neutral-50 pt-24 pb-12 lg:pt-32 lg:pb-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <FadeInUp className="lg:col-span-6">
            <p className="text-micro font-semibold uppercase text-primary-700">
              {slide.eyebrow ?? content.eyebrow}
            </p>
            <h1 className="mt-4 text-display text-neutral-900">{slide.headline}</h1>
            <p className="mt-6 text-body-lg text-neutral-500">
              {slide.subheadline ?? content.subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {(slide.ctas.length > 0 ? slide.ctas : content.ctas).map((cta) => (
                <Button key={cta.href + cta.label} asChild variant={variantMap[cta.variant]}>
                  <a href={cta.href}>{cta.label}</a>
                </Button>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-neutral-100 pt-8">
              {content.trustMetrics.map((badge) => (
                <div key={badge.id}>
                  <p className="tabular-nums text-h2 font-extrabold text-neutral-900">
                    {badge.valor}
                    {badge.sufixo}
                  </p>
                  <p className="text-small text-neutral-500">{badge.label}</p>
                </div>
              ))}
            </div>
          </FadeInUp>

          <FadeInUp delay={0.15} className="lg:col-span-6">
            <HeroMediaCard content={content} />
          </FadeInUp>
        </div>
      </Container>
    </section>
  );
}
