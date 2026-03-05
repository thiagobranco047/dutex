import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-border bg-white",
        hover && "transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
