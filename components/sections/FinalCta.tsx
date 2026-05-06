import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { contactInfo } from "@/lib/data";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "5547991214911";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre as soluções da Dutex.")}`;

export default function FinalCta() {
  const telHref = "tel:+554734394911";

  return (
    <section id="contato" className="bg-gray-light py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="green" className="mb-5">
            Contato
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Vamos conversar sobre o seu projeto?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-text sm:text-lg">
            Fale com a equipe comercial da Dutex para orçamentos, especificações
            técnicas ou soluções sob medida em aço e plásticos de engenharia.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden />
              WhatsApp
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-border bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition-colors hover:border-primary hover:text-primary"
            >
              <Mail size={18} strokeWidth={1.8} aria-hidden />
              E-mail comercial
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
              Voltar ao início
              <ArrowRight size={14} aria-hidden />
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
