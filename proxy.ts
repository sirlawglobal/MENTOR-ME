import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/auth/session";

// Define paths that do not require authentication
const publicPaths = ["/", "/login", "/signup"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(path);

  // Skip middleware for API routes or static files
  if (path.startsWith("/api") || path.startsWith("/_next") || path.includes(".")) {
    return NextResponse.next();
  }

  const session = await getSession();

  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath && session && path !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Update session expiration on each request
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
