"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Download, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Lead = { name: string; email: string; company: string; phone: string };

type Status = "idle" | "sending" | "ready" | "pending" | "error";

const LEAD_KEY = "dutex:lead";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readLead(): Lead | null {
  try {
    const raw = window.localStorage.getItem(LEAD_KEY);
    return raw ? (JSON.parse(raw) as Lead) : null;
  } catch {
    return null;
  }
}

function saveLead(lead: Lead) {
  try {
    window.localStorage.setItem(LEAD_KEY, JSON.stringify(lead));
  } catch {
    // Armazenamento indisponível (modo privado): o formulário segue funcionando sem preencher sozinho.
  }
}

type DatasheetRequestProps = {
  productName: string;
  productSlug: string;
  /** URL do PDF quando ele existe em public/fichas-tecnicas; null enquanto a ficha não foi publicada. */
  datasheetUrl: string | null;
  /** Marca o assunto do e-mail com [PRÉVIA] (dev e prévias com CATALOG_SHOW_DRAFTS=true). */
  isPreview?: boolean;
  className?: string;
};

/**
 * Download da ficha técnica mediante cadastro rápido.
 * O pedido vai para o e-mail comercial pelo Web3Forms (mesma chave do rodapé). Com o PDF publicado,
 * o download começa após o envio; sem ele, o usuário é avisado de que a equipe enviará por e-mail.
 */
export default function DatasheetRequest({ productName, productSlug, datasheetUrl, isPreview = false, className }: DatasheetRequestProps) {
  const t = useTranslations("catalog.datasheet");
  const locale = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [lead, setLead] = useState<Lead>({ name: "", email: "", company: "", phone: "" });
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  useEffect(() => {
    const saved = readLead();
    if (saved) setLead(saved);
  }, []);

  const open = () => {
    setStatus("idle");
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const startDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `dutex-ficha-tecnica-${productSlug}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("botcheck")) return;
    if (!accessKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    saveLead(lead);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `${isPreview ? "[PRÉVIA] " : ""}${t("subject", { product: productName })}`,
          from_name: "Website Dutex",
          replyto: lead.email,
          Nome: lead.name,
          "E-mail": lead.email,
          Empresa: lead.company,
          Telefone: lead.phone || "-",
          Produto: productName,
          Pagina: window.location.href,
          Idioma: locale,
          "Ficha disponivel no site": datasheetUrl ? "sim" : "não (enviar por e-mail)",
          Consentimento: "sim",
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("web3forms");

      window.gtag?.("event", "generate_lead", { lead_type: "ficha_tecnica", product: productSlug });
      if (datasheetUrl) {
        setStatus("ready");
        startDownload(datasheetUrl);
      } else {
        setStatus("pending");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (key: keyof Lead) => ({
    id: `datasheet-${key}`,
    name: key,
    value: lead[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => setLead((current) => ({ ...current, [key]: event.target.value })),
    className:
      "w-full rounded-lg border border-gray-border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
  });

  const done = status === "ready" || status === "pending";

  return (
    <>
      <button
        type="button"
        onClick={open}
        data-track="datasheet-open"
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-semibold transition-colors",
          className,
        )}
      >
        <FileText size={18} aria-hidden />
        {t("button")}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`datasheet-title-${productSlug}`}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={`datasheet-title-${productSlug}`} className="text-xl font-bold text-gray-900">
              {t("title", { product: productName })}
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="-mr-2 -mt-1 cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-light hover:text-gray-900"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          {done ? (
            <div className="mt-6 text-center" role="status">
              <CheckCircle2 size={44} className="mx-auto text-green-accent" aria-hidden />
              <p className="mt-4 text-sm leading-relaxed text-gray-text">
                {status === "ready" ? t("successReady") : t("successPending")}
              </p>
              {status === "ready" && datasheetUrl && (
                <a
                  href={datasheetUrl}
                  download
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                >
                  <Download size={16} aria-hidden />
                  {t("download")}
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-4">
              <p className="text-sm leading-relaxed text-gray-text">{t("description")}</p>
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 sm:col-span-2" htmlFor="datasheet-name">
                  <span className="text-sm font-medium text-gray-700">{t("name")}</span>
                  <input {...field("name")} required autoComplete="name" />
                </label>
                <label className="flex flex-col gap-1.5" htmlFor="datasheet-email">
                  <span className="text-sm font-medium text-gray-700">{t("email")}</span>
                  <input {...field("email")} type="email" required autoComplete="email" />
                </label>
                <label className="flex flex-col gap-1.5" htmlFor="datasheet-company">
                  <span className="text-sm font-medium text-gray-700">{t("company")}</span>
                  <input {...field("company")} required autoComplete="organization" />
                </label>
                <label className="flex flex-col gap-1.5 sm:col-span-2" htmlFor="datasheet-phone">
                  <span className="text-sm font-medium text-gray-700">
                    {t("phone")} <span className="font-normal text-gray-400">({t("optional")})</span>
                  </span>
                  <input {...field("phone")} type="tel" autoComplete="tel" />
                </label>
              </div>
              <label className="flex items-start gap-2.5 text-sm text-gray-text">
                <input type="checkbox" required className="mt-0.5 size-4 accent-primary" />
                <span>{t("consent")}</span>
              </label>
              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {accessKey ? t("error") : t("configError")}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                data-track="datasheet-submit"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-wait disabled:opacity-70"
              >
                <Download size={16} aria-hidden />
                {status === "sending" ? t("sending") : t("submit")}
              </button>
              <p className="text-center text-xs text-gray-400">{t("privacy")}</p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
