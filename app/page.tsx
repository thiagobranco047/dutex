import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import IntroStats from "@/components/sections/IntroStats";
import Solutions from "@/components/sections/Solutions";
import ParallaxBreak from "@/components/sections/ParallaxBreak";
import WhyDutex from "@/components/sections/WhyDutex";
import RealApplications from "@/components/sections/RealApplications";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FinalCta from "@/components/sections/FinalCta";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IntroStats />
        <Solutions />
        <ParallaxBreak />
        <WhyDutex />
        <RealApplications />
        <Process />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
