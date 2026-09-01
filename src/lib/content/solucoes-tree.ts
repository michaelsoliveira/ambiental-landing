import type { SolucoesContent } from "@/lib/content/types";

export type SolucaoItem = SolucoesContent["items"][number];

export type SolucaoNode = SolucaoItem & {
  children: SolucaoItem[];
};

/** Serviços de topo (sem parentId válido). */
export function getRootSolucoes(items: SolucaoItem[]): SolucaoItem[] {
  const ids = new Set(items.map((i) => i.id));
  return items.filter(
    (i) => !i.parentId || i.parentId === i.id || !ids.has(i.parentId),
  );
}

/** Filhos diretos de um serviço. */
export function getChildSolucoes(
  items: SolucaoItem[],
  parentId: string,
): SolucaoItem[] {
  return items.filter((i) => i.parentId === parentId);
}

/**
 * Árvore de 1 nível (pai → filhos). Itens com parent inválido sobem para a raiz.
 * Ciclos profundos não são suportados de propósito (CMS = 1 nível de hierarquia).
 */
export function buildSolucaoTree(items: SolucaoItem[]): SolucaoNode[] {
  const roots = getRootSolucoes(items);
  const rootIds = new Set(roots.map((r) => r.id));
  return roots.map((root) => ({
    ...root,
    children: items.filter(
      (i) => i.parentId === root.id && !rootIds.has(i.id),
    ),
  }));
}

/** Resolve o nó (raiz) a exibir quando o filtro/hash aponta para um filho. */
export function resolveSolucaoGroup(
  items: SolucaoItem[],
  filterId: string,
): { root: SolucaoItem; children: SolucaoItem[]; focusId: string } | null {
  const item = items.find((i) => i.id === filterId);
  if (!item) return null;
  const ids = new Set(items.map((i) => i.id));
  const isRoot = !item.parentId || !ids.has(item.parentId);
  if (isRoot) {
    return {
      root: item,
      children: getChildSolucoes(items, item.id),
      focusId: item.id,
    };
  }
  const parent = items.find((i) => i.id === item.parentId);
  if (!parent) {
    return { root: item, children: [], focusId: item.id };
  }
  return {
    root: parent,
    children: getChildSolucoes(items, parent.id),
    focusId: item.id,
  };
}
