# SDD 04 — CMS de conteúdo da Landing

> **Tipo:** Software Design Document — Conteúdo editável (headless)  
> **Versão:** 1.0 | **Status:** Baseline para implementação  
> **Depende de:** `01-design-system.md`, `02-arquitetura-landing.md`, `SPEC_MODULO_LANDING_AMBIENTAL.md`  
> **Produto:** ambiental-landing  

---

## 1. Objetivo

Permitir que marketing/comercial edite **textos, imagens, vídeos, slides e CTAs** da landing sem alterar código React — com a mesma qualidade visual e motion definidos no design system.

**Não** é um page builder estilo WordPress. A landing continua sendo:

- **Código** = layout, tipografia, animações, carrossel, acessibilidade  
- **CMS** = dados tipados por seção (headline, mídia, slides, FAQ…)

---

## 2. Princípios

| # | Princípio | Implicação |
|---|-----------|------------|
| P1 | Seções tipadas | Cada bloco tem schema Zod/TypeScript; conteúdo inválido não sobe |
| P2 | Presets de mídia | Editor escolhe `static` \| `carousel` \| `video` \| `kenburns` — não HTML livre |
| P3 | Fallback local | Sem CMS configurado, `lib/constants.ts` / `content/local.ts` alimenta a página |
| P4 | Design system no código | Cores, motion e componentes nunca vêm do CMS |
| P5 | Ordem da SPEC | Ordem padrão das seções segue SPEC §4; CMS pode ocultar, não inventar seções fora do catálogo |
| P6 | Performance | Imagens via `next/image`; vídeo lazy; carrossel sem bloquear LCP |

---

## 3. Arquitetura

```
┌─────────────────┐     getLandingContent()      ┌──────────────────────┐
│  Sanity (cloud) │ ───────────────────────────► │  LandingContent       │
│  ou futuro      │   (Zod parse + normalize)     │  (tipado)             │
│  Payload/admin  │                              └──────────┬───────────┘
└─────────────────┘                                         │
┌─────────────────┐                                         ▼
│  Fallback local │ ────────────────────────────────►  page.tsx
│  content/local  │                                   map type → Section
└─────────────────┘                                         │
                                                            ▼
                                              components/sections/*
                                              + motion/* (Framer)
```

### Fluxo de dados

1. `getLandingContent()` escolhe provider (`sanity` se `SANITY_PROJECT_ID`, senão `local`).  
2. Conteúdo bruto passa por **Zod** (`landingContentSchema`).  
3. `page.tsx` (Server Component) passa props tipadas para cada seção.  
4. Seções **não** importam `constants` diretamente (piloto: Hero, Depoimentos; demais migram por fase).

### Variáveis de ambiente

| Var | Uso |
|-----|-----|
| `CMS_PROVIDER` | `local` \| `sanity` (default: auto — sanity se project id, senão local) |
| `SANITY_PROJECT_ID` | Projeto Sanity |
| `SANITY_DATASET` | default `production` |
| `SANITY_API_VERSION` | default `2025-01-01` |
| `SANITY_READ_TOKEN` | Opcional (dataset privado) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Cliente browser só se houver Studio embed |

---

## 4. Modelo de conteúdo

### 4.1 Tipos de mídia (compartilhados)

```ts
type MediaKind = 'image' | 'video' | 'none';

type MediaField = {
  kind: MediaKind;
  src?: string;          // URL ou path /public
  alt?: string;
  poster?: string;       // vídeo
  motion?: 'none' | 'kenburns' | 'parallax';
};

type CarouselConfig = {
  enabled: boolean;
  autoplay: boolean;
  intervalMs: number;    // 4000–8000 recomendado
  loop: boolean;
};

type CtaField = {
  label: string;
  href: string;
  variant: 'primary' | 'outline' | 'tech';
};
```

### 4.2 Documento raiz `LandingContent`

```ts
type LandingContent = {
  meta: {
    updatedAt?: string;
    source: 'local' | 'sanity';
  };
  hero: HeroContent;
  depoimentos: DepoimentosContent;
  // Fases seguintes: provaSocial, pilares, solucoes, …
};
```

### 4.3 Bloco `hero` (piloto)

| Campo | Tipo | Notas |
|-------|------|-------|
| eyebrow | string | Micro label |
| headline | string | H1 |
| subheadline | string | Apoio |
| ctas | CtaField[] | 1–2 CTAs |
| trustMetrics | { id, valor, sufixo?, label }[] | Badges sob CTAs |
| media | MediaField | Mockup / imagem / vídeo lateral |
| mediaMotion | preset | default `none` |

### 4.4 Bloco `depoimentos` (piloto)

| Campo | Tipo | Notas |
|-------|------|-------|
| eyebrow, title | string | SectionHeading |
| items | Depoimento[] | id, nome?, cargo, empresa, texto, avatar? |
| carousel | CarouselConfig | Se `enabled`, UI carrossel; senão grid |

### 4.5 Catálogo de seções (roadmap)

| type | Fase | Componente |
|------|------|------------|
| `hero` | **P0** ✅ | `Hero` |
| `depoimentos` | **P0** ✅ | `Depoimentos` |
| `prova_social` | **P1** ✅ | `ProvaSocial` |
| `solucoes` | **P1** ✅ | `Solucoes` |
| `faq` | **P1** ✅ | `Faq` |
| `cta_final` | **P1** ✅ | `CtaFinal` |
| `pilares` | **P2** ✅ | `Pilares` |
| `portal_cliente` | **P2** ✅ | `PortalCliente` |
| `segmentos` | **P2** ✅ | `Segmentos` |
| `diferenciais` | **P2** ✅ | `Diferenciais` |
| `abrangencia` | **P2** ✅ | `Abrangencia` |
| `como_funciona` | **P2** ✅ | `ComoFunciona` |
| `header` / `footer` | **P2** ✅ | shared |
| `layout` (order/visible) | **P2** ✅ | `LandingSections` |

---

## 5. CMS escolhido (fase atual): Sanity

**Por quê Sanity (nesta fase):**

- Admin web sem manter backend próprio na landing  
- Schema TypeScript alinhado ao Next  
- CDN de imagens nativo  
- Preview / draft via `/api/preview?secret=` + Next.js `draftMode` (**P2** ✅)

**Alternativa futura:** ~~Payload CMS~~ — **decidido P3:** admin no `ambiental-system` (app financeiro), provider `api` na landing. Sanity permanece opcional para projetos que já usem.

### Provider `api` (ambiental-system)

- Admin: `apps/financeiro` → `/org/[slug]/landing-cms`
- API autenticada: `GET/PUT .../organizations/:slug/landing`, `POST .../publish`
- API pública: `GET /public/landing/:slug` (+ `?draft=1&secret=` para preview)
- Landing: `CMS_PROVIDER=api`, `CMS_API_URL`, `CMS_ORG_SLUG`

### Documentos Sanity (piloto)

- `landingHero` (singleton)  
- `landingDepoimentos` (singleton) com array `items`  

Studio pode viver em:

- Sanity-hosted Studio, ou  
- pasta `sanity/` neste monorepo (opcional, não bloqueia o fallback local)

---

## 6. Motion e mídia (responsabilidade do frontend)

| Preset CMS | Implementação |
|------------|---------------|
| carousel | Embla **ou** Framer Motion slide — transição suave, `prefers-reduced-motion` → grid estático |
| kenburns | scale/translate lento na imagem (`FadeInUp` / motion custom) |
| parallax | translateY no scroll (desktop only) |
| video | `<video muted loop playsInline>` + poster; nunca autoplay com áudio |

Carrossel: intervalo ≥ 4s; pause on hover; dots/aria-roledescription; teclado.

---

## 7. Estrutura de pastas (código)

```
src/
  lib/
    content/
      schema.ts           — Zod
      types.ts            — tipos inferidos / export
      get-landing-content.ts
      providers/
        local.ts
        sanity.ts
      map-sanity.ts       — normalização Sanity → LandingContent
  content/
    local/
      landing.ts          — snapshot default (extraído de constants)
  components/
    sections/Hero.tsx     — props: HeroContent
    sections/Depoimentos.tsx — props + carousel
    motion/ContentCarousel.tsx
sanity/                     — schemas de referência (opcional)
  schemas/
    hero.ts
    depoimentos.ts
```

---

## 8. API de código

```ts
export async function getLandingContent(): Promise<LandingContent>
```

- Cache: `unstable_cache` / `revalidate` 60s quando provider = sanity  
- Erros de fetch Sanity → log + fallback local (nunca quebrar a landing)  
- Parse Zod falha → fallback local + warning em log

---

## 9. Fases de entrega

| Fase | Entrega | Critério |
|------|---------|----------|
| **P0** | SDD-04 + schema Zod + `getLandingContent` + Hero/Depoimentos por props + carrossel + provider local + Sanity opcional | Landing funciona sem Sanity; com env Sanity usa API |
| **P1** | Migrar FAQ, Soluções, Prova Social, CTA Final + merge parcial Sanity | ✅ Conteúdo tipado nessas seções; CMS pode sobrescrever bloco a bloco |
| **P2** | Preview draft + reordenar/ocultar seções + upload vídeo | ✅ `/api/preview`, `layout.sections`, Hero video/kenburns |
| **P3** | Admin no `ambiental-system` (não Payload) | ✅ `LandingSite` + CMS em `/org/[slug]/landing-cms` + provider `api` |

---

## 10. Segurança e compliance

- Token Sanity só no server (`SANITY_READ_TOKEN`)  
- Sem HTML arbitrário no CMS (strings plain / markdown limitado se necessário)  
- Depoimentos: flag `isPlaceholder` até autorização LGPD/comercial  
- Formulário de contato permanece fora do CMS (route handler atual)

---

## 11. Critérios de aceite

### P0 / P1
- [x] CA-CMS-01 — Sem env Sanity, página renderiza conteúdo local idêntico ao baseline  
- [x] CA-CMS-02 — Hero e Depoimentos recebem props de `getLandingContent()`  
- [x] CA-CMS-03 — Depoimentos com `carousel.enabled` usa carrossel com transição suave  
- [x] CA-CMS-04 — `prefers-reduced-motion: reduce` desativa autoplay/kenburns  
- [x] CA-CMS-05 — Schema Zod rejeita hero sem headline  
- [x] CA-CMS-06 — Falha Sanity não derruba build/runtime (fallback)  
- [x] CA-CMS-07 — Specs README indexa este SDD  

### P2
- [x] CA-CMS-08 — Todas as seções + Header/Footer recebem props tipados  
- [x] CA-CMS-09 — `layout.sections` controla ordem e `visible`  
- [x] CA-CMS-10 — `/api/preview?secret=` ativa draft mode; banner permite sair  
- [x] CA-CMS-11 — Hero aceita `media.kind=video` e `motion=kenburns`  

### P3
- [x] CA-CMS-12 — Admin CMS no ambiental-system (financeiro) com draft/publish  
- [x] CA-CMS-13 — Endpoint público `/public/landing/:slug`  
- [x] CA-CMS-14 — Landing consome provider `api` com fallback local  

---

## 12. Referências

- `specs/sdd/02-arquitetura-landing.md` — composição de seções  
- `specs/sdd/01-design-system.md` — motion e tokens  
- `src/types/content.ts` — tipos de domínio já existentes  
- [Sanity + Next.js](https://www.sanity.io/docs/js-client)  

---

*Criado: ago/2026 — baseline CMS headless para ambiental-landing.*
