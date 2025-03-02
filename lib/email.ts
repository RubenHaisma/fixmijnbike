import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Create a secure transporter using Gmail SMTP with OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Required for some production environments
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug logs in development
  logger: process.env.NODE_ENV === 'development' // Enable logging in development
});

// Verify transporter connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email transporter error:', error);
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

// Email template with improved styling
const emailTemplate = (content: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FixMijnBike</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          background-color: #ff8a00;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header img {
          width: 120px;
          height: auto;
        }
        .content {
          padding: 30px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #ff8a00;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #e67a00;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #6b7280;
          font-size: 12px;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
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
          <p>&copy; ${new Date().getFullYear()} FixMijnBike. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </body>
  </html>
`;

export const verifyEmail = async (token: string) => {
  try {
    // Find the verification token in the database
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    // Check if token exists
    if (!verificationToken) {
      throw new Error("Invalid token");
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Delete the expired token
      await prisma.verificationToken.delete({
        where: {
          id: verificationToken.id,
        },
      });
      throw new Error("Token expired");
    }

    // Update the user's email verification status
    await prisma.user.update({
      where: {
        id: verificationToken.identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        id: verificationToken.id,
      },
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error;
  }
};

// Send verification email with error handling and logging
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
        address: process.env.NEXT_PUBLIC_EMAIL_USER!
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

// Send notification email with error handling
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
        address: process.env.NEXT_PUBLIC_EMAIL_USER!
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
}