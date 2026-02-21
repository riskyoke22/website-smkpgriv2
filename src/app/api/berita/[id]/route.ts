import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const berita = await db.berita.findUnique({
      where: { id: params.id }
    })

    if (!berita) {
      return NextResponse.json(
        { error: 'Berita not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Error fetching berita:', error)
    return NextResponse.json(
      { error: 'Failed to fetch berita' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { judul, isi, gambar } = body

    const berita = await db.berita.update({
      where: { id: params.id },
      data: {
        judul,
        isi,
        gambar
      }
    })

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Error updating berita:', error)
    return NextResponse.json(
      { error: 'Failed to update berita' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.berita.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Berita deleted successfully' })
  } catch (error) {
    console.error('Error deleting berita:', error)
    return NextResponse.json(
      { error: 'Failed to delete berita' },
      { status: 500 }
    )
  }
}
