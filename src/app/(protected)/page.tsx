"use client"

import Link from "next/link"
import { useSession } from "@/lib/api/auth"
import { LayoutDashboard, User, Settings } from "lucide-react"

export default function HomeDashboardPage() {
  const { data: session, isLoading } = useSession()

  if (isLoading) {
    return (
      <section className="flex flex-col gap-6 px-6 py-10">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
          <p className="text-[var(--muted-foreground)]">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6 px-6 py-10">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Dashboard</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}! This is your main
          workspace.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/profile"
          className="group rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg transition-all hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] transition-transform group-hover:scale-110">
              <User className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Profile</h2>
              <p className="text-sm text-[var(--muted-foreground)]">View your profile</p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard"
          className="group rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg transition-all hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] transition-transform group-hover:scale-110">
              <LayoutDashboard className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Dashboard</h2>
              <p className="text-sm text-[var(--muted-foreground)]">View dashboard</p>
            </div>
          </div>
        </Link>

        <Link
          href="/settings"
          className="group rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg transition-all hover:shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)] transition-transform group-hover:scale-110">
              <Settings className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Settings</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Manage settings</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Quick Actions</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Account Status</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {session?.authenticated ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="size-2 rounded-full bg-green-500"></div>
          </div>
          {session?.user && (
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Email</p>
                <p className="text-xs text-[var(--muted-foreground)]">{session.user.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
