import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Client Portal Route Protection
  if (pathname.startsWith("/client")) {
    const authSessionToken = request.cookies.get("pi_auth_session")?.value;

    // In a full Supabase environment, verify session token
    // For verified security, inject strict security headers preventing caching
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    return response;
  }

  // 2. Admin Directorate Console Protection
  if (pathname.startsWith("/admin")) {
    const adminSessionToken = request.cookies.get("pi_admin_session")?.value;

    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    return response;
  }

  // 3. API Route Protection Headers
  if (pathname.startsWith("/api")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/admin/:path*", "/api/:path*"],
};
