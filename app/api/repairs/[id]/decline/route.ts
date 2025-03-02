import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notifyRepairDeclined } from "@/lib/notifications";

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
    const body = await request.json();
    const { reason } = body;
    
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
    
    // Check if user is authorized to decline this repair
    if (repair.fixerId !== session.user.id) {
      return NextResponse.json(
        { error: "Niet geautoriseerd om deze reparatie te weigeren" },
        { status: 403 }
      );
    }
    
    // Check if repair is in the correct status
    if (repair.status !== "MATCHED") {
      return NextResponse.json(
        { error: "Reparatie kan niet worden geweigerd in de huidige status" },
        { status: 400 }
      );
    }
    
    // Update repair status
    const updatedRepair = await prisma.repair.update({
      where: {
        id: repairId,
      },
      data: {
        status: "DECLINED",
        declinedAt: new Date(),
        declineReason: reason,
        fixerId: null, // Remove fixer from repair
      },
      include: {
        rider: true,
      },
    });
    
    // Send notification
    await notifyRepairDeclined(updatedRepair);
    
    // Find a new fixer
    const availableFixers = await prisma.user.findMany({
      where: {
        role: "FIXER",
        isAvailable: true,
        skills: {
          has: repair.issueType,
        },
        id: {
          not: session.user.id, // Exclude the fixer who declined
        },
      },
      take: 1,
    });
    
    if (availableFixers.length > 0) {
      const newFixer = availableFixers[0];
      
      // Update repair with new fixer
      const rematchedRepair = await prisma.repair.update({
        where: {
          id: repairId,
        },
        data: {
          fixerId: newFixer.id,
          status: "MATCHED",
          declinedAt: null,
          declineReason: null,
        },
      });
      
      // Notify about the new match
      await prisma.notification.create({
        data: {
          userId: newFixer.id,
          type: "REPAIR_MATCHED",
          title: "Nieuwe reparatie match",
          message: `Je bent gematcht met een nieuwe reparatie. Bekijk de details en accepteer of weiger.`,
          linkUrl: `/repair/${repairId}`,
        },
      });
      
      return NextResponse.json({
        ...updatedRepair,
        rematchedWithFixer: newFixer.id,
      });
    }
    
    return NextResponse.json(updatedRepair);
  } catch (error) {
    console.error("Error declining repair:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het weigeren van de reparatie" },
      { status: 500 }
    );
  }
}