import React from "react";
import { User, ShieldCheck, Key, Lock } from "lucide-react";

export const metadata = {
  title: "Client Account & Security Settings | Private Intelligence",
  robots: "noindex, nofollow",
};

export default function ClientAccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 space-y-12">
      <div className="border-b border-oliveGrey/70 pb-6 space-y-2">
        <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
          ACCOUNT SECURITY & VERIFICATION
        </span>
        <h1 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
          Security Controls & Practice Credentials
        </h1>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-obsidian-surface/60 border border-oliveGrey/60 space-y-4">
          <div className="flex items-center gap-3 border-b border-oliveGrey/40 pb-3">
            <User className="w-4 h-4 text-brass" />
            <h2 className="text-sm font-serif text-warmWhite">
              Instructing Entity Information
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-stone-muted">
            <div>
              <span className="text-stone block">ORGANISATION:</span>
              <span className="text-warmWhite">Vance & Partners LLP</span>
            </div>
            <div>
              <span className="text-stone block">REGULATORY REGISTRATION:</span>
              <span className="text-warmWhite">SRA ID: 629104</span>
            </div>
            <div>
              <span className="text-stone block">PRIMARY CONTACT:</span>
              <span className="text-warmWhite">Eleanor Vance (Senior Partner)</span>
            </div>
            <div>
              <span className="text-stone block">SECURE DISPATCH EMAIL:</span>
              <span className="text-warmWhite">e.vance@vancepartners.co.uk</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-obsidian-surface/60 border border-oliveGrey/60 space-y-4">
          <div className="flex items-center gap-3 border-b border-oliveGrey/40 pb-3">
            <ShieldCheck className="w-4 h-4 text-brass" />
            <h2 className="text-sm font-serif text-warmWhite">
              Multi-Factor Authentication & Cryptographic Keys
            </h2>
          </div>
          <div className="space-y-3 text-xs font-light text-stone-light">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-warmWhite block">HARDWARE TOKEN / TOTP:</span>
                <span className="text-stone-muted text-[11px]">FIDO2 / WebAuthn Active</span>
              </div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2.5 py-1">
                ENFORCED
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-oliveGrey/30">
              <div>
                <span className="font-mono text-warmWhite block">DATA RETENTION PROTOCOL:</span>
                <span className="text-stone-muted text-[11px]">Strict 6-Year CPR Statutory Limit</span>
              </div>
              <span className="text-[10px] font-mono uppercase text-stone-muted">
                DPA 2018 STANDARD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
