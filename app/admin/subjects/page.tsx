import type { Metadata } from "next";
import Link from "next/link";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { FIXTURE_SUBJECTS } from "@/lib/admin/fixtures/subjects";
import { FIXTURE_CASES } from "@/lib/admin/fixtures/cases";

export const metadata: Metadata = {
  title: "Subjects — Admin",
  robots: "noindex, nofollow",
};

export default function SubjectsPage() {
  const subjects = FIXTURE_SUBJECTS;
  const caseMap = Object.fromEntries(FIXTURE_CASES.map((c) => [c.id, c.reference]));

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Work / Subjects"
        title="Subject Directory"
        description="Comprehensive index of monitored individuals, defendants, and investigative entities across active matters."
        actions={
          <button className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
            + New Subject Profile
          </button>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
            <tr>
              <th className="p-3">Subject Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Linked Matter</th>
              <th className="p-3">Confidence Rating</th>
              <th className="p-3">Confirmed Locations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border-subtle">
            {subjects.map((sub) => (
              <tr key={sub.id} className="hover:bg-admin-surface/40 transition-colors">
                <td className="p-3">
                  <div className="font-semibold text-admin-text">{sub.name}</div>
                  {sub.aliases && sub.aliases.length > 0 && (
                    <p className="text-[11px] text-admin-text-muted">aka {sub.aliases.join(", ")}</p>
                  )}
                </td>
                <td className="p-3 font-mono text-[11px] uppercase text-admin-text-secondary whitespace-nowrap">
                  {sub.role}
                </td>
                <td className="p-3 font-mono text-xs whitespace-nowrap">
                  {caseMap[sub.matter_id] ? (
                    <Link href={`/admin/cases/${caseMap[sub.matter_id]}`} className="text-admin-accent hover:underline">
                      {caseMap[sub.matter_id]}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs">
                    {sub.confidence_rating || "CONFIRMED"}
                  </span>
                </td>
                <td className="p-3 text-[11px] text-admin-text-muted max-w-xs truncate">
                  {sub.known_addresses?.join("; ") || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
