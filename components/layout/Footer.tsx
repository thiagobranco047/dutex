"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { footerLinkConfig } from "@/lib/data";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
  const hasAccessKey = Boolean(accessKey);

  function getLinkLabel(link: (typeof footerLinkConfig)[number]["links"][number]) {
    if ("label" in link && link.label) return link.label;
    if ("labelKey" in link) {
      if (link.labelKey === "home") return tNav("home");
      if (link.labelKey === "about") return tNav("about");
      if (link.labelKey === "solutions") return tNav("solutions");
      if (link.labelKey === "applications") return tNav("applications");
      if (link.labelKey === "contact") return tNav("contact");
      return t(link.labelKey as "allSocial" | "speakSpecialist" | "complianceChannel" | "privacy");
    }
    return "";
  }

  function getGroupTitle(titleKey: string) {
    return t(titleKey as "company" | "followUs" | "contactDutex");
  }

  return (
    <footer className="bg-dark text-white">
      <div className="border-b border-white/10">
        <Container>
          <div className="flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold">{t("newsletterTitle")}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                {t("newsletterDescription")}
              </p>
            </div>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="flex flex-col gap-2 w-full max-w-md sm:flex-row sm:gap-3"
            >
              <input type="hidden" name="access_key" value={accessKey} />
              <input type="hidden" name="subject" value={t("newsletterSubject")} />
              <input type="hidden" name="from_name" value="Website Dutex" />
              <input type="checkbox" name="botcheck" className="hidden" />
              <input
                type="email"
                name="email"
                required
                placeholder={t("emailPlaceholder")}
                className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
              />
              <Button variant="primary" size="md" type="submit" disabled={!hasAccessKey}>
                {t("subscribe")}
              </Button>
              {!hasAccessKey && (
                <p className="text-xs text-red-400 sm:absolute sm:-bottom-5">
                  {t("subscribeConfigError")}
                </p>
              )}
            </form>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-dutex-branco.webp"
                alt={tCommon("brand")}
                width={240}
                height={96}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              {t("description")}
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {footerLinkConfig.map((group) => (
                <div key={group.titleKey}>
                  <h3 className="text-sm font-semibold mb-4">
                    {getGroupTitle(group.titleKey)}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.links.map((link) => {
                      const isExternal = /^https?:\/\//i.test(link.href);
                      const label = getLinkLabel(link);
                      return (
                        <li key={link.href + label}>
                          <a
                            href={link.href}
                            className="text-sm text-white/55 hover:text-white transition-colors"
                            {...(isExternal
                              ? {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                          >
                            {label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-3 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>{t("copyright")}</span>
            <span>{t("nationalProduction")}</span>
            <span>{t("credits")}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
