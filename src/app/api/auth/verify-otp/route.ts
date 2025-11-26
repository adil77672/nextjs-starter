import { NextResponse } from "next/server"
import { OTP_STORE } from "../forgot-password/route"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, otp } = body as { email?: string; otp?: string }

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 })
    }

    const storedData = OTP_STORE.get(email)

    if (!storedData) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 })
    }

    if (Date.now() > storedData.expiresAt) {
      OTP_STORE.delete(email)
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      )
    }

    if (storedData.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP." }, { status: 400 })
    }

    // Generate reset token (in production, use JWT or secure token)
    const resetToken = Buffer.from(`${email}:${Date.now()}`).toString("base64")

    // Store reset token (in production, use database)
    OTP_STORE.set(`reset_${email}`, {
      otp: resetToken,
      expiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes
      email,
    })

    // Remove OTP after successful verification
    OTP_STORE.delete(email)

    return NextResponse.json({
      success: true,
      resetToken,
      message: "OTP verified successfully.",
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}
