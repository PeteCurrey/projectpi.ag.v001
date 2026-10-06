// ============================================================
// DATA RETENTION POLICIES
// Private Intelligence & Investigations Platform
// ============================================================

export type RetentionState =
  | "ACTIVE"              // Normal operational state
  | "RETENTION_PERIOD"    // Within mandatory retention window
  | "SCHEDULED_REVIEW"    // Due for human review decision
  | "LEGAL_HOLD"          // Exempt from destruction — litigation or regulatory
  | "ARCHIVED"            // Read-only; accessible but no further operations
  | "DESTRUCTION_DUE"     // Scheduled for destruction, awaiting confirmation
  | "DESTROYED";          // Audit record remains; content destroyed

export type EntityType =
  | "CASE"
  | "EVIDENCE"
  | "DOCUMENT"
  | "ENQUIRY"
  | "SUBJECT"
  | "INTELLIGENCE"
  | "FINANCIAL";

export interface RetentionPolicy {
  entityType: EntityType;
  label: string;
  /** Retention period in days from the trigger event */
  retentionPeriodDays: number;
  /** The event that starts the retention clock */
  retentionTrigger:
    | "CASE_CLOSED"
    | "ENQUIRY_CLOSED"
    | "RECORD_CREATED"
    | "INVOICE_ISSUED";
  legalBasis: string;
  notes?: string;
  /** Whether the system can auto-archive (still requires human confirmation for destruction) */
  autoArchive: boolean;
  /** Whether human approval is required before destruction */
  requiresHumanApproval: boolean;
}

/**
 * Default UK PI firm retention policies.
 *
 * These are sensible defaults based on typical UK legal/regulatory requirements.
 * Review with your legal counsel and DPA obligations before production deployment.
 *
 * TODO: Make these configurable in the admin system settings.
 */
export const DEFAULT_RETENTION_POLICIES: RetentionPolicy[] = [
  {
    entityType: "CASE",
    label: "Case Files",
    retentionPeriodDays: 7 * 365, // 7 years
    retentionTrigger: "CASE_CLOSED",
    legalBasis: "Limitation Act 1980 — 6-year limitation period plus 1 year buffer; contractual obligations",
    autoArchive: true,
    requiresHumanApproval: true,
  },
  {
    entityType: "EVIDENCE",
    label: "Evidence Files",
    retentionPeriodDays: 7 * 365, // 7 years
    retentionTrigger: "CASE_CLOSED",
    legalBasis: "Retained with parent case file; chain of custody must be preserved",
    notes: "Never destroy evidence subject to legal proceedings or potential proceedings",
    autoArchive: true,
    requiresHumanApproval: true,
  },
  {
    entityType: "ENQUIRY",
    label: "Enquiries (Not Converted)",
    retentionPeriodDays: 2 * 365, // 2 years
    retentionTrigger: "ENQUIRY_CLOSED",
    legalBasis: "GDPR Article 17 — minimal retention of contact data; legitimate interest for business records",
    notes: "Enquiries that converted to cases follow the CASE policy",
    autoArchive: true,
    requiresHumanApproval: false,
  },
  {
    entityType: "FINANCIAL",
    label: "Financial Records (Invoices, Payments)",
    retentionPeriodDays: 7 * 365, // 7 years
    retentionTrigger: "INVOICE_ISSUED",
    legalBasis: "Companies Act 2006 s.388 — accounting records 6 years minimum; HMRC guidance 7 years",
    autoArchive: false,
    requiresHumanApproval: true,
  },
  {
    entityType: "DOCUMENT",
    label: "Case Documents",
    retentionPeriodDays: 7 * 365, // 7 years
    retentionTrigger: "CASE_CLOSED",
    legalBasis: "Retained with parent case file",
    autoArchive: true,
    requiresHumanApproval: true,
  },
  {
    entityType: "SUBJECT",
    label: "Subject Intelligence Records",
    retentionPeriodDays: 7 * 365, // 7 years
    retentionTrigger: "CASE_CLOSED",
    legalBasis: "GDPR Article 17; PI-specific data minimisation obligations; retained with case",
    notes: "Subject data not linked to an open case must be reviewed for necessity",
    autoArchive: true,
    requiresHumanApproval: true,
  },
];

/**
 * Calculates the destruction due date for a record given its closed date.
 */
export function calculateRetentionDeadline(
  closedAt: Date,
  policy: RetentionPolicy
): Date {
  const deadline = new Date(closedAt);
  deadline.setDate(deadline.getDate() + policy.retentionPeriodDays);
  return deadline;
}

/**
 * Returns the appropriate retention state given the current date and policy.
 */
export function getRetentionState(
  closedAt: Date | null,
  destructionDueAt: Date | null,
  isOnLegalHold: boolean,
  isArchived: boolean,
  isDestroyed: boolean
): RetentionState {
  if (isDestroyed) return "DESTROYED";
  if (isOnLegalHold) return "LEGAL_HOLD";
  if (isArchived) {
    if (destructionDueAt && new Date() >= destructionDueAt) return "DESTRUCTION_DUE";
    return "ARCHIVED";
  }
  if (closedAt) return "RETENTION_PERIOD";
  return "ACTIVE";
}

/** Human-readable label for each retention state. */
export const RETENTION_STATE_LABELS: Record<RetentionState, string> = {
  ACTIVE: "Active",
  RETENTION_PERIOD: "Retention Period",
  SCHEDULED_REVIEW: "Scheduled Review",
  LEGAL_HOLD: "Legal Hold",
  ARCHIVED: "Archived",
  DESTRUCTION_DUE: "Destruction Due",
  DESTROYED: "Destroyed",
};
