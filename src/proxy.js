import { NextResponse } from "next/server";
import { auth } from "./lib/auth"; 

export default async function middleware(request) {
  try {

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (session) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Middleware session error:", error);
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/doctor/:path*"],
};