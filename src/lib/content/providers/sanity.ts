import { createClient, type SanityClient } from "@sanity/client";

import { mergeSanityPartials } from "@/lib/content/map-sanity";
import type { LandingContent } from "@/lib/content/schema";

function createSanityClient(preview = false): SanityClient | null {
  const projectId = process.env.SANITY_PROJECT_ID?.trim();
  if (!projectId) return null;

  const token = process.env.SANITY_READ_TOKEN || undefined;
  if (preview && !token) {
    console.warn("[cms] Preview requested but SANITY_READ_TOKEN is missing");
  }

  return createClient({
    projectId,
    dataset: process.env.SANITY_DATASET?.trim() || "production",
    apiVersion: process.env.SANITY_API_VERSION?.trim() || "2025-01-01",
    useCdn: !preview,
    token,
    perspective: preview ? "previewDrafts" : "published",
  });
}

/**
 * Busca singletons no Sanity e mescla com fallback local.
 */
export async function fetchSanityLandingContent(opts?: {
  preview?: boolean;
}): Promise<LandingContent | null> {
  const preview = Boolean(opts?.preview);
  const client = createSanityClient(preview);
  if (!client) return null;

  try {
    const [
      layout,
      header,
      footer,
      hero,
      provaSocial,
      pilares,
      solucoes,
      sistemas,
      portalCliente,
      segmentos,
      diferenciais,
      depoimentos,
      abrangencia,
      comoFunciona,
      faq,
      ctaFinal,
    ] = await Promise.all([
      client.fetch(`*[_type == "landingLayout"][0]{
        sections[]{ key, visible, order }
      }`),
      client.fetch(`*[_type == "landingHeader"][0]{
        brandName,
        navItems[]{ label, href },
        primaryCta{ label, href, variant },
        portalCta{ label, href, variant },
        portalUrl,
        topBar{ phone, email, location },
        whatsapp{ label, href, variant }
      }`),
      client.fetch(`*[_type == "landingFooter"][0]{
        brandName, tagline, legalLine,
        navItems[]{ label, href },
        socialLinks[]{ label, href, ariaLabel },
        privacyHref, privacyLabel
      }`),
      client.fetch(`*[_type == "landingHero"][0]{
        layout,
        eyebrow, headline, subheadline,
        ctas[]{ label, href, variant },
        trustMetrics[]{ id, valor, sufixo, label, isPlaceholder },
        carousel{ enabled, autoplay, intervalMs, loop },
        wave{ enabled },
        slides[]{
          id, eyebrow, headline, highlight, accentText, subheadline,
          ctas[]{ label, href, variant },
          media{
            kind,
            "src": coalesce(src.asset->url, videoFile.asset->url),
            alt,
            "poster": poster.asset->url,
            motion
          }
        },
        media{
          kind,
          "src": coalesce(src.asset->url, videoFile.asset->url),
          alt,
          "poster": poster.asset->url,
          motion
        }
      }`),
      client.fetch(`*[_type == "landingProvaSocial"][0]{
        metrics[]{ id, valor, sufixo, label, isPlaceholder },
        logosEyebrow,
        logos[]{ id, nome, "imageUrl": image.asset->url, isPlaceholder }
      }`),
      client.fetch(`*[_type == "landingPilares"][0]{
        eyebrow, title,
        items[]{ id, tone, iconKey, titulo, descricao, bullets, href }
      }`),
      client.fetch(`*[_type == "landingSolucoes"][0]{
        eyebrow, title,
        items[]{ id, iconKey, titulo, descricao, colSpan, servicoParam, parentId }
      }`),
      client.fetch(`*[_type == "landingSistemas"][0]{
        eyebrow, title, description, portalHint, portalHref,
        items[]{ id, tone, iconKey, titulo, descricao, bullets, ctaLabel, href, mockVariant }
      }`),
      client.fetch(`*[_type == "landingPortalCliente"][0]{
        eyebrow, title, description, ctaLabel, portalUrl,
        items[]{ id, iconKey, titulo, descricao, bullets, colSpan }
      }`),
      client.fetch(`*[_type == "landingSegmentos"][0]{
        eyebrow, title,
        items[]{ id, iconKey, nome }
      }`),
      client.fetch(`*[_type == "landingDiferenciais"][0]{
        eyebrow, title,
        items[]{ id, iconKey, titulo, descricao }
      }`),
      client.fetch(`*[_type == "landingDepoimentos"][0]{
        eyebrow, title,
        items[]{ id, nome, cargo, empresa, texto, "avatarUrl": avatar.asset->url, isPlaceholder },
        carousel{ enabled, autoplay, intervalMs, loop }
      }`),
      client.fetch(`*[_type == "landingAbrangencia"][0]{
        eyebrow, title, footnote,
        items[]{ regiao, estados }
      }`),
      client.fetch(`*[_type == "landingComoFunciona"][0]{
        eyebrow, title, description,
        items[]{ id, numero, titulo, descricao }
      }`),
      client.fetch(`*[_type == "landingFaq"][0]{
        eyebrow, title,
        items[]{ id, pergunta, resposta }
      }`),
      client.fetch(`*[_type == "landingCtaFinal"][0]{
        eyebrow, title, description
      }`),
    ]);

    return mergeSanityPartials(
      {
        layout,
        header,
        footer,
        hero,
        provaSocial,
        pilares,
        solucoes,
        sistemas,
        portalCliente,
        segmentos,
        diferenciais,
        depoimentos,
        abrangencia,
        comoFunciona,
        faq,
        ctaFinal,
      },
      { preview },
    );
  } catch (err) {
    console.warn("[cms] Sanity fetch failed, using local fallback:", err);
    return null;
  }
}

export function isSanityConfigured(): boolean {
  return Boolean(process.env.SANITY_PROJECT_ID?.trim());
}
