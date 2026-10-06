"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldAlert, ArrowRight, Compass } from "lucide-react";
import EditorialMenu from "./EditorialMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "SERVICES", href: "/services" },
    { label: "PROCESS SERVING", href: "/services/process-serving" },
    { label: "PROFESSIONAL CLIENTS", href: "/professional-clients" },
    { label: "ABOUT", href: "/about" },
    { label: "HOW WE WORK", href: "/how-we-work" },
    { label: "INSIGHTS", href: "/insights" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-obsidian/95 backdrop-blur-md border-b border-oliveGrey/70">
        {/* Subtle Top Brass Status Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brass/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Brand Establishment Mark */}
          <Link
            href="/"
            className="group flex flex-col justify-center text-left py-1"
          >
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-brass rounded-xs group-hover:scale-125 transition-transform" />
              <span className="text-[13px] md:text-sm tracking-[0.24em] uppercase font-semibold text-warmWhite group-hover:text-brass transition-colors">
                TFTS
              </span>
            </div>
            <span className="text-[9px] md:text-[10px] tracking-[0.34em] uppercase font-mono text-stone-muted group-hover:text-stone transition-colors pl-3.5">
              TACTICAL FIELD INTELLIGENCE SERVICE
            </span>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-light tracking-[0.2em] text-stone">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? "text-warmWhite font-normal"
                      : "hover:text-warmWhite"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-brass" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Full-Screen Directory Reveal Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center space-x-2 text-stone hover:text-warmWhite transition-colors px-2.5 py-1.5 border border-oliveGrey/60 hover:border-brass/70 text-[11px] tracking-widest uppercase rounded-xs"
              title="Open full firm directory"
              aria-label="Open directory"
            >
              <Compass className="w-3.5 h-3.5 text-brass" />
              <span className="hidden sm:inline">DISCIPLINES</span>
            </button>

            {/* Primary CTA: CONFIDENTIAL ENQUIRY */}
            <Link
              href="/confidential-enquiry"
              className="relative inline-flex items-center justify-center space-x-2 bg-obsidian-surface hover:bg-brass text-warmWhite hover:text-obsidian px-3.5 md:px-5 py-2 border border-brass/60 hover:border-brass transition-all duration-300 text-[11px] md:text-xs tracking-[0.22em] uppercase font-normal rounded-xs shadow-etched group"
            >
              <span className="hidden sm:inline">CONFIDENTIAL</span>
              <span>ENQUIRY</span>
              <ArrowRight className="w-3 h-3 text-brass group-hover:text-obsidian transition-colors group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-stone hover:text-warmWhite"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-warmWhite" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Architectural Directory Reveal */}
      <EditorialMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
