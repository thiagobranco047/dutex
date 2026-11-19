import { notFound } from "next/navigation";

// Qualquer endereço sem rota dentro de um idioma cai aqui e mostra app/[locale]/not-found.tsx,
// que roda dentro do layout do idioma (com <html>, cabeçalho e traduções).
export default function CatchAllPage() {
  notFound();
}
