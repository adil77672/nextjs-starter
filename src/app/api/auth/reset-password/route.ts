import { NextResponse } from "next/server"
import { OTP_STORE } from "../forgot-password/route"

// Dummy user database (in production, use a real database)
let DUMMY_USERS = [
  { id: "1", email: "user@example.com", password: "password123", name: "John Doe" },
  { id: "2", email: "admin@example.com", password: "admin123", name: "Admin User" },
  { id: "3", email: "test@example.com", password: "test123", name: "Test User" },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { resetToken, newPassword } = body as {
      resetToken?: string
      newPassword?: string
    }

    if (!resetToken || !newPassword) {
      return NextResponse.json(
        { error: "Reset token and new password are required." },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      )
    }

    // Find reset token
    let email: string | null = null
    for (const [key, value] of OTP_STORE.entries()) {
      if (key.startsWith("reset_") && value.otp === resetToken) {
        email = value.email
        break
      }
    }

    if (!email) {
      return NextResponse.json({ error: "Invalid or expired reset token." }, { status: 400 })
    }

    // Verify token hasn't expired
    const resetData = OTP_STORE.get(`reset_${email}`)
    if (!resetData || Date.now() > resetData.expiresAt) {
      OTP_STORE.delete(`reset_${email}`)
      return NextResponse.json(
        { error: "Reset token has expired. Please request a new one." },
        { status: 400 }
      )
    }

    // Update password (in production, hash the password!)
    const userIndex = DUMMY_USERS.findIndex(u => u.email === email)
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found." }, { status: 404 })
    }

    DUMMY_USERS[userIndex].password = newPassword

    // Remove reset token
    OTP_STORE.delete(`reset_${email}`)

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now sign in with your new password.",
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}
