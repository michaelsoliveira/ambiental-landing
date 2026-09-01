# Projeto: Landing — Ambiental Consultoria e Serviços Ambientais e Segurança do Trabalho

## Objetivo

Desenvolver uma landing page institucional premium para a **Ambiental Consultoria e Serviços Ambientais e
Segurança do Trabalho**, cobrindo dois papéis ao mesmo tempo:

1. **Geração de leads comerciais** para os serviços de consultoria ambiental e SST (licenciamento, laudos, PGR,
   PCMSO, treinamentos NR, gestão de resíduos, brigada de incêndio, etc.).
2. **Vitrine do portal SaaS** `ambiental-system` — o sistema usado para entregar e acompanhar esses serviços
   (financeiro, monitoramento em tempo real) — ver `specs/sdd/03-integracao-portal-cliente.md`.

A landing deve transmitir autoridade técnica, conformidade regulatória e tecnologia — sem parecer uma ONG nem um
site institucional genérico dos anos 2010.

---

# Estilo Visual

## Direção visual

A interface deve seguir um padrão:
- técnico, mas acessível;
- institucional com peso de autoridade (compliance, laudos, auditoria);
- tecnológico (dashboards, monitoramento em tempo real);
- limpo, com bastante espaço em branco;
- verde como cor de marca — **não** como clichê de "sustentabilidade genérica".

Inspirar-se **em nível** (nunca copiar) em:
- https://ambipar.com/ — estrutura de seções B2B, ritmo, seção de métricas/números, tom institucional
- Linear, Stripe, Vercel — padrão visual de SaaS moderno para a seção "Portal do Cliente"
- modern industrial/EHS SaaS landing pages 2026

Detalhes completos de paleta, tipografia, espaçamento, motion e componentes: **`specs/sdd/01-design-system.md`**
(fonte única de verdade — nunca hardcodar cor/espaçamento fora dela).

## Paleta visual (resumo — ver SDD-01 para tokens completos)

- **Primária:** verde institucional (`primary-600 #059669`) — marca, CTAs, navegação.
- **Accent:** âmbar de segurança (`accent-500 #F59E0B`) — pilar SST, selos de conformidade, uso pontual.
- **Tech:** azul (`tech-600 #0284C7`) — exclusivo da seção/CTA do Portal do Cliente.
- **Neutros:** off-white com leve matiz verde, nunca cinza puro.

Evitar: gradiente arco-íris, verde-folha estilo ONG, ícones de banco de imagem, aparência de template WordPress.

---

# Stack obrigatória

- Next.js 15 App Router
- TypeScript
- TailwindCSS (tokens do design system)
- Framer Motion
- shadcn/ui
- Lucide Icons

Detalhes de arquitetura, estrutura de pastas e metas de performance: **`specs/sdd/02-arquitetura-landing.md`**.

---

# Estrutura da landing page

Ordem obrigatória das seções (refletir em `src/app/page.tsx` — ver SDD-02 §3):

1. **Header** — nav + dois CTAs (comercial e portal do cliente)
2. **Hero** — headline de resultado, dupla CTA, mockup do produto
3. **Prova Social / Números** — clientes atendidos, laudos emitidos, anos de atuação, uptime do monitoramento
4. **Pilares de Atuação** — Consultoria Ambiental × Segurança do Trabalho (dois cards grandes, espelha os dois
   "pilares" de referência do setor sem copiar nomenclatura de terceiros)
5. **Soluções e Serviços** — bento grid com o catálogo real de 9 especialidades da empresa: Segurança do
   Trabalho, Meio Ambiente, Aerolevantamento, Sismografia, Hidrossemeadura, Logística, Instrumentação para
   Monitoramento, Combate a Incêndio e Pânico, Mineração e Geotécnica
6. **Portal do Cliente** — vitrine do `ambiental-system` (financeiro + monitoramento em tempo real) — ver
   `specs/sdd/03-integracao-portal-cliente.md` antes de escrever copy desta seção
7. **Segmentos/Indústrias Atendidas** — indústria, agronegócio, construção civil, logística, etc.
8. **Diferenciais** — equipe técnica multidisciplinar, tecnologia própria, compliance sempre atualizado
9. **Depoimentos/Cases**
10. **Abrangência** — mapa/lista de regiões atendidas
11. **Como Funciona** — contratação de consultoria vs. assinatura do portal
12. **FAQ**
13. **CTA Final + Formulário de Contato**
14. **Footer**

Especificação funcional completa (requisitos por seção, copy, RF-XX): **`specs/SPEC_MODULO_LANDING_AMBIENTAL.md`**.

---

# Copywriting

Tom:
- técnico e direto, sem jargão desnecessário para o leitor leigo;
- autoridade regulatória (cita normas — NR, PGR, PCMSO — corretamente, nunca de forma vaga);
- foco em risco mitigado e conformidade, não em medo;
- claro sobre o que é serviço de consultoria e o que é o portal/sistema.

Evitar:
- greenwashing genérico ("cuidamos do planeta" sem substância);
- promessas de "zero risco" ou "aprovação garantida";
- jargão jurídico-ambiental sem explicação para o leitor leigo.

Glossário de termos obrigatórios e uso correto: `specs/SPEC_MODULO_LANDING_AMBIENTAL.md §6`.

---

# UX/UI, SEO e Conversão

- Mobile first, contraste AA, hierarquia visual clara, micro-animações discretas (ver SDD-01 §7).
- Metadata completa, OpenGraph, schema.org (`Organization`, `ProfessionalService`, `FAQPage`).
- Dois objetivos de conversão distintos e ambos visíveis sempre: **agendar consultoria** e **acessar portal**.
- Metas de performance e checklist de validação: `specs/HARNESS_LANDING_AMBIENTAL.md`.

---

# Referências

- https://ambipar.com/ — inspiração estrutural/nível, nunca cópia direta
- Linear, Stripe, Vercel — padrão visual da seção Portal do Cliente
- `clinic/landing/CLAUDE.md` e `inexahub/landing/CLAUDE.md` — mesmo padrão de projeto já validado neste ambiente
  de trabalho

---

# Onde estão as coisas

```
specs/
  sdd/                                — Software Design Documents (arquitetura, numerados)
    01-design-system.md               — paleta, tipografia, espaçamento, motion, componentes
    02-arquitetura-landing.md         — stack, estrutura de pastas, performance
    03-integracao-portal-cliente.md   — relação landing ↔ ambiental-system
    04-cms-conteudo-landing.md        — CMS tipado (Sanity/local), mídia, carrossel
  SPEC_MODULO_LANDING_AMBIENTAL.md    — spec funcional/produto (RF-XX por seção, personas, glossário)
  SKILL_LANDING_AMBIENTAL.md          — skill de construção SDD-driven (ordem obrigatória de implementação)
  HARNESS_LANDING_AMBIENTAL.md        — validação da feature "landing completa" (checklist CA-XX, DoD)
  HARNESS.md                          — comandos de validação por camada (raiz)
  README.md                           — índice das specs

.claude/commands/                     — skills (slash commands) para tarefas recorrentes
```

---

## Skills disponíveis

| Comando | Uso |
|---------|-----|
| `/sdd-landing` | Orquestra o fluxo spec-driven completo: lê specs, planeja, implementa, valida via harness |
| `/nova-secao-landing` | Scaffold de uma nova seção da landing (componente + registro em specs) |

---

# Resultado esperado

A landing final deve parecer:
- uma empresa de consultoria técnica de ponta, com tecnologia proprietária;
- confiável o suficiente para decisores de compliance/EHS de médias e grandes indústrias;
- moderna o suficiente para não parecer "site institucional dos anos 2010";
- pronta para tráfego pago B2B e para conversão de clientes existentes ao portal.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
