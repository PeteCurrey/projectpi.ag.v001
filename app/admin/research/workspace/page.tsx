"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Plus,
  GitBranch,
  FileCheck,
  CheckCircle2,
  Layers,
  Link2,
  BookOpen,
  X,
  Save,
  Filter,
  History,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import {
  ResearchItem,
  ResearchPivot,
  ResearchConfidence,
  PivotType,
  PIVOT_OPTIONS,
  CONFIDENCE_LEVELS,
} from "@/lib/admin/research/data";
import { FIXTURE_CASES } from "@/lib/admin/fixtures/cases";
import { FIXTURE_SUBJECTS } from "@/lib/admin/fixtures/subjects";

interface Props {
  initialCaseRef?: string;
  initialFindings?: ResearchItem[];
  initialPivots?: ResearchPivot[];
  initialObjective?: string;
}

export default function DedicatedResearchWorkspacePage({
  initialCaseRef,
  initialFindings,
  initialPivots,
  initialObjective,
}: Props) {
  // Session Header Context state
  const [selectedCaseRef, setSelectedCaseRef] = useState<string>(
    initialCaseRef || "MAT-2501-001"
  );

  // Derive relevant subjects for the active matter
  const activeMatter = useMemo(
    () => FIXTURE_CASES.find((c) => c.reference.toUpperCase() === selectedCaseRef.toUpperCase()),
    [selectedCaseRef]
  );

  const availableSubjects = useMemo(() => {
    if (!activeMatter) return FIXTURE_SUBJECTS;
    return FIXTURE_SUBJECTS.filter((s) => s.matter_id === activeMatter.id);
  }, [activeMatter]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("ALL");

  // Research Objective state
  const [researchObjective, setResearchObjective] = useState<string>(
    initialObjective ||
      "Trace beneficial overseas corporate holdings, hidden directorships, and undisclosed property assets."
  );
  const [isSavingObjective, setIsSavingObjective] = useState(false);
  const [objectiveChangeReason, setObjectiveChangeReason] = useState("");
  const [showObjectiveHistoryModal, setShowObjectiveHistoryModal] = useState(false);

  // Findings & Pivots state
  const [researchItems, setResearchItems] = useState<ResearchItem[]>(initialFindings || []);
  const [pivots, setPivots] = useState<ResearchPivot[]>(initialPivots || []);

  // Filter state
  const [filterConfidence, setFilterConfidence] = useState<string>("ALL");
  const [filterSourceType, setFilterSourceType] = useState<string>("ALL");
  const [filterPromotedState, setFilterPromotedState] = useState<string>("ALL");

  // Loading & notification states
  const [actionNotice, setActionNotice] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Finding Modal State
  const [isAddFindingOpen, setIsAddFindingOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceType, setNewSourceType] = useState("Statutory Corporate Registry");
  const [newFinding, setNewFinding] = useState("");
  const [newConfidence, setNewConfidence] = useState<ResearchConfidence>("Corroborated");
  const [newNotes, setNewNotes] = useState("");
  const [newAttachmentRef, setNewAttachmentRef] = useState("");
  const [newFindingSubjectIds, setNewFindingSubjectIds] = useState<string[]>([]);

  // New Pivot Modal State
  const [isAddPivotOpen, setIsAddPivotOpen] = useState(false);
  const [newPivotType, setNewPivotType] = useState<PivotType>("Company → Director");
  const [newPivotInput, setNewPivotInput] = useState("");
  const [newPivotOutput, setNewPivotOutput] = useState("");
  const [newPivotTargetTool, setNewPivotTargetTool] = useState("Companies House");
  const [newPivotNotes, setNewPivotNotes] = useState("");

  const showNotification = (msg: string, type: "success" | "error" = "success") => {
    setActionNotice({ msg, type });
    setTimeout(() => setActionNotice(null), 4500);
  };

  // Synchronize when matter changes (if in global mode)
  const handleCaseChange = async (newRef: string) => {
    setSelectedCaseRef(newRef);
    setSelectedSubjectId("ALL");
    try {
      const res = await fetch(`/api/admin/research/findings?case=${newRef}`);
      const data = await res.json();
      if (data.success) {
        setResearchItems(data.data);
      }

      const pivRes = await fetch(`/api/admin/research/pivots?case=${newRef}`);
      const pivData = await pivRes.json();
      if (pivData.success) {
        setPivots(pivData.data);
      }

      const objRes = await fetch(`/api/admin/research/objective?case=${newRef}`);
      const objData = await objRes.json();
      if (objData.success && objData.data.current) {
        setResearchObjective(objData.data.current.objective);
      }
    } catch {
      // Fallback
    }
  };

  const handleSaveObjective = async () => {
    if (!researchObjective.trim()) return;
    setIsSavingObjective(true);
    try {
      const res = await fetch("/api/admin/research/objective", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          case_reference: selectedCaseRef,
          objective: researchObjective,
          change_reason: objectiveChangeReason || "Investigator instruction refinement",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update objective");
      }
      showNotification(`Research objective updated and versioned for ${selectedCaseRef}`);
      setObjectiveChangeReason("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving objective";
      showNotification(msg, "error");
    } finally {
      setIsSavingObjective(false);
    }
  };

  const handleCreateFinding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newFinding.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/research/findings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          source_url: newUrl,
          source_name: newSourceName,
          source_type: newSourceType,
          date_accessed: new Date().toISOString().slice(0, 16).replace("T", " "),
          finding: newFinding,
          confidence: newConfidence,
          case_reference: selectedCaseRef,
          subject_name:
            newFindingSubjectIds.length > 0
              ? availableSubjects
                  .filter((s) => newFindingSubjectIds.includes(s.id))
                  .map((s) => s.name)
                  .join(", ")
              : undefined,
          subject_ids: newFindingSubjectIds,
          notes: newNotes,
          evidence_attachment: newAttachmentRef,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to record finding");
      }

      setResearchItems((prev) => [data.data, ...prev]);
      setIsAddFindingOpen(false);
      setNewTitle("");
      setNewUrl("");
      setNewSourceName("");
      setNewFinding("");
      setNewNotes("");
      setNewAttachmentRef("");
      setNewFindingSubjectIds([]);
      showNotification("Finding persisted with full source attribution and audit trail.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving finding";
      showNotification(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreatePivot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPivotInput.trim() || !newPivotOutput.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/research/pivots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          case_reference: selectedCaseRef,
          pivot_type: newPivotType,
          input_value: newPivotInput,
          output_lead: newPivotOutput,
          target_tool: newPivotTargetTool,
          notes: newPivotNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to record pivot");
      }

      setPivots((prev) => [data.data, ...prev]);
      setIsAddPivotOpen(false);
      setNewPivotInput("");
      setNewPivotOutput("");
      setNewPivotNotes("");
      showNotification(`Investigative pivot added: [${newPivotType}]`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving pivot";
      showNotification(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePivotStatus = async (
    pivotId: string,
    newStatus: ResearchPivot["status"]
  ) => {
    try {
      const res = await fetch("/api/admin/research/pivots", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pivotId, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update pivot");
      }

      setPivots((prev) => prev.map((p) => (p.id === pivotId ? data.data : p)));
      showNotification(`Pivot transitioned to ${newStatus}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating pivot";
      showNotification(msg, "error");
    }
  };

  const handlePromoteFinding = async (
    findingId: string,
    target: "INTELLIGENCE" | "EVIDENCE" | "TIMELINE" | "SUBJECT"
  ) => {
    try {
      const res = await fetch("/api/admin/research/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ findingId, target }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Transactional promotion failed");
      }

      setResearchItems((prev) =>
        prev.map((item) =>
          item.id === findingId
            ? {
                ...item,
                saved_to_case: true,
                linked_entity_type: target,
                promoted_entity_id: data.data.promotedEntityId,
              }
            : item
        )
      );

      const labels = {
        INTELLIGENCE: "Created Intelligence Record in Case Dossier",
        EVIDENCE: "Committed as Cryptographic Evidence Exhibit",
        TIMELINE: "Committed to Immutable Case Chronology",
        SUBJECT: "Linked to Subject Profile Dossier",
      };
      showNotification(`Transactional success: ${labels[target]}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Promotion failed";
      showNotification(msg, "error");
    }
  };

  // Filter items
  const filteredFindings = useMemo(() => {
    return researchItems.filter((item) => {
      if (item.case_reference.toUpperCase() !== selectedCaseRef.toUpperCase()) return false;
      if (filterConfidence !== "ALL" && item.confidence !== filterConfidence) return false;
      if (filterSourceType !== "ALL" && item.source_type !== filterSourceType) return false;
      if (filterPromotedState === "PROMOTED" && !item.saved_to_case) return false;
      if (filterPromotedState === "UNCOMMITTED" && item.saved_to_case) return false;
      if (selectedSubjectId !== "ALL") {
        if (!item.subject_ids || !item.subject_ids.includes(selectedSubjectId)) return false;
      }
      return true;
    });
  }, [
    researchItems,
    selectedCaseRef,
    filterConfidence,
    filterSourceType,
    filterPromotedState,
    selectedSubjectId,
  ]);

  // Metric summaries (computed strictly from real data)
  const stats = useMemo(() => {
    const caseFindings = researchItems.filter(
      (i) => i.case_reference.toUpperCase() === selectedCaseRef.toUpperCase()
    );
    const casePivots = pivots.filter(
      (p) => p.case_reference.toUpperCase() === selectedCaseRef.toUpperCase()
    );

    return {
      totalFindings: caseFindings.length,
      verified: caseFindings.filter((i) => i.confidence === "Verified").length,
      corroborated: caseFindings.filter((i) => i.confidence === "Corroborated").length,
      possible: caseFindings.filter((i) => i.confidence === "Possible").length,
      unverified: caseFindings.filter((i) => i.confidence === "Unverified").length,
      disputed: caseFindings.filter((i) => i.confidence === "Disputed").length,
      rejected: caseFindings.filter((i) => i.confidence === "Rejected").length,
      promoted: caseFindings.filter((i) => i.saved_to_case).length,

      totalPivots: casePivots.length,
      openPivots: casePivots.filter((p) => p.status === "OPEN").length,
      corroboratingPivots: casePivots.filter((p) => p.status === "CORROBORATING").length,
      resolvedPivots: casePivots.filter((p) => p.status === "RESOLVED").length,
      deadEnds: casePivots.filter((p) => p.status === "DEAD_END").length,
    };
  }, [researchItems, pivots, selectedCaseRef]);

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
    <div className="p-6 max-w-[1750px] mx-auto space-y-5">
      {/* HEADER SECTION */}
      <AdminPageHeader
        label={`RESEARCH WORKSPACE / ${selectedCaseRef}`}
        title="Open-Source Investigation Workbench"
        description="Controlled investigator launchpad. Organise findings, track immutable source provenance, formulate pivot chains, and execute transactional promotion into case evidence and intelligence."
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
        <div
          className={`p-3 border rounded-sm text-xs flex items-center justify-between shadow-xs ${
            actionNotice.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-red-50 border-red-300 text-red-950"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionNotice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
            )}
            <span className="font-medium">{actionNotice.msg}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-admin-text-faint hover:text-admin-text">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* MATTER CONTEXT & OBJECTIVE BAR */}
      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Matter Selector */}
          <div>
            <label className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
              Active Matter Reference
            </label>
            <select
              value={selectedCaseRef}
              onChange={(e) => handleCaseChange(e.target.value)}
              className="w-full p-1.5 bg-admin-surface border border-admin-border rounded-xs text-xs font-mono font-medium text-admin-text focus:outline-none focus:border-admin-accent"
            >
              {FIXTURE_CASES.map((c) => (
                <option key={c.id} value={c.reference}>
                  {c.reference} — {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
              Scoped Subject Filter
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full p-1.5 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
            >
              <option value="ALL">All Subjects / General Matter ({availableSubjects.length})</option>
              {availableSubjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role || "SUBJECT"})
                </option>
              ))}
            </select>
          </div>

          {/* Authenticated Actor Info */}
          <div>
            <label className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
              Session Investigator
            </label>
            <div className="p-1.5 bg-admin-surface border border-admin-border rounded-xs text-admin-text font-medium text-xs flex justify-between items-center">
              <span>{activeMatter ? "Assigned Lead: " + (activeMatter.lead_investigator_id || "Officer") : "Active Officer"}</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                Authenticated
              </span>
            </div>
          </div>

          {/* Case Navigation link */}
          <div>
            <label className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
              Matter Workspace Link
            </label>
            <div className="flex items-center justify-between p-1.5 bg-admin-surface border border-admin-border rounded-xs">
              <span className="font-mono text-admin-accent font-semibold">{selectedCaseRef}</span>
              <Link
                href={`/admin/cases/${selectedCaseRef}`}
                className="text-[11px] text-admin-text hover:text-admin-accent font-medium"
              >
                Go to Matter &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Research Objective Versioning Row */}
        <div className="pt-2.5 border-t border-admin-border-subtle flex flex-col md:flex-row items-start md:items-center gap-2 text-xs">
          <span className="font-mono uppercase text-[10px] text-admin-text-faint whitespace-nowrap">
            Research Objective:
          </span>
          <input
            type="text"
            value={researchObjective}
            onChange={(e) => setResearchObjective(e.target.value)}
            className="flex-1 w-full bg-admin-surface border border-admin-border rounded-xs px-2.5 py-1 text-xs text-admin-text focus:outline-none focus:border-admin-accent"
          />
          <button
            onClick={handleSaveObjective}
            disabled={isSavingObjective}
            className="px-2.5 py-1 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border rounded-xs font-mono text-[10px] shrink-0"
          >
            {isSavingObjective ? "Saving..." : "Save Objective"}
          </button>
        </div>
      </div>

      {/* COMPACT REAL RESEARCH SUMMARY PANEL */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-admin-border rounded-sm p-3 shadow-xs">
          <span className="text-[10px] font-mono text-admin-text-faint uppercase block">Total Findings</span>
          <div className="text-xl font-serif font-semibold text-admin-text mt-1">{stats.totalFindings}</div>
          <span className="text-[10px] text-emerald-700 font-mono">{stats.promoted} promoted to case</span>
        </div>
        <div className="bg-white border border-admin-border rounded-sm p-3 shadow-xs">
          <span className="text-[10px] font-mono text-admin-text-faint uppercase block">Verified / Corroborated</span>
          <div className="text-xl font-serif font-semibold text-emerald-800 mt-1">
            {stats.verified + stats.corroborated}
          </div>
          <span className="text-[10px] text-admin-text-muted font-mono">{stats.verified} Verified · {stats.corroborated} Corroborated</span>
        </div>
        <div className="bg-white border border-admin-border rounded-sm p-3 shadow-xs">
          <span className="text-[10px] font-mono text-admin-text-faint uppercase block">Possible Leads</span>
          <div className="text-xl font-serif font-semibold text-amber-800 mt-1">{stats.possible}</div>
          <span className="text-[10px] text-amber-700 font-mono">Requires corroboration</span>
        </div>
        <div className="bg-white border border-admin-border rounded-sm p-3 shadow-xs">
          <span className="text-[10px] font-mono text-admin-text-faint uppercase block">Disputed / Rejected</span>
          <div className="text-xl font-serif font-semibold text-red-800 mt-1">{stats.disputed + stats.rejected}</div>
          <span className="text-[10px] text-red-700 font-mono">{stats.rejected} rejected paths</span>
        </div>
        <div className="bg-white border border-admin-border rounded-sm p-3 shadow-xs">
          <span className="text-[10px] font-mono text-admin-text-faint uppercase block">Active Pivots</span>
          <div className="text-xl font-serif font-semibold text-admin-text mt-1">{stats.openPivots + stats.corroboratingPivots}</div>
          <span className="text-[10px] text-admin-text-muted font-mono">{stats.openPivots} open · {stats.corroboratingPivots} pending</span>
        </div>
        <div className="bg-white border border-admin-border rounded-sm p-3 shadow-xs">
          <span className="text-[10px] font-mono text-admin-text-faint uppercase block">Resolved / Dead Ends</span>
          <div className="text-xl font-serif font-semibold text-admin-text mt-1">{stats.resolvedPivots + stats.deadEnds}</div>
          <span className="text-[10px] text-stone-600 font-mono">{stats.deadEnds} dead ends retained</span>
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
              Trace transitions across identities, corporate veils, phone handles, and property records. Failed paths are kept as auditable methodology records.
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
                    <select
                      value={piv.status}
                      onChange={(e) =>
                        handleUpdatePivotStatus(piv.id, e.target.value as ResearchPivot["status"])
                      }
                      className={`text-[9px] font-mono px-1 py-0.5 rounded-xs border cursor-pointer ${
                        piv.status === "RESOLVED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : piv.status === "CORROBORATING"
                          ? "bg-sky-50 text-sky-800 border-sky-200"
                          : piv.status === "DEAD_END"
                          ? "bg-stone-100 text-stone-700 border-stone-300"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="CORROBORATING">CORROBORATING</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="DEAD_END">DEAD_END</option>
                    </select>
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

          {/* VERIFIED ATTRIBUTED SOURCES */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted border-b border-admin-border pb-2 flex items-center justify-between">
              <span>Attributed Statutory Registries</span>
              <BookOpen className="w-3.5 h-3.5 text-admin-text-faint" />
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                <span className="font-semibold text-admin-text block">Companies House (UK)</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Primary Statutory Authority</span>
              </div>
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                <span className="font-semibold text-admin-text block">HM Land Registry</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Cadastral Title Register</span>
              </div>
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                <span className="font-semibold text-admin-text block">Internet Archive Wayback</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Historical Snapshot Provenance</span>
              </div>
              <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                <span className="font-semibold text-admin-text block">Sharjah Media City (SHAMS)</span>
                <span className="text-[10px] font-mono text-admin-text-muted">Overseas Free Zone Register</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CENTRE COLUMN: RESEARCH FINDINGS & PROMOTION (6 COLS) */}
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

              {/* Multi-facet Filter Controls */}
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

                <select
                  value={filterPromotedState}
                  onChange={(e) => setFilterPromotedState(e.target.value)}
                  className="p-1 text-xs bg-admin-surface border border-admin-border rounded-xs text-admin-text font-mono"
                >
                  <option value="ALL">All States</option>
                  <option value="PROMOTED">Promoted Only</option>
                  <option value="UNCOMMITTED">Uncommitted Only</option>
                </select>
              </div>
            </div>

            {/* Findings List */}
            {filteredFindings.length === 0 ? (
              <div className="p-8 text-center text-xs text-admin-text-muted space-y-2">
                <p>No research findings match the current filter criteria for {selectedCaseRef}.</p>
                <button
                  onClick={() => setIsAddFindingOpen(true)}
                  className="text-admin-accent hover:underline font-mono"
                >
                  + Log initial finding for this case
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
                          <span>
                            Target:{" "}
                            <strong className="text-admin-text">
                              {item.subject_name || "Case General / All Subjects"}
                            </strong>
                          </span>
                          <span>·</span>
                          <span className="font-mono text-admin-accent">{item.case_reference}</span>
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

                    {/* ACTION ROW: TRANSACTIONAL PROMOTION CONTROLS */}
                    <div className="pt-2 border-t border-admin-border flex flex-wrap justify-between items-center gap-2 text-xs">
                      {item.saved_to_case ? (
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            Persisted to Case Dossier ({item.linked_entity_type})
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-admin-text-faint">
                          Uncommitted Research Finding
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePromoteFinding(item.id, "INTELLIGENCE")}
                          className="px-2 py-1 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border text-[10px] font-mono rounded-xs transition-colors"
                          title="Save as Intelligence Dossier Item"
                        >
                          + Intel
                        </button>
                        <button
                          onClick={() => handlePromoteFinding(item.id, "EVIDENCE")}
                          className="px-2 py-1 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border text-[10px] font-mono rounded-xs transition-colors"
                          title="Register as Formal Evidence Exhibit"
                        >
                          + Evidence
                        </button>
                        <button
                          onClick={() => handlePromoteFinding(item.id, "TIMELINE")}
                          className="px-2 py-1 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border text-[10px] font-mono rounded-xs transition-colors"
                          title="Add to Immutable Matter Chronology"
                        >
                          + Timeline
                        </button>
                        <button
                          onClick={() => handlePromoteFinding(item.id, "SUBJECT")}
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
                Promoted to Case ({stats.promoted})
              </h3>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded-xs">
                Audited
              </span>
            </div>

            <p className="text-[11px] text-admin-text-muted leading-relaxed">
              Items committed to matter files carry complete researcher timestamps, source integrity hashes, and audit log entries.
            </p>

            <div className="space-y-2">
              {researchItems
                .filter(
                  (i) =>
                    i.case_reference.toUpperCase() === selectedCaseRef.toUpperCase() &&
                    i.saved_to_case
                )
                .map((comm) => (
                  <div key={comm.id} className="p-2 bg-admin-surface border border-admin-border rounded-xs text-xs space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-admin-accent">{comm.case_reference}</span>
                      <span className="text-admin-text-faint">{comm.linked_entity_type}</span>
                    </div>
                    <p className="font-medium text-admin-text text-[11px] line-clamp-1">{comm.title}</p>
                    <span className="text-[10px] text-admin-text-muted font-mono block">
                      Ref: {comm.evidence_attachment || "Affidavit Item"}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* ACTIVE INVESTIGATIVE ENTITIES */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted border-b border-admin-border pb-2 flex items-center justify-between">
              <span>Scoped Subjects ({availableSubjects.length})</span>
              <Layers className="w-3.5 h-3.5 text-admin-text-faint" />
            </h3>

            <div className="space-y-2 text-xs">
              {availableSubjects.map((s) => (
                <div key={s.id} className="p-2 border border-admin-border rounded-xs bg-admin-surface/40">
                  <span className="font-semibold text-admin-text block">{s.name}</span>
                  <span className="text-[10px] font-mono text-admin-text-muted">
                    {s.role} · {s.confidence_rating || "CONFIRMED"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CONTROLLED RESEARCH DIRECTIVE */}
          <div className="p-3 bg-stone-100 border border-stone-300 rounded-sm space-y-1 text-xs">
            <span className="font-mono font-semibold text-[10px] uppercase text-stone-800 block">
              Governance & Integrity Directive
            </span>
            <p className="text-[11px] text-stone-700 leading-snug">
              External tools serve strictly as launchpads for investigative leads. Algorithmic facial search or automated scraper matches never constitute confirmed identity without primary statutory corroboration.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL: LOG NEW ATTRIBUTED FINDING */}
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
                    Target Subject(s) Association
                  </label>
                  <select
                    multiple
                    value={newFindingSubjectIds}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
                      setNewFindingSubjectIds(selected);
                    }}
                    className="w-full p-1.5 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent h-16"
                  >
                    {availableSubjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                <div>
                  <label className="block text-[11px] font-medium text-admin-text mb-1">
                    Investigator Notes & Operational Significance
                  </label>
                  <input
                    type="text"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="e.g. Discrepancy observed against witness statement."
                    className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                  />
                </div>
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
                  disabled={isSubmitting}
                  className="px-4 py-1.5 bg-admin-text hover:bg-admin-text/90 text-white font-medium rounded-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSubmitting ? "Persisting..." : "Save Finding"}
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
                  Methodology Engine · {selectedCaseRef}
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
                  Target Investigative Tool
                </label>
                <input
                  type="text"
                  value={newPivotTargetTool}
                  onChange={(e) => setNewPivotTargetTool(e.target.value)}
                  placeholder="e.g. Companies House / Maltego / Land Registry"
                  className="w-full p-2 bg-admin-surface border border-admin-border rounded-xs text-xs text-admin-text focus:outline-none focus:border-admin-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-admin-text mb-1">
                  Investigative Notes
                </label>
                <input
                  type="text"
                  value={newPivotNotes}
                  onChange={(e) => setNewPivotNotes(e.target.value)}
                  placeholder="e.g. Verify whether nominee directors are registered."
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
                  disabled={isSubmitting}
                  className="px-4 py-1.5 bg-admin-text hover:bg-admin-text/90 text-white font-medium rounded-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {isSubmitting ? "Adding..." : "Add Pivot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
