import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { ProvaSocialLogoCarousel } from "@/components/sections/ProvaSocialLogoCarousel";
import { Container } from "@/components/shared/Container";
import type { ProvaSocialContent } from "@/lib/content/types";

type Props = {
  content: ProvaSocialContent;
};

export function ProvaSocial({ content }: Props) {
  const logosCarousel = content.logosCarousel ?? {
    enabled: true,
    autoplay: true,
    intervalMs: 5000,
    loop: true,
  };

  return (
    <section className="border-y border-neutral-100 bg-white py-12 lg:py-16">
      <Container>
        <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {content.metrics.map((metrica) => (
            <StaggerItem key={metrica.id} className="text-center">
              <p className="tabular-nums text-h1 font-extrabold text-neutral-900">
                <AnimatedCounter value={metrica.valor} suffix={metrica.sufixo} />
              </p>
              <p className="mt-1 text-small text-neutral-500">{metrica.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {content.logos.length > 0 && (
          <div className="mt-14 border-t border-neutral-100 pt-10">
            <p className="mb-6 text-center text-micro font-semibold uppercase text-neutral-500">
              {content.logosEyebrow}
            </p>
            <ProvaSocialLogoCarousel
              logos={content.logos}
              carousel={logosCarousel}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
