// ============================================================
// LEAD / ENQUIRY FIXTURES
// ============================================================

import type { Enquiry } from "@/lib/db/types";

export const FIXTURE_LEADS: Enquiry[] = [
  {
    id: "enq-001",
    reference: "ENQ-2510-001",
    status: "INSTRUCTED",
    urgency: "URGENT",
    enquiry_type: "PROCESS_SERVING",
    service_subcategory: "winding-up-petition",
    contact_name: "Charles Sterling",
    contact_email: "c.sterling@sterling-ip.co.uk",
    contact_phone: "+44 113 946 0300",
    organisation_name: "Sterling Insolvency Partners Ltd",
    professional_client_type: "INSOLVENCY_PRACTITIONER",
    narrative: "High Court winding-up petition and statutory demand for personal service on evasive director. Tight court-imposed deadline.",
    deadline_at: "2025-10-10T09:00:00.000Z",
    preferred_contact_method: "TELEPHONE",
    submitted_at: "2025-10-01T08:15:00.000Z",
    reviewed_at: "2025-10-01T09:00:00.000Z",
    assigned_to: "usr-004",
    converted_to_matter_id: "mat-002",
    converted_at: "2025-10-01T09:30:00.000Z",
    retention_status: "ACTIVE",
    created_at: "2025-10-01T08:15:00.000Z",
    updated_at: "2025-10-01T09:30:00.000Z",
  },
  {
    id: "enq-002",
    reference: "ENQ-2510-002",
    status: "INSTRUCTED",
    urgency: "TIME_SENSITIVE",
    enquiry_type: "FRAUD_FINANCIAL",
    service_subcategory: "internal-procurement-fraud",
    contact_name: "Margaret Ashworth",
    contact_email: "m.ashworth@vanceandpartners.co.uk",
    contact_phone: "+44 20 7946 0200",
    organisation_name: "Vance & Partners LLP",
    professional_client_type: "SOLICITOR",
    narrative: "Client suspects procurement officer collusion with overseas vendor. Require discreet investigation before HR confrontation.",
    preferred_contact_method: "EMAIL",
    submitted_at: "2025-09-14T14:30:00.000Z",
    reviewed_at: "2025-09-14T16:00:00.000Z",
    assigned_to: "usr-004",
    converted_to_matter_id: "mat-001",
    converted_at: "2025-09-15T09:00:00.000Z",
    retention_status: "ACTIVE",
    created_at: "2025-09-14T14:30:00.000Z",
    updated_at: "2025-09-15T09:00:00.000Z",
  },
  {
    id: "enq-003",
    reference: "ENQ-2510-003",
    status: "NEW",
    urgency: "STANDARD",
    enquiry_type: "SURVEILLANCE",
    service_subcategory: "insurance-claimant",
    contact_name: "Patricia Norris",
    contact_email: "p.norris@meridian-insurance.co.uk",
    contact_phone: "+44 20 7946 0400",
    organisation_name: "Meridian Insurance Group plc",
    professional_client_type: "INSURER",
    narrative: "Claimant alleging permanent back injury preventing any physical activity. Several social media posts appear inconsistent with claimed severity. Require surveillance assessment.",
    preferred_contact_method: "EMAIL",
    submitted_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    retention_status: "ACTIVE",
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "enq-004",
    reference: "ENQ-2510-004",
    status: "QUALIFIED",
    urgency: "STANDARD",
    enquiry_type: "TRACING",
    service_subcategory: "judgment-debtor",
    contact_name: "Mark Reynolds",
    contact_email: "m.reynolds@reynoldssolicitors.co.uk",
    contact_phone: "+44 161 946 0600",
    organisation_name: "Reynolds & Co Solicitors",
    professional_client_type: "SOLICITOR",
    narrative: "Judgment debtor has vacated known address. Require current residential address for Part 71 order and enforcement proceedings.",
    preferred_contact_method: "EITHER",
    submitted_at: "2025-10-05T10:00:00.000Z",
    reviewed_at: "2025-10-05T11:30:00.000Z",
    assigned_to: "usr-004",
    converted_to_matter_id: "mat-007",
    converted_at: "2025-10-06T09:00:00.000Z",
    retention_status: "ACTIVE",
    created_at: "2025-10-05T10:00:00.000Z",
    updated_at: "2025-10-06T09:00:00.000Z",
  },
  {
    id: "enq-005",
    reference: "ENQ-2510-005",
    status: "NEW",
    urgency: "URGENT",
    enquiry_type: "INTELLIGENCE",
    service_subcategory: "background-due-diligence",
    contact_name: "Richard Thornton",
    contact_email: "r.thornton@thorntoncapital.co.uk",
    contact_phone: "+44 20 7946 0500",
    organisation_name: "Thornton Capital Advisors Ltd",
    professional_client_type: "CORPORATE",
    narrative: "Urgent enhanced due diligence required on a proposed business partner prior to significant transaction. Board meeting in 10 days.",
    preferred_contact_method: "TELEPHONE",
    submitted_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    retention_status: "ACTIVE",
    created_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  },
];

export function getLeadById(id: string): Enquiry | undefined {
  return FIXTURE_LEADS.find((l) => l.id === id);
}

export function getLeadByReference(ref: string): Enquiry | undefined {
  return FIXTURE_LEADS.find((l) => l.reference === ref);
}

export function getNewLeads(): Enquiry[] {
  return FIXTURE_LEADS.filter((l) => l.status === "NEW");
}

export function getOpenLeads(): Enquiry[] {
  return FIXTURE_LEADS.filter(
    (l) => !["INSTRUCTED", "DECLINED", "CLOSED"].includes(l.status)
  );
}
