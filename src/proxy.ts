/**
 * Route guard (Next.js 16 "proxy", formerly middleware).
 * Protects the dashboard and admin API; redirects signed-in users away from /login & /register.
 * Runs on the edge, so it only checks the session cookie/JWT — no DB access here.
 */
import { NextResponse, type NextRequest } from "next/server";

import { getToken } from "next-auth/jwt";

const PROTECTED = [/^\/dashboard(\/|$)/, /^\/api\/admin(\/|$)/];
const AUTH_PAGES = [/^\/login$/, /^\/register$/];

export async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({
    req,
    secret,
    secureCookie: req.nextUrl.protocol === "https:",
  });
  const isActive = Boolean(token) && token?.status === "active";

  if (PROTECTED.some((re) => re.test(pathname))) {
    if (!isActive) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (AUTH_PAGES.some((re) => re.test(pathname)) && isActive) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*", "/login", "/register"],
};
