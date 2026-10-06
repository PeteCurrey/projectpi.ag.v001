import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getSubjectsByMatter } from "@/lib/admin/fixtures/subjects";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseSubjectsPage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);
  if (!detail) notFound();

  const subjects = getSubjectsByMatter(detail.matter.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Subject Dossiers</h2>
          <p className="text-xs text-admin-text-muted">Target profiles, known associates, aliases, and intelligence verification.</p>
        </div>
        <button className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
          + Link New Subject
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((sub) => (
          <div key={sub.id} className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card space-y-4">
            <div className="flex justify-between items-start border-b border-admin-border pb-3">
              <div>
                <h3 className="text-sm font-semibold text-admin-text">{sub.name}</h3>
                {sub.aliases && sub.aliases.length > 0 && (
                  <p className="text-[11px] text-admin-text-muted mt-0.5">Aliases: {sub.aliases.join(", ")}</p>
                )}
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs">
                CONFIDENCE: {sub.confidence_rating || "CONFIRMED"}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-admin-text-muted text-[11px]">Subject Role</dt>
                <dd className="font-mono text-admin-text font-medium">{sub.role}</dd>
              </div>
              <div>
                <dt className="text-admin-text-muted text-[11px]">Type</dt>
                <dd className="font-mono text-admin-text">{sub.subject_type}</dd>
              </div>
              {sub.date_of_birth && (
                <div>
                  <dt className="text-admin-text-muted text-[11px]">Date of Birth</dt>
                  <dd className="font-mono text-admin-text">{sub.date_of_birth}</dd>
                </div>
              )}
              {sub.employer && (
                <div>
                  <dt className="text-admin-text-muted text-[11px]">Employer / Business</dt>
                  <dd className="text-admin-text truncate">{sub.employer}</dd>
                </div>
              )}
            </dl>

            {sub.known_addresses && sub.known_addresses.length > 0 && (
              <div>
                <h4 className="text-[11px] font-mono uppercase text-admin-text-muted mb-1">Confirmed Locations</h4>
                <ul className="text-xs space-y-1 text-admin-text-secondary">
                  {sub.known_addresses.map((addr, idx) => (
                    <li key={idx} className="bg-admin-surface border border-admin-border px-2 py-1 rounded-xs">
                      {addr}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sub.vehicle_registrations && sub.vehicle_registrations.length > 0 && (
              <div>
                <h4 className="text-[11px] font-mono uppercase text-admin-text-muted mb-1">Associated Vehicles</h4>
                <div className="flex flex-wrap gap-1">
                  {sub.vehicle_registrations.map((v, idx) => (
                    <span key={idx} className="text-xs font-mono bg-admin-surface border border-admin-border px-2 py-0.5 rounded-xs">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sub.notes && (
              <div className="bg-amber-50/50 border border-amber-200/60 p-2.5 rounded-xs text-xs text-amber-900">
                <span className="font-semibold block mb-0.5 text-[10px] uppercase font-mono tracking-wider">Field Note:</span>
                {sub.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
