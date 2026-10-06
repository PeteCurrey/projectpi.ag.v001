import React from "react";
import Link from "next/link";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  ShieldAlert,
  User,
  LogOut,
  Compass,
} from "lucide-react";

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const portalLinks = [
    { label: "OVERVIEW", href: "/client", icon: Compass },
    { label: "MATTERS", href: "/client/matters", icon: FolderKanban },
    { label: "DOCUMENTS", href: "/client/documents", icon: FileText },
    { label: "MESSAGES", href: "/client/messages", icon: MessageSquare },
    { label: "SECURITY & ACCOUNT", href: "/client/account", icon: User },
  ];

  return (
    <div className="bg-obsidian min-h-screen text-warmWhite flex flex-col pt-16 md:pt-20">
      {/* Client Portal Navigation Bar */}
      <div className="bg-obsidian-surface border-b border-oliveGrey/70 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-6 overflow-x-auto">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass bg-brass/10 px-2 py-0.5 border border-brass/30 shrink-0">
              CLIENT PORTAL
            </span>
            <div className="flex items-center space-x-4">
              {portalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center space-x-1.5 text-[11px] font-mono tracking-wider uppercase text-stone-muted hover:text-warmWhite transition-colors py-2 shrink-0"
                  >
                    <Icon className="w-3.5 h-3.5 text-brass" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-stone-muted">
            <span className="hidden sm:inline">VANCE & PARTNERS LLP</span>
            <Link
              href="/"
              className="text-stone hover:text-warmWhite transition-colors"
              title="Exit Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
}
