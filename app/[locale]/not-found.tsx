import { getTranslations } from "next-intl/server";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { WHATSAPP_NUMBER } from "@/lib/data";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tWhatsapp = await getTranslations("whatsapp");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tWhatsapp("generalMessage"))}`;

  return (
    <>
      <Header />
      <main>
        <section className="bg-dark pb-24 pt-40 lg:pb-32 lg:pt-48">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-accent">{t("code")}</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold text-white sm:text-5xl lg:leading-[1.1]">{t("title")}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">{t("description")}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                {t("home")}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("products")}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                <MessageCircle size={16} aria-hidden />
                {t("contact")}
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
