import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Update payment status in database
      await prisma.payment.update({
        where: {
          stripeId: paymentIntent.id,
        },
        data: {
          status: "succeeded",
        },
      });
      
      // Find the repair associated with this payment
      const repair = await prisma.repair.findFirst({
        where: {
          paymentId: paymentIntent.metadata.paymentId,
        },
        include: {
          fixer: true,
        },
      });
      
      if (repair && repair.fixer) {
        // Update repair status
        await prisma.repair.update({
          where: {
            id: repair.id,
          },
          data: {
            isPaid: true,
            status: "BOOKED",
          },
        });
        
        // Add €3 to fixer's wallet balance (platform keeps €1)
        await prisma.user.update({
          where: {
            id: repair.fixer.id,
          },
          data: {
            walletBalance: {
              increment: 3,
            },
          },
        });
      }
      
      break;
      
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Update payment status in database
      await prisma.payment.update({
        where: {
          stripeId: failedPaymentIntent.id,
        },
        data: {
          status: "failed",
        },
      });
      
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}