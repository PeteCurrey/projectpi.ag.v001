import React from "react";

export default function TrustStrip() {
  const credentials = [
    {
      label: "CPR Parts 6 & 31 Compliant",
      sub: "Evidence structured for civil court proceedings",
    },
    {
      label: "Data Protection Act 2018",
      sub: "ICO registered data controller",
    },
    {
      label: "Contemporaneous Audit Trail",
      sub: "Forensic chain of custody maintained",
    },
    {
      label: "BS 102000 Code of Practice",
      sub: "British standard for investigative services",
    },
    {
      label: "Professional Indemnity Insured",
      sub: "Full commercial liability coverage",
    },
  ];

  return (
    <section className="bg-paper-stone border-y border-rule py-8 px-6 lg:px-12 text-ink">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-xs font-[300]">
        {credentials.map((cred, idx) => (
          <div key={idx} className="space-y-1">
            <span className="block text-ink font-[300]">
              {cred.label}
            </span>
            <span className="block text-[11px] text-ink-muted leading-relaxed">
              {cred.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
