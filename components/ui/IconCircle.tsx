import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  Settings,
  Leaf,
  Factory,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Settings,
  Leaf,
  Factory,
};

interface IconCircleProps {
  icon?: string;
  children?: ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export default function IconCircle({
  icon,
  children,
  className,
  size = "md",
}: IconCircleProps) {
  const Icon = icon ? iconMap[icon] : null;
  const sizeClasses = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const iconSize = size === "sm" ? 18 : 22;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-primary/10 text-primary",
        sizeClasses,
        className
      )}
    >
      {Icon ? <Icon size={iconSize} strokeWidth={1.8} /> : children}
    </div>
  );
}
