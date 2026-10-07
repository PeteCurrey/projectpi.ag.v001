"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import EditorialMenu from "./EditorialMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll-aware header state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          scrolled
            ? "bg-paper/96 backdrop-blur-md border-b border-rule/60"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 h-16 md:h-20 flex items-center justify-between">

          {/* Brand mark */}
          <Link
            href="/"
            className="group flex flex-col justify-center text-left py-1"
          >
            <span
              className={`text-sm md:text-base tracking-[0.28em] uppercase font-[200] transition-colors duration-500 ${
                scrolled ? "text-ink" : "text-ink"
              }`}
            >
              TFTS
            </span>
            <span
              className={`text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-[300] transition-all duration-700 overflow-hidden ${
                scrolled ? "max-h-0 opacity-0" : "max-h-6 opacity-100 text-ink-muted"
              }`}
            >
              Tactical Field Intelligence Service
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden lg:flex items-center space-x-10 text-[11px] font-[300] tracking-[0.2em]"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-all duration-300 py-1 relative ${
                    isActive
                      ? "text-ink"
                      : "text-ink/40 hover:text-ink"
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

          {/* Right cluster */}
          <div className="flex items-center space-x-6 md:space-x-8">
            {/* Directory — text on desktop */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hidden lg:block text-[11px] font-[300] tracking-[0.2em] uppercase text-ink/40 hover:text-ink transition-colors duration-300"
              aria-label="Open firm directory"
            >
              DIRECTORY
            </button>

            {/* Confidential enquiry — primary CTA */}
            <Link
              href="/confidential-enquiry"
              className="hidden sm:inline-flex items-center border border-ink/70 hover:border-ink px-4 py-2 text-[11px] tracking-[0.22em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-all duration-300 rounded-none"
            >
              CONFIDENTIAL ENQUIRY
            </Link>

            {/* Mobile menu icon */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-1 text-ink hover:text-ink-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <EditorialMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
