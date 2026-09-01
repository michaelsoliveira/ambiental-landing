import { z } from "zod";

export const mediaKindSchema = z.enum(["image", "video", "none"]);
export const mediaMotionSchema = z.enum(["none", "kenburns", "parallax"]);
export const ctaVariantSchema = z.enum(["primary", "outline", "tech"]);
export const pilarToneSchema = z.enum(["primary", "accent"]);

/** Chaves Lucide permitidas no CMS (resolvidas no frontend). */
export const contentIconKeySchema = z.enum([
  "FileCheck2",
  "ClipboardCheck",
  "ShieldCheck",
  "Recycle",
  "HardHat",
  "Siren",
  "BarChart3",
  "Activity",
  "Factory",
  "Sprout",
  "Building2",
  "Truck",
  "Mountain",
  "Zap",
  "Users",
  "LayoutDashboard",
  "Globe2",
  "AlertTriangle",
  "Clock",
  "Headset",
  "Leaf",
  "Plane",
  "Gauge",
  "Flame",
]);

/** @deprecated use contentIconKeySchema */
export const solucaoIconKeySchema = contentIconKeySchema;

export const sectionKeySchema = z.enum([
  "hero",
  "provaSocial",
  "pilares",
  "solucoes",
  "portalCliente",
  "segmentos",
  "diferenciais",
  "depoimentos",
  "abrangencia",
  "comoFunciona",
  "faq",
  "ctaFinal",
]);

export const DEFAULT_SECTION_ORDER = [
  "hero",
  "provaSocial",
  "pilares",
  "solucoes",
  "portalCliente",
  "segmentos",
  "diferenciais",
  "depoimentos",
  "abrangencia",
  "comoFunciona",
  "faq",
  "ctaFinal",
] as const satisfies readonly z.infer<typeof sectionKeySchema>[];

export const mediaFieldSchema = z.object({
  kind: mediaKindSchema.default("none"),
  src: z.string().optional(),
  alt: z.string().optional(),
  poster: z.string().optional(),
  motion: mediaMotionSchema.default("none"),
});

export const carouselConfigSchema = z.object({
  enabled: z.boolean().default(false),
  autoplay: z.boolean().default(true),
  intervalMs: z.number().int().min(3000).max(15000).default(5500),
  loop: z.boolean().default(true),
});

export const ctaFieldSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: ctaVariantSchema.default("primary"),
});

export const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const trustMetricSchema = z.object({
  id: z.string().min(1),
  valor: z.number(),
  sufixo: z.string().optional(),
  label: z.string().min(1),
  isPlaceholder: z.boolean().optional(),
});

export const heroSlideSchema = z.object({
  id: z.string().min(1),
  eyebrow: z.string().optional(),
  headline: z.string().min(1),
  /** Palavra ou frase curta com faixa verde; frases longas usam faixa glass. */
  highlight: z.string().optional(),
  /** Texto decorativo grande à direita (ex.: ESG, NR-1). */
  accentText: z.string().optional(),
  subheadline: z.string().optional(),
  ctas: z.array(ctaFieldSchema).max(3).default([]),
  media: mediaFieldSchema.default({ kind: "none", motion: "none" }),
});

export const heroWaveSchema = z.object({
  enabled: z.boolean().default(true),
});

export const heroContentSchema = z.object({
  layout: z.enum(["split", "immersive"]).default("split"),
  slides: z.array(heroSlideSchema).optional(),
  carousel: carouselConfigSchema.default({
    enabled: true,
    autoplay: true,
    intervalMs: 6000,
    loop: true,
  }),
  wave: heroWaveSchema.default({ enabled: true }),
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  ctas: z.array(ctaFieldSchema).min(1).max(3),
  trustMetrics: z.array(trustMetricSchema).default([]),
  media: mediaFieldSchema.default({ kind: "none", motion: "none" }),
});

export const depoimentoItemSchema = z.object({
  id: z.string().min(1),
  nome: z.string().optional(),
  cargo: z.string().min(1),
  empresa: z.string().min(1),
  texto: z.string().min(1),
  avatarUrl: z.string().optional(),
  isPlaceholder: z.boolean().optional(),
});

export const depoimentosContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  items: z.array(depoimentoItemSchema).min(1),
  carousel: carouselConfigSchema.default({
    enabled: true,
    autoplay: true,
    intervalMs: 5500,
    loop: true,
  }),
});

export const logoClienteSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1),
  imageUrl: z.string().optional(),
  isPlaceholder: z.boolean().optional(),
});

export const provaSocialContentSchema = z.object({
  metrics: z.array(trustMetricSchema).min(1),
  logosEyebrow: z.string().min(1),
  logos: z.array(logoClienteSchema).default([]),
  logosCarousel: carouselConfigSchema.default({
    enabled: true,
    autoplay: true,
    intervalMs: 5000,
    loop: true,
  }),
});

export const galleryImageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().optional(),
});

export const solucaoItemSchema = z.object({
  id: z.string().min(1),
  iconKey: contentIconKeySchema,
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  /** Descrição estendida usada na página /servicos (Servicos.dc.html). Opcional: cai para `descricao`. */
  descricaoLonga: z.string().optional(),
  colSpan: z.string().min(1),
  servicoParam: z.string().min(1),
  /**
   * Id do serviço pai (hierarquia). Ex.: `pgr` com `parentId: "seguranca"`.
   * Ausente / "" = serviço de topo.
   */
  parentId: z.string().optional(),
  /** Foto do serviço em campo (página /servicos) — upload via CMS. */
  imagem: galleryImageSchema.optional(),
});

export const solucoesContentSchema = z
  .object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    items: z.array(solucaoItemSchema).min(1),
  })
  .transform((data) => {
    /** Garante ids únicos (CMS pode salvar âncoras repetidas). */
    const seen = new Set<string>();
    const deduped = data.items.map((item) => {
      const parentId = item.parentId?.trim() || undefined;
      const baseItem = { ...item, parentId };

      if (!seen.has(baseItem.id)) {
        seen.add(baseItem.id);
        return baseItem;
      }
      const base =
        item.titulo
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || "servico";
      let candidate = base;
      let n = 2;
      while (seen.has(candidate)) candidate = `${base}-${n++}`;
      seen.add(candidate);
      return {
        ...baseItem,
        id: candidate,
        servicoParam:
          item.servicoParam === item.id ? candidate : item.servicoParam,
      };
    });

    const ids = new Set(deduped.map((i) => i.id));
    const items = deduped.map((item) => {
      const parentId = item.parentId;
      if (!parentId || parentId === item.id || !ids.has(parentId)) {
        return { ...item, parentId: undefined };
      }
      return item;
    });

    return { ...data, items };
  });

/**
 * Id de um serviço (`solucoes.items[].id`) — string livre, não um enum fixo,
 * porque serviços são gerenciáveis (criar/remover) via CMS e a categoria de um
 * projeto precisa acompanhar essa lista sem quebrar a validação.
 */
export const projetoCategoriaSchema = z.string().min(1);

export const projetoItemSchema = z.object({
  id: z.string().min(1),
  categoria: projetoCategoriaSchema,
  titulo: z.string().min(1),
  /** Vazio é permitido (item recém-criado no CMS, ainda em edição) — evita que
   *  um item incompleto derrube a validação de toda a seção "projetos". */
  descricao: z.string().default(""),
  /** Galeria de fotos do projeto — upload via CMS (Sanity ou admin do ambiental-system). */
  imagens: z.array(galleryImageSchema).default([]),
});

export const projetosContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().default(""),
  items: z.array(projetoItemSchema).default([]),
});

export const faqItemSchema = z.object({
  id: z.string().min(1),
  pergunta: z.string().min(1),
  resposta: z.string().min(1),
});

export const faqContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  items: z.array(faqItemSchema).min(1),
});

export const ctaFinalContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const pilarItemSchema = z.object({
  id: z.string().min(1),
  tone: pilarToneSchema,
  iconKey: contentIconKeySchema,
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  bullets: z.array(z.string().min(1)).min(1),
  href: z.string().min(1),
});

export const pilaresContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  items: z.array(pilarItemSchema).min(1),
});

export const portalBlocoSchema = z.object({
  id: z.string().min(1),
  iconKey: contentIconKeySchema,
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  bullets: z.array(z.string().min(1)).min(1),
  colSpan: z.string().min(1),
});

export const portalClienteContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  ctaLabel: z.string().min(1),
  portalUrl: z.string().min(1),
  items: z.array(portalBlocoSchema).min(1),
});

export const segmentoItemSchema = z.object({
  id: z.string().min(1),
  iconKey: contentIconKeySchema,
  nome: z.string().min(1),
});

export const segmentosContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  items: z.array(segmentoItemSchema).min(1),
});

export const diferencialItemSchema = z.object({
  id: z.string().min(1),
  iconKey: contentIconKeySchema,
  titulo: z.string().min(1),
  descricao: z.string().min(1),
});

export const diferenciaisContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  items: z.array(diferencialItemSchema).min(1),
});

export const regiaoItemSchema = z.object({
  regiao: z.string().min(1),
  estados: z.array(z.string().min(1)).min(1),
});

export const abrangenciaContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  footnote: z.string().optional(),
  items: z.array(regiaoItemSchema).min(1),
});

export const passoItemSchema = z.object({
  id: z.string().min(1),
  numero: z.string().min(1),
  titulo: z.string().min(1),
  descricao: z.string().min(1),
});

export const comoFuncionaContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  items: z.array(passoItemSchema).min(1),
});

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  ariaLabel: z.string().min(1),
});

export const topBarContentSchema = z.object({
  phone: z.string().min(1),
  email: z.string().min(1),
  location: z.string().min(1),
});

export const headerContentSchema = z.object({
  brandName: z.string().min(1),
  navItems: z.array(navItemSchema).min(1),
  primaryCta: ctaFieldSchema,
  portalCta: ctaFieldSchema,
  portalUrl: z.string().min(1),
  topBar: topBarContentSchema.optional(),
  whatsapp: ctaFieldSchema.optional(),
});

export const contactInfoSchema = z.object({
  address: z.string().min(1),
  phone: z.string().min(1),
  whatsapp: z.string().min(1),
  email: z.string().min(1),
});

export const footerContentSchema = z.object({
  brandName: z.string().min(1),
  tagline: z.string().min(1),
  legalLine: z.string().min(1),
  navItems: z.array(navItemSchema).min(1),
  socialLinks: z.array(socialLinkSchema).default([]),
  privacyHref: z.string().min(1),
  privacyLabel: z.string().min(1),
  contact: contactInfoSchema.optional(),
});

export const sectionLayoutItemSchema = z.object({
  key: sectionKeySchema,
  visible: z.boolean().default(true),
  order: z.number().int(),
});

export const layoutContentSchema = z.object({
  sections: z.array(sectionLayoutItemSchema).min(1),
});

export const landingContentSchema = z.object({
  meta: z.object({
    updatedAt: z.string().optional(),
    source: z.enum(["local", "sanity", "mixed"]),
    preview: z.boolean().optional(),
  }),
  layout: layoutContentSchema,
  header: headerContentSchema,
  footer: footerContentSchema,
  hero: heroContentSchema,
  provaSocial: provaSocialContentSchema,
  pilares: pilaresContentSchema,
  solucoes: solucoesContentSchema,
  portalCliente: portalClienteContentSchema,
  segmentos: segmentosContentSchema,
  diferenciais: diferenciaisContentSchema,
  depoimentos: depoimentosContentSchema,
  abrangencia: abrangenciaContentSchema,
  comoFunciona: comoFuncionaContentSchema,
  faq: faqContentSchema,
  ctaFinal: ctaFinalContentSchema,
  /** Opcional: payloads remotos existentes (ambiental-system) ainda não têm este campo. */
  projetos: projetosContentSchema.optional(),
});

export type LandingContent = z.infer<typeof landingContentSchema>;
export type SectionKey = z.infer<typeof sectionKeySchema>;
export type HeroSlide = z.infer<typeof heroSlideSchema>;
export type HeroContent = z.infer<typeof heroContentSchema>;
export type DepoimentosContent = z.infer<typeof depoimentosContentSchema>;
export type ProvaSocialContent = z.infer<typeof provaSocialContentSchema>;
export type LogoCliente = z.infer<typeof logoClienteSchema>;
export type SolucoesContent = z.infer<typeof solucoesContentSchema>;
export type ProjetoCategoria = z.infer<typeof projetoCategoriaSchema>;
export type ProjetoItem = z.infer<typeof projetoItemSchema>;
export type ProjetosContent = z.infer<typeof projetosContentSchema>;
export type GalleryImage = z.infer<typeof galleryImageSchema>;
export type FaqContent = z.infer<typeof faqContentSchema>;
export type CtaFinalContent = z.infer<typeof ctaFinalContentSchema>;
export type PilaresContent = z.infer<typeof pilaresContentSchema>;
export type PortalClienteContent = z.infer<typeof portalClienteContentSchema>;
export type SegmentosContent = z.infer<typeof segmentosContentSchema>;
export type DiferenciaisContent = z.infer<typeof diferenciaisContentSchema>;
export type AbrangenciaContent = z.infer<typeof abrangenciaContentSchema>;
export type ComoFuncionaContent = z.infer<typeof comoFuncionaContentSchema>;
export type HeaderContent = z.infer<typeof headerContentSchema>;
export type TopBarContent = z.infer<typeof topBarContentSchema>;
export type FooterContent = z.infer<typeof footerContentSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type LayoutContent = z.infer<typeof layoutContentSchema>;
export type MediaField = z.infer<typeof mediaFieldSchema>;
export type CarouselConfig = z.infer<typeof carouselConfigSchema>;
export type CtaField = z.infer<typeof ctaFieldSchema>;
export type ContentIconKey = z.infer<typeof contentIconKeySchema>;
export type SolucaoIconKey = ContentIconKey;
