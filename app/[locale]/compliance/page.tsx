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
import { contactInfo } from "@/lib/data";
import { isPhoneLine, toTelHref } from "@/lib/utils";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, localizedAlternates, localizedPath } from "@/lib/seo";
import {
  Shield,
  Clock,
  Lock,
  Users,
  Phone,
  Mail,
  LayoutGrid,
  ShieldCheck,
} from "lucide-react";

const pillarIcons = [Shield, Clock, Lock, Users] as const;
const channelIcons = [Phone, Mail, LayoutGrid] as const;

type PillarItem = {
  title: string;
  description: string;
};

type ChannelItem = {
  title: string;
  lines: string[];
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
  const t = await getTranslations({ locale, namespace: "compliancePage" });
  const localeKey = (routing.locales.includes(locale as Locale)
    ? locale
    : routing.defaultLocale) as Locale;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: absoluteUrl(localizedPath(localeKey, "compliance")),
      ...localizedAlternates("compliance"),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: absoluteUrl(localizedPath(localeKey, "compliance")),
      type: "article",
      locale: localeKey === "pt" ? "pt_BR" : localeKey,
      images: [
        {
          url: absoluteUrl("/images/siderurgia.webp"),
          width: 1200,
          height: 630,
          alt: "Compliance e Integridade Dutex",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [absoluteUrl("/images/siderurgia.webp")],
    },
  };
}

export default async function CompliancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (routing.locales.includes(locale as Locale)) {
    setRequestLocale(locale);
  }

  const t = await getTranslations();

  const pillars = t.raw("compliancePage.pillars.items") as PillarItem[];
  const laws = t.raw("compliancePage.legal.laws") as string[];
  const channels = t.raw("compliancePage.legal.channels") as ChannelItem[];
  const principles = t.raw("compliancePage.principles.items") as string[];
  const faqItems = t.raw("compliancePage.faq.items") as FaqItem[];
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
        name: t("compliancePage.hero.titleHighlight"),
        item: absoluteUrl(localizedPath(localeKey, "compliance")),
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
    name: t("compliancePage.meta.title"),
    description: t("compliancePage.meta.description"),
    url: absoluteUrl(localizedPath(localeKey, "compliance")),
    inLanguage: languageTag,
    about:
      localeKey === "en"
        ? [
            "Compliance",
            "Corporate integrity",
            "Whistleblowing channel",
            "Ethical governance",
          ]
        : localeKey === "es"
          ? [
              "Compliance",
              "Integridad corporativa",
              "Canal de denuncias",
              "Gobernanza ética",
            ]
          : [
              "Compliance",
              "Integridade corporativa",
              "Canal de denúncias",
              "Governança ética",
            ],
  };

  return (
    <>
      <Header />
      <Script
        id="compliance-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="compliance-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="compliance-webpage-jsonld"
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
                  {t("compliancePage.hero.badge")}
                </Badge>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                  {t("compliancePage.hero.titleLine1")}
                  <br />
                  <span className="text-green-accent">
                    {t("compliancePage.hero.titleHighlight")}
                  </span>
                </h1>
                <p className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg max-w-xl">
                  {t("compliancePage.hero.description")}
                </p>
              </div>
              <div className="hidden lg:flex flex-col items-center gap-3 border border-green-accent/25 rounded-lg bg-primary/25 px-8 py-7 self-center justify-self-end">
                <ShieldCheck size={40} className="text-green-accent" />
                <span className="text-[10px] font-semibold tracking-[3px] uppercase text-green-accent">
                  {t("compliancePage.hero.certified")}
                </span>
                <span className="text-lg font-bold text-white tracking-wide">
                  ISO 9001:2015
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Pillar Cards */}
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <Badge variant="green" className="mb-5">
              {t("compliancePage.pillars.badge")}
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight mb-12">
              {t("compliancePage.pillars.title")}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => {
                const Icon = pillarIcons[i] ?? Shield;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white border border-gray-border border-t-[3px] border-t-primary p-7 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 group"
                  >
                    <p className="text-[10px] font-bold tracking-[3px] uppercase text-primary mb-5">
                      {t("compliancePage.pillars.counter", {
                        n: String(i + 1).padStart(2, "0"),
                      })}
                    </p>
                    <Icon
                      size={32}
                      className="text-primary mb-4"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-text">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Commitment + Channels */}
        <section className="bg-dark py-20 lg:py-28 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <Badge variant="white" className="mb-5">
                  {t("compliancePage.legal.badge")}
                </Badge>
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight mb-5">
                  {t("compliancePage.legal.titleBefore")}{" "}
                  <span className="text-green-accent">
                    {t("compliancePage.legal.titleHighlight")}
                  </span>
                </h2>
                <p className="text-sm leading-relaxed text-white/50 mb-3">
                  {t("compliancePage.legal.paragraph1")}
                </p>
                <p className="text-sm leading-relaxed text-white/50">
                  {t("compliancePage.legal.paragraph2")}
                </p>
                <div className="flex flex-wrap gap-2 mt-7">
                  {laws.map((law) => (
                    <span
                      key={law}
                      className="text-xs font-semibold px-3 py-1.5 border border-green-accent/30 text-green-accent rounded bg-green-accent/5"
                    >
                      {law}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Badge variant="white" className="mb-5">
                  {t("compliancePage.legal.channelsBadge")}
                </Badge>
                <div className="flex flex-col gap-3">
                  {channels.map((ch, i) => {
                    const Icon = channelIcons[i] ?? Phone;
                    return (
                      <div
                        key={ch.title}
                        className="flex items-start gap-4 p-5 border border-white/[0.07] border-l-[3px] border-l-green-accent bg-white/[0.03] hover:bg-green-accent/5 transition-colors"
                      >
                        <Icon
                          size={24}
                          className="text-green-accent shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">
                            {ch.title}
                          </h4>
                          {ch.lines.map((line) =>
                            line.includes("@") ? (
                              <a
                                key={line}
                                href={`mailto:${line}`}
                                className="block text-xs text-white/40 hover:text-green-accent transition-colors"
                              >
                                {line}
                              </a>
                            ) : isPhoneLine(line) ? (
                              <a
                                key={line}
                                href={toTelHref(line)}
                                className="block text-xs text-white/40 hover:text-green-accent transition-colors"
                              >
                                {line}
                              </a>
                            ) : (
                              <span
                                key={line}
                                className="block text-xs text-white/40 leading-relaxed"
                              >
                                {line}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Principles */}
        <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
          <Container className="relative z-10">
            <Badge variant="white" className="mb-5">
              {t("compliancePage.principles.badge")}
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight mb-12">
              {t("compliancePage.principles.title")}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[2px]">
              {principles.map((p, i) => (
                <div
                  key={p}
                  className="p-5 bg-white/[0.06] border border-white/[0.08] hover:bg-green-accent/10 transition-colors"
                >
                  <span className="block text-3xl font-black text-green-accent/25 leading-none mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-semibold text-white/85 leading-snug">
                    {p}
                  </h4>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-gray-light py-20 lg:py-28">
          <Container>
            <div className="bg-white border border-gray-border border-l-4 border-l-primary p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {t("compliancePage.cta.title")}
                </h3>
                <p className="text-sm text-gray-text">
                  {t("compliancePage.cta.description")}
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                href={`mailto:${contactInfo.email}`}
                className="shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-green-accent" />
                {t("compliancePage.cta.button")}
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
