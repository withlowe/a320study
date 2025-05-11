"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 bg-card text-card-foreground hover:bg-secondary/80 transition-colors flex-shrink-0"
      aria-label="Toggle theme"
    >
      <span className="relative block w-5 h-5">
        <Sun className="absolute inset-0 h-full w-full transition-opacity opacity-100 dark:opacity-0" />
        <Moon className="absolute inset-0 h-full w-full transition-opacity opacity-0 dark:opacity-100" />
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
