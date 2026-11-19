import Link from "next/link";
import "./globals.css";

// Último recurso, para endereços que não passam pelo middleware de idiomas (ex.: com ponto, como /arquivo.xyz).
// O layout raiz não tem <html>, então esta página monta o documento inteiro.
export default function RootNotFound() {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen items-center justify-center bg-dark px-6 text-center font-sans text-white antialiased">
        <main>
          <p className="text-sm font-semibold uppercase tracking-wider text-green-accent">Erro 404</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Página não encontrada</h1>
          <p className="mt-4 text-white/60">O endereço pode ter mudado ou não existe mais.</p>
          <Link href="/" className="mt-8 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark">
            Voltar ao início
          </Link>
        </main>
      </body>
    </html>
  );
}
