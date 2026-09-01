# SDD 02 — Arquitetura da Landing

> **Tipo:** Software Design Document — Arquitetura técnica
> **Versão:** 1.0 | **Status:** Baseline para implementação
> **Depende de:** `specs/sdd/01-design-system.md`

---

## 1. Stack obrigatória

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js 16 (App Router, Turbopack) — scaffold do projeto já veio nesta versão; compatível com os padrões de App Router usados nesta spec |
| Linguagem | TypeScript |
| Estilo | TailwindCSS v4 — tokens de `specs/sdd/01-design-system.md` declarados via `@theme` em `src/app/globals.css` (Tailwind v4 é CSS-first e não usa `tailwind.config.ts`) |
| Animação | Framer Motion |
| Componentes base | Primitives no padrão shadcn/ui (`src/components/ui/*`), escritos à mão com Radix + `class-variance-authority` + `tailwind-merge` — mesmo resultado do `shadcn init`, sem depender da CLI interativa |
| Ícones | Lucide Icons (`lucide-react` — sem ícones de marca/redes sociais desde a v1; ver `src/components/shared/Footer.tsx`) |
| Ícones | Lucide Icons |
| Fonte | `next/font/google` — Inter |
| Formulário de contato | `react-hook-form` + `zod` |
| Deploy | Docker (mesmo padrão de `clinic/landing/Dockerfile` e `inexahub/landing/Dockerfile`) |

Sem backend próprio: a landing é estática/SSG onde possível, exceto a rota de formulário de contato
e o loader de conteúdo CMS (`getLandingContent` — SDD-04: local ou Sanity com fallback).

Conteúdo tipado (piloto Hero/Depoimentos): ver `specs/sdd/04-cms-conteudo-landing.md`.

---

## 2. Estrutura de pastas

```
ambiental-landing/
  .claude/
    commands/                 — skills (slash commands) deste projeto
  specs/
    sdd/                      — Software Design Documents (numerados, arquitetura)
    SPEC_MODULO_LANDING_AMBIENTAL.md   — spec funcional/produto
    SKILL_LANDING_AMBIENTAL.md         — skill de construção SDD-driven
    HARNESS_LANDING_AMBIENTAL.md       — harness de validação da feature "landing completa"
    HARNESS.md                         — harness raiz (comandos por camada)
    README.md                          — índice das specs
  src/
    app/
      layout.tsx               — fonte, metadata base, providers
      page.tsx                 — compõe as seções na ordem de SPEC_MODULO_LANDING_AMBIENTAL.md §4
      api/contato/route.ts     — route handler do formulário de contato
      sitemap.ts
      robots.ts
    components/
      sections/                — 1 arquivo por seção (Hero.tsx, ProvaSocial.tsx, ...)
      ui/                      — primitives shadcn/ui (button, card, badge, accordion, dialog)
      shared/                  — Header.tsx, Footer.tsx, Container.tsx, SectionHeading.tsx
      motion/                  — wrappers Framer Motion reutilizáveis (FadeInUp, StaggerGroup)
    lib/
      constants.ts             — dados estruturados de conteúdo (planos, FAQ, depoimentos, segmentos)
      seo.ts                   — helpers de metadata/OpenGraph/schema.org
      analytics.ts             — disparo de eventos de conversão (ver HARNESS)
    types/
      content.ts                — tipos das estruturas de conteúdo
  public/
    images/
    og/                        — imagem OpenGraph
  tailwind.config.ts            — tokens de design system
  next.config.ts
  Dockerfile
  CLAUDE.md
```

---

## 3. Composição de `page.tsx`

`page.tsx` é apenas composição — cada seção é um componente independente e "burro" (recebe dados de
`lib/constants.ts`, não busca dados por conta própria):

```tsx
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProvaSocial />
      <Pilares />
      <Solucoes />
      <PortalCliente />
      <Segmentos />
      <Diferenciais />
      <Depoimentos />
      <Abrangencia />
      <ComoFunciona />
      <Faq />
      <CtaFinal />
      <Footer />
    </>
  );
}
```

A ordem das seções segue `SPEC_MODULO_LANDING_AMBIENTAL.md §4` — qualquer reordenação deve ser refletida nos dois
arquivos (spec funcional e `page.tsx`) na mesma alteração.

---

## 4. Padrão de "bento grid" (Soluções e Portal do Cliente)

Grid CSS 12 colunas (`grid grid-cols-1 md:grid-cols-12 gap-6`), blocos com `col-span-{4,6,8,12}` e `row-span-{1,2}`.
Cada bloco é um card (`specs/sdd/01-design-system.md §9`) com: ícone, título curto, 1–2 linhas de descrição e,
quando aplicável, um mockup/screenshot em `public/images/`. Nunca mais de 6 blocos por bento grid (excesso de
densidade quebra a hierarquia visual).

---

## 5. Metadata e SEO

- `generateMetadata` em `layout.tsx` com title template `"%s | Ambiental Consultoria"`.
- OpenGraph completo (`title`, `description`, `images: ["/og/cover.png"]`, `locale: "pt_BR"`).
- `schema.org`: `Organization` + `ProfessionalService` no `layout.tsx` (JSON-LD), mais `FAQPage` na seção FAQ.
- `sitemap.ts` e `robots.ts` na App Router (nativos do Next 15).
- Imagens sempre via `next/image` com `sizes` definido — nunca `<img>` cru.

---

## 6. Performance — metas (validadas via `HARNESS_LANDING_AMBIENTAL.md`)

| Métrica (mobile, Lighthouse) | Meta |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

Regras de implementação:
- Hero image/mockup: `priority` no `next/image`, formato AVIF/WebP.
- Nenhuma seção abaixo da dobra deve bloquear render inicial — usar `dynamic import` para blocos pesados
  (ex.: carrossel de depoimentos) quando aplicável.
- Fontes via `next/font` (sem FOUC, sem request extra de Google Fonts em runtime).

---

## 7. Convenções de nome

- Componentes React: `PascalCase` (`PortalCliente.tsx`).
- Dados estruturados: `camelCase` em `lib/constants.ts` (`solucoesAmbientais`, `depoimentosClientes`).
- Ids de seção (para navegação âncora do header): `kebab-case` (`#portal-cliente`, `#como-funciona`).

---

*Versão 1.0 — jul/2026*
