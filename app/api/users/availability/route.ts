import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { isAvailable } = body;
    
    if (isAvailable === undefined) {
      return NextResponse.json(
        { error: "Beschikbaarheid is vereist" },
        { status: 400 }
      );
    }
    
    // Update user availability
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        isAvailable,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isAvailable: true,
      },
    });
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van de beschikbaarheid" },
      { status: 500 }
    );
  }
}