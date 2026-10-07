import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface EditorialCTAProps {
  serviceSlug: string;
  variant?: "light" | "stone" | "dark";
}

export default function EditorialCTA({
  serviceSlug,
  variant = "stone",
}: EditorialCTAProps) {
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-[#111111]" : variant === "stone" ? "bg-[#E8E5DE]" : "bg-[#F5F3EE]";
  const textClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";
  const mutedClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";

  return (
    <section className={`py-24 md:py-36 ${bgClass} border-b ${ruleClass}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl space-y-8">
          <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedClass}`}>
            CONFIDENTIAL CONSULTATION
          </span>

          <h2 className={`text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-[1.05] uppercase ${textClass}`}>
            DISCUSS THE MATTER<br />IN CONFIDENCE.
          </h2>

          <p className={`text-base sm:text-lg font-light leading-relaxed max-w-2xl ${mutedClass}`}>
            If the circumstances require investigation, intelligence or field service, tell us what you need to establish. Every inquiry is conducted under strict non-disclosure principles.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link
              href={`/confidential-enquiry?service=${encodeURIComponent(serviceSlug)}`}
              className={`inline-flex items-center space-x-3 text-xs tracking-[0.22em] uppercase font-light ${textClass} hover:text-[#A58A5C] border-b border-current hover:border-[#A58A5C] pb-1.5 transition-colors group`}
            >
              <span>DISCUSS THE MATTER CONFIDENTIALLY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className={`text-xs tracking-[0.22em] uppercase font-light ${mutedClass} hover:text-[#111111] transition-colors`}
            >
              DIRECT CONTACT &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
