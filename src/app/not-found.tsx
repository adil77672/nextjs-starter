"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--background)] px-6 text-center text-[var(--foreground)]">
      <div className="space-y-3">
        <p className="text-xs tracking-[0.4em] text-[var(--muted-foreground)] uppercase">404</p>
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          The route you tried to visit doesn&apos;t exist. Use the links below to get back on track.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-[var(--primary-foreground)] shadow"
        >
          Go to dashboard
        </Link>
        <Link
          href="/sign-in"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
        >
          Sign in
        </Link>
      </div>
    </main>
  )
}
