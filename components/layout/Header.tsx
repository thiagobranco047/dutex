"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { navHrefs } from "@/lib/data";
import Container from "@/components/ui/Container";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tA11y = useTranslations("a11y");
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    router.prefetch("/dutex-conecta");
    router.prefetch("/sobre");
    router.prefetch("/compliance");
  }, [router]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/100 to-transparent">
      <Container>
        <div className="flex h-32 items-center justify-between lg:h-36">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-dutex-branco.webp"
              alt={tCommon("brand")}
              width={240}
              height={96}
              className="h-20 w-auto"
              priority
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            {navHrefs.map((link) => {
              if (link.key === "about") {
                return (
                  <div key={link.href} className="relative group">
                    <a
                      href={link.href}
                      className="relative inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors"
                    >
                      {t(link.key)}
                      <ChevronDown
                        size={14}
                        className="transition-transform group-hover:rotate-180"
                      />
                    </a>

                    <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="w-52 rounded-lg border border-white/15 bg-dark/95 p-1.5 backdrop-blur-md shadow-xl">
                        <Link
                          href="/sobre"
                          prefetch
                          className="block rounded-md px-3 py-2 text-[13px] text-white/75 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {tCommon("aboutCompany")}
                        </Link>
                        <Link
                          href="/compliance"
                          prefetch
                          className="block rounded-md px-3 py-2 text-[13px] text-white/75 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {tCommon("compliance")}
                        </Link>
                        <Link
                          href="/dutex-conecta"
                          prefetch
                          className="block rounded-md px-3 py-2 text-[13px] text-white/75 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {tCommon("dutexConecta")}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors"
                >
                  {t(link.key)}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:inline-flex" />

            <Link
              href="/#contato"
              className="hidden lg:inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {t("cta")}
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label={tA11y("openMenu")}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
