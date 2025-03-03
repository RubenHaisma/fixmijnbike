"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wrench, Euro, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";

type Repair = {
  id: string;
  rider: {
    name: string;
    phoneNumber: string;
  };
  issueType: string;
  description: string | null;
  imageUrl: string | null;
  updatedAt: string | null;
  status: string;
  postalCode: string;
  createdAt: string;
  bookingTime: string | null;
  platformFee: number;
  repairCost: number | null;
  isPaid: boolean;
};

const bikeSkills = [
  { id: "flat-tire", label: "Lekke band" },
  { id: "brakes", label: "Remmen" },
  { id: "chain", label: "Ketting" },
  { id: "gears", label: "Versnellingen" },
  { id: "wheel-alignment", label: "Wiel uitlijning" },
  { id: "lights", label: "Verlichting" },
  { id: "general-maintenance", label: "Algemeen onderhoud" },
];

export function FixerDashboard() {
  const { data: session } = useSession();
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    completedRepairs: 0,
    pendingPayouts: 0
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState(10);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [preferencesError, setPreferencesError] = useState<string | null>(null);
  const [preferencesSuccess, setPreferencesSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [repairsRes, userRes, statsRes] = await Promise.all([
          fetch("/api/repairs/fixer"),
          fetch("/api/users/me"),
          fetch("/api/users/fixer-stats")
        ]);
        
        if (repairsRes.ok && userRes.ok && statsRes.ok) {
          const repairsData = await repairsRes.json();
          const userData = await userRes.json();
          const statsData = await statsRes.json();
          
          setRepairs(repairsData);
          setIsAvailable(userData.isAvailable || false);
          setWalletBalance(userData.walletBalance || 0);
          setStats(statsData);
          setSkills(userData.skills || []);
          setHourlyRate(userData.hourlyRate || 10);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  async function toggleAvailability() {
    try {
      const newStatus = !isAvailable;
      setIsAvailable(newStatus);
      
      const response = await fetch("/api/users/availability", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAvailable: newStatus }),
      });
      
      if (!response.ok) {
        // Revert if failed
        setIsAvailable(isAvailable);
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
      setIsAvailable(isAvailable);
    }
  }

  async function savePreferences() {
    setIsSavingPreferences(true);
    setPreferencesError(null);
    setPreferencesSuccess(null);

    try {
      const response = await fetch("/api/users/fixer-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills,
          hourlyRate,
          isAvailable,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Er is een fout opgetreden bij het opslaan van je voorkeuren");
      }

      setPreferencesSuccess("Voorkeuren succesvol opgeslagen!");
    } catch (error: any) {
      setPreferencesError(error.message);
    } finally {
      setIsSavingPreferences(false);
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
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  async function requestPayout() {
    try {
      const response = await fetch("/api/payouts/request", {
        method: "POST",
      });
      
      if (response.ok) {
        // Update wallet balance
        setWalletBalance(0);
        setStats({
          ...stats,
          pendingPayouts: stats.pendingPayouts + walletBalance
        });
      }
    } catch (error) {
      console.error("Error requesting payout:", error);
    }
  }

  async function markAsCompleted(repairId: string) {
    try {
      const response = await fetch(`/api/repairs/${repairId}/complete`, {
        method: "PUT",
      });
      
      if (response.ok) {
        // Update repairs list
        setRepairs(repairs.map(repair => 
          repair.id === repairId 
            ? { ...repair, status: "COMPLETED" } 
            : repair
        ));
        
        // Update stats
        setStats({
          ...stats,
          completedRepairs: stats.completedRepairs + 1
        });
      }
    } catch (error) {
      console.error("Error marking repair as completed:", error);
    }
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
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Welkom, {session?.user?.name}</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div className="flex items-center space-x-2">
          <Switch 
            checked={isAvailable} 
            onCheckedChange={toggleAvailability} 
            id="availability"
          />
          <label htmlFor="availability" className="text-sm font-medium">
            {isAvailable 
              ? "Je bent beschikbaar voor reparaties" 
              : "Je bent momenteel niet beschikbaar"}
          </label>
        </div>
        
        {walletBalance > 0 && (
          <Button onClick={requestPayout} className="bg-blue-600 hover:bg-blue-700 button-hover">
            <Euro className="mr-2 h-4 w-4" />
            Uitbetaling aanvragen (€{walletBalance.toFixed(2)})
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Verdiensten</CardTitle>
            <CardDescription>Totaal verdiend</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">
                €{stats.totalEarnings.toFixed(2)}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              €{walletBalance.toFixed(2)} beschikbaar voor uitbetaling
            </p>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Reparaties</CardTitle>
            <CardDescription>Voltooide reparaties</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">
                {stats.completedRepairs}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              {repairs.filter(r => ["BOOKED", "MATCHED"].includes(r.status)).length} actieve reparaties
            </p>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Uitbetalingen</CardTitle>
            <CardDescription>In behan deling</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">
                €{stats.pendingPayouts.toFixed(2)}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Uitbetalingen worden binnen 3 werkdagen verwerkt
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Actieve reparaties</TabsTrigger>
          <TabsTrigger value="completed">Voltooide reparaties</TabsTrigger>
          <TabsTrigger value="preferences">Voorkeuren</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-60" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : repairs.filter(repair => 
            ["MATCHED", "BOOKED"].includes(repair.status)
          ).length === 0 ? (
            <Card>
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
                <Wrench className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">
                  Je hebt geen actieve reparaties.
                  {!isAvailable && (
                    <span className="block mt-2">
                      Zet je beschikbaarheid aan om reparaties te ontvangen.
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {repairs
                .filter(repair => ["MATCHED", "BOOKED"].includes(repair.status))
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(repair => (
                  <Card key={repair.id} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{issueTypes[repair.issueType] || repair.issueType}</CardTitle>
                          <CardDescription>
                            {repair.status === "MATCHED" 
                              ? `Gematcht op ${formatDate(repair.createdAt)}`
                              : `Geboekt voor ${formatDate(repair.bookingTime || repair.createdAt)}`}
                          </CardDescription>
                        </div>
                        {getStatusBadge(repair.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>
                          <strong>Student:</strong> {repair.rider.name}
                        </p>
                        
                        {repair.status === "BOOKED" && (
                          <p>
                            <strong>Telefoonnummer:</strong> {repair.rider.phoneNumber}
                          </p>
                        )}
                        
                        <p>
                          <strong>Postcode:</strong> {repair.postalCode}
                        </p>
                        
                        {repair.description && (
                          <p>
                            <strong>Beschrijving:</strong> {repair.description}
                          </p>
                        )}
                        
                        <p>
                          <strong>Reparatiekosten:</strong> €{repair.repairCost?.toFixed(2) || "?"}
                          <span className="text-xs text-muted-foreground ml-1">
                            (contant of Tikkie van student)
                          </span>
                        </p>
                        
                        <p>
                          <strong>Platform vergoeding:</strong> €3.00
                          <span className="text-xs text-muted-foreground ml-1">
                            (wordt toegevoegd aan je saldo)
                          </span>
                        </p>
                        
                        {repair.status === "MATCHED" && (
                          <div className="flex items-center text-yellow-600 mt-2">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Wachten op betaling van student...</span>
                          </div>
                        )}
                        
                        {repair.status === "BOOKED" && (
                          <div className="flex items-center text-green-600 mt-2">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span>Betaling ontvangen! Neem contact op met de student.</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/repair/${repair.id}`}>
                          Details
                        </Link>
                      </Button>
                      
                      {repair.status === "BOOKED" && (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 button-hover"
                          onClick={() => markAsCompleted(repair.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Markeer als voltooid
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-60" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : repairs.filter(repair => 
            ["COMPLETED", "CANCELLED"].includes(repair.status)
          ).length === 0 ? (
            <Card>
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">
                  Je hebt nog geen voltooide reparaties.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {repairs
                .filter(repair => ["COMPLETED", "CANCELLED"].includes(repair.status))
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(repair => (
                  <Card key={repair.id} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{issueTypes[repair.issueType] || repair.issueType}</CardTitle>
                          <CardDescription>
                            {repair.status === "COMPLETED" 
                              ? `Voltooid op ${formatDate(repair.updatedAt || repair.createdAt)}`
                              : `Geannuleerd op ${formatDate(repair.updatedAt || repair.createdAt)}`}
                          </CardDescription>
                        </div>
                        {getStatusBadge(repair.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {repair.status === "COMPLETED" && (
                        <div className="space-y-2">
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span>Reparatie voltooid!</span>
                          </div>
                          <p>
                            <strong>Student:</strong> {repair.rider.name}
                          </p>
                          <p>
                            <strong>Verdiensten:</strong> €{((repair.repairCost || 0) + 3).toFixed(2)}
                            <span className="text-xs text-muted-foreground ml-1">
                              (€3 platform + €{(repair.repairCost || 0).toFixed(2)} reparatie)
                            </span>
                          </p>
                        </div>
                      )}
                      
                      {repair.status === "CANCELLED" && (
                        <div className="flex items-center text-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          <span>Deze reparatie is geannuleerd</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/repair/${repair.id}`}>
                          Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Fixer voorkeuren</CardTitle>
              <CardDescription>
                Beheer je vaardigheden, uurtarief en beschikbaarheid
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {preferencesError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{preferencesError}</AlertDescription>
                </Alert>
              )}
              
              {preferencesSuccess && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{preferencesSuccess}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Fietsreparatie vaardigheden</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {bikeSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-start space-x-3 space-y-0 rounded-md border p-4"
                      >
                        <Checkbox
                          checked={skills.includes(skill.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSkills([...skills, skill.id]);
                            } else {
                              setSkills(skills.filter(s => s !== skill.id));
                            }
                          }}
                        />
                        <label className="font-normal cursor-pointer">
                          {skill.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Uurtarief (€)</h3>
                  <div className="space-y-4">
                    <Slider
                      min={5}
                      max={15}
                      step={1}
                      value={[hourlyRate]}
                      onValueChange={(value) => setHourlyRate(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between">
                      <span>€5</span>
                      <span className="font-bold text-blue-600">€{hourlyRate}</span>
                      <span>€15</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={isAvailable} 
                    onCheckedChange={toggleAvailability}
                  />
                  <label className="text-sm font-medium">
                    Beschikbaar voor reparaties
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button
                onClick={savePreferences}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSavingPreferences}
              >
                {isSavingPreferences ? "Bezig met opslaan..." : "Voorkeuren opslaan"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}