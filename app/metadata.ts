import { Metadata, Viewport } from 'next/types';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ff8a00' },
    { media: '(prefers-color-scheme: dark)', color: '#e07b00' },
  ],
  colorScheme: 'light dark',
};

const defaultMetadata: Metadata = {
  metadataBase: new URL('https://fixmijnbike.nl'),
  title: {
    default: 'FixMijnBike | Goedkope Fietsreparatie door Studenten',
    template: '%s | FixMijnBike'
  },
  description: 'Laat je fiets goedkoop repareren door studenten in jouw buurt. Vanaf €5/uur, direct gematcht en binnen 24 uur gerepareerd. ✓ Lekke band ✓ Remmen ✓ Ketting',
  keywords: [
    'fietsreparatie',
    'goedkope fietsenmaker',
    'student fietsenmaker',
    'lekke band repareren',
    'fiets onderhoud',
    'fiets reparatie aan huis',
    'fietsenmaker in de buurt',
    'betaalbare fietsreparatie',
    'snel fiets repareren',
    'fiets kapot',
    'fietsband plakken',
    'fietsreparatie kosten',
    'fietsenmaker studentenkorting',
    'fiets reparatie service',
    'mobiele fietsenmaker',
    'fietsreparatie Amsterdam',
    'fietsreparatie Utrecht',
    'fietsreparatie Rotterdam',
    'fiets ketting repareren',
    'remmen fiets repareren',
    'fietswinkel alternatief',
    'goedkope fiets reparatie',
    'fiets reparatie thuis',
    'studenten fiets service',
    'fiets reparatie afspraak',
    'lokale fietsenmaker',
    'fietsreparatie same day',
    'fiets repareren goedkoop',
    'fietsband vervangen',
    'fiets onderhoud studenten',
  ],
  authors: [{ name: 'FixMijnBike Team', url: 'https://fixmijnbike.nl/over-ons' }],
  creator: 'FixMijnBike',
  publisher: 'FixMijnBike',
  applicationName: 'FixMijnBike',
  generator: 'Next.js',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://fixmijnbike.nl/',
    title: 'FixMijnBike | Betaalbare Fietsreparatie door Studenten',
    description: 'Goedkope en snelle fietsreparatie door studenten. Vanaf €5/uur, binnen 24 uur je fiets weer klaar!',
    siteName: 'FixMijnBike',
    countryName: 'Netherlands',
    images: [
      {
        url: 'https://fixmijnbike.nl/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Student repareert fiets - FixMijnBike',
        type: 'image/jpeg',
        secureUrl: 'https://fixmijnbike.nl/images/og-image.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fixmijnbike',
    creator: '@fixmijnbike',
    title: 'FixMijnBike | Goedkope Fietsreparatie',
    description: 'Fiets kapot? Laat hem repareren door studenten vanaf €5/uur. Snel, betrouwbaar en betaalbaar!',
    images: [{
      url: 'https://fixmijnbike.nl/images/og-image.jpg',
      alt: 'FixMijnBike fietsreparatie service',
    }],
  },
  alternates: {
    canonical: 'https://fixmijnbike.nl/',
    languages: {
      'nl-NL': 'https://fixmijnbike.nl/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
};

// Page-specific metadata
export const repairMetadata: Metadata = {
  ...defaultMetadata,
  title: 'Fiets Reparatie Aanvragen | FixMijnBike',
  description: 'Direct je fietsreparatie aanvragen bij een student in jouw buurt. Snel geregeld: lekke band, remmen of kettingproblemen!',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Fiets Reparatie Aanvragen | FixMijnBike',
    url: 'https://fixmijnbike.nl/reparatie-aanvragen',
  },
};

export const becomeFixerMetadata: Metadata = {
  ...defaultMetadata,
  title: 'Word Fixer | Verdien met Fietsreparaties | FixMijnBike',
  description: 'Verdien flexibel bij als student door fietsen te repareren. €5-€15/uur. Meld je aan als fixer!',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Word Fixer | Verdien met Fietsreparaties',
    url: 'https://fixmijnbike.nl/word-fixer',
  },
};

export const howItWorksMetadata: Metadata = {
  ...defaultMetadata,
  title: 'Hoe het Werkt | FixMijnBike Fietsreparatie',
  description: 'Zo werkt FixMijnBike: snel, simpel en betaalbaar je fiets laten maken door studenten in de buurt.',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Hoe het Werkt | FixMijnBike',
    url: 'https://fixmijnbike.nl/hoe-het-werkt',
  },
};

export default defaultMetadata;