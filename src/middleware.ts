import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    pathname === "userAuth/login" ||
    pathname === "userAuth/signup" ||
    pathname === "userAuth/verifyemail/:path*";

  const adminRoutes = pathname.match(/^\/cms/);

  console.log(adminRoutes);

  const token = request.cookies.get("token")?.value;

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/userAuth/login", request.nextUrl));
  }

  if (adminRoutes && token) {
  }
}

export const config = {
  matcher: [
    // user protected routes
    "/user/:path*",

    "/services/order/:path*",

    // admin protected routes
    "/cms/:path*",
  ],
};
