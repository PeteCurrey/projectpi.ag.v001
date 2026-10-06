import React from "react";

export default function EditorialStatement() {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: eyebrow */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1px] bg-brass" />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                EDITORIAL POSITION
              </span>
            </div>
          </div>

          {/* Right: statement */}
          <div className="lg:col-span-9 space-y-8">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light font-serif text-warmWhite leading-[1.3] tracking-tight">
              Some matters require more than information.
              <br />
              <span className="italic text-stone-light">
                They require someone to establish what is true.
              </span>
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="space-y-2 border-l border-oliveGrey/60 pl-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-brass">PRECISION</div>
                <p className="text-sm text-stone-muted leading-relaxed font-light">
                  Every engagement begins with a precise understanding of what you need to know, and why it matters.
                </p>
              </div>
              <div className="space-y-2 border-l border-oliveGrey/60 pl-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-brass">DISCRETION</div>
                <p className="text-sm text-stone-muted leading-relaxed font-light">
                  Sensitive matters are handled with the confidentiality they require. What you share stays within the engagement.
                </p>
              </div>
              <div className="space-y-2 border-l border-oliveGrey/60 pl-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-brass">EVIDENCE</div>
                <p className="text-sm text-stone-muted leading-relaxed font-light">
                  We produce findings that can be acted upon — in boardrooms, in proceedings, or in private decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
