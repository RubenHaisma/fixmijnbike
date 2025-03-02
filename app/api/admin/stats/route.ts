import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    // Get total users count
    const totalUsers = await prisma.user.count();
    
    // Get users by role
    const totalRiders = await prisma.user.count({
      where: {
        role: "RIDER",
      },
    });
    
    const totalFixers = await prisma.user.count({
      where: {
        role: "FIXER",
      },
    });
    
    // Get total repairs count
    const totalRepairs = await prisma.repair.count();
    
    // Get total revenue (€1 per booking)
    const totalRevenue = await prisma.repair.count({
      where: {
        isPaid: true,
      },
    });
    
    // Get pending payouts
    const pendingPayouts = await prisma.payout.aggregate({
      where: {
        status: "pending",
      },
      _sum: {
        amount: true,
      },
    });
    
    return NextResponse.json({
      totalUsers,
      totalRiders,
      totalFixers,
      totalRepairs,
      totalRevenue,
      pendingPayouts: pendingPayouts._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de statistieken" },
      { status: 500 }
    );
  }
}