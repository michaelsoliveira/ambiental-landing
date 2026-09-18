"use client";

import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { useState } from "react";

import type { ProjetosContent, SolucoesContent } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type Props = {
  items: ProjetosContent["items"];
  categorias: SolucoesContent["items"];
};

type ProjetoItem = ProjetosContent["items"][number];

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-small font-semibold transition-colors",
        active
          ? "border-primary-600 bg-primary-600 text-white"
          : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50",
      )}
    >
      {children}
    </button>
  );
}

function GalleryLightbox({
  projeto,
  index,
  onIndexChange,
  onClose,
}: {
  projeto: ProjetoItem;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const imagens = projeto.imagens;
  const atual = imagens[index];
  if (!atual) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-neutral-900/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria — ${projeto.titulo}`}
    >
      <div className="flex items-center justify-between text-white">
        <div>
          <p className="text-small font-semibold">{projeto.titulo}</p>
          <p className="text-micro text-neutral-300">
            {index + 1} / {imagens.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar galeria"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>

      <div className="relative my-4 flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element -- mídia do CMS (MinIO), sem next/image */}
        <img
          src={atual.url}
          alt={atual.alt || projeto.titulo}
          className="absolute inset-0 h-full w-full object-contain"
        />
        {imagens.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onIndexChange((index - 1 + imagens.length) % imagens.length)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => onIndexChange((index + 1) % imagens.length)}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      {imagens.length > 1 && (
        <div className="flex justify-center gap-2 overflow-x-auto pb-1">
          {imagens.map((img, i) => (
            <button
              key={img.url + i}
              type="button"
              onClick={() => onIndexChange(i)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2",
                i === index ? "border-primary-400" : "border-transparent opacity-70",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- mídia do CMS (MinIO), sem next/image */}
              <img
                src={img.url}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjetoCard({
  projeto,
  categoriaLabel,
  onOpenGallery,
}: {
  projeto: ProjetoItem;
  categoriaLabel: string;
  onOpenGallery: () => void;
}) {
  const cover = projeto.imagens[0];
  const extraCount = projeto.imagens.length - 1;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={cover ? onOpenGallery : undefined}
        className={cn(
          "relative block aspect-square w-full bg-neutral-50",
          cover && "cursor-zoom-in",
        )}
        aria-label={cover ? `Ver galeria de ${projeto.titulo}` : undefined}
        disabled={!cover}
      >
        {cover ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- mídia do CMS (MinIO), sem next/image */}
            <img
              src={cover.url}
              alt={cover.alt || projeto.titulo}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {extraCount > 0 && (
              <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-neutral-900/70 px-2.5 py-1 text-micro font-semibold text-white">
                <ImageIcon className="h-3 w-3" strokeWidth={2} />+{extraCount}
              </span>
            )}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-neutral-300">
            <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
            <span className="text-micro font-medium uppercase text-neutral-400">
              Foto do projeto
            </span>
          </div>
        )}
      </button>
      <div className="p-5">
        <p className="text-micro font-semibold uppercase text-primary-700">{categoriaLabel}</p>
        <h3 className="mt-2 text-h3 text-neutral-900">{projeto.titulo}</h3>
        <p className="mt-2 text-small text-justify text-neutral-500">{projeto.descricao}</p>
      </div>
    </div>
  );
}

export function ProjetosGrid({ items, categorias }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [openProjeto, setOpenProjeto] = useState<ProjetoItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const categoriaTitulo = new Map(categorias.map((c) => [c.id, c.titulo]));
  const visible = filter === "all" ? items : items.filter((p) => p.categoria === filter);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="flex flex-wrap gap-2 border-b border-neutral-100 pb-6">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          Todos
        </FilterButton>
        {categorias.map((c) => (
          <FilterButton key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.titulo}
          </FilterButton>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-body text-neutral-500">
          Nenhum projeto encontrado nesta categoria.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((projeto) => (
            <ProjetoCard
              key={projeto.id}
              projeto={projeto}
              categoriaLabel={categoriaTitulo.get(projeto.categoria) ?? projeto.categoria}
              onOpenGallery={() => {
                setOpenProjeto(projeto);
                setGalleryIndex(0);
              }}
            />
          ))}
        </div>
      )}

      {openProjeto && (
        <GalleryLightbox
          projeto={openProjeto}
          index={galleryIndex}
          onIndexChange={setGalleryIndex}
          onClose={() => setOpenProjeto(null)}
        />
      )}
    </section>
  );
}
