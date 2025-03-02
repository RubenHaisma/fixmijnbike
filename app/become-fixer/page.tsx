"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Euro, Clock, CheckCircle, ArrowRight, Star, Bike } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ServiceSchema } from "@/components/structured-data";

export default function BecomeFixerPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handleBecomeFixerClick() {
    if (!session) {
      router.push("/signup?role=FIXER");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/users/role", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "FIXER" }),
      });
      
      if (!response.ok) throw new Error("Failed to update role");
      
      await update({
        ...session,
        user: { ...session?.user, role: "FIXER" },
      });
      
      router.push("/onboarding/fixer");
    } catch (error) {
      console.error("Error becoming a fixer:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center w-full bg-gray-50">
      {/* Structured Data */}
      <ServiceSchema
        name="Verdien als Fixer bij FixMijnBike"
        description="Verdien geld met je fietsreparatievaardigheden. Help medestudenten met hun fietsreparaties en verdien €5-€15 per uur in je vrije tijd."
        provider={{
          name: "FixMijnBike",
          url: "https://fixmijnbike.nl"
        }}
        serviceArea={[
          { name: "Amsterdam", type: "City" },
          { name: "Utrecht", type: "City" },
          { name: "Rotterdam", type: "City" },
          { name: "Groningen", type: "City" },
          { name: "Nederland", type: "Country" }
        ]}
        offers={[
          { price: "3.00", priceCurrency: "EUR", description: "Platformvergoeding per reparatie" },
          { price: "5.00-15.00", priceCurrency: "EUR", description: "Uurtarief voor reparaties" }
        ]}
      />
      
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 via-orange-50 to-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-6 max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-secondary">
              Word een FixMijnBike Fixer
            </h1>
            <p className="text-xl font-semibold text-primary">
              Verdien geld met je fietsreparatievaardigheden
            </p>
            <p className="max-w-[700px] text-gray-700 md:text-lg">
              Help medestudenten met hun fietsreparaties en verdien €5-€15 per uur in je vrije tijd.
            </p>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105"
              onClick={handleBecomeFixerClick}
              disabled={isLoading}
            >
              <Wrench className="mr-2 h-5 w-5" />
              {isLoading ? "Bezig..." : "Word nu een Fixer"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Hoe het werkt
            </h2>
            <p className="max-w-[700px] text-gray-700 md:text-lg">
              In 3 simpele stappen aan de slag als Fixer
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            {[
              { icon: Wrench, title: "Maak je profiel aan", desc: "Meld je aan als Fixer en geef aan welke reparaties je kunt uitvoeren", color: "blue" },
              { icon: Euro, title: "Stel je tarief in", desc: "Bepaal zelf hoeveel je wilt verdienen per uur (€5-€15)", color: "orange" },
              { icon: CheckCircle, title: "Ontvang reparaties", desc: "Krijg reparatieverzoeken van studenten in jouw buurt", color: "pink" },
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`flex flex-col items-center space-y-4 p-6 rounded-xl border-${step.color}-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className={`p-3 rounded-full bg-${step.color}-100 mb-4`}>
                  <step.icon className={`h-8 w-8 text-${step.color}-600`} />
                </div>
                <h3 className="text-xl font-bold">{index + 1}. {step.title}</h3>
                <p className="text-gray-600 text-center">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/images/bikefixing.jpg"
                alt="Student repairing a bicycle"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
                Voordelen voor Fixers
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Euro, title: "Flexibel bijverdienen", desc: "Verdien €5-€15 per uur, plus €3 platformvergoeding per boeking" },
                  { icon: Clock, title: "Werk wanneer het jou uitkomt", desc: "Bepaal zelf je beschikbaarheid en hoeveel reparaties je wilt doen" },
                  { icon: CheckCircle, title: "Bouw een reputatie op", desc: "Verzamel positieve beoordelingen en verdien badges voor je vaardigheden" },
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="flex items-start space-x-3"
                  >
                    <benefit.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button 
                onClick={handleBecomeFixerClick} 
                className="mt-4 bg-secondary hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "Bezig..." : "Word nu een Fixer"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Wat andere Fixers zeggen
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            {[
              { name: "Tim", uni: "TU Delft", quote: "Als student heb ik altijd al een passie gehad voor fietsen. Nu verdien ik €150-€200 per week extra!", img: "/images/tim.jpg", color: "blue" },
              { name: "Lisa", uni: "UvA", quote: "Ik repareer al jaren fietsen als hobby. FixMijnBike heeft me geholpen om dit om te zetten in een leuke bijbaan.", img: "/images/Lisa.jpg", color: "orange" },
              { name: "Martijn", uni: "RUG", quote: "Het platform is super gebruiksvriendelijk. Ik kan mijn beschikbaarheid aanpassen wanneer ik wil.", img: "/images/martijn.jpg", color: "pink" },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className={`text-left rounded-xl border-${testimonial.color}-100 hover:shadow-lg transition-shadow duration-300`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Image 
                        src={testimonial.img}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className={`rounded-full border-2 border-${testimonial.color}-500`}
                      />
                      <div className="ml-3">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.uni} student</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex text-yellow-500">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Veelgestelde vragen
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
            {[
              { q: "Hoe word ik betaald?", a: "Je ontvangt €3 platformvergoeding per voltooide reparatie op je FixMijnBike-saldo. Reparatiekosten ontvang je contant of via Tikkie." },
              { q: "Heb ik gereedschap nodig?", a: "Ja, je hebt basisgereedschap nodig. Geef aan welke reparaties je kunt doen met wat je hebt." },
              { q: "Hoeveel kan ik verdienen?", a: "Tussen €50 en €200 per week, afhankelijk van je tarief en beschikbaarheid. Topfixers verdienen gemiddeld €150." },
              { q: "Moet ik belasting betalen?", a: "Als student kun je tot een bepaald bedrag belastingvrij verdienen. Check de Belastingdienst voor details." },
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Button 
              onClick={handleBecomeFixerClick} 
              className="bg-secondary hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105" 
              size="lg"
              disabled={isLoading}
            >
              <Wrench className="mr-2 h-5 w-5" />
              {isLoading ? "Bezig..." : "Word nu een Fixer"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full py-12 bg-secondary text-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <Bike className="h-12 w-12" />
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Klaar om te beginnen?
            </h2>
            <p className="max-w-[700px] text-lg">
              Sluit je aan bij honderden studenten die al verdienen met FixMijnBike!
            </p>
            <Button 
              onClick={handleBecomeFixerClick} 
              className="bg-white text-secondary hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Bezig..." : "Start nu"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}