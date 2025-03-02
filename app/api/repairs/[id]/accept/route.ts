import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notifyRepairAccepted } from "@/lib/notifications";

const prisma = new PrismaClient();

// Define the params interface
interface Params {
  id: string;
}

// Define the context type for the route handler
interface Context {
  params: Promise<Params>;
}

export async function PUT(request: Request, context: Context) {
  try {
    // Resolve the params Promise
    const params = await context.params;
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
    });
    
    if (!repair) {
      return NextResponse.json(
        { error: "Reparatie niet gevonden" },
        { status: 404 }
      );
    }
    
    // Check if user is authorized to accept this repair
    if (repair.fixerId !== session.user.id) {
      return NextResponse.json(
        { error: "Niet geautoriseerd om deze reparatie te accepteren" },
        { status: 403 }
      );
    }
    
    // Check if repair is in the correct status
    if (repair.status !== "MATCHED") {
      return NextResponse.json(
        { error: "Reparatie kan niet worden geaccepteerd in de huidige status" },
        { status: 400 }
      );
    }
    
    // Update repair status
    const updatedRepair = await prisma.repair.update({
      where: {
        id: repairId,
      },
      data: {
        status: "ACCEPTED",
        acceptedAt: new Date(),
      },
      include: {
        rider: true,
        fixer: true,
      },
    });
    
    // Send notification
    await notifyRepairAccepted(updatedRepair);
    
    return NextResponse.json(updatedRepair);
  } catch (error) {
    console.error("Error accepting repair:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het accepteren van de reparatie" },
      { status: 500 }
    );
  }
}