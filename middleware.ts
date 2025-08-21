import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Allow access to login page
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next()
  }

  // Check authentication cookie
  const authCookie = request.cookies.get("auth")

  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const authData = JSON.parse(authCookie.value)

    if (!authData.authenticated) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Admin page access control
    if (request.nextUrl.pathname === "/admin") {
      if (!authData.isAdmin) {
        return NextResponse.redirect(new URL("/", request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    // Invalid cookie format
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * Now ALL paths including /notion require authentication
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
}
