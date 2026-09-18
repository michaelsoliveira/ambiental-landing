import { getLocalLandingContent } from "@/lib/content/providers/local";
import {
  ensureCatalogNavItems,
  mergeHeaderNav,
  mergeLayoutSections,
} from "@/lib/content/merge-catalog";
import { withResolvedHeaderTopBar } from "@/lib/content/resolve-top-bar";
import {
  landingContentSchema,
  type FooterContent,
  type HeaderContent,
  type LandingContent,
  type LayoutContent,
  type SectionKey,
} from "@/lib/content/schema";

export type SanityLandingPartials = {
  layout?: Record<string, unknown> | null;
  header?: Record<string, unknown> | null;
  footer?: Record<string, unknown> | null;
  hero?: Record<string, unknown> | null;
  provaSocial?: Record<string, unknown> | null;
  pilares?: Record<string, unknown> | null;
  solucoes?: Record<string, unknown> | null;
  sistemas?: Record<string, unknown> | null;
  portalCliente?: Record<string, unknown> | null;
  segmentos?: Record<string, unknown> | null;
  diferenciais?: Record<string, unknown> | null;
  depoimentos?: Record<string, unknown> | null;
  abrangencia?: Record<string, unknown> | null;
  comoFunciona?: Record<string, unknown> | null;
  faq?: Record<string, unknown> | null;
  ctaFinal?: Record<string, unknown> | null;
};

const SECTION_KEYS = [
  "layout",
  "header",
  "footer",
  "hero",
  "provaSocial",
  "pilares",
  "solucoes",
  "sistemas",
  "portalCliente",
  "segmentos",
  "diferenciais",
  "depoimentos",
  "abrangencia",
  "comoFunciona",
  "faq",
  "ctaFinal",
] as const satisfies readonly (keyof SanityLandingPartials)[];

/**
 * Mescla singletons Sanity sobre o baseline local.
 * Seções ausentes no CMS permanecem locais (migração gradual).
 */
export function mergeSanityPartials(
  partials: SanityLandingPartials,
  opts?: { preview?: boolean },
): LandingContent {
  const base = getLocalLandingContent();
  let usedRemote = false;

  const next: LandingContent = {
    ...base,
    meta: { ...base.meta, source: "mixed", preview: opts?.preview },
  };

  for (const key of SECTION_KEYS) {
    const raw = partials[key];
    if (!raw) continue;
    const shape = landingContentSchema.shape[key];
    const parsed = shape.safeParse(raw);
    if (parsed.success) {
      if (key === "layout") {
        next.layout = mergeLayoutSections(
          parsed.data as LayoutContent,
          base.layout,
        );
      } else if (key === "header") {
        next.header = mergeHeaderNav(
          parsed.data as HeaderContent,
          base.header,
        );
      } else if (key === "footer") {
        next.footer = ensureCatalogNavItems(
          parsed.data as FooterContent,
          base.footer,
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (next as any)[key] = parsed.data;
      }
      usedRemote = true;
    }
  }

  next.header = withResolvedHeaderTopBar(next.header as HeaderContent, {
    footer: next.footer,
    fallbackHeader: base.header,
  });

  next.meta = {
    updatedAt: new Date().toISOString(),
    source: usedRemote ? "mixed" : "local",
    preview: opts?.preview,
  };

  return landingContentSchema.parse(next);
}

/** Ordem efetiva das seções visíveis (layout CMS). */
export function resolveVisibleSectionKeys(
  content: LandingContent,
): SectionKey[] {
  return [...content.layout.sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order)
    .map((s) => s.key);
}
