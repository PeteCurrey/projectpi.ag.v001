// ============================================================
// COMPLETE RELATIONAL DATA MODEL
// Private Intelligence & Investigations Platform
// ============================================================

export type UserRole = "CLIENT" | "CLIENT_ADMIN" | "INVESTIGATOR" | "CASE_MANAGER" | "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";

export type ClientType =
  | "PRIVATE_CLIENT" | "SOLICITOR" | "LAW_FIRM" | "INSOLVENCY_PRACTITIONER"
  | "ACCOUNTANT" | "INSURER" | "FINANCE_COMPANY" | "DEBT_RECOVERY"
  | "PROPERTY" | "CORPORATE" | "OTHER_PROFESSIONAL";

export type MembershipRole = "OWNER" | "ADMIN" | "MEMBER" | "BILLING";
export type MembershipStatus = "ACTIVE" | "INVITED" | "SUSPENDED" | "REMOVED";

export type EnquiryStatus =
  | "NEW" | "UNDER_REVIEW" | "CONTACT_REQUIRED" | "QUALIFIED"
  | "INSTRUCTION_PENDING" | "INSTRUCTED" | "DECLINED" | "CLOSED";

export type EnquiryUrgency = "STANDARD" | "TIME_SENSITIVE" | "URGENT";

export type EnquiryCategory =
  | "PROCESS_SERVING" | "INTELLIGENCE" | "TRACING" | "SURVEILLANCE"
  | "FRAUD_FINANCIAL" | "LEGAL_LITIGATION" | "CORPORATE" | "DUE_DILIGENCE"
  | "EMPLOYEE_WORKPLACE" | "OTHER";

export type MatterStatus =
  | "NEW" | "ASSESSMENT" | "INSTRUCTION_PENDING" | "OPEN" | "IN_PROGRESS"
  | "AWAITING_CLIENT" | "AWAITING_INFORMATION"
  | "FIELDWORK" | "REPORTING" | "CLIENT_REVIEW" | "COMPLETED" | "CLOSED"
  | "ON_HOLD" | "DECLINED" | "ARCHIVED";

export type MatterType =
  | "PROCESS_SERVING" | "TRACING" | "SURVEILLANCE" | "CORPORATE_INVESTIGATION"
  | "FRAUD" | "DUE_DILIGENCE" | "INTELLIGENCE" | "OSINT" | "DIGITAL_INVESTIGATION"
  | "ASSET_TRACING" | "LEGAL_INVESTIGATION" | "LITIGATION_SUPPORT"
  | "EVIDENCE_GATHERING" | "INSURANCE" | "EMPLOYEE_INVESTIGATION" | "OTHER";

export type MatterPriority = "LOW" | "NORMAL" | "STANDARD" | "HIGH" | "URGENT";

export type AssignmentRole =
  | "LEAD_INVESTIGATOR" | "SUPPORTING_INVESTIGATOR" | "RESEARCHER"
  | "FIELD_OPERATIVE" | "PROCESS_SERVER" | "SURVEILLANCE_OPERATIVE" | "CASE_MANAGER";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "BLOCKED" | "COMPLETED" | "CANCELLED";
export type TaskPriority = "LOW" | "STANDARD" | "HIGH" | "CRITICAL";
export type AccessLevel = "FULL" | "CASE_MANAGEMENT" | "FIELDWORK" | "READ_ONLY";
export type Visibility = "CLIENT_VISIBLE" | "INTERNAL_ONLY" | "RESTRICTED";

export type SubjectType = "PERSON" | "COMPANY" | "PROPERTY" | "VEHICLE" | "OTHER";

export type ServiceAttemptOutcome =
  | "SERVED" | "NO_ATTENDANCE" | "ADDRESS_NOT_FOUND" | "SUBJECT_NOT_PRESENT"
  | "REFUSED" | "ACCESS_DENIED" | "FURTHER_ATTEMPT_REQUIRED" | "OTHER";

export type ServiceDocumentType =
  | "COURT_PAPERS" | "STATUTORY_DEMAND" | "BANKRUPTCY_PETITION"
  | "WINDING_UP_PETITION" | "URGENT_DOCUMENTS" | "OTHER";

export type EvidenceType =
  | "DOCUMENT" | "PHOTOGRAPH" | "VIDEO" | "AUDIO" | "SCREENSHOT"
  | "PUBLIC_RECORD" | "DATABASE_RESULT" | "FIELD_NOTE" | "SERVICE_RECORD" | "OTHER";

export type ReportStatus = "DRAFT" | "INTERNAL_REVIEW" | "APPROVED" | "DELIVERED" | "SUPERSEDED";

export type NotificationType =
  | "NEW_MESSAGE" | "NEW_DOCUMENT" | "REPORT_AVAILABLE" | "MATTER_STATUS_CHANGE"
  | "SERVICE_ATTEMPT_UPDATE" | "ACTION_REQUIRED" | "DEADLINE_REMINDER" | "INVOICE_AVAILABLE";

export type RetentionStatus = "ACTIVE" | "RETENTION_REVIEW" | "RETAIN" | "DELETE_PENDING" | "DELETED";

// ============================================================
// CORE ENTITIES
// ============================================================

export interface User {
  id: string;
  email: string;
  name: string;
  telephone?: string;
  role: UserRole;
  status: UserStatus;
  mfa_enabled: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientOrganisation {
  id: string;
  legal_name: string;
  trading_name?: string;
  client_type: ClientType;
  company_number?: string;
  primary_contact_user_id?: string;
  billing_contact_user_id?: string;
  email?: string;
  telephone?: string;
  address_line1?: string;
  address_line2?: string;
  address_city?: string;
  address_postcode?: string;
  address_country: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  retention_status: RetentionStatus;
  created_at: string;
  updated_at: string;
}

export interface ClientMembership {
  id: string;
  user_id: string;
  client_organisation_id: string;
  role: MembershipRole;
  status: MembershipStatus;
  invited_by_user_id?: string;
  invited_at?: string;
  accepted_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// ENQUIRY SYSTEM
// ============================================================

export interface Enquiry {
  id: string;
  reference: string; // ENQ-YYMMDD-XXXX
  status: EnquiryStatus;
  urgency: EnquiryUrgency;
  enquiry_type: EnquiryCategory;
  service_subcategory?: string;
  professional_client_type?: ClientType | "PRIVATE_CLIENT";
  // Source attribution
  originating_url?: string;
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  // Location
  location_country?: string;
  location_region?: string;
  location_city?: string;
  location_postcode?: string;
  // Narrative
  narrative?: string;
  deadline_at?: string;
  // Contact
  preferred_contact_method?: "EMAIL" | "TELEPHONE" | "EITHER";
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  organisation_name?: string;
  // Lifecycle
  submitted_at: string;
  reviewed_at?: string;
  assigned_to?: string; // user_id of internal staff
  converted_to_client_id?: string;
  converted_to_matter_id?: string;
  converted_at?: string;
  // Retention
  retention_status: RetentionStatus;
  created_at: string;
  updated_at: string;
}

export interface EnquirySubject {
  id: string;
  enquiry_id: string;
  subject_type: SubjectType;
  name?: string;
  organisation?: string;
  address?: string;
  previous_address?: string;
  telephone?: string;
  email?: string;
  vehicle_registration?: string;
  date_of_birth?: string; // Only where operationally justified
  notes?: string;
  created_at: string;
}

export interface EnquiryDocument {
  id: string;
  enquiry_id: string;
  filename: string; // System-generated safe filename
  original_filename: string;
  mime_type: string;
  file_size: number; // bytes
  storage_key: string; // Private; never exposed publicly
  uploaded_by_ip?: string;
  uploaded_at: string;
  classification?: string;
  retention_status: RetentionStatus;
}

export interface EnquiryNote {
  id: string;
  enquiry_id: string;
  author_user_id: string;
  content: string;
  visibility: "INTERNAL_ONLY"; // Notes are always internal
  created_at: string;
  updated_at: string;
}

// ============================================================
// MATTER SYSTEM
// ============================================================

export interface Matter {
  id: string;
  reference: string; // MAT-YYMMDD-XXXX — immutable
  client_organisation_id: string;
  title: string;
  matter_type: MatterType;
  description?: string;
  investigation_objective?: string;
  instructions?: string;
  legal_context?: string;
  status: MatterStatus;
  priority: MatterPriority;
  confidentiality?: "STANDARD" | "CONFIDENTIAL" | "HIGHLY_CONFIDENTIAL";
  opened_at: string;
  target_date?: string;
  closed_at?: string;
  lead_investigator_id?: string;
  case_manager_id?: string;
  created_from_enquiry_id?: string;
  created_by_user_id?: string;
  estimated_value?: number; // £ pence
  quoted_value?: number;    // £ pence
  retention_status: RetentionStatus;
  created_at: string;
  updated_at: string;
}

export interface MatterAssignment {
  id: string;
  matter_id: string;
  user_id: string;
  assignment_role: AssignmentRole;
  start_date: string;
  end_date?: string;
  status: "ACTIVE" | "COMPLETED" | "WITHDRAWN";
  instructions?: string;
  assigned_by_user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface MatterUser {
  id: string;
  matter_id: string;
  user_id: string;
  role: "INVESTIGATOR" | "CASE_MANAGER" | "SUPPORT" | "CLIENT_CONTACT";
  access_level: AccessLevel;
  assigned_at: string;
  assigned_by_user_id?: string;
  removed_at?: string;
}

export interface MatterSubject {
  id: string;
  matter_id: string;
  subject_type: SubjectType;
  name?: string;
  organisation?: string;
  address?: string;
  previous_addresses?: string[];
  telephone?: string;
  email?: string;
  vehicle_registration?: string;
  date_of_birth?: string;
  company_number?: string;
  notes?: string;
  visibility: Visibility;
  created_at: string;
  updated_at: string;
}

export interface MatterTask {
  id: string;
  matter_id: string;
  title: string;
  description?: string;
  assigned_to?: string; // user_id
  status: TaskStatus;
  priority: TaskPriority;
  due_at?: string;
  completed_at?: string;
  visibility: Visibility;
  created_at: string;
  updated_at: string;
}

export interface MatterEvent {
  id: string;
  matter_id: string;
  event_type: string;
  title: string;
  description?: string;
  actor_user_id?: string;
  occurred_at: string;
  visibility: Visibility;
  metadata?: Record<string, unknown>;
  created_at: string;
}

// ============================================================
// PROCESS SERVING STRUCTURED WORKFLOW
// ============================================================

export interface ServiceInstruction {
  id: string;
  matter_id: string;
  document_type: ServiceDocumentType;
  issuing_party?: string;
  served_party_name?: string;
  served_party_organisation?: string;
  service_address?: string;
  alternative_addresses?: string[];
  deadline_at?: string;
  jurisdiction?: string;
  court_name?: string;
  case_reference?: string;
  special_instructions?: string;
  status:
    | "PENDING_INSTRUCTION" | "INSTRUCTION_ACCEPTED" | "ATTEMPTS_IN_PROGRESS"
    | "SERVED" | "SERVICE_FAILED" | "CANCELLED";
  created_at: string;
  updated_at: string;
}

export interface ServiceAttempt {
  id: string;
  matter_id: string;
  service_instruction_id: string;
  investigator_id?: string;
  attempt_number: number;
  attempted_at: string;
  location_attended?: string;
  outcome: ServiceAttemptOutcome;
  notes?: string;
  evidence_reference?: string;
  visibility: Visibility;
  created_at: string;
}

// ============================================================
// EVIDENCE SYSTEM
// ============================================================

export interface EvidenceItem {
  id: string;
  matter_id: string;
  evidence_type: EvidenceType;
  title: string;
  description?: string;
  collected_at?: string;
  collected_by_user_id?: string;
  source?: string;
  classification?: "OPEN" | "CONFIDENTIAL" | "HIGHLY_CONFIDENTIAL";
  integrity_hash?: string; // SHA-256 where applicable
  storage_key?: string;
  status: "ACTIVE" | "SUPERSEDED" | "DELETED";
  visibility: Visibility;
  retention_status: RetentionStatus;
  created_at: string;
  updated_at: string;
}

// ============================================================
// DOCUMENT CENTRE
// ============================================================

export interface MatterDocument {
  id: string;
  matter_id: string;
  title: string;
  description?: string;
  filename: string; // System-safe
  original_filename: string;
  mime_type: string;
  file_size: number;
  storage_key: string; // Never exposed publicly
  document_type: "REPORT" | "EVIDENCE" | "CLIENT_UPLOAD" | "INTERNAL" | "INVOICE" | "PROOF_OF_SERVICE" | "OTHER";
  uploaded_by_user_id?: string;
  uploaded_at: string;
  version?: number;
  visibility: Visibility;
  retention_status: RetentionStatus;
  created_at: string;
}

// ============================================================
// REPORTS
// ============================================================

export interface MatterReport {
  id: string;
  matter_id: string;
  title: string;
  report_type: "INVESTIGATION_REPORT" | "PROOF_OF_SERVICE" | "EVIDENCE_SUMMARY" | "INTERIM" | "FINAL" | "OTHER";
  version: number;
  status: ReportStatus;
  storage_key?: string;
  generated_at?: string;
  approved_at?: string;
  approved_by_user_id?: string;
  delivered_at?: string;
  delivered_by_user_id?: string;
  created_by_user_id?: string;
  is_immutable: boolean; // True once delivered
  retention_status: RetentionStatus;
  created_at: string;
  updated_at: string;
}

// ============================================================
// SECURE MESSAGING
// ============================================================

export interface MatterMessage {
  id: string;
  matter_id: string;
  sender_user_id: string;
  recipient_scope: "CLIENT" | "INTERNAL" | "SPECIFIC_USER";
  recipient_user_ids?: string[];
  subject?: string;
  message: string;
  has_attachments: boolean;
  read_at?: string;
  read_by_user_ids?: string[];
  visibility: Visibility;
  created_at: string;
}

export interface MessageAttachment {
  id: string;
  message_id: string;
  filename: string;
  original_filename: string;
  mime_type: string;
  file_size: number;
  storage_key: string;
  uploaded_at: string;
}

// ============================================================
// NOTIFICATIONS
// ============================================================

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string; // MUST NOT contain sensitive investigation details
  matter_id?: string;
  entity_type?: string;
  entity_id?: string;
  read_at?: string;
  dismissed_at?: string;
  created_at: string;
}

// ============================================================
// BILLING (FUTURE-READY FOUNDATION)
// ============================================================

export interface BillableItem {
  id: string;
  matter_id: string;
  description: string;
  quantity: number;
  unit_price: number; // pence / cents
  currency: string;
  vat_rate?: number;
  invoice_id?: string;
  status: "PENDING" | "INVOICED" | "PAID" | "VOID";
  created_at: string;
}

export interface Invoice {
  id: string;
  reference: string; // INV-YYMMDD-XXXX
  client_organisation_id: string;
  matter_id?: string;
  status: "DRAFT" | "ISSUED" | "PAID" | "OVERDUE" | "VOID";
  issued_at?: string;
  due_at?: string;
  paid_at?: string;
  total_net: number;
  total_vat: number;
  total_gross: number;
  currency: string;
  storage_key?: string; // PDF invoice
  created_at: string;
  updated_at: string;
}

// ============================================================
// AUDIT SYSTEM
// ============================================================

export interface AuditLog {
  id: string;
  actor_user_id?: string;
  actor_ip?: string;
  actor_user_agent?: string;
  action: string; // e.g. "MATTER_STATUS_CHANGED", "DOCUMENT_DOWNLOADED", "LOGIN_FAILED"
  entity_type?: string;
  entity_id?: string;
  matter_id?: string;
  client_organisation_id?: string;
  previous_state?: Record<string, unknown>;
  new_state?: Record<string, unknown>;
  notes?: string;
  occurred_at: string;
}

// ============================================================
// INTERNAL ENQUIRY WORKFLOW STATE
// ============================================================

export interface EnquiryAssignment {
  id: string;
  enquiry_id: string;
  assigned_to_user_id: string;
  assigned_by_user_id: string;
  assigned_at: string;
  notes?: string;
}

// ============================================================
// PORTAL SESSION (Client-side safe view types)
// These are stripped-down types safe to expose to the frontend
// ============================================================

export interface ClientPortalMatterSummary {
  id: string;
  reference: string;
  title: string;
  matter_type: MatterType;
  status: MatterStatus;
  opened_at: string;
  last_activity_at?: string;
  unread_messages: number;
  pending_actions: number;
}

export interface ClientPortalMatterDetail {
  id: string;
  reference: string;
  title: string;
  matter_type: MatterType;
  status: MatterStatus;
  priority: MatterPriority;
  opened_at: string;
  target_date?: string;
  description?: string;
  timeline_events: ClientPortalEvent[];
  documents: ClientPortalDocument[];
  reports: ClientPortalReport[];
  messages: ClientPortalMessage[];
  service_activity?: ClientPortalServiceActivity; // Only for process serving matters
}

export interface ClientPortalEvent {
  id: string;
  title: string;
  description?: string;
  occurred_at: string;
  event_type: string;
}

export interface ClientPortalDocument {
  id: string;
  title: string;
  original_filename: string;
  document_type: string;
  uploaded_at: string;
  file_size: number;
  download_url: string; // Dynamic secure endpoint: /api/client/documents/[id]/download
}

export interface ClientPortalReport {
  id: string;
  title: string;
  report_type: string;
  version: number;
  delivered_at?: string;
  download_url: string; // Dynamic secure endpoint: /api/client/reports/[id]/download
}

export interface ClientPortalMessage {
  id: string;
  sender_name: string;
  sender_role: string;
  message: string;
  has_attachments: boolean;
  created_at: string;
  read_at?: string;
}

export interface ClientPortalServiceActivity {
  instruction_status: string;
  document_type: ServiceDocumentType;
  service_address?: string;
  deadline_at?: string;
  attempts: {
    attempt_number: number;
    attempted_at: string;
    outcome: ServiceAttemptOutcome;
    notes?: string; // Filtered for client-appropriate content only
  }[];
}
