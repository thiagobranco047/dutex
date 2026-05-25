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
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

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
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
