"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { NoteGrid } from "@/components/note-grid"
import { notesData, foldersData } from "@/lib/notes-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const [searchValue, setSearchValue] = useState("")
  const searchParams = useSearchParams()

  // Handle tag filtering from URL
  useEffect(() => {
    const tag = searchParams.get("tag")
    if (tag) {
      // Dispatch a custom event to set the tag filter in the NoteGrid component
      const event = new CustomEvent("filter-tag", { detail: tag })
      window.dispatchEvent(event)
    }
  }, [searchParams])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    // Dispatch a custom event to update the search in the NoteGrid component
    const event = new CustomEvent("search-notes", { detail: value })
    window.dispatchEvent(event)
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-1">A320 Study</h1>
              <p className="text-muted-foreground">A collection of principles and concepts</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="w-full bg-card border-0 text-card-foreground pl-10 pr-4 py-2 focus:ring-0 focus:outline-none"
                  value={searchValue}
                  onChange={handleSearch}
                />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <NoteGrid notes={notesData} folders={foldersData} />
      </div>
    </main>
  )
}
