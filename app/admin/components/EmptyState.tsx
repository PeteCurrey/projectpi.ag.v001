import { clsx } from "clsx";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  compact?: boolean;
}

export default function EmptyState({
  title,
  description,
  action,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center",
        compact ? "py-8 px-4" : "py-16 px-6"
      )}
    >
      <div
        className={clsx(
          "w-px bg-admin-border mx-auto",
          compact ? "h-8 mb-4" : "h-12 mb-6"
        )}
      />
      <p
        className={clsx(
          "font-medium text-admin-text-secondary",
          compact ? "text-[12px]" : "text-sm"
        )}
      >
        {title}
      </p>
      {description && (
        <p
          className={clsx(
            "text-admin-text-muted mt-1 max-w-xs leading-snug",
            compact ? "text-[11px]" : "text-[12px]"
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
