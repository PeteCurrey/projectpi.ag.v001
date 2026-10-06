"use client";

import { Bell, Search, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface QuickAction {
  label: string;
  href: string;
  description: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: "New Enquiry", href: "/admin/enquiries/new", description: "Log manual incoming intake" },
  { label: "New Matter", href: "/admin/matters/new", description: "Open a new instruction matter" },
  { label: "New Client", href: "/admin/clients/new", description: "Add a client organisation" },
  { label: "Add Evidence", href: "/admin/evidence/upload", description: "Log evidence with SHA-256 hash" },
  { label: "Create Task", href: "/admin/tasks/new", description: "Assign operational task" },
  { label: "Draft Report", href: "/admin/reports/new", description: "Initiate report draft" },
  { label: "Research Tools", href: "/admin/tools", description: "Open internal intelligence directory" },
];

interface AdminTopBarProps {
  notificationCount?: number;
}

export default function AdminTopBar({ notificationCount = 0 }: AdminTopBarProps) {
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  return (
    <div className="h-12 bg-white border-b border-admin-border flex items-center px-4 gap-4 shrink-0 z-20 relative">
      {/* Global Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-admin-text-faint" />
          <input
            type="search"
            placeholder="Search cases, clients, subjects…"
            className="w-full pl-8 pr-3 py-1.5 bg-admin-surface border border-admin-border rounded-sm text-[12px] text-admin-text placeholder:text-admin-text-faint focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent/20 transition-colors"
            // TODO: Connect to global search route handler
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 ml-auto">
        {/* Quick Actions */}
        <div className="relative">
          <button
            onClick={() => setQuickActionsOpen((v) => !v)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-white bg-admin-text rounded-sm hover:bg-admin-text/90 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>New</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {quickActionsOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setQuickActionsOpen(false)}
              />
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-admin-border rounded-sm shadow-admin-elevated z-20 py-1">
                {QUICK_ACTIONS.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    onClick={() => setQuickActionsOpen(false)}
                    className="flex flex-col px-3 py-2 hover:bg-admin-surface transition-colors"
                  >
                    <span className="text-[12px] font-medium text-admin-text">
                      {action.label}
                    </span>
                    <span className="text-[11px] text-admin-text-muted">
                      {action.description}
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <Link
          href="/admin/system/notifications"
          className="relative p-2 text-admin-text-muted hover:text-admin-text hover:bg-admin-surface rounded-sm transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
          )}
        </Link>
      </div>
    </div>
  );
}
