import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-semibold">
            CliffVibe
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/map">Map</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
