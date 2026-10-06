import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Admin",
  robots: "noindex, nofollow",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Standalone auth layer — overlays the admin OS shell (z-[200])
    <div className="fixed inset-0 z-[200] bg-admin-bg flex items-center justify-center font-sans">
      {children}
    </div>
  );
}
