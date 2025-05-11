"use client"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="h-full">
      <textarea
        className="w-full h-[600px] p-8 bg-card text-card-foreground border-0 focus:ring-0 focus:outline-none font-mono text-sm leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your markdown here..."
      />
    </div>
  )
}
