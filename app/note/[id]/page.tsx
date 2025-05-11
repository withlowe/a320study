"use client"

import { notesData, foldersData } from "@/lib/notes-data"
import { VisualPattern } from "@/components/visual-pattern"
import Link from "next/link"
import { ArrowLeft, Save, Folder, Tag } from "lucide-react"
import { useState, useEffect } from "react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { MarkdownEditor } from "@/components/markdown-editor"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NotePage({ params }: { params: { id: string } }) {
  const note = notesData.find((note) => note.id === params.id)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(note?.content || "")

  useEffect(() => {
    // Update edited content when note changes
    if (note) {
      setEditedContent(note.content)
    }
  }, [note])

  if (!note) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Note not found</h1>
          <Link href="/" className="text-blue-500 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            Back to library
          </Link>
        </div>
      </div>
    )
  }

  const folder = note.folderId ? foldersData.find((f) => f.id === note.folderId) : null

  const handleSave = () => {
    // In a real app, this would save to a database
    // For now, we'll just toggle back to view mode
    setIsEditing(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to library
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="px-4 py-2 flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                {isEditing ? (
                  <>
                    <Save size={16} />
                    Save
                  </>
                ) : (
                  "Edit"
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div
              className="overflow-hidden aspect-video md:aspect-square relative border border-border/30 bg-blue"
              style={{ backgroundColor: "#0070f3" }}
            >
              <VisualPattern type={note.patternType} color="blue" />
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                {folder && (
                  <div className="inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground text-sm">
                    <Folder size={14} className="mr-2" />
                    {folder.name}
                  </div>
                )}

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/?tag=${tag}`}
                        className="inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80"
                      >
                        <Tag size={14} className="mr-2" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {note.takeaways && note.takeaways.length > 0 && (
              <div className="bg-card p-6 mt-6 border border-border/30">
                <h2 className="text-xl font-bold text-card-foreground mb-4">Takeaways</h2>
                <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
                  {note.takeaways.map((takeaway, index) => (
                    <li key={index}>{takeaway}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="md:col-span-2 bg-card border border-border/30">
            {isEditing ? (
              <MarkdownEditor value={editedContent} onChange={setEditedContent} />
            ) : (
              <div className="p-8">
                <MarkdownRenderer content={note.content} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Related Notes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notesData
              .filter((n) => n.id !== note.id && n.folderId === note.folderId)
              .slice(0, 4)
              .map((relatedNote) => (
                <Link
                  key={relatedNote.id}
                  href={`/note/${relatedNote.id}`}
                  className="bg-card hover:bg-secondary transition-colors border border-border/30 h-full"
                >
                  <div className="h-2 bg-blue" style={{ backgroundColor: "#0070f3" }}></div>
                  <div className="p-4">
                    <h3 className="text-card-foreground font-medium line-clamp-2">{relatedNote.title}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
