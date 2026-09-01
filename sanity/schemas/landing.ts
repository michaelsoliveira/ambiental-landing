/**
 * Schemas de referência Sanity (SDD-04 P0–P2) — copiar para um Sanity Studio.
 *
 * Singletons:
 * - landingHero, landingDepoimentos (P0)
 * - landingProvaSocial, landingSolucoes, landingFaq, landingCtaFinal (P1)
 * - landingPilares, landingPortalCliente, landingSegmentos, landingDiferenciais,
 *   landingAbrangencia, landingComoFunciona, landingHeader, landingFooter,
 *   landingLayout (P2)
 * - landingProjetos — página /projetos, upload de imagem por item (P3)
 */

const PROJETO_CATEGORIAS = [
  "seguranca",
  "meio-ambiente",
  "aerolevantamento",
  "sismografia",
  "hidrossemeadura",
  "logistica",
  "monitoramento",
  "incendio",
  "mineracao",
];

const ICON_KEYS = [
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
];

const SECTION_KEYS = [
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
];

export const landingHero = {
  name: "landingHero",
  title: "Landing — Hero",
  type: "document",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string", validation: (R: any) => R.required() },
    { name: "headline", title: "Headline", type: "text", validation: (R: any) => R.required() },
    { name: "subheadline", title: "Subheadline", type: "text", validation: (R: any) => R.required() },
    {
      name: "ctas",
      title: "CTAs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
            {
              name: "variant",
              type: "string",
              options: { list: ["primary", "outline", "tech"] },
            },
          ],
        },
      ],
    },
    {
      name: "trustMetrics",
      title: "Métricas de confiança",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "valor", type: "number" },
            { name: "sufixo", type: "string" },
            { name: "label", type: "string" },
            { name: "isPlaceholder", type: "boolean" },
          ],
        },
      ],
    },
    {
      name: "media",
      title: "Mídia lateral",
      type: "object",
      fields: [
        {
          name: "kind",
          type: "string",
          options: { list: ["none", "image", "video"] },
        },
        { name: "src", type: "image", title: "Imagem (kind=image)" },
        {
          name: "videoFile",
          type: "file",
          title: "Vídeo (kind=video)",
          options: { accept: "video/*" },
        },
        { name: "poster", type: "image" },
        { name: "alt", type: "string" },
        {
          name: "motion",
          type: "string",
          options: { list: ["none", "kenburns", "parallax"] },
        },
      ],
    },
  ],
};

export const landingDepoimentos = {
  name: "landingDepoimentos",
  title: "Landing — Depoimentos",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "nome", type: "string" },
            { name: "cargo", type: "string" },
            { name: "empresa", type: "string" },
            { name: "texto", type: "text" },
            { name: "avatar", type: "image" },
            { name: "isPlaceholder", type: "boolean" },
          ],
        },
      ],
    },
    {
      name: "carousel",
      type: "object",
      fields: [
        { name: "enabled", type: "boolean", initialValue: true },
        { name: "autoplay", type: "boolean", initialValue: true },
        { name: "intervalMs", type: "number", initialValue: 5500 },
        { name: "loop", type: "boolean", initialValue: true },
      ],
    },
  ],
};

export const landingProvaSocial = {
  name: "landingProvaSocial",
  title: "Landing — Prova Social",
  type: "document",
  fields: [
    {
      name: "metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "valor", type: "number" },
            { name: "sufixo", type: "string" },
            { name: "label", type: "string" },
            { name: "isPlaceholder", type: "boolean" },
          ],
        },
      ],
    },
    { name: "logosEyebrow", type: "string" },
    {
      name: "logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "nome", type: "string" },
            { name: "image", type: "image" },
            { name: "isPlaceholder", type: "boolean" },
          ],
        },
      ],
    },
  ],
};

export const landingSolucoes = {
  name: "landingSolucoes",
  title: "Landing — Soluções",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            {
              name: "iconKey",
              type: "string",
              options: {
                list: ICON_KEYS,
              },
            },
            { name: "titulo", type: "string" },
            { name: "descricao", type: "text" },
            {
              name: "descricaoLonga",
              title: "Descrição estendida (página /servicos)",
              type: "text",
            },
            { name: "colSpan", type: "string" },
            { name: "servicoParam", type: "string" },
            {
              name: "imagem",
              title: "Foto do serviço em campo",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
            },
          ],
        },
      ],
    },
  ],
};

export const landingProjetos = {
  name: "landingProjetos",
  title: "Landing — Projetos",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    { name: "description", type: "text" },
    {
      name: "items",
      title: "Projetos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            {
              name: "categoria",
              title: "Categoria (serviço)",
              type: "string",
              options: { list: PROJETO_CATEGORIAS },
              validation: (R: any) => R.required(),
            },
            { name: "titulo", type: "string" },
            { name: "descricao", type: "text" },
            {
              name: "imagens",
              title: "Galeria de fotos",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [{ name: "alt", title: "Texto alternativo", type: "string" }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const landingFaq = {
  name: "landingFaq",
  title: "Landing — FAQ",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "pergunta", type: "string" },
            { name: "resposta", type: "text" },
          ],
        },
      ],
    },
  ],
};

export const landingCtaFinal = {
  name: "landingCtaFinal",
  title: "Landing — CTA Final",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    { name: "description", type: "text" },
  ],
};

export const landingPilares = {
  name: "landingPilares",
  title: "Landing — Pilares",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            {
              name: "tone",
              type: "string",
              options: { list: ["primary", "accent"] },
            },
            { name: "iconKey", type: "string", options: { list: ICON_KEYS } },
            { name: "titulo", type: "string" },
            { name: "descricao", type: "text" },
            { name: "bullets", type: "array", of: [{ type: "string" }] },
            { name: "href", type: "string" },
          ],
        },
      ],
    },
  ],
};

export const landingPortalCliente = {
  name: "landingPortalCliente",
  title: "Landing — Portal do Cliente",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    { name: "description", type: "text" },
    { name: "ctaLabel", type: "string" },
    { name: "portalUrl", type: "url" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "iconKey", type: "string", options: { list: ICON_KEYS } },
            { name: "titulo", type: "string" },
            { name: "descricao", type: "text" },
            { name: "bullets", type: "array", of: [{ type: "string" }] },
            { name: "colSpan", type: "string" },
          ],
        },
      ],
    },
  ],
};

export const landingSegmentos = {
  name: "landingSegmentos",
  title: "Landing — Segmentos",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "iconKey", type: "string", options: { list: ICON_KEYS } },
            { name: "nome", type: "string" },
          ],
        },
      ],
    },
  ],
};

export const landingDiferenciais = {
  name: "landingDiferenciais",
  title: "Landing — Diferenciais",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "iconKey", type: "string", options: { list: ICON_KEYS } },
            { name: "titulo", type: "string" },
            { name: "descricao", type: "text" },
          ],
        },
      ],
    },
  ],
};

export const landingAbrangencia = {
  name: "landingAbrangencia",
  title: "Landing — Abrangência",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    { name: "footnote", type: "string" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "regiao", type: "string" },
            { name: "estados", type: "array", of: [{ type: "string" }] },
          ],
        },
      ],
    },
  ],
};

export const landingComoFunciona = {
  name: "landingComoFunciona",
  title: "Landing — Como Funciona",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string" },
    { name: "title", type: "string" },
    { name: "description", type: "text" },
    {
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "numero", type: "string" },
            { name: "titulo", type: "string" },
            { name: "descricao", type: "text" },
          ],
        },
      ],
    },
  ],
};

export const landingHeader = {
  name: "landingHeader",
  title: "Landing — Header",
  type: "document",
  fields: [
    { name: "brandName", type: "string" },
    {
      name: "navItems",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
          ],
        },
      ],
    },
    {
      name: "primaryCta",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "href", type: "string" },
        {
          name: "variant",
          type: "string",
          options: { list: ["primary", "outline", "tech"] },
        },
      ],
    },
    {
      name: "portalCta",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "href", type: "string" },
        {
          name: "variant",
          type: "string",
          options: { list: ["primary", "outline", "tech"] },
        },
      ],
    },
    { name: "portalUrl", type: "url" },
    {
      name: "topBar",
      title: "Barra de contato (topo)",
      type: "object",
      fields: [
        { name: "phone", type: "string" },
        { name: "email", type: "string" },
        { name: "location", type: "string" },
      ],
    },
    {
      name: "whatsapp",
      type: "object",
      fields: [
        { name: "label", type: "string" },
        { name: "href", type: "string" },
        {
          name: "variant",
          type: "string",
          options: { list: ["primary", "outline", "tech"] },
        },
      ],
    },
  ],
};

export const landingFooter = {
  name: "landingFooter",
  title: "Landing — Footer",
  type: "document",
  fields: [
    { name: "brandName", type: "string" },
    { name: "tagline", type: "text" },
    { name: "legalLine", type: "string" },
    {
      name: "navItems",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
          ],
        },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
            { name: "ariaLabel", type: "string" },
          ],
        },
      ],
    },
    { name: "privacyHref", type: "string" },
    { name: "privacyLabel", type: "string" },
    {
      name: "contact",
      title: "Contato (rodapé)",
      type: "object",
      fields: [
        { name: "address", type: "string" },
        { name: "phone", type: "string" },
        { name: "whatsapp", type: "string" },
        { name: "email", type: "string" },
      ],
    },
  ],
};

export const landingLayout = {
  name: "landingLayout",
  title: "Landing — Layout (ordem/visibilidade)",
  type: "document",
  fields: [
    {
      name: "sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "key",
              type: "string",
              options: { list: SECTION_KEYS },
            },
            { name: "visible", type: "boolean", initialValue: true },
            { name: "order", type: "number" },
          ],
        },
      ],
    },
  ],
};
