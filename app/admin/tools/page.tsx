"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  ExternalLink,
  BookOpen,
  Star,
  Search,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Info,
  SlidersHorizontal,
  ChevronDown,
  X,
  FileCheck,
} from "lucide-react";
import AdminPageHeader from "../components/AdminPageHeader";
import {
  ToolEntity,
  TOOL_CATEGORIES,
  INITIAL_TOOLS,
  ToolCategory,
  ToolStatus,
  ToolAccessType,
} from "@/lib/admin/tools/data";

interface RecentUseRecord {
  tool_id: string;
  name: string;
  timestamp: string;
}

export default function InvestigatorToolkitDirectory() {
  const [tools] = useState<ToolEntity[]>(INITIAL_TOOLS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedAccessType, setSelectedAccessType] = useState<string>("ALL");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [favourites, setFavourites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pi_tool_favourites");
        return saved ? JSON.parse(saved) : ["tool-001", "tool-004", "tool-020", "tool-025"];
      } catch {
        return ["tool-001", "tool-004", "tool-020", "tool-025"];
      }
    }
    return ["tool-001", "tool-004", "tool-020", "tool-025"];
  });

  const [recentUses, setRecentUses] = useState<RecentUseRecord[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pi_tool_recent");
        return saved ? JSON.parse(saved) : [
          { tool_id: "tool-020", name: "Companies House", timestamp: "Today, 14:15" },
          { tool_id: "tool-004", name: "OSINT Industries", timestamp: "Today, 11:30" },
          { tool_id: "tool-025", name: "WebPreserver", timestamp: "Yesterday, 16:40" },
        ];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [activeModalTool, setActiveModalTool] = useState<ToolEntity | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pi_tool_favourites", JSON.stringify(favourites));
    }
  }, [favourites]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pi_tool_recent", JSON.stringify(recentUses));
    }
  }, [recentUses]);

  const toggleFavourite = (toolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavourites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const handleOpenTool = (tool: ToolEntity) => {
    const record: RecentUseRecord = {
      tool_id: tool.tool_id,
      name: tool.name,
      timestamp: "Just now",
    };
    setRecentUses((prev) => [record, ...prev.filter((r) => r.tool_id !== tool.tool_id)].slice(0, 5));
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  // Filter logic
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesCategory = tool.category.toLowerCase().includes(q);
        const matchesUse = tool.primary_use.toLowerCase().includes(q);
        const matchesSlug = tool.slug.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesUse && !matchesSlug) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "ALL" && tool.category !== selectedCategory) {
        return false;
      }

      // Access type filter
      if (selectedAccessType !== "ALL" && tool.access_type !== selectedAccessType) {
        return false;
      }

      // Featured filter
      if (onlyFeatured && !tool.is_featured) {
        return false;
      }

      // Favourite filter
      if (onlyFavourites && !favourites.includes(tool.tool_id)) {
        return false;
      }

      return true;
    });
  }, [tools, searchQuery, selectedCategory, selectedAccessType, onlyFeatured, onlyFavourites, favourites]);

  const favouriteToolsList = useMemo(() => {
    return tools.filter((t) => favourites.includes(t.tool_id));
  }, [tools, favourites]);

  const getStatusBadge = (status: ToolStatus) => {
    switch (status) {
      case "Active":
        return <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs">Operational</span>;
      case "Review":
        return <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xs">Review Required</span>;
      case "Unavailable":
        return <span className="text-[10px] font-mono px-1.5 py-0.5 bg-red-50 text-red-800 border border-red-200 rounded-xs">Unavailable</span>;
      case "Retired":
        return <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-100 text-stone-600 border border-stone-200 rounded-xs">Retired</span>;
    }
  };

  return (
    <div className="p-6 max-w-[1700px] mx-auto space-y-6">
      <AdminPageHeader
        label="INVESTIGATOR TOOLKIT / OSINT LAUNCHPAD"
        title="Authorised External Research Directory"
        description="Unified launchpad for verified OSINT directories, statutory registries, and digital investigative utilities. Intelligence stays within lawful local workflows."
      />

      {/* COMPLIANCE & LEGAL NOTICE */}
      <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-sm flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <p className="font-semibold uppercase tracking-wider font-mono text-[11px]">
            Statutory Compliance & External Processing Directive
          </p>
          <p className="text-admin-text-secondary leading-relaxed">
            External tool findings represent <strong>investigative leads only</strong> and require independent statutory corroboration. Do not transmit client confidential data or unredacted target identifiers to third-party web services without documented legal justification under the Data Protection Act 2018 (DPA) and GDPR Article 6(1)(f).
          </p>
        </div>
      </div>

      {/* TOP PANELS: MY TOOLKIT & RECENTLY USED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MY TOOLKIT (FAVOURITES) */}
        <div className="lg:col-span-2 bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-admin-border pb-2.5">
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                My Toolkit ({favouriteToolsList.length})
              </h2>
            </div>
            <span className="text-[10px] font-mono text-admin-text-faint">Persistent Quick Launch</span>
          </div>

          {favouriteToolsList.length === 0 ? (
            <p className="text-xs text-admin-text-muted py-2">
              No favourites marked. Click the star icon on any tool card below to pin it here.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {favouriteToolsList.map((tool) => (
                <div
                  key={tool.tool_id}
                  onClick={() => handleOpenTool(tool)}
                  className="p-2.5 bg-admin-surface border border-admin-border rounded-xs hover:border-admin-accent transition-colors cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-xs text-admin-text truncate group-hover:text-admin-accent">
                      {tool.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-admin-text-faint group-hover:text-admin-accent shrink-0" />
                  </div>
                  <span className="text-[10px] font-mono text-admin-text-muted truncate mt-1">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECENTLY USED */}
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-admin-border pb-2.5">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-admin-text-muted" />
              <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                Recently Used
              </h2>
            </div>
            <span className="text-[10px] font-mono text-admin-text-faint">Local Activity Log</span>
          </div>

          {recentUses.length === 0 ? (
            <p className="text-xs text-admin-text-muted py-2">No tools launched this session.</p>
          ) : (
            <ul className="space-y-2">
              {recentUses.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center text-xs p-1.5 rounded-xs bg-admin-surface/40 border border-admin-border/50">
                  <span className="font-medium text-admin-text truncate">{item.name}</span>
                  <span className="text-[10px] font-mono text-admin-text-muted">{item.timestamp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-faint" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword: email, face, username, camera, company, vehicle, image, archive..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-admin-surface border border-admin-border rounded-xs focus:outline-none focus:border-admin-accent placeholder:text-admin-text-faint font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint hover:text-admin-text text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Category Select */}
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-admin-surface border border-admin-border rounded-xs focus:outline-none focus:border-admin-accent font-sans text-admin-text"
            >
              <option value="ALL">All Categories ({tools.length})</option>
              {TOOL_CATEGORIES.map((cat) => {
                const count = tools.filter((t) => t.category === cat).length;
                return (
                  <option key={cat} value={cat}>
                    {cat} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Access Filter */}
          <div className="w-full md:w-44">
            <select
              value={selectedAccessType}
              onChange={(e) => setSelectedAccessType(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-admin-surface border border-admin-border rounded-xs focus:outline-none focus:border-admin-accent font-sans text-admin-text"
            >
              <option value="ALL">All Access Types</option>
              <option value="Free / Open">Free / Open</option>
              <option value="Freemium">Freemium</option>
              <option value="Subscription">Subscription</option>
              <option value="Restricted">Restricted</option>
            </select>
          </div>
        </div>

        {/* Filter Badges / Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-admin-border-subtle text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlyFavourites((v) => !v)}
              className={`px-2.5 py-1 rounded-xs border text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                onlyFavourites
                  ? "bg-amber-50 text-amber-900 border-amber-300 font-medium"
                  : "bg-admin-surface border-admin-border text-admin-text-secondary hover:bg-admin-hover"
              }`}
            >
              <Star className={`w-3 h-3 ${onlyFavourites ? "fill-amber-400 text-amber-500" : ""}`} />
              Only Favourites
            </button>

            <button
              onClick={() => setOnlyFeatured((v) => !v)}
              className={`px-2.5 py-1 rounded-xs border text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                onlyFeatured
                  ? "bg-admin-accent/15 text-admin-text border-admin-accent font-medium"
                  : "bg-admin-surface border-admin-border text-admin-text-secondary hover:bg-admin-hover"
              }`}
            >
              Featured Only
            </button>

            {(searchQuery || selectedCategory !== "ALL" || selectedAccessType !== "ALL" || onlyFeatured || onlyFavourites) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                  setSelectedAccessType("ALL");
                  setOnlyFeatured(false);
                  setOnlyFavourites(false);
                }}
                className="text-[11px] text-admin-accent hover:underline font-mono px-2"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono text-admin-text-muted">
            Displaying <strong className="text-admin-text">{filteredTools.length}</strong> of {tools.length} verified tools
          </div>
        </div>
      </div>

      {/* UNIFORM TOOL CARDS GRID */}
      {filteredTools.length === 0 ? (
        <div className="bg-white border border-admin-border rounded-sm p-12 text-center space-y-2">
          <p className="text-sm font-medium text-admin-text">No tools match your active filter criteria.</p>
          <p className="text-xs text-admin-text-muted">
            Try broadening your search term or selecting &ldquo;All Categories&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => {
            const isFav = favourites.includes(tool.tool_id);
            return (
              <div
                key={tool.tool_id}
                className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 flex flex-col justify-between hover:border-admin-border-strong transition-all space-y-3"
              >
                {/* Header: Name + Favourite */}
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-admin-text-faint block">
                        {tool.category}
                      </span>
                      <h3 className="text-xs font-semibold text-admin-text mt-0.5 tracking-tight">
                        {tool.name}
                      </h3>
                    </div>

                    <button
                      onClick={(e) => toggleFavourite(tool.tool_id, e)}
                      title={isFav ? "Remove from favourites" : "Add to favourites"}
                      className="p-1 hover:bg-admin-surface rounded-xs transition-colors shrink-0"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          isFav ? "fill-amber-400 text-amber-500" : "text-admin-text-faint hover:text-admin-text"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {getStatusBadge(tool.status)}
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-admin-surface border border-admin-border text-admin-text-secondary rounded-xs">
                      {tool.access_type}
                    </span>
                    {tool.requires_subscription && (
                      <span className="text-[9px] font-mono px-1 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xs">
                        Paid Sub
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-admin-text-secondary leading-relaxed mt-2.5 line-clamp-2">
                    {tool.description}
                  </p>

                  {/* Primary Use Box */}
                  <div className="mt-2.5 p-2 bg-admin-surface/50 border border-admin-border-subtle rounded-xs">
                    <span className="text-[9px] font-mono uppercase text-admin-text-faint block">
                      Best For:
                    </span>
                    <p className="text-[11px] text-admin-text-secondary leading-snug line-clamp-2 mt-0.5">
                      {tool.primary_use}
                    </p>
                  </div>
                </div>

                {/* Footer Controls & Governance */}
                <div className="pt-2 border-t border-admin-border space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenTool(tool)}
                      className="flex-1 py-1.5 bg-admin-text hover:bg-admin-text/90 text-white text-xs font-medium rounded-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Open Tool</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => setActiveModalTool(tool)}
                      className="px-2.5 py-1.5 bg-admin-surface hover:bg-admin-hover text-admin-text border border-admin-border text-xs font-medium rounded-xs transition-colors flex items-center justify-center gap-1"
                      title="Governance, Notes & Details"
                    >
                      <Info className="w-3 h-3 text-admin-text-muted" />
                      <span>Details</span>
                    </button>
                  </div>

                  {/* Disclaimer banner */}
                  <p className="text-[9px] text-admin-text-faint font-mono leading-tight">
                    Results are investigative leads and require independent corroboration.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL & GOVERNANCE MODAL */}
      {activeModalTool && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-elevated w-full max-w-xl max-h-[90vh] overflow-y-auto space-y-4 p-6">
            <div className="flex justify-between items-start border-b border-admin-border pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-admin-text-faint">
                  {activeModalTool.category}
                </span>
                <h2 className="text-base font-semibold text-admin-text">{activeModalTool.name}</h2>
              </div>
              <button
                onClick={() => setActiveModalTool(null)}
                className="text-admin-text-muted hover:text-admin-text p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-mono uppercase text-[10px] text-admin-text-faint">Operational Description</h4>
                <p className="text-admin-text-secondary leading-relaxed mt-0.5">{activeModalTool.description}</p>
              </div>

              <div>
                <h4 className="font-mono uppercase text-[10px] text-admin-text-faint">Primary Investigative Application</h4>
                <p className="text-admin-text-secondary leading-relaxed mt-0.5">{activeModalTool.primary_use}</p>
              </div>

              {activeModalTool.notes && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 text-amber-950 rounded-xs space-y-1">
                  <span className="font-mono font-semibold text-[10px] uppercase block tracking-wider">
                    Administrator Guidance & Methodological Note:
                  </span>
                  <p className="leading-relaxed">{activeModalTool.notes}</p>
                </div>
              )}

              {/* Governance Matrix */}
              <div className="bg-admin-surface border border-admin-border p-3 rounded-xs space-y-2">
                <h4 className="font-mono uppercase text-[10px] text-admin-text-faint border-b border-admin-border pb-1">
                  Tool Governance & Risk Classification
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-admin-text-muted block">Risk Level:</span>
                    <span className="font-medium text-admin-text">{activeModalTool.risk_level}</span>
                  </div>
                  <div>
                    <span className="text-admin-text-muted block">Classification:</span>
                    <span className="font-medium text-admin-text">{activeModalTool.internal_risk_classification || "Standard OSINT"}</span>
                  </div>
                  <div>
                    <span className="text-admin-text-muted block">Last Operational Check:</span>
                    <span className="font-mono text-admin-text">{activeModalTool.last_checked_at || "Verified"}</span>
                  </div>
                  <div>
                    <span className="text-admin-text-muted block">Approved By:</span>
                    <span className="font-medium text-admin-text">{activeModalTool.approved_by || "David Mercer"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-admin-border flex justify-end gap-2 text-xs">
              {activeModalTool.documentation_url && (
                <a
                  href={activeModalTool.documentation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-admin-border bg-admin-surface hover:bg-admin-hover text-admin-text font-medium rounded-xs flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Documentation
                </a>
              )}
              <button
                onClick={() => {
                  handleOpenTool(activeModalTool);
                  setActiveModalTool(null);
                }}
                className="px-4 py-1.5 bg-admin-text hover:bg-admin-text/90 text-white font-medium rounded-xs flex items-center gap-1.5"
              >
                <span>Launch Tool</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
