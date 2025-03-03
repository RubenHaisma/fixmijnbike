"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Phone, MapPin, Euro, Clock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FixerProfileCard } from "@/components/FixerProfileCard";

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
  const [error, setError] = useState<string | null>(null);
  const [showFixerProfile, setShowFixerProfile] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  
  const isRider = userId === repair.riderId;
  const isFixer = userId === repair.fixerId;
  
  async function handlePayment() {
    setIsLoading(true);
    setError(null);
    
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
      
      // If payment was processed with wallet balance
      if (session.success) {
        router.push(session.redirect);
        router.refresh();
        return;
      }
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (error) {
        throw new Error(error.message || "Er is een fout opgetreden");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setError(error.message || "Er is een fout opgetreden bij het verwerken van de betaling");
    } finally {
      setIsLoading(false);
    }
  }
  
  async function markAsCompleted() {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/repairs/${repair.id}/complete`, {
        method: "PUT",
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er is een fout opgetreden");
      }
      
      router.refresh();
    } catch (error: any) {
      console.error("Error marking as completed:", error);
      setError(error.message || "Er is een fout opgetreden bij het markeren als voltooid");
    } finally {
      setIsLoading(false);
    }
  }
  
  async function cancelRepair() {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/repairs/${repair.id}/cancel`, {
        method: "PUT",
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er is een fout opgetreden");
      }
      
      router.refresh();
    } catch (error: any) {
      console.error("Error cancelling repair:", error);
      setError(error.message || "Er is een fout opgetreden bij het annuleren");
    } finally {
      setIsLoading(false);
    }
  }
  
  async function acceptRepair() {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/repairs/${repair.id}/accept`, {
        method: "PUT",
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er is een fout opgetreden");
      }
      
      router.refresh();
    } catch (error: any) {
      console.error("Error accepting repair:", error);
      setError(error.message || "Er is een fout opgetreden bij het accepteren van de reparatie");
    } finally {
      setIsLoading(false);
    }
  }
  
  async function declineRepair() {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/repairs/${repair.id}/decline`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: declineReason }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er is een fout opgetreden");
      }
      
      setShowDeclineDialog(false);
      router.refresh();
    } catch (error: any) {
      console.error("Error declining repair:", error);
      setError(error.message || "Er is een fout opgetreden bij het weigeren van de reparatie");
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
      case "ACCEPTED":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Geaccepteerd</Badge>;
      case "DECLINED":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Geweigerd</Badge>;
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
        
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
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
              
              {repair.declineReason && (
                <div className="col-span-2">
                  <h3 className="font-medium">Reden voor weigering</h3>
                  <p className="text-red-600">{repair.declineReason}</p>
                </div>
              )}
            </div>
            
            {repair.imageUrl && (
              <div>
                <h3 className="font-medium mb-2">Foto</h3>
                <div className="rounded-md overflow-hidden border">
                  <Image
                    src={repair.imageUrl} 
                    alt="Bike issue" 
                    width={600}
                    height={400}
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
                  <div className="flex justify-between items-center">
                    <CardTitle>Fixer informatie</CardTitle>
                    {repair.fixer.fixerProfile && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowFixerProfile(true)}
                      >
                        Bekijk profiel
                      </Button>
                    )}
                  </div>
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
                          <a href={`tel:${repair.fixer.phoneNumber}`} className="hover:text-blue-600 transition-colors">
                            {repair.fixer.phoneNumber}
                          </a>
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
                          <a href={`tel:${repair.rider.phoneNumber}`} className="hover:text-blue-600 transition-colors">
                            {repair.rider.phoneNumber}
                          </a>
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
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Bezig...
                </span>
              ) : (
                <>
                  <Euro className="mr-2 h-4 w-4" />
                  Nu boeken (€4)
                </>
              )}
            </Button>
          )}
          
          {isRider && repair.status === "ACCEPTED" && (
            <Button 
              onClick={handlePayment} 
              disabled={isLoading}
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Bezig...
                </span>
              ) : (
                <>
                  <Euro className="mr-2 h-4 w-4" />
                  Nu boeken (€4)
                </>
              )}
            </Button>
          )}
          
          {isFixer && repair.status === "MATCHED" && (
            <>
              <Button 
                onClick={acceptRepair} 
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Bezig...
                  </span>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accepteren
                  </>
                )}
              </Button>
              
              <Button 
                onClick={() => setShowDeclineDialog(true)} 
                disabled={isLoading}
                variant="destructive"
                className="flex-1"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Bezig...
                  </span>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Weigeren
                  </>
                )}
              </Button>
            </>
          )}
          
          {isFixer && repair.status === "BOOKED" && (
            <Button 
              onClick={markAsCompleted} 
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Bezig...
                </span>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Markeer als voltooid
                </>
              )}
            </Button>
          )}
          
          {(isRider || isFixer) && ["PENDING", "MATCHED", "ACCEPTED", "BOOKED"].includes(repair.status) && (
            <Button 
              onClick={cancelRepair} 
              disabled={isLoading}
              variant="destructive"
              className="flex-1"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Bezig...
                </span>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" />
                  Annuleren
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}