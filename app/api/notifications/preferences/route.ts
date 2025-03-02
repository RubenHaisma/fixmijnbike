import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema
const preferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  inAppNotifications: z.boolean().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        emailNotifications: true,
        pushNotifications: true,
        inAppNotifications: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Gebruiker niet gevonden" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching notification preferences:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de notificatievoorkeuren" },
      { status: 500 }
    );
  }
}

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
    
    // Validate input
    const result = preferencesSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validatiefout", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { emailNotifications, pushNotifications, inAppNotifications } = body;
    
    // Update user preferences
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        emailNotifications: emailNotifications !== undefined ? emailNotifications : undefined,
        pushNotifications: pushNotifications !== undefined ? pushNotifications : undefined,
        inAppNotifications: inAppNotifications !== undefined ? inAppNotifications : undefined,
      },
      select: {
        emailNotifications: true,
        pushNotifications: true,
        inAppNotifications: true,
      },
    });
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van de notificatievoorkeuren" },
      { status: 500 }
    );
  }
}