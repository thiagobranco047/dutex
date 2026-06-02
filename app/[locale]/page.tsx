import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import IntroStats from "@/components/sections/IntroStats";
import Solutions from "@/components/sections/Solutions";
import ProtectionSystem from "@/components/sections/ProtectionSystem";
import ParallaxBreak from "@/components/sections/ParallaxBreak";
import WhyDutex from "@/components/sections/WhyDutex";
import RealApplications from "@/components/sections/RealApplications";
import Process from "@/components/sections/Process";
import FinalCta from "@/components/sections/FinalCta";
import DutexConecta from "@/components/sections/DutexConecta";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, localizedAlternates, localizedPath } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const localeKey = (routing.locales.includes(locale as Locale)
    ? locale
    : routing.defaultLocale) as Locale;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: absoluteUrl(localizedPath(localeKey)),
      ...localizedAlternates(),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: absoluteUrl(localizedPath(localeKey)),
      type: "website",
      locale: localeKey === "pt" ? "pt_BR" : localeKey,
      images: [
        {
          url: absoluteUrl("/images/industria.webp"),
          width: 1200,
          height: 630,
          alt: "Dutex - Soluções industriais",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [absoluteUrl("/images/industria.webp")],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (routing.locales.includes(locale as Locale)) {
    setRequestLocale(locale);
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <IntroStats />
        <Solutions />
        <ProtectionSystem />
        <WhyDutex />
        <ParallaxBreak />
        <RealApplications />
        <Process />
        <DutexConecta />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
