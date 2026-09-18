/** URL pública da landing (canonical, sitemap, OpenGraph). */
export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "https://portal.bomanejo.com.br";

/**
 * Login do portal autenticado (`ambiental-system` / financeiro).
 * Distinto do domínio da landing — o CTA "Acessar portal" não deve apontar para cá.
 */
export const portalUrl =
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://financeiro.bomanejo.com.br";

const CONTATO_HASH = "#contato";

/** Resolve URL de um sistema SaaS; sem env, cai no formulário de contato. */
export function resolveSistemaHref(envValue?: string | null): string {
  const url = envValue?.trim();
  return url && url.length > 0 ? url : CONTATO_HASH;
}

export function resolveSistemaCtaLabel(
  href: string,
  accessLabel = "Acessar sistema",
): string {
  return href === CONTATO_HASH ? "Solicitar demonstração" : accessLabel;
}

export const sistemaLicencasUrl = process.env.NEXT_PUBLIC_SISTEMA_LICENCAS_URL;
export const sistemaSstUrl = process.env.NEXT_PUBLIC_SISTEMA_SST_URL;
export const sistemaManejoUrl = process.env.NEXT_PUBLIC_SISTEMA_MANEJO_URL;
/** Portal financeiro (ambiental-system). Fallback: NEXT_PUBLIC_PORTAL_URL. */
export const sistemaFinanceiroUrl =
  process.env.NEXT_PUBLIC_SISTEMA_FINANCEIRO_URL ?? portalUrl;
