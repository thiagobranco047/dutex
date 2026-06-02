import type { Metadata } from "next";
import Script from "next/script";
import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { contactInfo, WHATSAPP_NUMBER } from "@/lib/data";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, localizedAlternates, localizedPath } from "@/lib/seo";
import {
  ShieldCheck,
  Eye,
  Star,
  ArrowRight,
  Recycle,
} from "lucide-react";

const caseColors = {
  primary: {
    border: "border-t-primary",
    tag: "text-primary",
    result: "bg-primary",
  },
  green: {
    border: "border-t-green-accent",
    tag: "text-green-accent-dark",
    result: "bg-dark",
  },
  yellow: {
    border: "border-t-yellow-500",
    tag: "text-yellow-600",
    result: "bg-dark",
  },
} as const;

const caseColorKeys = ["primary", "green", "yellow"] as const;

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type Belief = {
  title: string;
  description: string;
};

type EsgStat = {
  value: string;
  label: string;
  description: string;
};

type CaseItem = {
  tag: string;
  challenge: string;
  solution: string;
  result: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sobrePage" });
  const localeKey = (routing.locales.includes(locale as Locale)
    ? locale
    : routing.defaultLocale) as Locale;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: absoluteUrl(localizedPath(localeKey, "sobre")),
      ...localizedAlternates("sobre"),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: absoluteUrl(localizedPath(localeKey, "sobre")),
      type: "article",
      locale: localeKey === "pt" ? "pt_BR" : localeKey,
      images: [
        {
          url: absoluteUrl("/images/transformacao-de-aco.webp"),
          width: 1200,
          height: 630,
          alt: "Sobre a Dutex Industrial",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [absoluteUrl("/images/transformacao-de-aco.webp")],
    },
  };
}

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (routing.locales.includes(locale as Locale)) {
    setRequestLocale(locale);
  }

  const t = await getTranslations();
  const tWhatsapp = await getTranslations("whatsapp");

  const timeline = t.raw("sobrePage.history.timeline") as TimelineItem[];
  const beliefs = t.raw("sobrePage.culture.beliefs") as Belief[];
  const values = t.raw("sobrePage.mvv.values") as string[];
  const esgStats = t.raw("sobrePage.esg.stats") as EsgStat[];
  const cases = t.raw("sobrePage.cases.items") as CaseItem[];
  const pillars = t.raw("sobrePage.hero.pillars") as string[];
  const historyParagraphs = t.raw("sobrePage.history.paragraphs") as string[];
  const faqItems = t.raw("sobrePage.faq.items") as FaqItem[];
  const localeKey = (routing.locales.includes(locale as Locale)
    ? locale
    : routing.defaultLocale) as Locale;
  const languageTag = localeKey === "pt" ? "pt-BR" : localeKey;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tWhatsapp("diagnosisMessage"))}`;
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
        name: t("sobrePage.hero.badge"),
        item: absoluteUrl(localizedPath(localeKey, "sobre")),
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
    name: t("sobrePage.meta.title"),
    description: t("sobrePage.meta.description"),
    url: absoluteUrl(localizedPath(localeKey, "sobre")),
    inLanguage: languageTag,
    about:
      localeKey === "en"
        ? [
            "Dutex Industrial",
            "Industrial solutions",
            "Applied engineering",
            "ISO 9001:2015",
          ]
        : localeKey === "es"
          ? [
              "Dutex Industrial",
              "Soluciones industriales",
              "Ingeniería aplicada",
              "ISO 9001:2015",
            ]
          : [
              "Dutex Industrial",
              "Soluções industriais",
              "Engenharia aplicada",
              "ISO 9001:2015",
            ],
  };

  return (
    <>
      <Header />
      <Script
        id="sobre-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="sobre-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="sobre-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <main>
        {/* Hero */}
        <section className="bg-dark pt-40 pb-20 lg:pt-48 lg:pb-24 relative overflow-hidden">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <Badge variant="white" className="mb-5">
                  {t("sobrePage.hero.badge")}
                </Badge>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                  &ldquo;{t("sobrePage.hero.titleBefore")}{" "}
                  <span className="text-green-accent">
                    {t("sobrePage.hero.titleHighlight")}
                  </span>
                  &rdquo;
                </h1>
                <p className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg max-w-xl">
                  {t("sobrePage.hero.description")}
                </p>
              </div>
              <div className="hidden lg:flex gap-0 border border-green-accent/25 rounded-lg overflow-hidden self-center justify-self-end">
                {pillars.map((word, i) => (
                  <div
                    key={word}
                    className={`px-8 py-6 text-center ${i < 2 ? "border-r border-green-accent/20" : ""} bg-primary/25`}
                  >
                    <span className="block text-lg font-bold text-green-accent">
                      {word}
                    </span>
                    <span className="block mt-1 text-[10px] font-semibold tracking-[3px] uppercase text-white/35">
                      {t("sobrePage.hero.pillarLabel", {
                        n: String(i + 1).padStart(2, "0"),
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* História */}
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <Badge variant="green" className="mb-5">
                  {t("sobrePage.history.badge")}
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  {t("sobrePage.history.titleBefore")}{" "}
                  <span className="text-primary">
                    {t("sobrePage.history.titleHighlight")}
                  </span>
                  {t("sobrePage.history.titleAfter")}
                </h2>
                <div className="mt-8 space-y-4 text-sm leading-relaxed text-gray-text">
                  {historyParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <blockquote className="mt-8 border-l-4 border-primary bg-gray-light rounded-r-lg p-6">
                  <p className="text-base italic leading-relaxed text-gray-900">
                    &ldquo;{t("sobrePage.history.quote")}&rdquo;
                  </p>
                  <footer className="mt-3 text-sm">
                    <strong className="text-primary">
                      {t("sobrePage.history.quoteAuthor")}
                    </strong>
                    <span className="text-gray-text">
                      {" "}
                      · {t("sobrePage.history.quoteRole")}
                    </span>
                  </footer>
                </blockquote>
              </div>

              {/* Timeline */}
              <div>
                <Badge variant="green" className="mb-5">
                  {t("sobrePage.history.timelineBadge")}
                </Badge>
                <div className="relative pl-7">
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary to-green-accent" />
                  {timeline.map((item, i) => (
                    <div key={item.year} className="relative mb-8 last:mb-0">
                      <div
                        className={`absolute -left-7 top-1 h-4 w-4 rounded-full border-[3px] border-white ${
                          i <= 2
                            ? "bg-primary shadow-[0_0_0_2px_theme(colors.primary)]"
                            : i <= 3
                              ? "bg-green-accent shadow-[0_0_0_2px_theme(colors.green-accent)]"
                              : "bg-yellow-400 shadow-[0_0_0_2px_theme(colors.yellow-400)]"
                        }`}
                      />
                      <p className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary mb-1">
                        {item.year}
                      </p>
                      <h3 className="text-base font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-text">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Cultura / Crenças */}
        <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="mb-12 lg:mb-16">
              <Badge variant="white" className="mb-5">
                {t("sobrePage.culture.badge")}
              </Badge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                {t("sobrePage.culture.titleBefore")}{" "}
                <span className="text-green-accent">
                  {t("sobrePage.culture.titleHighlight")}
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-xl">
                {t("sobrePage.culture.intro")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
              {beliefs.map((belief, i) => (
                <div
                  key={belief.title}
                  className="p-6 bg-white/5 border border-white/7 transition-colors hover:bg-green-accent/10"
                >
                  <span className="block text-[2.5rem] leading-none font-bold text-green-accent/20 mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-bold text-green-accent mb-2">
                    {belief.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-white/50">
                    {belief.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* MVV */}
        <section className="bg-gray-light py-20 lg:py-28">
          <Container>
            <Badge variant="green" className="mb-5">
              {t("sobrePage.mvv.badge")}
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-12">
              {t("sobrePage.mvv.title")}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white border border-gray-border p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <ShieldCheck
                  size={32}
                  className="text-primary mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary mb-3">
                  {t("sobrePage.mvv.missionLabel")}
                </h3>
                <p className="text-sm leading-relaxed text-gray-text">
                  {t("sobrePage.mvv.mission")}
                </p>
              </div>

              <div className="bg-white border border-gray-border p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-accent" />
                <Eye
                  size={32}
                  className="text-green-accent-dark mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-[10px] font-extrabold tracking-[3px] uppercase text-green-accent-dark mb-3">
                  {t("sobrePage.mvv.visionLabel")}
                </h3>
                <p className="text-sm leading-relaxed text-gray-text">
                  {t("sobrePage.mvv.vision")}
                </p>
              </div>

              <div className="bg-white border border-gray-border p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400" />
                <Star
                  size={32}
                  className="text-yellow-500 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-[10px] font-extrabold tracking-[3px] uppercase text-yellow-600 mb-3">
                  {t("sobrePage.mvv.valuesLabel")}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {values.map((v) => (
                    <span
                      key={v}
                      className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-light border border-gray-border text-gray-900"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ISO Banner */}
            <div className="mt-5 bg-dark p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <ShieldCheck size={36} className="text-green-accent" />
                <span className="text-[10px] font-extrabold tracking-[2px] uppercase text-green-accent">
                  ISO 9001:2015
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {t("sobrePage.mvv.qualityPolicyTitle")}
                </h4>
                <p className="text-xs leading-relaxed text-white/50">
                  {t("sobrePage.mvv.qualityPolicy")}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ESG */}
        <section className="bg-dark py-20 lg:py-28 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
              <div>
                <Badge variant="green" className="mb-5">
                  {t("sobrePage.esg.badge")}
                </Badge>
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  {t("sobrePage.esg.titleBefore")}{" "}
                  <span className="text-green-accent italic">
                    {t("sobrePage.esg.titleHighlight")}
                  </span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/50">
                  {t("sobrePage.esg.paragraph1")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {t("sobrePage.esg.paragraph2")}
                </p>
                <div className="mt-6 border-l-[3px] border-green-accent bg-green-accent/5 px-5 py-4 rounded-r">
                  <p className="text-sm leading-relaxed text-white/75 italic">
                    <strong className="text-green-accent not-italic">
                      {t("sobrePage.esg.calloutLabel")}
                    </strong>{" "}
                    {t("sobrePage.esg.callout")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {esgStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 bg-white/[0.03] border border-white/[0.07] border-t-[3px] border-t-green-accent hover:bg-green-accent/5 transition-colors"
                  >
                    <span className="block text-3xl font-bold text-green-accent leading-none mb-2">
                      {stat.value}
                    </span>
                    <h4 className="text-xs font-bold text-white mb-1">
                      {stat.label}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-white/35">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dutex Circular badge */}
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-green-accent/5 border border-green-accent/20 rounded-lg p-6">
              <Recycle size={40} className="text-green-accent shrink-0" />
              <div>
                <h4 className="text-base font-extrabold text-green-accent">
                  {t("sobrePage.esg.circularTitle")}
                </h4>
                <p className="text-xs text-white/45">
                  {t("sobrePage.esg.circularDescription")}
                </p>
              </div>
              <span className="sm:ml-auto shrink-0 px-3 py-1.5 bg-green-accent/10 border border-green-accent/30 rounded-full text-[10px] font-bold tracking-[1.5px] uppercase text-green-accent">
                {t("sobrePage.esg.certificationBadge")}
              </span>
            </div>

            <p className="mt-5 text-[11px] text-white/25">
              {t("sobrePage.esg.footnote")}
            </p>
          </Container>
        </section>

        {/* Mini Cases */}
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <Badge variant="green" className="mb-5">
              {t("sobrePage.cases.badge")}
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight mb-3">
              {t("sobrePage.cases.title")}
            </h2>
            <p className="text-sm text-gray-text max-w-xl mb-12 leading-relaxed">
              {t("sobrePage.cases.intro")}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c, index) => {
                const colorKey = caseColorKeys[index] ?? "primary";
                const colors = caseColors[colorKey];
                return (
                  <div
                    key={c.tag}
                    className={`bg-gray-light border border-gray-border p-8 border-t-4 ${colors.border}`}
                  >
                    <p
                      className={`text-[10px] font-extrabold tracking-[3px] uppercase mb-5 ${colors.tag}`}
                    >
                      {c.tag}
                    </p>
                    <div className="mb-4">
                      <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">
                        {t("sobrePage.cases.challengeLabel")}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-900">
                        {c.challenge}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">
                        {t("sobrePage.cases.solutionLabel")}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-900">
                        {c.solution}
                      </p>
                    </div>
                    <div className={`${colors.result} rounded-sm p-4`}>
                      <p className="text-[10px] font-bold tracking-[2px] uppercase text-white/55 mb-1">
                        {t("sobrePage.cases.resultLabel")}
                      </p>
                      <p className="text-sm leading-relaxed text-white font-medium">
                        {c.result}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-xs text-gray-text italic">
              {t("sobrePage.cases.footnote")}
            </p>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-primary py-20 lg:py-24 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge variant="white" className="mb-5">
                  {t("sobrePage.cta.badge")}
                </Badge>
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  {t("sobrePage.cta.titleLine1")}
                  <br />
                  {t("sobrePage.cta.titleLine2")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55 max-w-md">
                  {t("sobrePage.cta.description")}
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Button
                  variant="primary"
                  size="lg"
                  href={`mailto:${contactInfo.email}`}
                  className="bg-green-accent text-dark hover:bg-green-accent-dark font-extrabold"
                >
                  {t("sobrePage.cta.requestDiagnosis")}
                  <ArrowRight size={16} />
                </Button>
                <Button variant="outline" size="lg" href={whatsappUrl}>
                  {t("sobrePage.cta.talkToSales")}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
