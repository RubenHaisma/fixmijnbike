import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notifyRepairRequest, notifyRepairMatched } from "@/lib/notifications";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { issueType, description, postalCode, imageUrl } = body;
    
    if (!issueType || !postalCode) {
      return NextResponse.json(
        { error: "Ontbrekende velden" },
        { status: 400 }
      );
    }
    
    // Create repair request
    const repair = await prisma.repair.create({
      data: {
        riderId: session.user.id,
        issueType,
        description,
        postalCode,
        imageUrl,
        status: "PENDING",
      },
      include: {
        rider: true,
      },
    });
    
    // Notify available fixers about the new repair request
    await notifyRepairRequest(repair);
    
    // Find nearby fixers based on postal code
    // This is a simplified version - in a real app, you would use a more sophisticated
    // algorithm to find fixers based on distance, availability, and skills
    const fixers = await prisma.user.findMany({
      where: {
        role: "FIXER",
        isAvailable: true,
        skills: {
          has: issueType,
        },
      },
      include: {
        fixerProfile: true,
      },
      take: 3,
    });
    
    // If fixers are found, match with the first one
    if (fixers.length > 0) {
      const fixer = fixers[0];
      
      // Calculate estimated repair cost based on fixer's hourly rate
      const estimatedCost = fixer.hourlyRate || 10;
      
      // Update repair with fixer and cost
      const updatedRepair = await prisma.repair.update({
        where: {
          id: repair.id,
        },
        data: {
          fixerId: fixer.id,
          repairCost: estimatedCost,
          status: "MATCHED",
          assignedAt: new Date(),
        },
        include: {
          rider: true,
          fixer: true,
        },
      });
      
      // Send notifications about the match
      await notifyRepairMatched(updatedRepair);
      
      return NextResponse.json(updatedRepair);
    }
    
    return NextResponse.json(repair);
  } catch (error) {
    console.error("Error creating repair:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het aanvragen van de reparatie" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    // Get all repairs (admin only)
    if (session.user.role === "ADMIN") {
      const repairs = await prisma.repair.findMany({
        include: {
          rider: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          fixer: {
            select: {
              id: true,
              name: true,
              email: true,
              fixerProfile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      
      return NextResponse.json(repairs);
    }
    
    return NextResponse.json(
      { error: "Niet geautoriseerd" },
      { status: 403 }
    );
  } catch (error) {
    console.error("Error fetching repairs:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de reparaties" },
      { status: 500 }
    );
  }
}