import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  Clock,
  Factory,
  Flame,
  Gauge,
  Globe2,
  HardHat,
  Headset,
  LayoutDashboard,
  Leaf,
  Mountain,
  Plane,
  Recycle,
  ShieldCheck,
  Sprout,
  Truck,
  Users,
  Zap,
} from "lucide-react";

import type {
  Depoimento,
  Diferencial,
  FaqItem,
  MetricaProvaSocial,
  NavItem,
  PassoComoFunciona,
  Pilar,
  PortalBloco,
  Projeto,
  RegiaoAtendida,
  Segmento,
  Solucao,
} from "@/types/content";

export { portalUrl, siteUrl } from "@/lib/site";

/** Dados reais da Ambiental Consultoria e Serviços (Macapá — AP), a partir do
 *  projeto de design importado — substitui os placeholders anteriores. */
export const contactInfo = {
  address:
    "Rod. Juscelino Kubitscheck, 4550 — Chefe Clodoaldo, Macapá — AP, 68903-197",
  location: "Macapá — AP",
  phone: "(96) 98113-9394",
  phoneSecondary: "(96) 98116-1192",
  whatsapp: "https://wa.me/5596990453300",
  email: "ambiental.servicosap@hotmail.com",
};

export const socialLinksData = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100091911303940",
    ariaLabel: "Facebook da Ambiental Consultoria",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ambiental_consultoriaap/",
    ariaLabel: "Instagram da Ambiental Consultoria",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ambiental-consultoria-e-servi%C3%A7os-eireli/",
    ariaLabel: "LinkedIn da Ambiental Consultoria",
  },
];

/** Navbar principal — enxuta; CTAs cobrem Contato. */
export const headerNavItems: NavItem[] = [
  { label: "Início", href: "#top" },
  { label: "Soluções", href: "/servicos" },
  { label: "Sistemas", href: "#sistemas" },
  { label: "Projetos", href: "/projetos" },
  { label: "Segmentos", href: "#segmentos" },
];

/** Footer / sitemap — inclui âncoras omitidas do navbar. */
export const navItems: NavItem[] = [
  ...headerNavItems,
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export const metricasProvaSocial: MetricaProvaSocial[] = [
  {
    id: "anos-atuacao",
    valor: 13,
    sufixo: "+",
    label: "anos de mercado desde 2012",
  },
  {
    id: "projetos-entregues",
    valor: 300,
    sufixo: "+",
    label: "projetos entregues",
  },
  {
    id: "especialidades",
    valor: 9,
    label: "áreas de especialidade",
  },
];

export const pilares: Pilar[] = [
  {
    id: "ambiental",
    tone: "primary",
    icon: Recycle,
    titulo: "Consultoria Ambiental",
    descricao:
      "Regularização, laudos e gestão de resíduos conduzidos por equipe técnica especializada.",
    bullets: [
      "Licenciamento ambiental (municipal, estadual e federal)",
      "Laudos técnicos e estudos ambientais",
      "Plano de Gerenciamento de Resíduos Sólidos (PGRS)",
      "Acompanhamento contínuo de conformidade",
    ],
    // href: "#solucoes",
    href: "/servicos",
  },
  {
    id: "sst",
    tone: "accent",
    icon: HardHat,
    titulo: "Segurança do Trabalho",
    descricao:
      "Programas obrigatórios, treinamentos normativos e resposta a emergência, sempre atualizados às NRs.",
    bullets: [
      "PGR (Programa de Gerenciamento de Riscos) e PCMSO",
      "Laudos de insalubridade e periculosidade",
      "Treinamentos normativos (NRs)",
      "Formação e gestão de brigada de incêndio",
    ],
    href: "#solucoes",
  },
];

export const solucoes: Solucao[] = [
  {
    id: "seguranca",
    icon: ShieldCheck,
    titulo: "Segurança do Trabalho",
    descricao:
      "Programas, laudos e documentação para prevenir acidentes e adequar sua empresa às normas regulamentadoras.",
    descricaoLonga:
      "Elaboramos programas de prevenção, mapas de risco, rotas de fuga e laudos técnicos, cuidando da conformidade e da segurança de todos os colaboradores.",
    colSpan: "lg:col-span-6",
    servicoParam: "seguranca",
  },
  {
    id: "meio-ambiente",
    icon: Leaf,
    titulo: "Meio Ambiente",
    descricao:
      "Licenciamento, cadastros e laudos técnicos para empresas que precisam atender às exigências ambientais.",
    descricaoLonga:
      "Da regularização junto aos órgãos competentes à elaboração de laudos técnicos, apoiamos sua empresa em todo o processo de adequação ambiental.",
    colSpan: "lg:col-span-6",
    servicoParam: "meio-ambiente",
  },
  {
    id: "aerolevantamento",
    icon: Plane,
    titulo: "Aerolevantamento",
    descricao:
      "Levantamento aerogeofísico e aerofotogrametria para mapear terrenos e territórios com precisão.",
    descricaoLonga:
      "Serviço aéreo de medição de terrenos e espaços marítimos, usado na construção de mapas e plantas e no controle de fronteiras.",
    colSpan: "lg:col-span-4",
    servicoParam: "aerolevantamento",
  },
  {
    id: "sismografia",
    icon: Activity,
    titulo: "Sismografia",
    descricao:
      "Monitoramento de vibrações e ruído para garantir a segurança estrutural de edificações.",
    descricaoLonga:
      "Captamos e interpretamos ondas sísmicas e acústicas com sismógrafos de precisão, avaliando vibração e pressão acústica em diferentes ambientes.",
    colSpan: "lg:col-span-4",
    servicoParam: "sismografia",
  },
  {
    id: "hidrossemeadura",
    icon: Sprout,
    titulo: "Hidrossemeadura",
    descricao:
      "Recuperação de áreas degradadas por jateamento de sementes, fertilizantes e fibra de madeira.",
    descricaoLonga:
      "Solução de alta viscosidade aplicada por hidrojateamento, que dispensa preparo do solo e acelera a germinação em qualquer tipo de terreno.",
    colSpan: "lg:col-span-4",
    servicoParam: "hidrossemeadura",
  },
  {
    id: "logistica",
    icon: Truck,
    titulo: "Logística",
    descricao:
      "Frota moderna e equipe experiente para transporte especializado da sua cadeia de suprimentos.",
    descricaoLonga:
      "Soluções logísticas personalizadas, com agilidade e segurança, para otimizar operações de transporte e frete.",
    colSpan: "lg:col-span-4",
    servicoParam: "logistica",
    imagem: {
      url: "/images/Frete%20e%20Logistica%20-%20Ambiental%20Consultoria.png",
      alt: "Frete e Logística — Ambiental Consultoria",
    },
  },
  {
    id: "monitoramento",
    icon: Gauge,
    titulo: "Instrumentação para Monitoramento",
    descricao:
      "Monitoramento de barragens e consultoria para uma gestão sustentável de estruturas críticas.",
    descricaoLonga:
      "Oferecemos consultoria e treinamento para melhorar práticas de gestão de barragens, protegendo comunidades e ecossistemas aquáticos.",
    colSpan: "lg:col-span-4",
    servicoParam: "monitoramento",
  },
  {
    id: "incendio",
    icon: Flame,
    titulo: "Combate a Incêndio e Pânico",
    descricao:
      "Projetos técnicos para detecção, controle e contenção de incêndios em edificações.",
    descricaoLonga:
      "Especificações técnicas completas para prevenção e combate a incêndio e pânico, atendendo às exigências do corpo de bombeiros.",
    colSpan: "lg:col-span-4",
    servicoParam: "incendio",
  },
  {
    id: "mineracao",
    icon: Mountain,
    titulo: "Mineração e Geotécnica",
    descricao:
      "Engenharia geotécnica e suporte técnico para operações de mineração com segurança.",
    descricaoLonga:
      "Suporte técnico especializado em engenharia geotécnica e mineração, do estudo do solo à operação segura.",
    colSpan: "lg:col-span-12",
    servicoParam: "mineracao",
  },
];

export const portalBlocos: PortalBloco[] = [
  {
    id: "financeiro",
    icon: BarChart3,
    titulo: "Financeiro",
    descricao: "Cobranças, contratos e notas em um único lugar, sem depender de e-mail ou planilha.",
    bullets: [
      "Cobranças e contratos centralizados",
      "Histórico de notas e pagamentos",
      "Visão consolidada por unidade ou contrato",
    ],
    colSpan: "lg:col-span-6",
  },
  {
    id: "monitoramento",
    icon: Activity,
    titulo: "Monitoramento em tempo real",
    descricao: "Acompanhe indicadores ambientais e de segurança sem esperar o relatório anual.",
    bullets: [
      "Indicadores atualizados em tempo real",
      "Alertas automáticos de desvio",
      "Histórico pronto para auditoria e fiscalização",
    ],
    colSpan: "lg:col-span-6",
  },
];

/** Vitrine dos sistemas SaaS (financeiro/portal, licenças, SST, manejo). */
export const sistemasItems = [
  {
    id: "financeiro",
    tone: "primary" as const,
    iconKey: "BarChart3" as const,
    titulo: "Gestão financeira e portal do cliente",
    descricao:
      "Portal financeiro para cobranças, contratos, notas e acompanhamento da operação — o mesmo sistema usado na entrega da consultoria.",
    bullets: [
      "Cobranças, contratos e notas em um só lugar",
      "Acesso do cliente sem depender de e-mail ou planilha",
      "Visão consolidada por unidade ou contrato",
      "Base para monitoramento e conformidade contínua",
    ],
    mockVariant: "financeiro" as const,
    accessLabel: "Acessar portal financeiro",
  },
  {
    id: "licencas",
    tone: "primary" as const,
    iconKey: "ClipboardList" as const,
    titulo: "Monitoramento de condicionantes ambientais",
    descricao:
      "Acompanhe prazos, evidências e status das condicionantes vinculadas às licenças — com agenda, kanban e histórico auditável.",
    bullets: [
      "Licenças e condicionantes por empreendimento",
      "Prazos, tarefas e evidências centralizados",
      "Visão operacional em lista, kanban e agenda",
      "Rastreabilidade para auditoria e órgãos ambientais",
    ],
    mockVariant: "condicionantes" as const,
    accessLabel: "Acessar sistema de licenças",
  },
  {
    id: "sst",
    tone: "accent" as const,
    iconKey: "ShieldCheck" as const,
    titulo: "Gestão em saúde e segurança do trabalho",
    descricao:
      "Plataforma para Medicina e Segurança do Trabalho: exames ocupacionais, ASO, PCMSO, PGR e conformidade com as NRs.",
    bullets: [
      "Empresas, trabalhadores e exames ocupacionais",
      "ASO, PCMSO e gestão documental SST",
      "PGR e inventário de riscos (NR-1)",
      "Painel administrativo com governança de conteúdo",
    ],
    mockVariant: "sst" as const,
    accessLabel: "Acessar sistema SST",
  },
  {
    id: "manejo",
    tone: "primary" as const,
    iconKey: "Trees" as const,
    titulo: "Auxílio ao manejo florestal",
    descricao:
      "Ferramenta de apoio ao planejamento e acompanhamento de operações de manejo florestal, com foco em organização e conformidade.",
    bullets: [
      "Organização de operações e atividades de campo",
      "Acompanhamento de etapas do manejo",
      "Registros e evidências por área/atividade",
      "Visão consolidada para equipe técnica",
    ],
    mockVariant: "manejo" as const,
    accessLabel: "Acessar sistema de manejo",
  },
];

export const segmentos: Segmento[] = [
  { id: "industria", icon: Factory, nome: "Indústria" },
  { id: "agronegocio", icon: Sprout, nome: "Agronegócio" },
  { id: "construcao-civil", icon: Building2, nome: "Construção Civil" },
  { id: "logistica", icon: Truck, nome: "Logística e Transporte" },
  { id: "mineracao", icon: Mountain, nome: "Mineração" },
  { id: "energia", icon: Zap, nome: "Energia" },
];

export const diferenciais: Diferencial[] = [
  {
    id: "equipe-multidisciplinar",
    icon: Users,
    titulo: "Equipe técnica multidisciplinar",
    descricao: "Engenheiros ambientais, técnicos de segurança e especialistas em normas regulamentadoras.",
  },
  {
    id: "tecnologia-propria",
    icon: LayoutDashboard,
    titulo: "Tecnologia própria",
    descricao: "Portal exclusivo para acompanhar financeiro e indicadores sem depender de terceiros.",
  },
  {
    id: "atendimento-nacional",
    icon: Globe2,
    titulo: "Atendimento nacional",
    descricao: "Estrutura preparada para atender operações em múltiplas regiões do país.",
  },
  {
    id: "conformidade-atualizada",
    icon: AlertTriangle,
    titulo: "Conformidade sempre atualizada",
    descricao: "Acompanhamento contínuo de mudanças em normas e prazos regulatórios.",
  },
  {
    id: "prazo-resposta",
    icon: Clock,
    titulo: "Prazo de resposta ágil",
    descricao: "Diagnóstico inicial rápido para não travar a operação do cliente.",
  },
  {
    id: "suporte-dedicado",
    icon: Headset,
    titulo: "Suporte técnico dedicado",
    descricao: "Time técnico acessível para dúvidas de conformidade e uso do portal.",
  },
];

export const depoimentos: Depoimento[] = [
  {
    id: "depoimento-1",
    nome: "Depoimento ilustrativo",
    cargo: "Gestor(a) de SESMT",
    empresa: "Indústria de médio porte",
    texto:
      "Ter os indicadores de segurança acessíveis em tempo real mudou a forma como acompanhamos a conformidade entre as visitas técnicas.",
    isPlaceholder: true,
  },
  {
    id: "depoimento-2",
    nome: "Depoimento ilustrativo",
    cargo: "Diretor(a) industrial",
    empresa: "Operação multi-unidade",
    texto:
      "A consultoria organizou nosso licenciamento e o portal deu visibilidade financeira que antes dependia de planilha.",
    isPlaceholder: true,
  },
  {
    id: "depoimento-3",
    nome: "Depoimento ilustrativo",
    cargo: "Responsável por compliance ambiental",
    empresa: "Setor de logística",
    texto:
      "O acompanhamento contínuo evitou que a gente fosse pego de surpresa em uma fiscalização.",
    isPlaceholder: true,
  },
];

export const regioesAtendidas: RegiaoAtendida[] = [
  { regiao: "Amapá", estados: ["Macapá", "Santana", "Região Metropolitana"] },
  { regiao: "Brasil", estados: ["Atendimento em todo o território nacional"] },
];

export const passosComoFunciona: PassoComoFunciona[] = [
  {
    id: "diagnostico",
    numero: "01",
    titulo: "Diagnóstico inicial",
    descricao: "Levantamento do cenário ambiental e de segurança do trabalho da operação.",
  },
  {
    id: "execucao",
    numero: "02",
    titulo: "Execução da consultoria",
    descricao: "Licenciamento, laudos, programas obrigatórios e treinamentos conduzidos pela equipe técnica.",
  },
  {
    id: "acompanhamento",
    numero: "03",
    titulo: "Acompanhamento contínuo pelo portal",
    descricao: "Financeiro e indicadores acompanhados em tempo real, como parte da mesma jornada.",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "prazo-implantacao",
    pergunta: "Qual o prazo para implantar a consultoria?",
    resposta:
      "O prazo varia conforme o escopo (licenciamento, laudos, programas obrigatórios) e a complexidade da operação. O diagnóstico inicial define um cronograma específico para cada cliente.",
  },
  {
    id: "abrangencia-geografica",
    pergunta: "Vocês atendem em qual abrangência geográfica?",
    resposta:
      "Atendemos operações em diferentes regiões do país. As regiões de atuação atual estão listadas na seção Abrangência — consulte-nos para confirmar disponibilidade na sua localidade.",
  },
  {
    id: "o-que-e-portal",
    pergunta: "O que é o portal do cliente?",
    resposta:
      "É o sistema usado para acompanhar, em tempo real, os dados financeiros (cobranças, contratos, notas) e os indicadores ambientais e de segurança do trabalho gerados pela consultoria — sem depender de relatório em PDF ou planilha.",
  },
  {
    id: "lgpd-dados-sensiveis",
    pergunta: "Como os dados de indicadores ambientais são tratados em relação à LGPD?",
    resposta:
      "Os dados de indicadores e informações de contrato são tratados conforme a Lei Geral de Proteção de Dados (LGPD), com acesso restrito ao cliente e à equipe técnica responsável pelo atendimento.",
  },
  {
    id: "cancelamento-renovacao",
    pergunta: "Como funciona o cancelamento ou renovação?",
    resposta:
      "As condições de cancelamento e renovação são definidas em contrato no momento da contratação, de acordo com o serviço (consultoria avulsa ou assinatura do portal).",
  },
  {
    id: "consultoria-vs-portal",
    pergunta: "Qual a diferença entre contratar a consultoria avulsa e assinar o portal?",
    resposta:
      "A consultoria avulsa cobre a execução de um serviço específico (um laudo, um licenciamento). A assinatura do portal dá acompanhamento contínuo dos indicadores e do financeiro gerados pelos serviços contratados — as duas frentes fazem parte da mesma jornada, não são produtos separados.",
  },
];

export const servicosContato = solucoes.map((s) => ({
  value: s.servicoParam,
  label: s.titulo,
}));

/** Catálogo de projetos por categoria — imagens reais entram via upload no CMS
 *  (Sanity Studio ou admin do ambiental-system); sem upload, o card usa placeholder. */
export const projetos: Projeto[] = [
  {
    id: "licenciamento-terminal-logistico",
    categoria: "meio-ambiente",
    titulo: "Licenciamento de terminal logístico",
    descricao: "Regularização ambiental completa junto ao órgão estadual.",
  },
  {
    id: "programa-seguranca-industria",
    categoria: "seguranca",
    titulo: "Programa de segurança para indústria",
    descricao: "Mapeamento de risco e treinamento de equipe operacional.",
  },
  {
    id: "mapeamento-aerofotogrametrico",
    categoria: "aerolevantamento",
    titulo: "Mapeamento aerofotogramétrico rural",
    descricao: "Levantamento de área de 1.200 hectares para planejamento fundiário.",
  },
  {
    id: "monitoramento-vibracao-obra",
    categoria: "sismografia",
    titulo: "Monitoramento de vibração em obra urbana",
    descricao: "Controle de vibração e ruído durante fundação de edifício.",
  },
  {
    id: "recuperacao-talude-rodoviario",
    categoria: "hidrossemeadura",
    titulo: "Recuperação de talude rodoviário",
    descricao: "Revegetação por hidrossemeadura em trecho de rodovia estadual.",
  },
  {
    id: "transporte-equipamentos-mineracao",
    categoria: "logistica",
    titulo: "Transporte especializado de equipamentos",
    descricao: "Logística de cargas técnicas para operação de mineração.",
  },
  {
    id: "monitoramento-barragem-rejeito",
    categoria: "monitoramento",
    titulo: "Monitoramento de barragem de rejeito",
    descricao: "Instalação de instrumentação geotécnica e leitura periódica.",
  },
  {
    id: "ppci-galpao-industrial",
    categoria: "incendio",
    titulo: "Projeto de PPCI para galpão industrial",
    descricao: "Projeto técnico completo aprovado junto ao corpo de bombeiros.",
  },
  {
    id: "suporte-geotecnico-cava-mineracao",
    categoria: "mineracao",
    titulo: "Suporte geotécnico em cava de mineração",
    descricao: "Consultoria em estabilidade de taludes para operação segura.",
  },
];
