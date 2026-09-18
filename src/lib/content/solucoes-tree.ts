import type { SolucoesContent } from "@/lib/content/types";

export type SolucaoItem = SolucoesContent["items"][number];

/** Nó recursivo — até SOLUCAO_MAX_DEPTH níveis (categoria › sub › subsub). */
export type SolucaoNode = SolucaoItem & {
  children: SolucaoNode[];
};

/** Categoria (1) › Subcategoria (2) › Sub-subcategoria (3). */
export const SOLUCAO_MAX_DEPTH = 3;

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

/** Profundidade 1-based (raiz = 1). Ciclos → Infinity. */
export function getSolucaoDepth(
  items: SolucaoItem[],
  id: string,
): number {
  const byId = new Map(items.map((i) => [i.id, i]));
  let depth = 1;
  let current = byId.get(id);
  const seen = new Set<string>();
  while (current?.parentId && byId.has(current.parentId)) {
    if (seen.has(current.id)) return Number.POSITIVE_INFINITY;
    seen.add(current.id);
    depth += 1;
    current = byId.get(current.parentId);
  }
  return depth;
}

/** Ancestrais do mais próximo ao raiz (excluindo o próprio item). */
export function getSolucaoAncestors(
  items: SolucaoItem[],
  id: string,
): SolucaoItem[] {
  const byId = new Map(items.map((i) => [i.id, i]));
  const chain: SolucaoItem[] = [];
  let current = byId.get(id);
  const seen = new Set<string>();
  while (current?.parentId && byId.has(current.parentId)) {
    if (seen.has(current.id)) break;
    seen.add(current.id);
    const parent = byId.get(current.parentId)!;
    chain.unshift(parent);
    current = parent;
  }
  return chain;
}

/** Raiz da cadeia (ou o próprio item se já for raiz). */
export function getSolucaoRoot(
  items: SolucaoItem[],
  id: string,
): SolucaoItem | null {
  const item = items.find((i) => i.id === id);
  if (!item) return null;
  const ancestors = getSolucaoAncestors(items, id);
  return ancestors[0] ?? item;
}

/** Breadcrumb: "Segurança › Treinamentos › NR-17". */
export function getSolucaoPathLabel(
  items: SolucaoItem[],
  id: string,
  separator = " › ",
): string {
  const item = items.find((i) => i.id === id);
  if (!item) return id;
  const path = [...getSolucaoAncestors(items, id), item];
  return path.map((p) => p.titulo || p.id).join(separator);
}

/** Ids do nó + todos os descendentes (para filtro de projetos). */
export function getDescendantIds(
  items: SolucaoItem[],
  id: string,
): Set<string> {
  const result = new Set<string>([id]);
  const queue = [id];
  while (queue.length > 0) {
    const parent = queue.shift()!;
    for (const child of getChildSolucoes(items, parent)) {
      if (result.has(child.id)) continue;
      result.add(child.id);
      queue.push(child.id);
    }
  }
  return result;
}

/**
 * Árvore recursiva (máx. SOLUCAO_MAX_DEPTH).
 * Itens além da profundidade máxima sobem para o ancestral permitido mais próximo.
 */
export function buildSolucaoTree(items: SolucaoItem[]): SolucaoNode[] {
  const byId = new Map(items.map((i) => [i.id, i]));
  const roots = getRootSolucoes(items);
  const rootIds = new Set(roots.map((r) => r.id));

  function childrenOf(parentId: string, depth: number): SolucaoNode[] {
    if (depth >= SOLUCAO_MAX_DEPTH) return [];
    return items
      .filter((i) => i.parentId === parentId && !rootIds.has(i.id) && byId.has(i.id))
      .map((child) => ({
        ...child,
        children: childrenOf(child.id, depth + 1),
      }));
  }

  return roots.map((root) => ({
    ...root,
    children: childrenOf(root.id, 1),
  }));
}

/**
 * Resolve o grupo a exibir quando o filtro/hash aponta para qualquer nível.
 * Sempre agrupa sob a raiz da cadeia; `focusId` é o nó clicado.
 */
export function resolveSolucaoGroup(
  items: SolucaoItem[],
  filterId: string,
): { root: SolucaoItem; tree: SolucaoNode; focusId: string } | null {
  const item = items.find((i) => i.id === filterId);
  if (!item) return null;
  const root = getSolucaoRoot(items, filterId);
  if (!root) return null;
  const tree = buildSolucaoTree(items).find((n) => n.id === root.id);
  if (!tree) {
    return {
      root,
      tree: { ...root, children: [] },
      focusId: item.id,
    };
  }
  return { root, tree, focusId: item.id };
}

/** Lista plana pré-ordem com profundidade (para CMS / selects). */
export function flattenSolucaoTree(
  items: SolucaoItem[],
): { item: SolucaoItem; depth: number; pathLabel: string }[] {
  const tree = buildSolucaoTree(items);
  const out: { item: SolucaoItem; depth: number; pathLabel: string }[] = [];

  function walk(nodes: SolucaoNode[], depth: number, prefix: string[]) {
    for (const node of nodes) {
      const path = [...prefix, node.titulo || node.id];
      out.push({
        item: node,
        depth,
        pathLabel: path.join(" › "),
      });
      walk(node.children, depth + 1, path);
    }
  }

  walk(tree, 1, []);
  return out;
}
