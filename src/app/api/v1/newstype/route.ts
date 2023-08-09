import { createNewsType, findAllnewsType } from "@/services/newtype.service";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await findAllnewsType()
  return NextResponse.json({ data: data })
}

export async function POST(request: NextRequest) {
  const bodyJson = await request.json() as Prisma.NewsTypeCreateInput
  const data = await createNewsType(bodyJson)

  return NextResponse.json({ data: data }, { status: 201 })
}
