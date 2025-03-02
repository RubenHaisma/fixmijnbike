import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema
const fixerProfileSchema = z.object({
  bio: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  profileImageUrl: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  toolsOwned: z.array(z.string()).optional(),
  preferredWorkArea: z.array(z.string()).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is vereist" },
        { status: 400 }
      );
    }
    
    // Get fixer profile
    const fixerProfile = await prisma.fixerProfile.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            postalCode: true,
            skills: true,
            hourlyRate: true,
            isAvailable: true,
          },
        },
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    
    if (!fixerProfile) {
      return NextResponse.json(
        { error: "Fixer profiel niet gevonden" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(fixerProfile);
  } catch (error) {
    console.error("Error fetching fixer profile:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van het fixer profiel" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    // Check if user is a fixer
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    
    if (!user || user.role !== "FIXER") {
      return NextResponse.json(
        { error: "Alleen fixers kunnen een profiel aanmaken" },
        { status: 403 }
      );
    }
    
    // Check if profile already exists
    const existingProfile = await prisma.fixerProfile.findUnique({
      where: {
        userId: session.user.id,
      },
    });
    
    if (existingProfile) {
      return NextResponse.json(
        { error: "Fixer profiel bestaat al" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const result = fixerProfileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validatiefout", details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Create fixer profile
    const fixerProfile = await prisma.fixerProfile.create({
      data: {
        userId: session.user.id,
        bio: body.bio,
        experience: body.experience,
        education: body.education,
        certifications: body.certifications || [],
        languages: body.languages || [],
        profileImageUrl: body.profileImageUrl,
        galleryImages: body.galleryImages || [],
        specialties: body.specialties || [],
        toolsOwned: body.toolsOwned || [],
        preferredWorkArea: body.preferredWorkArea || [],
      },
    });
    
    return NextResponse.json(fixerProfile);
  } catch (error) {
    console.error("Error creating fixer profile:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het aanmaken van het fixer profiel" },
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
    
    // Check if user is a fixer
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    
    if (!user || user.role !== "FIXER") {
      return NextResponse.json(
        { error: "Alleen fixers kunnen een profiel bijwerken" },
        { status: 403 }
      );
    }
    
    // Check if profile exists
    const existingProfile = await prisma.fixerProfile.findUnique({
      where: {
        userId: session.user.id,
      },
    });
    
    if (!existingProfile) {
      return NextResponse.json(
        { error: "Fixer profiel bestaat niet" },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    const result = fixerProfileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validatiefout", details: result.error.format() },
        { status: 400 }
      );
    }
    
    // Update fixer profile
    const updatedProfile = await prisma.fixerProfile.update({
      where: {
        userId: session.user.id,
      },
      data: {
        bio: body.bio,
        experience: body.experience,
        education: body.education,
        certifications: body.certifications,
        languages: body.languages,
        profileImageUrl: body.profileImageUrl,
        galleryImages: body.galleryImages,
        specialties: body.specialties,
        toolsOwned: body.toolsOwned,
        preferredWorkArea: body.preferredWorkArea,
      },
    });
    
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error updating fixer profile:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van het fixer profiel" },
      { status: 500 }
    );
  }
}