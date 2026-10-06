// ============================================================
// RESEARCH WORKSPACE DATA TYPES & INITIAL DATA
// Private Intelligence & Investigations Platform
// ============================================================

export type ResearchConfidence =
  | "Unverified"
  | "Possible"
  | "Corroborated"
  | "Verified"
  | "Disputed"
  | "Rejected";

export type PivotType =
  | "Name → Username"
  | "Username → Social Account"
  | "Email → Website"
  | "Phone → Public Profile"
  | "Company → Director"
  | "Address → Company"
  | "Image → Reverse Search"
  | "Domain → Infrastructure"
  | "Subject → Vehicle"
  | "Subject → Organisation";

export interface ResearchSource {
  id: string;
  source_name: string;
  url: string;
  source_type: string;
  accessed_at: string;
  researcher: string;
  description: string;
  capture_reference?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  source_url: string;
  source_name: string;
  source_type: string;
  date_accessed: string;
  researcher: string;
  finding: string;
  confidence: ResearchConfidence;
  case_reference: string;
  subject_name: string;
  notes?: string;
  evidence_attachment?: string;
  saved_to_case: boolean;
  linked_entity_type?: "TIMELINE" | "INTELLIGENCE" | "EVIDENCE" | "SUBJECT" | "ORGANISATION";
  created_at: string;
}

export interface ResearchPivot {
  id: string;
  pivot_type: PivotType;
  input_value: string;
  output_lead: string;
  status: "OPEN" | "CORROBORATING" | "RESOLVED" | "DEAD_END";
  target_tool?: string;
  created_at: string;
  notes?: string;
}

export const INITIAL_RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "ri-001",
    title: "Overseas Corporate Registry Match — Sharjah Free Zone",
    source_url: "https://shams.ae/registry-search",
    source_name: "Sharjah Media City (SHAMS) Free Zone Authority",
    source_type: "Statutory Freezone Corporate Registry",
    date_accessed: "2025-10-05 14:15",
    researcher: "Sarah Chen",
    finding: "Entity 'Apex International Logistics FZE' registered 14 April 2024. Active license 240981. Sole individual shareholder registered as 'A. J. Pendelton'.",
    confidence: "Corroborated",
    case_reference: "MAT-2501-001",
    subject_name: "Arthur Pendelton",
    notes: "Matches subject date of birth year. Registered office matches known nominee formation agency in Dubai.",
    evidence_attachment: "SHAMS_Registry_Excerpt_DocRef_8829.pdf",
    saved_to_case: true,
    linked_entity_type: "INTELLIGENCE",
    created_at: "2025-10-05T14:20:00Z",
  },
  {
    id: "ri-002",
    title: "Deleted Personal Profile Bio mentioning Procurement Role",
    source_url: "https://archive.org/web/20231104/profile-example",
    source_name: "Wayback Machine Archive",
    source_type: "Public Web Archive Capture",
    date_accessed: "2025-10-05 16:30",
    researcher: "Sarah Chen",
    finding: "Historical snapshot from Nov 2023 lists secondary contact email 'artie.pendelton@apex-freight.com' which was subsequently removed in Jan 2024.",
    confidence: "Verified",
    case_reference: "MAT-2501-001",
    subject_name: "Arthur Pendelton",
    notes: "Direct linkage between subject personal email handle and the overseas logistics entity.",
    evidence_attachment: "Wayback_Archive_Capture_SHA256_e49a.png",
    saved_to_case: true,
    linked_entity_type: "EVIDENCE",
    created_at: "2025-10-05T16:35:00Z",
  },
  {
    id: "ri-003",
    title: "Residential Property Ownership Lead — Ascot Weekend Residence",
    source_url: "https://eservices.landregistry.gov.uk/title-view",
    source_name: "HM Land Registry E-Services",
    source_type: "Official Cadastral Property Registry",
    date_accessed: "2025-10-06 08:20",
    researcher: "Thomas Hardy",
    finding: "Freehold Title BK498112 (Woodland Manor, Ascot) registered to 'Oakwood Premier Properties Ltd'. Julian Vance registered as sole PSC at Companies House.",
    confidence: "Verified",
    case_reference: "MAT-2501-002",
    subject_name: "Julian Vance",
    notes: "Pre-dawn process serving dispatch scheduled. Confirms direct beneficial ownership of evasive director's retreat.",
    evidence_attachment: "HMLR_Title_Plan_BK498112.pdf",
    saved_to_case: true,
    linked_entity_type: "TIMELINE",
    created_at: "2025-10-06T08:25:00Z",
  },
  {
    id: "ri-004",
    title: "Reverse Image Search — Profile Picture Match on Gym Forum",
    source_url: "https://facecheck.id/result/f778a",
    source_name: "FaceCheck.ID",
    source_type: "Algorithmic Facial Discovery Lead",
    date_accessed: "2025-10-06 10:10",
    researcher: "Sarah Chen",
    finding: "Possible facial match (Similarity index: 88%) on North West powerlifting forum profile 'Clara_H_98'. Profile active 3 days ago.",
    confidence: "Possible",
    case_reference: "MAT-2501-005",
    subject_name: "Clara Higgins",
    notes: "Investigative lead only. Requires physical corroboration by surveillance team before formal submission.",
    evidence_attachment: "FaceCheck_Lead_Capture_0942.jpg",
    saved_to_case: false,
    created_at: "2025-10-06T10:15:00Z",
  },
];

export const INITIAL_PIVOTS: ResearchPivot[] = [
  {
    id: "piv-001",
    pivot_type: "Company → Director",
    input_value: "Oakwood Premier Properties Ltd",
    output_lead: "Julian Vance (Confirmed Director & Sole PSC)",
    status: "RESOLVED",
    target_tool: "Companies House",
    created_at: "2025-10-06 08:15",
    notes: "Direct correlation establishes personal asset ownership behind corporate veil.",
  },
  {
    id: "piv-002",
    pivot_type: "Address → Company",
    input_value: "Woodland Manor, Ascot SL5 8NQ",
    output_lead: "Oakwood Premier Properties Ltd (Registered Proprietor)",
    status: "RESOLVED",
    target_tool: "HM Land Registry",
    created_at: "2025-10-06 08:22",
  },
  {
    id: "piv-003",
    pivot_type: "Email → Website",
    input_value: "artie.pendelton@apex-freight.com",
    output_lead: "apex-freight.com (Associated with Sharjah Free Zone Entity)",
    status: "CORROBORATING",
    target_tool: "Wayback Machine",
    created_at: "2025-10-05 16:30",
    notes: "Domain currently redirects to a placeholder landing page.",
  },
  {
    id: "piv-004",
    pivot_type: "Image → Reverse Search",
    input_value: "Claimant Social Media Headshot",
    output_lead: "Powerlifting Forum user 'Clara_H_98' (Active member)",
    status: "OPEN",
    target_tool: "Google Lens / FaceCheck.ID",
    created_at: "2025-10-06 10:05",
    notes: "Physical verification needed during upcoming covert surveillance window.",
  },
  {
    id: "piv-005",
    pivot_type: "Subject → Vehicle",
    input_value: "Julian Vance",
    output_lead: "RO71 VNC (Porsche Taycan Dark Blue confirmed parked overnight)",
    status: "RESOLVED",
    target_tool: "Physical Reconnaissance / DVLA Check",
    created_at: "2025-10-06 07:50",
  },
];

export const PIVOT_OPTIONS: PivotType[] = [
  "Name → Username",
  "Username → Social Account",
  "Email → Website",
  "Phone → Public Profile",
  "Company → Director",
  "Address → Company",
  "Image → Reverse Search",
  "Domain → Infrastructure",
  "Subject → Vehicle",
  "Subject → Organisation",
];

export const CONFIDENCE_LEVELS: ResearchConfidence[] = [
  "Unverified",
  "Possible",
  "Corroborated",
  "Verified",
  "Disputed",
  "Rejected",
];
