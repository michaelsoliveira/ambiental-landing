# Skill: /nova-secao-landing

Cria (ou recria) uma seção específica da landing, do dado estruturado ao componente registrado em `page.tsx`,
seguindo o design system e a spec funcional do projeto.

## Uso

```
/nova-secao-landing <NomeComponente> "<id-ancora>" "<objetivo da seção>"
```

Exemplo:
```
/nova-secao-landing Depoimentos "depoimentos" "Grid de 3 depoimentos de clientes com foto, nome, empresa e citação"
```

## O que este skill executa

### 1. Verificar pré-condições
- Confirmar que a seção está listada em `specs/SPEC_MODULO_LANDING_AMBIENTAL.md §4` (senão, adicionar o bloco RF-XX
  correspondente antes de gerar código).
- Ler `specs/sdd/01-design-system.md` para tokens de cor/tipografia/motion.
- Se a seção referenciar o portal (`ambiental-system`) → ler `specs/sdd/03-integracao-portal-cliente.md §6`
  (decisões em aberto) antes de escrever qualquer copy de feature específica.

### 2. Dados estruturados
**Arquivo**: `src/lib/constants.ts`
Adicionar (ou editar) o array/objeto de conteúdo da seção. Tipar em `src/types/content.ts` se a forma for nova.

### 3. Componente
**Arquivo**: `src/components/sections/<NomeComponente>.tsx`
Seguir o padrão de `specs/SKILL_LANDING_AMBIENTAL.md §6`:
- `<section id="<id-ancora>" className="py-16 lg:py-28 ...">`
- `Container` + `SectionHeading` + `FadeInUp` nos itens repetidos
- Cores exclusivamente via tokens (`bg-primary-600`, `bg-accent-500`, `bg-tech-600` — nunca hex cru)

### 4. Registro em page.tsx
**Arquivo**: `src/app/page.tsx`
Inserir `<NomeComponente />` na posição correta, conforme a ordem de `specs/SPEC_MODULO_LANDING_AMBIENTAL.md §4`.

### 5. Navegação (se a seção tiver âncora no header)
**Arquivo**: `src/components/shared/Header.tsx`
Adicionar `{ href: "#<id-ancora>", label: "<Label do menu>" }` ao array de itens de navegação.

### 6. Verificação final
```bash
cd ambiental-landing
npx tsc --noEmit
npx eslint src/components/sections/<NomeComponente>.tsx --ext .ts,.tsx
npx next build
```
- [ ] Seção renderiza nas 3 larguras de teste (375px / 768px / 1440px — `HARNESS_LANDING_AMBIENTAL.md §6`)
- [ ] Nenhuma cor/espaçamento fora dos tokens de `specs/sdd/01-design-system.md`
- [ ] RF-XX correspondente marcado como atendido

## Referências
- `specs/SKILL_LANDING_AMBIENTAL.md` — padrão de código completo e regras nunca/sempre
- `specs/SPEC_MODULO_LANDING_AMBIENTAL.md` — RF-XX por seção
- `specs/sdd/01-design-system.md` — tokens visuais
- `specs/HARNESS_LANDING_AMBIENTAL.md` — checklist de validação
- `.claude/commands/sdd-landing.md` — orquestração do fluxo completo (usar quando a mudança envolve múltiplas seções)
