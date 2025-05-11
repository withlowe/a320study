"use client"
import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown, FolderIcon, FileText } from "lucide-react"
import { foldersData, notesData } from "@/lib/notes-data"
import type { Folder, Note } from "@/lib/types"
import { cn } from "@/lib/utils"

interface FolderSidebarProps {
  selectedFolderId?: string
  selectedNoteId?: string
}

export function FolderSidebar({ selectedFolderId, selectedNoteId }: FolderSidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(
    Object.fromEntries(foldersData.map((folder) => [folder.id, true])),
  )

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const getNotesByFolder = (folderId: string): Note[] => {
    return notesData.filter((note) => note.folderId === folderId)
  }

  const unfiledNotes = notesData.filter((note) => !note.folderId)

  return (
    <div className="w-64 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-medium text-card-foreground mb-4">Folders</h2>
        <div className="space-y-1">
          <div className="text-sm">
            {foldersData.map((folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                expanded={expandedFolders[folder.id]}
                onToggle={toggleFolder}
                notes={getNotesByFolder(folder.id)}
                selectedFolderId={selectedFolderId}
                selectedNoteId={selectedNoteId}
              />
            ))}

            {unfiledNotes.length > 0 && (
              <div className="mb-2">
                <div className="flex items-center py-1 px-2 hover:bg-secondary cursor-pointer">
                  <div className="flex items-center gap-2" onClick={() => toggleFolder("unfiled")}>
                    {expandedFolders["unfiled"] ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <FolderIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Unfiled</span>
                  </div>
                </div>
                {expandedFolders["unfiled"] && (
                  <div className="ml-6 pl-2 border-l border-border">
                    {unfiledNotes.map((note) => (
                      <NoteItem key={note.id} note={note} selected={note.id === selectedNoteId} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface FolderItemProps {
  folder: Folder
  expanded: boolean
  onToggle: (folderId: string) => void
  notes: Note[]
  selectedFolderId?: string
  selectedNoteId?: string
}

function FolderItem({ folder, expanded, onToggle, notes, selectedFolderId, selectedNoteId }: FolderItemProps) {
  const isSelected = folder.id === selectedFolderId

  return (
    <div className="mb-2">
      <div
        className={cn("flex items-center py-1 px-2 hover:bg-secondary cursor-pointer", isSelected && "bg-secondary")}
      >
        <div className="flex items-center gap-2 w-full" onClick={() => onToggle(folder.id)}>
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <FolderIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-card-foreground">{folder.name}</span>
        </div>
      </div>
      {expanded && (
        <div className="ml-6 pl-2 border-l border-border">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} selected={note.id === selectedNoteId} />
          ))}
        </div>
      )}
    </div>
  )
}

interface NoteItemProps {
  note: Note
  selected: boolean
}

function NoteItem({ note, selected }: NoteItemProps) {
  return (
    <Link
      href={`/note/${note.id}`}
      className={cn("flex items-center gap-2 py-1 px-2 hover:bg-secondary text-sm", selected && "bg-secondary")}
    >
      <FileText className="h-4 w-4 text-muted-foreground" />
      <span className={cn("truncate", selected ? "text-card-foreground" : "text-muted-foreground")}>{note.title}</span>
    </Link>
  )
}
