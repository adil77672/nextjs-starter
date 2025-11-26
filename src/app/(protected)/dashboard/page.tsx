"use client"

import Link from "next/link"
import { useSession } from "@/lib/api/auth"
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react"

export default function DashboardPage() {
  const { data: session, isLoading } = useSession()

  if (isLoading) {
    return (
      <section className="flex flex-col gap-6 px-6 py-10">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
          <p className="text-[var(--muted-foreground)]">Loading dashboard...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6 px-6 py-10">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Dashboard</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Overview of your account and activity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Total Users</p>
              <p className="text-2xl font-semibold text-[var(--foreground)]">1,234</p>
            </div>
            <Users className="size-8 text-[var(--primary)]" />
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Revenue</p>
              <p className="text-2xl font-semibold text-[var(--foreground)]">$12,345</p>
            </div>
            <TrendingUp className="size-8 text-[var(--primary)]" />
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Analytics</p>
              <p className="text-2xl font-semibold text-[var(--foreground)]">89%</p>
            </div>
            <BarChart3 className="size-8 text-[var(--primary)]" />
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">Activity</p>
              <p className="text-2xl font-semibold text-[var(--foreground)]">456</p>
            </div>
            <Activity className="size-8 text-[var(--primary)]" />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Recent Activity</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Welcome to Dashboard</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                Get started by exploring your profile
              </p>
            </div>
            <Link
              href="/profile"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--accent)]"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
