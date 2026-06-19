import Image from "next/image";

const LOGO_SRC = "/images/logotipo-dutex-conecta-branco.png";
const LOGO_WIDTH = 300;
const LOGO_HEIGHT = 80;

interface DutexConectaLogoProps {
  alt: string;
  className?: string;
  width?: number;
}

export default function DutexConectaLogo({
  alt,
  className = "",
  width = 260,
}: DutexConectaLogoProps) {
  const height = Math.round((width / LOGO_WIDTH) * LOGO_HEIGHT);

  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={width}
      height={height}
      className={`h-auto max-w-full ${className}`}
      priority
    />
  );
}
