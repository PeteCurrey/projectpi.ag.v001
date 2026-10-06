import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { logAuditEvent } from "@/lib/security/audit";

// In-memory enquiry store for active demo/verification
interface StoredEnquiry {
  id: string;
  reference: string;
  submittedAt: string;
  status: string;
  urgency: string;
  matterType: string;
  documentType?: string;
  narrative: string;
  professionalClientType: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  organisationName?: string;
  location?: string;
}

export const enquiriesStore: StoredEnquiry[] = [];

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (Prevent denial-of-service / spam)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const rateCheck = checkRateLimit(`enquiry_${ip}`, 5, 60 * 1000); // 5 submissions per minute per IP

    if (!rateCheck.success) {
      await logAuditEvent({
        action: "PERMISSION_DENIED",
        actorIp: ip,
        notes: "Rate limit exceeded on /api/enquiries submission endpoint",
      });
      return NextResponse.json(
        { error: "Too many submissions. Please wait before attempting again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // 2. Parse and validate JSON payload
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const {
      matterType,
      documentType,
      urgency,
      narrative,
      professionalClientType,
      fullName,
      email,
      telephone,
      organisationName,
      location,
    } = body;

    // Strict field validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json({ error: "A valid full name is required" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@") || email.length > 254) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    // 3. Generate secure internal reference (ENQ-YYMMDD-XXXX)
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const reference = `ENQ-${datePart}-${randomPart}`;

    const newEnquiry: StoredEnquiry = {
      id: `enq_${Date.now()}`,
      reference,
      submittedAt: new Date().toISOString(),
      status: "NEW",
      urgency: urgency || "STANDARD",
      matterType: matterType || "PROCESS_SERVING",
      documentType: documentType || undefined,
      narrative: typeof narrative === "string" ? narrative.slice(0, 5000) : "",
      professionalClientType: professionalClientType || "SOLICITOR",
      contactName: fullName.trim(),
      contactEmail: email.trim().toLowerCase(),
      contactPhone: typeof telephone === "string" ? telephone.slice(0, 30) : undefined,
      organisationName: typeof organisationName === "string" ? organisationName.slice(0, 100) : undefined,
      location: typeof location === "string" ? location.slice(0, 100) : undefined,
    };

    enquiriesStore.push(newEnquiry);

    // 4. Record audit log without leaking sensitive personal narrative
    await logAuditEvent({
      action: "ENQUIRY_SUBMITTED",
      entityType: "ENQUIRY",
      entityId: newEnquiry.id,
      actorIp: ip,
      metadata: {
        reference: newEnquiry.reference,
        matterType: newEnquiry.matterType,
        urgency: newEnquiry.urgency,
      },
    });

    return NextResponse.json({
      success: true,
      reference: newEnquiry.reference,
      submittedAt: newEnquiry.submittedAt,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "An error occurred while processing your enquiry. Please contact us securely." },
      { status: 500 }
    );
  }
}
