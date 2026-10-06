"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FolderOpen,
  User,
  Plus,
  GitBranch,
  FileCheck,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Link2,
  BookOpen,
  X,
  FileText,
  Save,
  ArrowRight,
  Filter,
} from "lucide-react";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import {
  ResearchItem,
  ResearchPivot,
  ResearchConfidence,
  PivotType,
  INITIAL_RESEARCH_ITEMS,
  INITIAL_PIVOTS,
  PIVOT_OPTIONS,
  CONFIDENCE_LEVELS,
} from "@/lib/admin/research/data";
import { FIXTURE_CASES } from "@/lib/admin/fixtures/cases";
import { FIXTURE_SUBJECTS } from "@/lib/admin/fixtures/subjects";
import { FIXTURE_USERS } from "@/lib/admin/fixtures/users";

export default function DedicatedResearchWorkspacePage() {
  // Session Header Context state
  const [selectedCaseRef, setSelectedCaseRef] = useState<string>("MAT-2501-001");
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>("Arthur Pendelton");
  const [selectedInvestigator, setSelectedInvestigator] = useState<string>("Sarah Chen");
  const [researchObjective, setResearchObjective] = useState<string>(
    "Trace beneficial overseas corporate holdings, hidden directorships, and undisclosed property assets."
  );

  // Findings & Pivots state
  const [researchItems, setResearchItems] = useState<ResearchItem[]>(INITIAL_RESEARCH_ITEMS);
  const [pivots, setPivots] = useState<ResearchPivot[]>(INITIAL_PIVOTS);

  // Filters
  const [filterConfidence, setFilterConfidence] = useState<string>("ALL");
  const [filterCaseOnly, setFilterCaseOnly] = useState<boolean>(true);

  // New Finding Modal State
  const [isAddFindingOpen, setIsAddFindingOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceType, setNewSourceType] = useState("Official Public Register");
  const [newFinding, setNewFinding] = useState("");
  const [newConfidence, setNewConfidence] = useState<ResearchConfidence>("Corroborated");
  const [newNotes, setNewNotes] = useState("");
  const [newAttachmentRef, setNewAttachmentRef] = useState("");

  // New Pivot Modal State
  const [isAddPivotOpen, setIsAddPivotOpen] = useState(false);
  const [newPivotType, setNewPivotType] = useState<PivotType>("Company → Director");
  const [newPivotInput, setNewPivotInput] = useState("");
  const [newPivotOutput, setNewPivotOutput] = useState("");
  const [newPivotTargetTool, setNewPivotTargetTool] = useState("Companies House");

  // Save to Case Action state (toast simulation)
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleCreateFinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newFinding.trim()) return;

    const item: ResearchItem = {
      id: `ri-${Date.now()}`,
      title: newTitle.trim(),
      source_url: newUrl.trim() || "https://local-investigator-note.internal",
      source_name: newSourceName.trim() || "Internal Intelligence Observation",
      source_type: newSourceType,
      date_accessed: new Date().toISOString().slice(0, 16).replace("T", " "),
      researcher: selectedInvestigator,
      finding: newFinding.trim(),
      confidence: newConfidence,
      case_reference: selectedCaseRef,
      subject_name: selectedSubjectName,
      notes: newNotes.trim() || undefined,
      evidence_attachment: newAttachmentRef.trim() || undefined,
      saved_to_case: false,
      created_at: new Date().toISOString(),
    };

    setResearchItems((prev) => [item, ...prev]);
    setIsAddFindingOpen(false);
    // Reset
    setNewTitle("");
    setNewUrl("");
    setNewSourceName("");
    setNewFinding("");
    setNewNotes("");
    setNewAttachmentRef("");
    showNotification("New research finding logged with complete source attribution.");
  };

  const handleCreatePivot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPivotInput.trim() || !newPivotOutput.trim()) return;

    const newPiv: ResearchPivot = {
      id: `piv-${Date.now()}`,
      pivot_type: newPivotType,
      input_value: newPivotInput.trim(),
      output_lead: newPivotOutput.trim(),
      status: "OPEN",
      target_tool: newPivotTargetTool.trim() || undefined,
      created_at: new Date().toISOString().slice(0, 16).replace("T", " "),
    };

    setPivots((prev) => [newPiv, ...prev]);
    setIsAddPivotOpen(false);
    setNewPivotInput("");
    setNewPivotOutput("");
    showNotification(`Investigative pivot added: ${newPivotType}`);
  };

  const handleSaveToCase = (
    itemId: string,
    action: "INTELLIGENCE" | "EVIDENCE" | "TIMELINE" | "SUBJECT"
  ) => {
    setResearchItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, saved_to_case: true, linked_entity_type: action }
          : item
      )
    );

    const labels: Record<string, string> = {
      INTELLIGENCE: "Created Intelligence Item in Case Dossier",
      EVIDENCE: "Logged as Cryptographic Evidence Exhibit",
      TIMELINE: "Committed to Immutable Case Chronology",
      SUBJECT: "Linked to Subject Profile Dossier",
    };
    showNotification(`Finding successfully saved to ${selectedCaseRef}: ${labels[action]}`);
  };

  // Filter items
  const filteredFindings = researchItems.filter((item) => {
    if (filterCaseOnly && item.case_reference !== selectedCaseRef) return false;
    if (filterConfidence !== "ALL" && item.confidence !== filterConfidence) return false;
    return true;
  });

  const getConfidenceBadge = (confidence: ResearchConfidence) => {
    switch (confidence) {
      case "Verified":
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs font-semibold">
            VERIFIED
          </span>
        );
      case "Corroborated":
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded-xs font-medium">
            CORROBORATED
          </span>
        );
      case "Possible":
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xs">
            POSSIBLE LEAD
          </span>
        );
      case "Unverified":
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-100 text-stone-600 border border-stone-200 rounded-xs">
            UNVERIFIED
          </span>
        );
      case "Disputed":
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-orange-50 text-orange-800 border border-orange-200 rounded-xs">
            DISPUTED
          </span>
        );
      case "Rejected":
        return (
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-red-50 text-red-800 border border-red-200 rounded-xs">
            REJECTED
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-[1700px] mx-auto space-y-5">
      {/* HEADER SECTION */}
      <AdminPageHeader
        label="INTELLIGENCE / RESEARCH WORKSPACE"
        title="Open-Source Research & Investigative Pivots"
        description="Controlled investigator workbench. Organize OSINT discoveries, track source attribution, formulate investigative pivots, and promote findings to formal case files."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/tools"
              className="px-3 py-1.5 bg-white border border-admin-border hover:bg-admin-surface text-admin-text text-xs font-medium rounded-xs transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-admin-accent" />
              <span>Tool Directory</span>
            </Link>

            <button
              onClick={() => setIsAddFindingOpen(true)}
              className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Finding</span>
            </button>
          </div>
        }
      />

      {/* ACTION NOTICE TOAST */}
      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-sm text-xs text-emerald-950 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-medium">{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WORKSPACE CASE CONTEXT BAR */}
      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Active Case Selector */}
          <div>
            <label className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
              Active Matter Reference
            </label>
            <select
              value={selectedCaseRef}
              onChange={(e) => setSelectedCaseRef(e.target.value)}
              className="w-full p-1.5 bg-admin-surface border border-admin-border rounded-xs text-xs font-mono text-admin-text focus:outline-none focus:border-admin-accent"
            >
              {FIXTURE_CASES.map((c) => (
                <option key={c.id} value={c.reference}>
                  {c.reference} — {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div>
            <label className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
              Target Subject
            </label>
            <select
              value={selectedSubjectName}
              onChange={(e) => setSelectedSubjectName(e.target.value)}
              className="w-full p-1.5 bg-admin-surface border border-admin-border rounded-xs text-xs font-medium text-admin-text focus:outline-none focus:border-admin-accent"
            >
              {FIXTURE_SUBJECTS.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.role || "SUBJECT"})
                </option>
              ))}
            </select>
          </div>

          {/* Lead Investigator */}
          <div>
            <label className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
              Investigator Lead
            </label>
            <select
              value={selectedInvestigator}
              onChange={(e) => setSelectedInvestigator(e.target.value)}
              className="w-full p-1.5 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
            >
              {FIXTURE_USERS.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {/* Active Case Link */}
          <div>
            <label className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
              Matter Workspace Link
            </label>
            <div className="flex items-center justify-between p-1.5 bg-admin-surface border border-admin-border rounded-xs">
              <span className="font-mono text-admin-accent font-medium">{selectedCaseRef}</span>
              <Link
                href={`/admin/cases/${selectedCaseRef}`}
                className="text-[11px] text-admin-text hover:text-admin-accent font-medium flex items-center gap-1"
              >
                Go to Matter &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Research Objective Input */}
        <div className="pt-2 border-t border-admin-border-subtle flex flex-col md:flex-row items-start md:items-center gap-2 text-xs">
          <span className="font-mono uppercase text-[10px] text-admin-text-faint whitespace-nowrap">
            Research Objective:
          </span>
          <input
            type="text"
            value={researchObjective}
            onChange={(e) => setResearchObjective(e.target.value)}
            className="flex-1 w-full bg-admin-surface border border-admin-border rounded-xs px-2.5 py-1 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
          />
        </div>
      </div>

      {/* 3-COLUMN INVESTIGATION LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ============================================================== */}
        {/* LEFT COLUMN: SOURCES & PIVOT ENGINE (3 COLS) */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 space-y-4">
          {/* PIVOT SYSTEM PANEL */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-admin-border pb-2">
              <div className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-admin-accent" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                  Investigative Pivots ({pivots.length})
                </h3>
              </div>
              <button
                onClick={() => setIsAddPivotOpen(true)}
                className="text-[11px] text-admin-accent hover:underline font-mono"
              >
                + Add Pivot
              </button>
            </div>

            <p className="text-[11px] text-admin-text-muted leading-relaxed">
              Trace lead transitions across identities, corporate veils, phone handles, and property cadastres.
            </p>

            <div className="space-y-2.5">
              {pivots.map((piv) => (
                <div
                  key={piv.id}
                  className="p-2.5 bg-admin-surface/60 border border-admin-border rounded-xs text-xs space-y-1 hover:border-admin-accent transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-semibold text-admin-accent bg-admin-surface px-1 py-0.5 border border-admin-border-subtle rounded-xs">
                      {piv.pivot_type}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1 rounded-xs ${
                        piv.status === "RESOLVED"
                          ? "bg-emerald-50 text-emerald-800"
                          : piv.status === "CORROBORATING"
                          ? "bg-sky-50 text-sky-800"
                          : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      {piv.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-admin-text-secondary mt-1">
                    <span className="text-admin-text-faint font-mono">From:</span> {piv.input_value}
                  </div>

                  <div className="text-[11px] font-medium text-admin-text">
                    <span className="text-admin-text-faint font-mono">Lead:</span> {piv.output_lead}
                  </div>

                  {piv.target_tool && (
                    <div className="text-[10px] font-mono text-admin-text-muted flex items-center gap-1 pt-1 border-t border-admin-border-subtle">
                      <Link2 className="w-3 h-3 text-admin-text-faint" />
                      <span>Tool: {piv.target_tool}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* VERIFIED SOURCES INVENTORY */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted border-b border-admin-border pb-2 flex items-center justify-between">
              <span>Attributed Sources</span>
              <BookOpen className="w-3.5 h-3.5 text-admin-text-faint" />
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                <span className="font-semibold text-admin-text block">Companies House UK</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Statutory Registry · 05/10/25</span>
              </div>
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                <span className="font-semibold text-admin-text block">HM Land Registry</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Cadastral Deed · 06/10/25</span>
              </div>
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                <span className="font-semibold text-admin-text block">Sharjah Media City (SHAMS)</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Free Zone Portal · 05/10/25</span>
              </div>
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                <span className="font-semibold text-admin-text block">Internet Archive Wayback</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Historical Snapshot · 05/10/25</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CENTRE COLUMN: RESEARCH NOTES & FINDINGS (6 COLS) */}
        {/* ============================================================== */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-admin-border pb-3">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                  Attributed Research Findings ({filteredFindings.length})
                </h3>
                <span className="text-[10px] text-admin-text-muted">
                  Case Filter: <strong className="text-admin-text font-mono">{selectedCaseRef}</strong>
                </span>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 text-xs">
                <select
                  value={filterConfidence}
                  onChange={(e) => setFilterConfidence(e.target.value)}
                  className="p-1 text-xs bg-admin-surface border border-admin-border rounded-xs text-admin-text font-mono"
                >
                  <option value="ALL">All Confidence Ratings</option>
                  {CONFIDENCE_LEVELS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setFilterCaseOnly((v) => !v)}
                  className={`px-2 py-1 text-[10px] font-mono border rounded-xs ${
                    filterCaseOnly
                      ? "bg-admin-accent/15 border-admin-accent text-admin-text"
                      : "bg-admin-surface border-admin-border text-admin-text-muted"
                  }`}
                >
                  {filterCaseOnly ? "Case Scoped" : "All Matters"}
                </button>
              </div>
            </div>

            {/* Findings List */}
            {filteredFindings.length === 0 ? (
              <div className="p-8 text-center text-xs text-admin-text-muted space-y-2">
                <p>No findings recorded under current filter parameters.</p>
                <button
                  onClick={() => setIsAddFindingOpen(true)}
                  className="text-admin-accent hover:underline font-mono"
                >
                  + Log first finding for this case
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFindings.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-admin-border rounded-sm shadow-xs space-y-3 hover:border-admin-border-strong transition-all"
                  >
                    {/* Top Row: Title, Confidence, Access Date */}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-xs text-admin-text">{item.title}</h4>
                          {getConfidenceBadge(item.confidence)}
                        </div>
                        <div className="text-[11px] text-admin-text-muted flex items-center gap-2 mt-0.5">
                          <span>Target: <strong className="text-admin-text">{item.subject_name}</strong></span>
                          <span>·</span>
                          <span className="font-mono">{item.case_reference}</span>
                        </div>
                      </div>

                      <div className="text-right text-[10px] font-mono text-admin-text-muted shrink-0">
                        <div>Accessed: {item.date_accessed}</div>
                        <div className="text-admin-text-faint">Researcher: {item.researcher}</div>
                      </div>
                    </div>

                    {/* Source Attribution Box */}
                    <div className="p-2.5 bg-admin-surface border border-admin-border rounded-xs text-xs space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-medium text-admin-text">{item.source_name}</span>
                        <span className="font-mono text-[10px] text-admin-text-faint">{item.source_type}</span>
                      </div>
                      <a
                        href={item.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] text-admin-accent hover:underline flex items-center gap-1 truncate block"
                      >
                        {item.source_url} <ExternalLink className="w-2.5 h-2.5 inline" />
                      </a>
                    </div>

                    {/* Finding Content */}
                    <div className="text-xs text-admin-text-secondary leading-relaxed bg-white border border-admin-border-subtle p-3 rounded-xs">
                      {item.finding}
                    </div>

                    {/* Notes & Evidence Attachment */}
                    {(item.notes || item.evidence_attachment) && (
                      <div className="space-y-1 text-xs">
                        {item.notes && (
                          <p className="text-[11px] text-amber-900 bg-amber-50/60 p-2 border border-amber-200/60 rounded-xs">
                            <span className="font-semibold font-mono text-[10px] uppercase">Operative Note: </span>
                            {item.notes}
                          </p>
                        )}
                        {item.evidence_attachment && (
                          <div className="text-[10px] font-mono text-admin-text-muted flex items-center gap-1.5 pt-1">
                            <FileCheck className="w-3 h-3 text-emerald-700" />
                            <span>Attachment Reference: {item.evidence_attachment}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ACTION ROW: SAVE TO CASE */}
                    <div className="pt-2 border-t border-admin-border flex flex-wrap justify-between items-center gap-2 text-xs">
                      {item.saved_to_case ? (
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Committed to Case Dossier ({item.linked_entity_type})</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-admin-text-faint">
                          Uncommitted Investigation Lead
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSaveToCase(item.id, "INTELLIGENCE")}
                          className="px-2 py-1 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border text-[10px] font-mono rounded-xs transition-colors"
                          title="Save as Intelligence Dossier Item"
                        >
                          + Intel
                        </button>
                        <button
                          onClick={() => handleSaveToCase(item.id, "EVIDENCE")}
                          className="px-2 py-1 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border text-[10px] font-mono rounded-xs transition-colors"
                          title="Register as Formal Evidence Exhibit"
                        >
                          + Evidence
                        </button>
                        <button
                          onClick={() => handleSaveToCase(item.id, "TIMELINE")}
                          className="px-2 py-1 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border text-[10px] font-mono rounded-xs transition-colors"
                          title="Add to Immutable Matter Chronology"
                        >
                          + Timeline
                        </button>
                        <button
                          onClick={() => handleSaveToCase(item.id, "SUBJECT")}
                          className="px-2 py-1 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border text-[10px] font-mono rounded-xs transition-colors"
                          title="Link Finding to Subject Dossier"
                        >
                          + Subject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: EVIDENCE / ENTITIES / TIMELINE PREVIEW (3 COLS) */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 space-y-4">
          {/* CASE PROMOTED SUMMARY */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-admin-border pb-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                Promoted to Case ({researchItems.filter((i) => i.saved_to_case).length})
              </h3>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded-xs">
                Audited
              </span>
            </div>

            <p className="text-[11px] text-admin-text-muted leading-relaxed">
              Items committed to matter files carry full researcher timestamp, URL source integrity, and corroboration notes.
            </p>

            <div className="space-y-2">
              {researchItems
                .filter((i) => i.saved_to_case)
                .map((comm) => (
                  <div key={comm.id} className="p-2 bg-admin-surface border border-admin-border rounded-xs text-xs space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-admin-accent">{comm.case_reference}</span>
                      <span className="text-admin-text-faint">{comm.linked_entity_type}</span>
                    </div>
                    <p className="font-medium text-admin-text text-[11px] line-clamp-1">{comm.title}</p>
                    <span className="text-[10px] text-admin-text-muted font-mono block">
                      Ref: {comm.evidence_attachment || "Affidavit Note"}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* ACTIVE INVESTIGATIVE ENTITIES */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted border-b border-admin-border pb-2 flex items-center justify-between">
              <span>Identified Entities</span>
              <Layers className="w-3.5 h-3.5 text-admin-text-faint" />
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2 border border-admin-border rounded-xs bg-admin-surface/40">
                <span className="font-semibold text-admin-text block">Arthur Pendelton</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Primary Subject · London NW8</span>
              </div>
              <div className="p-2 border border-admin-border rounded-xs bg-admin-surface/40">
                <span className="font-semibold text-admin-text block">Apex International Logistics FZE</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Target Entity · UAE Free Zone</span>
              </div>
              <div className="p-2 border border-admin-border rounded-xs bg-admin-surface/40">
                <span className="font-semibold text-admin-text block">Oakwood Premier Properties Ltd</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Corporate Asset · Companies House</span>
              </div>
              <div className="p-2 border border-admin-border rounded-xs bg-admin-surface/40">
                <span className="font-semibold text-admin-text block">Julian Vance</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Evasive Director · Ascot Address</span>
              </div>
            </div>
          </div>

          {/* NO AUTOMATIC SCRAPING GUARANTEE BANNER */}
          <div className="p-3 bg-stone-100 border border-stone-300 rounded-sm space-y-1 text-xs">
            <span className="font-mono font-semibold text-[10px] uppercase text-stone-800 block">
              Governance & Integrity Assurance
            </span>
            <p className="text-[11px] text-stone-700 leading-snug">
              This system does not execute automated background web-scraping or unauthenticated third-party ingestions. All items originate from human investigator research with verifiable statutory or open provenance.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL: LOG NEW RESEARCH FINDING */}
      {/* ============================================================== */}
      {isAddFindingOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-admin-border pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-admin-text-faint">
                  Investigation Log · {selectedCaseRef}
                </span>
                <h2 className="text-base font-semibold text-admin-text">Record Attributed Finding</h2>
              </div>
              <button
                onClick={() => setIsAddFindingOpen(false)}
                className="text-admin-text-muted hover:text-admin-text p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFinding} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Finding Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Director appointment confirmed on Cyprus corporate register"
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-admin-text mb-1">
                    Source Registry / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSourceName}
                    onChange={(e) => setNewSourceName(e.target.value)}
                    placeholder="e.g. Department of Registrar of Companies (Cyprus)"
                    className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-admin-text mb-1">
                    Source Type
                  </label>
                  <select
                    value={newSourceType}
                    onChange={(e) => setNewSourceType(e.target.value)}
                    className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                  >
                    <option value="Statutory Corporate Registry">Statutory Corporate Registry</option>
                    <option value="Cadastral Land & Property Registry">Cadastral Land & Property Registry</option>
                    <option value="Court / Insolvency Register">Court / Insolvency Register</option>
                    <option value="Public Web Archive Capture">Public Web Archive Capture</option>
                    <option value="Social Media / SOCMINT Observation">Social Media / SOCMINT Observation</option>
                    <option value="Physical Reconnaissance / Eyewitness">Physical Reconnaissance / Eyewitness</option>
                    <option value="Other Open Source Lead">Other Open Source Lead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Source URL *
                </label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://official-registry-url.gov/record"
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs font-mono text-admin-text focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Substantive Finding / Observation *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newFinding}
                  onChange={(e) => setNewFinding(e.target.value)}
                  placeholder="Record factual observation, company number, filing dates, shares, or corroborated quote..."
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-admin-text mb-1">
                    Confidence Rating *
                  </label>
                  <select
                    value={newConfidence}
                    onChange={(e) => setNewConfidence(e.target.value as ResearchConfidence)}
                    className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs font-medium text-admin-text focus:outline-none focus:border-admin-accent"
                  >
                    {CONFIDENCE_LEVELS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-admin-text mb-1">
                    Evidence File / Screenshot Reference
                  </label>
                  <input
                    type="text"
                    value={newAttachmentRef}
                    onChange={(e) => setNewAttachmentRef(e.target.value)}
                    placeholder="e.g. LandRegistry_BK498112_Title_Capture.pdf"
                    className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs font-mono text-admin-text focus:outline-none focus:border-admin-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Investigator Notes & Operational Significance
                </label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Cross-check against bank statements disclosed in High Court discovery bundle."
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div className="pt-3 border-t border-admin-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddFindingOpen(false)}
                  className="px-3 py-1.5 bg-admin-surface border border-admin-border text-admin-text font-medium rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-admin-text hover:bg-admin-text/90 text-white font-medium rounded-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Finding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD INVESTIGATIVE PIVOT */}
      {/* ============================================================== */}
      {isAddPivotOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-elevated w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-admin-border pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-admin-text-faint">
                  Methodology Engine
                </span>
                <h2 className="text-base font-semibold text-admin-text">New Investigative Pivot</h2>
              </div>
              <button
                onClick={() => setIsAddPivotOpen(false)}
                className="text-admin-text-muted hover:text-admin-text p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePivot} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Pivot Correlation Type *
                </label>
                <select
                  value={newPivotType}
                  onChange={(e) => setNewPivotType(e.target.value as PivotType)}
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs font-mono text-admin-text focus:outline-none focus:border-admin-accent"
                >
                  {PIVOT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Input Seed Artifact / Known Point *
                </label>
                <input
                  type="text"
                  required
                  value={newPivotInput}
                  onChange={(e) => setNewPivotInput(e.target.value)}
                  placeholder="e.g. 14 St. Ann's Square, Manchester / Oakwood Holdings Ltd"
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Output Lead / Generated Transition *
                </label>
                <input
                  type="text"
                  required
                  value={newPivotOutput}
                  onChange={(e) => setNewPivotOutput(e.target.value)}
                  placeholder="e.g. Registered office of 4 subsidiary shell entities"
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Recommended Investigative Tool
                </label>
                <input
                  type="text"
                  value={newPivotTargetTool}
                  onChange={(e) => setNewPivotTargetTool(e.target.value)}
                  placeholder="e.g. Companies House / Maltego / Land Registry"
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div className="pt-3 border-t border-admin-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPivotOpen(false)}
                  className="px-3 py-1.5 bg-admin-surface border border-admin-border text-admin-text font-medium rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-admin-text hover:bg-admin-text/90 text-white font-medium rounded-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Pivot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
