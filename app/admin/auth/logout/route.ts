import { NextRequest, NextResponse } from "next/server";
import { destroySession, getSession } from "@/lib/auth/session";
import { logAuthEvent } from "@/lib/audit/logger";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (session) {
    await logAuthEvent("AUTH_LOGOUT", {
      actorUserId: session.userId,
      actorName: session.name,
      ipAddress: request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? undefined,
      userAgent: request.headers.get("user-agent") ?? undefined,
      description: `User ${session.name} signed out`,
    });
  }

  await destroySession();

  return NextResponse.redirect(new URL("/admin/auth/login", request.url));
}

// Redirect GET requests to login (no direct URL-bar access to logout)
export async function GET() {
  return NextResponse.redirect("/admin/auth/login");
}
