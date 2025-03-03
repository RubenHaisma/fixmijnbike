import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Define valid cities
const validCities = ['amsterdam', 'utrecht', 'rotterdam', 'den-haag', 'groningen', 'eindhoven'];

// Define the params interface
interface CityParams {
  city: string;
}

// Define the context type for the page (mimicking an API route-like structure)
interface CityPageContext {
  params: Promise<CityParams>;
}

// Generate metadata for SEO
export async function generateMetadata(context: CityPageContext): Promise<Metadata> {
  // Resolve the params Promise
  const params = await context.params;
  const city = params.city;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');

  return {
    title: `Fiets Laten Maken in ${cityName} | Goedkope Fietsreparatie door Studenten`,
    description: `Laat je fiets goedkoop repareren door studenten in ${cityName} 🚲 Vanaf €15/uur - Direct gematcht ⚡ Binnen 24 uur gerepareerd! Lekke band, remmen, ketting en meer.`,
    openGraph: {
      title: `Fiets Laten Maken in ${cityName} | Goedkope Fietsreparatie door Studenten`,
      description: `Laat je fiets goedkoop repareren door studenten in ${cityName}. Vanaf €5/uur, binnen 24 uur gerepareerd!`,
    },
  };
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return validCities.map((city) => ({
    city: city,
  }));
}

// Define the page component, treating params as a Promise
export default async function CityPage(context: CityPageContext) {
  // Resolve the params Promise
  const params = await context.params;
  const city = params.city;

  if (!validCities.includes(city)) {
    notFound();
  }

  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Fiets Laten Maken in {cityName}</h1>
      <p>
        FixMijnBike is een platform dat in heel Nederland helpt om fietsen te repareren.
        We bieden een snelle en betaalbare oplossing voor al uw fietsproblemen.
      </p>
      <p>
        Onze studenten-fietsenmakers zijn gespecialiseerd in alles wat met fietsen te maken heeft.
        Van lekke banden tot remmen en kettingen, wij hebben het gecoverd.
      </p>
    </div>
  );
}