"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { servicesData } from "@/lib/data/servicesData";

interface EditorialMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditorialMenu({ isOpen, onClose }: EditorialMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const servicesList = Object.values(servicesData);
  const corporateServices = servicesList.filter((s) => s.category === "CORPORATE");
  const intelligenceServices = servicesList.filter((s) => s.category === "INTELLIGENCE");
  const legalServices = servicesList.filter((s) => s.category === "LEGAL");
  const fieldServices = servicesList.filter((s) => s.category === "FIELD");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="TFTS Directory of Capabilities"
      className="fixed inset-0 z-50 bg-paper/98 backdrop-blur-xl flex flex-col justify-between overflow-y-auto border-b border-rule text-ink"
    >
      {/* Top Bar inside Menu */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between border-b border-rule">
        <div className="flex flex-col">
          <span className="text-sm tracking-[0.24em] uppercase font-[200] text-ink">
            TFTS
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase font-[300] text-ink-muted">
            Directory of Capabilities
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center space-x-2 text-ink-muted hover:text-ink transition-colors text-xs tracking-[0.2em] uppercase font-[300]"
          aria-label="Close directory"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 flex-grow">
        {/* DISCIPLINE: CORPORATE */}
        <div className="space-y-4">
          <div className="border-b border-rule pb-2">
            <h3 className="text-base font-[200] text-ink tracking-tight">
              Corporate Investigations
            </h3>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed font-[300]">
            Internal fraud, executive misconduct, procurement diversion, and commercial integrity.
          </p>
          <ul className="space-y-2 pt-2">
            {corporateServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs text-ink-muted hover:text-ink transition-colors py-0.5 font-[300]"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* DISCIPLINE: INTELLIGENCE */}
        <div className="space-y-4">
          <div className="border-b border-rule pb-2">
            <h3 className="text-base font-[200] text-ink tracking-tight">
              Strategic Intelligence
            </h3>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed font-[300]">
            Open-source intelligence, digital footprint mapping, corporate profiling, and background vetting.
          </p>
          <ul className="space-y-2 pt-2">
            {intelligenceServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs text-ink-muted hover:text-ink transition-colors py-0.5 font-[300]"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* DISCIPLINE: LEGAL & LITIGATION */}
        <div className="space-y-4">
          <div className="border-b border-rule pb-2">
            <h3 className="text-base font-[200] text-ink tracking-tight">
              Legal & Dispute Support
            </h3>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed font-[300]">
            Civil litigation evidence, witness proofs, asset tracing, and process serving under CPR.
          </p>
          <ul className="space-y-2 pt-2">
            {legalServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs text-ink-muted hover:text-ink transition-colors py-0.5 font-[300]"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services/process-serving"
                onClick={onClose}
                className="group flex items-center justify-between text-xs text-ink font-[300] hover:text-ink-muted transition-colors py-0.5"
              >
                <span>Process Serving (CPR Part 6)</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          </ul>
        </div>

        {/* DISCIPLINE: FIELD OPERATIONS */}
        <div className="space-y-4">
          <div className="border-b border-rule pb-2">
            <h3 className="text-base font-[200] text-ink tracking-tight">
              Field Operations
            </h3>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed font-[300]">
            Covert surveillance, physical trace, undercover enquiries, and evidential recording.
          </p>
          <ul className="space-y-2 pt-2">
            {fieldServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs text-ink-muted hover:text-ink transition-colors py-0.5 font-[300]"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Directory Footer */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 border-t border-rule flex flex-col md:flex-row items-baseline justify-between gap-4 text-xs font-[300] text-ink-muted">
        <div>
          TFTS Central London Operations · Mayfair, W1
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/services" onClick={onClose} className="hover:text-ink transition-colors">
            All Services Index
          </Link>
          <Link href="/professional-clients" onClick={onClose} className="hover:text-ink transition-colors">
            Professional Clients
          </Link>
          <Link href="/confidential-enquiry" onClick={onClose} className="text-ink hover:text-ink-muted transition-colors">
            Confidential Enquiry →
          </Link>
        </div>
      </div>
    </div>
  );
}
