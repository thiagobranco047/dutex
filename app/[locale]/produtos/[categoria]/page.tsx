import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  getCategory,
  localize,
  materialIds,
  processIds,
  productsInCategory,
} from "@/lib/catalog";
import { buildEntries } from "@/lib/catalog/server";
import { breadcrumbJsonLd, catalogMetadata, jsonLdScript, resolveLocale } from "@/lib/catalog/seo";

type Params = Promise<{ locale: string; categoria: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ categoria: category.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale, categoria } = await params;
  const locale = resolveLocale(rawLocale);
  const category = getCategory(categoria);
  if (!category) return {};
  const t = await getTranslations({ locale, namespace: "catalog.meta" });
  return catalogMetadata({
    locale,
    path: categoryPath(category.id),
    title: t("categoryTitle", { category: localize(category.name, locale) }),
    description: localize(category.description, locale),
    noindex: productsInCategory(category.id).length === 0,
  });
}

export default async function CategoriaPage({ params }: { params: Params }) {
  const { locale: rawLocale, categoria } = await params;
  const locale = resolveLocale(rawLocale);
  const category = getCategory(categoria);
  if (!category) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catalog" });

  const name = localize(category.name, locale);
  const products = productsInCategory(category.id);
  const entries = buildEntries(products, locale, (key) => t(key));
  const materialOptions = materialIds.map((id) => ({ value: id, label: t(`materials.${id}`) }));
  const processOptions = processIds.map((id) => ({ value: id, label: t(`processes.${id}`) }));
  const others = categories.filter((item) => item.id !== category.id);

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
              { name, path: categoryPath(category.id) },
            ],
            locale,
          ),
        )}
      />
      <main>
        <section className="relative overflow-hidden bg-dark pb-16 pt-40 lg:pb-20 lg:pt-48">
          <Container>
            <Breadcrumbs
              items={[
                { label: t("product.home"), href: "/" },
                { label: t("product.products"), href: "/produtos" },
                { label: name },
              ]}
            />
            <Badge variant="white" className="mb-5">
              {t("category.badge")}
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:leading-[1.1]">{name}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              {localize(category.description, locale)}
            </p>
          </Container>
        </section>

        <section className="bg-gray-light py-16 lg:py-20">
          <Container>
            <CatalogBrowser
              entries={entries}
              applications={[]}
              materials={materialOptions}
              processes={processOptions}
              hideApplicationFilter
            />

            <nav aria-labelledby="other-categories" className="mt-16">
              <h2 id="other-categories" className="text-lg font-bold text-gray-900">
                {t("category.otherCategories")}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {others.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={categoryPath(item.id)}
                      className="inline-flex rounded-full border border-gray-border bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary"
                    >
                      {localize(item.name, locale)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/produtos"
                    className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    {t("category.backToCatalog")}
                  </Link>
                </li>
              </ul>
            </nav>
          </Container>
        </section>

        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
