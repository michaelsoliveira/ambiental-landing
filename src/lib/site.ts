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
