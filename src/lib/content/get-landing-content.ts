import { draftMode } from "next/headers";
import type { z } from "zod";

import {
  fetchApiLandingContent,
  isApiCmsConfigured,
} from "@/lib/content/providers/api";
import { getLocalLandingContent } from "@/lib/content/providers/local";
import { withResolvedHeaderTopBar } from "@/lib/content/resolve-top-bar";
import { normalizeHeroContent } from "@/lib/content/normalize-hero";
import {
  fetchSanityLandingContent,
  isSanityConfigured,
} from "@/lib/content/providers/sanity";
import {
  abrangenciaContentSchema,
  comoFuncionaContentSchema,
  ctaFinalContentSchema,
  depoimentosContentSchema,
  diferenciaisContentSchema,
  faqContentSchema,
  footerContentSchema,
  headerContentSchema,
  heroContentSchema,
  landingContentSchema,
  layoutContentSchema,
  pilaresContentSchema,
  portalClienteContentSchema,
  projetosContentSchema,
  provaSocialContentSchema,
  segmentosContentSchema,
  solucoesContentSchema,
  type FooterContent,
  type HeaderContent,
  type HeroContent,
  type LandingContent,
} from "@/lib/content/schema";

function resolveProvider(): "local" | "sanity" | "api" {
  const explicit = process.env.CMS_PROVIDER?.trim().toLowerCase();
  if (explicit === "local" || explicit === "sanity" || explicit === "api") {
    return explicit;
  }
  if (isApiCmsConfigured()) return "api";
  if (isSanityConfigured()) return "sanity";
  return "local";
}

/** Schema de cada seção de topo — usado para fallback por seção (não all-or-nothing). */
const SECTION_SCHEMAS: Record<string, z.ZodTypeAny> = {
  layout: layoutContentSchema,
  header: headerContentSchema,
  footer: footerContentSchema,
  hero: heroContentSchema,
  provaSocial: provaSocialContentSchema,
  pilares: pilaresContentSchema,
  solucoes: solucoesContentSchema,
  portalCliente: portalClienteContentSchema,
  segmentos: segmentosContentSchema,
  diferenciais: diferenciaisContentSchema,
  depoimentos: depoimentosContentSchema,
  abrangencia: abrangenciaContentSchema,
  comoFunciona: comoFuncionaContentSchema,
  faq: faqContentSchema,
  ctaFinal: ctaFinalContentSchema,
  projetos: projetosContentSchema,
};

/**
 * Mescla o payload remoto (api/sanity) com o fallback local, seção por seção.
 *
 * Antes, uma seção malformada (ex.: um item de rascunho salvo com campo vazio)
 * derrubava a validação do payload inteiro e a landing caía 100% para o
 * conteúdo local — mesmo com o resto do conteúdo publicado corretamente. Agora
 * cada seção é validada isoladamente; só a seção com problema cai para local.
 */
function mergeWithLocalFallback(
  remote: unknown,
  local: LandingContent,
): LandingContent {
  const remoteObj =
    remote && typeof remote === "object"
      ? (remote as Record<string, unknown>)
      : {};

  const merged: Record<string, unknown> = { ...local };

  for (const [key, schema] of Object.entries(SECTION_SCHEMAS)) {
    if (!(key in remoteObj)) continue;
    const check = schema.safeParse(remoteObj[key]);
    if (check.success) {
      if (key === "hero") {
        merged[key] = mergeHeroSection(check.data as HeroContent, local.hero);
      } else {
        merged[key] = check.data;
      }
    } else {
      console.warn(
        `[cms] Seção "${key}" falhou na validação Zod — usando fallback local só para esta seção.`,
        check.error.issues,
      );
    }
  }

  return merged as LandingContent;
}

/** Preserva slides/layout imersivo local quando o CMS remoto ainda não tem carrossel. */
function mergeHeroSection(remote: HeroContent, local: HeroContent): HeroContent {
  const hasRemoteSlides = Boolean(remote.slides && remote.slides.length > 0);
  if (hasRemoteSlides) return remote;
  return {
    ...remote,
    layout: local.layout,
    slides: local.slides,
    carousel: remote.carousel ?? local.carousel,
    wave: remote.wave ?? local.wave,
  };
}

function normalizeLandingContent(
  content: LandingContent,
  fallback: LandingContent,
): LandingContent {
  const footer = (content.footer ?? fallback.footer) as FooterContent;
  return {
    ...content,
    footer,
    hero: normalizeHeroContent(content.hero),
    header: withResolvedHeaderTopBar(content.header as HeaderContent, {
      footer,
      fallbackHeader: fallback.header,
    }),
  };
}

/**
 * Fonte única de conteúdo tipado da landing (SDD-04).
 * Providers: local | sanity | api (ambiental-system).
 */
export async function getLandingContent(): Promise<LandingContent> {
  const { isEnabled: preview } = await draftMode();
  const provider = resolveProvider();
  const local = getLocalLandingContent();

  if (provider === "api") {
    const remote = await fetchApiLandingContent({ preview });
    if (remote) {
      const merged = mergeWithLocalFallback(remote, local);
      return normalizeLandingContent(
        { ...merged, meta: { ...merged.meta, preview, source: "mixed" } },
        local,
      );
    }
  }

  if (provider === "sanity") {
    const remote = await fetchSanityLandingContent({ preview });
    if (remote) {
      const merged = mergeWithLocalFallback(remote, local);
      return normalizeLandingContent(
        { ...merged, meta: { ...merged.meta, preview, source: "mixed" } },
        local,
      );
    }
  }

  const parsed = landingContentSchema.parse(local);
  return normalizeLandingContent(
    { ...parsed, meta: { ...parsed.meta, preview } },
    local,
  );
}
