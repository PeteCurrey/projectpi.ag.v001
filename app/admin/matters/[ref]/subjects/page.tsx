import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { Users, User, Shield, Phone, MapPin, Briefcase, Car } from "lucide-react";

interface SubjectsProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterSubjectsPage({ params }: SubjectsProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, subjects } = detail;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Connected Subject Profiles</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Target persons, organisations, and connected entities formally linked to this Matter.
          </p>
        </div>
        <Link
          href={`/admin/subjects`}
          className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text"
        >
          + Link / Create Subject
        </Link>
      </div>

      {subjects.length === 0 ? (
        <div className="bg-white border border-admin-border rounded-sm p-8 text-center space-y-3">
          <Users className="w-8 h-8 text-admin-text-faint mx-auto" />
          <h3 className="text-sm font-medium text-admin-text">No Subjects Linked Yet</h3>
          <p className="text-xs text-admin-text-muted max-w-md mx-auto">
            Attach primary targets, secondary witnesses, or registered legal entities to associate findings and evidence.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjects.map((sub) => {
            const ratingStyle =
              sub.confidence_rating === "HIGH"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : sub.confidence_rating === "MEDIUM"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-stone-50 text-stone-600 border-stone-200";

            return (
              <div
                key={sub.id}
                className="bg-white border border-admin-border rounded-sm p-5 shadow-admin-card space-y-4 hover:border-admin-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-admin-text">
                        {sub.name || sub.organisation || "Unidentified Subject"}
                      </h3>
                      {sub.role && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 bg-admin-surface border border-admin-border rounded-xs text-admin-text-secondary uppercase">
                          {sub.role.replace(/_/g, " ")}
                        </span>
                      )}
                    </div>
                    {sub.aliases && sub.aliases.length > 0 && (
                      <p className="text-xs text-admin-text-muted">
                        Aliases: <span className="font-mono">{sub.aliases.join(", ")}</span>
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 border rounded-xs font-semibold ${ratingStyle}`}
                  >
                    CONFIDENCE: {sub.confidence_rating || "UNVERIFIED"}
                  </span>
                </div>

                {sub.description && (
                  <p className="text-xs text-admin-text-secondary leading-relaxed bg-admin-surface/30 p-2.5 rounded-xs border border-admin-border-subtle">
                    {sub.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-admin-border">
                  {sub.known_addresses && sub.known_addresses.length > 0 && (
                    <div className="col-span-2 flex items-start gap-2 text-admin-text-secondary">
                      <MapPin className="w-3.5 h-3.5 text-admin-accent shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{sub.known_addresses[0]}</span>
                    </div>
                  )}
                  {sub.employer && (
                    <div className="flex items-center gap-2 text-admin-text-secondary">
                      <Briefcase className="w-3.5 h-3.5 text-admin-accent shrink-0" />
                      <span className="text-[11px] truncate">{sub.employer}</span>
                    </div>
                  )}
                  {sub.phone_numbers && sub.phone_numbers.length > 0 && (
                    <div className="flex items-center gap-2 text-admin-text-secondary">
                      <Phone className="w-3.5 h-3.5 text-admin-accent shrink-0" />
                      <span className="text-[11px] font-mono">{sub.phone_numbers[0]}</span>
                    </div>
                  )}
                  {sub.vehicle_registrations && sub.vehicle_registrations.length > 0 && (
                    <div className="col-span-2 flex items-center gap-2 text-admin-text-secondary">
                      <Car className="w-3.5 h-3.5 text-admin-accent shrink-0" />
                      <span className="text-[11px] font-mono">{sub.vehicle_registrations[0]}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-admin-border-subtle text-[11px] font-mono text-admin-text-faint">
                  <span>SUBJECT ID: {sub.id}</span>
                  <Link
                    href={`/admin/subjects`}
                    className="text-admin-accent hover:underline flex items-center gap-1"
                  >
                    View Global Profile →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
