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
  type SolucaoNode,
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
  depth = 1,
}: {
  svc: SolucaoItem;
  invertido?: boolean;
  depth?: number;
}) {
  const Icon = CONTENT_ICONS[svc.iconKey];
  const nested = depth > 1;
  const deep = depth > 2;
  return (
    <div
      id={svc.id}
      className={cn(
        "scroll-mt-40 grid grid-cols-1 items-center gap-8 rounded-2xl border bg-white p-8 shadow-sm lg:grid-cols-2 lg:gap-10",
        deep
          ? "border-primary-100/80 bg-white p-5 lg:gap-6"
          : nested
            ? "border-primary-100 bg-primary-50/30 p-6 lg:gap-8"
            : "border-neutral-100",
      )}
    >
      <div className={cn(invertido && "lg:order-2")}>
        <span
          className={cn(
            "flex items-center justify-center rounded-xl border border-primary-100 bg-primary-50",
            deep ? "h-9 w-9" : nested ? "h-10 w-10" : "h-12 w-12",
          )}
        >
          <Icon
            className={cn(
              deep ? "h-4 w-4" : nested ? "h-5 w-5" : "h-6 w-6",
              "text-primary-700",
            )}
            strokeWidth={1.75}
          />
        </span>
        <h2
          className={cn(
            "mt-4 text-neutral-900",
            deep ? "text-h3" : nested ? "text-h3" : "text-h2",
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
          deep ? "h-36 lg:h-44" : nested ? "h-44 lg:h-52" : "h-56 lg:h-64",
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

function ServicoBranch({
  node,
  depth,
  invertRoot,
}: {
  node: SolucaoNode;
  depth: number;
  invertRoot?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <ServicoCard svc={node} invertido={invertRoot} depth={depth} />
      {node.children.length > 0 && (
        <div
          className={cn(
            "flex flex-col gap-3 border-l-2 pl-4 lg:pl-6",
            depth === 1 ? "border-primary-200" : "border-primary-100",
          )}
        >
          <p className="text-micro font-semibold uppercase tracking-wide text-primary-700">
            {depth === 1
              ? `Especialidades em ${node.titulo}`
              : `Em ${node.titulo}`}
          </p>
          {node.children.map((child) => (
            <ServicoBranch key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ServicosDetail({ items }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const roots = getRootSolucoes(items);

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

  const groups: SolucaoNode[] =
    filter === "all"
      ? buildSolucaoTree(items)
      : (() => {
          const group = resolveSolucaoGroup(items, filter);
          return group ? [group.tree] : [];
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
          <ServicoBranch
            key={group.id}
            node={group}
            depth={1}
            invertRoot={index % 2 === 1}
          />
        ))}
      </section>
    </>
  );
}
