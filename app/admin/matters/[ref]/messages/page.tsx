import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getUserById } from "@/lib/admin/fixtures/users";
import { formatDateTime } from "@/lib/admin/utils/dates";
import { MessageSquare, Lock, Send, Eye, ShieldAlert, Paperclip } from "lucide-react";

interface MessagesProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterMessagesPage({ params }: MessagesProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, messages } = detail;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Communications & Operational Messages</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Internal investigator briefings and segregated client updates associated with this Matter.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-xs flex items-center gap-1 font-semibold">
            <Lock className="w-3 h-3" />
            STRICT AIR-GAP: INTERNAL ONLY
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => {
          const sender = getUserById(msg.sender_user_id);
          const isInternal = msg.recipient_scope === "INTERNAL";

          return (
            <div
              key={msg.id}
              className={`p-4 rounded-sm border shadow-admin-card space-y-2.5 ${
                isInternal
                  ? "bg-white border-admin-border"
                  : "bg-blue-50/40 border-blue-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-admin-border-subtle pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-admin-surface border border-admin-border flex items-center justify-center font-mono text-[10px] font-semibold text-admin-accent">
                    {sender?.name.slice(0, 2).toUpperCase() || "US"}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-admin-text">{sender?.name || msg.sender_user_id}</span>
                    <span className="text-[11px] text-admin-text-faint ml-2 font-mono">
                      {formatDateTime(msg.created_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isInternal ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-admin-surface border border-admin-border rounded-xs text-admin-text-secondary font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-admin-text-muted" />
                      INTERNAL
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100/80 border border-blue-300 text-blue-800 rounded-xs font-semibold flex items-center gap-1">
                      <Eye className="w-3 h-3 text-blue-600" />
                      CLIENT VISIBLE
                    </span>
                  )}
                  {msg.has_attachments && (
                    <span className="text-[10px] font-mono text-admin-text-faint flex items-center gap-0.5">
                      <Paperclip className="w-3 h-3" />
                      Attachment
                    </span>
                  )}
                </div>
              </div>

              {msg.subject && (
                <h4 className="text-xs font-semibold text-admin-text">{msg.subject}</h4>
              )}

              <p className="text-xs text-admin-text-secondary leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          );
        })}
      </div>

      {/* Message Composer */}
      <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase font-semibold text-admin-text">
            Log New Operational Communication
          </span>
          <div className="flex items-center gap-2 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="scope" defaultChecked className="text-admin-accent" />
              <span className="font-mono text-xs text-admin-text">Internal Team</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer ml-3">
              <input type="radio" name="scope" className="text-admin-accent" />
              <span className="font-mono text-xs text-blue-700">Client Portal</span>
            </label>
          </div>
        </div>
        <textarea
          rows={3}
          placeholder="Enter investigation message or operational briefing..."
          className="w-full text-xs p-3 border border-admin-border rounded-xs focus:outline-hidden focus:border-admin-accent bg-admin-surface/30"
        />
        <div className="flex justify-end">
          <button className="px-3 py-1.5 text-xs font-mono bg-admin-accent text-white rounded-xs hover:bg-admin-accent/90 transition-colors flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" />
            Post Message
          </button>
        </div>
      </div>
    </div>
  );
}
