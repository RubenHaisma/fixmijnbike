import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    // Get all payouts with user information
    const payouts = await prisma.payout.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    // Format the response
    const formattedPayouts = payouts.map(payout => ({
      id: payout.id,
      userId: payout.userId,
      userName: payout.user.name,
      amount: payout.amount,
      status: payout.status,
      createdAt: payout.createdAt.toISOString(),
      processedAt: payout.processedAt ? payout.processedAt.toISOString() : null,
    }));
    
    return NextResponse.json(formattedPayouts);
  } catch (error) {
    console.error("Error fetching payouts:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de uitbetalingen" },
      { status: 500 }
    );
  }
}