import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Create a transporter using Google SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: "E-mailadres is vereist" },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      return NextResponse.json(
        { success: true, message: "Als dit e-mailadres bij ons bekend is, ontvang je een e-mail met instructies om je wachtwoord te resetten." },
        { status: 200 }
      );
    }
    
    // Generate a reset token
    const token = crypto.randomBytes(32).toString("hex");
    
    // Set expiration to 1 hour from now
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    
    // Store the token in the database
    await prisma.passwordResetToken.create({
      data: {
        identifier: user.id,
        token,
        expires,
      },
    });
    
    // Send password reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset je wachtwoord voor FixMijnBike',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ff8a00; padding: 20px; text-align: center; color: white;">
            <h1>FixMijnBike</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
            <h2>Reset je wachtwoord</h2>
            <p>Je ontvangt deze e-mail omdat je een wachtwoord reset hebt aangevraagd voor je FixMijnBike account.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #ff8a00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Wachtwoord resetten</a>
            </div>
            <p>Of kopieer en plak deze link in je browser:</p>
            <p style="word-break: break-all; color: #4776e6;">${resetUrl}</p>
            <p>Deze link is 1 uur geldig.</p>
            <p>Als je deze e-mail niet hebt aangevraagd, kun je deze veilig negeren.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
            <p style="color: #777; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} FixMijnBike. Alle rechten voorbehouden.</p>
          </div>
        </div>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json(
      { success: true, message: "Als dit e-mailadres bij ons bekend is, ontvang je een e-mail met instructies om je wachtwoord te resetten." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verwerken van je verzoek" },
      { status: 500 }
    );
  }
}