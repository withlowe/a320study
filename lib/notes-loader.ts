import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Note, Folder } from "@/lib/types"

// Define the notes directory path
const NOTES_DIR = path.join(process.cwd(), "notes")

// Function to get all folders from the file system
export async function getFolders(): Promise<Folder[]> {
  try {
    // Ensure the notes directory exists
    if (!fs.existsSync(NOTES_DIR)) {
      console.log(`Notes directory not found at ${NOTES_DIR}, creating it...`)
      fs.mkdirSync(NOTES_DIR, { recursive: true })

      // Create an example note
      const exampleDir = path.join(NOTES_DIR, "examples")
      fs.mkdirSync(exampleDir, { recursive: true })

      const exampleContent = `---
title: Example Note
tags: [example, getting-started]
pattern: dots
takeaways:
  - This is an automatically generated example note
  - Add your own markdown files to the /notes directory
---

## Welcome to Your Notes Library

This is an example note that was automatically generated because no notes were found.

## How to Add Notes

1. Create markdown files in the \`/notes\` directory
2. Use YAML frontmatter for metadata
3. Organize notes in folders for better categorization

## Example Frontmatter

\`\`\`yaml
---
title: My Note Title
tags: [tag1, tag2]
pattern: dots
takeaways:
  - Key point 1
  - Key point 2
---
\`\`\`

## Available Pattern Types

- dots
- shapes
- triangles
- lines
- circles
- grid
- concentric
`

      fs.writeFileSync(path.join(exampleDir, "getting-started.md"), exampleContent)
      console.log("Created example note")
    }

    console.log(`Looking for folders in ${NOTES_DIR}...`)
    const folders: Folder[] = []
    const dirEntries = await fs.promises.readdir(NOTES_DIR, { withFileTypes: true })

    // Get all directories
    for (const entry of dirEntries) {
      if (entry.isDirectory()) {
        console.log(`Found folder: ${entry.name}`)
        folders.push({
          id: entry.name,
          name: entry.name
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        })
      }
    }

    console.log(`Found ${folders.length} folders`)
    return folders
  } catch (error) {
    console.error("Error loading folders:", error)
    throw new Error(`Failed to load folders: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Function to get all notes from the file system
export async function getNotes(): Promise<Note[]> {
  try {
    // Ensure the notes directory exists
    if (!fs.existsSync(NOTES_DIR)) {
      console.log(`Notes directory not found at ${NOTES_DIR}, creating it...`)
      fs.mkdirSync(NOTES_DIR, { recursive: true })
      // The example note will be created in getFolders()
    }

    console.log(`Loading notes from ${NOTES_DIR}...`)
    const notes: Note[] = []
    const folders = await getFolders()

    // Process notes in folders
    for (const folder of folders) {
      const folderPath = path.join(NOTES_DIR, folder.id)
      try {
        console.log(`Reading files from folder: ${folder.id}`)
        const files = await fs.promises.readdir(folderPath)

        for (const file of files) {
          if (file.endsWith(".md")) {
            console.log(`Processing file: ${folder.id}/${file}`)
            const filePath = path.join(folderPath, file)
            const note = await processMarkdownFile(filePath, folder.id)
            if (note) {
              notes.push(note)
              console.log(`Added note: ${note.title}`)
            }
          }
        }
      } catch (error) {
        console.error(`Error processing folder ${folder.id}:`, error)
      }
    }

    // Process root notes (not in any folder)
    try {
      console.log("Reading files from root directory")
      const rootFiles = await fs.promises.readdir(NOTES_DIR)
      for (const file of rootFiles) {
        if (file.endsWith(".md")) {
          console.log(`Processing root file: ${file}`)
          const filePath = path.join(NOTES_DIR, file)
          const note = await processMarkdownFile(filePath)
          if (note) {
            notes.push(note)
            console.log(`Added root note: ${note.title}`)
          }
        }
      }
    } catch (error) {
      console.error("Error processing root notes:", error)
    }

    console.log(`Loaded ${notes.length} notes in total`)
    return notes
  } catch (error) {
    console.error("Error loading notes:", error)
    throw new Error(`Failed to load notes: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// Helper function to process a markdown file
async function processMarkdownFile(filePath: string, folderId?: string): Promise<Note | null> {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf8")
    const { data, content } = matter(fileContent)

    const filename = path.basename(filePath, ".md")
    const id = folderId ? `${folderId}-${filename}` : filename

    // Extract title from frontmatter or first heading
    let title = data.title
    if (!title) {
      const titleMatch = content.match(/^# (.+)$/m)
      title = titleMatch ? titleMatch[1] : filename
    }

    // Get tags from frontmatter
    const tags = data.tags
      ? Array.isArray(data.tags)
        ? data.tags
        : data.tags.split(",").map((tag: string) => tag.trim())
      : []

    // Get pattern type from frontmatter or generate random
    const patternType = data.pattern || getRandomPatternType()

    // Get takeaways if available in frontmatter
    const takeaways = data.takeaways ? (Array.isArray(data.takeaways) ? data.takeaways : [data.takeaways]) : []

    // Build the full content
    const fullContent = `# ${title}\n\n${content}`

    return {
      id,
      title,
      content: fullContent,
      color: "blue", // All notes use blue
      patternType,
      takeaways: takeaways.length > 0 ? takeaways : undefined,
      tags: tags.length > 0 ? tags : undefined,
      folderId: folderId,
    }
  } catch (error) {
    console.error(`Error processing markdown file ${filePath}:`, error)
    return null
  }
}

// Helper function to get a random pattern type
function getRandomPatternType(): "dots" | "shapes" | "triangles" | "lines" | "circles" | "grid" | "concentric" {
  const patterns = ["dots", "shapes", "triangles", "lines", "circles", "grid", "concentric"]
  return patterns[Math.floor(Math.random() * patterns.length)] as any
}
