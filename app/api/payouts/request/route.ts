import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    // Get user's wallet balance
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Gebruiker niet gevonden" },
        { status: 404 }
      );
    }
    
    // Check if user has enough balance
    if (user.walletBalance <= 0) {
      return NextResponse.json(
        { error: "Onvoldoende saldo voor uitbetaling" },
        { status: 400 }
      );
    }
    
    // Create payout request
    const payout = await prisma.payout.create({
      data: {
        userId: session.user.id,
        amount: user.walletBalance,
        status: "pending",
      },
    });
    
    // Reset user's wallet balance
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        walletBalance: 0,
      },
    });
    
    return NextResponse.json(payout);
  } catch (error) {
    console.error("Error requesting payout:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het aanvragen van de uitbetaling" },
      { status: 500 }
    );
  }
}