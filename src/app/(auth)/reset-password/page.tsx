"use client"

import Link from "next/link"
import { useState, useTransition, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const email = searchParams.get("email") || ""

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!token || !email) {
      router.push("/forgot-password")
    }
  }, [token, email, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resetToken: token,
            newPassword: formData.password,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || "Failed to reset password.")
          return
        }

        setSuccess(true)
        setTimeout(() => {
          router.push("/sign-in")
        }, 2000)
      } catch (err) {
        setError("An error occurred. Please try again.")
      }
    })
  }

  if (!token || !email) {
    return null
  }

  if (success) {
    return (
      <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-12">
        <div className="rounded-3xl border border-green-500/50 bg-green-500/10 p-8 shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="size-16 text-green-600 dark:text-green-400" />
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-[var(--foreground)]">Password reset!</h1>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Your password has been successfully reset. Redirecting to sign in...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-12">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
        <p className="text-xs tracking-[0.4em] text-[var(--muted-foreground)] uppercase">
          Reset Password
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">Set new password</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Enter your new password for <strong>{email}</strong>
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
          <label
            htmlFor="password"
            className="text-xs font-semibold text-[var(--muted-foreground)]"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] shadow-inner focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="••••••••"
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-xs font-semibold text-[var(--muted-foreground)]"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] shadow-inner focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="••••••••"
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-lg disabled:opacity-50"
        >
          {isPending ? "Resetting..." : "Reset password"}
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
