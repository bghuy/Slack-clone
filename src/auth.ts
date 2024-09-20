import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
import authConfig from "../auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks:{
    async session({session,token}){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }
      if(token.role && session.user){
        session.user.role = token.role;
      }
      return session;
    },
    async jwt ({token}){
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      return token
    }
  }, 
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})