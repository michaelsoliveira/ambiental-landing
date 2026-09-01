import type { LandingContent } from "@/lib/content/schema";

type PublicLandingResponse = {
  content: LandingContent;
  publishedAt?: string | null;
  preview?: boolean;
};

function resolveApiBase(): string | null {
  const base =
    process.env.CMS_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_CMS_API_URL?.trim();
  return base ? base.replace(/\/$/, "") : null;
}

export function isApiCmsConfigured(): boolean {
  return Boolean(resolveApiBase() && process.env.CMS_ORG_SLUG?.trim());
}

/**
 * Busca conteúdo publicado (ou draft com secret) no ambiental-system.
 */
export async function fetchApiLandingContent(opts?: {
  preview?: boolean;
}): Promise<LandingContent | null> {
  const base = resolveApiBase();
  const slug = process.env.CMS_ORG_SLUG?.trim();
  if (!base || !slug) return null;

  const url = new URL(`${base}/public/landing/${encodeURIComponent(slug)}`);
  if (opts?.preview) {
    url.searchParams.set("draft", "1");
    const secret = process.env.LANDING_PREVIEW_SECRET?.trim();
    if (!secret) {
      console.warn("[cms] Preview API requested but LANDING_PREVIEW_SECRET missing");
      return null;
    }
    url.searchParams.set("secret", secret);
  }

  try {
    const res = await fetch(url.toString(), {
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn("[cms] API landing fetch failed:", res.status, await res.text());
      return null;
    }
    const data = (await res.json()) as PublicLandingResponse;
    return {
      ...data.content,
      meta: {
        ...data.content.meta,
        source: "mixed",
        preview: Boolean(opts?.preview || data.preview),
        updatedAt: data.content.meta?.updatedAt ?? new Date().toISOString(),
      },
    };
  } catch (err) {
    console.warn("[cms] API landing fetch error:", err);
    return null;
  }
}
