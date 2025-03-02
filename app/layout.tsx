import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ff8a00',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fixmijnbike.nl'),
  title: {
    default: 'FixMijnBike - Persoonlijke fietsreparatie door studenten, voor studenten',
    template: '%s | FixMijnBike'
  },
  description: 'Betaalbare fietsreparatie door studenten, voor studenten. Lekke band? Piepende remmen? Vind een student-fixer in jouw buurt die je snel en betaalbaar helpt.',
  keywords: ['fietsreparatie', 'studenten', 'bijverdienen', 'fietsenmaker', 'fiets repareren', 'goedkope fietsreparatie', 'lekke band', 'fiets kapot', 'fiets onderhoud'],
  authors: [{ name: 'FixMijnBike Team' }],
  creator: 'FixMijnBike',
  publisher: 'FixMijnBike',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://fixmijnbike.nl',
    title: 'FixMijnBike - Persoonlijke fietsreparatie door studenten, voor studenten',
    description: 'Betaalbare fietsreparatie door studenten, voor studenten. Lekke band? Piepende remmen? Vind een student-fixer in jouw buurt die je snel en betaalbaar helpt.',
    siteName: 'FixMijnBike',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FixMijnBike - Fietsreparatie door studenten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FixMijnBike - Persoonlijke fietsreparatie door studenten, voor studenten',
    description: 'Betaalbare fietsreparatie door studenten, voor studenten. Vind een student-fixer in jouw buurt.',
    images: ['/og-image.jpg'],
    creator: '@fixmijnbike',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://fixmijnbike.nl',
    languages: {
      'nl-NL': 'https://fixmijnbike.nl',
    },
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
        
        {/* Google Analytics - Replace with your actual GA ID */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-N24ZGRTH90"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N24ZGRTH90');
          `}
        </Script>
      </body>
    </html>
  );
}