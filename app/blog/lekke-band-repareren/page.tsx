'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOBreadcrumbs } from '@/components/seo-breadcrumbs';
import { Bike, CheckCircle, AlertTriangle, Clock, ArrowRight, Wrench } from 'lucide-react';

export default function LekkeBandPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <SEOBreadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Lekke Band Repareren", href: "/blog/lekke-band-repareren", current: true }
      ]} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Lekke Band Repareren: Complete Handleiding</h1>
        <p className="text-lg text-muted-foreground">
          Een lekke band is vervelend, maar met deze stap-voor-stap handleiding kun je het zelf oplossen!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Tijdsduur</h3>
          </div>
          <p>15-30 minuten</p>
        </Card>
        
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Wrench className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Benodigdheden</h3>
          </div>
          <ul className="list-disc list-inside">
            <li>Bandenlichters</li>
            <li>Fietspomp</li>
            <li>Plakset</li>
          </ul>
        </Card>
        
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Moeilijkheid</h3>
          </div>
          <p>Makkelijk</p>
        </Card>
      </div>

      <Tabs defaultValue="plakken" className="mb-12">
        <TabsList className="w-full">
          <TabsTrigger value="plakken" className="flex-1">Band plakken</TabsTrigger>
          <TabsTrigger value="vervangen" className="flex-1">Band vervangen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plakken">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 1: Band verwijderen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Begin met het verwijderen van het wiel. Gebruik bandenlichters om de band van de velg te halen:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Laat alle lucht uit de band lopen</li>
                    <li>Steek een bandenlichter tussen band en velg</li>
                    <li>Haak een tweede bandenlichter 10cm verder</li>
                    <li>Wrik de band voorzichtig over de velgrand</li>
                  </ol>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/tire-removal.jpg" 
                    alt="Band verwijderen met bandenlichters"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 2: Lek zoeken</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/find-leak.jpg" 
                    alt="Lek zoeken in fietsband"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Pomp de binnenband op en zoek het lek:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Pomp de band licht op</li>
                    <li>Luister naar ontsnappende lucht</li>
                    <li>Voel met je hand waar lucht ontsnapt</li>
                    <li>Gebruik water om belletjes te zien</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-yellow-800">
                        Controleer ook de buitenband op scherpe voorwerpen die het lek veroorzaakt hebben!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 3: Band plakken</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Nu je het lek gevonden hebt, kun je het plakken:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Markeer de plek van het lek</li>
                    <li>Schuur het oppervlak rond het lek</li>
                    <li>Breng solutie aan en laat drogen</li>
                    <li>Plak de pleister en druk stevig aan</li>
                  </ol>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/patch-tire.jpg" 
                    alt="Fietsband plakken"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
        
        <TabsContent value="vervangen">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Nieuwe binnenband installeren</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Als plakken niet lukt of de band te beschadigd is:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Koop een nieuwe binnenband met de juiste maat</li>
                    <li>Pomp deze licht op voor installatie</li>
                    <li>Plaats de band beginnend bij het ventiel</li>
                    <li>Werk rustig rond tot de band volledig in de velg zit</li>
                  </ol>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/new-tire.jpg" 
                    alt="Nieuwe binnenband installeren"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips & Tricks</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Preventie</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Controleer regelmatig de bandenspanning</li>
              <li>Verwijder scherpe voorwerpen uit je banden</li>
              <li>Vervang versleten banden op tijd</li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Handige extra&apos;s</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Neem een mini-pomp mee onderweg</li>
              <li>Zorg voor een reserve binnenband</li>
              <li>Bewaar je reparatieset op een vaste plek</li>
            </ul>
          </Card>
        </div>
      </section>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
        <Bike className="h-12 w-12 mx-auto mb-4 text-orange-600" />
        <h2 className="text-2xl font-bold mb-2">Hulp nodig?</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Kom je er niet uit of heb je geen tijd? Onze student-fixers helpen je graag!
        </p>
        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
          <Link href="/repair">
            Reparatie aanvragen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}