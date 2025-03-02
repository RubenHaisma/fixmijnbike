import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bike, Wrench, ArrowRight, Star, Euro, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-orange-500">
                BikeFixNL
              </h1>
              <p className="text-xl font-semibold text-blue-600">
                Fietsreparatie door studenten, voor studenten
              </p>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                Lekke band? Piepende remmen? Kapotte ketting? Geen zorgen! Vind een student-fixer in jouw buurt.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link href="/repair">
                  <Bike className="mr-2 h-5 w-5" />
                  Repareer Mijn Fiets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Link href="/become-fixer">
                  <Wrench className="mr-2 h-5 w-5" />
                  Word een Fixer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
                Hoe het werkt
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
                Eenvoudig, betaalbaar en snel je fiets laten repareren
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200">
                <div className="p-3 rounded-full bg-orange-100">
                  <Bike className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold">1. Beschrijf je probleem</h3>
                <p className="text-gray-600 text-center">
                  Vertel ons wat er mis is met je fiets en upload een foto
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200">
                <div className="p-3 rounded-full bg-blue-100">
                  <Wrench className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">2. Kies een Fixer</h3>
                <p className="text-gray-600 text-center">
                  Bekijk beschikbare student-fixers in jouw buurt en hun tarieven
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200">
                <div className="p-3 rounded-full bg-red-100">
                  <Clock className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold">3. Boek een tijdslot</h3>
                <p className="text-gray-600 text-center">
                  Betaal €4 platformkosten en plan een reparatie wanneer het jou uitkomt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-12 md:py-24 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
                Voordelen voor studenten
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Betaalbare reparaties</h3>
                    <p className="text-gray-600">
                      Bespaar geld met studentvriendelijke tarieven, veel lager dan bij fietswinkels
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Flexibele tijden</h3>
                    <p className="text-gray-600">
                      Reparaties wanneer het jou uitkomt, zelfs &apos;s avonds en in het weekend
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Euro className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Verdien bij als Fixer</h3>
                    <p className="text-gray-600">
                      Gebruik je fietskennis om €5-€15 per uur te verdienen in je vrije tijd
                    </p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="mt-4 bg-orange-500 hover:bg-orange-600">
                <Link href="/signup">
                  Meld je nu aan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1582559934361-5c0d5278b0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Student repairing a Bike"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
              Wat studenten zeggen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 bg-orange-50 rounded-lg border border-orange-100">
                <p className="italic text-gray-700 mb-4">
                  &quot;Mijn ketting was kapot en ik had geen idee hoe ik het moest repareren. Via BikeFixNL vond ik Joost die het binnen 20 minuten had opgelost voor maar €10!&quot;
                </p>
                <p className="font-semibold">Emma, UvA student</p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                <p className="italic text-gray-700 mb-4">
                  &quot;Als Fixer verdien ik nu ongeveer €150 per week extra. Perfect naast mijn studie en ik help er andere studenten mee.&quot;
                </p>
                <p className="font-semibold">Tim, TU Delft student</p>
              </div>
              
              <div className="p-6 bg-red-50 rounded-lg border border-red-100">
                <p className="italic text-gray-700 mb-4">
                  &quot;Lekke band op zondag en alle winkels dicht. Dankzij BikeFixNL kon ik dezelfde dag nog naar college fietsen!&quot;
                </p>
                <p className="font-semibold">Sophie, RUG student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Klaar om je fiets te laten repareren?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              Of wil je extra geld verdienen als student-fixer?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                <Link href="/repair">
                  <Bike className="mr-2 h-5 w-5" />
                  Repareer Mijn Fiets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/become-fixer">
                  <Wrench className="mr-2 h-5 w-5" />
                  Word een Fixer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}