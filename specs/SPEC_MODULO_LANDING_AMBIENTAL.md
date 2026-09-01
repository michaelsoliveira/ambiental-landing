# SPEC MÓDULO — Landing Ambiental Consultoria

> **Tipo:** Product Spec — funcional
> **Versão:** 1.0 | **Status:** A implementar
> **SDD:** `specs/sdd/01-design-system.md`, `specs/sdd/02-arquitetura-landing.md`, `specs/sdd/03-integracao-portal-cliente.md`
> **Skill de construção:** `specs/SKILL_LANDING_AMBIENTAL.md`

---

## 1. Objetivo

Landing page da **Ambiental Consultoria e Serviços Ambientais e Segurança do Trabalho**, com dois objetivos de
conversão simultâneos:

1. Gerar leads comerciais para os serviços de consultoria (formulário/CTA "Falar com um consultor").
2. Direcionar clientes existentes ao portal SaaS `ambiental-system` (CTA "Acessar portal do cliente").

---

## 2. Personas

| Persona | Papel | O que busca na landing |
|---|---|---|
| **Gestor de EHS / SESMT** | Responsável técnico por segurança do trabalho na empresa-cliente | Confiança técnica, escopo de serviços SST, prazos, conformidade com NRs |
| **Diretor industrial / de operações** | Decisor orçamentário | ROI, redução de risco/multa, abrangência nacional, cases |
| **Compliance ambiental / jurídico** | Responsável por licenciamento e regularização | Escopo de licenciamento, laudos, histórico de aprovação |
| **Cliente já contratado** | Usuário recorrente | Acesso rápido e óbvio ao portal (financeiro, monitoramento) |

---

## 3. Proposta de valor

> "Conformidade ambiental e segurança do trabalho, com tecnologia própria para acompanhar cada indicador em tempo
> real — sem depender de planilha, e-mail perdido ou visita surpresa do fiscal."

Pilares de mensagem:
- **Autoridade técnica** — equipe multidisciplinar (engenheiros ambientais, técnicos de segurança, biólogos).
- **Conformidade sempre atualizada** — normas (NRs, licenciamento) mudam; a consultoria acompanha.
- **Tecnologia** — portal próprio para dados em tempo real, não relatório em PDF uma vez por ano.

---

## 4. Especificação por seção (RF = Requisito Funcional)

### 4.1 Header

- RF-01: Logo + navegação âncora (Soluções, Portal, Segmentos, Depoimentos, FAQ, Contato).
- RF-02: Dois CTAs sempre visíveis — "Falar com um consultor" (verde) e "Acessar portal do cliente" (azul tech).
- RF-03: Menu mobile (hambúrguer) com os mesmos itens + CTAs em destaque.
- RF-04: Header com fundo transparente no topo, sólido com sombra sutil ao rolar (`scroll > 24px`).

### 4.2 Hero

- RF-05: Eyebrow/kicker: "CONSULTORIA AMBIENTAL & SEGURANÇA DO TRABALHO".
- RF-06: Headline focada em resultado, não em ferramenta — direção: *"Sua empresa em conformidade — com dados em
  tempo real, não em PDF anual."*
- RF-07: Subheadline objetiva com os dois pilares (ambiental + SST) em uma frase.
- RF-08: CTA primário ("Falar com um consultor") + CTA secundário ("Ver o portal do cliente" → âncora #portal-cliente,
  não o link externo — o link externo fica reservado ao header).
- RF-09: Mockup visual do portal (dashboard de monitoramento) como elemento de destaque à direita/abaixo.
- RF-10: Trust badges: número de clientes atendidos, anos de mercado (placeholder até dado real).

### 4.3 Prova Social / Números

- RF-11: 4 métricas em destaque com contador animado (SDD-01 §7): empresas atendidas, laudos/documentos emitidos,
  anos de atuação, indicadores monitorados em tempo real.
- RF-12: Logos de clientes (placeholder até logos reais serem fornecidos — nunca inventar nomes de empresas reais).

### 4.4 Pilares de Atuação

- RF-13: Dois cards grandes lado a lado — "Consultoria Ambiental" e "Segurança do Trabalho" — cada um com ícone,
  3–4 bullets de escopo e link para a seção Soluções filtrada (âncora).
- RF-14: Card Ambiental usa paleta `primary`; card SST usa acento `accent` (SDD-01 §2).

### 4.5 Soluções e Serviços (bento grid)

- RF-15: Bloco "Licenciamento Ambiental" — regularização junto a órgãos ambientais.
- RF-16: Bloco "Laudos Técnicos" — laudos de insalubridade, periculosidade, ruído, ergonomia.
- RF-17: Bloco "PGR / PCMSO" — Programa de Gerenciamento de Riscos e Controle Médico de Saúde Ocupacional.
- RF-18: Bloco "Gestão de Resíduos" — plano de gerenciamento de resíduos sólidos.
- RF-19: Bloco "Treinamentos NR" — treinamentos normativos (NR-6, NR-10, NR-35, etc. — citar apenas as que a
  empresa de fato oferece; placeholder até confirmação).
- RF-20: Bloco "Brigada de Incêndio" — formação e gestão de brigada.
- RF-21: Cada bloco linka para a seção FAQ ou para o formulário de contato com contexto pré-preenchido (query param
  `?servico=licenciamento`).

### 4.6 Portal do Cliente

- RF-22: Ler `specs/sdd/03-integracao-portal-cliente.md` antes de escrever esta seção — não citar nomes de tela que
  não existem no produto real.
- RF-23: Bento grid com 2 blocos principais: "Financeiro" (cobranças, contratos, notas) e "Monitoramento em tempo
  real" (indicadores/sensores, alertas).
- RF-24: CTA "Acessar portal do cliente" ao final da seção, mesma cor `tech-600`.
- RF-25: Screenshot/mockup estático — nunca dado real de cliente.

### 4.7 Segmentos / Indústrias Atendidas

- RF-26: Grid de 6–8 segmentos (indústria, agronegócio, construção civil, logística/transporte, mineração,
  energia) com ícone + nome — sem texto longo.

### 4.8 Diferenciais

- RF-27: 4–6 diferenciais em cards pequenos: equipe multidisciplinar, tecnologia própria (portal), atendimento
  nacional, conformidade sempre atualizada, prazo de resposta, suporte técnico dedicado.

### 4.9 Depoimentos / Cases

- RF-28: Carrossel ou grid estático de 3 depoimentos (placeholder até depoimentos reais — nunca inventar citação
  atribuída a empresa real sem autorização).

### 4.10 Abrangência

- RF-29: Lista ou mapa simplificado de regiões/estados atendidos (placeholder até dado real).

### 4.11 Como Funciona

- RF-30: 3 passos lado a lado explicando a jornada: (1) Diagnóstico inicial → (2) Execução da consultoria →
  (3) Acompanhamento contínuo pelo portal. Deixa explícito que consultoria e portal são parte da mesma jornada, não
  produtos separados.

### 4.12 FAQ

- RF-31: Mínimo 6 perguntas cobrindo: prazo de implantação, abrangência geográfica, o que é o portal, LGPD/dados
  sensíveis de indicadores ambientais, cancelamento/renovação, diferença entre consultoria avulsa e assinatura do
  portal.
- RF-32: Usar `accordion` do shadcn/ui; marcar com JSON-LD `FAQPage` (SDD-02 §5).

### 4.13 CTA Final + Contato

- RF-33: Formulário: nome, empresa, e-mail, telefone, serviço de interesse (select com as opções de §4.5), mensagem.
- RF-34: Validação client-side via `zod` + `react-hook-form`; envio via `src/app/api/contato/route.ts`.
- RF-35: Estado de sucesso/erro visível (toast ou inline), nunca `alert()`.

### 4.14 Footer

- RF-36: Nome legal completo ("Ambiental Consultoria e Serviços Ambientais e Segurança do Trabalho"), CNPJ
  (placeholder), endereço, links de navegação, redes sociais, link para política de privacidade/LGPD.

---

## 5. Métricas de conversão (alvo — revisar após dados reais)

| Métrica | Meta inicial |
|---|---|
| Taxa de conversão do formulário de contato | ≥ 2.5% dos visitantes |
| Cliques em "Acessar portal do cliente" / visitantes recorrentes | acompanhar como proxy de ativação |
| Tempo médio até primeira interação com CTA | < 30s |

---

## 6. Glossário (usar termos corretamente — nunca de forma vaga)

| Termo | Significado |
|---|---|
| **NR** | Norma Regulamentadora (Ministério do Trabalho) — ex.: NR-6 (EPI), NR-10 (eletricidade), NR-35 (altura) |
| **PGR** | Programa de Gerenciamento de Riscos — substitui o antigo PPRA |
| **PCMSO** | Programa de Controle Médico de Saúde Ocupacional |
| **SESMT** | Serviço Especializado em Engenharia de Segurança e Medicina do Trabalho |
| **Licenciamento ambiental** | Processo de regularização junto a órgãos ambientais (municipal/estadual/federal) |
| **Laudo de insalubridade/periculosidade** | Documento técnico que embasa adicionais salariais e medidas de proteção |
| **Brigada de incêndio** | Equipe interna treinada para prevenção e combate a princípio de incêndio (NR-23) |
| **PGRS** | Plano de Gerenciamento de Resíduos Sólidos |

---

*Versão 1.0 — jul/2026*
