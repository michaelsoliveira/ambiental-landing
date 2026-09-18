import {
  contactInfo,
  depoimentos,
  diferenciais,
  faqItems,
  metricasProvaSocial,
  headerNavItems,
  navItems,
  passosComoFunciona,
  pilares,
  portalBlocos,
  portalUrl,
  projetos,
  regioesAtendidas,
  segmentos,
  sistemasItems,
  socialLinksData,
  solucoes,
} from "@/lib/constants";
import {
  resolveSistemaCtaLabel,
  resolveSistemaHref,
  sistemaFinanceiroUrl,
  sistemaLicencasUrl,
  sistemaManejoUrl,
  sistemaSstUrl,
} from "@/lib/site";
import {
  DEFAULT_SECTION_ORDER,
  type ContentIconKey,
  type LandingContent,
  type ProjetoCategoria,
} from "@/lib/content/schema";

const SOLUCAO_ICON_BY_ID: Record<string, ContentIconKey> = {
  seguranca: "ShieldCheck",
  "meio-ambiente": "Leaf",
  aerolevantamento: "Plane",
  sismografia: "Activity",
  hidrossemeadura: "Sprout",
  logistica: "Truck",
  monitoramento: "Gauge",
  incendio: "Flame",
  mineracao: "Mountain",
};

const PILAR_ICON_BY_ID: Record<string, ContentIconKey> = {
  ambiental: "Recycle",
  sst: "HardHat",
};

const PORTAL_ICON_BY_ID: Record<string, ContentIconKey> = {
  financeiro: "BarChart3",
  monitoramento: "Activity",
};

const SISTEMA_URL_BY_ID: Record<string, string | undefined> = {
  financeiro: sistemaFinanceiroUrl,
  licencas: sistemaLicencasUrl,
  sst: sistemaSstUrl,
  manejo: sistemaManejoUrl,
};

const SEGMENTO_ICON_BY_ID: Record<string, ContentIconKey> = {
  industria: "Factory",
  agronegocio: "Sprout",
  "construcao-civil": "Building2",
  logistica: "Truck",
  mineracao: "Mountain",
  energia: "Zap",
};

const DIFERENCIAL_ICON_BY_ID: Record<string, ContentIconKey> = {
  "equipe-multidisciplinar": "Users",
  "tecnologia-propria": "LayoutDashboard",
  "atendimento-nacional": "Globe2",
  "conformidade-atualizada": "AlertTriangle",
  "prazo-resposta": "Clock",
  "suporte-dedicado": "Headset",
};

/** Snapshot default — espelha o copy atual da landing (fallback sem CMS). */
export function getLocalLandingContent(): LandingContent {
  const trustMetrics = metricasProvaSocial
    .filter((m) => ["anos-atuacao", "projetos-entregues"].includes(m.id))
    .map((m) => ({
      id: m.id,
      valor: m.valor,
      sufixo: m.sufixo,
      label: m.label,
      isPlaceholder: m.isPlaceholder,
    }));

  return {
    meta: {
      source: "local",
      updatedAt: new Date().toISOString(),
    },
    layout: {
      sections: DEFAULT_SECTION_ORDER.map((key, index) => ({
        key,
        visible: true,
        order: index + 1,
      })),
    },
    header: {
      brandName: "Ambiental Consultoria",
      navItems: headerNavItems.map((n) => ({ label: n.label, href: n.href })),
      primaryCta: {
        label: "Solicitar Orçamento",
        href: "#contato",
        variant: "primary",
      },
      portalCta: {
        label: "Acessar portal do cliente",
        href: portalUrl,
        variant: "tech",
      },
      portalUrl,
      topBar: {
        phone: contactInfo.phone,
        email: contactInfo.email,
        location: contactInfo.location,
      },
      whatsapp: {
        label: "WhatsApp",
        href: contactInfo.whatsapp,
        variant: "outline",
      },
    },
    footer: {
      brandName: "Ambiental Consultoria",
      tagline:
        "Desde 2012 solucionando desafios ambientais, de segurança do trabalho e engenharia para empresas no Amapá e no Brasil.",
      legalLine: contactInfo.address,
      navItems: navItems.map((n) => ({ label: n.label, href: n.href })),
      socialLinks: socialLinksData,
      privacyHref: "/politica-de-privacidade",
      privacyLabel: "Política de privacidade (LGPD)",
      contact: {
        address: contactInfo.address,
        phone: `${contactInfo.phone} / ${contactInfo.phoneSecondary}`,
        whatsapp: contactInfo.whatsapp,
        email: contactInfo.email,
      },
    },
    hero: {
      layout: "immersive",
      carousel: {
        enabled: true,
        autoplay: true,
        intervalMs: 6500,
        loop: true,
      },
      wave: { enabled: true },
      slides: [
        {
          id: "conformidade",
          eyebrow: "Desde 2012 no Amapá e no Brasil",
          headline: "Conformidade ocupacional com",
          highlight: "dados em tempo real",
          accentText: "SST",
          subheadline:
            "PCMSO, PGR, ASO e laudos técnicos conduzidos por equipe especializada — com portal próprio para acompanhar indicadores.",
          ctas: [
            { label: "Solicitar Orçamento", href: "#contato", variant: "primary" },
            { label: "Ver o portal", href: "#portal-cliente", variant: "outline" },
          ],
          media: { kind: "none", motion: "kenburns" },
        },
        {
          id: "ambiental",
          eyebrow: "Consultoria Ambiental",
          headline: "Licenciamento e gestão",
          highlight: "ambiental",
          accentText: "ESG",
          subheadline:
            "Regularização, condicionantes e monitoramento conduzidos com equipe multidisciplinar e tecnologia própria.",
          ctas: [
            { label: "Conhecer serviços", href: "/servicos", variant: "primary" },
          ],
          media: { kind: "none", motion: "none" },
        },
        {
          id: "monitoramento",
          eyebrow: "Portal do Cliente",
          headline: "Monitoramento e indicadores",
          highlight: "ao vivo",
          accentText: "24/7",
          subheadline:
            "Acompanhe licenciamento, laudos e alertas sem depender de planilha ou visita surpresa do fiscal.",
          ctas: [
            { label: "Acessar portal", href: "#portal-cliente", variant: "tech" },
          ],
          media: { kind: "none", motion: "none" },
        },
      ],
      eyebrow: "Desde 2012 no Amapá e no Brasil",
      headline:
        "Cuidando da sua empresa, do seu time e do meio ambiente — com dados em tempo real, não em PDF anual.",
      subheadline:
        "Consultoria técnica em meio ambiente e segurança do trabalho, com portal próprio para acompanhar licenciamento, laudos e indicadores sem depender de planilha ou visita surpresa do fiscal.",
      ctas: [
        { label: "Solicitar Orçamento", href: "#contato", variant: "primary" },
        { label: "Ver o portal do cliente", href: "#portal-cliente", variant: "outline" },
      ],
      trustMetrics,
      media: { kind: "none", motion: "none" },
    },
    provaSocial: {
      metrics: metricasProvaSocial.map((m) => ({
        id: m.id,
        valor: m.valor,
        sufixo: m.sufixo,
        label: m.label,
        isPlaceholder: m.isPlaceholder,
      })),
      logosEyebrow: "Confiado por empresas de diferentes setores",
      logos: Array.from({ length: 6 }, (_, i) => ({
        id: `logo-placeholder-${i + 1}`,
        nome: "Logo do cliente",
        isPlaceholder: true,
      })),
      logosCarousel: {
        enabled: true,
        autoplay: true,
        intervalMs: 5000,
        loop: true,
      },
    },
    pilares: {
      eyebrow: "Como atuamos",
      title: "Dois pilares, uma só operação",
      items: pilares.map((p) => ({
        id: p.id,
        tone: p.tone,
        iconKey: PILAR_ICON_BY_ID[p.id] ?? "Recycle",
        titulo: p.titulo,
        descricao: p.descricao,
        bullets: p.bullets,
        href: p.href,
      })),
    },
    solucoes: {
      eyebrow: "Soluções e serviços",
      title: "Consultoria completa, do licenciamento à segurança do trabalho",
      items: solucoes.map((s) => ({
        id: s.id,
        iconKey: SOLUCAO_ICON_BY_ID[s.id] ?? "FileCheck2",
        titulo: s.titulo,
        descricao: s.descricao,
        descricaoLonga: s.descricaoLonga,
        colSpan: s.colSpan,
        servicoParam: s.servicoParam,
        parentId: s.parentId,
        imagem: s.imagem,
      })),
    },
    sistemas: {
      eyebrow: "Sistemas",
      title: "Plataformas digitais para conformidade e operação",
      description:
        "Além da consultoria, desenvolvemos sistemas para gestão financeira e portal do cliente, condicionantes ambientais, saúde e segurança do trabalho e apoio ao manejo florestal.",
      portalHint:
        "O portal financeiro também é detalhado na seção Portal do Cliente, com monitoramento em tempo real.",
      portalHref: "#portal-cliente",
      items: sistemasItems.map((item) => {
        const href = resolveSistemaHref(SISTEMA_URL_BY_ID[item.id]);
        return {
          id: item.id,
          tone: item.tone,
          iconKey: item.iconKey,
          titulo: item.titulo,
          descricao: item.descricao,
          bullets: item.bullets,
          mockVariant: item.mockVariant,
          href,
          ctaLabel: resolveSistemaCtaLabel(href, item.accessLabel),
        };
      }),
    },
    portalCliente: {
      eyebrow: "Portal do cliente",
      title: "Acompanhe sua conformidade em tempo real, não em relatório anual",
      description:
        "O mesmo sistema usado para entregar a consultoria também fica disponível para você acompanhar — sem depender de e-mail ou planilha.",
      ctaLabel: "Acessar portal do cliente",
      portalUrl,
      items: portalBlocos.map((b) => ({
        id: b.id,
        iconKey: PORTAL_ICON_BY_ID[b.id] ?? "BarChart3",
        titulo: b.titulo,
        descricao: b.descricao,
        bullets: b.bullets,
        colSpan: b.colSpan,
      })),
    },
    segmentos: {
      eyebrow: "Segmentos atendidos",
      title: "Indústrias que dependem de conformidade contínua",
      items: segmentos.map((s) => ({
        id: s.id,
        iconKey: SEGMENTO_ICON_BY_ID[s.id] ?? "Factory",
        nome: s.nome,
      })),
    },
    diferenciais: {
      eyebrow: "Diferenciais",
      title: "Por que empresas escolhem a Ambiental",
      items: diferenciais.map((d) => ({
        id: d.id,
        iconKey: DIFERENCIAL_ICON_BY_ID[d.id] ?? "Users",
        titulo: d.titulo,
        descricao: d.descricao,
      })),
    },
    depoimentos: {
      eyebrow: "Depoimentos",
      title: "Quem acompanha a conformidade com a gente",
      items: depoimentos.map((d) => ({
        id: d.id,
        nome: d.nome,
        cargo: d.cargo,
        empresa: d.empresa,
        texto: d.texto,
        isPlaceholder: d.isPlaceholder,
      })),
      carousel: {
        enabled: true,
        autoplay: true,
        intervalMs: 5500,
        loop: true,
      },
    },
    abrangencia: {
      eyebrow: "Abrangência",
      title: "Onde atuamos",
      footnote: "Sede em Macapá — AP, com atuação em todo o território nacional.",
      items: regioesAtendidas.map((r) => ({
        regiao: r.regiao,
        estados: r.estados,
      })),
    },
    comoFunciona: {
      eyebrow: "Como funciona",
      title: "Consultoria e portal, a mesma jornada",
      description:
        "A execução dos serviços e o acompanhamento pelo portal não são produtos separados — são etapas da mesma operação.",
      items: passosComoFunciona.map((p) => ({
        id: p.id,
        numero: p.numero,
        titulo: p.titulo,
        descricao: p.descricao,
      })),
    },
    faq: {
      eyebrow: "Perguntas frequentes",
      title: "Dúvidas sobre a consultoria e o portal",
      items: faqItems.map((f) => ({
        id: f.id,
        pergunta: f.pergunta,
        resposta: f.resposta,
      })),
    },
    ctaFinal: {
      eyebrow: "Fale com a gente",
      title: "Pronto para colocar sua conformidade em dia?",
      description:
        "Preencha o formulário e um consultor entra em contato para entender o cenário da sua empresa.",
    },
    projetos: {
      eyebrow: "Nosso trabalho",
      title: "Projetos",
      description:
        "Uma amostra dos trabalhos técnicos que já entregamos para clientes no Amapá e no Brasil.",
      items: projetos.map((p) => ({
        id: p.id,
        categoria: p.categoria as ProjetoCategoria,
        titulo: p.titulo,
        descricao: p.descricao,
        imagens: p.imagens ?? [],
      })),
    },
  };
}
