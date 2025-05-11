import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET() {
  // Revalidate the home page and all note pages
  revalidatePath("/")
  revalidatePath("/note/[id]")

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
