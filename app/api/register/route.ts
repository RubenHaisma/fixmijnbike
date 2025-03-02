import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 karakters bevatten"),
  email: z.string().email("Ongeldig e-mailadres"),
  password: z.string().min(8, "Wachtwoord moet minimaal 8 karakters bevatten"),
  role: z.enum(["RIDER", "FIXER"]),
  postalCode: z.string().regex(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i, "Ongeldige postcode"),
  phoneNumber: z.string().regex(/^(\+31|0)6[0-9]{8}$/, "Ongeldig telefoonnummer"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validatiefout", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { name, email, password, role, postalCode, phoneNumber } = body;
    
    // Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "E-mailadres is al in gebruik" },
        { status: 400 }
      );
    }
    
    // Check if email is from a Dutch university (for student verification)
    const isDutchStudentEmail = email.endsWith('.nl') && 
      (email.includes('student') || 
       email.includes('uva.nl') || 
       email.includes('rug.nl') || 
       email.includes('uu.nl') || 
       email.includes('tudelft.nl') || 
       email.includes('tue.nl') || 
       email.includes('ru.nl') || 
       email.includes('eur.nl') || 
       email.includes('wur.nl') || 
       email.includes('utwente.nl') || 
       email.includes('vu.nl') || 
       email.includes('maastrichtuniversity.nl') || 
       email.includes('tilburguniversity.edu') || 
       email.includes('hva.nl') || 
       email.includes('hr.nl') || 
       email.includes('hhs.nl') || 
       email.includes('hu.nl') || 
       email.includes('fontys.nl') || 
       email.includes('inholland.nl') || 
       email.includes('han.nl'));
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        postalCode,
        phoneNumber,
        // If it's a Dutch student email, they get a free first booking
        walletBalance: isDutchStudentEmail ? 4 : 0,
      },
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        user: userWithoutPassword,
        message: isDutchStudentEmail 
          ? "Account aangemaakt! Als student krijg je je eerste boeking gratis." 
          : "Account aangemaakt!"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het registreren" },
      { status: 500 }
    );
  }
}