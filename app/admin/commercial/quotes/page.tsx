import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { FileText, Send, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Quotes — Admin",
  robots: "noindex, nofollow",
};

const FIXTURE_QUOTES = [
  {
    id: "qt-001",
    quote_number: "QT-2025-031",
    client: "Nexus Capital Ltd",
    contact: "J. Harrington",
    matter_type: "Asset Tracing",
    description: "Asset tracing and beneficial ownership investigation — preliminary scope",
    estimated_days: 5,
    total: 5760.0,
    issued_date: "2025-10-01",
    expiry_date: "2025-11-01",
    status: "SENT",
  },
  {
    id: "qt-002",
    quote_number: "QT-2025-032",
    client: "Hartley & Webb Solicitors",
    contact: "M. Webb",
    matter_type: "Due Diligence",
    description: "Enhanced due diligence — individual subject, 3-jurisdiction scope",
    estimated_days: 4,
    total: 3840.0,
    issued_date: "2025-10-03",
    expiry_date: "2025-11-03",
    status: "INSTRUCTED",
  },
  {
    id: "qt-003",
    quote_number: "QT-2025-033",
    client: "Meridian Insurance Group plc",
    contact: "R. Clarke",
    matter_type: "Surveillance",
    description: "Covert surveillance — 3 days, single subject, urban environment",
    estimated_days: 3,
    total: 2880.0,
    issued_date: "2025-09-25",
    expiry_date: "2025-10-25",
    status: "CANCELLED",
  },
  {
    id: "qt-004",
    quote_number: "QT-2025-034",
    client: "Beaumont Group Holdings",
    contact: "A. Beaumont",
    matter_type: "Process Serving",
    description: "Service of documents — multiple addresses, tracked attempts",
    estimated_days: 2,
    total: 780.0,
    issued_date: "2025-10-06",
    expiry_date: "2025-11-06",
    status: "DRAFT",
  },
];

export default function QuotesPage() {
  const draft = FIXTURE_QUOTES.filter((q) => q.status === "DRAFT");
  const sent = FIXTURE_QUOTES.filter((q) => q.status === "SENT");
  const accepted = FIXTURE_QUOTES.filter((q) => q.status === "INSTRUCTED");

  const totalAccepted = accepted.reduce((s, q) => s + q.total, 0);
  const totalPipeline = sent.reduce((s, q) => s + q.total, 0);

  return (
    <div className="admin-page-container">
      <AdminPageHeader
        title="Quotes"
        description="Fee proposals and engagement estimates"
      />

      {/* Summary metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="admin-label">Instructed</span>
          </div>
          <p className="font-serif text-2xl admin-text font-semibold">
            £{totalAccepted.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <p className="admin-text-muted text-xs mt-1">{accepted.length} quote{accepted.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Send className="w-4 h-4 text-blue-500" />
            <span className="admin-label">Pipeline</span>
          </div>
          <p className="font-serif text-2xl admin-text font-semibold">
            £{totalPipeline.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <p className="admin-text-muted text-xs mt-1">{sent.length} awaiting response</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-admin-text-muted" />
            <span className="admin-label">Drafts</span>
          </div>
          <p className="font-serif text-2xl admin-text font-semibold">{draft.length}</p>
          <p className="admin-text-muted text-xs mt-1">Not yet issued</p>
        </div>
      </div>

      {/* Quotes table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface">
                <th className="px-4 py-3 text-left admin-label">Quote No.</th>
                <th className="px-4 py-3 text-left admin-label">Client</th>
                <th className="px-4 py-3 text-left admin-label">Type</th>
                <th className="px-4 py-3 text-left admin-label">Description</th>
                <th className="px-4 py-3 text-right admin-label">Est. Days</th>
                <th className="px-4 py-3 text-right admin-label">Total (inc. VAT)</th>
                <th className="px-4 py-3 text-left admin-label">Issued</th>
                <th className="px-4 py-3 text-left admin-label">Expiry</th>
                <th className="px-4 py-3 text-left admin-label">Status</th>
              </tr>
            </thead>
            <tbody>
              {FIXTURE_QUOTES.map((quote) => (
                <tr key={quote.id} className="border-b border-admin-border last:border-0 hover:bg-admin-surface/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs admin-text">{quote.quote_number}</td>
                  <td className="px-4 py-3">
                    <p className="admin-text text-sm font-medium">{quote.client}</p>
                    <p className="admin-text-faint text-xs">{quote.contact}</p>
                  </td>
                  <td className="px-4 py-3 admin-text-muted text-sm">{quote.matter_type}</td>
                  <td className="px-4 py-3 admin-text-muted text-sm max-w-xs">
                    <span className="line-clamp-2">{quote.description}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm admin-text">{quote.estimated_days}d</td>
                  <td className="px-4 py-3 text-right font-mono text-sm admin-text font-semibold">
                    £{quote.total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 admin-text-muted text-sm">{quote.issued_date}</td>
                  <td className="px-4 py-3 admin-text-muted text-sm">{quote.expiry_date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={quote.status}
                      label={quote.status === "INSTRUCTED" ? "Instructed" : undefined}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
