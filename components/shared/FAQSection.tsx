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
  title = "Frequently Asked Questions",
  subtitle = "PROCEDURAL & OPERATIONAL CLARITY",
  faqs,
}: FAQSectionProps) {
  return (
    <section className="py-20 bg-obsidian-surface/40 border-t border-oliveGrey/60">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-ultra text-brass uppercase block">
            {subtitle}
          </span>
          <h2 className="text-2xl sm:text-4xl font-light font-serif text-warmWhite">
            {title}
          </h2>
        </div>

        <div className="space-y-6 divide-y divide-oliveGrey/50">
          {faqs.map((faq, index) => (
            <div key={index} className="pt-6 first:pt-0 space-y-2.5">
              <h3 className="text-base sm:text-lg font-normal text-warmWhite font-serif">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-stone-light font-light leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
