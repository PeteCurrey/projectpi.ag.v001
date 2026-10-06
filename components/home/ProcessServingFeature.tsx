import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Scale, FileText, CheckCircle2 } from "lucide-react";

export default function ProcessServingFeature() {
  const documents = [
    { title: "Statutory Demands", desc: "Section 268 & 123 insolvency notices", slug: "statutory-demand" },
    { title: "Court Papers & Injunctions", desc: "CPR Part 6 high court & county court claims", slug: "court-papers" },
    { title: "Bankruptcy & Winding-Up", desc: "Personal and corporate insolvency petitions", slug: "bankruptcy-petition" },
    { title: "Evasive & Difficult Subjects", desc: "Locating & serving subjects avoiding delivery", slug: "difficult-subject" },
  ];

  return (
    <section className="py-24 sm:py-32 bg-obsidian-surface/60 border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                COMMERCIAL PROCESS SERVING
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-serif text-warmWhite leading-[1.15]">
                When Service Cannot Fail
              </h2>
            </div>

            <p className="text-stone-light text-sm sm:text-base leading-relaxed font-light">
              Formal document delivery is not mere post. When matters progress to statutory demands, bankruptcy petitions, or court proceedings, procedural defects in service can invalidate the entire action.
            </p>

            <p className="text-stone-muted text-xs sm:text-sm leading-relaxed font-light">
              We provide solicitor-instructed, CPR-compliant process serving throughout England and Wales. Supported by real-time audit logs, contemporaneous witness statements, and comprehensive proof of service.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/services/process-serving"
                className="inline-flex items-center gap-3 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-8 py-4 hover:bg-brass/90 transition-colors"
              >
                PROCESS SERVING DIVISION
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/confidential-enquiry?service=process-serving"
                className="inline-flex items-center gap-2 border border-oliveGrey/80 hover:border-brass/60 text-stone-light text-xs tracking-widest uppercase px-6 py-4 transition-colors"
              >
                REQUEST AN INSTRUCTION QUOTE
              </Link>
            </div>
          </div>

          {/* Right Column Interactive Document Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <Link
                key={idx}
                href={`/services/process-serving/${doc.slug}`}
                className="p-6 bg-obsidian border border-oliveGrey/60 hover:border-brass/60 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-brass">
                    PROCEEDING 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-serif text-warmWhite group-hover:text-brass transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-stone-muted font-light leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-oliveGrey/40 flex items-center justify-between text-[10px] font-mono text-stone-muted group-hover:text-warmWhite">
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-3 h-3 text-stone-muted group-hover:text-brass transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
