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
    default: 'Fiets Laten Maken in Nederland | Goedkope Fietsreparatie door Studenten | FixMijnBike',
    template: '%s | FixMijnBike - Betaalbare Fietsreparatie in %s'
  },
  description: 'Laat je fiets goedkoop repareren in heel Nederland 🚲 Actief in Amsterdam, Rotterdam, Utrecht, Den Haag en meer! Vanaf €15/uur - Direct gematcht ⚡',
  keywords: [
    'fiets laten maken',
    'fietsreparatie',
    'fietsenmaker',
    'fiets reparatie student',
    'fietsenmaker student',
    'fietsenmaker studenten',
    'fietsenmaker goedkoop',
    'band laten plakken fiets',
    'fiets reparatie',
    'goedkope fietsenmaker',
    'fiets repareren',
    'lekke band',
    'fiets kapot',
    'student fietsenmaker',
    'fiets onderhoud',
    'fietsreparatie aan huis',
    'fietsenmaker in de buurt',
    'fietsenmaker studenten',
    'fietsenmaker utrecht',
    'fietsenmaker amsterdam',
    'fietsenmaker rotterdam',
    'fietsenmaker den haag',
    'fietsenmaker eindhoven',
    'fietsenmaker groningen',
    'goedkope fietsreparatie',
    'fiets service',
    'fiets monteur',
    'fiets reparatie kosten',
    'fiets reparatie student',
    'fiets maken utrecht',
    'fiets reparatie utrecht',
    'fietsenmaker utrecht centrum',
    'fiets maken amsterdam',
    'fiets reparatie amsterdam',
    'fietsenmaker amsterdam centrum',
    'fiets maken rotterdam',
    'fiets reparatie rotterdam',
    'fietsenmaker rotterdam centrum',
    'fiets maken den haag',
    'fiets reparatie den haag',
    'fietsenmaker den haag centrum',
    'fiets maken groningen',
    'fiets reparatie groningen',
    'fietsenmaker groningen centrum',
    'fiets maken eindhoven',
    'fiets reparatie eindhoven',
    'fietsenmaker eindhoven centrum',
    'goedkope fietsenmaker utrecht',
    'goedkope fietsenmaker amsterdam',
    'goedkope fietsenmaker rotterdam',
    'student fietsenmaker utrecht',
    'student fietsenmaker amsterdam',
    'student fietsenmaker rotterdam',
    'fietsreparatie aan huis utrecht',
    'fietsreparatie aan huis amsterdam',
    'fietsreparatie aan huis rotterdam',
    'lekke band utrecht',
    'lekke band amsterdam',
    'lekke band rotterdam'
  ],
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
    title: 'Fiets Laten Maken | Goedkope Fietsreparatie door Studenten | FixMijnBike',
    description: 'Laat je fiets goedkoop repareren door studenten in jouw buurt ⭐ Vanaf €5/uur ✅ Direct gematcht ⚡ Binnen 24 uur gerepareerd 🚲 Lekke band, remmen, ketting en meer!',
    siteName: 'FixMijnBike',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FixMijnBike - Goedkope Fietsreparatie door Studenten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fiets Laten Maken | Goedkope Fietsreparatie door Studenten',
    description: 'Laat je fiets goedkoop repareren door studenten in jouw buurt. Vanaf €5/uur, binnen 24 uur gerepareerd!',
    images: ['/og-image.jpg'],
    creator: '@fixmijnbike',
  },
  alternates: {
    canonical: 'https://fixmijnbike.nl',
    languages: {
      'nl-NL': 'https://fixmijnbike.nl',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="image" href="/images/logo.png" />
      </head>
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
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FixMijnBike",
              "url": "https://fixmijnbike.nl",
              "logo": "https://fixmijnbike.nl/images/logo.png",
              "description": "Betaalbare fietsreparatie door studenten, voor studenten in heel Nederland",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Amsterdam",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "Netherlands"
                  }
                },
                {
                  "@type": "City",
                  "name": "Utrecht",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "Netherlands"
                  }
                },
                {
                  "@type": "City",
                  "name": "Rotterdam",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "Netherlands"
                  }
                },
                {
                  "@type": "City",
                  "name": "Den Haag",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "Netherlands"
                  }
                }
              ],
              "sameAs": [
                "https://facebook.com/fixmijnbike",
                "https://instagram.com/fixmijnbike",
                "https://twitter.com/fixmijnbike"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+31-6-12345678",
                "contactType": "customer service",
                "availableLanguage": ["Dutch", "English"]
              }
            })
          }}
        />
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}