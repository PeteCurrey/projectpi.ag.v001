// ============================================================
// EVIDENCE FIXTURES
// ============================================================

import type { EvidenceItem } from "@/lib/db/types";

export const FIXTURE_EVIDENCE: EvidenceItem[] = [
  {
    id: "evi-001",
    matter_id: "mat-002",
    evidence_type: "FIELD_NOTE",
    title: "Service Attempt 01 — Field Log",
    description: "Detailed field log of first service attempt including time of attendance, property observations, and next steps.",
    collected_at: "2025-10-06T07:45:00.000Z",
    collected_by_user_id: "usr-005",
    source: "Field operative — T. Hardy",
    classification: "CONFIDENTIAL",
    integrity_hash: "a3f2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    status: "ACTIVE",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-10-06T07:50:00.000Z",
    updated_at: "2025-10-06T07:50:00.000Z",
  },
  {
    id: "evi-002",
    matter_id: "mat-001",
    evidence_type: "PHOTOGRAPH",
    title: "Surveillance — Day 3 Subject Photographs",
    description: "Timestamped photographs from Day 3 surveillance operation. 14 photographs, sequential.",
    collected_at: "2025-10-05T14:20:00.000Z",
    collected_by_user_id: "usr-002",
    source: "Surveillance operation — S. Chen",
    classification: "HIGHLY_CONFIDENTIAL",
    integrity_hash: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    status: "ACTIVE",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-10-05T18:30:00.000Z",
    updated_at: "2025-10-05T18:30:00.000Z",
  },
  {
    id: "evi-003",
    matter_id: "mat-003",
    evidence_type: "PUBLIC_RECORD",
    title: "Companies House — Overseas Entity Registration Records",
    description: "Register of Overseas Entities filings and associated documentation for three identified entities.",
    collected_at: "2025-10-03T11:00:00.000Z",
    collected_by_user_id: "usr-002",
    source: "Companies House — public register",
    classification: "CONFIDENTIAL",
    integrity_hash: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    status: "ACTIVE",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-10-03T11:30:00.000Z",
    updated_at: "2025-10-03T11:30:00.000Z",
  },
  {
    id: "evi-004",
    matter_id: "mat-001",
    evidence_type: "SCREENSHOT",
    title: "LinkedIn Profile — Subject Professional History",
    description: "Captured LinkedIn profile showing employment history inconsistent with provided CV. Screenshot with timestamp.",
    collected_at: "2025-09-20T10:15:00.000Z",
    collected_by_user_id: "usr-002",
    source: "OSINT — LinkedIn public profile",
    classification: "CONFIDENTIAL",
    integrity_hash: "d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    status: "ACTIVE",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-09-20T10:30:00.000Z",
    updated_at: "2025-09-20T10:30:00.000Z",
  },
  {
    id: "evi-005",
    matter_id: "mat-005",
    evidence_type: "VIDEO",
    title: "Surveillance Video — Day 2",
    description: "Dashcam and covert video footage from Day 2 surveillance. Duration: 4h 22m. Subject observed engaging in physical activity inconsistent with claim.",
    collected_at: "2025-10-04T17:00:00.000Z",
    collected_by_user_id: "usr-003",
    source: "Covert surveillance — J. Whitfield",
    classification: "HIGHLY_CONFIDENTIAL",
    integrity_hash: "e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    status: "ACTIVE",
    visibility: "RESTRICTED",
    retention_status: "ACTIVE",
    created_at: "2025-10-04T17:30:00.000Z",
    updated_at: "2025-10-04T17:30:00.000Z",
  },
  {
    id: "evi-006",
    matter_id: "mat-004",
    evidence_type: "DATABASE_RESULT",
    title: "Litigation Search — Target Entity & Directors",
    description: "Court records search results: County Court judgments, High Court proceedings, and regulatory actions for target entity and named directors.",
    collected_at: "2025-10-05T14:00:00.000Z",
    collected_by_user_id: "usr-003",
    source: "Court records database search",
    classification: "CONFIDENTIAL",
    integrity_hash: undefined,
    status: "ACTIVE",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-10-05T14:15:00.000Z",
    updated_at: "2025-10-05T14:15:00.000Z",
  },
];

export function getEvidenceById(id: string): EvidenceItem | undefined {
  return FIXTURE_EVIDENCE.find((e) => e.id === id);
}

export function getEvidenceByCase(matterId: string): EvidenceItem[] {
  return FIXTURE_EVIDENCE.filter((e) => e.matter_id === matterId);
}

export function getEvidenceAwaitingReview(): EvidenceItem[] {
  // Evidence without an integrity hash has not yet been verified
  return FIXTURE_EVIDENCE.filter((e) => !e.integrity_hash && e.status === "ACTIVE");
}
