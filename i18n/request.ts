import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

async function loadMessages(locale: Locale) {
  const [common, home, protection, sobre, compliance, conecta] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/protection.json`),
    import(`../messages/${locale}/sobre.json`),
    import(`../messages/${locale}/compliance.json`),
    import(`../messages/${locale}/conecta.json`),
  ]);

  return {
    ...common.default,
    ...home.default,
    ...protection.default,
    ...sobre.default,
    ...compliance.default,
    ...conecta.default,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await loadMessages(locale as Locale),
  };
});
