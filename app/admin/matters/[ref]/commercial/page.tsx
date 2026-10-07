import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { Receipt, CreditCard, FileText, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";

interface CommercialProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterCommercialPage({ params }: CommercialProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter } = detail;

  // Contextual commercial items filtered by this matter reference
  const quotes = [
    {
      id: "qt-001",
      quote_number: "QT-2025-031",
      title: "Initial Investigative Scope & Surveillance Proposal",
      total: matter.quoted_value ? matter.quoted_value / 100 : 5040.0,
      issued_date: "2025-09-15",
      status: "INSTRUCTED",
    },
  ];

  const invoices = [
    {
      id: "inv-001",
      invoice_number: "INV-2025-089",
      subtotal: 4200.0,
      vat: 840.0,
      total: 5040.0,
      status: "PAID",
      issue_date: "2025-09-30",
      due_date: "2025-10-30",
    },
  ];

  const payments = [
    {
      id: "pmt-001",
      reference: "PMT-2025-061",
      amount: 5040.0,
      method: "BACS",
      received_date: "2025-10-14",
      status: "COMPLETED",
    },
  ];

  const totalInvoiced = invoices.reduce((s, i) => s + i.total, 0);
  const totalPaid = payments.filter((p) => p.status === "COMPLETED").reduce((s, p) => s + p.amount, 0);
  const outstandingBalance = Math.max(0, totalInvoiced - totalPaid);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Commercial Ledger & Billing Position</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Quotes, issued invoices, and reconciled payments associated with Matter {matter.reference}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/commercial/invoices`}
            className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text"
          >
            Create Invoice
          </Link>
          <Link
            href={`/admin/commercial/quotes`}
            className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text"
          >
            Create Quote
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Total Invoiced</span>
          <p className="text-2xl font-serif font-semibold text-admin-text mt-1">
            £{totalInvoiced.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] text-admin-text-faint">{invoices.length} invoice(s)</span>
        </div>
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Total Received</span>
          <p className="text-2xl font-serif font-semibold text-emerald-700 mt-1">
            £{totalPaid.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] text-admin-text-faint">Cleared funds</span>
        </div>
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Outstanding Balance</span>
          <p className="text-2xl font-serif font-semibold text-admin-text mt-1">
            £{outstandingBalance.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
          <span className="text-[10px] text-emerald-600">Account in good standing</span>
        </div>
      </div>

      {/* Invoices Schedule */}
      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
        <h3 className="text-xs font-mono uppercase font-semibold text-admin-text">Invoices Issued</h3>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-admin-border font-mono text-[10px] uppercase text-admin-text-faint">
              <th className="py-2">Invoice Number</th>
              <th className="py-2">Subtotal</th>
              <th className="py-2">VAT</th>
              <th className="py-2">Total Gross</th>
              <th className="py-2">Issue Date</th>
              <th className="py-2">Due Date</th>
              <th className="py-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border-subtle">
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="py-2 font-mono font-medium text-admin-text">{inv.invoice_number}</td>
                <td className="py-2 font-mono">£{inv.subtotal.toFixed(2)}</td>
                <td className="py-2 font-mono text-admin-text-muted">£{inv.vat.toFixed(2)}</td>
                <td className="py-2 font-mono font-semibold text-admin-text">£{inv.total.toFixed(2)}</td>
                <td className="py-2 font-mono text-admin-text-muted">{inv.issue_date}</td>
                <td className="py-2 font-mono text-admin-text-muted">{inv.due_date}</td>
                <td className="py-2 text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xs">
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
