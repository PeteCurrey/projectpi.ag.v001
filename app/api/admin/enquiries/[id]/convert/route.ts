import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/api/handler";
import { PERMISSIONS } from "@/lib/rbac/permissions";
import { FIXTURE_LEADS } from "@/lib/admin/fixtures/leads";
import { FIXTURE_CLIENTS } from "@/lib/admin/fixtures/clients";
import { FIXTURE_CASES, FIXTURE_CASE_EVENTS } from "@/lib/admin/fixtures/cases";
import { logAuditEvent } from "@/lib/audit/logger";
import type { Matter, MatterType, MatterPriority, ClientOrganisation } from "@/lib/db/types";

function mapCategoryToMatterType(cat: string): MatterType {
  switch (cat) {
    case "PROCESS_SERVING":
      return "PROCESS_SERVING";
    case "FRAUD_FINANCIAL":
      return "FRAUD";
    case "SURVEILLANCE":
      return "SURVEILLANCE";
    case "TRACING":
      return "TRACING";
    case "DUE_DILIGENCE":
      return "DUE_DILIGENCE";
    case "INTELLIGENCE":
      return "INTELLIGENCE";
    case "CORPORATE":
      return "CORPORATE_INVESTIGATION";
    default:
      return "OTHER";
  }
}

function mapUrgencyToPriority(urgency: string): MatterPriority {
  switch (urgency) {
    case "URGENT":
      return "URGENT";
    case "TIME_SENSITIVE":
      return "HIGH";
    default:
      return "NORMAL";
  }
}

export const POST = withAdminAuth(
  { permissions: [PERMISSIONS.LEADS_CONVERT] },
  async (_req: NextRequest, session, params?: Record<string, string>) => {
    try {
      const enquiryId = params?.id;
      if (!enquiryId) {
        return NextResponse.json(
          { error: "VALIDATION_ERROR", message: "Enquiry ID is required." },
          { status: 400 }
        );
      }

      const enquiry = FIXTURE_LEADS.find(
        (e) => e.id.toLowerCase() === enquiryId.toLowerCase()
      );

      if (!enquiry) {
        return NextResponse.json(
          { error: "NOT_FOUND", message: "Enquiry not found." },
          { status: 404 }
        );
      }

      // If already converted, return existing matter
      if (enquiry.converted_to_matter_id) {
        const existingMatter = FIXTURE_CASES.find(
          (c) => c.id === enquiry.converted_to_matter_id
        );
        if (existingMatter) {
          return NextResponse.json({
            success: true,
            alreadyConverted: true,
            data: existingMatter,
            reference: existingMatter.reference,
          });
        }
      }

      // Find or create Client organisation (do not duplicate)
      let client = FIXTURE_CLIENTS.find(
        (c) =>
          (enquiry.organisation_name &&
            c.legal_name.toLowerCase() === enquiry.organisation_name.toLowerCase()) ||
          (enquiry.contact_email && c.email?.toLowerCase() === enquiry.contact_email.toLowerCase())
      );

      const nowIso = new Date().toISOString();

      if (!client) {
        const newClientId = `cli-${String(FIXTURE_CLIENTS.length + 1).padStart(3, "0")}`;
        client = {
          id: newClientId,
          legal_name: enquiry.organisation_name || enquiry.contact_name,
          client_type: enquiry.professional_client_type || "PRIVATE_CLIENT",
          email: enquiry.contact_email,
          telephone: enquiry.contact_phone,
          address_city: enquiry.location_city,
          address_postcode: enquiry.location_postcode,
          address_country: enquiry.location_country || "GB",
          status: "ACTIVE",
          retention_status: "ACTIVE",
          created_at: nowIso,
          updated_at: nowIso,
        };
        FIXTURE_CLIENTS.push(client);
      }

      // Generate server reference
      const yy = String(new Date().getFullYear()).slice(-2);
      const mm = String(new Date().getMonth() + 1).padStart(2, "0");
      const seq = String(FIXTURE_CASES.length + 1).padStart(3, "0");
      const reference = `MAT-${yy}${mm}-${seq}`;
      const matterId = `mat-${String(FIXTURE_CASES.length + 1).padStart(3, "0")}`;

      const matterTitle = enquiry.organisation_name
        ? `${enquiry.enquiry_type.replace(/_/g, " ")} — ${enquiry.organisation_name}`
        : `${enquiry.enquiry_type.replace(/_/g, " ")} — ${enquiry.contact_name}`;

      const newMatter: Matter = {
        id: matterId,
        reference,
        client_organisation_id: client.id,
        title: matterTitle,
        matter_type: mapCategoryToMatterType(enquiry.enquiry_type),
        description: enquiry.narrative || `Converted from enquiry ${enquiry.reference}`,
        investigation_objective: enquiry.narrative || undefined,
        status: "OPEN",
        priority: mapUrgencyToPriority(enquiry.urgency),
        confidentiality: "CONFIDENTIAL",
        opened_at: nowIso,
        target_date: enquiry.deadline_at || undefined,
        lead_investigator_id: enquiry.assigned_to || undefined,
        case_manager_id: session.userId,
        created_from_enquiry_id: enquiry.id,
        created_by_user_id: session.userId,
        retention_status: "ACTIVE",
        created_at: nowIso,
        updated_at: nowIso,
      };

      // Add to cases
      FIXTURE_CASES.unshift(newMatter);

      // Mutate enquiry to reflect conversion
      enquiry.converted_to_matter_id = newMatter.id;
      enquiry.converted_to_client_id = client.id;
      enquiry.converted_at = nowIso;
      enquiry.status = "INSTRUCTED";
      enquiry.updated_at = nowIso;

      // Event
      FIXTURE_CASE_EVENTS.unshift({
        id: `evt-${Date.now()}`,
        matter_id: newMatter.id,
        event_type: "CASE_OPENED",
        title: `Matter Opened from Enquiry ${enquiry.reference}`,
        description: `Enquiry converted by ${session.name}. Instructing Client: ${client.legal_name}`,
        actor_user_id: session.userId,
        occurred_at: nowIso,
        visibility: "INTERNAL_ONLY",
        created_at: nowIso,
      });

      // Audit log
      await logAuditEvent({
        eventType: "LEAD_CONVERTED_TO_CASE",
        actorUserId: session.userId,
        actorName: session.name,
        entityType: "ENQUIRY",
        entityId: enquiry.id,
        entityReference: enquiry.reference,
        matterId: newMatter.id,
        description: `Converted Enquiry ${enquiry.reference} to Matter ${newMatter.reference}`,
        newState: { matterId: newMatter.id, reference: newMatter.reference },
      });

      return NextResponse.json(
        {
          success: true,
          data: newMatter,
          reference: newMatter.reference,
        },
        { status: 201 }
      );
    } catch (err) {
      console.error("[ENQUIRY_CONVERT_ERROR]", err);
      return NextResponse.json(
        { error: "INTERNAL_ERROR", message: "Failed to convert enquiry to matter." },
        { status: 500 }
      );
    }
  }
);
