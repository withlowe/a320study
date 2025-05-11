const fs = require("fs")
const path = require("path")

// Define the notes directory path
const NOTES_DIR = path.join(process.cwd(), "notes")

console.log("Verifying notes directory structure...")

// Check if notes directory exists
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
} else {
  console.log(`Notes directory exists at ${NOTES_DIR}`)

  // Count markdown files
  let markdownCount = 0
  const countMarkdownFiles = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        console.log(`Found subdirectory: ${entry.name}`)
        countMarkdownFiles(fullPath)
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        console.log(`Found markdown file: ${fullPath.replace(NOTES_DIR, "")}`)
        markdownCount++
      }
    }
  }

  countMarkdownFiles(NOTES_DIR)
  console.log(`Found ${markdownCount} markdown files in total`)

  if (markdownCount === 0) {
    console.log("No markdown files found. Creating an example note...")

    // Create an example note
    const exampleDir = path.join(NOTES_DIR, "examples")
    if (!fs.existsSync(exampleDir)) {
      fs.mkdirSync(exampleDir, { recursive: true })
    }

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
}

console.log("Verification complete!")
