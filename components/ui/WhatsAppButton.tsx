"use client";

const WHATSAPP_NUMBER = "5547991214911";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre as soluções da Dutex.")}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-110 hover:shadow-xl"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.129 6.744 3.047 9.381L1.054 31.2l6.023-1.937A15.89 15.89 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0Zm9.342 22.616c-.393 1.107-1.943 2.027-3.189 2.295-.852.182-1.963.326-5.705-1.227-4.787-1.986-7.867-6.836-8.107-7.152-.23-.316-1.932-2.574-1.932-4.908s1.223-3.482 1.656-3.959c.394-.434 1.049-.627 1.676-.627.199 0 .377.01.537.018.434.02.652.046 .938.725.357.852 1.227 2.994 1.336 3.213.111.219.221.514.074.83-.139.316-.264.514-.484.789-.219.275-.459.613-.656.822-.219.24-.447.5-.191.98.254.473 1.135 1.873 2.436 3.033 1.676 1.494 3.088 1.957 3.527 2.176.434.219.691.184.943-.111.262-.307 1.107-1.289 1.4-1.732.287-.434.58-.361.975-.219.398.143 2.531 1.193 2.965 1.412.434.219.723.326.832.514.107.184.107 1.078-.287 2.186v-.002Z" />
      </svg>
    </a>
  );
}
