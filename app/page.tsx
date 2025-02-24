import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          Discover Amazing Climbing Spots
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore the world's best climbing locations with our interactive map.
          Find detailed information about routes, difficulty levels, and more.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/map">
              Explore Map
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8">
            <Link href="#features">
              Learn More
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
