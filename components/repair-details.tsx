"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bicycle, CheckCircle, XCircle, AlertTriangle, Phone, MapPin, Euro, Clock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

type RepairDetailsProps = {
  repair: any;
  userRole: string;
  userId: string;
};

export function RepairDetails({ repair, userRole, userId }: RepairDetailsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const isRider = userId === repair.riderId;
  const isFixer = userId === repair.fixerId;
  
  async function handlePayment() {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/payments/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repairId: repair.id,
        }),
      });
      
      const session = await response.json();
      
      if (!response.ok) {
        throw new Error(session.error || "Er is een fout opgetreden");
      }
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (error) {
        throw new Error(error.message || "Er is een fout opgetreden");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function markAsCompleted() {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/repairs/${repair.id}/complete`, {
        method: "PUT",
      });
      
      if (!response.ok) {
        throw new Error("Er is een fout opgetreden");
      }
      
      router.refresh();
    } catch (error) {
      console.error("Error marking as completed:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function cancelRepair() {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/repairs/${repair.id}/cancel`, {
        method: "PUT",
      });
      
      if (!response.ok) {
        throw new Error("Er is een fout opgetreden");
      }
      
      router.refresh();
    } catch (error) {
      console.error("Error cancelling repair:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  function getStatusBadge(status: string) {
    switch (status) {
      case "PENDING":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Wachtend</Badge>;
      case "MATCHED":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Gematcht</Badge>;
      case "BOOKED":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Geboekt</Badge>;
      case "COMPLETED":
        return <Badge variant="outline" className="bg-green-500 text-white hover:bg-green-500">Voltooid</Badge>;
      case "CANCELLED":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Geannuleerd</Badge>;
      default:
        return <Badge variant="outline">Onbekend</Badge>;
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
  
  return (
    <div className="container max-w-3xl py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reparatie details</h1>
            <p className="text-muted-foreground">
              {issueTypes[repair.issueType] || repair.issueType}
            </p>
          </div>
          {getStatusBadge(repair.status)}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Reparatie informatie</CardTitle>
            <CardDescription>
              Aangevraagd op {formatDate(repair.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Probleem</h3>
                <p>{issueTypes[repair.issueType] || repair.issueType}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Status</h3>
                <p>{getStatusBadge(repair.status)}</p>
              </div>
              
              {repair.description && (
                <div className="col-span-2">
                  <h3 className="font-medium">Beschrijving</h3>
                  <p>{repair.description}</p>
                </div>
              )}
              
              <div>
                <h3 className="font-medium">Locatie</h3>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  {repair.postalCode}
                </p>
              </div>
              
              {repair.bookingTime && (
                <div>
                  <h3 className="font-medium">Afspraak</h3>
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    {formatDate(repair.bookingTime)}
                  </p>
                </div>
              )}
            </div>
            
            {repair.imageUrl && (
              <div>
                <h3 className="font-medium mb-2">Foto</h3>
                <div className="rounded-md overflow-hidden border">
                  <img 
                    src={repair.imageUrl} 
                    alt="Bike issue" 
                    className="w-full h-auto max-h-64 object-cover"
                  />
                </div>
              </div>
            )}
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Kosten</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Platformkosten:</span>
                  <span>€{repair.platformFee.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Reparatiekosten:</span>
                  <span>€{(repair.repairCost || 0).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-medium pt-1 border-t">
                  <span>Totaal:</span>
                  <span>€{((repair.platformFee || 4) + (repair.repairCost || 0)).toFixed(2)}</span>
                </div>
                
                {repair.status === "BOOKED" && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Platformkosten zijn betaald. Reparatiekosten worden direct aan de fixer betaald.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {(isRider || isFixer || userRole === "ADMIN") && (
          <>
            {repair.fixer && (
              <Card>
                <CardHeader>
                  <CardTitle>Fixer informatie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Naam</h3>
                      <p>{repair.fixer.name}</p>
                    </div>
                    
                    {(isRider || userRole === "ADMIN") && repair.status === "BOOKED" && (
                      <div>
                        <h3 className="font-medium">Telefoonnummer</h3>
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                          {repair.fixer.phoneNumber}
                        </p>
                      </div>
                    )}
                    
                    {repair.fixer.hourlyRate && (
                      <div>
                        <h3 className="font-medium">Uurtarief</h3>
                        <p className="flex items-center">
                          <Euro className="h-4 w-4 mr-1 text-muted-foreground" />
                          €{repair.fixer.hourlyRate.toFixed(2)}/uur
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {repair.rider && (isFixer || userRole === "ADMIN") && (
              <Card>
                <CardHeader>
                  <CardTitle>Student informatie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Naam</h3>
                      <p>{repair.rider.name}</p>
                    </div>
                    
                    {repair.status === "BOOKED" && (
                      <div>
                        <h3 className="font-medium">Telefoonnummer</h3>
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                          {repair.rider.phoneNumber}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium">Locatie</h3>
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {repair.rider.postalCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/dashboard">
              Terug naar dashboard
            </Link>
          </Button>
          
          {isRider && repair.status === "MATCHED" && (
            <Button 
              onClick={handlePayment} 
              disabled={isLoading}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              {isLoading ? "Bezig..." : "Nu boeken (€4)"}
            </Button>
          )}
          
          {isFixer && repair.status === "BOOKED" && (
            <Button 
              onClick={markAsCompleted} 
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {isLoading ? "Bezig..." : "Markeer als voltooid"}
            </Button>
          )}
          
          {(isRider || isFixer) && ["PENDING", "MATCHED", "BOOKED"].includes(repair.status) && (
            <Button 
              onClick={cancelRepair} 
              disabled={isLoading}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="mr-2 h-4 w-4" />
              {isLoading ? "Bezig..." : "Annuleren"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}