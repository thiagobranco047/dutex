"use client";

import { useState, type FormEvent } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { contactInfo } from "@/lib/data";
import { Mail, Phone, MapPin } from "lucide-react";

export default function FinalCta() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contato">
      <div className="bg-primary py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
              A Dutex entrega o material pronto.
              <br />
              E garante que ele chega inteiro.
            </h2>
            <div className="mt-8">
              <Button
                variant="outline"
                size="lg"
                href="#contato-form"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Falar com nossa equipe técnica
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <div id="contato-form" className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Entre em contato
              </h3>
              <p className="mt-3 text-base text-gray-text">
                Preencha o formulário e nossa equipe técnica entrará em contato
                em até 24 horas úteis.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-green-accent/30 bg-green-accent/5 p-8 text-center">
                  <div className="text-2xl mb-3">✓</div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Mensagem enviada!
                  </h4>
                  <p className="mt-2 text-sm text-gray-text">
                    Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <Input
                    id="name"
                    label="Nome"
                    placeholder="Seu nome completo"
                    required
                  />
                  <Input
                    id="company"
                    label="Empresa"
                    placeholder="Nome da sua empresa"
                    required
                  />
                  <Input
                    id="contact"
                    label="Contato"
                    type="email"
                    placeholder="E-mail ou telefone"
                    required
                  />
                  <Textarea
                    id="challenge"
                    label="Desafio"
                    placeholder="Descreva brevemente seu desafio ou necessidade operacional..."
                    required
                  />
                  <Button variant="primary" size="lg" type="submit" className="w-full sm:w-auto">
                    Enviar mensagem
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
                  Informações de contato
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-text">
                    <Mail size={16} className="text-primary shrink-0" />
                    {contactInfo.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-text">
                    <Phone size={16} className="text-primary shrink-0" />
                    {contactInfo.phone} | {contactInfo.whatsapp}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-text">
                    <MapPin size={16} className="text-primary shrink-0" />
                    {contactInfo.address}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-border bg-gray-light p-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
                  Canais institucionais
                </h4>
                <div className="space-y-3">
                  {contactInfo.channels.map((channel) => (
                    <div key={channel.label} className="text-sm">
                      <span className="font-semibold text-gray-700">
                        {channel.label}:
                      </span>{" "}
                      <span className="text-gray-text">{channel.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Google Maps */}
      <div className="w-full h-[400px] lg:h-[480px] relative">
        <iframe
          src="https://maps.google.com/maps?q=Dutex+Industrial,+Rua+Ladislau+Ostrowski+1502,+Garuva,+SC,+Brazil&t=m&z=15&output=embed&iwloc=B"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização Dutex Industrial"
        />
      </div>
    </section>
  );
}
