import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

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
    
    // Check if user is authorized to cancel this repair
    const isAuthorized = 
      session.user.role === "ADMIN" || 
      repair.riderId === session.user.id || 
      repair.fixerId === session.user.id;
    
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Niet geautoriseerd om deze reparatie te annuleren" },
        { status: 403 }
      );
    }
    
    // Check if repair can be cancelled
    if (!["PENDING", "MATCHED", "BOOKED"].includes(repair.status)) {
      return NextResponse.json(
        { error: "Reparatie kan niet worden geannuleerd in de huidige status" },
        { status: 400 }
      );
    }
    
    // If repair is already paid, refund the rider
    if (repair.isPaid && repair.status === "BOOKED") {
      // Add platform fee back to rider's wallet
      await prisma.user.update({
        where: {
          id: repair.riderId,
        },
        data: {
          walletBalance: {
            increment: repair.platformFee,
          },
        },
      });
    }
    
    // Update repair status
    const updatedRepair = await prisma.repair.update({
      where: {
        id: repairId,
      },
      data: {
        status: "CANCELLED",
      },
    });
    
    return NextResponse.json(updatedRepair);
  } catch (error) {
    console.error("Error cancelling repair:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het annuleren van de reparatie" },
      { status: 500 }
    );
  }
}