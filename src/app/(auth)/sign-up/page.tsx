"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || "Registration failed.")
          return
        }

        // Redirect to dashboard on success
        router.push("/")
        router.refresh()
      } catch (err) {
        setError("An error occurred. Please try again.")
      }
    })
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-12">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
        <p className="text-xs tracking-[0.4em] text-[var(--muted-foreground)] uppercase">
          Create Account
        </p>
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Sign up</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Create a new account to access the dashboard.
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
          <label htmlFor="name" className="text-xs font-semibold text-[var(--muted-foreground)]">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] shadow-inner focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-semibold text-[var(--muted-foreground)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] shadow-inner focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
            placeholder="user@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-xs font-semibold text-[var(--muted-foreground)]"
          >
            Password
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

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-lg disabled:opacity-50"
        >
          {isPending ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/sign-in"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
        >
          Already have an account? Sign in
        </Link>
        <Link
          href="/sign-in"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
        >
          Back to sign in
        </Link>
      </div>
    </section>
  )
}
