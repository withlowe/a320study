# Notes Library

A super simple markdown-based notes library.

## How to Use

1. Create a `/notes` directory in the project root
2. Add markdown files to this directory
3. Organize files in folders for categorization

## Folder Structure

\`\`\`
/notes
  /design-principles
    law-of-proximity.md
    law-of-pragnanz.md
  /psychology
    peak-end-rule.md
  example.md  # Root note (no folder)
\`\`\`

## Markdown Format

Use YAML frontmatter for metadata:

\`\`\`markdown
---
title: Note Title
tags: [tag1, tag2]
pattern: dots
takeaways:
  - Key point 1
  - Key point 2
---

## Content starts here

Your note content...
\`\`\`

## Available Frontmatter Options

| Option | Description | Values |
|--------|-------------|--------|
| title | The note title | Any text |
| tags | Tags for categorization | Array or comma-separated list |
| pattern | Visual pattern type | dots, shapes, triangles, lines, circles, grid, concentric |
| takeaways | Key points | Array of strings |

## Features

- Simple file-based organization
- YAML frontmatter for metadata
- Folder-based categorization
- Tag filtering
- Search functionality
- Light/dark mode
