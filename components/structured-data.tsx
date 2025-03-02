import React from 'react';

interface LocalBusinessProps {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  logo?: string;
  priceRange?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
}

export function LocalBusinessSchema({
  name,
  description,
  url,
  telephone,
  email,
  logo,
  priceRange,
  address,
  geo,
  openingHours,
}: LocalBusinessProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(logo && { logo }),
    ...(priceRange && { priceRange }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
    ...(openingHours && { openingHoursSpecification: openingHours }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface FAQProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSchema({ questions }: FAQProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface ServiceProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceArea?: {
    name: string;
    type: string;
  }[];
  offers?: {
    price: string;
    priceCurrency: string;
    description?: string;
  }[];
}

export function ServiceSchema({
  name,
  description,
  provider,
  serviceArea,
  offers,
}: ServiceProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider.name,
      url: provider.url,
    },
    ...(serviceArea && {
      areaServed: serviceArea.map((area) => ({
        '@type': area.type,
        name: area.name,
      })),
    }),
    ...(offers && {
      offers: offers.map((offer) => ({
        '@type': 'Offer',
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        ...(offer.description && { description: offer.description }),
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

interface BreadcrumbProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}