"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipFAQProps {
  faqs: FlagshipServiceConfig["faqs"];
}

export default function FlagshipFAQ({ faqs }: FlagshipFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Section Header */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1px] bg-brass" />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                LEGAL CLARITY · STATUTORY BOUNDARIES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] text-warmWhite">
              Frequently Asked Questions
            </h2>

            <p className="text-sm text-stone-muted font-light leading-relaxed">
              Transparent, professional answers regarding our investigative parameters, evidence standards, privacy compliance, and instruction procedures.
            </p>

            <div className="p-4 border border-oliveGrey/60 bg-obsidian-surface/40 rounded-xs text-xs font-mono text-stone-muted space-y-1">
              <div className="text-brass">STATUTORY GOVERNANCE</div>
              <p className="text-[11px] font-sans font-light leading-relaxed">
                We do not provide formal legal advice. Investigative inquiries are conducted under defined terms of reference to support decision-makers and legal advisers.
              </p>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-oliveGrey/60 bg-obsidian-surface/50 rounded-xs transition-colors"
                >
                  <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 focus:outline-hidden focus:ring-1 focus:ring-brass/40"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start space-x-3">
                      <HelpCircle className="w-4 h-4 text-brass/80 mt-1 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-[200] text-warmWhite">
                        {faq.question}
                      </h3>
                    </div>
                    <span className="p-1 rounded-xs bg-obsidian border border-oliveGrey/60 text-brass mt-0.5 flex-shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-oliveGrey/40 text-xs sm:text-sm text-stone-muted leading-relaxed font-light pl-13">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
