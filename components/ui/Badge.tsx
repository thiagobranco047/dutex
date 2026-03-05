import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "white" | "dark";
  className?: string;
}

const variantStyles = {
  green: "bg-green-accent text-white",
  white: "bg-white/15 text-white",
  dark: "bg-gray-100 text-gray-700",
};

export default function Badge({ children, variant = "green", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
