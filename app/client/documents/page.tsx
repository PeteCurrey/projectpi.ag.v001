import React from "react";
import { FileText, Download, Upload, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Secure Document Repository | Private Intelligence Client Portal",
  robots: "noindex, nofollow",
};

export default function ClientDocumentsPage() {
  const documents = [
    {
      ref: "MAT-2410-092",
      name: "High Court Winding-Up Petition (Sealed Copy)",
      type: "LEGAL_INSTRUMENT",
      date: "03 Oct 2024",
      size: "2.4 MB",
      hash: "8f4a...29b1",
    },
    {
      ref: "MAT-2410-092",
      name: "Pre-Service Address Verification & Subject Dossier",
      type: "INVESTIGATION_REPORT",
      date: "04 Oct 2024",
      size: "1.1 MB",
      hash: "3c7b...41e9",
    },
    {
      ref: "MAT-2410-088",
      name: "Interim Asset Recovery Analysis & Banking Affiliations",
      type: "EVIDENTIAL_DOSSIER",
      date: "01 Oct 2024",
      size: "5.8 MB",
      hash: "99ea...04bc",
    },
    {
      ref: "MAT-2410-079",
      name: "Certificate of Address Tracing (CPR 6.15 Standard)",
      type: "CERTIFICATE_OF_SERVICE",
      date: "18 Sep 2024",
      size: "620 KB",
      hash: "22fd...bb01",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-oliveGrey/70 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
            DOCUMENT VAULT
          </span>
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
            Evidential Documents & Reports
          </h1>
        </div>

        <button className="inline-flex items-center gap-2 bg-brass text-obsidian text-xs font-mono uppercase tracking-wider font-medium px-5 py-2.5 hover:bg-brass/90 transition-colors">
          <Upload className="w-3.5 h-3.5" />
          <span>UPLOAD NEW INSTRUCTION FILE</span>
        </button>
      </div>

      <div className="divide-y divide-oliveGrey/40 border border-oliveGrey/60 bg-obsidian-surface/40">
        {documents.map((doc, idx) => (
          <div
            key={idx}
            className="p-6 hover:bg-obsidian-surface/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-brass">{doc.ref}</span>
                <span className="text-stone-muted">·</span>
                <span className="text-stone-light">{doc.type}</span>
              </div>
              <h3 className="text-base font-serif text-warmWhite">
                {doc.name}
              </h3>
              <div className="flex items-center gap-4 text-xs font-mono text-stone-muted pt-1">
                <span>DATE: {doc.date}</span>
                <span>SIZE: {doc.size}</span>
                <span>SHA-256: {doc.hash}</span>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 bg-obsidian border border-oliveGrey/80 hover:border-brass text-stone-light hover:text-warmWhite text-xs font-mono uppercase px-4 py-2 transition-colors shrink-0">
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD SIGNED PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
