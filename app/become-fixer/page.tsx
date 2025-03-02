"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Euro, Clock, CheckCircle, ArrowRight, Star } from "lucide-react";
import Image from "next/image";

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
      // If user is already logged in, update their role to FIXER
      const response = await fetch("/api/users/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "FIXER" }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update role");
      }
      
      // Update the session
      await update({
        ...session,
        user: {
          ...session?.user,
          role: "FIXER",
        },
      });
      
      // Redirect to fixer onboarding
      router.push("/onboarding/fixer");
    } catch (error) {
      console.error("Error becoming a fixer:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-secondary">
                Word een FixMijnBike Fixer
              </h1>
              <p className="text-xl font-semibold text-primary">
                Verdien geld met je fietsreparatie vaardigheden
              </p>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                Help medestudenten met hun fietsreparaties en verdien €5-€15 per uur in je vrije tijd.
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 button-hover"
              onClick={handleBecomeFixerClick}
              disabled={isLoading}
            >
              <Wrench className="mr-2 h-5 w-5" />
              {isLoading ? "Bezig..." : "Word nu een Fixer"}
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="feature-section">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-secondary">
                Hoe het werkt
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
                In 3 simpele stappen aan de slag als Fixer
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl border border-blue-200 bg-white shadow-sm card-hover">
                <div className="p-3 rounded-full bg-blue-100">
                  <Wrench className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">1. Maak je profiel aan</h3>
                <p className="text-gray-600 text-center">
                  Meld je aan als Fixer en geef aan welke reparaties je kunt uitvoeren
                </p>
                <Image 
                  src="/fixer-step1.jpg" 
                  alt="Maak je profiel aan" 
                  width={250} 
                  height={150} 
                  className="rounded-lg mt-2 object-cover"
                />
              </div>
              
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl border border-orange-200 bg-white shadow-sm card-hover">
                <div className="p-3 rounded-full bg-orange-100">
                  <Euro className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">2. Stel je tarief in</h3>
                <p className="text-gray-600 text-center">
                  Bepaal zelf hoeveel je wilt verdienen per uur (€5-€15)
                </p>
                <Image 
                  src="/fixer-step2.jpg" 
                  alt="Stel je tarief in" 
                  width={250} 
                  height={150} 
                  className="rounded-lg mt-2 object-cover"
                />
              </div>
              
              <div className="flex flex-col items-center space-y-4 p-6 rounded-xl border border-pink-200 bg-white shadow-sm card-hover">
                <div className="p-3 rounded-full bg-pink-100">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold">3. Ontvang reparaties</h3>
                <p className="text-gray-600 text-center">
                  Krijg reparatieverzoeken van studenten in jouw buurt
                </p>
                <Image 
                  src="/fixer-step3.jpg" 
                  alt="Ontvang reparaties" 
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
      <section className="testimonial-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/student-repairing-bike.jpg"
                alt="Student repairing a bicycle"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-secondary">
                Voordelen voor Fixers
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Euro className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Flexibel bijverdienen</h3>
                    <p className="text-gray-600">
                      Verdien €5-€15 per uur, plus €3 platformvergoeding per boeking
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Werk wanneer het jou uitkomt</h3>
                    <p className="text-gray-600">
                      Bepaal zelf je beschikbaarheid en hoeveel reparaties je wilt doen
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Bouw een reputatie op</h3>
                    <p className="text-gray-600">
                      Verzamel positieve beoordelingen en verdien badges voor je vaardigheden
                    </p>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleBecomeFixerClick} className="mt-4 bg-secondary hover:bg-secondary/90 button-hover" disabled={isLoading}>
                {isLoading ? "Bezig..." : "Word nu een Fixer"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="feature-section">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-secondary">
              Wat andere Fixers zeggen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
              <Card className="text-left card-hover rounded-xl border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Image 
                      src="/testimonial-tim.jpg" 
                      alt="Tim" 
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
                    &quot;Als student heb ik altijd al een passie gehad voor fietsen. Nu verdien ik €150-€200 per week extra door andere studenten te helpen met hun fietsreparaties!&quot;
                  </p>
                  <div className="flex text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="text-left card-hover rounded-xl border-orange-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Image 
                      src="/testimonial-lisa.jpg" 
                      alt="Lisa" 
                      width={60} 
                      height={60} 
                      className="rounded-full border-2 border-primary"
                    />
                    <div className="ml-3">
                      <p className="font-semibold">Lisa</p>
                      <p className="text-sm text-gray-600">UvA student</p>
                    </div>
                  </div>
                  <p className="personal-quote mb-4">
                    &quot;Ik repareer al jaren fietsen als hobby. FixMijnBike heeft me geholpen om deze vaardigheid om te zetten in een leuke bijbaan die ik naast mijn studie kan doen.&quot;
                  </p>
                  <div className="flex text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="text-left card-hover rounded-xl border-pink-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Image 
                      src="/testimonial-martijn.jpg" 
                      alt="Martijn" 
                      width={60} 
                      height={60} 
                      className="rounded-full border-2 border-accent"
                    />
                    <div className="ml-3">
                      <p className="font-semibold">Martijn</p>
                      <p className="text-sm text-gray-600">RUG student</p>
                    </div>
                  </div>
                  <p className="personal-quote mb-4">
                    &quot;Het platform is super gebruiksvriendelijk. Ik kan mijn beschikbaarheid aanpassen wanneer ik wil en alleen reparaties aannemen die bij mijn vaardigheden passen.&quot;
                  </p>
                  <div className="flex text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="testimonial-section">
        <div className="container">
          <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-secondary">
              Veelgestelde vragen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
              <div className="border rounded-xl p-6 bg-white shadow-sm card-hover">
                <h3 className="text-lg font-bold mb-2">Hoe word ik betaald?</h3>
                <p className="text-gray-600">
                  Je ontvangt €3 platformvergoeding per voltooide reparatie direct op je FixMijnBike-saldo. De reparatiekosten ontvang je contant of via Tikkie van de student.
                </p>
              </div>
              
              <div className="border rounded-xl p-6 bg-white shadow-sm card-hover">
                <h3 className="text-lg font-bold mb-2">Heb ik gereedschap nodig?</h3>
                <p className="text-gray-600">
                  Ja, je hebt basisgereedschap nodig voor fietsreparaties. Je kunt aangeven welke reparaties je kunt uitvoeren op basis van het gereedschap dat je hebt.
                </p>
              </div>
              
              <div className="border rounded-xl p-6 bg-white shadow-sm card-hover">
                <h3 className="text-lg font-bold mb-2">Hoeveel kan ik verdienen?</h3>
                <p className="text-gray-600">
                  Afhankelijk van je uurtarief, vaardigheden en beschikbaarheid kun je tussen €50 en €200 per week verdienen. Onze meest actieve fixers verdienen gemiddeld €150 per week.
                </p>
              </div>
              
              <div className="border rounded-xl p-6 bg-white shadow-sm card-hover">
                <h3 className="text-lg font-bold mb-2">Moet ik belasting betalen?</h3>
                <p className="text-gray-600">
                  Als student kun je tot een bepaald bedrag bijverdienen zonder belasting te betalen. Raadpleeg de Belastingdienst voor de actuele regels en je persoonlijke situatie.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleBecomeFixerClick} 
              className="mt-8 bg-secondary hover:bg-secondary/90 button-hover" 
              size="lg"
              disabled={isLoading}
            >
              <Wrench className="mr-2 h-5 w-5" />
              {isLoading ? "Bezig..." : "Word nu een Fixer"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}