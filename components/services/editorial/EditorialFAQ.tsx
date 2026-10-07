"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface EditorialFAQProps {
  faqs: FlagshipServiceConfig["faqs"];
  variant?: "light" | "stone" | "dark";
}

export default function EditorialFAQ({
  faqs,
  variant = "light",
}: EditorialFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left Column: Heading */}
      <div className="lg:col-span-4 space-y-4">
        <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedTextClass}`}>
          CLARITY · PARAMETERS
        </span>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] ${headingTextClass}`}>
          Frequently Asked Questions
        </h2>
        <p className={`text-sm font-light leading-relaxed ${mutedTextClass}`}>
          Clear parameters regarding instructions, evidence handling, privacy compliance, and terms of reference.
        </p>
      </div>

      {/* Right Column: Clean Accordion with Horizontal Rules (Rule 17) */}
      <div className={`lg:col-span-8 border-t ${ruleClass}`}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`border-b ${ruleClass}`}>
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full py-6 text-left flex items-start justify-between gap-6 focus:outline-hidden group"
                aria-expanded={isOpen}
              >
                <span className={`text-lg sm:text-xl font-light ${headingTextClass} group-hover:text-[#A58A5C] transition-colors leading-snug`}>
                  {faq.question}
                </span>
                <span className="text-[#A58A5C] mt-1 flex-shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="pb-6 pt-1 text-sm sm:text-base font-light leading-relaxed text-[#6F706A] max-w-2xl">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
