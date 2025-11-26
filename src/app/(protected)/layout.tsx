import { cookies } from "next/headers"
import { SidebarProvider, SidebarInset, SidebarTrigger, AppSidebar } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogoutButton } from "@/components/logout-button"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <p className="text-sm font-semibold tracking-[0.35em] text-[var(--muted-foreground)]">
              Clay UI
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
