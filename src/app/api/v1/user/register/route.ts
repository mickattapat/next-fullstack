import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { createUser, findOneUser } from "@/services/user.service";
import { hash, genSalt } from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json() as Prisma.UserCreateInput
  // check email
  const data = await findOneUser(body.email)
  if (data) {
    return NextResponse.json({ message: "email is aleady" }, { status: 400 })
  }
  // hash password
  const salt = await genSalt(10)
  const hashPassword = await hash(body.password, salt)
  body.password = hashPassword
  // insert data to table
  await createUser(body)

  return NextResponse.json({ message: "register success" }, { status: 201 })
}