import type { LucideIcon } from "lucide-react";

export type Tone = "primary" | "accent" | "tech";

export interface NavItem {
  label: string;
  href: string;
}

export interface Pilar {
  id: string;
  tone: Extract<Tone, "primary" | "accent">;
  icon: LucideIcon;
  titulo: string;
  descricao: string;
  bullets: string[];
  href: string;
}

export interface Solucao {
  id: string;
  icon: LucideIcon;
  titulo: string;
  descricao: string;
  descricaoLonga?: string;
  colSpan: string;
  servicoParam: string;
  /** Id do serviço pai (hierarquia). Ausente = topo. */
  parentId?: string;
  imagem?: { url: string; alt?: string };
}

export interface MetricaProvaSocial {
  id: string;
  valor: number;
  sufixo?: string;
  label: string;
  isPlaceholder?: boolean;
}

export interface PortalBloco {
  id: string;
  icon: LucideIcon;
  titulo: string;
  descricao: string;
  bullets: string[];
  colSpan: string;
}

export interface Segmento {
  id: string;
  icon: LucideIcon;
  nome: string;
}

export interface Diferencial {
  id: string;
  icon: LucideIcon;
  titulo: string;
  descricao: string;
}

export interface Depoimento {
  id: string;
  nome: string;
  cargo: string;
  empresa: string;
  texto: string;
  isPlaceholder?: boolean;
}

export interface PassoComoFunciona {
  id: string;
  numero: string;
  titulo: string;
  descricao: string;
}

export interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface RegiaoAtendida {
  regiao: string;
  estados: string[];
}

export interface Projeto {
  id: string;
  categoria: string;
  titulo: string;
  descricao: string;
  imagens?: { url: string; alt?: string }[];
}
