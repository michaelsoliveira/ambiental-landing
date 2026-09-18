import {
  DEFAULT_SECTION_ORDER,
  type FooterContent,
  type HeaderContent,
  type LayoutContent,
  type SectionKey,
} from "@/lib/content/schema";

/**
 * CMS remoto pode ter layout antigo sem chaves novas do catálogo (ex.: `sistemas`).
 * Une as seções remotas com as locais ausentes, preservando `visible` remoto e a
 * ordem canônica de `DEFAULT_SECTION_ORDER`.
 */
export function mergeLayoutSections(
  remote: LayoutContent,
  local: LayoutContent,
): LayoutContent {
  const remoteByKey = new Map(remote.sections.map((s) => [s.key, s]));
  const localByKey = new Map(local.sections.map((s) => [s.key, s]));

  const keys: SectionKey[] = [];
  for (const key of DEFAULT_SECTION_ORDER) {
    if (remoteByKey.has(key) || localByKey.has(key)) keys.push(key);
  }
  for (const section of remote.sections) {
    if (!keys.includes(section.key)) keys.push(section.key);
  }

  return {
    sections: keys.map((key, index) => {
      const remoteSec = remoteByKey.get(key);
      const localSec = localByKey.get(key);
      return {
        key,
        visible: remoteSec?.visible ?? localSec?.visible ?? true,
        order: index + 1,
      };
    }),
  };
}

const SISTEMAS_NAV_HREF = "#sistemas";

/** Links omitidos do navbar (permanecem no footer / seções da página). */
const HEADER_NAV_OMITTED_HREFS = [
  "#depoimentos",
  "#faq",
  "#contato",
] as const;

function hrefMatches(itemHref: string, target: string): boolean {
  return itemHref === target || itemHref.endsWith(target);
}

function injectSistemasNavItem<T extends { navItems: { label: string; href: string }[] }>(
  remote: T,
  local: T,
): T {
  const hasSistemas = remote.navItems.some((item) =>
    hrefMatches(item.href, SISTEMAS_NAV_HREF),
  );
  if (hasSistemas) return remote;

  const sistemasItem = local.navItems.find((item) =>
    hrefMatches(item.href, SISTEMAS_NAV_HREF),
  );
  if (!sistemasItem) return remote;

  const items = [...remote.navItems];
  const afterIdx = items.findIndex(
    (item) =>
      item.href.includes("servicos") ||
      item.href.includes("solucoes") ||
      item.href.includes("#solucoes"),
  );
  const insertAt = afterIdx >= 0 ? afterIdx + 1 : Math.min(2, items.length);
  items.splice(insertAt, 0, sistemasItem);
  return { ...remote, navItems: items };
}

function pruneHeaderNavItems(header: HeaderContent): HeaderContent {
  return {
    ...header,
    navItems: header.navItems.filter(
      (item) =>
        !HEADER_NAV_OMITTED_HREFS.some((href) => hrefMatches(item.href, href)),
    ),
  };
}

/** Header: injeta `#sistemas` e remove Depoimentos/FAQ/Contato do navbar. */
export function mergeHeaderNav(
  remote: HeaderContent,
  local: HeaderContent,
): HeaderContent {
  return pruneHeaderNavItems(injectSistemasNavItem(remote, local));
}

/** Footer: só injeta `#sistemas` se faltar (mantém links longos). */
export function ensureCatalogNavItems(
  remote: FooterContent,
  local: FooterContent,
): FooterContent {
  return injectSistemasNavItem(remote, local);
}
