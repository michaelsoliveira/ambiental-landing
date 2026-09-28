"use client";

import { ChevronDown, ImageIcon, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CmsImage } from "@/components/shared/CmsImage";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/lib/constants";
import { cmsThumbSrc } from "@/lib/content/cms-image";
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

const ROOTS_PAGE_SIZE = 3;

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
  priority,
}: {
  svc: SolucaoItem;
  invertido?: boolean;
  depth?: number;
  priority?: boolean;
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
          <CmsImage
            src={cmsThumbSrc(svc.imagem)}
            alt={svc.imagem.alt || svc.titulo}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={depth > 1 ? 55 : 65}
            priority={priority}
            objectFit="cover"
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
  priority,
  /** No modo “Todos”, filhos começam recolhidos para adiar download de imagens. */
  collapseChildrenByDefault,
}: {
  node: SolucaoNode;
  depth: number;
  invertRoot?: boolean;
  priority?: boolean;
  collapseChildrenByDefault?: boolean;
}) {
  const [expanded, setExpanded] = useState(!collapseChildrenByDefault);
  const childCount = node.children.length;

  return (
    <div className="flex flex-col gap-3">
      <ServicoCard
        svc={node}
        invertido={invertRoot}
        depth={depth}
        priority={priority}
      />
      {childCount > 0 && (
        <>
          {collapseChildrenByDefault && !expanded ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className={cn(
                "flex items-center gap-2 self-start rounded-full border border-primary-200 bg-primary-50/60 px-4 py-2 text-small font-semibold text-primary-800 transition hover:bg-primary-50",
                depth === 1 && "ml-0 lg:ml-0",
              )}
            >
              <ChevronDown className="h-4 w-4" strokeWidth={2} />
              Ver {childCount} especialidade{childCount === 1 ? "" : "s"} em{" "}
              {node.titulo}
            </button>
          ) : (
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
                <ServicoBranch
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  collapseChildrenByDefault={collapseChildrenByDefault}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function ServicosDetail({ items }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [rootsVisible, setRootsVisible] = useState(ROOTS_PAGE_SIZE);
  const roots = useMemo(() => getRootSolucoes(items), [items]);

  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id && items.some((s) => s.id === id)) setFilter(id);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [items]);

  useEffect(() => {
    setRootsVisible(ROOTS_PAGE_SIZE);
  }, [filter]);

  const activeRootId =
    filter === "all"
      ? null
      : (resolveSolucaoGroup(items, filter)?.root.id ?? filter);

  const allGroups: SolucaoNode[] =
    filter === "all"
      ? buildSolucaoTree(items)
      : (() => {
          const group = resolveSolucaoGroup(items, filter);
          return group ? [group.tree] : [];
        })();

  const showingAll = filter === "all";
  const groups = showingAll ? allGroups.slice(0, rootsVisible) : allGroups;
  const hasMoreRoots = showingAll && rootsVisible < allGroups.length;

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
            priority={index === 0}
            collapseChildrenByDefault={showingAll}
          />
        ))}

        {hasMoreRoots && (
          <div className="flex flex-col items-center gap-3 pb-4">
            <p className="text-small text-neutral-500">
              Mostrando {groups.length} de {allGroups.length} áreas de atuação
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRootsVisible((n) => n + ROOTS_PAGE_SIZE)}
            >
              Carregar mais serviços
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
