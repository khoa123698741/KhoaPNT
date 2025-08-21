import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /admin, /login)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ["/login"]

  // Check if the path is public
  const isPublicPath = publicPaths.includes(path)

  // Get the token from the cookies
  const token = request.cookies.get("auth-token")?.value

  // If it's a public path and user is already logged in, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  // If it's not a public path and no token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
