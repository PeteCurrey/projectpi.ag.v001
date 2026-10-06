import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Two-Factor Authentication — Admin",
  robots: "noindex, nofollow",
};

interface MfaPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function MfaPage({ searchParams }: MfaPageProps) {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="w-full max-w-sm px-6">
      {/* Branding */}
      <div className="mb-8 text-center">
        <div className="w-8 h-8 bg-admin-text rounded-xs flex items-center justify-center mx-auto mb-4">
          <span className="text-[11px] font-serif text-white font-medium">PI</span>
        </div>
        <h1 className="text-base font-medium text-admin-text">Two-Factor Authentication</h1>
        <p className="text-[12px] text-admin-text-muted mt-1 leading-snug">
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-100 rounded-sm px-3 py-2.5">
          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-[12px] text-red-700">
            {error === "MAX_ATTEMPTS_EXCEEDED"
              ? "Maximum verification attempts exceeded. Please sign in again."
              : "The code entered is incorrect or has expired. Please try again."}
          </p>
        </div>
      )}

      {/* TOTP form */}
      <form action="/api/admin/auth/mfa" method="POST" className="space-y-4">
        <div>
          <label
            htmlFor="code"
            className="block text-[11px] font-medium text-admin-text-secondary mb-1.5"
          >
            Authentication code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            autoComplete="one-time-code"
            autoFocus
            placeholder="000000"
            required
            className="w-full px-3 py-2.5 bg-white border border-admin-border rounded-sm text-[18px] text-admin-text placeholder:text-admin-text-faint focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent/20 transition-colors text-center font-mono tracking-[0.4em]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-admin-text text-white text-[12px] font-medium rounded-sm hover:bg-admin-text/90 transition-colors"
        >
          Verify
        </button>
      </form>

      {/* Backup code option */}
      <div className="mt-6 pt-4 border-t border-admin-border text-center">
        <p className="text-[11px] text-admin-text-muted mb-2">
          Cannot access your authenticator?
        </p>
        <form action="/api/admin/auth/mfa" method="POST" className="space-y-3">
          <input type="hidden" name="useBackupCode" value="true" />
          <input
            name="backupCode"
            type="text"
            placeholder="XXXXX-XXXXX"
            className="w-full px-3 py-2 bg-white border border-admin-border rounded-sm text-[12px] text-admin-text placeholder:text-admin-text-faint focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent/20 transition-colors text-center font-mono tracking-wider"
          />
          <button
            type="submit"
            className="w-full py-1.5 bg-admin-hover text-admin-text-secondary text-[11px] font-medium rounded-sm hover:bg-admin-active transition-colors border border-admin-border"
          >
            Use backup code
          </button>
        </form>
      </div>
    </div>
  );
}
