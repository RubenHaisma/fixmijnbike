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
    const { skills, hourlyRate, isAvailable } = body;
    
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: "Selecteer minimaal één vaardigheid" },
        { status: 400 }
      );
    }
    
    if (hourlyRate < 5 || hourlyRate > 15) {
      return NextResponse.json(
        { error: "Uurtarief moet tussen €5 en €15 zijn" },
        { status: 400 }
      );
    }
    
    // Update fixer profile
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        skills,
        hourlyRate,
        isAvailable,
      },
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating fixer profile:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van het profiel" },
      { status: 500 }
    );
  }
}