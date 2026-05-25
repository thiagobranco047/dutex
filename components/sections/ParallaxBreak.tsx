import { getTranslations } from "next-intl/server";

export default async function ParallaxBreak() {
  const t = await getTranslations("a11y");

  return (
    <div
      className="h-[50vh] lg:h-[60vh] bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/fachada-dutex.webp')" }}
      role="img"
      aria-label={t("facade")}
    >
      <div className="h-full w-full bg-black/20" />
    </div>
  );
}
