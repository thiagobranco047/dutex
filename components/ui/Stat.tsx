import { cn } from "@/lib/utils";

interface StatProps {
  value: string;
  label: string;
  className?: string;
}

export default function Stat({ value, label, className }: StatProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-4xl font-bold text-gray-900 sm:text-5xl">{value}</div>
      <div className="mt-1.5 text-sm text-gray-text">{label}</div>
    </div>
  );
}
