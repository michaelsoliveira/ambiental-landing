# HARNESS — Infraestrutura de Validação (raiz)

Define como rodar testes, type checks e validações de qualidade no projeto `ambiental-landing`.
Claude usa este documento para saber o que executar antes de considerar uma tarefa concluída.

---

## Comandos por camada

### Landing (Next.js/TypeScript) — única camada deste repositório

```bash
# Type check — SEMPRE rodar após edições
npx tsc --noEmit

# Lint
npx eslint src/ --ext .ts,.tsx

# Build (verifica erros de compilação, imports e metadata)
npx next build
```

Não há backend neste repositório — validações de API/dados pertencem a `ambiental-system/` (fora deste projeto).

---

## Regras de qualidade por operação

### Ao criar ou modificar um componente de seção (`src/components/sections/*`)
1. `npx tsc --noEmit` após a mudança.
2. Conferir contra `specs/sdd/01-design-system.md` — nenhuma cor/espaçamento fora dos tokens.
3. Conferir os RF-XX da seção em `specs/SPEC_MODULO_LANDING_AMBIENTAL.md`.

### Ao adicionar/editar dados em `src/lib/constants.ts`
1. Atualizar o tipo correspondente em `src/types/content.ts` se a forma do dado mudar.
2. Nunca inserir dado quantitativo real sem confirmação — usar placeholder explícito.

### Ao alterar `tailwind.config.ts`
1. A mudança deve refletir uma atualização em `specs/sdd/01-design-system.md` primeiro (spec é fonte de verdade,
   nunca o inverso).

### Antes de considerar a landing "pronta para deploy"
1. Rodar `specs/HARNESS_LANDING_AMBIENTAL.md` completo (checklists CA-01 a CA-06).
2. `npx next build && npx next start` local + Lighthouse mobile.

---

## Harness por feature

| Feature | Documento |
|---------|-----------|
| Landing completa | [HARNESS_LANDING_AMBIENTAL.md](./HARNESS_LANDING_AMBIENTAL.md) |

---

## Hooks Claude Code (`.claude/settings.local.json`, se configurado)

Sugestão de hooks a configurar (não aplicados automaticamente por este documento):

### PostToolUse[Write/Edit em `src/`]
- Lembrar de rodar `npx tsc --noEmit` após edição TypeScript/TSX.

### PostToolUse[Write/Edit em `tailwind.config.ts`]
- Lembrar de conferir `specs/sdd/01-design-system.md` para manter spec e config sincronizados.

---

## CI/CD

```bash
# Simular CI localmente
cd ambiental-landing
npx tsc --noEmit
npx eslint src/ --ext .ts,.tsx
npx next build
```

---

*Versão 1.0 — jul/2026*
