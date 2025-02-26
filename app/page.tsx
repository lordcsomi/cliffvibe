import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 pt-16 sm:p-4 text-center bg-gradient-to-b from-background to-background/50">
      <div className="max-w-3xl space-y-10">
        <h1 className="text-7xl font-black tracking-tighter sm:text-8xl bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
          TAKE THE LEAP
        </h1>
        <p className="text-xl text-muted-foreground font-light tracking-wide">
          Community-driven spots for thrill seekers.
          <span className="block mt-2 text-foreground/70">Cliffs • Bridges • Buildings • Water • Urban</span>
        </p>
        <div className="flex justify-center gap-6 pt-4">
          <Button asChild size="lg" className="text-lg px-12 py-6 rounded-full hover:scale-105 transition-transform">
            <Link href="/map">
              EXPLORE
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
