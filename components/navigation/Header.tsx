"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import EditorialMenu from "./EditorialMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
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

  const isHome = pathname === "/";
  const isLightNav = !scrolled && isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          scrolled
            ? "bg-paper/96 backdrop-blur-md border-b border-rule/60"
            : isHome
            ? "bg-gradient-to-b from-black/80 via-black/25 to-transparent border-b border-transparent"
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
                isLightNav
                  ? "text-warmWhite drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  : "text-ink group-hover:text-britishGreen transition-colors duration-300"
              }`}
            >
              TFTS
            </span>
            <span
              className={`text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-[300] transition-all duration-700 overflow-hidden ${
                scrolled
                  ? "max-h-0 opacity-0"
                  : isLightNav
                  ? "max-h-6 opacity-100 text-warmWhite/75 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  : "max-h-6 opacity-100 text-ink-muted"
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
                  className={`transition-all duration-300 py-1 relative group/navlink ${
                    isLightNav
                      ? isActive
                        ? "text-warmWhite font-[400] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                        : "text-warmWhite/75 hover:text-warmWhite drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                      : isActive
                      ? "text-britishGreen"
                      : "text-ink/40 hover:text-ink"
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-300 ${
                      isActive
                        ? isLightNav
                          ? "bg-warmWhite opacity-100"
                          : "bg-britishGreen opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {/* Hover underline (non-active) */}
                  {!isActive && (
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] w-0 group-hover/navlink:w-full transition-all duration-300 ${
                        isLightNav ? "bg-warmWhite/60" : "bg-ink/30"
                      }`}
                    />
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
              className={`hidden lg:block text-[11px] font-[300] tracking-[0.2em] uppercase transition-all duration-300 relative group/dir ${
                isLightNav
                  ? "text-warmWhite/75 hover:text-warmWhite drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  : "text-ink/40 hover:text-ink"
              }`}
              aria-label="Open firm directory"
            >
              DIRECTORY
              <span
                className={`absolute bottom-0 left-0 h-[1px] w-0 group-hover/dir:w-full transition-all duration-300 ${
                  isLightNav ? "bg-warmWhite/60" : "bg-ink/30"
                }`}
              />
            </button>

            {/* Confidential enquiry — primary CTA */}
            <Link
              href="/confidential-enquiry"
              className={`hidden sm:inline-flex items-center px-4 py-2 text-[11px] tracking-[0.22em] uppercase font-[300] transition-all duration-300 rounded-none group/cta ${
                isLightNav
                  ? "border border-warmWhite/70 text-warmWhite hover:bg-warmWhite hover:text-obsidian bg-black/20 backdrop-blur-[2px] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  : "border border-britishGreen/60 text-ink hover:bg-britishGreen hover:text-paper hover:border-britishGreen"
              }`}
            >
              CONFIDENTIAL ENQUIRY
            </Link>

            {/* Mobile menu icon */}
            <button
              ref={triggerRef}
              onClick={() => setIsMenuOpen(true)}
              className={`lg:hidden p-1 transition-colors ${
                isLightNav
                  ? "text-warmWhite hover:text-warmWhite/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  : "text-ink hover:text-ink-muted"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <EditorialMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} triggerRef={triggerRef} />
    </>
  );
}
