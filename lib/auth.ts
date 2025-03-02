import { NextAuthOptions, DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

// Extend the Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string; // Add your custom role property
    } & DefaultSession["user"];
  }

  interface User {
    role?: string; // Add role to User type
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // Add role to JWT type
  }
}

const prisma = new PrismaClient();

// Define auth configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Ongeldige inloggegevens");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Ongeldige inloggegevens");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Ongeldige inloggegevens");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;
      
      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      
      if (!existingUser) return token;
      
      token.role = existingUser.role;
      
      return token;
    },
  },
};