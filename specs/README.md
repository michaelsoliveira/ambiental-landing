# Especificações técnicas — Landing Ambiental Consultoria

Documentação de produto e engenharia para a landing da **Ambiental Consultoria e Serviços Ambientais e Segurança
do Trabalho**, construída em fluxo spec-driven development (SDD): nenhuma seção é implementada sem antes ter sua
spec de conteúdo (RF-XX) e seu design system definidos aqui.

---

## Índice

| Documento | Público-alvo | Resumo |
|-----------|--------------|--------|
| [Design System](./sdd/01-design-system.md) | Design, frontend | Paleta (ambiental/SST/portal), tipografia, espaçamento, motion, padrões de componente |
| [Arquitetura da Landing](./sdd/02-arquitetura-landing.md) | Frontend | Stack, estrutura de pastas, bento grid, SEO, metas de performance |
| [Integração com Portal do Cliente](./sdd/03-integracao-portal-cliente.md) | Produto, frontend | Relação landing ↔ `ambiental-system`, CTAs, decisões em aberto |
| [CMS de conteúdo](./sdd/04-cms-conteudo-landing.md) | Produto, frontend | Conteúdo tipado (Sanity/local), mídia, carrossel — sem page builder |
| [Spec funcional (RF-XX)](./SPEC_MODULO_LANDING_AMBIENTAL.md) | Produto, comercial, frontend | Personas, proposta de valor, requisitos por seção, glossário técnico |
| [Skill de construção](./SKILL_LANDING_AMBIENTAL.md) | Claude Code | Ordem obrigatória de implementação, regras nunca/sempre, padrões de código |
| [Harness da feature](./HARNESS_LANDING_AMBIENTAL.md) | Claude Code, QA | Checklists de validação (design system, conteúdo, conversão, performance, a11y) |
| [Harness raiz](./HARNESS.md) | Claude Code | Comandos de validação por camada, CI |

---

## Como usar

- **Nova seção ou alteração de conteúdo:** rodar `/nova-secao-landing` ou `/sdd-landing` (`.claude/commands/`) —
  eles seguem `SKILL_LANDING_AMBIENTAL.md` automaticamente.
- **Dúvida de paleta/componente:** `sdd/01-design-system.md` é a fonte única de verdade — nunca decidir cor ad-hoc.
- **Dúvida sobre o que a seção deve conter:** `SPEC_MODULO_LANDING_AMBIENTAL.md`, requisito RF-XX correspondente.
- **Antes de dar por concluída qualquer entrega:** `HARNESS_LANDING_AMBIENTAL.md`.

---

## Stack (referência rápida)

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 15 App Router, TypeScript, TailwindCSS, Framer Motion, shadcn/ui |
| Ícones | Lucide Icons |
| Formulário | react-hook-form + zod |
| Deploy | Docker |

---

*Última atualização: jul/2026 — criação inicial das especificações (fase de design system, ainda sem código).*
