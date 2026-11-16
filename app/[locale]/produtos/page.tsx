import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FinalCta from "@/components/sections/FinalCta";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import CatalogBrowser from "@/components/catalog/CatalogBrowser";
import { Link } from "@/i18n/navigation";
import {
  categories,
  categoryPath,
  localize,
  materialIds,
  processIds,
  productsInCategory,
  visibleProducts,
} from "@/lib/catalog";
import { buildEntries } from "@/lib/catalog/server";
import { breadcrumbJsonLd, catalogMetadata, jsonLdScript, resolveLocale } from "@/lib/catalog/seo";
import { absoluteUrl, localizedPath } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "catalog.meta" });
  return catalogMetadata({ locale, path: "produtos", title: t("title"), description: t("description") });
}

export default async function ProdutosPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catalog" });

  const products = visibleProducts();
  const entries = buildEntries(products, locale, (key) => t(key));
  const applicationOptions = categories.map((category) => ({ value: category.id, label: localize(category.name, locale) }));
  const materialOptions = materialIds.map((id) => ({ value: id, label: t(`materials.${id}`) }));
  const processOptions = processIds.map((id) => ({ value: id, label: t(`processes.${id}`) }));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("hero.title"),
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: absoluteUrl(localizedPath(locale, entry.href)),
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd(
            [
              { name: t("product.home"), path: "" },
              { name: t("product.products"), path: "produtos" },
            ],
            locale,
          ),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListJsonLd)} />
      <main>
        <section className="relative overflow-hidden bg-dark pb-16 pt-40 lg:pb-20 lg:pt-48">
          <Container>
            <Breadcrumbs items={[{ label: t("product.home"), href: "/" }, { label: t("product.products") }]} />
            <Badge variant="white" className="mb-5">
              {t("hero.badge")}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{t("hero.description")}</p>
          </Container>
        </section>

        <section className="bg-white py-16 lg:py-20" aria-labelledby="catalog-categories">
          <Container>
            <h2 id="catalog-categories" className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {t("categoriesTitle")}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const count = productsInCategory(category.id).length;
                return (
                  <li key={category.id}>
                    <Link
                      href={categoryPath(category.id)}
                      className="group flex h-full flex-col rounded-xl border border-gray-border bg-white p-6 transition-all hover:border-primary hover:shadow-md"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-green-accent-dark">
                        {t("category.products", { count })}
                      </span>
                      <span className="mt-2 text-lg font-bold text-gray-900 group-hover:text-primary">
                        {localize(category.name, locale)}
                      </span>
                      <span className="mt-2 text-sm leading-relaxed text-gray-text">{localize(category.description, locale)}</span>
                      <ArrowRight size={18} className="mt-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>

        <section id="catalogo" className="bg-gray-light py-16 lg:py-20" aria-labelledby="catalog-all">
          <Container>
            <h2 id="catalog-all" className="mb-8 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {t("allProductsTitle")}
            </h2>
            <CatalogBrowser
              entries={entries}
              applications={applicationOptions}
              materials={materialOptions}
              processes={processOptions}
            />
          </Container>
        </section>

        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
