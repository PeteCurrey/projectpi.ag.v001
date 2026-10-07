import type { Metadata } from "next";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopBar from "./components/AdminTopBar";
import { getUnreadNotifications } from "@/lib/admin/fixtures/notifications";

export const metadata: Metadata = {
  title: {
    template: "%s — TFTS Directorate",
    default: "TFTS Operations Console",
  },
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Get real session user ID from session — for now use dev user
  const unread = getUnreadNotifications("usr-001");

  return (
    // Full-screen fixed overlay — sits above the public site header/footer
    <div className="fixed inset-0 z-[100] flex bg-admin-bg overflow-hidden font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <AdminTopBar notificationCount={unread.length} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto admin-scroll bg-admin-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
