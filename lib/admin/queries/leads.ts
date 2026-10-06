// ============================================================
// LEAD QUERY UTILITIES
// ============================================================

import { FIXTURE_LEADS } from "@/lib/admin/fixtures";
import type { Enquiry } from "@/lib/db/types";
import { getUserById, getClientById } from "@/lib/admin/fixtures";

export interface LeadDetail {
  enquiry: Enquiry;
  assigneeName?: string;
  convertedCaseReference?: string;
}

/**
 * Returns full lead detail by ID.
 * TODO: Replace with DB query.
 */
export function getLeadDetail(id: string): LeadDetail | null {
  const enquiry = FIXTURE_LEADS.find((l) => l.id === id);
  if (!enquiry) return null;

  const assignee = enquiry.assigned_to
    ? getUserById(enquiry.assigned_to)
    : null;

  // TODO: Look up converted case reference from DB
  const convertedCaseReference = enquiry.converted_to_matter_id
    ? `MAT-2501-${enquiry.converted_to_matter_id.replace("mat-", "00")}`
    : undefined;

  return {
    enquiry,
    assigneeName: assignee?.name,
    convertedCaseReference,
  };
}

/**
 * Returns leads by status.
 */
export function getLeadsByStatus(status: string): Enquiry[] {
  return FIXTURE_LEADS.filter((l) => l.status === status);
}

/**
 * Returns all unique enquiry types.
 */
export function getEnquiryTypes(): string[] {
  return [...new Set(FIXTURE_LEADS.map((l) => l.enquiry_type))];
}
