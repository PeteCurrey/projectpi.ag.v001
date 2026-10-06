"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Building2,
  FolderOpen,
  UserSearch,
  ListTodo,
  ShieldCheck,
  FileText,
  FileBarChart,
  Globe,
  FlaskConical,
  Bookmark,
  Database,
  ExternalLink,
  LayoutTemplate,
  Layers,
  BookOpen,
  HelpCircle,
  BookText,
  ImageIcon,
  SearchIcon,
  Receipt,
  CreditCard,
  BarChart3,
  Stamp,
  Eye,
  MapPin,
  ClipboardList,
  Clock,
  Brain,
  GitBranch,
  Network,
  Car,
  Building,
  Share2,
  Bell,
  ScrollText,
  Users,
  Lock,
  Plug,
  ArchiveRestore,
  Settings2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Operations",
    defaultOpen: true,
    items: [
      { label: "Command Centre", href: "/admin", icon: LayoutDashboard },
      { label: "Enquiry Triage", href: "/admin/enquiries", icon: TrendingUp },
      { label: "Matters", href: "/admin/matters", icon: FolderOpen },
      { label: "Assignments", href: "/admin/assignments", icon: ClipboardList },
      { label: "Tasks", href: "/admin/tasks", icon: ListTodo },
      { label: "Process Serving", href: "/admin/process-serving", icon: Stamp },
    ],
  },
  {
    label: "Casework",
    defaultOpen: true,
    items: [
      { label: "Evidence", href: "/admin/evidence", icon: ShieldCheck },
      { label: "Reports", href: "/admin/reports", icon: FileBarChart },
      { label: "Documents", href: "/admin/documents", icon: FileText },
      { label: "Messages", href: "/admin/messages", icon: Brain },
    ],
  },
  {
    label: "Business",
    defaultOpen: true,
    items: [
      { label: "Clients", href: "/admin/clients", icon: Building2 },
      { label: "Billing", href: "/admin/billing", icon: Receipt },
    ],
  },
  {
    label: "Intelligence",
    defaultOpen: true,
    items: [
      { label: "Research Tools", href: "/admin/tools", icon: Globe },
    ],
  },
  {
    label: "Administration",
    defaultOpen: false,
    items: [
      { label: "Users & Team", href: "/admin/users", icon: Users },
      { label: "Audit Log", href: "/admin/audit", icon: ScrollText },
      { label: "Firm Settings", href: "/admin/settings", icon: Settings2 },
    ],
  },
];

function NavGroupSection({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const [open, setOpen] = useState(group.defaultOpen ?? false);
  const hasActive = group.items.some(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin" && pathname.startsWith(item.href))
  );

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "w-full flex items-center justify-between px-3 py-1.5 mb-0.5",
          "transition-colors"
        )}
      >
        <span className="admin-section-label">{group.label}</span>
        {open ? (
          <ChevronDown className="w-3 h-3 text-admin-text-faint shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 text-admin-text-faint shrink-0" />
        )}
      </button>

      {open && (
        <ul className="mb-2">
          {group.items.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2.5 px-3 py-1.5 rounded-sm mx-1 transition-colors text-[12px]",
                    isActive
                      ? "bg-admin-active text-admin-text font-medium"
                      : "text-admin-text-secondary hover:bg-admin-hover hover:text-admin-text"
                  )}
                >
                  <Icon
                    className={clsx(
                      "w-3.5 h-3.5 shrink-0",
                      isActive ? "text-admin-accent" : "text-admin-text-faint"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-auto bg-admin-accent text-white text-[9px] font-mono px-1.5 py-0.5 rounded-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[256px] shrink-0 bg-admin-sidebar border-r border-admin-border flex flex-col h-full">
      {/* Logo / Branding */}
      <div className="px-4 py-4 border-b border-admin-border shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-admin-text rounded-xs flex items-center justify-center shrink-0">
            <span className="text-[9px] font-serif text-white font-medium">PI</span>
          </div>
          <div>
            <p className="text-[11px] font-medium text-admin-text leading-none">
              Private Intelligence
            </p>
            <p className="text-[9px] text-admin-text-faint font-mono uppercase tracking-wider mt-0.5">
              Admin Console
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto admin-scroll py-3 px-0">
        {NAV_GROUPS.map((group) => (
          <NavGroupSection key={group.label} group={group} pathname={pathname} />
        ))}
      </nav>

      {/* User / Bottom bar */}
      <div className="px-3 py-3 border-t border-admin-border shrink-0">
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-6 h-6 rounded-full bg-admin-active border border-admin-border flex items-center justify-center shrink-0">
            <span className="text-[9px] font-medium text-admin-text-secondary">DM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-admin-text truncate">David Mercer</p>
            <p className="text-[9px] text-admin-text-faint font-mono uppercase tracking-wide">
              Director
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
