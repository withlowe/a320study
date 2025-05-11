"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border p-8 text-center">
        <h2 className="text-2xl font-bold text-card-foreground mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">We encountered an error while trying to display this page.</p>

        <div className="bg-secondary p-4 text-left mb-6">
          <p className="text-sm font-mono mb-2 text-muted-foreground">Error details:</p>
          <pre className="text-xs overflow-x-auto p-2 bg-background">{error.message}</pre>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue text-white hover:bg-blue/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Try again
          </button>

          <Link
            href="/"
            className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
