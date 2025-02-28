import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavbarWrapper } from "@/components/navbar-wrapper"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CliffVibe",
  description: "Explore climbing spots with our interactive map",
  icons: {
    icon: "/cliffvibe-icon-no-back-512.png",
    apple: "/cliffvibe-icon-no-back-512.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <div className="relative flex min-h-screen flex-col">
          <NavbarWrapper />
          <main className="flex-1">{children}</main>
        </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
