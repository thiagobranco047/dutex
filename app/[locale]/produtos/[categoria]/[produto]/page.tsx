import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2, Info, MessageCircle, Ruler } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FinalCta from "@/components/sections/FinalCta";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/catalog/Breadcrumbs";
import ConfigurationTable from "@/components/catalog/ConfigurationTable";
import DatasheetRequest from "@/components/catalog/DatasheetRequest";
import ProductCard from "@/components/catalog/ProductCard";
import ProductGallery from "@/components/catalog/ProductGallery";
import { Link } from "@/i18n/navigation";
import {
  categoryPath,
  getCategory,
  getProduct,
  isIndexable,
  isTranslated,
  localize,
  productPath,
  productsInCategory,
  type CategoryId,
} from "@/lib/catalog";
import { buildEntries, hasDatasheet } from "@/lib/catalog/server";
import { breadcrumbJsonLd, catalogMetadata, jsonLdScript, resolveLocale } from "@/lib/catalog/seo";
import { WHATSAPP_NUMBER } from "@/lib/data";
import { absoluteUrl, localizedPath } from "@/lib/seo";

type Params = Promise<{ locale: string; categoria: string; produto: string }>;

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { categoria: string } }) {
  return productsInCategory(params.categoria as CategoryId).map((product) => ({ produto: product.slug }));
}

async function load(params: Params) {
  const { locale: rawLocale, categoria, produto } = await params;
  const locale = resolveLocale(rawLocale);
  const product = getProduct(categoria, produto);
  const category = getCategory(categoria);
  return { locale, product, category };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, product } = await load(params);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: "catalog.meta" });
  const name = localize(product.name, locale);
  return catalogMetadata({
    locale,
    path: productPath(product),
    title: t("productTitle", { product: name }),
    description: localize(product.summary, locale),
    image: product.images[0]?.src ?? null,
    noindex: !isIndexable(product, locale),
  });
}

export default async function ProdutoPage({ params }: { params: Params }) {
  const { locale, product, category } = await load(params);
  if (!product || !category) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catalog" });

  const name = localize(product.name, locale);
  const summary = localize(product.summary, locale);
  const description = product.description ? localize(product.description, locale) : null;
  const categoryName = localize(category.name, locale);
  const translated = isTranslated(product, locale);
  const datasheetUrl = hasDatasheet(product.slug) ? product.datasheetPath : null;
  const quoteUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("product.whatsappMessage", { product: name }))}`;
  const related = buildEntries(
    productsInCategory(product.categoryId).filter((item) => item.slug !== product.slug).slice(0, 3),
    locale,
    (key) => t(key),
  );
  const galleryImages = product.images.map((image) => ({ ...image, alt: name }));
  const contentLang = translated ? undefined : "pt-BR";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description ?? summary,
    url: absoluteUrl(localizedPath(locale, productPath(product))),
    image: product.images.map((image) => absoluteUrl(image.src)),
    brand: { "@type": "Brand", name: "Dutex" },
    manufacturer: { "@type": "Organization", name: "Dutex Industrial" },
    category: categoryName,
    material: product.materials.map((id) => t(`materials.${id}`)).join(", ") || undefined,
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
              { name: categoryName, path: categoryPath(category.id) },
              { name, path: productPath(product) },
            ],
            locale,
          ),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(productJsonLd)} />
      <main>
        <section className="relative overflow-hidden bg-dark pb-16 pt-40 lg:pb-20 lg:pt-48">
          <Container>
            <Breadcrumbs
              items={[
                { label: t("product.home"), href: "/" },
                { label: t("product.products"), href: "/produtos" },
                { label: categoryName, href: categoryPath(category.id) },
                { label: name },
              ]}
            />
            {(product.status !== "publicado" || !translated) && (
              <div className="mb-6 flex flex-col gap-2">
                {product.status !== "publicado" && (
                  <p className="inline-flex w-fit items-center gap-2 rounded-lg bg-yellow-400/15 px-3 py-2 text-xs font-medium text-yellow-200">
                    <Info size={14} aria-hidden />
                    {t("product.draftNotice")}
                  </p>
                )}
                {!translated && (
                  <p className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/70">
                    <Info size={14} aria-hidden />
                    {t("product.translationNotice")}
                  </p>
                )}
              </div>
            )}
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div lang={contentLang}>
                <Link href={categoryPath(category.id)}>
                  <Badge variant="white" className="mb-5 hover:bg-white/25">
                    {categoryName}
                  </Badge>
                </Link>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:leading-[1.1]">{name}</h1>
                <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">{summary}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={quoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="quote-product"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-accent px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-accent-dark"
                  >
                    <MessageCircle size={18} aria-hidden />
                    {t("product.requestQuote")}
                  </a>
                  <DatasheetRequest
                    productName={name}
                    productSlug={product.slug}
                    datasheetUrl={datasheetUrl}
                    className="border-white/30 text-white hover:bg-white/10"
                  />
                </div>

                {(product.materials.length > 0 || product.processes.length > 0) && (
                  <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                    {product.materials.length > 0 && (
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/40">{t("product.materials")}</dt>
                        <dd className="mt-1 text-sm text-white/80">{product.materials.map((id) => t(`materials.${id}`)).join(", ")}</dd>
                      </div>
                    )}
                    {product.processes.length > 0 && (
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/40">{t("product.processes")}</dt>
                        <dd className="mt-1 text-sm text-white/80">{product.processes.map((id) => t(`processes.${id}`)).join(", ")}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>
              <ProductGallery images={galleryImages} name={name} />
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <Container>
            {(description || product.features.length > 0 || product.uses.length > 0) && (
              <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14" lang={contentLang}>
                <div>
                  {description && (
                    <>
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t("product.about")}</h2>
                      <p className="mt-4 text-base leading-relaxed text-gray-text">{description}</p>
                    </>
                  )}
                  {product.features.length > 0 && (
                    <>
                      <h3 className="mt-8 text-lg font-bold text-gray-900">{t("product.features")}</h3>
                      <ul className="mt-4 space-y-2.5">
                        {product.features.map((feature) => (
                          <li key={feature.pt} className="flex gap-2.5 text-sm leading-relaxed text-gray-text">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-accent" aria-hidden />
                            {localize(feature, locale)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                {product.uses.length > 0 && (
                  <aside className="rounded-xl bg-gray-light p-6">
                    <h3 className="text-lg font-bold text-gray-900">{t("product.uses")}</h3>
                    <ul className="mt-4 space-y-2">
                      {product.uses.map((use) => (
                        <li key={use.pt} className="text-sm leading-relaxed text-gray-text">
                          {localize(use, locale)}
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}
              </div>
            )}

            <div className="mt-16" id="medidas">
              <div className="flex items-center gap-3">
                <Ruler size={22} className="text-primary" aria-hidden />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t("product.configurationsTitle")}</h2>
              </div>
              {product.configurations.length > 0 ? (
                <>
                  <p className="mt-2 text-sm text-gray-text">{t("product.configurationsNote")}</p>
                  <div className="mt-6">
                    <ConfigurationTable configurations={product.configurations} productName={name} locale={locale} />
                  </div>
                </>
              ) : (
                <p className="mt-3 text-sm text-gray-text">{t("product.noConfigurations")}</p>
              )}
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl bg-primary p-8 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-white">{t("product.customTitle")}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">{t("product.customText")}</p>
              </div>
              <a
                href={quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="quote-custom"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gray-light"
              >
                <MessageCircle size={18} aria-hidden />
                {t("product.requestQuote")}
              </a>
            </div>
          </Container>
        </section>

        {related.length > 0 && (
          <section className="bg-gray-light py-16 lg:py-20" aria-labelledby="related-products">
            <Container>
              <h2 id="related-products" className="text-2xl font-bold tracking-tight text-gray-900">
                {t("product.related", { category: categoryName.toLowerCase() })}
              </h2>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((entry) => (
                  <li key={entry.slug}>
                    <ProductCard entry={entry} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
