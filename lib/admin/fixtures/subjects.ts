// ============================================================
// SUBJECT FIXTURES
// Typed placeholder data — replace with DB queries in production.
// ============================================================

import type { MatterSubject } from "@/lib/db/types";

export interface SubjectProfile extends MatterSubject {
  role?: string;
  description?: string;
  aliases?: string[];
  national_insurance_number?: string;
  known_addresses?: string[];
  employer?: string;
  phone_numbers?: string[];
  vehicle_registrations?: string[];
  confidence_rating?: "HIGH" | "MEDIUM" | "LOW" | "UNVERIFIED";
  retention_status?: string;
}

export const FIXTURE_SUBJECTS: SubjectProfile[] = [
  {
    id: "sbj-001",
    matter_id: "mat-001",
    subject_type: "PERSON",
    name: "Arthur Pendelton",
    aliases: ["Artie Pendelton", "A. J. Pendelton"],
    role: "PRIMARY_TARGET",
    description: "Senior Procurement Officer under investigation for vendor collusion and false invoicing.",
    date_of_birth: "1974-05-12",
    national_insurance_number: "QQ 12 34 56 A",
    known_addresses: ["44 St. John's Wood Road, London NW8 7HX"],
    employer: "Vertex Retail Holdings UK",
    phone_numbers: ["+44 7700 900123"],
    vehicle_registrations: ["LG19 XYZ (Mercedes C-Class Silver)"],
    confidence_rating: "HIGH",
    notes: "Subject has established banking and corporate entities in UAE.",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-09-15T09:30:00.000Z",
    updated_at: "2025-10-05T14:10:00.000Z",
  },
  {
    id: "sbj-002",
    matter_id: "mat-002",
    subject_type: "PERSON",
    name: "Julian Vance",
    aliases: ["J. R. Vance"],
    role: "DEFENDANT",
    description: "Company Director evading service of High Court Winding-Up Petition.",
    date_of_birth: "1982-11-23",
    known_addresses: [
      "Flat 12, Riverside Towers, Battersea, London SW11 1AX",
      "Woodland Manor, Ascot SL5 8NQ (Reported Weekend Residence)",
    ],
    employer: "Vance Logistics Group Ltd (In Liquidation)",
    phone_numbers: ["+44 7700 900542"],
    vehicle_registrations: ["RO71 VNC (Porsche Taycan Dark Blue)"],
    confidence_rating: "HIGH",
    notes: "Known security gates and concierge at Battersea address. Pre-dawn attendance suggested.",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-10-01T09:15:00.000Z",
    updated_at: "2025-10-06T08:00:00.000Z",
  },
  {
    id: "sbj-003",
    matter_id: "mat-005",
    subject_type: "PERSON",
    name: "Clara Higgins",
    role: "CLAIMANT",
    description: "Insurance claimant alleging permanent mobility loss and spinal degeneration.",
    date_of_birth: "1988-03-04",
    known_addresses: ["17 Brookfield Avenue, Wilmslow SK9 5EP"],
    employer: "Self-employed Interior Designer",
    phone_numbers: ["+44 7700 900891"],
    vehicle_registrations: ["MF68 ABC (Audi Q3 White)"],
    confidence_rating: "MEDIUM",
    notes: "Active membership reported at local wellness club under maiden name.",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-09-28T10:00:00.000Z",
    updated_at: "2025-10-04T16:20:00.000Z",
  },
  {
    id: "sbj-004",
    matter_id: "mat-007",
    subject_type: "PERSON",
    name: "Marcus Danvers",
    aliases: ["Marc Danvers"],
    role: "DEBTOR",
    description: "Judgment debtor subject to £145,000 High Court judgment debt. Vacated registered address.",
    date_of_birth: "1969-08-19",
    known_addresses: ["Last confirmed: 104 Deansgate, Manchester M3 2QG"],
    phone_numbers: ["+44 7700 900712"],
    confidence_rating: "LOW",
    notes: "Traces indicate active involvement in property holding companies via nominee directors.",
    visibility: "INTERNAL_ONLY",
    retention_status: "ACTIVE",
    created_at: "2025-10-06T09:15:00.000Z",
    updated_at: "2025-10-06T09:15:00.000Z",
  },
];

export function getSubjectById(id: string): SubjectProfile | undefined {
  return FIXTURE_SUBJECTS.find((s) => s.id === id);
}

export function getSubjectsByMatter(matterId: string): SubjectProfile[] {
  return FIXTURE_SUBJECTS.filter((s) => s.matter_id === matterId);
}
