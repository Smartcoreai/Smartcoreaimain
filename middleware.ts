import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only set the default-language cookie when the user has not explicitly chosen
  if (!request.cookies.get("lang")) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    const isNorwegian = /\b(nb|nn|no)\b/i.test(acceptLanguage);
    response.cookies.set("defaultLang", isNorwegian ? "no" : "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
