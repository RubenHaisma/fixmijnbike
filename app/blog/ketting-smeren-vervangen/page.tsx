'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOBreadcrumbs } from '@/components/seo-breadcrumbs';
import { CheckCircle, AlertTriangle, Clock, ArrowRight, Wrench } from 'lucide-react';

export default function KettingOnderhoudPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <SEOBreadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Ketting Smeren en Vervangen", href: "/blog/ketting-smeren-en-vervangen", current: true }
      ]} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Ketting Smeren en Vervangen: Alles Wat Je Moet Weten</h1>
        <p className="text-lg text-muted-foreground">
          Een goed onderhouden ketting is essentieel voor soepel fietsen. Leer hoe je hem smeert en vervangt!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Frequentie</h3>
          </div>
          <p>Smeer elke 200-300 km<br />Vervang na 3000-5000 km</p>
        </Card>
        
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Wrench className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Gereedschap</h3>
          </div>
          <ul className="list-disc list-inside">
            <li>Kettingreiniger</li>
            <li>Smeermiddel</li>
            <li>Kettingpons</li>
          </ul>
        </Card>
        
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Voordelen</h3>
          </div>
          <p>Soepel schakelen<br />Langere levensduur</p>
        </Card>
      </div>

      <Tabs defaultValue="smeren" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="smeren">Ketting Smeren</TabsTrigger>
          <TabsTrigger value="vervangen">Ketting Vervangen</TabsTrigger>
        </TabsList>

        <TabsContent value="smeren">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">Hoe smeer je een ketting?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Een goed gesmeerde ketting zorgt voor:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Soepel schakelen</li>
                    <li>Minder slijtage</li>
                    <li>Efficiënter fietsen</li>
                    <li>Minder geluid</li>
                  </ul>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="font-medium text-blue-800">Stappen:</p>
                    <ol className="list-decimal list-inside mt-2 text-blue-700">
                      <li>Reinig de ketting met een doek of kettingreiniger</li>
                      <li>Breng druppelsgewijs smeermiddel aan</li>
                      <li>Draai de pedalen om het te verdelen</li>
                      <li>Veeg overtollig olie af</li>
                    </ol>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/chain-lubrication.jpg" 
                    alt="Ketting smeren"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Wanneer smeren?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/chain-check.jpg" 
                    alt="Ketting controleren"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Smeer je ketting:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Na 200-300 km fietsen</li>
                    <li>Na een natte rit</li>
                    <li>Bij piepende geluiden</li>
                    <li>Als hij droog aanvoelt</li>
                  </ul>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-yellow-800">
                        Gebruik niet te veel olie, dit trekt vuil aan!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="vervangen">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">Wanneer een ketting vervangen?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Vervang je ketting als:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>De ketting is uitgerekt (meet met een kettingmeter)</li>
                    <li>Schakelen niet meer soepel gaat</li>
                    <li>Er zichtbare roest of schade is</li>
                    <li>Je 3000-5000 km hebt gefietst</li>
                  </ul>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <p className="text-green-800">
                        Tip: Vervang tegelijk je cassette bij extreme slijtage!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/chain-wear.jpg" 
                    alt="Versleten ketting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Hoe vervang je een ketting?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/chain-replacement.jpg" 
                    alt="Nieuwe ketting monteren"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Volg deze stappen voor het monteren:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Meet de oude ketting voor juiste lengte</li>
                    <li>Knip de nieuwe ketting op maat</li>
                    <li>Plaats de ketting om de tandwielen</li>
                    <li>Verbind de uiteinden met een kettingschakel</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-yellow-800">
                        Controleer of de verbindingsschakel goed vastzit voordat je gaat fietsen!
                      </p>
                    </div>
                  </div>
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
              <li>Smeer elke 200-300 km</li>
              <li>Controleer spanning regelmatig</li>
              <li>Houd ketting schoon en droog</li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Veel voorkomende problemen</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Piepende ketting? Direct smeren</li>
              <li>Springt over? Check tandwielen</li>
              <li>Roest? Grondig reinigen of vervangen</li>
            </ul>
          </Card>
        </div>
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
      >
        <Wrench className="h-12 w-12 mx-auto mb-4 text-green-600" />
        <h2 className="text-2xl font-bold mb-2">Liever een professional?</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Onze student-fixers hebben alle tools en expertise om je ketting perfect te onderhouden!
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
          <Link href="/repair">
            Boek een Fixer
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}