import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to convert markdown files to note objects
export function markdownToNote(markdown: string, id: string, patternType: string, folderId?: string) {
  // Extract title from first line (# Title)
  const titleMatch = markdown.match(/^# (.+)$/m)
  const title = titleMatch ? titleMatch[1] : "Untitled Note"

  // Extract takeaways if they exist
  const takeawaysMatch = markdown.match(/## Takeaways\s+([\s\S]*?)(?=##|$)/)
  let takeaways: string[] = []

  if (takeawaysMatch) {
    const takeawaysContent = takeawaysMatch[1]
    // Extract numbered list items
    const listItemsMatch = takeawaysContent.match(/\d+\.\s+(.+)$/gm)
    if (listItemsMatch) {
      takeaways = listItemsMatch.map((item) => item.replace(/^\d+\.\s+/, "").trim())
    }
  }

  // Extract tags if they exist
  const tags = extractTagsFromMarkdown(markdown)

  return {
    id,
    title,
    content: markdown,
    color: "blue", // All notes now use blue
    patternType,
    takeaways: takeaways.length > 0 ? takeaways : undefined,
    tags: tags.length > 0 ? tags : undefined,
    folderId,
  }
}

// Extract tags from markdown content
export function extractTagsFromMarkdown(markdown: string): string[] {
  // Look for a dedicated Tags section
  const tagsMatch = markdown.match(/## Tags\s+([\s\S]*?)(?=##|$)/)

  if (tagsMatch) {
    const tagsContent = tagsMatch[1].trim()
    // Extract tags from comma-separated list or bullet points
    if (tagsContent.includes(",")) {
      // Comma-separated format
      return tagsContent.split(",").map((tag) => tag.trim())
    } else {
      // Bullet point format
      const tagListMatch = tagsContent.match(/[*-]\s+(.+)$/gm)
      if (tagListMatch) {
        return tagListMatch.map((tag) => tag.replace(/^[*-]\s+/, "").trim())
      }
    }
  }

  // Alternative: look for hashtags in the content
  const hashtagMatches = markdown.match(/#([a-zA-Z0-9_-]+)/g)
  if (hashtagMatches) {
    return hashtagMatches.map((tag) => tag.substring(1))
  }

  return []
}

// Function kept for compatibility but now returns a simple string
export function getTagCategoryForColor(color: string): string {
  return "Notes"
}
