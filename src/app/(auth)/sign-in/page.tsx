"use client";

import Link from "next/link";

import { AuthPanel } from "@/components/auth-panel";

export default function SignInPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--muted-foreground)]">Auth</p>
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Sign in to continue</h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          This page uses the same demo cookie auth flow as the homepage. Issue a session to unlock the dashboard route.
        </p>
      </div>
      <AuthPanel />
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
        >
          Back to marketing site
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-[var(--primary-foreground)] shadow"
        >
          Go to dashboard
        </Link>
      </div>
    </section>
  );
}

