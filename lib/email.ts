import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Create a transporter using Google SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate a verification token
export const generateVerificationToken = async (userId: string) => {
  // Generate a random token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Set expiration to 24 hours from now
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);
  
  // Store the token in the database
  await prisma.verificationToken.create({
    data: {
      identifier: userId,
      token,
      expires,
    },
  });
  
  return token;
};

// Send verification email
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verifieer je e-mailadres voor FixMijnBike',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ff8a00; padding: 20px; text-align: center; color: white;">
          <h1>FixMijnBike</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
          <h2>Verifieer je e-mailadres</h2>
          <p>Bedankt voor je registratie bij FixMijnBike! Klik op de onderstaande link om je e-mailadres te verifiëren:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #ff8a00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">E-mailadres verifiëren</a>
          </div>
          <p>Of kopieer en plak deze link in je browser:</p>
          <p style="word-break: break-all; color: #4776e6;">${verificationUrl}</p>
          <p>Deze link is 24 uur geldig.</p>
          <p>Als je deze e-mail niet hebt aangevraagd, kun je deze veilig negeren.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
          <p style="color: #777; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} FixMijnBike. Alle rechten voorbehouden.</p>
        </div>
      </div>
    `,
  };
  
  return transporter.sendMail(mailOptions);
};

// Verify email with token
export const verifyEmail = async (token: string) => {
  // Find the token in the database
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });
  
  if (!verificationToken) {
    throw new Error('Invalid token');
  }
  
  // Check if token is expired
  if (new Date() > verificationToken.expires) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: { token },
    });
    throw new Error('Token expired');
  }
  
  // Update user's email verification status
  await prisma.user.update({
    where: { id: verificationToken.identifier },
    data: { emailVerified: new Date() },
  });
  
  // Delete the used token
  await prisma.verificationToken.delete({
    where: { token },
  });
  
  return true;
};