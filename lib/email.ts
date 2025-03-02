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
          <div class="social-links">
            <a href="https://instagram.com/fixmijnbike">Instagram</a>
            <a href="https://facebook.com/fixmijnbike">Facebook</a>
            <a href="https://twitter.com/fixmijnbike">Twitter</a>
          </div>
          <p>&copy; ${new Date().getFullYear()} FixMijnBike. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </body>
  </html>
`;

// Send verification email
export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  
  const content = `
    <h2>Verifieer je e-mailadres</h2>
    <p>Bedankt voor je registratie bij FixMijnBike! Klik op de onderstaande knop om je e-mailadres te verifiëren:</p>
    <a href="${verificationUrl}" class="button">E-mailadres verifiëren</a>
    <p>Of kopieer en plak deze link in je browser:</p>
    <p style="word-break: break-all; color: #4776e6;">${verificationUrl}</p>
    <p>Deze link is 24 uur geldig.</p>
    <p>Als je deze e-mail niet hebt aangevraagd, kun je deze veilig negeren.</p>
  `;
  
  const mailOptions = {
    from: "info@fixmijnbike.nl",
    to: email,
    subject: 'Verifieer je e-mailadres voor FixMijnBike',
    html: emailTemplate(content),
  };
  
  return transporter.sendMail(mailOptions);
};

// Send notification email
export const sendNotificationEmail = async (email: string, title: string, message: string, actionUrl?: string) => {
  const content = `
    <h2>${title}</h2>
    <p>${message}</p>
    ${actionUrl ? `<a href="${process.env.NEXTAUTH_URL}${actionUrl}" class="button">Bekijk details</a>` : ''}
  `;
  
  const mailOptions = {
    from: "info@fixmijnbike.nl",
    to: email,
    subject: title,
    html: emailTemplate(content),
  };
  
  return transporter.sendMail(mailOptions);
};