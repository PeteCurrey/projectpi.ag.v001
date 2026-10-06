import { clsx } from "clsx";

interface AdminPageHeaderProps {
  label?: string;        // Mono eyebrow — e.g. "MAT-2501-001 / Overview"
  title: string;
  description?: string;
  actions?: React.ReactNode;
  border?: boolean;
}

export default function AdminPageHeader({
  label,
  title,
  description,
  actions,
  border = true,
}: AdminPageHeaderProps) {
  return (
    <div
      className={clsx(
        "px-6 py-4 flex items-start justify-between gap-4",
        border && "border-b border-admin-border"
      )}
    >
      <div className="min-w-0">
        {label && (
          <p className="admin-label mb-1">{label}</p>
        )}
        <h1 className="text-base font-medium text-admin-text tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-[12px] text-admin-text-muted mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          {actions}
        </div>
      )}
    </div>
  );
}
