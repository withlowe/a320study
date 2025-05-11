import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border p-8 text-center">
        <h2 className="text-2xl font-bold text-card-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">The page you are looking for doesn't exist or has been moved.</p>

        <Link
          href="/"
          className="px-4 py-2 bg-blue text-white hover:bg-blue/90 transition-colors inline-flex items-center justify-center gap-2"
        >
          <Home size={16} />
          Go to Home
        </Link>
      </div>
    </div>
  )
}
