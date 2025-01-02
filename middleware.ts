import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const protectedRoutes = createRouteMatcher([
  "/dashboard(.*)",
  "/create-trust",
  "/profile",
]);

export default clerkMiddleware(async (auth, req) => {
  // Redirect to signin if user is not authenticated
  if (protectedRoutes(req))
    await auth.protect({ unauthenticatedUrl: "http://localhost:3000/signin" });

  // Redirect to dashboard user loged in visits signin/signup page
  if (!protectedRoutes(req)) {
    const { userId } = await auth();
    const requestedPath = req.nextUrl.pathname;
    const routesUnavailableOnAuth =
      requestedPath === "/signin" || requestedPath === "/signup";

    if (userId && routesUnavailableOnAuth)
      return NextResponse.redirect("http://localhost:3000/dashboard");
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
