"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { FIXTURE_CLIENTS } from "@/lib/admin/fixtures/clients";
import { FIXTURE_USERS } from "@/lib/admin/fixtures/users";
import {
  Building2,
  FileText,
  Target,
  UserCheck,
  Receipt,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";

const MATTER_TYPES = [
  { value: "CORPORATE_INVESTIGATION", label: "Corporate Investigation" },
  { value: "FRAUD", label: "Fraud Investigation" },
  { value: "ASSET_TRACING", label: "Asset Tracing" },
  { value: "DUE_DILIGENCE", label: "Due Diligence" },
  { value: "SURVEILLANCE", label: "Surveillance" },
  { value: "PROCESS_SERVING", label: "Process Serving" },
  { value: "TRACING", label: "Locate / Trace (Missing Person)" },
  { value: "OSINT", label: "OSINT & Digital Research" },
  { value: "LITIGATION_SUPPORT", label: "Litigation Support" },
  { value: "EMPLOYEE_INVESTIGATION", label: "Employee Investigation" },
  { value: "OTHER", label: "Other Specialized Matter" },
];

const SECTIONS = [
  { id: 1, title: "Client", icon: Building2 },
  { id: 2, title: "Instruction", icon: FileText },
  { id: 3, title: "Investigation", icon: Target },
  { id: 4, title: "Assignment", icon: UserCheck },
  { id: 5, title: "Commercial", icon: Receipt },
  { id: 6, title: "Security", icon: ShieldCheck },
];

export default function NewMatterPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // 1. Client
    client_organisation_id: FIXTURE_CLIENTS[0]?.id || "",
    primary_contact: "",
    // 2. Instruction
    title: "",
    matter_type: "CORPORATE_INVESTIGATION",
    description: "",
    instructions: "",
    legal_context: "",
    // 3. Investigation
    investigation_objective: "",
    priority: "NORMAL",
    target_date: "",
    // 4. Assignment
    lead_investigator_id: FIXTURE_USERS[1]?.id || "",
    // 5. Commercial
    estimated_value: "",
    quoted_value: "",
    // 6. Security
    confidentiality: "STANDARD",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setError(null);
    if (activeStep === 1 && !formData.client_organisation_id) {
      setError("Please select a client organisation.");
      return;
    }
    if (activeStep === 2 && !formData.title.trim()) {
      setError("Please provide a Matter Title.");
      return;
    }
    if (activeStep === 3 && !formData.investigation_objective.trim()) {
      setError("Please define the Investigation Objective.");
      return;
    }
    setActiveStep((prev) => Math.min(6, prev + 1));
  };

  const handleBack = () => {
    setError(null);
    setActiveStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/matters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          estimated_value: formData.estimated_value ? Number(formData.estimated_value) * 100 : undefined,
          quoted_value: formData.quoted_value ? Number(formData.quoted_value) * 100 : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create matter");
      }

      router.push(`/admin/matters/${data.reference}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create matter";
      setError(msg);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6 space-y-6">
      <AdminPageHeader
        label="CASEWORK DIRECTORY"
        title="Instruct New Investigation Matter"
        description="Structured multi-section intake establishing the central operational case file."
        actions={
          <Link
            href="/admin/matters"
            className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border text-admin-text-muted hover:text-admin-text rounded-xs transition-colors"
          >
            ← Cancel
          </Link>
        }
      />

      {/* STEP PROGRESS BAR */}
      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-3">
        <div className="grid grid-cols-6 gap-2">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isCurrent = activeStep === sec.id;
            const isCompleted = activeStep > sec.id;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveStep(sec.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xs text-xs transition-colors ${
                  isCurrent
                    ? "bg-admin-accent text-white font-medium shadow-xs"
                    : isCompleted
                    ? "bg-admin-surface text-admin-text hover:bg-admin-hover"
                    : "text-admin-text-faint hover:text-admin-text"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px]">{sec.id}.</span>
                </div>
                <span className="text-[11px] font-medium hidden sm:inline">{sec.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xs text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* FORM CARD */}
      <form onSubmit={handleSubmit} className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-6">
        {/* SECTION 1: CLIENT */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-admin-border pb-3">
              <h3 className="text-sm font-semibold text-admin-text">1. Client Organisation & Authority</h3>
              <p className="text-xs text-admin-text-muted">Select the instructing legal entity or corporate client.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Instructing Client *
                </label>
                <select
                  value={formData.client_organisation_id}
                  onChange={(e) => updateField("client_organisation_id", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden font-medium"
                >
                  {FIXTURE_CLIENTS.map((cli) => (
                    <option key={cli.id} value={cli.id}>
                      {cli.legal_name} ({cli.client_type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Primary Contact / Instructing Solicitor (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Partner J. Vance"
                  value={formData.primary_contact}
                  onChange={(e) => updateField("primary_contact", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: INSTRUCTION */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div className="border-b border-admin-border pb-3">
              <h3 className="text-sm font-semibold text-admin-text">2. Instruction Parameters</h3>
              <p className="text-xs text-admin-text-muted">Title, operational category, and factual background.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Matter Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pre-Acquisition Due Diligence — Target Entity"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Matter Type *
                </label>
                <select
                  value={formData.matter_type}
                  onChange={(e) => updateField("matter_type", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden"
                >
                  {MATTER_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Factual Narrative / Background Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the context leading to this instruction..."
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Special Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Strict protocols, communication restrictions, or operational limits..."
                  value={formData.instructions}
                  onChange={(e) => updateField("instructions", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Legal Context & Statutory Justification
                </label>
                <input
                  type="text"
                  placeholder="e.g. CPR Part 31 disclosure, Employment Tribunal defense, GDPR Art 6(1)(f) LIA"
                  value={formData.legal_context}
                  onChange={(e) => updateField("legal_context", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: INVESTIGATION */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-admin-border pb-3">
              <h3 className="text-sm font-semibold text-admin-text">3. Investigation Objective</h3>
              <p className="text-xs text-admin-text-muted">Define the specific evidential mandate, priority, and target dates.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Investigation Objective *
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Establish evidential link between Senior Procurement Officer and offshore vendor entities; substantiate unauthorized payment approvals."
                  value={formData.investigation_objective}
                  onChange={(e) => updateField("investigation_objective", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => updateField("priority", e.target.value)}
                    className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden"
                  >
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                    Target Completion Date
                  </label>
                  <input
                    type="date"
                    value={formData.target_date}
                    onChange={(e) => updateField("target_date", e.target.value)}
                    className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: ASSIGNMENT */}
        {activeStep === 4 && (
          <div className="space-y-4">
            <div className="border-b border-admin-border pb-3">
              <h3 className="text-sm font-semibold text-admin-text">4. Investigator Assignment</h3>
              <p className="text-xs text-admin-text-muted">Allocate lead operational investigator responsible for case execution.</p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                Assigned Lead Investigator *
              </label>
              <select
                value={formData.lead_investigator_id}
                onChange={(e) => updateField("lead_investigator_id", e.target.value)}
                className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden font-medium"
              >
                {FIXTURE_USERS.filter((u) => ["ADMIN", "INVESTIGATOR", "SUPER_ADMIN", "CASE_MANAGER"].includes(u.role)).map((usr) => (
                  <option key={usr.id} value={usr.id}>
                    {usr.name} ({usr.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* SECTION 5: COMMERCIAL */}
        {activeStep === 5 && (
          <div className="space-y-4">
            <div className="border-b border-admin-border pb-3">
              <h3 className="text-sm font-semibold text-admin-text">5. Commercial Scope & Billing Estimates</h3>
              <p className="text-xs text-admin-text-muted">Fee estimates and approved quotes for client ledger tracking.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Estimated Value (£)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 4500"
                  value={formData.estimated_value}
                  onChange={(e) => updateField("estimated_value", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-admin-text-secondary mb-1">
                  Quoted Value (£ inc. VAT)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5400"
                  value={formData.quoted_value}
                  onChange={(e) => updateField("quoted_value", e.target.value)}
                  className="w-full text-xs p-2.5 border border-admin-border rounded-xs bg-admin-surface/30 focus:border-admin-accent focus:outline-hidden font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: SECURITY */}
        {activeStep === 6 && (
          <div className="space-y-4">
            <div className="border-b border-admin-border pb-3">
              <h3 className="text-sm font-semibold text-admin-text">6. Security & Confidentiality Classification</h3>
              <p className="text-xs text-admin-text-muted">Controls data access permissions across internal operatives and portal access.</p>
            </div>

            <div className="space-y-2">
              {[
                {
                  value: "STANDARD",
                  label: "Standard Confidentiality",
                  desc: "Visible to assigned operatives and standard management team.",
                },
                {
                  value: "CONFIDENTIAL",
                  label: "Confidential",
                  desc: "Restricted to explicitly assigned operatives and direct case manager.",
                },
                {
                  value: "HIGHLY_CONFIDENTIAL",
                  label: "Highly Confidential (Air-Gapped)",
                  desc: "Senior management and Lead Investigator only. Subject to additional audit log logging.",
                },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 border rounded-xs cursor-pointer transition-colors ${
                    formData.confidentiality === opt.value
                      ? "bg-admin-surface border-admin-accent"
                      : "border-admin-border hover:bg-admin-surface/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="confidentiality"
                    value={opt.value}
                    checked={formData.confidentiality === opt.value}
                    onChange={(e) => updateField("confidentiality", e.target.value)}
                    className="mt-0.5 text-admin-accent"
                  />
                  <div>
                    <span className="text-xs font-semibold text-admin-text block">{opt.label}</span>
                    <span className="text-[11px] text-admin-text-muted">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* NAVIGATION / SUBMISSION CONTROLS */}
        <div className="flex items-center justify-between pt-4 border-t border-admin-border">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Section
            </button>
          ) : (
            <div />
          )}

          {activeStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-1.5 text-xs font-mono bg-admin-accent text-white rounded-xs hover:bg-admin-accent/90 transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>Next Section</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-mono bg-emerald-700 text-white rounded-xs hover:bg-emerald-800 transition-colors flex items-center gap-1.5 font-semibold shadow-xs disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {submitting ? "Creating Matter File..." : "Confirm & Create Matter"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
