import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import { routing, type Locale } from "@/i18n/routing";
import {
  SITE_URL,
  absoluteUrl,
  GOOGLE_SITE_VERIFICATION,
  GA_MEASUREMENT_ID,
} from "@/lib/seo";
import { contactInfo, WHATSAPP_NUMBER } from "@/lib/data";
import { toTelHref } from "@/lib/utils";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: absoluteUrl("/"),
      siteName: "Dutex",
      type: "website",
      locale: locale === "pt" ? "pt_BR" : locale,
      images: [
        {
          url: absoluteUrl("/images/industria.webp"),
          width: 1200,
          height: 630,
          alt: "Dutex Industrial",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [absoluteUrl("/images/industria.webp")],
    },
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const htmlLang = locale === "pt" ? "pt-BR" : locale;
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dutex Industrial",
    url: SITE_URL,
    logo: absoluteUrl("/images/logo-dutex-branco.webp"),
    email: "comercial@dutex.ind.br",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Garuva",
      addressRegion: "SC",
      addressCountry: "BR",
    },
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dutex",
    url: SITE_URL,
    inLanguage: ["pt-BR", "en", "es"],
  };
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dutex Industrial",
    url: SITE_URL,
    image: absoluteUrl("/images/industria.webp"),
    logo: absoluteUrl("/images/logo-dutex-branco.webp"),
    email: contactInfo.email,
    telephone: toTelHref(contactInfo.phone).replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Garuva",
      addressRegion: "SC",
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    sameAs: [
      "https://www.linkedin.com/company/94835401",
      "https://www.instagram.com/dutex_industrial",
      "https://www.facebook.com/DutexIndustrial",
      "https://linktr.ee/dutex_industrial",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactInfo.email,
        telephone: toTelHref(contactInfo.phone).replace("tel:", ""),
        availableLanguage: ["pt-BR", "en", "es"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${WHATSAPP_NUMBER}`,
        availableLanguage: ["pt-BR", "en", "es"],
      },
      {
        "@type": "ContactPoint",
        contactType: "compliance",
        email: "compliance@dutex.com.br",
        telephone: "+5547991689143",
        availableLanguage: ["pt-BR", "en", "es"],
      },
    ],
  };

  return (
    <html lang={htmlLang} className={inter.variable} suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <Script
            id="organization-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <Script
            id="website-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <Script
            id="localbusiness-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
          />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
          <SmoothScroll />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
