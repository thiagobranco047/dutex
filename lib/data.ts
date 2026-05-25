export const navHrefs = [
  { key: "home", href: "/#home" },
  { key: "about", href: "/#sobre" },
  { key: "solutions", href: "/#solucoes" },
  { key: "whyDutex", href: "/#diferenciais" },
  { key: "applications", href: "/#aplicacoes" },
  { key: "process", href: "/#processo" },
  { key: "contact", href: "/#contato" },
] as const;

export const solutionImages = [
  "/images/transformacao-de-aco.webp",
  "/images/plasticos-de-engenharia.webp",
  "/images/protecao-e-logistica.webp",
];

export const applicationImages = [
  "/images/siderurgia.webp",
  "/images/industria.webp",
  "/images/energia-renovavel.webp",
];

export const protectionChapterTimes = [
  { id: "00", startTime: 0 },
  { id: "01", startTime: 12 },
  { id: "02", startTime: 14 },
  { id: "03", startTime: 24 },
  { id: "04", startTime: 30 },
  { id: "05", startTime: 38 },
  { id: "06", startTime: 49 },
  { id: "07", startTime: 60 },
  { id: "08", startTime: 63 },
  { id: "09", startTime: 72 },
  { id: "10", startTime: 78 },
  { id: "11", startTime: 87 },
  { id: "12", startTime: 105 },
];

export const footerLinkConfig = [
  {
    titleKey: "company",
    links: [
      { labelKey: "home", href: "/#home" },
      { labelKey: "about", href: "/#sobre" },
      { labelKey: "solutions", href: "/#solucoes" },
      { labelKey: "applications", href: "/#aplicacoes" },
      { labelKey: "contact", href: "/#contato" },
    ],
  },
  {
    titleKey: "followUs",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/94835401" },
      { label: "Instagram", href: "https://www.instagram.com/dutex_industrial" },
      { label: "Facebook", href: "https://www.facebook.com/DutexIndustrial" },
      { labelKey: "allSocial", href: "https://linktr.ee/dutex_industrial" },
    ],
  },
  {
    titleKey: "contactDutex",
    links: [
      { labelKey: "speakSpecialist", href: "/#contato" },
      { labelKey: "complianceChannel", href: "mailto:compliance@dutex.ind.br" },
      { labelKey: "privacy", href: "mailto:privacidade@dutex.ind.br" },
    ],
  },
] as const;

export const contactInfo = {
  email: "comercial@dutex.ind.br",
  phone: "+55 (47) 3439-4911",
  whatsapp: "+55 (47) 99121-4911",
  address: "Garuva – SC",
};

/** Digits only for wa.me — already includes country code 55. Do not prepend +55 again. */
export const WHATSAPP_NUMBER = "5547991214911";
