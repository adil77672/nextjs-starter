"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [demoOtp, setDemoOtp] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setDemoOtp(null)

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || "Failed to send reset code.")
          return
        }

        setSuccess(true)
        if (data.demoOtp) {
          setDemoOtp(data.demoOtp)
        }
      } catch (err) {
        setError("An error occurred. Please try again.")
      }
    })
  }

  if (success) {
    return (
      <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-12">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
          <p className="text-xs tracking-[0.4em] text-[var(--muted-foreground)] uppercase">
            Check Your Email
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">Reset code sent</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            We&apos;ve sent a 6-digit code to <strong>{email}</strong>. Please check your inbox.
          </p>
          {demoOtp && (
            <div className="mt-4 rounded-2xl border border-[var(--primary)] bg-[var(--primary)]/10 p-4">
              <p className="mb-2 text-xs font-semibold text-[var(--muted-foreground)]">
                Demo Mode - OTP Code:
              </p>
              <p className="font-mono text-2xl font-bold text-[var(--primary)]">{demoOtp}</p>
            </div>
          )}
        </div>

        <Link
          href={`/verify-otp?email=${encodeURIComponent(email)}`}
          className="w-full rounded-full bg-[var(--primary)] px-6 py-3 text-center text-sm font-semibold text-[var(--primary-foreground)] shadow-lg"
        >
          Continue to verify OTP
        </Link>

        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-12">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
        <p className="text-xs tracking-[0.4em] text-[var(--muted-foreground)] uppercase">
          Reset Password
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">Forgot password?</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Enter your email address and we&apos;ll send you a code to reset your password.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl"
      >
        {error && (
          <div className="rounded-2xl border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-semibold text-[var(--muted-foreground)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] shadow-inner focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="user@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-lg disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Send reset code"}
        </button>
      </form>

      <Link
        href="/sign-in"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </section>
  )
}
