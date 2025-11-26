import { NextResponse } from "next/server"

// In-memory OTP store (for demo purposes)
// In production, use a database and send real emails
const OTP_STORE = new Map<string, { otp: string; expiresAt: number; email: string }>()

// Dummy user database
const DUMMY_USERS = [
  { id: "1", email: "user@example.com", password: "password123", name: "John Doe" },
  { id: "2", email: "admin@example.com", password: "admin123", name: "Admin User" },
  { id: "3", email: "test@example.com", password: "test123", name: "Test User" },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body as { email?: string }

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
    }

    // Check if user exists
    const user = DUMMY_USERS.find(u => u.email === email)
    if (!user) {
      // Don't reveal if user exists for security
      return NextResponse.json({
        message: "If an account exists with this email, we've sent a password reset code.",
      })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP
    OTP_STORE.set(email, { otp, expiresAt, email })

    // In production, send email here
    console.log(`[DEMO] OTP for ${email}: ${otp}`)

    return NextResponse.json({
      message: "If an account exists with this email, we've sent a password reset code.",
      // In demo mode, return OTP for testing
      demoOtp: process.env.NODE_ENV === "development" ? otp : undefined,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}

// Export OTP_STORE for verification endpoint
export { OTP_STORE }
