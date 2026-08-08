import { NextResponse } from 'next/server';

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const session = request.cookies.get("better-auth.session_token");

  const isProtectedPath = pathname.startsWith('/doctor/') || pathname.startsWith('/dashboard');
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/doctor/:path*', '/dashboard/:path*', '/login', '/register'],
};