import { ShieldCheck, Scale, FileCheck, Clock, Award } from "lucide-react";
import { getVerifiedCredentials } from "@/lib/config/credentials";

export default function TrustStrip() {
  const verifiedList = getVerifiedCredentials();

  const iconMap: Record<string, typeof Scale> = {
    CPR_COMPLIANCE: Scale,
    ICO_REGISTRATION: ShieldCheck,
    PROOF_OF_SERVICE: FileCheck,
    PROFESSIONAL_INDEMNITY: Award,
    BS_102000_STANDARD: FileCheck,
  };

  const displayCredentials = [
    {
      icon: Scale,
      label: "CPR PART 6 & 31 COMPLIANT",
      sub: "Evidence structured for civil courts",
    },
    {
      icon: ShieldCheck,
      label: "ICO REGISTERED · DPA 2018",
      sub: "Strict data controller governance",
    },
    {
      icon: FileCheck,
      label: "PROOF OF SERVICE STANDARD",
      sub: "Contemporaneous audit records",
    },
    {
      icon: Clock,
      label: "TIME-CRITICAL EXECUTION",
      sub: "Same-day deployment capability",
    },
    {
      icon: Award,
      label: "PROFESSIONAL INDEMNITY INSURED",
      sub: "Comprehensive liability coverage",
    },
  ];

  return (
    <section className="bg-obsidian-surface/80 border-y border-oliveGrey/60 py-6 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayCredentials.map((cred, idx) => {
          const Icon = cred.icon;
          return (
            <div key={idx} className="flex items-start gap-3">
              <Icon className="w-4 h-4 text-brass shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] font-mono tracking-wider uppercase text-warmWhite font-medium">
                  {cred.label}
                </span>
                <span className="block text-[11px] text-stone-muted font-light leading-snug">
                  {cred.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
