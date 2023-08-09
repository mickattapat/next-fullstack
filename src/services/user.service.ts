import prisma from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";

export async function findUsers(): Promise<any> {
  return null
}


export async function findOneUser(email : string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email: email }
  })
}

export async function createUser(data: Prisma.UserCreateInput): Promise<any> {
  return await prisma.user.create({
    data : {...data}
  })
}