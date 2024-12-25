import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const unprotectedRoute = createRouteMatcher(["/signin(.*)", "/signup(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Redirect to signin if user is unauthenticated
  // and accesses protected page
  if (!unprotectedRoute(req))
    await auth.protect({ unauthenticatedUrl: "http://localhost:3000/signin" });

  // Redirect to homepage if unprotected pages are forcefully
  // visited while user is authenticated
  if (unprotectedRoute(req)) {
    const { userId } = await auth();
    if (userId) return NextResponse.redirect("http://localhost:3000");
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
