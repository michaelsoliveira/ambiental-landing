import { Abrangencia } from "@/components/sections/Abrangencia";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Pilares } from "@/components/sections/Pilares";
import { PortalCliente } from "@/components/sections/PortalCliente";
import { ProvaSocial } from "@/components/sections/ProvaSocial";
import { Segmentos } from "@/components/sections/Segmentos";
import { Sistemas } from "@/components/sections/Sistemas";
import { Solucoes } from "@/components/sections/Solucoes";
import { resolveVisibleSectionKeys } from "@/lib/content/map-sanity";
import type { LandingContent, SectionKey } from "@/lib/content/types";

type Props = {
  content: LandingContent;
};

function renderSection(key: SectionKey, content: LandingContent) {
  switch (key) {
    case "hero":
      return <Hero key={key} content={content.hero} />;
    case "provaSocial":
      return <ProvaSocial key={key} content={content.provaSocial} />;
    case "pilares":
      return <Pilares key={key} content={content.pilares} />;
    case "solucoes":
      return <Solucoes key={key} content={content.solucoes} />;
    case "sistemas":
      return <Sistemas key={key} content={content.sistemas} />;
    case "portalCliente":
      return <PortalCliente key={key} content={content.portalCliente} />;
    case "segmentos":
      return <Segmentos key={key} content={content.segmentos} />;
    case "diferenciais":
      return <Diferenciais key={key} content={content.diferenciais} />;
    case "depoimentos":
      return <Depoimentos key={key} content={content.depoimentos} />;
    case "abrangencia":
      return <Abrangencia key={key} content={content.abrangencia} />;
    case "comoFunciona":
      return <ComoFunciona key={key} content={content.comoFunciona} />;
    case "faq":
      return <Faq key={key} content={content.faq} />;
    case "ctaFinal":
      return (
        <CtaFinal
          key={key}
          content={content.ctaFinal}
          servicos={content.solucoes.items}
        />
      );
    default:
      return null;
  }
}

/** Compõe as seções na ordem/visibilidade definidas em `content.layout`. */
export function LandingSections({ content }: Props) {
  const keys = resolveVisibleSectionKeys(content);
  return <>{keys.map((key) => renderSection(key, content))}</>;
}
