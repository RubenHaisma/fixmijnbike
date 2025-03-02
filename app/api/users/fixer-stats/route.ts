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
    
    // Get completed repairs count
    const completedRepairs = await prisma.repair.count({
      where: {
        fixerId: session.user.id,
        status: "COMPLETED",
      },
    });
    
    // Get pending payouts
    const pendingPayouts = await prisma.payout.aggregate({
      where: {
        userId: session.user.id,
        status: "pending",
      },
      _sum: {
        amount: true,
      },
    });
    
    // Calculate total earnings (€3 per completed repair + repair costs)
    const repairs = await prisma.repair.findMany({
      where: {
        fixerId: session.user.id,
        status: "COMPLETED",
      },
      select: {
        repairCost: true,
      },
    });
    
    const repairCostsTotal = repairs.reduce((sum, repair) => sum + (repair.repairCost || 0), 0);
    const platformFeesTotal = completedRepairs * 3; // €3 per repair
    const totalEarnings = repairCostsTotal + platformFeesTotal;
    
    return NextResponse.json({
      completedRepairs,
      pendingPayouts: pendingPayouts._sum.amount || 0,
      totalEarnings,
    });
  } catch (error) {
    console.error("Error fetching fixer stats:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de statistieken" },
      { status: 500 }
    );
  }
}