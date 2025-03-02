import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    const { repairId } = body;
    
    if (!repairId) {
      return NextResponse.json(
        { error: "Reparatie ID is vereist" },
        { status: 400 }
      );
    }
    
    // Get the repair
    const repair = await prisma.repair.findUnique({
      where: {
        id: repairId,
      },
    });
    
    if (!repair) {
      return NextResponse.json(
        { error: "Reparatie niet gevonden" },
        { status: 404 }
      );
    }
    
    // Check if user is authorized to pay for this repair
    if (repair.riderId !== session.user.id) {
      return NextResponse.json(
        { error: "Niet geautoriseerd om voor deze reparatie te betalen" },
        { status: 403 }
      );
    }
    
    // Check if repair is in the correct status
    if (repair.status !== "MATCHED") {
      return NextResponse.json(
        { error: "Reparatie kan niet worden betaald in de huidige status" },
        { status: 400 }
      );
    }
    
    // Check if user has enough wallet balance
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Gebruiker niet gevonden" },
        { status: 404 }
      );
    }
    
    // If user has enough wallet balance, use that instead of Stripe
    if (user.walletBalance >= repair.platformFee) {
      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          amount: repair.platformFee,
          currency: "eur",
          status: "succeeded",
        },
      });
      
      // Update repair
      await prisma.repair.update({
        where: {
          id: repairId,
        },
        data: {
          status: "BOOKED",
          isPaid: true,
          paymentId: payment.id,
          bookingTime: new Date(),
        },
      });
      
      // Deduct from user's wallet
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          walletBalance: {
            decrement: repair.platformFee,
          },
        },
      });
      
      // Add platform fee to fixer's wallet (€3)
      if (repair.fixerId) {
        await prisma.user.update({
          where: {
            id: repair.fixerId,
          },
          data: {
            walletBalance: {
              increment: 3,
            },
          },
        });
      }
      
      return NextResponse.json({
        success: true,
        message: "Betaling succesvol verwerkt met wallet saldo",
        redirect: `/repair/${repairId}`,
      });
    }
    
    // Create a payment record
    const payment = await prisma.payment.create({
      data: {
        amount: repair.platformFee,
        currency: "eur",
        status: "pending",
      },
    });
    
    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "BikeFixNL Platformkosten",
              description: `Reparatie: ${repair.issueType}`,
            },
            unit_amount: Math.round(repair.platformFee * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/repair/${repairId}?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/repair/${repairId}?payment=cancelled`,
      metadata: {
        repairId,
        paymentId: payment.id,
      },
    });
    
    // Update payment with Stripe ID
    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        stripeId: stripeSession.id,
      },
    });
    
    // Update repair with payment ID
    await prisma.repair.update({
      where: {
        id: repairId,
      },
      data: {
        paymentId: payment.id,
      },
    });
    
    return NextResponse.json({
      id: stripeSession.id,
      url: stripeSession.url,
    });
  } catch (error) {
    console.error("Error creating payment session:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het aanmaken van de betaalsessie" },
      { status: 500 }
    );
  }
}