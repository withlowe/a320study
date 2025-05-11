import { getNotes, getFolders } from "@/lib/notes"
import { NoteGrid } from "@/components/note-grid"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "lucide-react"

export default function Home() {
  // Get notes and folders
  const notes = getNotes()
  const folders = getFolders()

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-1">A320 Study</h1>
              <p className="text-muted-foreground">A collection of principles and concepts</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search notes..."
                  className="w-full h-10 bg-card border-0 text-card-foreground pl-10 pr-4 py-2 focus:ring-0 focus:outline-none"
                  id="search-input"
                />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {notes.length === 0 ? (
          <div className="bg-card border border-border p-8 text-center">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">No Notes Found</h2>
            <p className="text-muted-foreground mb-6">
              Add markdown files to the <code>/notes</code> directory to get started.
            </p>
            <div className="bg-secondary p-4 text-left max-w-lg mx-auto">
              <p className="text-sm font-mono mb-2 text-muted-foreground">Example note structure:</p>
              <pre className="text-xs overflow-x-auto p-2 bg-background">
                {`---
title: My First Note
tags: [example, getting-started]
pattern: dots
---

## Overview

This is my first note in the library.
`}
              </pre>
            </div>
          </div>
        ) : (
          <NoteGrid initialNotes={notes} initialFolders={folders} />
        )}
      </div>
    </main>
  )
}
