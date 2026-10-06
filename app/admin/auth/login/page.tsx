import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In — Admin",
  robots: "noindex, nofollow",
};

interface LoginPageProps {
  searchParams: Promise<{ error?: string; return?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params.error;
  const returnTo = params.return ?? "/admin";

  return (
    <div className="w-full max-w-sm px-6">
      {/* Branding */}
      <div className="mb-8 text-center">
        <div className="w-8 h-8 bg-admin-text rounded-xs flex items-center justify-center mx-auto mb-4">
          <span className="text-[11px] font-serif text-white font-medium">PI</span>
        </div>
        <h1 className="text-base font-medium text-admin-text">Private Intelligence</h1>
        <p className="text-[11px] text-admin-text-muted font-mono uppercase tracking-wider mt-1">
          Secure Administration Console
        </p>
      </div>

      {/* Error message — generic, no field-specific hints */}
      {error && (
        <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-100 rounded-sm px-3 py-2.5">
          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-[12px] text-red-700">
            {error === "RATE_LIMITED"
              ? "Too many attempts. Access has been temporarily suspended."
              : error === "ACCOUNT_LOCKED"
              ? "This account has been locked. Contact your system administrator."
              : "Your credentials could not be verified. Please try again."}
          </p>
        </div>
      )}

      {/* Login form */}
      <form
        action="/api/admin/auth/login"
        method="POST"
        className="space-y-4"
      >
        <input type="hidden" name="returnTo" value={returnTo} />

        <div>
          <label
            htmlFor="email"
            className="block text-[11px] font-medium text-admin-text-secondary mb-1.5"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-3 py-2 bg-white border border-admin-border rounded-sm text-[13px] text-admin-text placeholder:text-admin-text-faint focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent/20 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-[11px] font-medium text-admin-text-secondary mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 bg-white border border-admin-border rounded-sm text-[13px] text-admin-text placeholder:text-admin-text-faint focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent/20 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-admin-text text-white text-[12px] font-medium rounded-sm hover:bg-admin-text/90 transition-colors mt-6"
        >
          Continue
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-admin-border text-center">
        <p className="text-[10px] text-admin-text-faint font-mono uppercase tracking-wider">
          Authorised Personnel Only
        </p>
        <p className="text-[10px] text-admin-text-faint mt-1">
          All access is logged and audited.
        </p>
      </div>
    </div>
  );
}
