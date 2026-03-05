import Badge from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  badgeText,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badgeText && (
        <Badge variant={dark ? "white" : "green"} className="mb-4">
          {badgeText}
        </Badge>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight",
          dark ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            dark ? "text-white/70" : "text-gray-text"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
