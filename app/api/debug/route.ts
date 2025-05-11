import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    notesDirectory: path.join(process.cwd(), "notes"),
  }

  // Check if notes directory exists
  const notesDir = debugInfo.notesDirectory
  try {
    debugInfo.notesDirectoryExists = fs.existsSync(notesDir)

    if (debugInfo.notesDirectoryExists) {
      // List contents of notes directory
      const entries = fs.readdirSync(notesDir, { withFileTypes: true })
      debugInfo.directoryContents = entries.map((entry) => ({
        name: entry.name,
        isDirectory: entry.isDirectory(),
        isFile: entry.isFile(),
      }))

      // Count markdown files
      let markdownCount = 0
      const countMarkdownFiles = (dir: string) => {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            countMarkdownFiles(fullPath)
          } else if (entry.isFile() && entry.name.endsWith(".md")) {
            markdownCount++
          }
        }
      }

      countMarkdownFiles(notesDir)
      debugInfo.markdownFileCount = markdownCount
    }
  } catch (error) {
    debugInfo.error = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }
  }

  return NextResponse.json(debugInfo)
}
