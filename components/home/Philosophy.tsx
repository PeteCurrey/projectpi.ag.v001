import React from "react";

const principles = [
  {
    code: "I",
    title: "We do not speculate.",
    body: "Our reports contain verified findings, not conjecture. Where something cannot be confirmed, we say so.",
  },
  {
    code: "II",
    title: "We operate within the law.",
    body: "Every method is lawful. We do not obtain information through deception, interference, or methods that would compromise evidential value or our professional standing.",
  },
  {
    code: "III",
    title: "We protect what you share.",
    body: "Instructions and client information are treated as strictly confidential. We do not disclose who instructs us or the nature of any engagement.",
  },
  {
    code: "IV",
    title: "We are selective.",
    body: "We decline instructions we cannot execute properly, and we decline instructions that we consider ethically unsuitable. Selectivity protects our clients and our standing.",
  },
];

export default function Philosophy() {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1px] bg-brass" />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                OPERATIONAL PRINCIPLES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light font-serif text-warmWhite">
              How we conduct
              <br />
              <span className="italic text-stone-light">our work.</span>
            </h2>
            <p className="text-sm text-stone-muted font-light leading-relaxed">
              The following are not marketing claims. They are the operating standards by which every
              TFTS engagement is conducted.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {principles.map((p) => (
              <div key={p.code} className="space-y-3 border-t border-oliveGrey/50 pt-6">
                <div className="text-[10px] font-mono text-brass/60 tracking-ultra">{p.code}</div>
                <h3 className="text-base font-normal text-warmWhite font-serif">{p.title}</h3>
                <p className="text-sm text-stone-muted font-light leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
