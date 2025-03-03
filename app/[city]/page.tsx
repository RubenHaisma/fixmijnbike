import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const validCities = ['amsterdam', 'utrecht', 'rotterdam', 'den-haag', 'groningen', 'eindhoven'];

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const city = params.city;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');
  
  return {
    title: `Fiets Laten Maken in ${cityName} | Goedkope Fietsreparatie door Studenten`,
    description: `Laat je fiets goedkoop repareren door studenten in ${cityName} 🚲 Vanaf €5/uur ✅ Direct gematcht ⚡ Binnen 24 uur gerepareerd! Lekke band, remmen, ketting en meer.`,
    openGraph: {
      title: `Fiets Laten Maken in ${cityName} | Goedkope Fietsreparatie door Studenten`,
      description: `Laat je fiets goedkoop repareren door studenten in ${cityName}. Vanaf €5/uur, binnen 24 uur gerepareerd!`,
    }
  };
}

export async function generateStaticParams() {
  return validCities.map((city) => ({
    city: city,
  }));
}

export default function CityPage({ params }: { params: { city: string } }) {
  if (!validCities.includes(params.city)) {
    notFound();
  }

  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1).replace('-', ' ');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Fiets Laten Maken in {cityName}</h1>
      {/* Add your city-specific content here */}
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