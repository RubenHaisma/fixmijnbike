import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FixMijnBike - Persoonlijke fietsreparatie door studenten, voor studenten',
  description: 'Verbind studenten met fietsreparatie behoeften aan student "fixers" die extra geld verdienen',
  keywords: 'fietsreparatie, studenten, bijverdienen, fietsenmaker, fiets repareren, goedkope fietsreparatie',
  authors: [{ name: 'FixMijnBike Team' }],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://fixmijnbike.nl',
    title: 'FixMijnBike - Persoonlijke fietsreparatie door studenten, voor studenten',
    description: 'Verbind studenten met fietsreparatie behoeften aan student "fixers" die extra geld verdienen',
    siteName: 'FixMijnBike',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}