import { findOneNewsType, removeNewsType, updateNewsType } from "@/services/newtype.service"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, param: { params: { id: string } }) {
  const { id } = param.params
  const data = await findOneNewsType(+id)
  if (!data) {
    return NextResponse.json({ message: "no data !" }, { status: 404 })
  }
  return NextResponse.json({ data: data }, { status: 200 })
}


export async function PUT(request: NextRequest, param: { params: { id: string } }) {
  const { id } = param.params
  const bodyJson = await request.json() as Prisma.NewsTypeUpdateInput

  const data = await findOneNewsType(+id)
  if (!data) {
    return NextResponse.json({ message: "no data !" }, { status: 404 })
  }

  const dataUpdate = await updateNewsType(+id, bodyJson)
  if (!dataUpdate) {
    return NextResponse.json({ message: "update failed !" }, { status: 400 })
  }

  return NextResponse.json({ data: dataUpdate }, { status: 200 })
}


export async function DELETE(request: NextRequest, param: { params: { id: string } }) {
  const { id } = param.params
  const data = await findOneNewsType(+id)
  if (!data) {
    return NextResponse.json({ message: "no data !" }, { status: 404 })
  }

  await removeNewsType(+id)
  return NextResponse.json({ message: "deleted" }, { status: 200 })
}