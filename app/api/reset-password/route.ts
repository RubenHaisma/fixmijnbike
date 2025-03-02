import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = body;
    
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token en wachtwoord zijn vereist" },
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
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Update the user's password
    await prisma.user.update({
      where: { id: resetToken.identifier },
      data: { password: hashedPassword },
    });
    
    // Delete the used token
    await prisma.passwordResetToken.delete({
      where: { token },
    });
    
    return NextResponse.json(
      { success: true, message: "Wachtwoord succesvol gereset" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het resetten van het wachtwoord" },
      { status: 500 }
    );
  }
}