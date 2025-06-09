import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  redirectToDashboardRoute,
} from "@/routes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// // Helper: Fetch user with access token
// async function getUser(accessToken: string) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-user`,
//       {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         cache: "no-store",
//       }
//     );
//     if (res.ok) return await res.json();
//     if (res.status === 403) return "expired";
//     return null;
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     return null;
//   }
// }

// // Helper: Refresh token
// async function refreshAccessToken(refreshToken: string) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
//       {
//         method: "POST",
//         headers: { Authorization: `Bearer ${refreshToken}` },
//         cache: "no-store",
//       }
//     );

//     if (res.ok) return await res.json();
//     return null;
//   } catch (err) {
//     console.error("Error refreshing token:", err);
//     return null;
//   }
// }

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const response = NextResponse.next();

  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    console.log("No tokens found. Redirecting to login...");
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return response;
  }

  let user = null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/validate-refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  //  const data= await res.json()
  if (res.status === 200) {
    user = true;
  }
  if (!user && !isAuthRoute) {
    console.log("Not authenticated. Redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }
  const isRedirectToDashboardRoute = redirectToDashboardRoute.includes(
    nextUrl.pathname
  );
  if (user && isRedirectToDashboardRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }
  console.log(req.url);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
