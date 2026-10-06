import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { FlaskConical, Save, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Research Workspace — Admin",
  robots: "noindex, nofollow",
};

export default function ResearchWorkspacePage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Research / Workspace"
        title="Active Intelligence Workbench"
        description="Structured OSINT research session with real-time corroboration flags and evidence capture."
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
            <Save className="w-3.5 h-3.5" />
            Save Session Findings
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card">
            <h3 className="text-xs font-mono uppercase text-admin-text-muted mb-2 tracking-wider">Investigative Hypothesis & Search Parameters</h3>
            <textarea
              className="w-full h-32 p-3 text-xs bg-admin-surface border border-admin-border rounded-xs text-admin-text focus:outline-none focus:border-admin-accent font-mono"
              placeholder="Record initial parameters, subject keywords, corporate numbers, and cross-matching requirements..."
              defaultValue="Cross-referencing overseas property holding entities linked to Arthur Pendelton (MAT-2501-001). Verification status: Corroboration required from Dubai Land Department nominee search."
            />
          </div>

          <div className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card space-y-3">
            <div className="flex justify-between items-center border-b border-admin-border pb-2">
              <h3 className="text-xs font-mono uppercase text-admin-text-muted tracking-wider">Captured Findings & Traces</h3>
              <span className="text-[10px] font-mono text-admin-accent">2 ENTITIES FLAGGED</span>
            </div>

            <div className="p-3 bg-admin-surface/50 border border-admin-border rounded-xs text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-admin-text">Apex International Logistics FZE</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xs">
                  REQUIRES CORROBORATION
                </span>
              </div>
              <p className="text-[11px] text-admin-text-muted">
                Directorship match registered under name variant A. J. Pendelton. Registered office matches known nominee corporate services provider.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card">
            <h3 className="text-xs font-mono uppercase text-admin-text-muted mb-3 tracking-wider">Classification Rule</h3>
            <div className="space-y-2 text-xs text-admin-text-secondary leading-relaxed">
              <div className="p-2 border border-admin-border rounded-xs bg-admin-surface/30">
                <span className="font-semibold block text-[11px] text-admin-text">Lead / Possible Match</span>
                Single-source identity or property connection without secondary corroboration.
              </div>
              <div className="p-2 border border-admin-border rounded-xs bg-admin-surface/30">
                <span className="font-semibold block text-[11px] text-admin-text">Requires Corroboration</span>
                Public registry match with partial identifier overlap (date of birth or past address missing).
              </div>
              <div className="p-2 border border-admin-border rounded-xs bg-emerald-50/50 border-emerald-200/50">
                <span className="font-semibold block text-[11px] text-emerald-900">Confirmed Identity</span>
                Dual-source verified match with full NI/DoB or biometric/official document match.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
