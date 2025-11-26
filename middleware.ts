import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const AUTH_COOKIE = "demo-auth"
const PROTECTED_PREFIXES = ["/dashboard"]
const PROTECTED_EXACT = ["/"]
const AUTH_ROUTES = ["/sign-in", "/sign-up"]

const isProtected = (pathname: string) =>
  PROTECTED_EXACT.includes(pathname) || PROTECTED_PREFIXES.some(route => pathname.startsWith(route))

const isAuthRoute = (pathname: string) => AUTH_ROUTES.some(route => pathname.startsWith(route))

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get(AUTH_COOKIE)?.value

  // Check if session exists (supports both JSON format and legacy "true" format)
  const hasSession = !!sessionCookie && (sessionCookie === "true" || sessionCookie.startsWith("{"))

  if (isProtected(pathname) && !hasSession) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/sign-in"
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute(pathname) && hasSession) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = "/"
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
}
