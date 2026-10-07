// ============================================================
// MATTER MESSAGE FIXTURES
// Internal and client communication threads for Matter workspaces
// ============================================================

import type { MatterMessage } from "@/lib/db/types";

export const FIXTURE_MESSAGES: MatterMessage[] = [
  {
    id: "msg-001",
    matter_id: "mat-001",
    sender_user_id: "usr-002",
    recipient_scope: "INTERNAL",
    subject: "Surveillance log ready for legal review",
    message: "Day 3 surveillance logs and photographic evidence have been compiled and hashed. The subject met an unidentified male at 14:15. Reviewing footage against vendor company directors.",
    has_attachments: true,
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-05T19:15:00.000Z",
  },
  {
    id: "msg-002",
    matter_id: "mat-001",
    sender_user_id: "usr-004",
    recipient_scope: "INTERNAL",
    subject: "Re: Surveillance log ready for legal review",
    message: "Noted. Ensure all third-party vehicle registrations captured in background are blurred prior to disclosure bundle assembly.",
    has_attachments: false,
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-05T19:45:00.000Z",
  },
  {
    id: "msg-003",
    matter_id: "mat-002",
    sender_user_id: "usr-005",
    recipient_scope: "INTERNAL",
    subject: "Service Attempt 01 Outcome & Next Slot",
    message: "Attended Battersea premises at 07:30. Concierge confirmed resident occupies unit but refused access to floor. Pre-dawn approach scheduled for tomorrow at 05:45.",
    has_attachments: true,
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-06T08:00:00.000Z",
  },
  {
    id: "msg-004",
    matter_id: "mat-003",
    sender_user_id: "usr-002",
    recipient_scope: "INTERNAL",
    subject: "BVI Registry Response received",
    message: "Certified extract confirms nominee directorship matches disclosure from 2023 litigation. Preparing cross-reference table for interim report.",
    has_attachments: false,
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-04T11:20:00.000Z",
  },
  {
    id: "msg-005",
    matter_id: "mat-001",
    sender_user_id: "usr-004",
    recipient_scope: "CLIENT",
    subject: "Interim Operational Update — Phase 1 Fieldwork Completed",
    message: "Phase 1 forensic and intelligence fieldwork has completed on schedule. We are assembling the preliminary factual briefing note for the instruction partners.",
    has_attachments: false,
    visibility: "CLIENT_VISIBLE",
    created_at: "2025-10-06T09:00:00.000Z",
  },
];

export function getMessagesByMatter(matterId: string): MatterMessage[] {
  return FIXTURE_MESSAGES.filter((m) => m.matter_id === matterId);
}
