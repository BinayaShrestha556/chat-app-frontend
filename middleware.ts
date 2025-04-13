import { DEFAULT_LOGIN_REDIRECT, redirectToDashboardRoute } from "@/routes";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const isRedirect = redirectToDashboardRoute.includes(nextUrl.pathname);

  if (isRedirect) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
