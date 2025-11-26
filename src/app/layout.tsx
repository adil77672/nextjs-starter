import type { Metadata } from "next"
import { Lora, Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Claymorphism Next Starter",
  description:
    "Minimal Next.js App Router starter with Tailwind CSS v4, claymorphism theming, and a built-in API heartbeat.",
  keywords: ["Next.js", "Tailwind CSS", "App Router", "claymorphism"],
}

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const serif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
  display: "swap",
})

const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
})

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased"
        suppressHydrationWarning
      >
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
