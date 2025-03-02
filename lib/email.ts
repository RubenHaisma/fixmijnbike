import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Create a secure transporter using Gmail SMTP with explicit settings
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Use TLS
  secure: false, // TLS instead of SSL (secure: true would be for port 465)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Must be an App Password if 2FA is enabled
  },
  connectionTimeout: 10000, // 10-second timeout to fail faster
  debug: true, // Enable debug logs in all environments temporarily
  logger: true, // Enable logging for detailed output
});

// Verify transporter connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email transporter startup error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Generate a verification token
export const generateVerificationToken = async (userId: string) => {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);

  await prisma.verificationToken.create({
    data: {
      identifier: userId,
      token,
      expires,
    },
  });

  return token;
};

// Email template (unchanged)
const emailTemplate = (content: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FixMijnBike</title>
      <style>
        /* ... your existing styles ... */
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${process.env.NEXTAUTH_URL}/images/logo.png" alt="FixMijnBike Logo" />
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} FixMijnBike. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </body>
  </html>
`;

// Verify email (unchanged)
export const verifyEmail = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!verificationToken) {
      throw new Error("Invalid token");
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      throw new Error("Token expired");
    }

    await prisma.user.update({
      where: { id: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
};

// Send verification email with improved error handling
export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    console.log('Sending verification email to:', email);
    console.log('Verification URL:', verificationUrl);

    const content = `
      <h2>Verifieer je e-mailadres</h2>
      <p>Bedankt voor je registratie bij FixMijnBike! Klik op de onderstaande knop om je e-mailadres te verifiëren:</p>
      <a href="${verificationUrl}" class="button" style="color: white;">E-mailadres verifiëren</a>
      <p>Of kopieer en plak deze link in je browser:</p>
      <p style="word-break: break-all; color: #4776e6;">${verificationUrl}</p>
      <p>Deze link is 24 uur geldig.</p>
      <p>Als je deze e-mail niet hebt aangevraagd, kun je deze veilig negeren.</p>
    `;

    const mailOptions = {
      from: {
        name: "FixMijnBike",
        address: process.env.EMAIL_USER!,
      },
      to: email,
      subject: 'Verifieer je e-mailadres voor FixMijnBike',
      html: emailTemplate(content),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

// Send notification email (unchanged except for logging)
export const sendNotificationEmail = async (email: string, title: string, message: string, actionUrl?: string) => {
  try {
    const content = `
      <h2>${title}</h2>
      <p>${message}</p>
      ${actionUrl ? `<a href="${process.env.NEXTAUTH_URL}${actionUrl}" class="button" style="color: white;">Bekijk details</a>` : ''}
    `;

    const mailOptions = {
      from: {
        name: "FixMijnBike",
        address: process.env.EMAIL_USER!,
      },
      to: email,
      subject: title,
      html: emailTemplate(content),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending notification email:", error);
    throw error;
  }
};