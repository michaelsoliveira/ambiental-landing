"use client";

import { ImageIcon, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { contactInfo } from "@/lib/constants";
import { CONTENT_ICONS } from "@/lib/content/icon-map";
import {
  buildSolucaoTree,
  getRootSolucoes,
  resolveSolucaoGroup,
  type SolucaoItem,
} from "@/lib/content/solucoes-tree";
import type { SolucoesContent } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type Props = {
  items: SolucoesContent["items"];
};

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

function ServicoCard({
  svc,
  invertido,
  nested,
}: {
  svc: SolucaoItem;
  invertido?: boolean;
  nested?: boolean;
}) {
  const Icon = CONTENT_ICONS[svc.iconKey];
  return (
    <div
      id={svc.id}
      className={cn(
        "scroll-mt-40 grid grid-cols-1 items-center gap-8 rounded-2xl border bg-white p-8 shadow-sm lg:grid-cols-2 lg:gap-10",
        nested
          ? "border-primary-100 bg-primary-50/30 p-6 lg:gap-8"
          : "border-neutral-100",
      )}
    >
      <div className={cn(invertido && "lg:order-2")}>
        <span
          className={cn(
            "flex items-center justify-center rounded-xl border border-primary-100 bg-primary-50",
            nested ? "h-10 w-10" : "h-12 w-12",
          )}
        >
          <Icon
            className={cn(nested ? "h-5 w-5" : "h-6 w-6", "text-primary-700")}
            strokeWidth={1.75}
          />
        </span>
        <h2
          className={cn(
            "mt-4 text-neutral-900",
            nested ? "text-h3" : "text-h2",
          )}
        >
          {svc.titulo}
        </h2>
        <p className="mt-3 text-body text-justify text-neutral-500">
          {svc.descricaoLonga || svc.descricao}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="primary" className="text-white">
            <a href={`/?servico=${svc.servicoParam}#contato`}>Solicitar Orçamento</a>
          </Button>
          <Button asChild variant="outline">
            <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-neutral-50",
          nested ? "h-44 lg:h-52" : "h-56 lg:h-64",
          invertido && "lg:order-1",
        )}
      >
        {svc.imagem?.url ? (
          // eslint-disable-next-line @next/next/no-img-element -- mídia do CMS (MinIO), sem next/image
          <img
            src={svc.imagem.url}
            alt={svc.imagem.alt || svc.titulo}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-neutral-300">
            <ImageIcon className="h-9 w-9" strokeWidth={1.5} />
            <span className="text-micro font-medium uppercase text-neutral-400">
              Foto do serviço em campo
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ServicosDetail({ items }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const roots = getRootSolucoes(items);

  /** Espelha Servicos.dc.html — hash #id filtra o serviço correspondente. */
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id && items.some((s) => s.id === id)) setFilter(id);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [items]);

  const activeRootId =
    filter === "all"
      ? null
      : (resolveSolucaoGroup(items, filter)?.root.id ?? filter);

  const groups =
    filter === "all"
      ? buildSolucaoTree(items)
      : (() => {
          const group = resolveSolucaoGroup(items, filter);
          return group
            ? [{ ...group.root, children: group.children }]
            : [];
        })();

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-neutral-100 pb-6">
          <FilterButton
            active={filter === "all"}
            onClick={() => {
              setFilter("all");
              window.history.replaceState(null, "", "/servicos");
            }}
          >
            Todos
          </FilterButton>
          {roots.map((svc) => (
            <FilterButton
              key={svc.id}
              active={activeRootId === svc.id}
              onClick={() => {
                setFilter(svc.id);
                window.history.replaceState(null, "", `/servicos#${svc.id}`);
              }}
            >
              {svc.titulo}
            </FilterButton>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-8 lg:px-8">
        {groups.map((group, index) => (
          <div key={group.id} className="flex flex-col gap-4">
            <ServicoCard svc={group} invertido={index % 2 === 1} />
            {group.children.length > 0 && (
              <div className="flex flex-col gap-3 border-l-2 border-primary-200 pl-4 lg:pl-6">
                <p className="text-micro font-semibold uppercase tracking-wide text-primary-700">
                  Especialidades em {group.titulo}
                </p>
                {group.children.map((child) => (
                  <ServicoCard key={child.id} svc={child} nested />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
