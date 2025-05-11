# Notes Library

A markdown-based notes library with a clean blue/white design.

## Adding New Notes

To add new notes to the library, simply add markdown files to the `/notes` directory. The notes are organized in folders that match the folder structure in the application.

### Markdown Format

Each note should follow this format:

\`\`\`markdown
# Note Title

Brief description or introduction.

## Overview

Detailed explanation of the concept.

## Additional Sections

More content organized in sections.

## Examples

Examples of the concept in practice.

| Header 1 | Header 2 |
| -------- | -------- |
| Content  | Content  |

## Tags
* tag1
* tag2
* tag3
\`\`\`

### Tags

Tags are extracted from the markdown content and displayed with the note. They can be added in two ways:

1. **Dedicated Tags Section**: Add a "## Tags" section at the end of your markdown file with a list of tags (either bullet points or comma-separated)
2. **Hashtags in Content**: Use hashtags like #tag-name throughout your content

## Features

- Markdown rendering with support for tables and lists
- Consistent blue/white design for all notes
- Folder organization for notes
- Light/dark mode toggle
- Visual patterns for each note
- Filtering by folder
- Responsive design that maintains proportions at all screen sizes
