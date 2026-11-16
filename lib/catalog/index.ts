import { categories, getCategory } from "./categories.ts";
import { productInputs } from "./products.ts";
import { productImages } from "./product-images.ts";
import { productTranslations } from "./translations.ts";
import type { CategoryId, LocalizedText, Locale, MaterialId, ProcessId, Product, ProductImage } from "./types.ts";

export { categories, getCategory };
export type * from "./types.ts";

const manifest = productImages;

/** Caminho público da ficha técnica de um produto. O PDF entra em public/fichas-tecnicas/. */
export function datasheetPathFor(slug: string) {
  return `/fichas-tecnicas/${slug}.pdf`;
}

function buildProducts(): Product[] {
  const orderByCategory = new Map<CategoryId, number>();
  return productInputs.map((input) => {
    const order = (orderByCategory.get(input.categoryId) ?? 0) + 1;
    orderByCategory.set(input.categoryId, order);
    const images: ProductImage[] = (manifest[input.slug] ?? []).map((image, index) => ({
      ...image,
      alt: `${input.name.pt} - imagem ${index + 1}`,
    }));
    const tr = productTranslations[input.slug];
    const merge = (text: LocalizedText, pair?: { en: string; es: string }): LocalizedText =>
      pair ? { pt: text.pt, en: pair.en, es: pair.es } : text;
    return {
      ...input,
      name: merge(input.name, tr?.name),
      summary: merge(input.summary, tr?.summary),
      description: input.description ? merge(input.description, tr?.description) : null,
      features: input.features.map((item, i) => merge(item, tr?.features?.[i])),
      uses: input.uses.map((item, i) => merge(item, tr?.uses?.[i])),
      order,
      images,
      datasheetPath: datasheetPathFor(input.slug),
      translationReviewed: tr?.reviewed ?? { en: false, es: false },
    };
  });
}

export const allProducts: readonly Product[] = buildProducts();

/**
 * Rascunhos aparecem em desenvolvimento e quando CATALOG_SHOW_DRAFTS=true (ex.: preview da Vercel).
 * Em produção, só produtos com status "publicado".
 */
export const showDrafts = process.env.NODE_ENV !== "production" || process.env.CATALOG_SHOW_DRAFTS === "true";

export function isVisible(product: Product) {
  return product.status === "publicado" || showDrafts;
}

export function visibleProducts() {
  const categoryOrder = new Map(categories.map((category) => [category.id, category.order]));
  return allProducts
    .filter(isVisible)
    .sort((a, b) => (categoryOrder.get(a.categoryId)! - categoryOrder.get(b.categoryId)!) || a.order - b.order);
}

export function productsInCategory(categoryId: CategoryId) {
  return visibleProducts().filter((product) => product.categoryId === categoryId);
}

export function getProduct(categoryId: string, slug: string) {
  const product = allProducts.find((item) => item.slug === slug && item.categoryId === categoryId);
  return product && isVisible(product) ? product : null;
}

export function productPath(product: Pick<Product, "categoryId" | "slug">) {
  return `/produtos/${product.categoryId}/${product.slug}`;
}

export function categoryPath(categoryId: CategoryId) {
  return `/produtos/${categoryId}`;
}

/** Texto no idioma pedido, com fallback para o português. */
export function localize(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.pt;
}

/** true quando nome, resumo, descrição, características e aplicações existem no idioma. */
export function isTranslated(product: Product, locale: Locale) {
  if (locale === "pt") return true;
  const texts = [product.name, product.summary, product.description, ...product.features, ...product.uses];
  return texts.every((text) => !text || Boolean(text[locale]));
}

/** Página indexável: publicada e, fora do português, traduzida e revisada pela Dutex. */
export function isIndexable(product: Product, locale: Locale) {
  if (product.status !== "publicado") return false;
  return locale === "pt" || (isTranslated(product, locale) && product.translationReviewed[locale]);
}

/** Aplicações em que o produto aparece no filtro: a categoria principal e as extras. */
export function applicationsOf(product: Product): CategoryId[] {
  return [product.categoryId, ...product.alsoIn.filter((id) => id !== product.categoryId)];
}

export const materialIds: readonly MaterialId[] = [
  "aco-carbono",
  "aco-zincado",
  "aco-galvanizado",
  "pp",
  "pead",
  "polionda",
  "plastico-de-engenharia",
  "borracha",
  "poliuretano",
  "manta-magnetica",
];

export const processIds: readonly ProcessId[] = [
  "caldeiraria",
  "conformacao",
  "corte",
  "extrusao",
  "injecao",
  "rotomoldagem",
  "estampagem",
  "usinagem-cnc",
];
