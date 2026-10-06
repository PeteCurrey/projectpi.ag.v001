import React from "react";

const stages = [
  {
    step: "01",
    title: "UNDERSTAND",
    description:
      "We begin by understanding what you need to know, why it matters, and what constraints — legal, ethical, operational — apply to the engagement.",
  },
  {
    step: "02",
    title: "ASSESS",
    description:
      "Before any fieldwork or research, we assess the intelligence landscape: available sources, subject profiles, risk factors and the most efficient route to verified findings.",
  },
  {
    step: "03",
    title: "ACT",
    description:
      "Investigations are conducted using approved methods. Field operations, digital research, OSINT, physical observation — each discipline deployed with precision and appropriate governance.",
  },
  {
    step: "04",
    title: "EVIDENCE",
    description:
      "Findings are documented contemporaneously. Evidence is preserved and presented in a form that is usable — in proceedings, in boardrooms, or in private decision-making.",
  },
  {
    step: "05",
    title: "REPORT",
    description:
      "Every engagement concludes with a structured report. Clear, accurate, and suitable for its intended audience — whether a solicitor, an insolvency practitioner, or a private client.",
  },
];

export default function MethodologyStages() {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1px] bg-brass" />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                HOW WE WORK
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light font-serif text-warmWhite">
              A structured approach
              <br />
              <span className="italic text-stone-light">to every matter.</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-base text-stone-muted font-light leading-relaxed max-w-2xl">
              Intelligence and investigation work is only as good as its methodology. We follow a
              consistent operational framework on every engagement — regardless of scale or complexity.
            </p>
          </div>
        </div>

        {/* Stages */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-oliveGrey/50">
          {stages.map((stage, idx) => (
            <div
              key={stage.step}
              className={`p-6 lg:p-8 space-y-4 ${
                idx < stages.length - 1 ? "border-b md:border-b-0 md:border-r border-oliveGrey/50" : ""
              } hover:bg-obsidian-surface/30 transition-colors`}
            >
              <div className="text-[10px] font-mono text-brass/50 tracking-ultra">{stage.step}</div>
              <h3 className="text-sm font-normal tracking-[0.2em] text-warmWhite uppercase">
                {stage.title}
              </h3>
              <p className="text-xs text-stone-muted leading-relaxed font-light">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
