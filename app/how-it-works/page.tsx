import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Recycle as Bicycle, Wrench, ArrowRight, Star, Euro, Clock, CheckCircle, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-orange-500">
                Hoe BikeFixNL werkt
              </h1>
              <p className="text-xl font-semibold text-blue-600">
                Eenvoudig, betaalbaar en snel je fiets laten repareren
              </p>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                BikeFixNL verbindt studenten met fietsreparatie behoeften aan student "fixers" die extra geld willen verdienen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Riders */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="p-3 rounded-full bg-orange-100">
              <Bicycle className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-orange-500">
              Voor Riders
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
              Zo laat je je fiets repareren door een student-fixer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div className="flex flex-col items-center space-y-4 relative">
              <div className="p-4 rounded-full bg-orange-100 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">1</span>
                <Bicycle className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold">Beschrijf je probleem</h3>
              <p className="text-gray-600 text-center">
                Vertel ons wat er mis is met je fiets en upload een foto
              </p>
              
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-12 right-0 w-full h-4 transform translate-x-1/2">
                <div className="w-full h-0.5 bg-gray-200"></div>
                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 relative">
              <div className="p-4 rounded-full bg-orange-100 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">2</span>
                <MapPin className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold">Vind een Fixer</h3>
              <p className="text-gray-600 text-center">
                We matchen je met een beschikbare student-fixer in jouw buurt
              </p>
              
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-12 right-0 w-full h-4 transform translate-x-1/2">
                <div className="w-full h-0.5 bg-gray-200"></div>
                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 relative">
              <div className="p-4 rounded-full bg-orange-100 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">3</span>
                <Euro className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold">Betaal en boek</h3>
              <p className="text-gray-600 text-center">
                Betaal €4 platformkosten en plan een reparatie wanneer het jou uitkomt
              </p>
              
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-12 right-0 w-full h-4 transform translate-x-1/2">
                <div className="w-full h-0.5 bg-gray-200"></div>
                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-orange-100 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">4</span>
                <CheckCircle className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold">Fiets gerepareerd!</h3>
              <p className="text-gray-600 text-center">
                De fixer repareert je fiets en je betaalt alleen voor de reparatie
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/repair">
                <Bicycle className="mr-2 h-5 w-5" />
                Reparatie aanvragen
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Fixers */}
      <section className="w-full py-12 md:py-24 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="p-3 rounded-full bg-blue-100">
              <Wrench className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
              Voor Fixers
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
              Zo verdien je geld met je fietsreparatie vaardigheden
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div className="flex flex-col items-center space-y-4 relative">
              <div className="p-4 rounded-full bg-blue-100 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Maak je profiel aan</h3>
              <p className="text-gray-600 text-center">
                Meld je aan als Fixer en geef aan welke reparaties je kunt uitvoeren
              </p>
              
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-12 right-0 w-full h-4 transform translate-x-1/2">
                <div className="w-full h-0.5 bg-gray-200"></div>
                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 relative">
              <div className="p-4 rounded-full bg-blue-100 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                <Euro className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Stel je tarief in</h3>
              <p className="text-gray-600 text-center">
                Bepaal zelf hoeveel je wilt verdienen per uur (€5-€15)
              </p>
              
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-12 right-0 w-full h-4 transform translate-x-1/2">
                <div className="w-full h-0.5 bg-gray-200"></div>
                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4 relative">
              <div className="p-4 rounded-full bg-blue-100 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                <Bicycle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Ontvang reparaties</h3>
              <p className="text-gray-600 text-center">
                Krijg reparatieverzoeken van studenten in jouw buurt
              </p>
              
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-12 right-0 w-full h-4 transform translate-x-1/2">
                <div className="w-full h-0.5 bg-gray-200"></div>
                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-blue-100 relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">4</span>
                <Euro className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">Verdien geld</h3>
              <p className="text-gray-600 text-center">
                Ontvang €3 platformvergoeding plus je reparatietarief voor elke voltooide reparatie
              </p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/become-fixer">
                <Wrench className="mr-2 h-5 w-5" />
                Word een Fixer
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Transparante prijzen
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
              Geen verborgen kosten, alleen eerlijke prijzen voor iedereen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border rounded-lg p-6 bg-orange-50 border-orange-100">
              <div className="flex items-center mb-4">
                <Bicycle className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-2xl font-bold text-orange-500">Voor Riders</h3>
              </div>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-bold">€4 platformkosten</span>
                    <p className="text-sm text-gray-600">Eenmalige kosten per reparatie</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-bold">Reparatiekosten</span>
                    <p className="text-sm text-gray-600">Gebaseerd op het uurtarief van de fixer (€5-€15)</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-bold">Gratis eerste boeking</span>
                    <p className="text-sm text-gray-600">Voor studenten met een .nl e-mailadres</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-bold">Geen voorrijkosten</span>
                    <p className="text-sm text-gray-600">De fixer komt naar jou toe</p>
                  </div>
                </li>
              </ul>
              
              <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                <Link href="/repair">
                  Reparatie aanvragen
                </Link>
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 bg-blue-50 border-blue-100">
              <div className="flex items-center mb-4">
                <Wrench className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-blue-600">Voor Fixers</h3>
              </div>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-bold">€3 platformvergoeding</span>
                    <p className="text-sm text-gray-600">Voor elke voltooide reparatie</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-bold">Zelf je uurtarief bepalen</span>
                    <p className="text-sm text-gray-600">Stel je tarief in tussen €5 en €15 per uur</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-bold">Geen abonnementskosten</span>
                    <p className="text-sm text-gray-600">Alleen een kleine fee per voltooide reparatie</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <div>
                    <span className="font-bold">Gratis uitbetalingen</span>
                    <p className="text-sm text-gray-600">Geen kosten voor het uitbetalen van je saldo</p>
                  </div>
                </li>
              </ul>
              
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/become-fixer">
                  Word een Fixer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Veelgestelde vragen
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Hoe snel kan mijn fiets gerepareerd worden?</h3>
              <p className="text-gray-600">
                Dat hangt af van de beschikbaarheid van fixers in jouw buurt. Meestal kunnen we binnen 24-48 uur een fixer vinden die je kan helpen.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Wat als de reparatie niet lukt?</h3>
              <p className="text-gray-600">
                Als de fixer je fiets niet kan repareren, hoef je alleen de platformkosten te betalen. De reparatiekosten worden alleen in rekening gebracht als de reparatie succesvol is.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Hoe worden de reparatiekosten bepaald?</h3>
              <p className="text-gray-600">
                De reparatiekosten zijn gebaseerd op het uurtarief van de fixer (€5-€15) en de geschatte tijd die nodig is voor de reparatie. Je ziet de geschatte kosten voordat je boekt.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Kan ik een specifieke fixer kiezen?</h3>
              <p className="text-gray-600">
                Momenteel matchen we je automatisch met een beschikbare fixer in jouw buurt. In de toekomst zullen we de mogelijkheid toevoegen om zelf een fixer te kiezen.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Wat als ik mijn afspraak moet annuleren?</h3>
              <p className="text-gray-600">
                Je kunt je afspraak kosteloos annuleren tot 2 uur voor de geplande tijd. Daarna worden de platformkosten in rekening gebracht.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Zijn de fixers gekwalificeerd?</h3>
              <p className="text-gray-600">
                Alle fixers geven aan welke reparaties ze kunnen uitvoeren. Ze bouwen een reputatie op basis van beoordelingen, zodat je kunt zien hoe goed ze zijn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Klaar om te beginnen?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              Meld je vandaag nog aan en ervaar het gemak van BikeFixNL
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                <Link href="/repair">
                  <Bicycle className="mr-2 h-5 w-5" />
                  Repareer Mijn Fiets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-black/80 hover:bg-white/10">
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