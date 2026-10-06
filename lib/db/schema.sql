-- ============================================================================
-- PRIVATE INTELLIGENCE & INVESTIGATIONS PLATFORM
-- PRODUCTION POSTGRESQL / SUPABASE SCHEMA WITH COMPLETE ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUM TYPES
-- ============================================================================

CREATE TYPE user_role AS ENUM (
  'CLIENT',
  'CLIENT_ADMIN',
  'INVESTIGATOR',
  'CASE_MANAGER',
  'ADMIN',
  'SUPER_ADMIN'
);

CREATE TYPE user_status AS ENUM (
  'ACTIVE',
  'INACTIVE',
  'SUSPENDED',
  'PENDING_VERIFICATION'
);

CREATE TYPE client_type AS ENUM (
  'PRIVATE_CLIENT',
  'SOLICITOR',
  'LAW_FIRM',
  'INSOLVENCY_PRACTITIONER',
  'ACCOUNTANT',
  'INSURER',
  'FINANCE_COMPANY',
  'DEBT_RECOVERY',
  'PROPERTY',
  'CORPORATE',
  'OTHER_PROFESSIONAL'
);

CREATE TYPE membership_role AS ENUM (
  'OWNER',
  'ADMIN',
  'MEMBER',
  'BILLING'
);

CREATE TYPE membership_status AS ENUM (
  'ACTIVE',
  'INVITED',
  'SUSPENDED',
  'REMOVED'
);

CREATE TYPE visibility_scope AS ENUM (
  'CLIENT_VISIBLE',
  'INTERNAL_ONLY',
  'RESTRICTED'
);

CREATE TYPE matter_status AS ENUM (
  'NEW',
  'OPEN',
  'IN_PROGRESS',
  'AWAITING_CLIENT',
  'AWAITING_INFORMATION',
  'FIELDWORK',
  'REPORTING',
  'CLIENT_REVIEW',
  'COMPLETED',
  'CLOSED',
  'ON_HOLD',
  'DECLINED'
);

CREATE TYPE report_status AS ENUM (
  'DRAFT',
  'INTERNAL_REVIEW',
  'APPROVED',
  'DELIVERED',
  'SUPERSEDED'
);

CREATE TYPE retention_status AS ENUM (
  'ACTIVE',
  'RETENTION_REVIEW',
  'RETAIN',
  'DELETE_PENDING',
  'DELETED'
);

CREATE TYPE enquiry_status AS ENUM (
  'NEW',
  'UNDER_REVIEW',
  'CONTACT_REQUIRED',
  'QUALIFIED',
  'INSTRUCTION_PENDING',
  'INSTRUCTED',
  'DECLINED',
  'CLOSED'
);

CREATE TYPE enquiry_urgency AS ENUM (
  'STANDARD',
  'TIME_SENSITIVE',
  'URGENT'
);

-- ============================================================================
-- 2. CORE TABLES
-- ============================================================================

-- Users / Profiles
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  telephone TEXT,
  role user_role NOT NULL DEFAULT 'CLIENT',
  status user_status NOT NULL DEFAULT 'ACTIVE',
  mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Client Organisations
CREATE TABLE IF NOT EXISTS client_organisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name TEXT NOT NULL,
  trading_name TEXT,
  client_type client_type NOT NULL,
  company_number TEXT,
  primary_contact_user_id UUID REFERENCES users(id),
  billing_contact_user_id UUID REFERENCES users(id),
  email TEXT,
  telephone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  address_city TEXT,
  address_postcode TEXT,
  address_country TEXT NOT NULL DEFAULT 'GB',
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')),
  retention_status retention_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Client Memberships (Organisation-to-User mapping)
CREATE TABLE IF NOT EXISTS client_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_organisation_id UUID NOT NULL REFERENCES client_organisations(id) ON DELETE CASCADE,
  role membership_role NOT NULL DEFAULT 'MEMBER',
  status membership_status NOT NULL DEFAULT 'ACTIVE',
  invited_by_user_id UUID REFERENCES users(id),
  invited_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_membership_user_org UNIQUE (user_id, client_organisation_id)
);

-- Enquiries (Public Intake)
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE, -- e.g. ENQ-241006-8912
  status enquiry_status NOT NULL DEFAULT 'NEW',
  urgency enquiry_urgency NOT NULL DEFAULT 'STANDARD',
  enquiry_type TEXT NOT NULL,
  service_subcategory TEXT,
  professional_client_type TEXT,
  location_country TEXT DEFAULT 'GB',
  location_region TEXT,
  location_city TEXT,
  location_postcode TEXT,
  narrative TEXT,
  deadline_at TIMESTAMPTZ,
  preferred_contact_method TEXT DEFAULT 'EMAIL',
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  organisation_name TEXT,
  originating_url TEXT,
  landing_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  assigned_to UUID REFERENCES users(id),
  converted_to_client_id UUID REFERENCES client_organisations(id),
  converted_to_matter_id UUID,
  converted_at TIMESTAMPTZ,
  retention_status retention_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Matters (Master Investigation File)
CREATE TABLE IF NOT EXISTS matters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE, -- e.g. MAT-241006-0042
  client_organisation_id UUID NOT NULL REFERENCES client_organisations(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  matter_type TEXT NOT NULL,
  description TEXT,
  status matter_status NOT NULL DEFAULT 'NEW',
  priority TEXT NOT NULL DEFAULT 'STANDARD' CHECK (priority IN ('STANDARD', 'HIGH', 'URGENT')),
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  target_date TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  lead_investigator_id UUID REFERENCES users(id),
  case_manager_id UUID REFERENCES users(id),
  created_from_enquiry_id UUID REFERENCES enquiries(id),
  retention_status retention_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Backfill FK on enquiries
ALTER TABLE enquiries 
  ADD CONSTRAINT fk_enquiry_matter 
  FOREIGN KEY (converted_to_matter_id) REFERENCES matters(id) ON DELETE SET NULL;

-- Matter User Assignments (Investigators / Case Managers on Matter)
CREATE TABLE IF NOT EXISTS matter_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('INVESTIGATOR', 'CASE_MANAGER', 'SUPPORT', 'CLIENT_CONTACT')),
  access_level TEXT NOT NULL CHECK (access_level IN ('FULL', 'CASE_MANAGEMENT', 'FIELDWORK', 'READ_ONLY')),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  assigned_by_user_id UUID REFERENCES users(id),
  removed_at TIMESTAMPTZ,
  CONSTRAINT uq_matter_user UNIQUE (matter_id, user_id)
);

-- Matter Events (Contemporaneous Activity Timeline)
CREATE TABLE IF NOT EXISTS matter_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  actor_user_id UUID REFERENCES users(id),
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  visibility visibility_scope NOT NULL DEFAULT 'INTERNAL_ONLY',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Service Instructions (Process Serving)
CREATE TABLE IF NOT EXISTS service_instructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  issuing_party TEXT,
  served_party_name TEXT,
  served_party_organisation TEXT,
  service_address TEXT,
  alternative_addresses TEXT[],
  deadline_at TIMESTAMPTZ,
  jurisdiction TEXT DEFAULT 'England & Wales',
  court_name TEXT,
  case_reference TEXT,
  special_instructions TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING_INSTRUCTION'
    CHECK (status IN ('PENDING_INSTRUCTION', 'INSTRUCTION_ACCEPTED', 'ATTEMPTS_IN_PROGRESS', 'SERVED', 'SERVICE_FAILED', 'CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Service Attempts (GPS & Contemporaneous Logs)
CREATE TABLE IF NOT EXISTS service_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  service_instruction_id UUID NOT NULL REFERENCES service_instructions(id) ON DELETE CASCADE,
  investigator_id UUID REFERENCES users(id),
  attempt_number INT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  location_attended TEXT,
  outcome TEXT NOT NULL,
  notes TEXT,
  evidence_reference TEXT,
  visibility visibility_scope NOT NULL DEFAULT 'INTERNAL_ONLY',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Matter Documents
CREATE TABLE IF NOT EXISTS matter_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  filename TEXT NOT NULL, -- Safe server-generated opaque filename
  original_filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  storage_key TEXT NOT NULL UNIQUE, -- Private path e.g. matter/{id}/docs/{uuid}
  document_type TEXT NOT NULL,
  uploaded_by_user_id UUID REFERENCES users(id),
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  version INT NOT NULL DEFAULT 1,
  visibility visibility_scope NOT NULL DEFAULT 'INTERNAL_ONLY',
  retention_status retention_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Matter Reports (Versioned & Immutable once Delivered)
CREATE TABLE IF NOT EXISTS matter_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL,
  version INT NOT NULL DEFAULT 1,
  status report_status NOT NULL DEFAULT 'DRAFT',
  storage_key TEXT,
  generated_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by_user_id UUID REFERENCES users(id),
  delivered_at TIMESTAMPTZ,
  delivered_by_user_id UUID REFERENCES users(id),
  created_by_user_id UUID REFERENCES users(id),
  is_immutable BOOLEAN NOT NULL DEFAULT FALSE,
  retention_status retention_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_matter_report_version UNIQUE (matter_id, version)
);

-- Matter Messages (Confidential In-Portal Communication)
CREATE TABLE IF NOT EXISTS matter_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  sender_user_id UUID NOT NULL REFERENCES users(id),
  recipient_scope TEXT NOT NULL CHECK (recipient_scope IN ('CLIENT', 'INTERNAL', 'SPECIFIC_USER')),
  recipient_user_ids UUID[],
  subject TEXT,
  message TEXT NOT NULL,
  has_attachments BOOLEAN NOT NULL DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  visibility visibility_scope NOT NULL DEFAULT 'INTERNAL_ONLY',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit Logs (Append-Only)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID REFERENCES users(id),
  actor_ip TEXT,
  actor_user_agent TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  matter_id UUID REFERENCES matters(id) ON DELETE SET NULL,
  client_organisation_id UUID REFERENCES client_organisations(id) ON DELETE SET NULL,
  previous_state JSONB,
  new_state JSONB,
  notes TEXT,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. INDEXES FOR PERFORMANCE & SECURITY QUERIES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_role_status ON users(role, status);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON client_memberships(user_id, status);
CREATE INDEX IF NOT EXISTS idx_memberships_org ON client_memberships(client_organisation_id, status);
CREATE INDEX IF NOT EXISTS idx_matters_org ON matters(client_organisation_id);
CREATE INDEX IF NOT EXISTS idx_matter_users_user ON matter_users(user_id, matter_id);
CREATE INDEX IF NOT EXISTS idx_matter_events_matter_vis ON matter_events(matter_id, visibility);
CREATE INDEX IF NOT EXISTS idx_matter_docs_matter_vis ON matter_documents(matter_id, visibility);
CREATE INDEX IF NOT EXISTS idx_matter_reports_matter_status ON matter_reports(matter_id, status);
CREATE INDEX IF NOT EXISTS idx_matter_msgs_matter_vis ON matter_messages(matter_id, visibility);
CREATE INDEX IF NOT EXISTS idx_audit_occurred ON audit_logs(occurred_at DESC);

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS) HELPER FUNCTIONS
-- ============================================================================

-- Check if current authenticated user has an internal staff role
CREATE OR REPLACE FUNCTION auth_is_internal_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
      AND status = 'ACTIVE'
      AND role IN ('INVESTIGATOR', 'CASE_MANAGER', 'ADMIN', 'SUPER_ADMIN')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current authenticated user is an administrator
CREATE OR REPLACE FUNCTION auth_is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
      AND status = 'ACTIVE'
      AND role IN ('ADMIN', 'SUPER_ADMIN')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is an active member of the specified client organisation
CREATE OR REPLACE FUNCTION auth_is_org_member(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM client_memberships
    WHERE user_id = auth.uid()
      AND client_organisation_id = org_id
      AND status = 'ACTIVE'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is an investigator assigned to the specified matter
CREATE OR REPLACE FUNCTION auth_is_assigned_to_matter(target_matter_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM matter_users
    WHERE user_id = auth.uid()
      AND matter_id = target_matter_id
      AND removed_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 5. ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE matters ENABLE ROW LEVEL SECURITY;
ALTER TABLE matter_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matter_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_instructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE matter_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE matter_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE matter_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 6. RLS POLICIES
-- ============================================================================

-- USERS
CREATE POLICY users_self_read ON users
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR auth_is_admin());

CREATE POLICY users_admin_all ON users
  FOR ALL TO authenticated
  USING (auth_is_admin());

-- CLIENT ORGANISATIONS
-- Client members can view their own organisation; Admins can view all
CREATE POLICY client_organisations_select ON client_organisations
  FOR SELECT TO authenticated
  USING (auth_is_org_member(id) OR auth_is_admin());

CREATE POLICY client_organisations_admin_write ON client_organisations
  FOR ALL TO authenticated
  USING (auth_is_admin());

-- CLIENT MEMBERSHIPS
CREATE POLICY client_memberships_select ON client_memberships
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR auth_is_org_member(client_organisation_id) OR auth_is_admin());

-- ENQUIRIES
-- Public submission allowed (INSERT); Internal staff only can SELECT/UPDATE; Normal clients CANNOT select
CREATE POLICY enquiries_anon_insert ON enquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY enquiries_internal_select ON enquiries
  FOR SELECT TO authenticated
  USING (auth_is_internal_staff());

CREATE POLICY enquiries_internal_update ON enquiries
  FOR UPDATE TO authenticated
  USING (auth_is_internal_staff());

-- MATTERS
-- Organisation isolation: Client can select ONLY their organisation's matters.
-- Staff can select if assigned OR if Admin.
CREATE POLICY matters_select_client ON matters
  FOR SELECT TO authenticated
  USING (
    (auth_is_org_member(client_organisation_id))
    OR (auth_is_assigned_to_matter(id))
    OR (auth_is_admin())
  );

CREATE POLICY matters_admin_all ON matters
  FOR ALL TO authenticated
  USING (auth_is_admin());

-- MATTER EVENTS
-- Client users can ONLY select events where visibility = 'CLIENT_VISIBLE' and they belong to the matter's org.
-- Staff can view according to internal access.
CREATE POLICY matter_events_select ON matter_events
  FOR SELECT TO authenticated
  USING (
    (visibility = 'CLIENT_VISIBLE' AND EXISTS (
      SELECT 1 FROM matters m
      WHERE m.id = matter_events.matter_id AND auth_is_org_member(m.client_organisation_id)
    ))
    OR (auth_is_assigned_to_matter(matter_id))
    OR (auth_is_admin())
  );

-- MATTER DOCUMENTS
-- Client can ONLY view documents that are CLIENT_VISIBLE and belong to their org's matter
CREATE POLICY matter_documents_select ON matter_documents
  FOR SELECT TO authenticated
  USING (
    (visibility = 'CLIENT_VISIBLE' AND EXISTS (
      SELECT 1 FROM matters m
      WHERE m.id = matter_documents.matter_id AND auth_is_org_member(m.client_organisation_id)
    ))
    OR (auth_is_assigned_to_matter(matter_id))
    OR (auth_is_admin())
  );

-- MATTER REPORTS
-- Clients can ONLY view DELIVERED reports on their organisation's matters. Drafts are NEVER visible.
CREATE POLICY matter_reports_select ON matter_reports
  FOR SELECT TO authenticated
  USING (
    (status = 'DELIVERED' AND EXISTS (
      SELECT 1 FROM matters m
      WHERE m.id = matter_reports.matter_id AND auth_is_org_member(m.client_organisation_id)
    ))
    OR (auth_is_assigned_to_matter(matter_id))
    OR (auth_is_admin())
  );

-- MATTER MESSAGES
CREATE POLICY matter_messages_select ON matter_messages
  FOR SELECT TO authenticated
  USING (
    (visibility = 'CLIENT_VISIBLE' AND EXISTS (
      SELECT 1 FROM matters m
      WHERE m.id = matter_messages.matter_id AND auth_is_org_member(m.client_organisation_id)
    ))
    OR (sender_user_id = auth.uid())
    OR (auth_is_assigned_to_matter(matter_id))
    OR (auth_is_admin())
  );

-- AUDIT LOGS (IMMUTABLE)
-- Strict append-only: No UPDATE or DELETE allowed by anyone through standard application.
-- Only Admins can SELECT.
CREATE POLICY audit_logs_admin_select ON audit_logs
  FOR SELECT TO authenticated
  USING (auth_is_admin());

CREATE POLICY audit_logs_insert ON audit_logs
  FOR INSERT TO authenticated
  WITH CHECK (true);
