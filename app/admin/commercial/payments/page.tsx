import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { CreditCard, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Payments — Admin",
  robots: "noindex, nofollow",
};

const FIXTURE_PAYMENTS = [
  {
    id: "pmt-001",
    reference: "PMT-2025-061",
    invoice_number: "INV-2025-089",
    client: "Vance & Partners LLP",
    amount: 5040.0,
    method: "BACS",
    received_date: "2025-10-14",
    status: "COMPLETED",
    allocated_to: "MAT-2501-001",
  },
  {
    id: "pmt-002",
    reference: "PMT-2025-062",
    invoice_number: "INV-2025-092",
    client: "Beaumont Group Holdings",
    amount: 1800.0,
    method: "BACS",
    received_date: "2025-10-18",
    status: "COMPLETED",
    allocated_to: "MAT-2501-003",
  },
  {
    id: "pmt-003",
    reference: "PMT-2025-063",
    invoice_number: "INV-2025-090",
    client: "Sterling Insolvency Partners Ltd",
    amount: 1020.0,
    method: "CHAPS",
    received_date: null,
    status: "PENDING",
    allocated_to: "MAT-2501-002",
  },
  {
    id: "pmt-004",
    reference: "PMT-2025-064",
    invoice_number: "INV-2025-093",
    client: "Reynolds Family Trust",
    amount: 3360.0,
    method: "BACS",
    received_date: null,
    status: "URGENT",
    allocated_to: "MAT-2501-004",
  },
];

const METHOD_LABELS: Record<string, string> = {
  BACS: "BACS",
  CHAPS: "CHAPS",
  CARD: "Card",
  CHEQUE: "Cheque",
  TRANSFER: "Bank Transfer",
};

export default function PaymentsPage() {
  const cleared = FIXTURE_PAYMENTS.filter((p) => p.status === "COMPLETED");
  const pending = FIXTURE_PAYMENTS.filter((p) => p.status === "PENDING");
  const overdue = FIXTURE_PAYMENTS.filter((p) => p.status === "URGENT");

  const totalCleared = cleared.reduce((s, p) => s + p.amount, 0);
  const totalPending = pending.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="admin-page-container">
      <AdminPageHeader
        title="Payments"
        description="Received and outstanding payment records"
      />

      {/* Summary metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="admin-label">Cleared</span>
          </div>
          <p className="font-serif text-2xl admin-text font-semibold">
            £{totalCleared.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <p className="admin-text-muted text-xs mt-1">{cleared.length} payment{cleared.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="admin-label">Awaiting Clearance</span>
          </div>
          <p className="font-serif text-2xl admin-text font-semibold">
            £{totalPending.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <p className="admin-text-muted text-xs mt-1">{pending.length} payment{pending.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="admin-label">Overdue</span>
          </div>
          <p className="font-serif text-2xl admin-text font-semibold text-red-600">
            {overdue.length} invoice{overdue.length !== 1 ? "s" : ""}
          </p>
          <p className="admin-text-muted text-xs mt-1">Requires follow-up</p>
        </div>
      </div>

      {/* Payments table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface">
                <th className="px-4 py-3 text-left admin-label">Reference</th>
                <th className="px-4 py-3 text-left admin-label">Invoice</th>
                <th className="px-4 py-3 text-left admin-label">Client</th>
                <th className="px-4 py-3 text-left admin-label">Matter</th>
                <th className="px-4 py-3 text-left admin-label">Method</th>
                <th className="px-4 py-3 text-right admin-label">Amount</th>
                <th className="px-4 py-3 text-left admin-label">Received</th>
                <th className="px-4 py-3 text-left admin-label">Status</th>
              </tr>
            </thead>
            <tbody>
              {FIXTURE_PAYMENTS.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-admin-border last:border-0 hover:bg-admin-surface/50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs admin-text">{payment.reference}</td>
                  <td className="px-4 py-3 font-mono text-xs admin-text-muted">{payment.invoice_number}</td>
                  <td className="px-4 py-3 admin-text text-sm">{payment.client}</td>
                  <td className="px-4 py-3 font-mono text-xs admin-text-muted">{payment.allocated_to}</td>
                  <td className="px-4 py-3 admin-text-muted text-sm">
                    {METHOD_LABELS[payment.method] ?? payment.method}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm admin-text font-semibold">
                    £{payment.amount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 admin-text-muted text-sm">
                    {payment.received_date ?? (
                      <span className="admin-text-faint italic">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={payment.status}
                      label={
                        payment.status === "COMPLETED"
                          ? "Cleared"
                          : payment.status === "URGENT"
                          ? "Overdue"
                          : undefined
                      }
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
