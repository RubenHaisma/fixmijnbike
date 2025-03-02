import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
    
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const payoutId = params.id;
    
    // Get the payout
    const payout = await prisma.payout.findUnique({
      where: {
        id: payoutId,
      },
    });
    
    if (!payout) {
      return NextResponse.json(
        { error: "Uitbetaling niet gevonden" },
        { status: 404 }
      );
    }
    
    // Check if payout is already processed
    if (payout.status !== "pending") {
      return NextResponse.json(
        { error: "Uitbetaling is al verwerkt" },
        { status: 400 }
      );
    }
    
    // Update payout status
    const updatedPayout = await prisma.payout.update({
      where: {
        id: payoutId,
      },
      data: {
        status: "processed",
        processedAt: new Date(),
      },
    });
    
    return NextResponse.json(updatedPayout);
  } catch (error) {
    console.error("Error processing payout:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verwerken van de uitbetaling" },
      { status: 500 }
    );
  }
}