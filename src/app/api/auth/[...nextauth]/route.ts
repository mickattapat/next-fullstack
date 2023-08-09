import { findOneUser } from "@/services/user.service";
import { Prisma } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60, // 1 day
  },
  // useSecureCookies: true, // for prod or use https://
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string };
        const user = await findOneUser(email)
        if (!user) {
          throw new Error("user not found !")
        }
        const idValid = await compare(password,user.password)
        if (!idValid) {
          throw new Error("password is invalid !")
        }
        return {
          id: user.id.toString(),
          name: user.fullname,
          email: user.email
        }
      }
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }