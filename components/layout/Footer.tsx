"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { footerLinkGroups } from "@/lib/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter — full width band */}
      <div className="border-b border-white/10">
        <Container>
          <div className="flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold">
                Receba nossos materiais técnicos
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                Atualizações técnicas, catálogos e conteúdos institucionais da
                Dutex enviados diretamente para seu e-mail.
              </p>
            </div>

            {subscribed ? (
              <p className="text-sm text-green-accent font-medium">
                Inscrição realizada com sucesso!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-light focus:outline-none focus:ring-1 focus:ring-primary-light"
                />
                <Button variant="primary" size="md" type="submit">
                  Inscrever-se
                </Button>
              </form>
            )}
          </div>
        </Container>
      </div>

      {/* Main footer */}
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 space-y-5">
            <a href="/" className="inline-block">
              <Image
                src="/images/logo-dutex-branco.webp"
                alt="Dutex"
                width={240}
                height={96}
                className="h-20 w-auto"
              />
            </a>
            <p className="text-sm leading-relaxed text-white/60 max-w-sm">
              Soluções industriais em aço e plásticos de engenharia para
              transformação de materiais, proteção de cargas e eficiência
              logística — da linha de produção até o destino final.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {footerLinkGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold mb-4">{group.title}</h3>
                  <ul className="space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-white/55 hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-3 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Dutex. Todos os direitos reservados.</span>
            <span>Produção industrial nacional | ISO 9001:2015</span>
            <span>Lab. 334 Marketing</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
