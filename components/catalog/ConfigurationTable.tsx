import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/data";
import { localizeTerm } from "@/lib/catalog/terms";
import type { Configuration, Locale, SpecKey } from "@/lib/catalog/types";

type Column = {
  key: string;
  label: string;
  value: (item: Configuration) => string | null;
};

const SPEC_ORDER: SpecKey[] = ["diametroNominal", "resistenciaCompressao", "pesoBobina", "comprimentoBobina", "acabamento", "opcoes"];

export default async function ConfigurationTable({
  configurations,
  productName,
  locale,
}: {
  configurations: readonly Configuration[];
  productName: string;
  locale: Locale;
}) {
  const t = await getTranslations("catalog.product");

  const term = (text: string | null) => localizeTerm(text, locale);
  const weightText = (item: Configuration) => {
    if (!item.weight) return null;
    const raw = term(item.weight.raw);
    return item.weight.basis === "bobina" ? `${raw} ${t("weightBasis.bobina")}` : raw;
  };

  const candidates: Column[] = [
    ...SPEC_ORDER.filter((key) => key !== "opcoes").map((key) => ({
      key,
      label: t(`specs.${key}`),
      value: (item: Configuration) => term(item.specs[key] ?? null),
    })),
    { key: "dimensions", label: t("columns.dimensions"), value: (item) => term(item.dimensions) },
    { key: "thickness", label: t("columns.thickness"), value: (item) => term(item.thickness) },
    { key: "length", label: t("columns.length"), value: (item) => term(item.length) },
    { key: "material", label: t("columns.material"), value: (item) => term(item.material) },
    { key: "weight", label: t("columns.weight"), value: weightText },
    { key: "opcoes", label: t("specs.opcoes"), value: (item) => term(item.specs.opcoes ?? null) },
  ];
  // Só mostra colunas com algum valor; esconde as que repetem o mesmo valor em todas as linhas (vão para o rodapé).
  const filled = candidates.filter((column) => configurations.some((item) => column.value(item)));
  const constant = filled.filter((column) => {
    const values = new Set(configurations.map((item) => column.value(item)));
    return configurations.length > 1 && values.size === 1;
  });
  const columns = filled.filter((column) => !constant.includes(column));

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-border bg-white">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead className="bg-gray-light text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th scope="col" className="sticky left-0 bg-gray-light px-4 py-3 font-semibold">
                {t("columns.configuration")}
              </th>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-4 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                <span className="sr-only">{t("columns.quote")}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-border">
            {configurations.map((item) => (
              <tr key={item.id} className="hover:bg-gray-light/60">
                <th scope="row" className="sticky left-0 bg-white px-4 py-3 font-semibold text-gray-900">
                  {term(item.label)}
                </th>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-gray-text">
                    {column.value(item) ?? "-"}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      t("whatsappMessageConfig", { product: productName, configuration: term(item.label) ?? item.label }),
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="quote-configuration"
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5"
                  >
                    <MessageCircle size={14} aria-hidden />
                    {t("columns.quote")}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {constant.length > 0 && (
        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-text">
          {constant.map((column) => (
            <div key={column.key} className="flex gap-1.5">
              <dt className="font-semibold text-gray-700">{column.label}:</dt>
              <dd>{column.value(configurations[0])}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
