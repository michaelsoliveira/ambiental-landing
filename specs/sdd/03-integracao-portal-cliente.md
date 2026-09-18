# SDD 03 — Integração com o Portal do Cliente (`ambiental-system`)

> **Tipo:** Software Design Document — Integração entre produtos
> **Versão:** 1.0 | **Status:** Rascunho — contém decisões em aberto (§6)
> **Repositório do produto:** `ambiental-system/` (Turborepo — apps `api`, `financeiro`, `monitoramento`, `import-data`)

---

## 1. Contexto

A resposta de escopo do produto definiu que a landing cumpre **dois papéis simultâneos**:

1. **Site institucional** da Ambiental Consultoria — apresenta a empresa, os serviços de consultoria ambiental e
   segurança do trabalho, e gera leads comerciais (formulário/CTA de contato).
2. **Vitrine do portal SaaS** (`ambiental-system`) — o sistema que a Ambiental Consultoria usa para entregar e o
   cliente usa para acompanhar seus serviços (financeiro, monitoramento). A landing precisa converter tanto
   "quero contratar a consultoria" quanto "sou cliente, quero acessar meus dados".

Isso molda a seção **Portal do Cliente** (`SPEC_MODULO_LANDING_AMBIENTAL.md §4.6`) e o botão de topo de header, que
deve distinguir claramente os dois fluxos.

---

## 2. Dois CTAs de topo, sempre visíveis

No `Header` (`src/components/shared/Header.tsx`):

- **CTA primário (verde, `primary-600`):** "Falar com um consultor" → âncora `#contato` ou WhatsApp comercial.
- **CTA secundário (azul tech, `tech-600`):** "Acessar portal do cliente" → link externo para o domínio de login do
  `ambiental-system` (URL definida em `.env` como `NEXT_PUBLIC_PORTAL_URL`).

Nunca esconder o CTA de portal atrás de menu — ele é distinto visualmente (cor tech) para não competir com o CTA
comercial, mas sempre presente.

---

## 3. O que é público vs. autenticado

| Conteúdo | Onde vive | Autenticação |
|---|---|---|
| Institucional, serviços, cases, FAQ, contato | `ambiental-landing` (este repo) | Público |
| Screenshots/mockups do portal (marketing) | `ambiental-landing` — `public/images/` | Público (estáticos, sem dados reais de cliente) |
| Dashboard financeiro real do cliente | `ambiental-system/apps/financeiro` | Autenticado |
| Dashboard de monitoramento real (dados de sensores/indicadores) | `ambiental-system/apps/monitoramento` | Autenticado |

A landing **nunca** embute um `iframe` do sistema autenticado — usa apenas imagens estáticas/mockups no bento grid
da seção Portal do Cliente, com um CTA que leva ao login real.

---

## 4. Link de login

```env
# .env.local
NEXT_PUBLIC_PORTAL_URL=https://portal.ambientalconsultoria.com.br
```

Botão "Acessar portal do cliente" é um `<a>` simples para `process.env.NEXT_PUBLIC_PORTAL_URL`, `target="_self"`
(não abrir em nova aba — é uma troca de produto, não conteúdo complementar).

### 4.1 Sistemas SaaS (seção `#sistemas`)

A landing vitrine quatro sistemas desenvolvidos pela equipe:

| Produto | Env | Fallback |
|---------|-----|----------|
| Financeiro / portal (`ambiental-system`) | `NEXT_PUBLIC_SISTEMA_FINANCEIRO_URL` (default: `NEXT_PUBLIC_PORTAL_URL`) | `#contato` |
| Condicionantes / licenças | `NEXT_PUBLIC_SISTEMA_LICENCAS_URL` | `#contato` |
| SST (`inexahub-sst`) | `NEXT_PUBLIC_SISTEMA_SST_URL` | `#contato` |
| Manejo florestal | `NEXT_PUBLIC_SISTEMA_MANEJO_URL` | `#contato` |

Esses CTAs **não** usam a paleta `tech-*` (reservada à seção Portal do Cliente). Ver RF-25a–e em
`SPEC_MODULO_LANDING_AMBIENTAL.md`.

---

## 5. Consistência de marca entre landing e portal

- Paleta `tech-*` (`specs/sdd/01-design-system.md §2.3`) deve ser usada no header/login do `ambiental-system`
  também, para que a transição visual landing → portal não pareça um produto diferente.
- Logo idêntico nos dois produtos (mesmo arquivo SVG — replicar padrão de `inexahub/brand/assets/`: criar
  `ambiental-landing/brand/` com `logo-wordmark.svg`, `logo-icon.svg`, `logo-icon-mono-white.svg` e reusar em
  ambos os repositórios).

---

## 6. Decisões em aberto (resolver antes de implementar a seção Portal do Cliente)

- [ ] Domínio final do portal (subdomínio `portal.` vs. `app.` vs. domínio separado).
- [ ] `ambiental-system` hoje é um Turborepo sem `CLAUDE.md` próprio e sem branding aplicado (apps `financeiro`/
      `monitoramento` usam nome genérico `@saas/*`) — decidir se a landing referencia nomes de módulo reais
      ("Financeiro", "Monitoramento") ou nomes comerciais a definir.
  → Ver "Skills disponíveis" em `ambiental-landing/CLAUDE.md`: `/nova-secao-landing` deve ler este arquivo antes
    de gerar copy da seção Portal do Cliente para não inventar features que não existem no produto.
- [ ] Estratégia de trial/demo do portal (CTA leva direto ao login, ou a um formulário de solicitação de acesso?).

Enquanto estes pontos não forem fechados, a seção Portal do Cliente deve usar linguagem genérica de benefício
("acompanhe seus indicadores em tempo real") em vez de nomes de tela específicos do produto.

---

*Versão 1.0 — jul/2026*
