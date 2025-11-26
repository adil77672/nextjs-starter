import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const AUTH_COOKIE = "demo-auth"
const ONE_DAY = 60 * 60 * 24

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(AUTH_COOKIE)?.value

  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false })
  }

  try {
    const sessionData = JSON.parse(sessionCookie)
    return NextResponse.json({
      authenticated: true,
      user: {
        id: sessionData.userId,
        email: sessionData.email,
        name: sessionData.name,
      },
    })
  } catch {
    // Legacy cookie format (just "true")
    const authenticated = sessionCookie === "true"
    return NextResponse.json({ authenticated })
  }
}

// Legacy POST endpoint for demo purposes (kept for backward compatibility)
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const { email } = body as { email?: string }

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 })
  }

  const sessionData = {
    userId: "demo",
    email,
    name: "Demo User",
  }

  const response = NextResponse.json({
    authenticated: true,
    user: sessionData,
    message: "Session cookie has been issued.",
  })

  response.cookies.set({
    name: AUTH_COOKIE,
    value: JSON.stringify(sessionData),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
    path: "/",
  })

  return response
}

export async function DELETE() {
  const response = NextResponse.json({
    authenticated: false,
    message: "Signed out.",
  })

  response.cookies.set({
    name: AUTH_COOKIE,
    value: "",
    expires: new Date(0),
    path: "/",
  })

  return response
}
