"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navLinks } from "@/lib/data";
import Container from "@/components/ui/Container";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/100 to-transparent"
    >
      <Container>
        <div className="flex h-32 items-center justify-between lg:h-36">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-dutex-branco.webp"
              alt="Dutex"
              width={240}
              height={96}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Nav — center */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contato"
              className="hidden lg:inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Vamos conversar!
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label="Abrir menu"
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
