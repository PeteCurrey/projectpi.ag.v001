"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Clock,
  AlertTriangle,
  Building2,
  User,
  Scale,
  Calendar,
  Upload,
} from "lucide-react";

interface EnquiryFormData {
  matterType: string;
  subType: string;
  documentType: string;
  urgency: "STANDARD" | "TIME_SENSITIVE" | "URGENT";
  deadline: string;
  jurisdiction: string;
  location: string;
  narrative: string;
  professionalClientType: string;
  fullName: string;
  organisationName: string;
  email: string;
  telephone: string;
  preferredContact: "EMAIL" | "TELEPHONE" | "EITHER";
  uploadedFiles: string[];
}

const initialData: EnquiryFormData = {
  matterType: "PROCESS_SERVING",
  subType: "",
  documentType: "",
  urgency: "STANDARD",
  deadline: "",
  jurisdiction: "England & Wales",
  location: "",
  narrative: "",
  professionalClientType: "SOLICITOR",
  fullName: "",
  organisationName: "",
  email: "",
  telephone: "",
  preferredContact: "EMAIL",
  uploadedFiles: [],
};

export default function ConfidentialEnquiryWorkflow() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<EnquiryFormData>(initialData);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Pre-fill from query params if directed from service/location page
  useEffect(() => {
    const service = searchParams.get("service");
    const matter = searchParams.get("matter");
    const clientType = searchParams.get("clientType");
    const locationParam = searchParams.get("location");

    setFormData((prev) => ({
      ...prev,
      matterType: service === "process-serving" ? "PROCESS_SERVING" : prev.matterType,
      documentType: matter || prev.documentType,
      professionalClientType: clientType ? clientType.toUpperCase() : prev.professionalClientType,
      location: locationParam || prev.location,
    }));
  }, [searchParams]);

  const updateField = (field: keyof EnquiryFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate secure generation of internal reference
    setTimeout(() => {
      const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      const generatedRef = `ENQ-${datePart}-${randomPart}`;
      setSubmittedReference(generatedRef);
      setIsSubmitting(false);
      setStep(6); // Step 6: Confirmation
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto bg-obsidian-surface/70 border border-oliveGrey/80 rounded-xs shadow-etched p-6 sm:p-10">
      {/* Top Protocol Security Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-oliveGrey/60 pb-5 mb-8 gap-4">
        <div className="flex items-center space-x-2.5 text-stone-light">
          <Lock className="w-4 h-4 text-brass" />
          <span className="text-[11px] font-mono tracking-ultra uppercase text-warmWhite">
            256-BIT ENCRYPTED INTAKE
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[10px] font-mono text-stone-muted">
          <span>BS 102000 PROTOCOL</span>
          <span>·</span>
          <span>CPR DISCLOSURE SAFE</span>
        </div>
      </div>

      {/* Progress Indicators (Steps 1 to 5) */}
      {step <= 5 && (
        <div className="mb-10">
          <div className="flex justify-between text-[10px] font-mono tracking-wider uppercase mb-2">
            <span className="text-brass">STAGE 0{step} OF 05</span>
            <span className="text-stone-muted">
              {step === 1 && "MATTER CLASSIFICATION"}
              {step === 2 && "SUBSTANTIVE NARRATIVE"}
              {step === 3 && "TIMING & JURISDICTION"}
              {step === 4 && "INSTRUCTING PARTY"}
              {step === 5 && "SECURITY VERIFICATION"}
            </span>
          </div>
          <div className="w-full bg-oliveGrey/40 h-1">
            <div
              className="bg-brass h-1 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 01: MATTER CLASSIFICATION */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-warmWhite">
              Select Matter Classification
            </h2>
            <p className="text-xs text-stone-muted font-light leading-relaxed">
              Identify the primary operational discipline required. Specific statutory requirements are automatically applied.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: "PROCESS_SERVING", label: "Process Serving & Court Delivery" },
              { id: "INTELLIGENCE", label: "Corporate Intelligence & OSINT" },
              { id: "TRACING", label: "Address & Asset Tracing" },
              { id: "SURVEILLANCE", label: "Covert Physical Surveillance" },
              { id: "FRAUD", label: "Fraud & Financial Investigation" },
              { id: "LITIGATION_SUPPORT", label: "Litigation & Witness Support" },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => updateField("matterType", item.id)}
                className={`p-4 text-left border text-xs tracking-wider uppercase font-mono transition-all ${
                  formData.matterType === item.id
                    ? "border-brass bg-brass/10 text-warmWhite"
                    : "border-oliveGrey/60 bg-obsidian/40 text-stone hover:border-oliveGrey"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {formData.matterType === "PROCESS_SERVING" && (
            <div className="space-y-3 pt-4 border-t border-oliveGrey/40">
              <label className="block text-xs font-mono uppercase text-brass">
                Specific Document Classification
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => updateField("documentType", e.target.value)}
                className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite px-4 py-3 text-xs focus:border-brass outline-none"
              >
                <option value="">Select Document Type...</option>
                <option value="statutory-demand">Statutory Demand (Individual / Corporate)</option>
                <option value="bankruptcy-petition">Bankruptcy Petition (Personal Service)</option>
                <option value="winding-up-petition">Winding-Up Petition (Registered Office)</option>
                <option value="court-papers">Claim Forms / Court Orders / Injunctions</option>
                <option value="urgent">Urgent / Same-Day Service</option>
                <option value="difficult-subject">Evasive Subject / Multiple Addresses</option>
                <option value="address-tracing">Address Tracing + Process Service</option>
              </select>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-oliveGrey/60">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-6 py-3.5 hover:bg-brass/90 transition-colors"
            >
              NEXT: MATTER NARRATIVE
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 02: SUBSTANTIVE NARRATIVE */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-warmWhite">
              Matter Narrative & Objectives
            </h2>
            <p className="text-xs text-stone-muted font-light leading-relaxed">
              Summarise the background and required outcome. Include relevant party details or specific procedural instructions.
            </p>
          </div>

          <div className="space-y-4">
            <textarea
              rows={6}
              value={formData.narrative}
              onChange={(e) => updateField("narrative", e.target.value)}
              placeholder="Provide relevant facts, background, subject details, or specific instructions..."
              className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite p-4 text-xs font-light leading-relaxed focus:border-brass outline-none"
            />

            <div className="p-4 bg-obsidian/40 border border-dashed border-oliveGrey/80 flex items-center justify-between text-xs text-stone-muted">
              <div className="flex items-center gap-3">
                <Upload className="w-4 h-4 text-brass" />
                <span>Upload supporting documentation (PDF, DOCX, ZIP)</span>
              </div>
              <span className="font-mono text-[10px] text-brass uppercase">
                OPTIONAL · ENCRYPTED
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-oliveGrey/60">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-stone hover:text-warmWhite text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-6 py-3.5 hover:bg-brass/90 transition-colors"
            >
              NEXT: TIMING & LOCATION
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 03: TIMING & JURISDICTION */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-warmWhite">
              Timing, Urgency & Location
            </h2>
            <p className="text-xs text-stone-muted font-light leading-relaxed">
              Indicate operational urgency, court hearing deadlines, and geographic jurisdiction.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-brass mb-2">
                Operational Urgency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "STANDARD", label: "Standard", sub: "2-3 Working Days" },
                  { id: "TIME_SENSITIVE", label: "Time-Sensitive", sub: "Within 24-48 Hours" },
                  { id: "URGENT", label: "Emergency", sub: "Same-Day Deployment" },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => updateField("urgency", item.id)}
                    className={`p-3 text-left border transition-all ${
                      formData.urgency === item.id
                        ? "border-brass bg-brass/10"
                        : "border-oliveGrey/60 bg-obsidian/40 hover:border-oliveGrey"
                    }`}
                  >
                    <span className="block text-xs font-mono uppercase text-warmWhite">
                      {item.label}
                    </span>
                    <span className="block text-[10px] text-stone-muted font-light mt-0.5">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-muted mb-2">
                  Deadline or Court Date
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => updateField("deadline", e.target.value)}
                  className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-stone-muted mb-2">
                  Primary Location / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Central London, Manchester, Leeds..."
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-oliveGrey/60">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 text-stone hover:text-warmWhite text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-6 py-3.5 hover:bg-brass/90 transition-colors"
            >
              NEXT: INSTRUCTING PARTY
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 04: INSTRUCTING PARTY DETAILS */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-warmWhite">
              Instructing Party Information
            </h2>
            <p className="text-xs text-stone-muted font-light leading-relaxed">
              We communicate solely through designated secure channels with verified instructing parties.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-brass mb-2">
                Client Classification
              </label>
              <select
                value={formData.professionalClientType}
                onChange={(e) => updateField("professionalClientType", e.target.value)}
                className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite px-4 py-3 text-xs focus:border-brass outline-none"
              >
                <option value="SOLICITOR">Solicitor / Law Firm</option>
                <option value="INSOLVENCY_PRACTITIONER">Insolvency Practitioner</option>
                <option value="CORPORATE">Corporate Leadership / In-House Counsel</option>
                <option value="INSURER">Insurer / Loss Adjuster</option>
                <option value="ACCOUNTANT">Accountant / Forensic Specialist</option>
                <option value="PRIVATE_CLIENT">Select Private Client</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-muted mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-stone-muted mb-2">
                  Organisation / Firm
                </label>
                <input
                  type="text"
                  value={formData.organisationName}
                  onChange={(e) => updateField("organisationName", e.target.value)}
                  placeholder="e.g. Vance & Partners LLP"
                  className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-muted mb-2">
                  Direct Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="name@firm.co.uk"
                  className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-stone-muted mb-2">
                  Telephone (Direct / Secure)
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => updateField("telephone", e.target.value)}
                  placeholder="+44 20 7000 0000"
                  className="w-full bg-obsidian border border-oliveGrey/80 text-warmWhite px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-oliveGrey/60">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 text-stone hover:text-warmWhite text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK
            </button>
            <button
              type="button"
              onClick={() => setStep(5)}
              className="inline-flex items-center gap-2 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-6 py-3.5 hover:bg-brass/90 transition-colors"
            >
              NEXT: REVIEW & SUBMIT
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 05: REVIEW & VERIFICATION */}
      {step === 5 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-warmWhite">
              Review Confidential Instruction
            </h2>
            <p className="text-xs text-stone-muted font-light leading-relaxed">
              Verify your instruction summary before dispatch into our encrypted handling system.
            </p>
          </div>

          <div className="p-6 bg-obsidian border border-oliveGrey/60 space-y-4 text-xs font-mono text-stone-light">
            <div className="flex justify-between border-b border-oliveGrey/40 pb-2">
              <span className="text-stone-muted">MATTER CLASSIFICATION:</span>
              <span className="text-warmWhite">{formData.matterType}</span>
            </div>
            {formData.documentType && (
              <div className="flex justify-between border-b border-oliveGrey/40 pb-2">
                <span className="text-stone-muted">DOCUMENT TYPE:</span>
                <span className="text-brass">{formData.documentType}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-oliveGrey/40 pb-2">
              <span className="text-stone-muted">URGENCY:</span>
              <span className="text-warmWhite">{formData.urgency}</span>
            </div>
            {formData.location && (
              <div className="flex justify-between border-b border-oliveGrey/40 pb-2">
                <span className="text-stone-muted">LOCATION:</span>
                <span className="text-warmWhite">{formData.location}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-oliveGrey/40 pb-2">
              <span className="text-stone-muted">INSTRUCTING PARTY:</span>
              <span className="text-warmWhite">
                {formData.fullName || "Unspecified"} ({formData.organisationName || "Direct"})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-muted">SECURE CONTACT:</span>
              <span className="text-warmWhite">{formData.email || "Unspecified"}</span>
            </div>
          </div>

          <div className="p-4 bg-obsidian-surface/60 border border-oliveGrey/60 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-brass shrink-0 mt-0.5" />
            <p className="text-[11px] text-stone-muted font-light leading-relaxed">
              By submitting this enquiry, you acknowledge that communications are protected under professional privilege protocols. No data is stored on public networks.
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-oliveGrey/60">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex items-center gap-2 text-stone hover:text-warmWhite text-xs uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-8 py-4 hover:bg-brass/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "TRANSMITTING ENCRYPTED RECORD..." : "SUBMIT CONFIDENTIAL INSTRUCTION"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 06: CONFIRMATION & PROTOCOL RECEIPT */}
      {step === 6 && (
        <div className="space-y-8 text-center py-6">
          <div className="w-12 h-12 bg-brass/10 border border-brass flex items-center justify-center mx-auto text-brass">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-ultra text-brass uppercase block">
              TRANSMISSION SECURED & LOGGED
            </span>
            <h2 className="text-3xl font-serif text-warmWhite">
              Confidential Instruction Received
            </h2>
            <p className="text-xs sm:text-sm text-stone-light font-light max-w-lg mx-auto leading-relaxed">
              Your matter has been ingested into our secure case management environment. An assigned Case Director will review and establish contact.
            </p>
          </div>

          <div className="p-6 bg-obsidian border border-brass/40 max-w-md mx-auto space-y-2">
            <span className="text-[10px] font-mono text-stone-muted uppercase tracking-wider block">
              SECURE MATTER REFERENCE
            </span>
            <span className="text-xl font-mono text-brass font-medium tracking-wider block">
              {submittedReference}
            </span>
            <span className="text-[11px] text-stone-muted font-light block">
              Please quote this reference in any subsequent encrypted communication.
            </span>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setFormData(initialData);
                setStep(1);
              }}
              className="border border-oliveGrey/80 hover:border-brass text-stone-light text-xs tracking-widest uppercase px-6 py-3 transition-colors font-mono"
            >
              LODGE ANOTHER ENQUIRY
            </button>
            <a
              href="/"
              className="bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-6 py-3 hover:bg-brass/90 transition-colors"
            >
              RETURN TO FIRM OVERVIEW
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
