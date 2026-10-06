import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { Network, Plus, Share2, Building, Car, User, Link as LinkIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Entity Relationships — Admin",
  robots: "noindex, nofollow",
};

const RELATIONSHIP_NODES = [
  {
    entity_a: "Arthur Pendelton (Subject)",
    relation: "100% Beneficial Shareholder",
    entity_b: "Apex International Logistics FZE (Corporate Entity)",
    case_ref: "MAT-2501-001",
    confidence: "Corroborated",
    source: "Sharjah Media City Official Registry Excerpt",
  },
  {
    entity_a: "Julian Vance (Subject)",
    relation: "Sole Director & PSC",
    entity_b: "Oakwood Premier Properties Ltd (Corporate Asset)",
    case_ref: "MAT-2501-002",
    confidence: "Verified",
    source: "Companies House Filing & HMLR Title BK498112",
  },
  {
    entity_a: "Julian Vance (Subject)",
    relation: "Observed Regular Driver",
    entity_b: "Porsche Taycan Dark Blue (RO71 VNC)",
    case_ref: "MAT-2501-002",
    confidence: "Verified",
    source: "Field Operative Reconnaissance & Eyewitness Log",
  },
  {
    entity_a: "Clara Higgins (Subject)",
    relation: "Suspected Active Member",
    entity_b: "North West Powerlifting Forum ('Clara_H_98')",
    case_ref: "MAT-2501-005",
    confidence: "Possible Lead",
    source: "Facial Search & Forum Profile Discovery",
  },
];

export default function EntityRelationshipsPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Intelligence / Relationships"
        title="Entity Relationship Graph"
        description="Corroborated connections between subjects, corporate veils, nominee shareholdings, vehicles, and assets."
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
            <Plus className="w-3.5 h-3.5" />
            Add Relationship
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RELATIONSHIP_NODES.map((r, idx) => (
          <div key={idx} className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-admin-border pb-2 text-xs">
              <span className="font-mono text-admin-accent font-semibold">{r.case_ref}</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs">
                {r.confidence}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs max-w-[45%] font-medium text-admin-text">
                {r.entity_a}
              </div>
              <div className="flex flex-col items-center px-2">
                <span className="text-[10px] font-mono text-admin-accent text-center">{r.relation}</span>
                <span className="text-admin-text-faint">&rarr;</span>
              </div>
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs max-w-[45%] font-medium text-admin-text">
                {r.entity_b}
              </div>
            </div>

            <div className="text-[11px] text-admin-text-muted pt-2 border-t border-admin-border-subtle">
              <span className="font-mono text-[10px] uppercase text-admin-text-faint block">Evidence Attribution:</span>
              {r.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
