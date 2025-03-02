import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const repairId = params.id;
    
    // Get the repair
    const repair = await prisma.repair.findUnique({
      where: {
        id: repairId,
      },
      include: {
        rider: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            postalCode: true,
          },
        },
        fixer: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            postalCode: true,
            hourlyRate: true,
          },
        },
      },
    });
    
    if (!repair) {
      return NextResponse.json(
        { error: "Reparatie niet gevonden" },
        { status: 404 }
      );
    }
    
    // Check if user is authorized to view this repair
    const isAuthorized = 
      session.user.role === "ADMIN" || 
      repair.riderId === session.user.id || 
      repair.fixerId === session.user.id;
    
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Niet geautoriseerd om deze reparatie te bekijken" },
        { status: 403 }
      );
    }
    
    return NextResponse.json(repair);
  } catch (error) {
    console.error("Error fetching repair:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de reparatie" },
      { status: 500 }
    );
  }
}