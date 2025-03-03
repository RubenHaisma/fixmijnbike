'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOBreadcrumbs } from '@/components/seo-breadcrumbs';
import { CheckCircle, AlertTriangle, Clock, ArrowRight, Wrench, Calendar } from 'lucide-react';

export default function FietsOnderhoudPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <SEOBreadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Fiets Onderhoud Tips", href: "/blog/fiets-onderhoud-tips", current: true }
      ]} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">10 Essentiële Fiets Onderhoudstips</h1>
        <p className="text-lg text-muted-foreground">
          Voorkom problemen met deze belangrijke onderhoudstips. Een goed onderhouden fiets gaat jaren langer mee!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Frequentie</h3>
          </div>
          <p>Maandelijkse check<br />Jaarlijkse grote beurt</p>
        </Card>
        
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Wrench className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Basis gereedschap</h3>
          </div>
          <ul className="list-disc list-inside">
            <li>Inbussleutelset</li>
            <li>Fietspomp</li>
            <li>Smeermiddelen</li>
          </ul>
        </Card>
        
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Beste moment</h3>
          </div>
          <p>Voor het seizoen<br />Na lange regenperiode</p>
        </Card>
      </div>

      <div className="space-y-8 mb-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">1. Bandenspanning controleren</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="mb-4">
                De juiste bandenspanning is essentieel voor:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Optimaal rijcomfort</li>
                <li>Minder kans op lekke banden</li>
                <li>Betere grip op de weg</li>
                <li>Langere levensduur van je banden</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="font-medium text-blue-800">Aanbevolen druk:</p>
                <ul className="list-disc list-inside mt-2 text-blue-700">
                  <li>Stadsfiets: 3.5 - 4.0 bar</li>
                  <li>Racefiets: 6.0 - 8.0 bar</li>
                  <li>MTB: 2.0 - 2.5 bar</li>
                </ul>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/tire-pressure.jpg" 
                alt="Bandenspanning controleren"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">2. Ketting onderhouden</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/chain-maintenance.jpg" 
                alt="Ketting onderhoud"
                fill
                className="object-cover"
              />
            </div>
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
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <p className="text-yellow-800">
                    Gebruik niet te veel olie! Dit trekt alleen maar vuil aan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">3. Remmen controleren</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="mb-4">
                Controleer regelmatig:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Remblokken op slijtage</li>
                <li>Remkabels op spanning</li>
                <li>Remhendels op soepelheid</li>
                <li>Remoppervlakken op vuil</li>
              </ul>
              <Button asChild className="mt-4">
                <Link href="/blog/fiets-remmen-afstellen">
                  Lees meer over remmen afstellen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/brake-check.jpg" 
                alt="Remmen controleren"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">4. Bouten en moeren controleren</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/bolt-check.jpg" 
                alt="Bouten controleren"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4">
                Let extra op deze onderdelen:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Stuurpen en zadel</li>
                <li>Wielmoeren</li>
                <li>Trapas en pedalen</li>
                <li>Rembevestiging</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <p className="text-yellow-800">
                    Draai bouten niet te strak aan, dit kan schade veroorzaken!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">5. Versnellingen afstellen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="mb-4">
                Goed afgestelde versnellingen zorgen voor:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Vloeiend schakelen zonder haperen</li>
                <li>Minder slijtage aan derailleur en ketting</li>
                <li>Comfortabeler fietsen, vooral uphill</li>
                <li>Minder kans op een aflopende ketting</li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <p className="text-green-800">
                    Tip: Stel de spanning van de derailleurkabel bij met de stelschroef!
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/gear-adjustment.jpg" 
                alt="Versnellingen afstellen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">6. Frame schoonmaken</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/frame-cleaning.jpg" 
                alt="Frame schoonmaken"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4">
                Een schoon frame voorkomt:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Roestvorming</li>
                <li>Vuilophoping bij bewegende delen</li>
                <li>Schade aan lak</li>
                <li>Een onverzorgde uitstraling</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="font-medium text-blue-800">Benodigdheden:</p>
                <ul className="list-disc list-inside mt-2 text-blue-700">
                  <li>Emmer met lauwwarm water</li>
                  <li>Milde zeep</li>
                  <li>Zachte spons of doek</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">7. Spaken controleren</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="mb-4">
                Controleer je spaken op:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Losse of gebroken spaken</li>
                <li>Scheefstand van het wiel</li>
                <li>Gelijke spanning</li>
                <li>Vibraties tijdens het rijden</li>
              </ul>
              <Button asChild className="mt-4">
                <Link href="/blog/wiel-richten">
                  Lees meer over wielen richten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/spoke-check.jpg" 
                alt="Spaken controleren"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">8. Verlichting testen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/lights-check.jpg" 
                alt="Verlichting testen"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4">
                Goede verlichting is cruciaal voor:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Veiligheid in het donker</li>
                <li>Zichtbaarheid voor anderen</li>
                <li>Voldoen aan wettelijke eisen</li>
                <li>Betrouwbare ritten in slechte weersomstandigheden</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <p className="text-yellow-800">
                    Vervang batterijen of dynamo’s tijdig!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">9. Zadel en stuur afstellen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="mb-4">
                Een goed afgesteld zadel en stuur bieden:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Meer comfort tijdens lange ritten</li>
                <li>Beter krachtoverdracht</li>
                <li>Minder belasting op rug en knieën</li>
                <li>Optimale controle over de fiets</li>
              </ul>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <p className="text-green-800">
                    Zorg dat je knie licht gebogen is bij een volledig pedaalrondje.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/saddle-adjustment.jpg" 
                alt="Zadel afstellen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">10. Regelmatige inspectie plannen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image 
                src="/images/blog/bike-inspection.jpg" 
                alt="Fiets inspecteren"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4">
                Plan een routinecheck voor:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Het opsporen van kleine defecten</li>
                <li>Preventie van grote reparaties</li>
                <li>Een altijd betrouwbare fiets</li>
                <li>Gemoedsrust tijdens elke rit</li>
              </ul>
              <Button asChild className="mt-4">
                <Link href="/blog/fiets-onderhoudsschema">
                  Download een gratis onderhoudsschema
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Klaar om te fietsen?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Met deze tips blijft je fiets in topconditie. Regelmatig onderhoud bespaart je tijd, geld en frustratie!
        </p>
        <Button size="lg">
          Deel deze tips met vrienden
          <Wrench className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}