import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    // Get all repairs for the fixer
    const repairs = await prisma.repair.findMany({
      where: {
        fixerId: session.user.id,
      },
      include: {
        rider: {
          select: {
            name: true,
            phoneNumber: true,
            postalCode: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    return NextResponse.json(repairs);
  } catch (error) {
    console.error("Error fetching fixer repairs:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de reparaties" },
      { status: 500 }
    );
  }
}