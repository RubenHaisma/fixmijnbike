"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function BookRepairPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [repair, setRepair] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!session) {
          router.push("/login");
          return;
        }

        const [repairRes, userRes] = await Promise.all([
          fetch(`/api/repairs/${params.id}`),
          fetch("/api/users/me")
        ]);
        
        if (!repairRes.ok) {
          throw new Error("Reparatie niet gevonden");
        }
        
        const repairData = await repairRes.json();
        setRepair(repairData);
        
        if (repairData.status !== "MATCHED") {
          router.push(`/repair/${params.id}`);
          return;
        }
        
        if (repairData.riderId !== session.user.id) {
          router.push("/dashboard");
          return;
        }
        
        if (userRes.ok) {
          const userData = await userRes.json();
          setWalletBalance(userData.walletBalance || 0);
        }
      } catch (error) {
        console.error("Error fetching repair:", error);
        setError("Er is een fout opgetreden bij het ophalen van de reparatie");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [session, router, params.id]);

  async function handlePayment() {
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/payments/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repairId: params.id,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Er is een fout opgetreden");
      }
      
      // If payment was processed with wallet balance
      if (data.success) {
        router.push(data.redirect);
        return;
      }
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: data.id,
      });
      
      if (error) {
        throw new Error(error.message || "Er is een fout opgetreden");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setError(error.message || "Er is een fout opgetreden bij het verwerken van de betaling");
    } finally {
      setIsProcessing(false);
    }
  }

  function formatDate(dateString: string) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  const issueTypes: Record<string, string> = {
    "flat-tire": "Lekke band",
    "brakes": "Remmen",
    "chain": "Ketting",
    "gears": "Versnellingen",
    "wheel-alignment": "Wiel uitlijning",
    "lights": "Verlichting",
    "general-maintenance": "Algemeen onderhoud",
    "other": "Anders"
  };

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-12">
        <div className="flex flex-col space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Reparatie boeken</h1>
          <p className="text-muted-foreground">
            {repair && issueTypes[repair.issueType] || repair?.issueType}
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Reparatie details</CardTitle>
            <CardDescription>
              Controleer de details voordat je betaalt
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Probleem</h3>
                <p>{repair && issueTypes[repair.issueType] || repair?.issueType}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Locatie</h3>
                <p>{repair?.postalCode}</p>
              </div>
              
              {repair?.description && (
                <div className="col-span-2">
                  <h3 className="font-medium">Beschrijving</h3>
                  <p>{repair.description}</p>
                </div>
              )}
              
              <div>
                <h3 className="font-medium">Fixer</h3>
                <p>{repair?.fixer?.name}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Uurtarief</h3>
                <p>€{repair?.fixer?.hourlyRate?.toFixed(2) || "?"}/uur</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Kosten</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Platformkosten:</span>
                  <span>€{repair?.platformFee.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Reparatiekosten (schatting):</span>
                  <span>€{(repair?.repairCost || 0).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-medium pt-1 border-t">
                  <span>Totaal:</span>
                  <span>€{((repair?.platformFee || 4) + (repair?.repairCost || 0)).toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Je betaalt nu alleen de platformkosten (€{repair?.platformFee.toFixed(2)}). 
                  De reparatiekosten betaal je direct aan de fixer na de reparatie.
                </p>
              </div>
            </div>
            
            {walletBalance >= (repair?.platformFee || 4) && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Je hebt voldoende saldo (€{walletBalance.toFixed(2)}) om deze boeking te betalen met je wallet!
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto" 
              asChild
            >
              <Link href={`/repair/${params.id}`}>
                Terug
              </Link>
            </Button>
            
            <Button 
              onClick={handlePayment} 
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 button-hover"
              disabled={isProcessing}
            >
              {isProcessing ? (
                "Bezig met verwerken..."
              ) : walletBalance >= (repair?.platformFee || 4) ? (
                <>
                  <Euro className="mr-2 h-4 w-4" />
                  Betalen met wallet saldo
                </>
              ) : (
                <>
                  <Euro className="mr-2 h-4 w-4" />
                  Betalen (€{repair?.platformFee.toFixed(2)})
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}