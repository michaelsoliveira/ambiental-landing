# SDD 01 — Design System

> **Tipo:** Software Design Document — Fundação visual
> **Versão:** 1.0 | **Status:** Baseline para implementação
> **Produto:** Landing Ambiental Consultoria
> **Consumido por:** `SKILL_LANDING_AMBIENTAL.md`, `.claude/commands/sdd-landing.md`, `.claude/commands/nova-secao-landing.md`

---

## 1. Princípio de direção

Referência de inspiração: **https://ambipar.com/** — usar apenas como referência de **nível** (espaçamento generoso,
hierarquia de conteúdo B2B, seções de métricas, tom institucional-tecnológico). **Nunca copiar layout, textos, imagens
ou identidade visual diretamente.** A Ambiental Consultoria tem paleta, tipografia e tom de voz próprios, definidos
abaixo.

Direção visual-alvo:
- institucional, mas não burocrática;
- técnica e confiável (compliance, laudos, dados);
- "verde" sem cair em clichê de folha/natureza genérica — verde como cor de autoridade técnica;
- toque de tecnologia (o produto tem um portal/SaaS de monitoramento — `specs/sdd/03-integracao-portal-cliente.md`);
- nunca: aparência de template institucional antigo, ícones genéricos de banco de imagem, gradiente arco-íris,
  excesso de verde-folha estilo ONG.

---

## 2. Paleta de cores

Três famílias com papéis semânticos distintos — não usar cores fora de seus papéis.

### 2.1 Primária — Ambiental (autoridade, marca, navegação, links, headings de destaque)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-primary-50`  | `#ECFDF5` | fundos de seção alternada, hover sutil |
| `--color-primary-100` | `#D1FAE5` | badges, backgrounds de ícone |
| `--color-primary-400` | `#34D399` | acentos claros, ilustrações, gráficos |
| `--color-primary-600` | `#059669` | **cor de marca** — botão primário, links, ícones ativos |
| `--color-primary-700` | `#047857` | hover/active de botão primário |
| `--color-primary-900` | `#064E3B` | texto sobre fundo claro-verde, headers escuros |

### 2.2 Accent — Segurança do Trabalho (alerta consciente, CTAs de risco/urgência, selos NR)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-accent-400` | `#FBBF24` | ícones de EPI/segurança, destaques pontuais |
| `--color-accent-500` | `#F59E0B` | **cor SST** — badges "NR", selos de conformidade |
| `--color-accent-600` | `#D97706` | texto/ícone sobre fundo claro accent |

Regra: accent nunca é cor de botão primário nem de grandes áreas — é usada em elementos pontuais (badge, ícone,
sublinhado) para marcar o pilar "Segurança do Trabalho" sem competir com o verde institucional.

### 2.3 Tech/Portal — Monitoramento e dados (seção Portal do Cliente, dashboards, gráficos)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-tech-400` | `#38BDF8` | gráficos, linhas de dados, elementos de mockup |
| `--color-tech-600` | `#0284C7` | **cor do portal** — CTAs "Acessar portal", ícones de monitoramento/financeiro |
| `--color-tech-900` | `#0C4A6E` | texto sobre fundo tech claro |

Regra: tech-blue aparece **apenas** na seção "Portal do Cliente" e em qualquer CTA que leve ao login do
`ambiental-system` — funciona como sinalização visual consistente de "aqui você entra no produto".

### 2.4 Neutros

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-neutral-0`   | `#FFFFFF` | fundo padrão |
| `--color-neutral-50`  | `#F7FAF9` | fundo de seção alternada (leve tom verde) |
| `--color-neutral-100` | `#EEF2F0` | bordas sutis, divisores |
| `--color-neutral-300` | `#CBD5D1` | bordas de card, inputs |
| `--color-neutral-500` | `#64766E` | texto secundário |
| `--color-neutral-700` | `#33403A` | texto de corpo |
| `--color-neutral-900` | `#101613` | headings, texto de alto contraste |

Evitar cinza puro (`#000`/`#888` sem matiz) — todos os neutros têm leve matiz verde-acinzentado para coerência com a
paleta primária.

### 2.5 Semânticas

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-success` | `#059669` | igual primary-600 |
| `--color-warning` | `#F59E0B` | igual accent-500 |
| `--color-danger`  | `#DC2626` | erros de formulário apenas |
| `--color-info`    | `#0284C7` | igual tech-600 |

---

## 3. Tipografia

- **Família única:** `Inter` (variável, via `next/font/google`) — pesos 400/500/600/700/800.
  - Fallback: `system-ui, -apple-system, sans-serif`.
- **Números/métricas de destaque** (seção Prova Social): peso 800, `font-feature-settings: "tnum"` (tabular).

### Escala (Tailwind v4 — tokens `@theme` em `src/app/globals.css`)

| Token | rem / px | Uso |
|-------|----------|-----|
| `text-display` | clamp 1.875rem–2.75rem / 30–44px, leading-[1.1], tracking-[-0.02em], font-bold | Headline do Hero (desktop) |
| `text-h1` | 2.75rem / 44px, leading-tight, font-bold | Título de seção |
| `text-h2` | 2rem / 32px, leading-tight, font-semibold | Subtítulo de seção |
| `text-h3` | 1.375rem / 22px, leading-snug, font-semibold | Título de card |
| `text-body-lg` | 1.125rem / 18px, leading-relaxed | Subheadline, lead de seção |
| `text-body` | 1rem / 16px, leading-relaxed | Corpo padrão |
| `text-small` | 0.875rem / 14px | Legendas, labels, footer |
| `text-micro` | 0.75rem / 12px, tracking-wide, uppercase | Eyebrows/kickers ("SEGURANÇA DO TRABALHO") |

Mobile: `text-display` cai para 2.25rem/36px, `text-h1` para 2rem/32px (usar `clamp()` no CSS ou variantes `sm:`/`lg:`).

---

## 4. Espaçamento e grid

- **Container:** `max-w-7xl mx-auto px-6 lg:px-8`.
- **Padding vertical de seção:** `py-16 lg:py-28` (seções de destaque como Hero e Portal do Cliente podem ir a `py-32`).
- **Gap padrão entre elementos de um grupo:** múltiplos de 4px (`gap-4`, `gap-6`, `gap-8`, `gap-12`).
- **Grid de cards:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`.
- **Bento grid** (seção Soluções e Portal do Cliente): grid assimétrico 12 colunas, blocos de 4/6/8/12 colunas — ver
  padrão de componente em `specs/sdd/02-arquitetura-landing.md §4`.

---

## 5. Raio, borda e sombra

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-xl`  | 12px | inputs, botões pequenos |
| `rounded-2xl` | 16px | cards padrão |
| `rounded-3xl` | 24px | cards de destaque, mockups de produto |
| `rounded-full`| 9999px | badges, pills, avatar |

- **Borda padrão de card:** `border border-neutral-100` (quase invisível) + `shadow-sm` em repouso.
- **Sombra elevada (hover/destaque):** `shadow-xl shadow-primary-900/5` — sombra escura translúcida, nunca preta pura.
- **Glow de CTA primário:** `shadow-lg shadow-primary-600/25` apenas no botão principal do Hero e do CTA final.

---

## 6. Iconografia

- **Biblioteca:** Lucide Icons (`lucide-react`), stroke-width `1.75`.
- Ícones de pilar "Ambiental": `Leaf`, `Recycle`, `Droplets`, `FileCheck2`, `Factory`.
- Ícones de pilar "Segurança do Trabalho": `HardHat`, `ShieldCheck`, `AlertTriangle`, `ClipboardCheck`, `Siren`.
- Ícones de "Portal/Tech": `LayoutDashboard`, `Activity`, `BarChart3`, `Wifi`, `Bell`.
- Tamanho padrão: `20px` inline com texto, `24px` em cards, `28–32px` em destaques de pilar.
- Sempre dentro de um container `rounded-xl` com fundo `-50` da cor semântica correspondente (ex.: ícone SST sobre
  `bg-accent-50`... como accent-50 não está na tabela, usar `bg-amber-50` do Tailwind padrão como equivalente).
- **Redes sociais (footer):** `lucide-react` não inclui ícones de marca (Instagram, LinkedIn, etc. — removidos por
  questão de trademark). Usar links em texto (padrão já aplicado em `Footer.tsx`) em vez de importar ícone
  inexistente ou de outra biblioteca.

---

## 7. Motion (Framer Motion)

- **Entrada de seção:** `fadeInUp` — `opacity 0→1`, `y: 24→0`, `duration: 0.6`, `ease: [0.22, 1, 0.36, 1]`,
  `viewport={{ once: true, margin: "-80px" }}`.
- **Stagger de lista/cards:** `staggerChildren: 0.08`, `delayChildren: 0.1`.
- **Hover de card:** `scale: 1.02` + elevação de sombra, `duration: 0.2`.
- **Contadores numéricos** (Prova Social): animar de 0 ao valor final ao entrar em viewport (`framer-motion` +
  `useInView`, ou biblioteca leve de count-up).
- **Nunca:** parallax agressivo, autoplay de carrossel sem controle do usuário, animação que bloqueia leitura do
  texto principal do Hero.

---

## 8. Breakpoints

Usar os breakpoints padrão do Tailwind — **não customizar**:

| Breakpoint | Largura | Uso principal |
|------------|---------|----------------|
| (base) | < 640px | 1 coluna, nav em menu hambúrguer |
| `sm` | ≥ 640px | ajustes tipográficos |
| `md` | ≥ 768px | grids 2 colunas |
| `lg` | ≥ 1024px | nav desktop, grids 3 colunas, bento grid completo |
| `xl` | ≥ 1280px | container em largura máxima |

Mobile-first obrigatório: escrever classes base para mobile, sobrescrever com `md:`/`lg:`.

---

## 9. Padrões de componente

### Botão primário
```tsx
<Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-6 py-3
  shadow-lg shadow-primary-600/25 font-semibold transition-colors">
```

### Botão secundário (ghost/outline)
```tsx
<Button variant="outline" className="border-neutral-300 text-neutral-900 rounded-xl px-6 py-3
  hover:bg-neutral-50 font-semibold">
```

### Botão "portal" (tech)
```tsx
<Button className="bg-tech-600 hover:bg-tech-700 text-white rounded-xl px-6 py-3 font-semibold">
  Acessar portal do cliente
</Button>
```

### Badge de pilar
```tsx
<span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-micro font-semibold
  bg-primary-100 text-primary-700"> {/* ou bg-amber-100 text-accent-600 para SST */}
```

### Card padrão
```tsx
<div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm
  hover:shadow-xl hover:shadow-primary-900/5 transition-shadow">
```

Todos os componentes de seção (`src/components/sections/*`) devem consumir estes tokens via `tailwind.config.ts` —
nunca usar hex direto em JSX. Ver `specs/sdd/02-arquitetura-landing.md` para onde os tokens são declarados.

---

*Versão 1.0 — jul/2026*
