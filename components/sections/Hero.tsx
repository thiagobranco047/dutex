import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export default async function Hero() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center bg-dark overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-h-[125%] min-w-[125%] -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src="/videos/video-institucional-dutex.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black/55" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-accent" />
            <span className="text-sm font-medium text-white/80">
              {t("badge")}
            </span>
          </div>

          <h1 className="text-5xl font-medium leading-[1.15] text-white sm:text-6xl md:text-7xl lg:text-[5.25rem] lg:leading-[1.1]">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-10">
            <a
              href="#contato"
              className="inline-flex items-center gap-3 rounded-lg border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {tCommon("contactUs")}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
