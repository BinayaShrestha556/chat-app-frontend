import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  redirectToDashboardRoute,
} from "@/routes";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const response = NextResponse.next(); // Create a mutable response object

  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const refreshToken = req.cookies.get("refresh_token")?.value;

  // --- 1. No Refresh Token Found ---
  if (!refreshToken) {
    console.log("No refresh_token found. Redirecting to login...");
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return response; // Allow access to auth routes
  }

  let isAuthenticated = false; // Flag to track authentication status

  try {
    // --- 2. Attempt Token Refresh ---
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          // Only include Content-Type if your backend actually expects a JSON body
          // "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        // If your backend expects a body for refresh, add it here, e.g.:
        // body: JSON.stringify({}),
      }
    );

    const data = await res.json();

    if (res.status === 200 && data.accessToken) {
      // --- 3. Refresh Successful: Set new Access Token ---
      isAuthenticated = true;
      response.cookies.set({
        name: "access_token",
        value: data.accessToken,
        httpOnly: true,
        maxAge: 60 * 60 * 12, // 12 hours
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      console.log("Access token refreshed successfully.");
    } else {
      // --- 4. Refresh Failed (Non-200 Status): Clear Tokens & Redirect ---
      console.error(
        `Token refresh failed with status ${res.status}:`,
        data.message || "Unknown error"
      );
      response.cookies.delete("refresh_token");
      response.cookies.delete("access_token"); // Ensure old access token is also cleared
      if (!isAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return response; // Allow access to auth routes if refresh failed on an auth route
    }
  } catch (error) {
    // --- 5. Network/Other Error During Refresh: Clear Tokens & Redirect ---
    console.error("Error during token refresh:", error);
    response.cookies.delete("refresh_token");
    response.cookies.delete("access_token"); // Ensure old access token is also cleared
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return response; // Allow access to auth routes if error on an auth route
  }

  // --- 6. Post-Authentication Redirection Logic ---
  if (isAuthenticated) {
    if (isAuthRoute) {
      // If authenticated and trying to access an auth route, redirect to dashboard
      console.log(
        "Authenticated user accessing auth route. Redirecting to dashboard."
      );
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
    const isRedirectToDashboardRoute = redirectToDashboardRoute.includes(
      nextUrl.pathname
    );
    if (isRedirectToDashboardRoute) {
      // If authenticated and trying to access a route that redirects to dashboard, redirect
      console.log(
        "Authenticated user accessing redirect route. Redirecting to dashboard."
      );
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
  }

  // If none of the above conditions met, allow the request to proceed with the modified response
  console.log(`Allowing request for: ${req.url}`);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
