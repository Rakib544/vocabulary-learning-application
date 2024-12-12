import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_TOKEN_SECRET });
    const pathname = req.nextUrl.pathname;

    const publicPaths = ["/auth/signin", "/auth/signup"];

    // Check if the user is authenticated
    if (!token) {
      // Allow access to public paths
      if (publicPaths.includes(pathname)) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL(`/auth/signin`, req.url));
    }

    const userRole = token.role;

    if (userRole === "ADMIN") {
      if (!pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL(`/dashboard`, req.url));
      }
    } else if (userRole === "USER") {
      const allowedUserPaths = ["/tutorials", "/lessons"];
      if (!allowedUserPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL(`/lessons`, req.url));
      }
    } else {
      return NextResponse.redirect(new URL(`/auth/signin`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
    secret: process.env.JWT_TOKEN_SECRET,
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tutorials",
    "/lessons/:path*",
    "/auth/signin",
    "/auth/signup",
    "/:path*",
  ],
};
