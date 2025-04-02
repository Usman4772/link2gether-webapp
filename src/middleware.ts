import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const onboardingStatus = req.cookies.get("onboardingStatus")?.value;
  const { pathname } = req.nextUrl;
  if (pathname == "/login" || pathname == "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }
  if (!token && pathname !== "/login" && pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (
    pathname == "/onboarding/communities" ||
    pathname == "/onboarding/categories"
  ) {
    if (onboardingStatus === "completed") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (
    onboardingStatus !== "completed" &&
    pathname !== "/onboarding/communities" &&
    pathname !== "/onboarding/categories"
  ) {
    console.log("redirecting");
    return NextResponse.redirect(new URL("/onboarding/categories", req.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/explore",
    "/register",
    "/feed",
    "/onboarding/:path*",
    "/dashboard/:path*",
    "/community/:path*",
    "/user/:path*",
  ],
};
