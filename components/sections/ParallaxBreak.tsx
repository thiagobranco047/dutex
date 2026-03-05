export default function ParallaxBreak() {
  return (
    <div
      className="h-[50vh] lg:h-[60vh] bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/fachada-dutex.webp')" }}
      role="img"
      aria-label="Fachada da Dutex"
    >
      <div className="h-full w-full bg-black/20" />
    </div>
  );
}
