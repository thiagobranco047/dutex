// Busca e filtros do catálogo. Sem dependências de servidor: roda no navegador.

import type { CategoryId, MaterialId, ProcessId } from "./types.ts";

export type CatalogEntry = {
  slug: string;
  href: string;
  name: string;
  summary: string;
  categoryId: CategoryId;
  categoryName: string;
  applications: readonly CategoryId[];
  materials: readonly MaterialId[];
  processes: readonly ProcessId[];
  image: { src: string; width: number; height: number; alt: string } | null;
  configurationCount: number;
  customizable: boolean;
  draft: boolean;
  /** Nome, resumo, categoria, materiais, processos e medidas, sem acentos e em minúsculas. */
  searchText: string;
};

export type CatalogFilters = {
  q?: string;
  aplicacao?: string;
  material?: string;
  processo?: string;
};

export const filterKeys = ["q", "aplicacao", "material", "processo"] as const satisfies ReadonlyArray<keyof CatalogFilters>;

export function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function matchesQuery(entry: CatalogEntry, query: string) {
  const tokens = normalizeText(query).split(/\s+/).filter(Boolean);
  return tokens.every((token) => entry.searchText.includes(token));
}

export function filterEntries(entries: readonly CatalogEntry[], filters: CatalogFilters) {
  return entries.filter(
    (entry) =>
      (!filters.q || matchesQuery(entry, filters.q)) &&
      (!filters.aplicacao || entry.applications.includes(filters.aplicacao as CategoryId)) &&
      (!filters.material || entry.materials.includes(filters.material as MaterialId)) &&
      (!filters.processo || entry.processes.includes(filters.processo as ProcessId)),
  );
}

export type FacetOption = { value: string; count: number };

/** Contagem por opção considerando os outros filtros ativos (o próprio filtro é ignorado). */
export function facetCounts(
  entries: readonly CatalogEntry[],
  filters: CatalogFilters,
  key: "aplicacao" | "material" | "processo",
  values: readonly string[],
): FacetOption[] {
  const scoped = filterEntries(entries, { ...filters, [key]: undefined });
  const pick = (entry: CatalogEntry): readonly string[] =>
    key === "aplicacao" ? entry.applications : key === "material" ? entry.materials : entry.processes;
  return values
    .map((value) => ({ value, count: scoped.filter((entry) => pick(entry).includes(value)).length }))
    .filter((option) => option.count > 0 || filters[key] === option.value);
}

export function readFilters(params: URLSearchParams): CatalogFilters {
  const filters: CatalogFilters = {};
  for (const key of filterKeys) {
    const value = params.get(key)?.trim();
    if (value) filters[key] = value;
  }
  return filters;
}

export function filtersToQuery(filters: CatalogFilters) {
  const params = new URLSearchParams();
  for (const key of filterKeys) {
    const value = filters[key]?.trim();
    if (value) params.set(key, value);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}
