"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Shield, Lock, FileText, Phone } from "lucide-react";
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
      aria-label="Directory and Establishment Index"
      className="fixed inset-0 z-50 bg-obsidian-pure/98 backdrop-blur-xl flex flex-col justify-between overflow-y-auto border-b border-oliveGrey text-warmWhite"
    >
      {/* Top Bar inside Menu */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between border-b border-oliveGrey/60">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
          <span className="text-xs uppercase tracking-ultra font-mono text-stone">
            TFTS · TACTICAL FIELD INTELLIGENCE SERVICE
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center space-x-2 text-stone hover:text-warmWhite transition-colors px-3 py-1.5 border border-oliveGrey rounded-xs hover:border-brass text-xs tracking-widest uppercase"
          aria-label="Close directory"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4 text-brass" />
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 flex-grow">
        {/* ROOM 01 - CORPORATE */}
        <div className="space-y-4">
          <div className="border-b border-oliveGrey/80 pb-2">
            <span className="text-[10px] uppercase font-mono tracking-ultra text-brass block">
              DISCIPLINE 01
            </span>
            <h3 className="text-lg font-light tracking-wide text-warmWhite font-serif">
              Corporate Investigations
            </h3>
          </div>
          <p className="text-xs text-stone-muted leading-relaxed">
            Investigating internal misconduct, procurement fraud, asset diversion, and commercial integrity.
          </p>
          <ul className="space-y-2.5 pt-2">
            {corporateServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs text-stone hover:text-warmWhite transition-colors py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {service.title}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-brass/40 group-hover:text-brass transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ROOM 02 - INTELLIGENCE */}
        <div className="space-y-4">
          <div className="border-b border-oliveGrey/80 pb-2">
            <span className="text-[10px] uppercase font-mono tracking-ultra text-brass block">
              DISCIPLINE 02
            </span>
            <h3 className="text-lg font-light tracking-wide text-warmWhite font-serif">
              Intelligence & OSINT
            </h3>
          </div>
          <p className="text-xs text-stone-muted leading-relaxed">
            Uncovering hidden links, digital footprints, debtor assets, and evasive subjects beyond conventional databases.
          </p>
          <ul className="space-y-2.5 pt-2">
            {intelligenceServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs text-stone hover:text-warmWhite transition-colors py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {service.title}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-brass/40 group-hover:text-brass transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ROOM 03 - LEGAL */}
        <div className="space-y-4">
          <div className="border-b border-oliveGrey/80 pb-2">
            <span className="text-[10px] uppercase font-mono tracking-ultra text-brass block">
              DISCIPLINE 03
            </span>
            <h3 className="text-lg font-light tracking-wide text-warmWhite font-serif">
              Legal & Litigation
            </h3>
          </div>
          <p className="text-xs text-stone-muted leading-relaxed">
            Evidential gathering, witness location, proofs of evidence, and trial preparation for solicitors and barristers.
          </p>
          <ul className="space-y-2.5 pt-2">
            {legalServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs text-stone hover:text-warmWhite transition-colors py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {service.title}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-brass/40 group-hover:text-brass transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ROOM 04 - FIELD */}
        <div className="space-y-4">
          <div className="border-b border-oliveGrey/80 pb-2">
            <span className="text-[10px] uppercase font-mono tracking-ultra text-brass block">
              DISCIPLINE 04
            </span>
            <h3 className="text-lg font-light tracking-wide text-warmWhite font-serif">
              Field & Surveillance
            </h3>
          </div>
          <p className="text-xs text-stone-muted leading-relaxed">
            Real-world covert mobile and static surveillance, undercover operations, and physical activity verification.
          </p>
          <ul className="space-y-2.5 pt-2">
            {fieldServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between text-xs text-stone hover:text-warmWhite transition-colors py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {service.title}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-brass/40 group-hover:text-brass transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Primary Firm Channels & Quick Access */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 border-t border-oliveGrey/60 bg-obsidian-surface/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center space-x-3 text-stone-light">
            <Lock className="w-4 h-4 text-brass" />
            <span className="text-xs tracking-wide">Strict Professional Privilege</span>
          </div>
          <div className="flex items-center space-x-3 text-stone-light">
            <Shield className="w-4 h-4 text-brass" />
            <span className="text-xs tracking-wide">BS 102000 & RIPA Compliant</span>
          </div>
          <div className="flex items-center space-x-3 text-stone-light">
            <FileText className="w-4 h-4 text-brass" />
            <span className="text-xs tracking-wide">CPR 31/32 Evidentiary Standards</span>
          </div>
          <div className="text-left md:text-right">
            <Link
              href="/confidential-enquiry"
              onClick={onClose}
              className="inline-flex items-center justify-center space-x-2 bg-brass hover:bg-brass-light text-obsidian px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-colors rounded-xs shadow-etched"
            >
              <span>Begin Confidential Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
