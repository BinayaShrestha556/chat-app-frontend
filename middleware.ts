import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  redirectToDashboardRoute,
} from "@/routes";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const response = await fetch("http://localhost:3000/api/auth/get-user", {
    credentials: "include", // Important for session cookies
    headers: {
      Cookie: req.headers.get("cookie") || "", // Forward cookies
    },
  });

  let isLoggedIn = false;

  if (response.status === 200) {
    isLoggedIn = true;
  }
  const { nextUrl } = req;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isRedirect = redirectToDashboardRoute.includes(nextUrl.pathname);
  if (isApiRoute) {
    return;
  }
  if (isRedirect) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
