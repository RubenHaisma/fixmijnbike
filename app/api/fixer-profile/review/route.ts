import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schema
const reviewSchema = z.object({
  profileId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

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
    
    // Validate input
    const result = reviewSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validatiefout", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { profileId, rating, comment } = body;
    
    // Check if profile exists
    const profile = await prisma.fixerProfile.findUnique({
      where: {
        id: profileId,
      },
    });
    
    if (!profile) {
      return NextResponse.json(
        { error: "Fixer profiel niet gevonden" },
        { status: 404 }
      );
    }
    
    // Check if user has completed a repair with this fixer
    const completedRepair = await prisma.repair.findFirst({
      where: {
        riderId: session.user.id,
        fixerId: profile.userId,
        status: "COMPLETED",
      },
    });
    
    if (!completedRepair) {
      return NextResponse.json(
        { error: "Je kunt alleen een review plaatsen na een voltooide reparatie" },
        { status: 403 }
      );
    }
    
    // Create review
    const review = await prisma.review.create({
      data: {
        profileId,
        riderId: session.user.id,
        rating,
        comment,
      },
    });
    
    // Update profile average rating and total reviews
    const reviews = await prisma.review.findMany({
      where: {
        profileId,
      },
    });
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    await prisma.fixerProfile.update({
      where: {
        id: profileId,
      },
      data: {
        averageRating,
        totalReviews: reviews.length,
      },
    });
    
    return NextResponse.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het plaatsen van de review" },
      { status: 500 }
    );
  }
}