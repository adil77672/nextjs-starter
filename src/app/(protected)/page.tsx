"use client";

import Link from "next/link";

export default function HomeDashboardPage() {
  return (
    <section className="flex flex-col gap-6 px-6 py-10">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Dashboard</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Welcome to the main workspace. This root route is protected by middleware—issue a demo cookie from the marketing page before coming back here.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/marketing"
            className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)]"
          >
            Visit marketing page
          </Link>
        </div>
      </div>
    </section>
  );
}
