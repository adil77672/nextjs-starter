"use client"

import { useEffect, useState } from "react"
import { User, Mail, Calendar, Shield } from "lucide-react"

type UserData = {
  id: string
  email: string
  name: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const data = await response.json()
        if (data.authenticated && data.user) {
          setUser(data.user)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <section className="flex flex-col gap-6 px-6 py-10">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
          <p className="text-[var(--muted-foreground)]">Loading profile...</p>
        </div>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="flex flex-col gap-6 px-6 py-10">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
          <p className="text-[var(--muted-foreground)]">User not found.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6 px-6 py-10">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-[var(--foreground)]">Profile</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">
              <User className="size-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--muted-foreground)]">Full Name</p>
              <p className="text-lg font-semibold text-[var(--foreground)]">{user.name}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-foreground)]">
              <Mail className="size-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--muted-foreground)]">Email</p>
              <p className="text-lg font-semibold text-[var(--foreground)]">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)]">
              <Shield className="size-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--muted-foreground)]">Account ID</p>
              <p className="text-lg font-semibold text-[var(--foreground)]">{user.id}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
              <Calendar className="size-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--muted-foreground)]">Member Since</p>
              <p className="text-lg font-semibold text-[var(--foreground)]">2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Account Settings</h2>
        <div className="mt-4 space-y-4">
          <button className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-left text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--accent)]">
            Change Password
          </button>
          <button className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-left text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--accent)]">
            Update Email
          </button>
          <button className="w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-left text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--accent)]">
            Privacy Settings
          </button>
        </div>
      </div>
    </section>
  )
}
