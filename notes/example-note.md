---
title: Project Overview
tags: [example, markdown, notes]
pattern: dots
takeaways:
  - You can use YAML frontmatter at the top of your markdown files
  - Tags can be specified as an array or comma-separated string
  - Pattern type can be specified to control visual appearance
  - All standard markdown formatting is supported
---

## Overview

This is an example note showing how to use YAML frontmatter in your markdown files. The frontmatter is enclosed between triple-dashes (`---`) at the top of the file.

## Available Frontmatter Options

You can specify various metadata in the frontmatter:

| Option | Description | Example |
|--------|-------------|---------|
| title | The note title | `title: My Note Title` |
| tags | Tags for the note | `tags: [tag1, tag2]` or `tags: tag1, tag2` |
| pattern | Visual pattern type | `pattern: dots` |
| takeaways | Key takeaways | `takeaways: [Point 1, Point 2]` |

## Markdown Support

All standard markdown formatting is supported:

- **Bold text** and *italic text*
- Lists (like this one)
- [Links](https://example.com)
- Code blocks:



## Organization

Notes are automatically organized based on their location in the file system:

- Root notes appear without a folder
- Notes in subdirectories are grouped by folder
- Folder names are converted to title case for display
