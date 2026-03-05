# Dutex — Landing Page Institucional

Landing page institucional da Dutex desenvolvida com Next.js 15, TypeScript e Tailwind CSS v4.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** (ícones)
- **tailwind-merge** (classes condicionais)

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm start
```

## Estrutura

```
app/            → Páginas e layout (App Router)
components/
  ui/           → Componentes genéricos reutilizáveis
  layout/       → Header, Footer, MobileMenu
  sections/     → Seções da landing page
lib/
  data.ts       → Dados e tipos centralizados
  utils.ts      → Utilitários (cn)
public/         → Assets estáticos
```
