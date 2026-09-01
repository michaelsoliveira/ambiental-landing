# Skill: /sdd-landing

Orquestra o fluxo completo de spec-driven development para a landing da Ambiental Consultoria: lê as specs
relevantes, planeja a mudança, implementa e valida — nunca pula direto para código sem passar pelas specs.

## Uso

```
/sdd-landing "<descrição da mudança ou seção>"
```

Exemplo:
```
/sdd-landing "implementar a seção Hero"
/sdd-landing "ajustar copy do FAQ para incluir pergunta sobre LGPD"
/sdd-landing "landing completa do zero"
```

## O que este skill executa

### 1. Ler specs na ordem obrigatória
1. `specs/sdd/01-design-system.md` — tokens visuais
2. `specs/sdd/02-arquitetura-landing.md` — stack e estrutura de pastas
3. `specs/SPEC_MODULO_LANDING_AMBIENTAL.md` — localizar os RF-XX relacionados ao pedido
4. Se o pedido envolver a seção Portal do Cliente → `specs/sdd/03-integracao-portal-cliente.md`

### 2. Verificar se o projeto já foi inicializado
```bash
test -d ambiental-landing/src && echo "projeto existe" || echo "precisa scaffold"
```
Se não existir `src/`, executar o scaffold de `specs/SKILL_LANDING_AMBIENTAL.md §3` antes de prosseguir.

### 3. Planejar
- Listar as seções/arquivos afetados pelo pedido.
- Se o pedido for "landing completa do zero", seguir a ordem de `specs/SKILL_LANDING_AMBIENTAL.md §4`
  (Header → Footer), uma seção por vez.
- Se o pedido for uma seção específica ou ajuste pontual, escopar apenas os arquivos necessários.

### 4. Implementar
- Seguir `specs/SKILL_LANDING_AMBIENTAL.md §4` (passo a passo por seção) e §6 (padrão de código).
- Respeitar todas as regras de `specs/SKILL_LANDING_AMBIENTAL.md §5` (nunca/sempre).

### 5. Atualizar specs quando o conteúdo mudar
- Se a implementação alterar requisitos (nova seção, novo RF, novo dado estruturado), refletir a mudança em
  `specs/SPEC_MODULO_LANDING_AMBIENTAL.md` **na mesma tarefa** — spec e código nunca divergem.

### 6. Validar
Rodar `specs/HARNESS_LANDING_AMBIENTAL.md`:
```bash
cd ambiental-landing
npx tsc --noEmit
npx eslint src/ --ext .ts,.tsx
npx next build
```
Conferir os checklists manuais relevantes (CA-01 a CA-06) para o escopo alterado.

### 7. Resultado esperado
Reportar: seções/arquivos alterados, specs atualizadas (se houver) e resultado da validação (checklist §6).

## Referências
- `specs/SKILL_LANDING_AMBIENTAL.md` — skill de construção completo
- `specs/SPEC_MODULO_LANDING_AMBIENTAL.md` — requisitos funcionais
- `specs/sdd/01-design-system.md` — design system
- `specs/HARNESS_LANDING_AMBIENTAL.md` — validação
- `.claude/commands/nova-secao-landing.md` — scaffold de uma seção específica nova
