"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { NoteCard } from "./note-card"
import type { Note, Folder } from "@/lib/types"
import { ChevronDown, FolderIcon, TagIcon, X } from "lucide-react"

interface NoteGridProps {
  initialNotes: Note[]
  initialFolders: Folder[]
}

export function NoteGrid({ initialNotes, initialFolders }: NoteGridProps) {
  const [folderFilter, setFolderFilter] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [folderDropdownOpen, setFolderDropdownOpen] = useState(false)
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false)

  const folderDropdownRef = useRef<HTMLDivElement>(null)
  const tagDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target as Node)) {
        setFolderDropdownOpen(false)
      }
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setTagDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Set up search input listener
  useEffect(() => {
    const searchInput = document.getElementById("search-input") as HTMLInputElement
    if (searchInput) {
      const handleSearch = () => {
        setSearchTerm(searchInput.value)
      }

      searchInput.addEventListener("input", handleSearch)
      return () => {
        searchInput.removeEventListener("input", handleSearch)
      }
    }
  }, [])

  // Listen for URL tag parameter
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const tag = urlParams.get("tag")
      if (tag) {
        setTagFilter(tag)
      }
    } catch (e) {
      console.error("Error parsing URL parameters:", e)
    }
  }, [])

  // Extract all unique tags from notes
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    initialNotes.forEach((note) => {
      if (note.tags && note.tags.length > 0) {
        note.tags.forEach((tag) => tagSet.add(tag))
      }
    })
    return Array.from(tagSet).sort()
  }, [initialNotes])

  // Filter notes by folder, tag, and search term
  const filteredNotes = useMemo(() => {
    return initialNotes.filter((note) => {
      const matchesFolder = folderFilter ? note.folderId === folderFilter : true
      const matchesTag = tagFilter ? note.tags && note.tags.includes(tagFilter) : true
      const matchesSearch = searchTerm
        ? note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
        : true
      return matchesFolder && matchesTag && matchesSearch
    })
  }, [initialNotes, folderFilter, tagFilter, searchTerm])

  // Get active filter names for display
  const activeFolderName = folderFilter ? initialFolders.find((f) => f.id === folderFilter)?.name : null
  const activeTagName = tagFilter

  // Clear all filters
  const clearAllFilters = () => {
    setFolderFilter(null)
    setTagFilter(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Filter controls */}
        <div className="flex items-center gap-3 w-full">
          {/* Folder dropdown */}
          <div className="relative flex-1" ref={folderDropdownRef}>
            <button
              onClick={() => setFolderDropdownOpen(!folderDropdownOpen)}
              className="flex items-center justify-between w-full h-10 px-4 bg-card text-card-foreground hover:bg-secondary/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FolderIcon size={16} className="text-muted-foreground" />
                <span>{activeFolderName || "All Folders"}</span>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>

            {folderDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-card border border-border shadow-md">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setFolderFilter(null)
                      setFolderDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      folderFilter === null ? "bg-blue text-white" : "hover:bg-secondary"
                    }`}
                  >
                    All Folders
                  </button>
                  {initialFolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => {
                        setFolderFilter(folder.id)
                        setFolderDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        folderFilter === folder.id ? "bg-blue text-white" : "hover:bg-secondary"
                      }`}
                    >
                      {folder.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tag dropdown */}
          <div className="relative flex-1" ref={tagDropdownRef}>
            <button
              onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
              className="flex items-center justify-between w-full h-10 px-4 bg-card text-card-foreground hover:bg-secondary/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <TagIcon size={16} className="text-muted-foreground" />
                <span>{activeTagName || "All Tags"}</span>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>

            {tagDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-card border border-border shadow-md">
                <div className="py-1 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      setTagFilter(null)
                      setTagDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      tagFilter === null ? "bg-blue text-white" : "hover:bg-secondary"
                    }`}
                  >
                    All Tags
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setTagFilter(tag)
                        setTagDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        tagFilter === tag ? "bg-blue text-white" : "hover:bg-secondary"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear filters button - only show if filters are active */}
          {(folderFilter || tagFilter) && (
            <button
              onClick={clearAllFilters}
              className="h-10 px-4 bg-card text-card-foreground hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <X size={16} />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Active filter display */}
        {(activeFolderName || activeTagName) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFolderName && (
              <div className="inline-flex items-center px-3 py-1 bg-blue text-white text-sm">
                <FolderIcon size={14} className="mr-2" />
                {activeFolderName}
                <button onClick={() => setFolderFilter(null)} className="ml-2 hover:opacity-80">
                  <X size={14} />
                </button>
              </div>
            )}
            {activeTagName && (
              <div className="inline-flex items-center px-3 py-1 bg-blue text-white text-sm">
                <TagIcon size={14} className="mr-2" />
                {activeTagName}
                <button onClick={() => setTagFilter(null)} className="ml-2 hover:opacity-80">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="h-full">
              <NoteCard note={note} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No notes found with the current filters.
          </div>
        )}
      </div>
    </div>
  )
}
