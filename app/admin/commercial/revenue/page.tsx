import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "Revenue — Admin",
  robots: "noindex, nofollow",
};

// Monthly revenue data — invoiced (billed) vs collected (cash received)
const MONTHLY_REVENUE = [
  { month: "Jan 2025", invoiced: 12400, collected: 11200, outstanding: 1200 },
  { month: "Feb 2025", invoiced: 9800, collected: 9800, outstanding: 0 },
  { month: "Mar 2025", invoiced: 15600, collected: 14100, outstanding: 1500 },
  { month: "Apr 2025", invoiced: 11200, collected: 10800, outstanding: 400 },
  { month: "May 2025", invoiced: 18900, collected: 17200, outstanding: 1700 },
  { month: "Jun 2025", invoiced: 14300, collected: 14300, outstanding: 0 },
  { month: "Jul 2025", invoiced: 8600, collected: 7400, outstanding: 1200 },
  { month: "Aug 2025", invoiced: 11700, collected: 11700, outstanding: 0 },
  { month: "Sep 2025", invoiced: 16400, collected: 15900, outstanding: 500 },
  { month: "Oct 2025", invoiced: 9200, collected: 4200, outstanding: 5000 },
];

// Revenue by matter type
const BY_TYPE = [
  { type: "Asset Tracing", ytd: 48200, pct: 34 },
  { type: "Due Diligence", ytd: 36100, pct: 25 },
  { type: "Surveillance", ytd: 28800, pct: 20 },
  { type: "Process Serving", ytd: 14400, pct: 10 },
  { type: "Background Checks", ytd: 10200, pct: 7 },
  { type: "Other", ytd: 5900, pct: 4 },
];

function formatGBP(n: number) {
  return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 0 });
}

export default function RevenuePage() {
  const currentMonth = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1];
  const prevMonth = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 2];

  const ytdInvoiced = MONTHLY_REVENUE.reduce((s, m) => s + m.invoiced, 0);
  const ytdCollected = MONTHLY_REVENUE.reduce((s, m) => s + m.collected, 0);
  const ytdOutstanding = MONTHLY_REVENUE.reduce((s, m) => s + m.outstanding, 0);

  const momChange = currentMonth.invoiced - prevMonth.invoiced;
  const momPct = Math.round((momChange / prevMonth.invoiced) * 100);

  const maxInvoiced = Math.max(...MONTHLY_REVENUE.map((m) => m.invoiced));

  return (
    <div className="admin-page-container">
      <AdminPageHeader
        title="Revenue"
        description="Billing and collection summary — year to date"
      />

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="admin-card p-4">
          <p className="admin-label mb-1">YTD Invoiced</p>
          <p className="font-serif text-2xl admin-text font-semibold">{formatGBP(ytdInvoiced)}</p>
        </div>
        <div className="admin-card p-4">
          <p className="admin-label mb-1">YTD Collected</p>
          <p className="font-serif text-2xl admin-text font-semibold text-emerald-700">{formatGBP(ytdCollected)}</p>
        </div>
        <div className="admin-card p-4">
          <p className="admin-label mb-1">Outstanding</p>
          <p className="font-serif text-2xl admin-text font-semibold text-amber-600">{formatGBP(ytdOutstanding)}</p>
        </div>
        <div className="admin-card p-4">
          <p className="admin-label mb-1">Month on Month</p>
          <div className="flex items-center gap-2 mt-1">
            {momChange > 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            ) : momChange < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-500" />
            ) : (
              <Minus className="w-4 h-4 text-admin-text-faint" />
            )}
            <p className={`font-serif text-2xl font-semibold ${momChange > 0 ? "text-emerald-700" : momChange < 0 ? "text-red-600" : "admin-text"}`}>
              {momChange >= 0 ? "+" : ""}{momPct}%
            </p>
          </div>
          <p className="admin-text-faint text-xs mt-0.5">vs prior month</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Monthly chart (bar) */}
        <div className="col-span-2 admin-card p-5">
          <h2 className="admin-subheading mb-4">Monthly Billing vs Collection</h2>
          <div className="space-y-2">
            {MONTHLY_REVENUE.map((m) => (
              <div key={m.month} className="flex items-center gap-3 text-sm">
                <span className="admin-text-faint font-mono text-xs w-20 shrink-0">{m.month.slice(0, 8)}</span>
                <div className="flex-1 space-y-1">
                  {/* Invoiced bar */}
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 rounded-xs bg-admin-accent/70"
                      style={{ width: `${Math.round((m.invoiced / maxInvoiced) * 100)}%` }}
                    />
                    <span className="admin-text-muted font-mono text-xs">{formatGBP(m.invoiced)}</span>
                  </div>
                  {/* Collected bar */}
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 rounded-xs bg-emerald-500/70"
                      style={{ width: `${Math.round((m.collected / maxInvoiced) * 100)}%` }}
                    />
                    <span className="admin-text-faint font-mono text-xs">{formatGBP(m.collected)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-admin-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-2 rounded-xs bg-admin-accent/70" />
              <span className="admin-text-faint text-xs">Invoiced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-2 rounded-xs bg-emerald-500/70" />
              <span className="admin-text-faint text-xs">Collected</span>
            </div>
          </div>
        </div>

        {/* Revenue by type */}
        <div className="admin-card p-5">
          <h2 className="admin-subheading mb-4">Revenue by Matter Type</h2>
          <div className="space-y-3">
            {BY_TYPE.map((row) => (
              <div key={row.type}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="admin-text text-sm">{row.type}</span>
                  <span className="admin-text-muted font-mono text-xs">{formatGBP(row.ytd)}</span>
                </div>
                <div className="w-full bg-admin-border rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-admin-accent"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <p className="admin-text-faint text-xs mt-0.5 text-right">{row.pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
