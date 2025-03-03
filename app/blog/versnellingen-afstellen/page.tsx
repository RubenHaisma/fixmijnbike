'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEOBreadcrumbs } from '@/components/seo-breadcrumbs';
import { CheckCircle, AlertTriangle, Clock, ArrowRight, Wrench } from 'lucide-react';

export default function VersnellingenAfstellenPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <SEOBreadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "Versnellingen Afstellen", href: "/blog/versnellingen-afstellen", current: true }
      ]} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Versnellingen Afstellen: Een Complete Gids</h1>
        <p className="text-lg text-muted-foreground">
          Zorg voor soepel schakelen en een optimale fietservaring met goed afgestelde versnellingen!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold">Frequentie</h3>
          </div>
          <p>Controleer maandelijks<br />Stel bij na kettingvervanging</p>
        </Card>
        
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Wrench className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Gereedschap</h3>
          </div>
          <ul className="list-disc list-inside">
            <li>Schroevendraaier</li>
            <li>Inbussleutel</li>
            <li>Kabelspanner</li>
          </ul>
        </Card>
        
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Voordelen</h3>
          </div>
          <p>Vloeiend schakelen<br />Minder slijtage</p>
        </Card>
      </div>

      <Tabs defaultValue="afstellen" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="afstellen">Versnellingen Afstellen</TabsTrigger>
          <TabsTrigger value="problemen">Problemen Oplossen</TabsTrigger>
        </TabsList>

        <TabsContent value="afstellen">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">Hoe stel je versnellingen af?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Goed afgestelde versnellingen zorgen voor:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Vloeiend schakelen zonder haperen</li>
                    <li>Minder slijtage aan ketting en derailleur</li>
                    <li>Comfortabel fietsen op elk terrein</li>
                    <li>Minder kans op een aflopende ketting</li>
                  </ul>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="font-medium text-blue-800">Stappen:</p>
                    <ol className="list-decimal list-inside mt-2 text-blue-700">
                      <li>Zet de fiets in een standaard of hang hem op</li>
                      <li>Stel de limietschroeven (H en L) op de derailleur af</li>
                      <li>Pas de kabelspanning aan met de stelschroef</li>
                      <li>Test het schakelen en fine-tune</li>
                    </ol>
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
              <h2 className="text-2xl font-bold mb-6">Wanneer afstellen?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/gear-check.jpg" 
                    alt="Versnellingen controleren"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Stel je versnellingen af:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Na het vervangen van de ketting</li>
                    <li>Bij haperingen of overslaan</li>
                    <li>Als de derailleurkabel slap is</li>
                    <li>Maandelijks als routinecheck</li>
                  </ul>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <p className="text-green-800">
                        Tip: Draai de pedalen terwijl je schakelt om te testen!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="problemen">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">Veelvoorkomende problemen</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    Herken en los deze problemen op:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Ketting springt over: kabel te strak of versleten tandwielen</li>
                    <li>Moeilijk schakelen: vuile derailleur of te weinig spanning</li>
                    <li>Geluid bij schakelen: limietschroeven verkeerd ingesteld</li>
                    <li>Ketting loopt af: derailleur verbogen</li>
                  </ul>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <p className="text-yellow-800">
                        Controleer eerst de kettingspanning voordat je de derailleur afstelt!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/gear-troubleshoot.jpg" 
                    alt="Versnellingsproblemen oplossen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Finetunen van de derailleur</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/derailleur-finetune.jpg" 
                    alt="Derailleur finetunen"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Voor precisie schakelen:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Gebruik de stelschroef bij kleine haperingen</li>
                    <li>Reinig de derailleur regelmatig</li>
                    <li>Controleer uitlijning met het achterwiel</li>
                    <li>Test elke versnelling na aanpassing</li>
                  </ul>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="font-medium text-blue-800">Tip:</p>
                    <p className="text-blue-700">
                      Kleine draaien aan de stelschroef (1/4 slag) maken een groot verschil!
                    </p>
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
              <li>Smeer de derailleur lichtjes</li>
              <li>Check kabelspanning maandelijks</li>
              <li>Houd tandwielen schoon</li>
            </ul>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Snelle fixes</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Hapert? Draai de stelschroef iets</li>
              <li>Lawaai? Check limietschroeven</li>
              <li>Versleten? Vervang ketting eerst</li>
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
        <h2 className="text-2xl font-bold mb-2">Hulp nodig?</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Onze student-fixers stellen je versnellingen perfect af, snel en betaalbaar!
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