'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOBreadcrumbs } from '@/components/seo-breadcrumbs';
import { Wrench, CheckCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react';

export default function RemmenAfstellenPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <SEOBreadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Fietsremmen Afstellen", href: "/blog/fiets-remmen-afstellen", current: true }
      ]} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Fietsremmen Afstellen: Stap voor Stap</h1>
        <p className="text-lg text-muted-foreground">
          Piepende of slecht werkende remmen? Met deze handleiding stel je ze perfect af voor optimale veiligheid.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Tijdsduur</h3>
          </div>
          <p>20-40 minuten</p>
        </Card>
        
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Wrench className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Benodigdheden</h3>
          </div>
          <ul className="list-disc list-inside">
            <li>Inbussleutelset</li>
            <li>Steeksleutel</li>
            <li>Schroevendraaier</li>
          </ul>
        </Card>
        
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Moeilijkheid</h3>
          </div>
          <p>Gemiddeld</p>
        </Card>
      </div>

      <Tabs defaultValue="v-brakes" className="mb-12">
        <TabsList className="w-full">
          <TabsTrigger value="v-brakes" className="flex-1">V-Brakes</TabsTrigger>
          <TabsTrigger value="schijfremmen" className="flex-1">Schijfremmen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="v-brakes">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 1: Remblokken controleren</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Begin met het controleren van de remblokken:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Controleer de dikte van de remblokken</li>
                    <li>Kijk of ze gelijkmatig zijn afgesleten</li>
                    <li>Verwijder eventueel vuil of metaaldeeltjes</li>
                    <li>Vervang de blokken indien nodig</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-yellow-800">
                        Vervang remblokken altijd per paar, nooit maar één kant!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/brake-pads.jpg" 
                    alt="Remblokken controleren"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 2: Remblokken uitlijnen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/brake-alignment.jpg" 
                    alt="Remblokken uitlijnen"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Zorg dat de remblokken goed zijn uitgelijnd:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Draai de bevestigingsbout iets los</li>
                    <li>Plaats remblok parallel aan de velg</li>
                    <li>Zorg voor 1-2mm speling aan de bovenkant</li>
                    <li>Draai de bout weer vast</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Stap 3: Remkabel afstellen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Stel de spanning van de remkabel af:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Draai de kabelklem los</li>
                    <li>Trek de kabel strak</li>
                    <li>Zorg voor gelijke afstand tussen blokken</li>
                    <li>Draai de klem weer vast</li>
                  </ol>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/brake-cable.jpg" 
                    alt="Remkabel afstellen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </TabsContent>
        
        <TabsContent value="schijfremmen">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Schijfremmen afstellen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Voor het afstellen van schijfremmen:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Controleer of de schijf recht is</li>
                    <li>Centreer de remklauw boven de schijf</li>
                    <li>Stel de remblokken af op gelijke afstand</li>
                    <li>Test de werking en stel bij indien nodig</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-yellow-800">
                        Raak de remschijf nooit aan met je vingers, vet kan de remwerking verminderen!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/disc-brakes.jpg" 
                    alt="Schijfremmen afstellen"
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
            <h3 className="font-semibold mb-2">Onderhoud</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Controleer remmen maandelijks</li>
              <li>Houd remoppervlakken schoon</li>
              <li>Smeer bewegende delen licht</li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Probleemoplossing</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Piepende remmen? Controleer uitlijning</li>
              <li>Zachte remmen? Check kabelspanning</li>
              <li>Ongelijke remming? Stel blokken opnieuw af</li>
            </ul>
          </Card>
        </div>
      </section>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
        <Wrench className="h-12 w-12 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold mb-2">Toch liever een expert?</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Laat je remmen professioneel afstellen door een van onze ervaren student-fixers!
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/repair">
            Vind een Fixer
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}