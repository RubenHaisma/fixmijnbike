"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Euro, Clock, CheckCircle, ArrowRight } from "lucide-react";
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
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-blue-600">
                Word een BikeFixNL Fixer
              </h1>
              <p className="text-xl font-semibold text-orange-500">
                Verdien geld met je fietsreparatie vaardigheden
              </p>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                Help medestudenten met hun fietsreparaties en verdien €5-€15 per uur in je vrije tijd.
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 button-hover"
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
                Hoe het werkt
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
                In 3 simpele stappen aan de slag als Fixer
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
              <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border border-gray-200 card-hover">
                <div className="p-3 rounded-full bg-blue-100">
                  <Wrench className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">1. Maak je profiel aan</h3>
                <p className="text-gray-600 text-center">
                  Meld je aan als Fixer en geef aan welke reparaties je kunt uitvoeren
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border border-gray-200 card-hover">
                <div className="p-3 rounded-full bg-orange-100">
                  <Euro className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold">2. Stel je tarief in</h3>
                <p className="text-gray-600 text-center">
                  Bepaal zelf hoeveel je wilt verdienen per uur (€5-€15)
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border border-gray-200 card-hover">
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">3. Ontvang reparaties</h3>
                <p className="text-gray-600 text-center">
                  Krijg reparatieverzoeken van studenten in jouw buurt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="testimonial-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1529236183275-4fdcf2bc987e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Student repairing a bicycle"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
                Voordelen voor Fixers
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Euro className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Flexibel bijverdienen</h3>
                    <p className="text-gray-600">
                      Verdien €5-€15 per uur, plus €3 platformvergoeding per boeking
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Werk wanneer het jou uitkomt</h3>
                    <p className="text-gray-600">
                      Bepaal zelf je beschikbaarheid en hoeveel reparaties je wilt doen
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Bouw een reputatie op</h3>
                    <p className="text-gray-600">
                      Verzamel positieve beoordelingen en verdien badges voor je vaardigheden
                    </p>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleBecomeFixerClick} className="mt-4 bg-blue-600 hover:bg-blue-700 button-hover" disabled={isLoading}>
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
              Wat andere Fixers zeggen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full">
              <Card className="text-left card-hover">
                <CardContent className="pt-6">
                  <p className="italic text-gray-700 mb-4">
                    "Als student heb ik altijd al een passie gehad voor fietsen. Nu verdien ik €150-€200 per week extra door andere studenten te helpen met hun fietsreparaties!"
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-bold text-blue-600">T</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Tim</p>
                      <p className="text-sm text-muted-foreground">TU Delft student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="text-left card-hover">
                <CardContent className="pt-6">
                  <p className="italic text-gray-700 mb-4">
                    "Ik repareer al jaren fietsen als hobby. BikeFixNL heeft me geholpen om deze vaardigheid om te zetten in een leuke bijbaan die ik naast mijn studie kan doen."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-bold text-blue-600">L</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Lisa</p>
                      <p className="text-sm text-muted-foreground">UvA student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="text-left card-hover">
                <CardContent className="pt-6">
                  <p className="italic text-gray-700 mb-4">
                    "Het platform is super gebruiksvriendelijk. Ik kan mijn beschikbaarheid aanpassen wanneer ik wil en alleen reparaties aannemen die bij mijn vaardigheden passen."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-bold text-blue-600">M</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">Martijn</p>
                      <p className="text-sm text-muted-foreground">RUG student</p>
                    </div>
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-600">
              Veelgestelde vragen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
              <div className="border rounded-lg p-6 bg-white shadow-sm card-hover">
                <h3 className="text-lg font-bold mb-2">Hoe word ik betaald?</h3>
                <p className="text-gray-600">
                  Je ontvangt €3 platformvergoeding per voltooide reparatie direct op je BikeFixNL-saldo. De reparatiekosten ontvang je contant of via Tikkie van de student.
                </p>
              </div>
              
              <div className="border rounded-lg p-6 bg-white shadow-sm card-hover">
                <h3 className="text-lg font-bold mb-2">Heb ik gereedschap nodig?</h3>
                <p className="text-gray-600">
                  Ja, je hebt basisgereedschap nodig voor fietsreparaties. Je kunt aangeven welke reparaties je kunt uitvoeren op basis van het gereedschap dat je hebt.
                </p>
              </div>
              
              <div className="border rounded-lg p-6 bg-white shadow-sm card-hover">
                <h3 className="text-lg font-bold mb-2">Hoeveel kan ik verdienen?</h3>
                <p className="text-gray-600">
                  Afhankelijk van je uurtarief, vaardigheden en beschikbaarheid kun je tussen €50 en €200 per week verdienen. Onze meest actieve fixers verdienen gemiddeld €150 per week.
                </p>
              </div>
              
              <div className="border rounded-lg p-6 bg-white shadow-sm card-hover">
                <h3 className="text-lg font-bold mb-2">Moet ik belasting betalen?</h3>
                <p className="text-gray-600">
                  Als student kun je tot een bepaald bedrag bijverdienen zonder belasting te betalen. Raadpleeg de Belastingdienst voor de actuele regels en je persoonlijke situatie.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleBecomeFixerClick} 
              className="mt-8 bg-blue-600 hover:bg-blue-700 button-hover" 
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