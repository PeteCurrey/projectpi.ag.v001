"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
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
      <header className="fixed top-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-b border-rule transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Brand Establishment Mark */}
          <Link
            href="/"
            className="group flex flex-col justify-center text-left py-1"
          >
            <span className="text-sm md:text-base tracking-[0.24em] uppercase font-[200] text-ink group-hover:text-ink-muted transition-colors">
              TFTS
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-[300] text-ink-muted group-hover:text-ink transition-colors">
              Tactical Field Intelligence Service
            </span>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-[300] tracking-[0.18em] text-ink-muted">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive ? "text-ink" : "hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-ink" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center space-x-5 md:space-x-6">
            {/* Full-Screen Directory Reveal Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-xs font-[300] tracking-[0.18em] uppercase text-ink-muted hover:text-ink transition-colors"
              title="Open firm directory"
              aria-label="Open directory"
            >
              DIRECTORY
            </button>

            {/* Primary Action: Confidential Enquiry */}
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-1.5 border border-ink px-4 py-2 text-[11px] md:text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
            >
              <span>CONFIDENTIAL ENQUIRY</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-1 text-ink hover:text-ink-muted"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-ink" />
            </button>
          </div>
        </div>
      </header>

      {/* Architectural Directory Reveal */}
      <EditorialMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
