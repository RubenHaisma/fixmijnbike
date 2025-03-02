import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PUT(
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
        fixer: true,
      },
    });
    
    if (!repair) {
      return NextResponse.json(
        { error: "Reparatie niet gevonden" },
        { status: 404 }
      );
    }
    
    // Check if user is authorized to complete this repair
    const isAuthorized = 
      session.user.role === "ADMIN" || 
      repair.fixerId === session.user.id;
    
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Niet geautoriseerd om deze reparatie te voltooien" },
        { status: 403 }
      );
    }
    
    // Check if repair is in the correct status
    if (repair.status !== "BOOKED") {
      return NextResponse.json(
        { error: "Reparatie kan niet worden voltooid in de huidige status" },
        { status: 400 }
      );
    }
    
    // Update repair status
    const updatedRepair = await prisma.repair.update({
      where: {
        id: repairId,
      },
      data: {
        status: "COMPLETED",
      },
    });
    
    return NextResponse.json(updatedRepair);
  } catch (error) {
    console.error("Error completing repair:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het voltooien van de reparatie" },
      { status: 500 }
    );
  }
}