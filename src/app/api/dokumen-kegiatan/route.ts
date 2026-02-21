import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const onlyActive = searchParams.get('active') === 'true'

    if (onlyActive) {
      const dokumen = await (prisma as any).dokumenKegiatan.findFirst({
        where: { status: true },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(dokumen)
    }

    const dokumen = await (prisma as any).dokumenKegiatan.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(dokumen)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { judulKegiatan, deskripsi, fileJuklak, fileJuknis, status } = body

    if (status === true) {
      await (prisma as any).dokumenKegiatan.updateMany({
        where: { status: true },
        data: { status: false }
      })
    }

    const dokumen = await (prisma as any).dokumenKegiatan.create({
      data: {
        judulKegiatan,
        deskripsi,
        fileJuklak: fileJuklak || null,
        fileJuknis: fileJuknis || null,
        status: status || false
      }
    })

    return NextResponse.json(dokumen, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
