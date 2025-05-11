"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content text-card-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-6 text-card-foreground" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-card-foreground" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-card-foreground" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 text-muted-foreground leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 text-muted-foreground space-y-2" {...props} />,
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-6 text-muted-foreground space-y-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => (
            <a
              style={{ color: "#0070f3" }}
              className="hover:underline"
              {...props}
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-muted pl-4 italic text-muted-foreground my-6" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code className="bg-muted px-1 py-0.5 rounded-none text-sm text-muted-foreground" {...props}>
                  {children}
                </code>
              )
            }
            return (
              <pre className="bg-muted p-4 rounded-none overflow-x-auto mb-6">
                <code className="text-muted-foreground text-sm" {...props}>
                  {children}
                </code>
              </pre>
            )
          },
          hr: ({ node, ...props }) => <hr className="my-8 border-border" {...props} />,
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-secondary" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="bg-card" {...props} />,
          tr: ({ node, ...props }) => <tr className="border-b border-border" {...props} />,
          th: ({ node, ...props }) => (
            <th className="py-3 px-4 text-left font-medium text-card-foreground" {...props} />
          ),
          td: ({ node, ...props }) => <td className="py-3 px-4 text-muted-foreground" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
