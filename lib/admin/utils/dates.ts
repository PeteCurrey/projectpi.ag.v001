// ============================================================
// DATE UTILITIES
// Admin OS helper functions for date/time display.
// ============================================================

/**
 * Returns a human-readable relative time string (e.g. "2 hours ago").
 * Uses native Intl.RelativeTimeFormat — no external dependencies.
 */
export function formatDistanceToNow(dateString: string | Date): string {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return rtf.format(-diffMin, "minute");
  if (diffHrs < 24) return rtf.format(-diffHrs, "hour");
  if (diffDays < 7) return rtf.format(-diffDays, "day");
  return formatShortDate(date);
}

/**
 * Returns a short formatted date (e.g. "6 Oct 2025").
 */
export function formatShortDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Returns a time string (e.g. "09:32").
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

/**
 * Returns full datetime string (e.g. "6 Oct 2025, 09:32").
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return `${formatShortDate(d)}, ${formatTime(d)}`;
}

/**
 * Returns true if the date is in the past.
 */
export function isPast(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  return d < new Date();
}

/**
 * Returns true if the date is today.
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}
