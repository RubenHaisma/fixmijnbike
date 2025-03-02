import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { generateVerificationToken, sendVerificationEmail, transporter } from "@/lib/email"; // Import transporter

const prisma = new PrismaClient();

// Validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 karakters bevatten"),
  email: z.string().email("Ongeldig e-mailadres"),
  password: z.string().min(8, "Wachtwoord moet minimaal 8 karakters bevatten"),
  role: z.enum(["RIDER", "FIXER"]),
  postalCode: z.string().regex(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i, "Ongeldige postcode"),
  phoneNumber: z.string().regex(/^(\+31|0)6[0-9]{8}$/, "Ongeldig telefoonnummer"),
  bio: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  profileImageUrl: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  hourlyRate: z.number().optional(),
});

export async function POST(request: Request) {
  console.log("Registration request received");
  try {
    const body = await request.json();
    console.log("Registration request body:", { ...body, password: "***REDACTED***" });

    console.log("Validating registration data");
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      console.error("Validation failed:", result.error.format());
      return NextResponse.json(
        { error: "Validatiefout", details: result.error.format() },
        { status: 400 }
      );
    }
    console.log("Validation successful");

    const {
      name,
      email,
      password,
      role,
      postalCode,
      phoneNumber,
      bio,
      experience,
      education,
      certifications,
      languages,
      profileImageUrl,
      specialties,
      skills,
      hourlyRate,
    } = body;

    console.log(`Checking if email '${email}' is already registered`);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.warn(`Registration failed: Email '${email}' is already in use`);
      return NextResponse.json(
        { error: "E-mailadres is al in gebruik" },
        { status: 400 }
      );
    }
    console.log("Email check passed, email is available");

    const isDutchStudentEmail = email.endsWith('.nl') &&
      (email.includes('student') ||
        email.includes('uva.nl') || email.includes('rug.nl') || email.includes('uu.nl') ||
        email.includes('tudelft.nl') || email.includes('tue.nl') || email.includes('ru.nl') ||
        email.includes('eur.nl') || email.includes('wur.nl') || email.includes('utwente.nl') ||
        email.includes('vu.nl') || email.includes('maastrichtuniversity.nl') ||
        email.includes('tilburguniversity.edu') || email.includes('hva.nl') ||
        email.includes('hr.nl') || email.includes('hhs.nl') || email.includes('hu.nl') ||
        email.includes('fontys.nl') || email.includes('inholland.nl') || email.includes('han.nl'));
    console.log(`Email is${isDutchStudentEmail ? '' : ' not'} recognized as Dutch student email`);

    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password hashed successfully");

    console.log("Creating user in database");
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        postalCode,
        phoneNumber,
        walletBalance: isDutchStudentEmail ? 4 : 0,
        skills: role === "FIXER" ? (skills || []) : [],
        hourlyRate: role === "FIXER" ? (hourlyRate || 10) : null,
        isAvailable: role === "FIXER" ? true : false,
      },
    });
    console.log(`User created successfully with ID: ${user.id}, role: ${role}`);

    if (role === "FIXER" && (bio || experience || education || certifications || languages || profileImageUrl || specialties)) {
      console.log(`Creating fixer profile for user ID: ${user.id}`);
      await prisma.fixerProfile.create({
        data: {
          userId: user.id,
          bio: bio || "",
          experience: experience || "",
          education: education || "",
          certifications: certifications || [],
          languages: languages || [],
          profileImageUrl: profileImageUrl,
          specialties: specialties || [],
          toolsOwned: [],
          preferredWorkArea: [],
        },
      });
      console.log("Fixer profile created successfully");
    }

    console.log(`Generating verification token for user ID: ${user.id}`);
    const verificationToken = await generateVerificationToken(user.id);

    // Verify transporter before sending email
    await new Promise((resolve, reject) => {
      transporter.verify((error: any, success: unknown) => {
        if (error) {
          console.error('Transporter verification failed:', error);
          reject(error);
        } else {
          console.log('Transporter verified successfully');
          resolve(success);
        }
      });
    });

    console.log(`Sending verification email to: ${email}`);
    await sendVerificationEmail(email, verificationToken);
    console.log("Verification email sent successfully");

    const { password: _, ...userWithoutPassword } = user;

    console.log("Registration process completed successfully");
    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: isDutchStudentEmail
          ? "Account aangemaakt! Controleer je e-mail om je account te verifiëren. Als student krijg je je eerste boeking gratis."
          : "Account aangemaakt! Controleer je e-mail om je account te verifiëren.",
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