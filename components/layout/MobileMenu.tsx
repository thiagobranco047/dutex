"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navHrefs } from "@/lib/data";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tA11y = useTranslations("a11y");

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-dark transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-lg font-bold text-white">{tCommon("menu")}</span>
          <button
            onClick={onClose}
            aria-label={tA11y("closeMenu")}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 mb-4">
          <LanguageSwitcher className="w-full justify-center" />
        </div>

        <nav className="flex flex-col px-6 gap-1">
          {navHrefs.map((link) => {
            if (link.key === "about") {
              return (
                <div key={link.href} className="rounded-lg bg-white/[0.04]">
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </a>
                  <div className="px-3 pb-2 flex flex-col gap-1">
                    <Link
                      href="/sobre"
                      prefetch
                      onClick={onClose}
                      className="rounded-md px-2 py-2 text-xs text-white/65 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {tCommon("aboutCompany")}
                    </Link>
                    <Link
                      href="/compliance"
                      prefetch
                      onClick={onClose}
                      className="rounded-md px-2 py-2 text-xs text-white/65 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {tCommon("compliance")}
                    </Link>
                    <Link
                      href="/dutex-conecta"
                      prefetch
                      onClick={onClose}
                      className="rounded-md px-2 py-2 text-xs text-white/65 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {tCommon("dutexConecta")}
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                {t(link.key)}
              </a>
            );
          })}
        </nav>

        <div className="px-6 mt-6">
          <Button
            variant="outline"
            size="md"
            href="/#contato"
            className="w-full justify-center"
          >
            {t("cta")}
          </Button>
        </div>
      </div>
    </>
  );
}
