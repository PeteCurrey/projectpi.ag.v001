import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const guarantees = [
  "Proof of service as standard",
  "Trained process servers across England & Wales",
  "Understanding of Civil Procedure Rules",
  "Rapid response to urgent instructions",
  "Multiple attempts where initial service fails",
  "Instructed by law firms and insolvency practitioners",
];

const documentTypes = [
  { title: "Court Documents", href: "/services/process-serving/court-papers" },
  { title: "Statutory Demands", href: "/services/process-serving/statutory-demand" },
  { title: "Bankruptcy Petitions", href: "/services/process-serving/bankruptcy-petition" },
  { title: "Winding-Up Petitions", href: "/services/process-serving/winding-up-petition" },
  { title: "Urgent Service", href: "/services/process-serving/urgent" },
  { title: "Difficult Subjects", href: "/services/process-serving/difficult-subject" },
];

export default function ProcessServingFeature() {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian-surface/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Editorial */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-[1px] bg-brass" />
                <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                  PROCESS SERVING DIVISION
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-warmWhite leading-[1.15]">
                When service
                <br />
                <span className="italic text-stone-light">cannot fail.</span>
              </h2>
              <p className="text-base text-stone-muted font-light leading-relaxed max-w-lg">
                Legal documents carry consequence. Statutory demands, bankruptcy petitions and court orders
                must be served correctly — procedurally and evidentially. We serve documents as if the
                matter depends on it, because it does.
              </p>
            </div>

            <ul className="space-y-3">
              {guarantees.map((item) => (
                <li key={item} className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-brass/70 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone font-light">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/services/process-serving"
                className="inline-flex items-center space-x-2 bg-warmWhite hover:bg-brass text-obsidian px-6 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-xs group"
              >
                <span>PROCESS SERVING HUB</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/confidential-enquiry"
                className="inline-flex items-center space-x-2 border border-oliveGrey hover:border-brass/60 text-stone hover:text-warmWhite px-6 py-3 text-xs tracking-widest uppercase font-light transition-all duration-300 rounded-xs"
              >
                <span>INSTRUCT US</span>
              </Link>
            </div>
          </div>

          {/* Right: Document type grid */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-stone-muted border-b border-oliveGrey/40 pb-3">
              DOCUMENTS WE SERVE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documentTypes.map((doc) => (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group p-4 border border-oliveGrey/50 hover:border-brass/40 bg-obsidian-surface/40 hover:bg-obsidian-surface/80 transition-all duration-200 rounded-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-light text-stone group-hover:text-warmWhite transition-colors">
                      {doc.title}
                    </span>
                    <ArrowRight className="w-3 h-3 text-oliveGrey group-hover:text-brass transition-colors group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-4 border border-brass/20 bg-brass/5 rounded-xs">
              <p className="text-xs text-stone-muted font-light leading-relaxed">
                <span className="text-brass font-normal">Solicitors &amp; practitioners:</span> We accept
                instructions by email and provide proof of service with each instruction. Same-day and
                urgent service available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
