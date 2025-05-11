import type { Note } from "@/lib/types"
import { cn } from "@/lib/utils"
import { VisualPattern } from "./visual-pattern"
import Link from "next/link"

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  // All cards now use the blue color
  return (
    <Link href={`/note/${note.id}`} className="block group h-full">
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 group-hover:translate-y-[-4px]",
          "flex flex-col h-full border border-border/30",
          "aspect-[3/4]", // Fixed aspect ratio to prevent squishing
        )}
      >
        <div className="flex-1 p-6 relative bg-blue" style={{ backgroundColor: "#0070f3" }}>
          <VisualPattern type={note.patternType} color="blue" />
        </div>
        <div className="bg-card p-4 border-t border-border/10">
          <h3 className="text-lg font-medium text-card-foreground line-clamp-2">{note.title}</h3>
        </div>
      </div>
    </Link>
  )
}
