import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { Brain, FilePlus, Filter } from "lucide-react";
import { formatDateTime } from "@/lib/admin/utils/dates";

export const metadata: Metadata = {
  title: "Intelligence Notes — Admin",
  robots: "noindex, nofollow",
};

const FIXTURE_INTEL_NOTES = [
  {
    id: "not-001",
    matter_ref: "MAT-2501-001",
    subject: "Arthur Pendelton",
    author: "Sarah Chen",
    category: "OSINT / CORPORATE",
    content: "Identified active business consultancy entity registered in Sharjah Free Zone listing subject as 100% beneficial owner. Registration predates departure from UK employer by 4 months.",
    date: "2025-10-05T14:15:00.000Z",
    corroboration: "CORROBORATED_OFFICIAL_REGISTRY",
  },
  {
    id: "not-002",
    matter_ref: "MAT-2501-002",
    subject: "Julian Vance",
    author: "Thomas Hardy",
    category: "FIELDWORK / RECON",
    content: "Neighbourhood reconnaissance confirmed subject vehicle (Taycan Dark Blue) parked on driveway at Ascot address between 21:00 and 06:30 on consecutive weekends.",
    date: "2025-10-06T08:00:00.000Z",
    corroboration: "OPERATIVE_EYEWITNESS",
  },
];

export default function IntelligenceNotesPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Intelligence / Notes"
        title="Field & Analytical Intelligence Log"
        description="Structured repository of verified investigative disclosures, corroboration audits, and operative observations."
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
            <FilePlus className="w-3.5 h-3.5" />
            + New Intel Note
          </button>
        }
      />

      <div className="space-y-4">
        {FIXTURE_INTEL_NOTES.map((note) => (
          <div key={note.id} className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
            <div className="flex justify-between items-start border-b border-admin-border pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-admin-accent font-medium">{note.matter_ref}</span>
                <span className="text-admin-text-faint">·</span>
                <span className="text-xs font-semibold text-admin-text">{note.subject}</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 bg-admin-surface border border-admin-border text-admin-text-secondary rounded-xs">
                  {note.category}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-admin-text-muted block">
                  {formatDateTime(note.date)}
                </span>
                <span className="text-[10px] text-admin-text-faint">Recorded by {note.author}</span>
              </div>
            </div>

            <p className="text-xs text-admin-text-secondary leading-relaxed">{note.content}</p>

            <div className="pt-2 border-t border-admin-border-subtle flex justify-between items-center text-[10px] font-mono">
              <span className="text-admin-text-faint">VERIFICATION PROTOCOL:</span>
              <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs">
                {note.corroboration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
