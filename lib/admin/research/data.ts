// ============================================================
// CANONICAL RESEARCH WORKSPACE DATA TYPES & MODELS
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

export interface ResearchObjectiveVersion {
  id: string;
  case_reference: string;
  objective: string;
  updated_by_user_id: string;
  updated_by_name: string;
  updated_at: string;
  change_reason?: string;
}

export interface ResearchSource {
  id: string;
  source_name: string;
  url: string;
  source_type: string;
  accessed_at: string;
  researcher: string;
  researcher_id?: string;
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
  created_by_user_id: string;
  last_modified_by_user_id?: string;
  last_modified_by_name?: string;
  finding: string;
  confidence: ResearchConfidence;
  case_reference: string;
  matter_id: string;
  // Multiple subjects support (optional)
  subject_name?: string;
  subject_ids?: string[];
  notes?: string;
  evidence_attachment?: string;
  saved_to_case: boolean;
  linked_entity_type?: "TIMELINE" | "INTELLIGENCE" | "EVIDENCE" | "SUBJECT" | "ORGANISATION";
  promoted_entity_id?: string;
  promoted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ResearchPivot {
  id: string;
  case_reference: string;
  pivot_type: PivotType;
  input_value: string;
  output_lead: string;
  status: "OPEN" | "CORROBORATING" | "RESOLVED" | "DEAD_END";
  target_tool?: string;
  created_by_user_id: string;
  created_by_name: string;
  created_at: string;
  updated_at: string;
  notes?: string;
}

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

export const INITIAL_RESEARCH_OBJECTIVES: Record<string, ResearchObjectiveVersion[]> = {
  "MAT-2501-001": [
    {
      id: "obj-001",
      case_reference: "MAT-2501-001",
      objective: "Trace beneficial overseas corporate holdings, hidden directorships, and undisclosed property assets.",
      updated_by_user_id: "usr-001",
      updated_by_name: "David Mercer",
      updated_at: "2025-09-16T10:00:00Z",
      change_reason: "Initial instruction scoping",
    },
  ],
  "MAT-2501-002": [
    {
      id: "obj-002",
      case_reference: "MAT-2501-002",
      objective: "Locate confirmed residential pattern-of-life and vehicle routines for personal service of High Court Winding-Up Petition.",
      updated_by_user_id: "usr-001",
      updated_by_name: "David Mercer",
      updated_at: "2025-10-01T09:30:00Z",
    },
  ],
  "MAT-2501-005": [
    {
      id: "obj-003",
      case_reference: "MAT-2501-005",
      objective: "Document recreational, athletic, and vocational activities inconsistent with claimed severe mobility impairment.",
      updated_by_user_id: "usr-002",
      updated_by_name: "Sarah Chen",
      updated_at: "2025-09-29T11:15:00Z",
    },
  ],
};

export const INITIAL_RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "ri-001",
    title: "Overseas Corporate Registry Match — Sharjah Free Zone",
    source_url: "https://shams.ae/registry-search",
    source_name: "Sharjah Media City (SHAMS) Free Zone Authority",
    source_type: "Statutory Freezone Corporate Registry",
    date_accessed: "2025-10-05 14:15",
    researcher: "Sarah Chen",
    created_by_user_id: "usr-002",
    finding: "Entity 'Apex International Logistics FZE' registered 14 April 2024. Active license 240981. Sole individual shareholder registered as 'A. J. Pendelton'.",
    confidence: "Corroborated",
    case_reference: "MAT-2501-001",
    matter_id: "mat-001",
    subject_name: "Arthur Pendelton",
    subject_ids: ["sbj-001"],
    notes: "Matches subject date of birth year. Registered office matches known nominee formation agency in Dubai.",
    evidence_attachment: "SHAMS_Registry_Excerpt_DocRef_8829.pdf",
    saved_to_case: true,
    linked_entity_type: "INTELLIGENCE",
    promoted_entity_id: "int-001",
    promoted_at: "2025-10-05T14:30:00Z",
    created_at: "2025-10-05T14:20:00Z",
    updated_at: "2025-10-05T14:30:00Z",
  },
  {
    id: "ri-002",
    title: "Deleted Personal Profile Bio mentioning Procurement Role",
    source_url: "https://archive.org/web/20231104/profile-example",
    source_name: "Wayback Machine Archive",
    source_type: "Public Web Archive Capture",
    date_accessed: "2025-10-05 16:30",
    researcher: "Sarah Chen",
    created_by_user_id: "usr-002",
    finding: "Historical snapshot from Nov 2023 lists secondary contact email 'artie.pendelton@apex-freight.com' which was subsequently removed in Jan 2024.",
    confidence: "Verified",
    case_reference: "MAT-2501-001",
    matter_id: "mat-001",
    subject_name: "Arthur Pendelton",
    subject_ids: ["sbj-001"],
    notes: "Direct linkage between subject personal email handle and the overseas logistics entity.",
    evidence_attachment: "Wayback_Archive_Capture_SHA256_e49a.png",
    saved_to_case: true,
    linked_entity_type: "EVIDENCE",
    promoted_entity_id: "evi-001",
    promoted_at: "2025-10-05T16:40:00Z",
    created_at: "2025-10-05T16:35:00Z",
    updated_at: "2025-10-05T16:40:00Z",
  },
  {
    id: "ri-003",
    title: "Residential Property Ownership Lead — Ascot Weekend Residence",
    source_url: "https://eservices.landregistry.gov.uk/title-view",
    source_name: "HM Land Registry E-Services",
    source_type: "Official Cadastral Property Registry",
    date_accessed: "2025-10-06 08:20",
    researcher: "Thomas Hardy",
    created_by_user_id: "usr-005",
    finding: "Freehold Title BK498112 (Woodland Manor, Ascot) registered to 'Oakwood Premier Properties Ltd'. Julian Vance registered as sole PSC at Companies House.",
    confidence: "Verified",
    case_reference: "MAT-2501-002",
    matter_id: "mat-002",
    subject_name: "Julian Vance",
    subject_ids: ["sbj-002"],
    notes: "Pre-dawn process serving dispatch scheduled. Confirms direct beneficial ownership of evasive director's retreat.",
    evidence_attachment: "HMLR_Title_Plan_BK498112.pdf",
    saved_to_case: true,
    linked_entity_type: "TIMELINE",
    promoted_entity_id: "evt-003",
    promoted_at: "2025-10-06T08:30:00Z",
    created_at: "2025-10-06T08:25:00Z",
    updated_at: "2025-10-06T08:30:00Z",
  },
  {
    id: "ri-004",
    title: "Reverse Image Search — Profile Picture Match on Gym Forum",
    source_url: "https://facecheck.id/result/f778a",
    source_name: "FaceCheck.ID",
    source_type: "Algorithmic Facial Discovery Lead",
    date_accessed: "2025-10-06 10:10",
    researcher: "Sarah Chen",
    created_by_user_id: "usr-002",
    finding: "Possible facial match (Similarity index: 88%) on North West powerlifting forum profile 'Clara_H_98'. Profile active 3 days ago.",
    confidence: "Possible",
    case_reference: "MAT-2501-005",
    matter_id: "mat-005",
    subject_name: "Clara Higgins",
    subject_ids: ["sbj-003"],
    notes: "Investigative lead only. Requires physical corroboration by surveillance team before formal submission.",
    evidence_attachment: "FaceCheck_Lead_Capture_0942.jpg",
    saved_to_case: false,
    created_at: "2025-10-06T10:15:00Z",
    updated_at: "2025-10-06T10:15:00Z",
  },
];

export const INITIAL_PIVOTS: ResearchPivot[] = [
  {
    id: "piv-001",
    case_reference: "MAT-2501-002",
    pivot_type: "Company → Director",
    input_value: "Oakwood Premier Properties Ltd",
    output_lead: "Julian Vance (Confirmed Director & Sole PSC)",
    status: "RESOLVED",
    target_tool: "Companies House",
    created_by_user_id: "usr-005",
    created_by_name: "Thomas Hardy",
    created_at: "2025-10-06 08:15",
    updated_at: "2025-10-06 08:25",
    notes: "Direct correlation establishes personal asset ownership behind corporate veil.",
  },
  {
    id: "piv-002",
    case_reference: "MAT-2501-002",
    pivot_type: "Address → Company",
    input_value: "Woodland Manor, Ascot SL5 8NQ",
    output_lead: "Oakwood Premier Properties Ltd (Registered Proprietor)",
    status: "RESOLVED",
    target_tool: "HM Land Registry",
    created_by_user_id: "usr-005",
    created_by_name: "Thomas Hardy",
    created_at: "2025-10-06 08:22",
    updated_at: "2025-10-06 08:28",
  },
  {
    id: "piv-003",
    case_reference: "MAT-2501-001",
    pivot_type: "Email → Website",
    input_value: "artie.pendelton@apex-freight.com",
    output_lead: "apex-freight.com (Associated with Sharjah Free Zone Entity)",
    status: "CORROBORATING",
    target_tool: "Wayback Machine",
    created_by_user_id: "usr-002",
    created_by_name: "Sarah Chen",
    created_at: "2025-10-05 16:30",
    updated_at: "2025-10-05 16:40",
    notes: "Domain currently redirects to a placeholder landing page.",
  },
  {
    id: "piv-004",
    case_reference: "MAT-2501-005",
    pivot_type: "Image → Reverse Search",
    input_value: "Claimant Social Media Headshot",
    output_lead: "Powerlifting Forum user 'Clara_H_98' (Active member)",
    status: "OPEN",
    target_tool: "Google Lens / FaceCheck.ID",
    created_by_user_id: "usr-002",
    created_by_name: "Sarah Chen",
    created_at: "2025-10-06 10:05",
    updated_at: "2025-10-06 10:05",
    notes: "Physical verification needed during upcoming covert surveillance window.",
  },
  {
    id: "piv-005",
    case_reference: "MAT-2501-002",
    pivot_type: "Subject → Vehicle",
    input_value: "Julian Vance",
    output_lead: "RO71 VNC (Porsche Taycan Dark Blue confirmed parked overnight)",
    status: "RESOLVED",
    target_tool: "Physical Reconnaissance / DVLA Check",
    created_by_user_id: "usr-005",
    created_by_name: "Thomas Hardy",
    created_at: "2025-10-06 07:50",
    updated_at: "2025-10-06 08:00",
  },
];
