# HARNESS — Landing Ambiental Consultoria

> **Tipo:** Test Harness Specification
> **Versão:** 1.0 | **Status:** A implementar
> **Relacionado:** `SKILL_LANDING_AMBIENTAL.md`, `SPEC_MODULO_LANDING_AMBIENTAL.md`, `sdd/01-design-system.md`, `sdd/02-arquitetura-landing.md`

---

## 1. Objetivo

Validar a landing ponta a ponta: build sem erros, aderência ao design system, conteúdo completo por seção
(RF-XX), performance, SEO, acessibilidade e os dois fluxos de conversão (contato comercial e acesso ao portal).

---

## 2. Comandos de validação

```bash
cd ambiental-landing

npx tsc --noEmit
npx eslint src/ --ext .ts,.tsx
npx next build
```

Rodar após **cada seção** implementada (não acumular para o final — `SKILL_LANDING_AMBIENTAL.md §4.7`).

---

## 3. Checklist manual — Design System (CA-01)

- [ ] Nenhuma cor hex/rgb hardcoded em componentes — apenas classes Tailwind com os tokens de SDD-01
- [ ] Cor `tech-*` aparece **apenas** na seção/CTA do Portal do Cliente
- [ ] Seção `#sistemas` usa `primary`/`accent` (não `tech-*`) e lista os quatro produtos SaaS (financeiro, licenças, SST, manejo)
- [ ] CTAs de sistemas sem env apontam para `#contato`
- [ ] Cor `accent-*` usada só pontualmente (badges/ícones do pilar SST), nunca em grandes áreas
- [ ] Tipografia usa a escala de SDD-01 §3 (sem `text-[18px]` arbitrário)
- [ ] Espaçamento de seção segue `py-16 lg:py-28` (ou `py-32` nas seções de destaque)
- [ ] Todos os cards seguem o padrão de raio/sombra de SDD-01 §5/§9

## 4. Checklist manual — Conteúdo (CA-02)

- [ ] Todas as 14 seções de `SPEC_MODULO_LANDING_AMBIENTAL.md §4` presentes em `page.tsx`, na ordem
- [ ] Nenhum dado quantitativo inventado sem marcação de placeholder (`SKILL_LANDING_AMBIENTAL.md §5`)
- [ ] Glossário técnico (NR, PGR, PCMSO, SESMT etc.) usado corretamente — conferir contra `SPEC_MODULO §6`
- [ ] Seção Portal do Cliente não cita feature inexistente no `ambiental-system` real (SDD-03 §6)

## 5. Checklist manual — Conversão e navegação (CA-03)

- [ ] Header sempre mostra os dois CTAs (comercial verde + portal azul tech), inclusive no menu mobile
- [ ] Todas as âncoras de navegação (`#pilares`, `#solucoes`, `#sistemas`, `#portal-cliente`, ...) resolvem para a seção correta
- [ ] Formulário de contato valida campos obrigatórios (client-side, `zod`) e mostra estado de sucesso/erro sem `alert()`
- [ ] CTA "Acessar portal do cliente" aponta para `NEXT_PUBLIC_PORTAL_URL` (não para âncora interna)

## 6. Checklist manual — Responsividade (CA-04)

Testar em 375px (mobile), 768px (tablet) e 1440px (desktop):

- [ ] Nenhum overflow horizontal
- [ ] Bento grid (Soluções, Portal do Cliente) recolhe para 1 coluna no mobile
- [ ] Header vira menu hambúrguer abaixo de `lg`

## 7. Performance e SEO (CA-05)

Rodar Lighthouse (Chrome DevTools, modo mobile) em produção local (`next build && next start`):

| Métrica | Meta | Medido |
|---|---|---|
| Performance | ≥ 90 | |
| Accessibility | ≥ 95 | |
| SEO | 100 | |
| LCP | < 2.5s | |
| CLS | < 0.1 | |

- [ ] `next/image` usado em todas as imagens, com `sizes` definido
- [ ] Metadata/OpenGraph presentes (`view-source` ou inspecionar `<head>`)
- [ ] JSON-LD `Organization` + `ProfessionalService` presentes
- [ ] JSON-LD `FAQPage` presente e validado (Rich Results Test do Google, se disponível)
- [ ] `sitemap.xml` e `robots.txt` acessíveis

## 8. Acessibilidade (CA-06)

- [ ] Contraste de texto ≥ AA (verificar `primary-600` sobre branco e branco sobre `primary-600`)
- [ ] Todos os botões/links têm texto acessível (nunca só ícone sem `aria-label`)
- [ ] Formulário com `label` associado a cada campo
- [ ] Navegação por teclado funcional (tab order lógico, foco visível)

---

## 9. CI (sugestão)

```yaml
- name: Landing typecheck + lint + build
  run: |
    cd ambiental-landing
    npx tsc --noEmit
    npx eslint src/ --ext .ts,.tsx
    npx next build
```

---

## 10. Definition of Done

A landing (ou uma seção específica) está concluída quando:

1. `tsc`, `eslint` e `next build` passam sem erro.
2. Checklists CA-01 a CA-06 completos.
3. RF-XX da seção, conforme `SPEC_MODULO_LANDING_AMBIENTAL.md`, todos atendidos.
4. Nenhuma regra de `SKILL_LANDING_AMBIENTAL.md §5` violada.
5. Revisão visual lado a lado com `specs/sdd/01-design-system.md` (nenhuma cor/espaçamento fora do token).

---

*Versão 1.0 — jul/2026*
