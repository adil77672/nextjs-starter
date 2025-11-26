import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const AUTH_COOKIE = "demo-auth"
const ONE_DAY = 60 * 60 * 24

// In-memory dummy user store (for demo purposes)
// In production, use a real database
let DUMMY_USERS = [
  { id: "1", email: "user@example.com", password: "password123", name: "John Doe" },
  { id: "2", email: "admin@example.com", password: "admin123", name: "Admin User" },
  { id: "3", email: "test@example.com", password: "test123", name: "Test User" },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body as {
      email?: string
      password?: string
      name?: string
    }

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required." },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = DUMMY_USERS.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: String(DUMMY_USERS.length + 1),
      email,
      password, // In production, hash the password!
      name,
    }

    DUMMY_USERS.push(newUser)

    // Create session
    const sessionData = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    }

    const response = NextResponse.json({
      authenticated: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      message: "Registration successful.",
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
