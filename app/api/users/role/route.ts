import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
    const { role } = body;
    
    if (!role || !["RIDER", "FIXER"].includes(role)) {
      return NextResponse.json(
        { error: "Ongeldige rol" },
        { status: 400 }
      );
    }
    
    // Update user role
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        role,
      },
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van de rol" },
      { status: 500 }
    );
  }
}