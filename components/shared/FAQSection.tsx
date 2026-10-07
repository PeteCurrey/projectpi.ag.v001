import React from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export default function FAQSection({
  title = "Procedural Clarifications",
  subtitle = "PRACTICE STANDARDS",
  faqs,
}: FAQSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-paper border-t border-rule text-ink">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="space-y-3">
          <span className="text-[11px] tracking-[0.22em] text-ink-muted uppercase font-[300] block">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-[200] text-ink tracking-tight">
            {title}
          </h2>
        </div>

        <div className="divide-y divide-rule border-b border-rule">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6 space-y-2">
              <h3 className="text-base sm:text-lg font-[200] text-ink">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted font-[300] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
