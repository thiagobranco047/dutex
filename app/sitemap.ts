import type { MetadataRoute } from "next";
import { absoluteUrl, localizedPath } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { allProducts, categories, categoryPath, isIndexable, productPath } from "@/lib/catalog";

const staticSlugs = ["", "sobre", "compliance", "dutex-conecta", "produtos"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Só produtos indexáveis no idioma (publicados e, em en/es, com tradução revisada).
  const published = allProducts.filter((product) => product.status === "publicado");
  const categoriesWithProducts = categories.filter((category) =>
    published.some((product) => product.categoryId === category.id),
  );

  return routing.locales.flatMap((locale) => [
    ...staticSlugs.map((slug) => ({
      url: absoluteUrl(localizedPath(locale, slug)),
      lastModified: now,
      changeFrequency: slug === "" ? ("weekly" as const) : ("monthly" as const),
      priority: slug === "" ? 1 : 0.8,
    })),
    ...categoriesWithProducts.map((category) => ({
      url: absoluteUrl(localizedPath(locale, categoryPath(category.id))),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...published
      .filter((product) => isIndexable(product, locale))
      .map((product) => ({
        url: absoluteUrl(localizedPath(locale, productPath(product))),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ]);
}
