import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
    
    // Get all repairs for the rider
    const repairs = await prisma.repair.findMany({
      where: {
        riderId: session.user.id,
      },
      include: {
        fixer: {
          select: {
            name: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    return NextResponse.json(repairs);
  } catch (error) {
    console.error("Error fetching rider repairs:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de reparaties" },
      { status: 500 }
    );
  }
}