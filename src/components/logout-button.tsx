"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await fetch("/api/auth/session", { method: "DELETE" })
        router.push("/sign-in")
        router.refresh()
      } catch (error) {
        console.error("Logout failed:", error)
      }
    })
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] shadow-sm hover:bg-[var(--accent)] disabled:opacity-50"
      title="Sign out"
    >
      <LogOut className="size-4" />
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  )
}
