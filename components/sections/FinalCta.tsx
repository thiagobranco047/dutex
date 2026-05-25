import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { contactInfo, WHATSAPP_NUMBER } from "@/lib/data";
import { toTelHref } from "@/lib/utils";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";

export default async function FinalCta() {
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");
  const tWhatsapp = await getTranslations("whatsapp");
  const telHref = toTelHref(contactInfo.phone);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tWhatsapp("generalMessage"))}`;

  return (
    <section id="contato" className="bg-gray-light py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="green" className="mb-5">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-text sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden />
              {tCommon("whatsapp")}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-border bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition-colors hover:border-primary hover:text-primary"
            >
              <Mail size={18} strokeWidth={1.8} aria-hidden />
              {tCommon("commercialEmail")}
            </a>
            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-border bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition-colors hover:border-primary hover:text-primary"
            >
              <Phone size={18} strokeWidth={1.8} aria-hidden />
              {contactInfo.phone}
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-text">
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
            >
              {tCommon("backToTop")}
              <ArrowRight size={14} aria-hidden />
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
