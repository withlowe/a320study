"use client"

import type React from "react"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Parse the markdown content manually to avoid nesting issues
  const parsedContent = parseMarkdown(content)

  return <div className="markdown-content text-card-foreground">{parsedContent}</div>
}

function parseMarkdown(markdown: string): React.ReactNode[] {
  // Split the content by lines
  const lines = markdown.split("\n")
  const result: React.ReactNode[] = []

  let currentParagraph: string[] = []
  let inCodeBlock = false
  let codeBlockContent = ""
  let codeBlockLanguage = ""
  let inTable = false
  let tableRows: string[][] = []
  let tableHeaders: string[] = []

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Check for code blocks
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        // Start of code block
        inCodeBlock = true
        // Flush any current paragraph
        if (currentParagraph.length > 0) {
          result.push(
            <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
              {currentParagraph.join(" ")}
            </p>,
          )
          currentParagraph = []
        }
        // Get language if specified
        codeBlockLanguage = line.trim().slice(3)
      } else {
        // End of code block
        inCodeBlock = false
        result.push(
          <div key={`code-${result.length}`} className="mb-6">
            <pre className="bg-muted p-4 rounded-none overflow-x-auto">
              <code className="text-muted-foreground text-sm">{codeBlockContent}</code>
            </pre>
          </div>,
        )
        codeBlockContent = ""
      }
      continue
    }

    // If we're in a code block, add the line to the code content
    if (inCodeBlock) {
      codeBlockContent += line + "\n"
      continue
    }

    // Check for headings
    if (line.startsWith("# ")) {
      // Flush any current paragraph
      if (currentParagraph.length > 0) {
        result.push(
          <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
            {currentParagraph.join(" ")}
          </p>,
        )
        currentParagraph = []
      }

      result.push(
        <h1 key={`h1-${result.length}`} className="text-4xl font-bold mb-6 text-card-foreground">
          {line.slice(2)}
        </h1>,
      )
      continue
    }

    if (line.startsWith("## ")) {
      // Flush any current paragraph
      if (currentParagraph.length > 0) {
        result.push(
          <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
            {currentParagraph.join(" ")}
          </p>,
        )
        currentParagraph = []
      }

      result.push(
        <h2 key={`h2-${result.length}`} className="text-2xl font-bold mt-8 mb-4 text-card-foreground">
          {line.slice(3)}
        </h2>,
      )
      continue
    }

    if (line.startsWith("### ")) {
      // Flush any current paragraph
      if (currentParagraph.length > 0) {
        result.push(
          <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
            {currentParagraph.join(" ")}
          </p>,
        )
        currentParagraph = []
      }

      result.push(
        <h3 key={`h3-${result.length}`} className="text-xl font-bold mt-6 mb-3 text-card-foreground">
          {line.slice(4)}
        </h3>,
      )
      continue
    }

    // Check for table start (header row with | characters)
    if (line.includes("|") && !inTable) {
      // Check if the next line contains separator (---|---)
      const nextLine = i + 1 < lines.length ? lines[i + 1] : ""
      if (nextLine.includes("---") && nextLine.includes("|")) {
        // Flush any current paragraph
        if (currentParagraph.length > 0) {
          result.push(
            <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
              {currentParagraph.join(" ")}
            </p>,
          )
          currentParagraph = []
        }

        inTable = true
        tableHeaders = line
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell !== "")

        tableRows = []
        i++ // Skip the separator line
        continue
      }
    }

    // Process table rows
    if (inTable) {
      if (line.includes("|")) {
        const cells = line
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell !== "")

        if (cells.length > 0) {
          tableRows.push(cells)
        }
      } else {
        // End of table
        inTable = false

        result.push(
          <div key={`table-${result.length}`} className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead className="bg-secondary">
                <tr className="border-b border-border">
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="py-3 px-4 text-left font-medium text-card-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-card">
                {tableRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-border">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-3 px-4 text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        )

        // Process the current line normally
        if (line.trim() !== "") {
          currentParagraph.push(line)
        }
      }
      continue
    }

    // Check for lists
    if (line.trim().match(/^[*-]\s/)) {
      // Flush any current paragraph
      if (currentParagraph.length > 0) {
        result.push(
          <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
            {currentParagraph.join(" ")}
          </p>,
        )
        currentParagraph = []
      }

      // Collect all list items
      const listItems: string[] = [line.trim().slice(2)]
      let j = i + 1
      while (j < lines.length && lines[j].trim().match(/^[*-]\s/)) {
        listItems.push(lines[j].trim().slice(2))
        j++
      }

      result.push(
        <ul key={`ul-${result.length}`} className="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
          {listItems.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ul>,
      )

      i = j - 1 // Skip processed lines
      continue
    }

    // Check for numbered lists
    if (line.trim().match(/^\d+\.\s/)) {
      // Flush any current paragraph
      if (currentParagraph.length > 0) {
        result.push(
          <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
            {currentParagraph.join(" ")}
          </p>,
        )
        currentParagraph = []
      }

      // Collect all list items
      const listItems: string[] = [line.trim().replace(/^\d+\.\s/, "")]
      let j = i + 1
      while (j < lines.length && lines[j].trim().match(/^\d+\.\s/)) {
        listItems.push(lines[j].trim().replace(/^\d+\.\s/, ""))
        j++
      }

      result.push(
        <ol key={`ol-${result.length}`} className="list-decimal pl-6 mb-6 text-muted-foreground space-y-2">
          {listItems.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ol>,
      )

      i = j - 1 // Skip processed lines
      continue
    }

    // Handle empty lines
    if (line.trim() === "") {
      if (currentParagraph.length > 0) {
        result.push(
          <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
            {currentParagraph.join(" ")}
          </p>,
        )
        currentParagraph = []
      }
      continue
    }

    // Regular paragraph text
    currentParagraph.push(line)
  }

  // Flush any remaining paragraph
  if (currentParagraph.length > 0) {
    result.push(
      <p key={`p-${result.length}`} className="mb-4 text-muted-foreground leading-relaxed">
        {currentParagraph.join(" ")}
      </p>,
    )
  }

  return result
}
