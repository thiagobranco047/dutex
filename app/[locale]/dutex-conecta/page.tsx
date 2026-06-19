import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Container from "@/components/ui/Container";
import DutexConectaLogo from "@/components/ui/DutexConectaLogo";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { contactInfo, WHATSAPP_NUMBER } from "@/lib/data";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, localizedAlternates, localizedPath } from "@/lib/seo";
import { ArrowRight, CheckCircle2, Factory, Lightbulb, Send } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const localeKey = (routing.locales.includes(locale as Locale)
    ? locale
    : routing.defaultLocale) as Locale;

  return {
    title: `Dutex Conecta | ${tMeta("title")}`,
    description:
      "Canal de inovação aberta da Dutex para conectar ideias com aplicação industrial à estrutura real de engenharia e manufatura.",
    alternates: {
      canonical: absoluteUrl(localizedPath(localeKey, "dutex-conecta")),
      ...localizedAlternates("dutex-conecta"),
    },
    openGraph: {
      title: `Dutex Conecta | ${tMeta("title")}`,
      description:
        "Canal de inovação aberta da Dutex para conectar ideias com aplicação industrial à estrutura real de engenharia e manufatura.",
      url: absoluteUrl(localizedPath(localeKey, "dutex-conecta")),
      type: "website",
      locale: localeKey === "pt" ? "pt_BR" : localeKey,
      images: [
        {
          url: absoluteUrl("/images/plasticos-de-engenharia.webp"),
          width: 1200,
          height: 630,
          alt: "Dutex Conecta",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Dutex Conecta | ${tMeta("title")}`,
      description:
        "Canal de inovação aberta da Dutex para conectar ideias com aplicação industrial à estrutura real de engenharia e manufatura.",
      images: [absoluteUrl("/images/plasticos-de-engenharia.webp")],
    },
  };
}

type FlowStep = { title: string; text: string };
type FaqItem = { question: string; answer: string };

export default async function DutexConectaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (routing.locales.includes(locale as Locale)) {
    setRequestLocale(locale);
  }

  const t = await getTranslations("conectaPage");
  const tLogo = await getTranslations("conectaLogo");
  const fitExamples = t.raw("fit.items") as string[];
  const flowSteps = t.raw("flow.steps") as FlowStep[];
  const ideaTypes = t.raw("form.ideaTypes") as string[];
  const industrialAreas = t.raw("form.areas") as string[];
  const panelItems = t.raw("hero.panelItems") as string[];
  const faqItems = t.raw("faq.items") as FaqItem[];
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
  const hasAccessKey = Boolean(accessKey);
  const localeKey = (routing.locales.includes(locale as Locale)
    ? locale
    : routing.defaultLocale) as Locale;
  const languageTag = localeKey === "pt" ? "pt-BR" : localeKey;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl(localizedPath(localeKey)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Dutex Conecta",
        item: absoluteUrl(localizedPath(localeKey, "dutex-conecta")),
      },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Dutex Conecta",
    description:
      "Canal de inovação aberta da Dutex para conectar ideias com aplicação industrial à estrutura real de engenharia e manufatura.",
    url: absoluteUrl(localizedPath(localeKey, "dutex-conecta")),
    inLanguage: languageTag,
    about:
      localeKey === "en"
        ? [
            "Open innovation",
            "Industrial manufacturing",
            "Applied engineering",
            "Solution development",
          ]
        : localeKey === "es"
          ? [
              "Innovación abierta",
              "Manufactura industrial",
              "Ingeniería aplicada",
              "Desarrollo de soluciones",
            ]
          : [
              "Inovação aberta",
              "Manufatura industrial",
              "Engenharia aplicada",
              "Desenvolvimento de soluções",
            ],
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá Dutex, gostaria de enviar uma ideia para o Dutex Conecta."
  )}`;

  return (
    <>
      <Header />
      <Script
        id="conecta-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="conecta-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="conecta-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <main>
        <section className="bg-dark pt-40 pb-20 lg:pt-48 lg:pb-24 relative overflow-hidden">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
              <div>
                <DutexConectaLogo
                  alt={tLogo("alt")}
                  width={320}
                  className="mb-10"
                />
                <Badge variant="white" className="mb-5">
                  {t("hero.badge")}
                </Badge>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                  {t("hero.titleBefore")}
                  <br />
                  <span className="text-green-accent">{t("hero.titleHighlight")}</span>
                </h1>
                <p className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg max-w-xl">
                  {t("hero.description")}
                </p>
              </div>
              <div>
                <div className="bg-white/[0.04] border border-white/[0.12] p-8 rounded-xl">
                  <p className="text-xs font-extrabold tracking-[3px] uppercase text-green-accent mb-4">
                    {t("hero.panelTitle")}
                  </p>
                  <div className="grid gap-3">
                    {panelItems.map((item, index) => {
                      const Icon =
                        index === 0 ? Factory : index === 1 ? Lightbulb : CheckCircle2;
                      return (
                        <div key={item} className="flex items-start gap-3">
                          <Icon
                            size={18}
                            className="text-green-accent mt-0.5 shrink-0"
                          />
                          <p className="text-sm text-white/75">{item}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="#form" size="lg">
                    {t("hero.primaryCta")}
                    <ArrowRight size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    href={whatsappUrl}
                    className="border-white/20"
                  >
                    {t("hero.secondaryCta")}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-primary py-16">
          <Container>
            <h2 className="text-2xl font-bold text-white mb-3">
              {t("authority.title")}
            </h2>
            <p className="text-sm leading-relaxed text-white/65 max-w-4xl">
              {t("authority.description")}
            </p>
          </Container>
        </section>

        <section className="bg-gray-light py-20 lg:py-24">
          <Container>
            <Badge variant="green" className="mb-5">
              {t("fit.badge")}
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-10">
              {t("fit.title")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {fitExamples.map((item) => (
                <div
                  key={item}
                  className="bg-white border border-gray-border rounded-lg px-4 py-3 text-sm text-gray-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 lg:py-24">
          <Container>
            <Badge variant="dark" className="mb-5">
              {t("flow.badge")}
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              {t("flow.title")}
            </h2>
            <p className="text-sm text-gray-text mb-10">
              {t("flow.description")}
            </p>
            <div className="grid gap-5 lg:grid-cols-3">
              {flowSteps.map((step) => (
                <div
                  key={step.title}
                  className="border border-gray-border border-t-4 border-t-primary p-6 rounded-lg"
                >
                  <p className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary mb-3">
                    {step.title}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-text">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section id="form" className="bg-gray-light py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-4xl">
              <Badge variant="green" className="mb-5">
                {t("form.badge")}
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
                {t("form.title")}
              </h2>
              <p className="text-sm text-gray-text mb-10">
                {t("form.description")}
              </p>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="grid gap-4"
              >
                <input
                  type="hidden"
                  name="access_key"
                  value={accessKey}
                />
                <input
                  type="hidden"
                  name="subject"
                  value={t("form.subject")}
                />
                <input
                  type="hidden"
                  name="from_name"
                  value="Website Dutex"
                />
                <input type="checkbox" name="botcheck" className="hidden" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    name="nome"
                    placeholder={t("form.name")}
                    className="rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  />
                  <input
                    name="empresa"
                    placeholder={t("form.company")}
                    className="rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder={t("form.email")}
                    className="rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  />
                  <input
                    name="whatsapp"
                    placeholder={t("form.whatsapp")}
                    className="rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <select
                    name="tipo_ideia"
                    className="rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t("form.ideaTypePlaceholder")}
                    </option>
                    {ideaTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <select
                    name="area_relacionada"
                    className="rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {t("form.areaPlaceholder")}
                    </option>
                    {industrialAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  required
                  name="titulo_ideia"
                  placeholder={t("form.ideaTitle")}
                  className="rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />

                <textarea
                  required
                  name="problema"
                  placeholder={t("form.problem")}
                  className="min-h-24 rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <textarea
                  required
                  name="solucao"
                  placeholder={t("form.solution")}
                  className="min-h-28 rounded-lg border border-gray-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />

                <label className="flex items-start gap-2 rounded-lg border border-gray-border bg-white p-4 text-xs text-gray-text">
                  <input required type="checkbox" name="termos_aceitos" className="mt-0.5" />
                  <span>
                    {t("form.termsPrefix")}{" "}
                    <Link href="/compliance" className="text-primary underline">
                      {t("form.termsLink")}
                    </Link>
                    .
                  </span>
                </label>

                <Button
                  type="submit"
                  className="justify-center"
                  size="lg"
                  disabled={!hasAccessKey}
                >
                  {t("form.submit")}
                  <Send size={16} />
                </Button>
                {!hasAccessKey && (
                  <p className="text-xs text-red-600 text-center">
                    {t("form.configError")}
                  </p>
                )}
                <p className="text-xs text-gray-text text-center">
                  {t("form.disclaimer")}
                </p>
              </form>
            </div>
          </Container>
        </section>

        <section className="bg-primary py-16">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-white font-semibold">{t("contact.title")}</p>
                <p className="text-sm text-white/65">
                  {t("contact.description")}
                </p>
              </div>
              <Button
                href={`mailto:${contactInfo.email}`}
                variant="outline"
                className="border-white/30"
              >
                {contactInfo.email}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
