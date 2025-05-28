import { NextResponse } from "next/server";

import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;

  function isRoutePublic(route: string) {
    // Check if the route matches any of the patterns in publicRoutes
    return publicRoutes.some((pattern) => {
      // If the pattern ends with '/*', treat it as a wildcard match
      if (pattern.endsWith("/*")) {
        const prefix = pattern.slice(0, -2); // Remove '/*' from the pattern
        // Check if the route starts with the prefix
        return route.startsWith(prefix);
      } else {
        // Otherwise, treat it as an exact match
        return route === pattern;
      }
    });
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = isRoutePublic(nextUrl.pathname);

  // Handle referral code
  const referralCode = nextUrl.searchParams.get("ref");

  // Create a response object to modify cookies
  let response: Response | NextResponse;

  if (isApiAuthRoute) {
    response = NextResponse.next();
  } else if (isAuthRoute) {
    if (isLoggedin) {
      response = NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
      );
    } else {
      response = NextResponse.next();
    }
  } else if (!isLoggedin && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    response = NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  } else {
    response = NextResponse.next();
  }

  // Add the referral code to the response cookie (if it exists)
  if (referralCode) {
    if (response instanceof NextResponse) {
      console.log(`referralCode - ${referralCode} is added in the cookies`);
      response.cookies.set("referralCode", referralCode, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/", // Available across the entire site
      });
    }
  }

  return response;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
