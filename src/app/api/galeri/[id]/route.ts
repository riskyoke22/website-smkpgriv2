import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.galeri.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Galeri deleted successfully' })
  } catch (error) {
    console.error('Error deleting galeri:', error)
    return NextResponse.json(
      { error: 'Failed to delete galeri' },
      { status: 500 }
    )
  }
}
