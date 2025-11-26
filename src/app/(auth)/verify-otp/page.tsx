"use client"

import Link from "next/link"
import { useState, useTransition, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password")
    }
  }, [email, router])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const otpString = otp.join("")
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code.")
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpString }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || "Invalid OTP.")
          return
        }

        // Redirect to reset password page with token
        router.push(
          `/reset-password?token=${encodeURIComponent(data.resetToken)}&email=${encodeURIComponent(email)}`
        )
      } catch (err) {
        setError("An error occurred. Please try again.")
      }
    })
  }

  if (!email) {
    return null
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-12">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
        <p className="text-xs tracking-[0.4em] text-[var(--muted-foreground)] uppercase">
          Verify Code
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
          Enter verification code
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          We&apos;ve sent a 6-digit code to <strong>{email}</strong>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl"
      >
        {error && (
          <div className="rounded-2xl border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="h-14 w-14 rounded-2xl border border-[var(--border)] bg-[var(--background)] text-center text-2xl font-semibold text-[var(--foreground)] shadow-inner focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isPending || otp.join("").length !== 6}
          className="w-full rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-lg disabled:opacity-50"
        >
          {isPending ? "Verifying..." : "Verify code"}
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <Link
          href="/sign-in"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
        >
          Cancel
        </Link>
      </div>
    </section>
  )
}
