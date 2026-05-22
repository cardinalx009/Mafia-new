import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {getServerSession} from "next-auth/next";

import {getPrisma} from "@/server/db";

const prisma = getPrisma();

export const authOptions: NextAuthOptions = {
  adapter: prisma ? PrismaAdapter(prisma) : undefined,
  session: prisma ? {strategy: "database"} : {strategy: "jwt"},
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({session, user}) {
      if (!prisma) return session;
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
