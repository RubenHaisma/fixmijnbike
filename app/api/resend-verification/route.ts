import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateVerificationToken, sendVerificationEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Gebruiker niet gevonden" },
        { status: 404 }
      );
    }
    
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "E-mailadres is al geverifieerd" },
        { status: 400 }
      );
    }
    
    // Delete any existing tokens for this user
    await prisma.verificationToken.deleteMany({
      where: { identifier: user.id },
    });
    
    // Generate new token and send verification email
    const verificationToken = await generateVerificationToken(user.id);
    await sendVerificationEmail(user.email!, verificationToken);
    
    return NextResponse.json(
      { success: true, message: "Verificatie-e-mail opnieuw verzonden" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het opnieuw verzenden van de verificatie-e-mail" },
      { status: 500 }
    );
  }
}