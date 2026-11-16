"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  facetCounts,
  filterEntries,
  filtersToQuery,
  readFilters,
  type CatalogEntry,
  type CatalogFilters,
} from "@/lib/catalog/search";
import ProductCard from "./ProductCard";

type Option = { value: string; label: string };

type CatalogBrowserProps = {
  entries: readonly CatalogEntry[];
  applications: readonly Option[];
  materials: readonly Option[];
  processes: readonly Option[];
  /** Esconde o filtro de aplicação (páginas de categoria). */
  hideApplicationFilter?: boolean;
};

/**
 * Busca e filtros com estado na URL (?q=&aplicacao=&material=&processo=).
 * O HTML do servidor traz a lista completa (SEO e sem JS); os filtros da URL são aplicados após a hidratação.
 */
export default function CatalogBrowser({
  entries,
  applications,
  materials,
  processes,
  hideApplicationFilter = false,
}: CatalogBrowserProps) {
  const t = useTranslations("catalog");
  const [filters, setFilters] = useState<CatalogFilters>({});

  useEffect(() => {
    const sync = () => setFilters(readFilters(new URLSearchParams(window.location.search)));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const update = useCallback((patch: Partial<CatalogFilters>) => {
    setFilters((current) => {
      const next = { ...current, ...patch };
      const url = `${window.location.pathname}${filtersToQuery(next)}${window.location.hash}`;
      window.history.replaceState(window.history.state, "", url);
      return next;
    });
  }, []);

  const results = useMemo(() => filterEntries(entries, filters), [entries, filters]);
  const counts = useMemo(
    () => ({
      aplicacao: new Map(facetCounts(entries, filters, "aplicacao", applications.map((o) => o.value)).map((o) => [o.value, o.count])),
      material: new Map(facetCounts(entries, filters, "material", materials.map((o) => o.value)).map((o) => [o.value, o.count])),
      processo: new Map(facetCounts(entries, filters, "processo", processes.map((o) => o.value)).map((o) => [o.value, o.count])),
    }),
    [entries, filters, applications, materials, processes],
  );
  const hasFilters = Boolean(filters.q || filters.aplicacao || filters.material || filters.processo);

  return (
    <div>
      <div className="rounded-xl border border-gray-border bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
          <label className="relative block">
            <span className="sr-only">{t("filters.searchLabel")}</span>
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
            <input
              type="search"
              value={filters.q ?? ""}
              onChange={(event) => update({ q: event.target.value || undefined })}
              placeholder={t("filters.searchPlaceholder")}
              className="w-full rounded-lg border border-gray-border bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </label>
          <FilterSelect
            label={t("filters.material")}
            value={filters.material}
            options={materials}
            counts={counts.material}
            allLabel={t("filters.all")}
            onChange={(value) => update({ material: value })}
          />
          <FilterSelect
            label={t("filters.process")}
            value={filters.processo}
            options={processes}
            counts={counts.processo}
            allLabel={t("filters.all")}
            onChange={(value) => update({ processo: value })}
          />
        </div>

        {!hideApplicationFilter && (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t("filters.application")}>
            <Pill active={!filters.aplicacao} onClick={() => update({ aplicacao: undefined })}>
              {t("filters.all")}
            </Pill>
            {applications.map((option) => {
              const count = counts.aplicacao.get(option.value) ?? 0;
              return (
                <Pill
                  key={option.value}
                  active={filters.aplicacao === option.value}
                  disabled={count === 0 && filters.aplicacao !== option.value}
                  onClick={() => update({ aplicacao: filters.aplicacao === option.value ? undefined : option.value })}
                >
                  {option.label}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </Pill>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-700" aria-live="polite">
          {t("filters.results", { count: results.length })}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => update({ q: undefined, aplicacao: undefined, material: undefined, processo: undefined })}
            className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <X size={14} aria-hidden />
            {t("filters.clear")}
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((entry, index) => (
            <li key={entry.slug}>
              <ProductCard entry={entry} priority={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-gray-border bg-white p-10 text-center">
          <p className="font-semibold text-gray-900">{t("filters.noResults")}</p>
          <p className="mt-2 text-sm text-gray-text">{t("filters.noResultsHint")}</p>
        </div>
      )}
    </div>
  );
}

function Pill({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "border-primary bg-primary text-white"
          : "border-gray-border bg-white text-gray-700 hover:border-primary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

function FilterSelect({
  label,
  value,
  options,
  counts,
  allLabel,
  onChange,
}: {
  label: string;
  value: string | undefined;
  options: readonly Option[];
  counts: Map<string, number>;
  allLabel: string;
  onChange: (value: string | undefined) => void;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || undefined)}
        className="w-full cursor-pointer rounded-lg border border-gray-border bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:w-56"
      >
        <option value="">
          {label}: {allLabel}
        </option>
        {options
          .filter((option) => (counts.get(option.value) ?? 0) > 0 || option.value === value)
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} ({counts.get(option.value) ?? 0})
            </option>
          ))}
      </select>
    </label>
  );
}
