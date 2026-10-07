"use client";

import React, { useState, useRef } from "react";
import { Lock, ShieldCheck, Upload, ArrowRight, CheckCircle2, AlertTriangle, Key } from "lucide-react";

export default function ConfidentialEnquiryForm() {
  const [category, setCategory] = useState<string>("Corporate");
  const [urgency, setUrgency] = useState<string>("Time sensitive");
  const [objective, setObjective] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  const categories = [
    "Corporate",
    "Legal",
    "Intelligence",
    "Surveillance",
    "Fraud",
    "Due diligence",
    "Personal matter",
    "Other",
  ];

  const urgencyLevels = [
    { level: "Routine", desc: "Response within 24 hours" },
    { level: "Time sensitive", desc: "Response within 4–6 hours" },
    { level: "Urgent", desc: "Immediate deployment required / active threat" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `LON-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedReference(generatedRef);
  };

  if (submittedReference) {
    return (
      <div className="bg-obsidian-surface border border-brass/60 p-8 sm:p-14 rounded-xs shadow-brassPlaque text-center max-w-2xl mx-auto space-y-6">
        <div className="w-12 h-12 bg-brass/10 border border-brass rounded-full mx-auto flex items-center justify-center text-brass">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brass">
            ENCRYPTED DISPATCH CONFIRMED
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-warmWhite font-serif uppercase">
            Mandate Received In Confidence
          </h3>
          <p className="text-xs font-mono text-stone-muted">
            REFERENCE: {submittedReference}
          </p>
        </div>
        <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
          Your transmission has been encrypted and routed directly to the duty consulting partner.
          Given your designated urgency ({urgency}), an operative director will review your parameters
          and make initial secure contact using your preferred communication route.
        </p>
        <div className="p-4 bg-obsidian border border-oliveGrey/60 text-xs font-mono text-stone-muted rounded-xs text-left space-y-1">
          <div>COMMUNICATION SECURITY: AES-256 AIR-GAPPED DISPATCH</div>
          <div>NON-DISCLOSURE STATUS: MUTUAL BINDING DUTY OF CONFIDENTIALITY ACTIVE</div>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setSubmittedReference(null)}
            className="text-xs font-mono uppercase tracking-widest text-brass hover:text-warmWhite transition-colors"
          >
            ← Submit Additional Matter Parameters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-obsidian-surface/90 border border-oliveGrey/90 p-8 sm:p-12 lg:p-16 rounded-xs shadow-etched max-w-4xl mx-auto">
      {/* Form Header */}
      <div className="border-b border-oliveGrey/80 pb-8 mb-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-brass">
            <Lock className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-ultra">
              SECURE CONSULTATION CHAMBER
            </span>
          </div>
          <span className="text-[10px] font-mono text-stone-muted uppercase tracking-widest">
            STRICTLY CONFIDENTIAL
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-warmWhite font-serif uppercase tracking-tight">
          Some matters should not be discussed in public.
        </h2>
        <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
          Please outline the parameters of your inquiry below. All information submitted is protected
          under strict professional non-disclosure obligations from the moment of dispatch.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Field 1: Category */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-stone block">
            01. WHAT CAN WE HELP ESTABLISH?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2.5 px-3 text-xs tracking-wider font-light transition-all text-left border rounded-xs ${
                  category === cat
                    ? "border-brass bg-brass/10 text-warmWhite"
                    : "border-oliveGrey/80 bg-obsidian text-stone hover:border-stone/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Field 2: Urgency */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-stone block">
            02. HOW URGENT IS THE MATTER?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {urgencyLevels.map((u) => (
              <button
                type="button"
                key={u.level}
                onClick={() => setUrgency(u.level)}
                className={`p-3.5 text-left border rounded-xs transition-all ${
                  urgency === u.level
                    ? "border-brass bg-brass/10 text-warmWhite"
                    : "border-oliveGrey/80 bg-obsidian text-stone hover:border-stone/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium uppercase tracking-wider">{u.level}</span>
                  {u.level === "Urgent" && (
                    <span className="w-2 h-2 rounded-full bg-oxblood-accent animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] text-stone-muted leading-tight font-light">
                  {u.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Field 3: Objective */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-stone block">
            03. WHAT WOULD YOU LIKE TO ESTABLISH?
          </label>
          <p className="text-[11px] text-stone-muted font-light mb-1">
            Provide a brief summary of the questions, suspected activities, or evidence required.
          </p>
          <textarea
            required
            rows={4}
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="E.g., We suspect procurement leakage involving a regional director and an undisclosed supplier entity; require beneficial ownership verification and field observation before board audit..."
            className="w-full bg-obsidian border border-oliveGrey/80 focus:border-brass px-4 py-3 text-xs sm:text-sm text-warmWhite placeholder:text-stone-dark rounded-xs outline-none transition-colors"
          />
        </div>

        {/* Field 4: Document Upload Simulation */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-stone block">
            04. SUPPORTING DOCUMENTATION (OPTIONAL)
          </label>
          <div className="border border-dashed border-oliveGrey/80 hover:border-brass/70 bg-obsidian p-6 text-center rounded-xs transition-colors cursor-pointer relative">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFileName(e.target.files[0].name);
                }
              }}
            />
            <div className="flex flex-col items-center space-y-2 text-stone">
              <Upload className="w-5 h-5 text-brass" />
              <div className="text-xs font-light">
                {fileName ? (
                  <span className="text-warmWhite font-mono">{fileName} attached</span>
                ) : (
                  <span>Attach contracts, pleadings, or suspicious filings (PDF, DOCX, ZIP)</span>
                )}
              </div>
              <span className="text-[10px] font-mono text-stone-muted">
                CLIENT-SIDE ENCRYPTION · STORED ON AIR-GAPPED SYSTEM
              </span>
            </div>
          </div>
        </div>

        {/* Field 5: Contact Details */}
        <div className="space-y-4 pt-4 border-t border-oliveGrey/60">
          <span className="text-xs font-mono uppercase tracking-wider text-stone block">
            05. PRINCIPAL OR INSTRUCTING PARTY DETAILS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-stone-muted uppercase block">YOUR NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name or designated alias"
                className="w-full bg-obsidian border border-oliveGrey/80 focus:border-brass px-4 py-2.5 text-xs text-warmWhite rounded-xs outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-stone-muted uppercase block">ORGANISATION / LAW FIRM</label>
              <input
                type="text"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                placeholder="Company, chambers, or 'Private Client'"
                className="w-full bg-obsidian border border-oliveGrey/80 focus:border-brass px-4 py-2.5 text-xs text-warmWhite rounded-xs outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-stone-muted uppercase block">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="secure-inbox@firm.co.uk"
                className="w-full bg-obsidian border border-oliveGrey/80 focus:border-brass px-4 py-2.5 text-xs text-warmWhite rounded-xs outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-stone-muted uppercase block">TELEPHONE NUMBER</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 20 ..."
                className="w-full bg-obsidian border border-oliveGrey/80 focus:border-brass px-4 py-2.5 text-xs text-warmWhite rounded-xs outline-none"
              />
            </div>
          </div>
        </div>

        {/* Field 6: Additional Information & Special Instructions */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-stone-muted uppercase block">
            PREFERRED CONTACT WINDOW & SAFE CALL INSTRUCTIONS
          </label>
          <input
            type="text"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="E.g., Call between 14:00-16:00 only; do not leave voicemail; or communicate via Signal"
            className="w-full bg-obsidian border border-oliveGrey/80 focus:border-brass px-4 py-2.5 text-xs text-warmWhite rounded-xs outline-none"
          />
        </div>

        {/* Submission Button */}
        <div className="pt-4 space-y-4">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center space-x-3 bg-brass hover:bg-brass-light text-obsidian py-4 text-xs font-medium tracking-[0.2em] uppercase rounded-xs shadow-etched transition-all duration-300 group"
          >
            <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
            <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-stone-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-brass" />
            <span>DISCREET PROTOCOL · PROTECTED UNDER STATUTORY PRIVILEGE GUIDELINES</span>
          </div>
        </div>
      </form>
    </div>
  );
}
