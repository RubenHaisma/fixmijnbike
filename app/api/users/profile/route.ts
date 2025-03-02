import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema
const profileSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 karakters bevatten"),
  phoneNumber: z.string().regex(/^(\+31|0)6[0-9]{8}$/, "Ongeldig telefoonnummer"),
  postalCode: z.string().regex(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i, "Ongeldige postcode"),
});

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
    const result = profileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validatiefout", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { name, phoneNumber, postalCode } = body;
    
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        phoneNumber,
        postalCode,
      },
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van het profiel" },
      { status: 500 }
    );
  }
}