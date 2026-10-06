import { clsx } from "clsx";

type Priority = "STANDARD" | "HIGH" | "URGENT" | "CRITICAL";

const PRIORITY_COLORS: Record<Priority, string> = {
  STANDARD: "bg-stone-300",
  HIGH:     "bg-orange-400",
  URGENT:   "bg-red-500",
  CRITICAL: "bg-red-600",
};

const PRIORITY_TEXT_COLORS: Record<Priority, string> = {
  STANDARD: "text-stone-400",
  HIGH:     "text-orange-600",
  URGENT:   "text-red-600",
  CRITICAL: "text-red-700 font-semibold",
};

interface PriorityIndicatorProps {
  priority: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function PriorityIndicator({
  priority,
  showLabel = false,
  size = "sm",
}: PriorityIndicatorProps) {
  const p = priority.toUpperCase() as Priority;
  const dot = PRIORITY_COLORS[p] ?? "bg-stone-300";
  const textColor = PRIORITY_TEXT_COLORS[p] ?? "text-stone-400";
  const dotSize = size === "md" ? "w-2 h-2" : "w-1.5 h-1.5";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={clsx("rounded-full shrink-0", dot, dotSize)}
        title={priority}
      />
      {showLabel && (
        <span className={clsx("text-[11px]", textColor)}>
          {priority.charAt(0) + priority.slice(1).toLowerCase()}
        </span>
      )}
    </span>
  );
}
