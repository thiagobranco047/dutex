// Funções só de servidor (leem o disco). Não importar em Client Components.

import fs from "node:fs";
import path from "node:path";
import { categories, localize, applicationsOf, productPath, datasheetPathFor } from "./index.ts";
import { normalizeText, type CatalogEntry } from "./search.ts";
import type { Locale, Product } from "./types.ts";

type Translate = (key: string) => string;

/** true quando public/fichas-tecnicas/{slug}.pdf existe no build. */
export function hasDatasheet(slug: string) {
  return fs.existsSync(path.join(process.cwd(), "public", datasheetPathFor(slug)));
}

/** Entradas do catálogo já traduzidas, para a listagem com busca e filtros. */
export function buildEntries(products: readonly Product[], locale: Locale, t: Translate): CatalogEntry[] {
  return products.map((product) => {
    const category = categories.find((item) => item.id === product.categoryId)!;
    const name = localize(product.name, locale);
    const summary = localize(product.summary, locale);
    const image = product.images[0] ?? null;
    const searchParts = [
      name,
      product.name.pt,
      summary,
      localize(category.name, locale),
      ...product.materials.map((id) => t(`materials.${id}`)),
      ...product.processes.map((id) => t(`processes.${id}`)),
      ...product.configurations.flatMap((item) => [item.label, item.dimensions ?? "", item.material ?? ""]),
    ];
    return {
      slug: product.slug,
      href: productPath(product),
      name,
      summary,
      categoryId: product.categoryId,
      categoryName: localize(category.name, locale),
      applications: applicationsOf(product),
      materials: product.materials,
      processes: product.processes,
      image: image ? { src: image.src, width: image.width, height: image.height, alt: name } : null,
      configurationCount: product.configurations.length,
      customizable: product.customizable,
      draft: product.status !== "publicado",
      searchText: normalizeText(searchParts.join(" ")),
    };
  });
}
