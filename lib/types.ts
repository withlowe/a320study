export interface Note {
  id: string
  title: string
  content: string
  color: string
  patternType: "dots" | "shapes" | "triangles" | "lines" | "circles" | "grid" | "concentric"
  takeaways?: string[]
  folderId?: string // New field to associate with a folder
  tags?: string[] // New field for tags extracted from markdown
}

export interface Folder {
  id: string
  name: string
  parentId?: string // For nested folders (optional)
}

export interface NoteCollection {
  title: string
  notes: Note[]
  folders: Folder[]
}
