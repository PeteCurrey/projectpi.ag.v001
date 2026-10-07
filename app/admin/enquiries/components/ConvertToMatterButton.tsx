"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface Props {
  enquiryId: string;
}

export default function ConvertToMatterButton({ enquiryId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}/convert`, {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to convert enquiry");
      }

      router.push(`/admin/matters/${data.reference}`);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to convert";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {error && <span className="text-[11px] text-red-600 font-mono">{error}</span>}
      <button
        onClick={handleConvert}
        disabled={loading}
        className="px-3 py-1.5 text-xs font-mono uppercase font-semibold bg-emerald-700 text-white rounded-xs hover:bg-emerald-800 transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Converting...
          </>
        ) : (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" />
            Convert to Matter
          </>
        )}
      </button>
    </div>
  );
}
