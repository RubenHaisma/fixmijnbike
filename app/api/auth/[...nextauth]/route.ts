import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

// Create handler using the authOptions
const handler = NextAuth(authOptions);

// Export HTTP method handlers
export const GET = (req: NextRequest, context: any) => handler(req, context);
export const POST = (req: NextRequest, context: any) => handler(req, context);