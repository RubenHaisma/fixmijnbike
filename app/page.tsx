import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bike, Wrench, ArrowRight, Star, Euro, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="hero-section w-full">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <Image 
                src="/logo.png" 
                alt="FixMijnBike Logo" 
                width={120} 
                height={120} 
                className="mx-auto mb-4"
              />
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
                FixMijnBike
              </h1>
              <p className="text-xl font-semibold text-secondary">
                Persoonlijke fietsreparatie door studenten, voor studenten
              </p>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                Lekke band? Piepende remmen? Kapotte ketting? Geen zorgen! Vind een student-fixer in jouw buurt die je persoonlijk komt helpen.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 button-hover">
                <Link href="/repair">
                  <Bike className="mr-2 h-5 w-5" />
                  Fix Mijn Fiets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 button-hover">
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
      <section className="feature-section w-full">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-secondary">
                Hoe het werkt
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
                Eenvoudig, betaalbaar en snel je fiets laten repareren
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl border border-orange-200 bg-white shadow-sm card-hover">
                <div className="p-3 rounded-full bg-orange-100">
                  <Bike className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">1. Beschrijf je probleem</h3>
                <p className="text-gray-600 text-center">
                  Vertel ons wat er mis is met je fiets en upload een foto
                </p>
                <Image 
                  src="/step1-describe.jpg" 
                  alt="Beschrijf je probleem" 
                  width={250} 
                  height={150} 
                  className="rounded-lg mt-2 object-cover"
                />
              </div>
              
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl border border-blue-200 bg-white shadow-sm card-hover">
                <div className="p-3 rounded-full bg-blue-100">
                  <Wrench className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">2. Kies een Fixer</h3>
                <p className="text-gray-600 text-center">
                  Bekijk beschikbare student-fixers in jouw buurt en hun tarieven
                </p>
                <Image 
                  src="/step2-choose.jpg" 
                  alt="Kies een Fixer" 
                  width={250} 
                  height={150} 
                  className="rounded-lg mt-2 object-cover"
                />
              </div>
              
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl border border-pink-200 bg-white shadow-sm card-hover">
                <div className="p-3 rounded-full bg-pink-100">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold">3. Boek een tijdslot</h3>
                <p className="text-gray-600 text-center">
                  Betaal €4 platformkosten en plan een reparatie wanneer het jou uitkomt
                </p>
                <Image 
                  src="/step3-book.jpg" 
                  alt="Boek een tijdslot" 
                  width={250} 
                  height={150} 
                  className="rounded-lg mt-2 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="testimonial-section w-full">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-secondary">
                Voordelen voor studenten
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Betaalbare reparaties</h3>
                    <p className="text-gray-600">
                      Bespaar geld met studentvriendelijke tarieven, veel lager dan bij fietswinkels
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Flexibele tijden</h3>
                    <p className="text-gray-600">
                      Reparaties wanneer het jou uitkomt, zelfs &apos;s avonds en in het weekend
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Euro className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Verdien bij als Fixer</h3>
                    <p className="text-gray-600">
                      Gebruik je fietskennis om €5-€15 per uur te verdienen in je vrije tijd
                    </p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90 button-hover">
                <Link href="/signup">
                  Meld je nu aan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/bikefixing.jpg"
                alt="Student repairing a Bike"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="feature-section w-full">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-secondary">
              Wat studenten zeggen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
              <div className="p-6 bg-orange-50 rounded-xl border border-orange-100 card-hover">
                <div className="flex items-center mb-4">
                  <Image 
                    src="/emma-avatar.jpg" 
                    alt="Emma, UvA student" 
                    width={60} 
                    height={60} 
                    className="rounded-full border-2 border-primary"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">Emma</p>
                    <p className="text-sm text-gray-600">UvA student</p>
                  </div>
                </div>
                <p className="personal-quote mb-4">
                  Mijn ketting was kapot en ik had geen idee hoe ik het moest repareren. Via FixMijnBike vond ik Joost die het binnen 20 minuten had opgelost voor maar €10! Super persoonlijke service!
                </p>
                <div className="flex text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 card-hover">
                <div className="flex items-center mb-4">
                  <Image 
                    src="/tim-avatar.jpg" 
                    alt="Tim, TU Delft student" 
                    width={60} 
                    height={60} 
                    className="rounded-full border-2 border-secondary"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">Tim</p>
                    <p className="text-sm text-gray-600">TU Delft student</p>
                  </div>
                </div>
                <p className="personal-quote mb-4">
                  Als Fixer verdien ik nu ongeveer €150 per week extra. Perfect naast mijn studie en ik help er andere studenten mee. Het platform maakt het super makkelijk om in contact te komen!
                </p>
                <div className="flex text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              
              <div className="p-6 bg-pink-50 rounded-xl border border-pink-100 card-hover">
                <div className="flex items-center mb-4">
                  <Image 
                    src="/sophie-avatar.jpg" 
                    alt="Sophie, RUG student" 
                    width={60} 
                    height={60} 
                    className="rounded-full border-2 border-accent"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">Sophie</p>
                    <p className="text-sm text-gray-600">RUG student</p>
                  </div>
                </div>
                <p className="personal-quote mb-4">
                  Lekke band op zondag en alle winkels dicht. Dankzij FixMijnBike kon ik dezelfde dag nog naar college fietsen! Mijn fixer was super vriendelijk en legde alles goed uit.
                </p>
                <div className="flex text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fixers */}
      <section className="testimonial-section w-full">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-secondary">
              Onze top fixers
            </h2>
            <p className="text-gray-700">
              Maak kennis met enkele van onze beste student-fixers
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4 w-full">
              {[
                {
                  name: "Joost",
                  university: "UvA",
                  specialty: "Versnellingen",
                  image: "/fixer-joost.jpg",
                  rating: 4.9,
                  reviews: 42
                },
                {
                  name: "Lisa",
                  university: "VU",
                  specialty: "Remmen",
                  image: "/fixer-lisa.jpg",
                  rating: 4.8,
                  reviews: 36
                },
                {
                  name: "Martijn",
                  university: "TU Delft",
                  specialty: "Elektrische fietsen",
                  image: "/fixer-martijn.jpg",
                  rating: 4.9,
                  reviews: 51
                },
                {
                  name: "Anouk",
                  university: "RUG",
                  specialty: "Lekke banden",
                  image: "/fixer-anouk.jpg",
                  rating: 4.7,
                  reviews: 29
                }
              ].map((fixer, index) => (
                <div key={index} className="personal-card p-4 flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-3">
                    <Image 
                      src={fixer.image} 
                      alt={fixer.name} 
                      fill 
                      className="rounded-full object-cover border-2 border-primary"
                    />
                  </div>
                  <h3 className="font-bold text-lg">{fixer.name}</h3>
                  <p className="text-sm text-gray-600">{fixer.university}</p>
                  <p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1">
                    {fixer.specialty}
                  </p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1 font-medium">{fixer.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({fixer.reviews})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section w-full">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Klaar om je fiets te laten fixen?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              Of wil je extra geld verdienen als student-fixer?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 button-hover">
                <Link href="/repair">
                  <Bike className="mr-2 h-5 w-5" />
                  Fix Mijn Fiets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-black/80 hover:bg-white /white hover:bg-white/10 button-hover">
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