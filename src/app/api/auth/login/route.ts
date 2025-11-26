import { NextResponse } from "next/server"

const AUTH_COOKIE = "demo-auth"
const ONE_DAY = 60 * 60 * 24

// Dummy user database
const DUMMY_USERS = [
  { id: "1", email: "user@example.com", password: "password123", name: "John Doe" },
  { id: "2", email: "admin@example.com", password: "admin123", name: "Admin User" },
  { id: "3", email: "test@example.com", password: "test123", name: "Test User" },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body as { email?: string; password?: string }

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    // Find user in dummy database
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 })
    }

    // Create session
    const sessionData = {
      userId: user.id,
      email: user.email,
      name: user.name,
    }

    const response = NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      message: "Login successful.",
    })

    // Set session cookie
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
  } catch (error) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}
