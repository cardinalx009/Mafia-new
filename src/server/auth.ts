import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {getServerSession} from "next-auth/next";

import {prisma} from "@/server/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {strategy: "database"},
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
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
