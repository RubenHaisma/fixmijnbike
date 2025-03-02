import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    
    if (!token) {
      return NextResponse.json(
        { error: "Token is vereist" },
        { status: 400 }
      );
    }
    
    // Find the token in the database
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    
    if (!resetToken) {
      return NextResponse.json(
        { error: "Ongeldig token" },
        { status: 400 }
      );
    }
    
    // Check if token is expired
    if (new Date() > resetToken.expires) {
      // Delete expired token
      await prisma.passwordResetToken.delete({
        where: { token },
      });
      
      return NextResponse.json(
        { error: "Token is verlopen" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { valid: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Validate reset token error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het valideren van het token" },
      { status: 500 }
    );
  }
}