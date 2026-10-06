import { clsx } from "clsx";

// Status values to color mapping
type StatusVariant =
  | "NEW" | "OPEN" | "ACTIVE"
  | "IN_PROGRESS" | "FIELDWORK"
  | "REPORTING" | "AWAITING_CLIENT" | "AWAITING_INFORMATION" | "UNDER_REVIEW" | "QUALIFIED"
  | "COMPLETED" | "SERVED" | "CLOSED" | "INSTRUCTED"
  | "URGENT" | "CRITICAL" | "HIGH" | "TIME_SENSITIVE"
  | "STANDARD" | "ARCHIVED" | "DECLINED" | "CANCELLED"
  | "LEGAL_HOLD" | "VERIFIED" | "TAMPERED" | "DRAFT" | "APPROVED" | "ISSUED"
  | "ACTIVE" | "INACTIVE" | "PENDING";

const STATUS_STYLES: Record<StatusVariant, string> = {
  NEW:                "bg-sky-50 text-sky-700 border border-sky-100",
  OPEN:               "bg-sky-50 text-sky-700 border border-sky-100",
  ACTIVE:             "bg-sky-50 text-sky-700 border border-sky-100",
  QUALIFIED:          "bg-blue-50 text-blue-700 border border-blue-100",
  UNDER_REVIEW:       "bg-blue-50 text-blue-700 border border-blue-100",
  IN_PROGRESS:        "bg-violet-50 text-violet-700 border border-violet-100",
  FIELDWORK:          "bg-violet-50 text-violet-700 border border-violet-100",
  AWAITING_CLIENT:    "bg-amber-50 text-amber-700 border border-amber-100",
  AWAITING_INFORMATION:"bg-amber-50 text-amber-700 border border-amber-100",
  REPORTING:          "bg-blue-50 text-blue-700 border border-blue-100",
  PENDING:            "bg-amber-50 text-amber-700 border border-amber-100",
  INSTRUCTED:         "bg-emerald-50 text-emerald-700 border border-emerald-100",
  COMPLETED:          "bg-emerald-50 text-emerald-700 border border-emerald-100",
  SERVED:             "bg-emerald-50 text-emerald-700 border border-emerald-100",
  VERIFIED:           "bg-emerald-50 text-emerald-700 border border-emerald-100",
  APPROVED:           "bg-emerald-50 text-emerald-700 border border-emerald-100",
  ISSUED:             "bg-emerald-50 text-emerald-700 border border-emerald-100",
  DRAFT:              "bg-stone-100 text-stone-600 border border-stone-200",
  CLOSED:             "bg-stone-100 text-stone-500 border border-stone-200",
  ARCHIVED:           "bg-stone-100 text-stone-500 border border-stone-200",
  DECLINED:           "bg-stone-100 text-stone-500 border border-stone-200",
  CANCELLED:          "bg-stone-100 text-stone-500 border border-stone-200",
  INACTIVE:           "bg-stone-100 text-stone-500 border border-stone-200",
  URGENT:             "bg-red-50 text-red-700 border border-red-100",
  CRITICAL:           "bg-red-50 text-red-700 border border-red-100",
  TIME_SENSITIVE:     "bg-red-50 text-red-700 border border-red-100",
  HIGH:               "bg-orange-50 text-orange-700 border border-orange-100",
  STANDARD:           "bg-stone-100 text-stone-500 border border-stone-200",
  LEGAL_HOLD:         "bg-purple-50 text-purple-700 border border-purple-100",
  TAMPERED:           "bg-red-50 text-red-800 border border-red-200 font-semibold",
};

const STATUS_LABELS: Partial<Record<StatusVariant, string>> = {
  IN_PROGRESS:          "In Progress",
  AWAITING_CLIENT:      "Awaiting Client",
  AWAITING_INFORMATION: "Awaiting Info",
  TIME_SENSITIVE:       "Time Sensitive",
  UNDER_REVIEW:         "Under Review",
  LEGAL_HOLD:           "Legal Hold",
};

interface StatusBadgeProps {
  status: string;
  label?: string; // Override the display label
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const variant = status.toUpperCase() as StatusVariant;
  const styles = STATUS_STYLES[variant] ?? "bg-stone-100 text-stone-500 border border-stone-200";
  const displayLabel = label ?? STATUS_LABELS[variant] ?? status.replace(/_/g, " ");

  return (
    <span
      className={clsx(
        "inline-flex items-center px-1.5 py-0.5",
        "text-[10px] font-medium rounded-xs",
        "leading-none whitespace-nowrap",
        styles
      )}
    >
      {displayLabel}
    </span>
  );
}
