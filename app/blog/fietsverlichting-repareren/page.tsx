'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOBreadcrumbs } from '@/components/seo-breadcrumbs';
import { Wrench, CheckCircle, AlertTriangle, Clock, ArrowRight, Lightbulb } from 'lucide-react';

export default function FietsverlichtingPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <SEOBreadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Fietsverlichting Repareren", href: "/blog/fietsverlichting-repareren", current: true }
      ]} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Fietsverlichting Repareren</h1>
        <p className="text-lg text-muted-foreground">
          Kapotte verlichting? Ontdek hoe je zelf je fietsverlichting kunt repareren of vervangen voor optimale veiligheid.
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
            <li>Schroevendraaier</li>
            <li>Nieuwe batterijen/lampjes</li>
            <li>Multimeter (optioneel)</li>
          </ul>
        </Card>
        
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Moeilijkheid</h3>
          </div>
          <p>Makkelijk tot gemiddeld</p>
        </Card>
      </div>

      <Tabs defaultValue="batterij" className="mb-12">
        <TabsList className="w-full">
          <TabsTrigger value="batterij" className="flex-1">Batterijverlichting</TabsTrigger>
          <TabsTrigger value="dynamo" className="flex-1">Dynamoverlichting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="batterij">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 1: Probleem identificeren</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Controleer eerst wat er mis is:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Test of de batterijen leeg zijn</li>
                    <li>Controleer de contactpunten</li>
                    <li>Kijk of het lampje kapot is</li>
                    <li>Check de bedrading</li>
                  </ol>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/bike-light-check.jpg" 
                    alt="Fietsverlichting controleren"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 2: Batterijen vervangen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/battery-replacement.jpg" 
                    alt="Batterijen vervangen"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Als de batterijen leeg zijn:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Open het batterijcompartiment</li>
                    <li>Verwijder oude batterijen</li>
                    <li>Reinig contactpunten</li>
                    <li>Plaats nieuwe batterijen correct</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-yellow-800">
                        Let op de + en - markering bij het plaatsen van nieuwe batterijen!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 3: Lampje vervangen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Bij een kapot lampje:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Demonteer de lamp voorzichtig</li>
                    <li>Noteer het type LED of lampje</li>
                    <li>Koop exact hetzelfde type</li>
                    <li>Monteer het nieuwe lampje</li>
                  </ol>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/led-replacement.jpg" 
                    alt="LED lampje vervangen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
        
        <TabsContent value="dynamo">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Dynamo problemen oplossen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Bij problemen met de dynamo:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Controleer de dynamo-positie</li>
                    <li>Reinig het contactwiel</li>
                    <li>Test de bedrading</li>
                    <li>Controleer de spanning</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-yellow-800">
                        Zorg dat de dynamo goed contact maakt met de band!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/dynamo-repair.jpg" 
                    alt="Dynamo reparatie"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Bedrading controleren</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/wiring-check.jpg" 
                    alt="Bedrading controleren"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Controleer de bedrading:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Volg de draden van dynamo naar lamp</li>
                    <li>Zoek naar beschadigingen</li>
                    <li>Controleer alle aansluitingen</li>
                    <li>Repareer of vervang indien nodig</li>
                  </ol>
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
            <h3 className="font-semibold mb-2">Preventief onderhoud</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Controleer verlichting regelmatig</li>
              <li>Houd contactpunten schoon</li>
              <li>Vervang batterijen op tijd</li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Veiligheid</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Zorg voor reservelampjes</li>
              <li>Test verlichting voor het donker</li>
              <li>Gebruik reflectoren als backup</li>
            </ul>
          </Card>
        </div>
      </section>

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
        <Lightbulb className="h-12 w-12 mx-auto mb-4 text-purple-600" />
        <h2 className="text-2xl font-bold mb-2">Kom je er niet uit?</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Onze student-fixers zorgen ervoor dat je weer veilig en goed verlicht op pad kunt!
        </p>
        <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
          <Link href="/repair">
            Reparatie aanvragen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}