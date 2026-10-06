import React from "react";
import { MessageSquare, Send, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Confidential Case Communications | Private Intelligence Client Portal",
  robots: "noindex, nofollow",
};

export default function ClientMessagesPage() {
  const messages = [
    {
      sender: "D. Mercer (Case Director)",
      role: "INTERNAL FIRM",
      time: "Today, 11:42 BST",
      subject: "Re: Attempt 01 Outcome — Kensington Residence",
      body: "Good morning. We attended the Kensington address at 19:42 BST yesterday evening. The concierge verified the subject is resident on the 3rd floor but in Europe until Monday morning. Our team has re-rostered attendance for 07:30 Monday to effect personal service upon return before departure to business premises. An interim field log is uploaded.",
    },
    {
      sender: "Eleanor Vance (Partner)",
      role: "INSTRUCTING SOLICITOR",
      time: "03 Oct 2024, 15:30 BST",
      subject: "Instruction Transmission: High Court Winding-Up Petition",
      body: "Please find attached the sealed copy of Petition Form 7.1 issued out of the Business and Property Courts. We require personal service pursuant to Rule 7.9. Please advise immediately upon attendance.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-oliveGrey/70 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
            CONFIDENTIAL COMMUNICATIONS CHANNEL
          </span>
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
            Encrypted Case Messages
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>END-TO-END SECURE · ACCESS CONTROLLED</span>
        </div>
      </div>

      <div className="space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="p-6 bg-obsidian-surface/60 border border-oliveGrey/60 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2 border-b border-oliveGrey/40 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-warmWhite font-medium">{msg.sender}</span>
                <span className="text-[10px] uppercase text-brass bg-brass/10 px-2 py-0.5 border border-brass/30">
                  {msg.role}
                </span>
              </div>
              <span className="text-stone-muted">{msg.time}</span>
            </div>

            <h3 className="text-sm font-serif text-warmWhite pt-1">
              {msg.subject}
            </h3>

            <p className="text-xs sm:text-sm text-stone-light leading-relaxed font-light">
              {msg.body}
            </p>
          </div>
        ))}
      </div>

      {/* Reply input */}
      <div className="p-6 bg-obsidian-surface border border-oliveGrey/80 space-y-4">
        <span className="text-xs font-mono text-brass uppercase block">
          Send Privileged Transmission to Case Team
        </span>
        <textarea
          rows={4}
          placeholder="Type your message or instruction here..."
          className="w-full bg-obsidian border border-oliveGrey/70 text-warmWhite p-4 text-xs font-light focus:border-brass outline-none"
        />
        <div className="flex justify-end">
          <button className="inline-flex items-center gap-2 bg-brass text-obsidian text-xs font-mono uppercase tracking-wider font-medium px-6 py-3 hover:bg-brass/90 transition-colors">
            <Send className="w-3.5 h-3.5" />
            <span>TRANSMIT ENCRYPTED MESSAGE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
