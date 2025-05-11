import fs from "fs"
import path from "path"
import type { Note, Folder } from "@/lib/types"
import { fallbackNotes, fallbackFolders } from "./fallback-data"

// Base directory for notes
const NOTES_DIR = path.join(process.cwd(), "notes")

// Simple function to get all folders - uses only fallback data in preview environment
export function getFolders(): Folder[] {
  // In the v0 preview environment, just return the fallback folders
  return fallbackFolders
}

// Simple function to get all notes - uses only fallback data in preview environment
export function getNotes(): Note[] {
  // In the v0 preview environment, just return the fallback notes
  return fallbackNotes
}

// Get a single note by ID
export function getNote(id: string): Note | undefined {
  const notes = getNotes()
  return notes.find((note) => note.id === id)
}

// Get related notes (same folder)
export function getRelatedNotes(noteId: string, limit = 4): Note[] {
  const notes = getNotes()
  const currentNote = notes.find((note) => note.id === noteId)

  if (!currentNote || !currentNote.folderId) {
    return []
  }

  return notes.filter((note) => note.id !== noteId && note.folderId === currentNote.folderId).slice(0, limit)
}

// Ensure code blocks have proper spacing to avoid nesting in paragraphs
function ensureCodeBlockSpacing(content: string): string {
  // Replace code blocks that don't have empty lines before and after them
  return content.replace(/([^\n])(```[\s\S]*?```)/g, "$1\n\n$2\n\n")
}

// Create an example note if no notes exist
function createExampleNote() {
  try {
    const exampleDir = path.join(NOTES_DIR, "examples")
    if (!fs.existsSync(exampleDir)) {
      fs.mkdirSync(exampleDir, { recursive: true })
    }

    const exampleContent = `---
title: Example Note
tags: [example, getting-started]
pattern: dots
takeaways:
  - You can use YAML frontmatter for metadata
  - Notes are organized by folders
  - The design stays consistent
---

## This is an example note

This is a simple example note to demonstrate how the system works.

## How to organize notes

1. Create folders in the \`/notes\` directory
2. Add markdown files to those folders
3. Use YAML frontmatter for metadata

## Available frontmatter options

| Option | Description | Example |
|--------|-------------|---------|
| title | Note title | \`title: My Note\` |
| tags | Categories | \`tags: [tag1, tag2]\` |
| pattern | Visual style | \`pattern: dots\` |
| takeaways | Key points | \`takeaways: [Point 1, Point 2]\` |

## Pattern types

- dots
- shapes
- triangles
- lines
- circles
- grid
- concentric

## Code block example

\`\`\`javascript
function example() {
  return "Hello, world!";
}
\`\`\`

The code block above should render properly without hydration errors.
`

    fs.writeFileSync(path.join(exampleDir, "getting-started.md"), exampleContent)
    console.log("Created example note")
  } catch (error) {
    console.warn("Error creating example note:", error)
  }
}
