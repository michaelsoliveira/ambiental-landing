# SKILL — Construção da Landing Ambiental Consultoria (SDD-driven)

> **Tipo:** Feature Skill — implementação assistida (Claude Code)
> **Versão:** 1.0 | **Status:** A implementar
> **Spec:** `specs/SPEC_MODULO_LANDING_AMBIENTAL.md`
> **SDD:** `specs/sdd/01-design-system.md`, `specs/sdd/02-arquitetura-landing.md`, `specs/sdd/03-integracao-portal-cliente.md`

---

## 1. Objetivo da skill

Guiar a implementação da landing inteira (ou de uma seção nova/alterada) seguindo rigorosamente as specs — nunca
improvisar paleta, copy ou estrutura fora do que está documentado. Este é o documento que `.claude/commands/sdd-landing.md`
e `.claude/commands/nova-secao-landing.md` executam.

---

## 2. Pré-requisitos (ler nesta ordem antes de escrever qualquer código)

1. `specs/sdd/01-design-system.md` — tokens de cor, tipografia, espaçamento, motion, componentes.
2. `specs/sdd/02-arquitetura-landing.md` — stack, estrutura de pastas, padrão de bento grid.
3. `specs/SPEC_MODULO_LANDING_AMBIENTAL.md` — requisitos funcionais (RF-XX) e copy-guideline da seção alvo.
4. Se a seção envolver o portal do cliente → `specs/sdd/03-integracao-portal-cliente.md` (contém decisões em
   aberto que **bloqueiam** menção a features específicas do produto).

---

## 3. Scaffold do projeto (primeira execução — projeto ainda vazio)

Se `src/` não existir, criar o projeto antes de qualquer seção:

```bash
cd ambiental-landing
npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint=false --import-alias "@/*"
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers \
  clsx tailwind-merge class-variance-authority @radix-ui/react-accordion @radix-ui/react-slot
```

O `create-next-app` mais recente já traz Tailwind v4 (CSS-first, sem `tailwind.config.ts`) — nesse caso não rodar
`shadcn@latest init` (CLI interativa, não roda de forma não-assistida); em vez disso criar os primitives de
`src/components/ui/*` à mão no padrão shadcn (Radix + `class-variance-authority` + `tailwind-merge`), como já feito
em `button.tsx`, `badge.tsx`, `card.tsx`, `accordion.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `select.tsx`.

Depois:
1. Aplicar os tokens de `specs/sdd/01-design-system.md §2–§5` como bloco `@theme` em `src/app/globals.css`
   (cores `primary/accent/tech/neutral`, `--font-sans = Inter`, escala tipográfica `--text-*`). Se o projeto usar
   Tailwind v3 (sem suporte a `@theme`), aplicar os mesmos tokens em `theme.extend` de `tailwind.config.ts`.
2. Criar a estrutura de pastas de `specs/sdd/02-arquitetura-landing.md §2`.
3. Criar `src/lib/constants.ts` vazio, tipado por `src/types/content.ts` (a preencher por seção conforme RF-XX).

---

## 4. Ordem obrigatória de implementação por seção

Seguir a ordem de `SPEC_MODULO_LANDING_AMBIENTAL.md §4` (Header → Footer). Não pular para "Portal do Cliente" ou
"FAQ" antes de Header/Hero existirem — cada seção depende de primitives (`Container`, `SectionHeading`, botões)
criados nas primeiras.

Para **cada seção**:

1. Ler os RF-XX correspondentes na spec funcional.
2. Adicionar/editar os dados estruturados em `src/lib/constants.ts` (nunca hardcodar texto direto no JSX de seções
   que repetem itens — cards, FAQ, depoimentos).
3. Criar `src/components/sections/<NomeSecao>.tsx` consumindo os tokens do design system (nunca hex/spacing cru).
4. Envolver a entrada da seção com o wrapper de motion (`src/components/motion/FadeInUp.tsx` — SDD-01 §7).
5. Registrar a seção em `src/app/page.tsx`, na posição correta.
6. Se a seção tiver âncora de navegação, adicionar ao array de nav do `Header`.
7. Rodar a validação de `specs/HARNESS_LANDING_AMBIENTAL.md` (typecheck + lint + build) antes de seguir para a
   próxima seção.

---

## 5. Regras (NUNCA violar)

| Regra | Motivo |
|-------|--------|
| **Nunca** copiar layout, texto ou imagem de ambipar.com | É referência de nível, não fonte de conteúdo — risco de plágio/marca |
| **Nunca** usar cor/espaçamento fora dos tokens de `specs/sdd/01-design-system.md` | Consistência visual — qualquer ajuste de paleta deve mudar a spec primeiro |
| **Nunca** inventar dado quantitativo (nº de clientes, anos de mercado, logos de clientes) | Compliance/veracidade — usar placeholder explícito até dado real |
| **Nunca** citar feature do portal que não existe no `ambiental-system` real | Ver decisões em aberto em SDD-03 §6 |
| **Nunca** usar `<img>` cru — sempre `next/image` | Performance (LCP) |
| **Sempre** mobile-first (classes base = mobile, `md:`/`lg:` para desktop) | Maioria do tráfego B2B ainda entra por link de e-mail/WhatsApp no celular |
| **Sempre** os dois CTAs (comercial + portal) visíveis no header | Dupla função do produto (SDD-03) |
| **Sempre** rodar harness após cada seção, não só no final | Evita acumular erro de tipo/lint em 14 seções |

---

## 6. Padrão de código — componente de seção

```tsx
// src/components/sections/Pilares.tsx
import { Leaf, HardHat } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { pilares } from "@/lib/constants";

export function Pilares() {
  return (
    <section id="pilares" className="py-16 lg:py-28 bg-neutral-50">
      <Container>
        <SectionHeading
          eyebrow="COMO ATUAMOS"
          title="Dois pilares, uma só operação"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pilares.map((pilar) => (
            <FadeInUp key={pilar.id}>
              <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm
                hover:shadow-xl hover:shadow-primary-900/5 transition-shadow">
                {/* ícone + conteúdo — cor do card por pilar.tone ("primary" | "accent") */}
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

Padrão de dado estruturado correspondente:

```ts
// src/lib/constants.ts
export const pilares: Pilar[] = [
  { id: "ambiental", tone: "primary", icon: "Leaf", titulo: "Consultoria Ambiental", bullets: [/* ... */] },
  { id: "sst", tone: "accent", icon: "HardHat", titulo: "Segurança do Trabalho", bullets: [/* ... */] },
];
```

---

## 7. Troubleshooting

| Sintoma | Causa provável | Ação |
|---|---|---|
| Cores não aplicam (`bg-primary-600` não existe) | Tokens não estendidos em `tailwind.config.ts` | Conferir `specs/sdd/01-design-system.md §2` foi aplicado no `theme.extend.colors` |
| Layout quebra em mobile | Classe desktop-first usada sem variante base | Reescrever mobile-first (base sem prefixo, `md:`/`lg:` por cima) |
| Seção sem animação de entrada | Faltou wrapper `FadeInUp` ou `viewport once` mal configurado | Ver SDD-01 §7 |
| Build falha por `next/image` sem domínio | Imagem remota fora de `next.config.ts` `images.domains` | Preferir imagens locais em `public/images/`; só usar remoto se necessário |
| CTA "Acessar portal" sem destino | `NEXT_PUBLIC_PORTAL_URL` não definido | Ver `specs/sdd/03-integracao-portal-cliente.md §4` |

---

## 8. Referências cruzadas

| Comando / Doc | Uso |
|---|---|
| `/nova-secao-landing` | Scaffold de uma seção nova seguindo este skill |
| `/sdd-landing` | Orquestra o fluxo completo (ler specs → planejar → implementar → validar) |
| `specs/HARNESS_LANDING_AMBIENTAL.md` | Validação funcional e técnica |
| `specs/sdd/01-design-system.md` | Tokens visuais |
| `specs/sdd/02-arquitetura-landing.md` | Estrutura técnica |
| `specs/sdd/03-integracao-portal-cliente.md` | Regras da seção Portal do Cliente |

---

*Versão 1.0 — jul/2026*
