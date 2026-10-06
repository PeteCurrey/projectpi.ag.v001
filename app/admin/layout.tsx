import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Inbox,
  Users,
  FolderKanban,
  FileText,
  Lock,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminLinks = [
    { label: "TRIAGE INBOX", href: "/admin", icon: Inbox },
    { label: "ALL ENQUIRIES", href: "/admin/enquiries", icon: FileText },
  ];

  return (
    <div className="bg-obsidian min-h-screen text-warmWhite flex flex-col pt-16 md:pt-20">
      {/* Admin Nav Bar */}
      <div className="bg-obsidian-surface border-b border-red-950/80 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-amber-400 bg-amber-950/40 px-2 py-0.5 border border-amber-800 shrink-0">
              INTERNAL DIRECTORS CONSOLE
            </span>
            <div className="flex items-center space-x-4">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center space-x-1.5 text-[11px] font-mono tracking-wider uppercase text-stone-muted hover:text-warmWhite transition-colors py-2"
                  >
                    <Icon className="w-3.5 h-3.5 text-brass" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-stone-muted">
            <span className="hidden sm:inline">OFFICER: D. MERCER</span>
            <Link
              href="/"
              className="text-stone hover:text-warmWhite transition-colors"
              title="Exit Admin"
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
