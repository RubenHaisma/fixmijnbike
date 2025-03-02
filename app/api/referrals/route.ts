import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
    const { referralCode } = body;
    
    if (!referralCode) {
      return NextResponse.json(
        { error: "Referral code is vereist" },
        { status: 400 }
      );
    }
    
    // Find the referrer user
    const referrer = await prisma.user.findFirst({
      where: {
        id: referralCode,
      },
    });
    
    if (!referrer) {
      return NextResponse.json(
        { error: "Ongeldige referral code" },
        { status: 400 }
      );
    }
    
    // Check if user is trying to refer themselves
    if (referrer.id === session.user.id) {
      return NextResponse.json(
        { error: "Je kunt jezelf niet refereren" },
        { status: 400 }
      );
    }
    
    // Check if referral already exists
    const existingReferral = await prisma.referral.findFirst({
      where: {
        referrerId: referrer.id,
        referredId: session.user.id,
      },
    });
    
    if (existingReferral) {
      return NextResponse.json(
        { error: "Je hebt deze referral code al gebruikt" },
        { status: 400 }
      );
    }
    
    // Create referral
    const referral = await prisma.referral.create({
      data: {
        referrerId: referrer.id,
        referredId: session.user.id,
        isRedeemed: true,
        redeemedAt: new Date(),
      },
    });
    
    // Add €4 to both users' wallets
    await prisma.user.update({
      where: {
        id: referrer.id,
      },
      data: {
        walletBalance: {
          increment: 4,
        },
      },
    });
    
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        walletBalance: {
          increment: 4,
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      message: "Referral succesvol toegepast! Jij en je vriend hebben allebei €4 ontvangen.",
    });
  } catch (error) {
    console.error("Error processing referral:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verwerken van de referral" },
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
    
    // Get all referrals made by the user
    const referrals = await prisma.referral.findMany({
      where: {
        referrerId: session.user.id,
      },
      include: {
        referred: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    return NextResponse.json(referrals);
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de referrals" },
      { status: 500 }
    );
  }
}