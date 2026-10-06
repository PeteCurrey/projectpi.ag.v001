import { clsx } from "clsx";
import Link from "next/link";
import { AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: number | string;
  subtext?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;
    label?: string;
  };
  alert?: boolean;
  alertLabel?: string;
  href?: string;
  valueSize?: "lg" | "xl";
}

export default function MetricCard({
  label,
  value,
  subtext,
  trend,
  alert,
  alertLabel,
  href,
  valueSize = "lg",
}: MetricCardProps) {
  const content = (
    <div
      className={clsx(
        "bg-white border border-admin-border rounded-sm p-4 shadow-admin-card",
        alert && "border-l-2 border-l-red-400",
        href && "hover:shadow-admin-elevated transition-shadow"
      )}
    >
      {/* Label */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="admin-label">{label}</span>
        {alert && (
          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
        )}
      </div>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span
          className={clsx(
            "font-serif font-semibold text-admin-text leading-none tabular-nums",
            valueSize === "xl" ? "text-3xl" : "text-2xl"
          )}
        >
          {value}
        </span>

        {trend && (
          <div className="flex items-center gap-0.5 pb-0.5">
            {trend.direction === "up" && (
              <TrendingUp className="w-3 h-3 text-emerald-500" />
            )}
            {trend.direction === "down" && (
              <TrendingDown className="w-3 h-3 text-red-400" />
            )}
            <span
              className={clsx(
                "text-[10px] font-mono",
                trend.direction === "up" && "text-emerald-600",
                trend.direction === "down" && "text-red-500",
                trend.direction === "neutral" && "text-admin-text-muted"
              )}
            >
              {trend.value}
            </span>
          </div>
        )}
      </div>

      {/* Subtext / alert label */}
      {(subtext || alertLabel) && (
        <p
          className={clsx(
            "text-[11px] mt-1.5",
            alertLabel ? "text-red-500" : "text-admin-text-muted"
          )}
        >
          {alertLabel ?? subtext}
        </p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
