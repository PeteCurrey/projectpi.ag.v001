import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { formatShortDate } from "@/lib/admin/utils/dates";
import { Receipt, FileText, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Invoices — Admin",
  robots: "noindex, nofollow",
};

const FIXTURE_INVOICES = [
  {
    id: "inv-001",
    invoice_number: "INV-2025-089",
    client: "Vance & Partners LLP",
    matter_ref: "MAT-2501-001",
    subtotal: 4200.0,
    vat: 840.0,
    total: 5040.0,
    status: "PAID",
    issue_date: "2025-09-30",
    due_date: "2025-10-30",
  },
  {
    id: "inv-002",
    invoice_number: "INV-2025-090",
    client: "Sterling Insolvency Partners Ltd",
    matter_ref: "MAT-2501-002",
    subtotal: 850.0,
    vat: 170.0,
    total: 1020.0,
    status: "ISSUED",
    issue_date: "2025-10-02",
    due_date: "2025-11-01",
  },
  {
    id: "inv-003",
    invoice_number: "INV-2025-091",
    client: "Meridian Insurance Group plc",
    matter_ref: "MAT-2501-005",
    subtotal: 2800.0,
    vat: 560.0,
    total: 3360.0,
    status: "DRAFT",
    issue_date: "2025-10-06",
    due_date: "2025-11-05",
  },
];

export default function CommercialInvoicesPage() {
  const totalBilled = FIXTURE_INVOICES.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Commercial / Invoices"
        title="Invoicing & Retainer Billing"
        description="Matter disbursement reconciliation, statutory VAT billing, and client retainer ledgers."
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
            <Receipt className="w-3.5 h-3.5" />
            + Create Invoice
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Total Billed (MTD)</span>
          <div className="text-2xl font-serif font-semibold text-admin-text mt-2">
            £{totalBilled.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-admin-text-muted mt-1">Across 3 active billing instructions</p>
        </div>
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Pending Settlements</span>
          <div className="text-2xl font-serif font-semibold text-admin-text mt-2">£1,020.00</div>
          <p className="text-[11px] text-amber-600 mt-1">1 invoice awaiting transfer</p>
        </div>
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Retainer Deposits</span>
          <div className="text-2xl font-serif font-semibold text-admin-text mt-2">£8,500.00</div>
          <p className="text-[11px] text-emerald-600 mt-1">Held in segregated client account</p>
        </div>
      </div>

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
            <tr>
              <th className="p-3">Invoice Number</th>
              <th className="p-3">Client Entity</th>
              <th className="p-3">Linked Matter</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Total (inc. VAT)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Due Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border-subtle">
            {FIXTURE_INVOICES.map((inv) => (
              <tr key={inv.id} className="hover:bg-admin-surface/40 transition-colors">
                <td className="p-3 font-mono font-medium text-admin-text">{inv.invoice_number}</td>
                <td className="p-3 text-admin-text font-medium">{inv.client}</td>
                <td className="p-3 font-mono text-admin-accent">{inv.matter_ref}</td>
                <td className="p-3 font-mono">£{inv.subtotal.toFixed(2)}</td>
                <td className="p-3 font-mono font-semibold text-admin-text">£{inv.total.toFixed(2)}</td>
                <td className="p-3">
                  <StatusBadge status={inv.status} />
                </td>
                <td className="p-3 font-mono text-admin-text-muted">{formatShortDate(inv.due_date)}</td>
                <td className="p-3 text-right">
                  <button className="text-admin-text-faint hover:text-admin-text text-xs font-mono p-1">
                    <Download className="w-3.5 h-3.5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
