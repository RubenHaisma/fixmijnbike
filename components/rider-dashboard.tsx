"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bike, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Repair = {
  updatedAt: string;
  id: string;
  issueType: string;
  status: string;
  createdAt: string;
  bookingTime: string | null;
  fixer: {
    name: string;
    phoneNumber: string;
  } | null;
  platformFee: number;
  repairCost: number | null;
  isPaid: boolean;
};

export function RiderDashboard() {
  const { data: session } = useSession();
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [repairsRes, userRes] = await Promise.all([
          fetch("/api/repairs/rider"),
          fetch("/api/users/me")
        ]);
        
        if (repairsRes.ok && userRes.ok) {
          const repairsData = await repairsRes.json();
          const userData = await userRes.json();
          
          setRepairs(repairsData);
          setWalletBalance(userData.walletBalance || 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

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

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Welkom, {session?.user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Saldo</CardTitle>
            <CardDescription>Je huidige tegoed</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">
                €{walletBalance.toFixed(2)}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              {walletBalance >= 4 
                ? "Je hebt genoeg saldo voor een gratis boeking!" 
                : "Verdien €4 door een vriend uit te nodigen"}
            </p>
          </CardFooter>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Reparaties</CardTitle>
            <CardDescription>Je fietsreparaties</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold">
                {repairs.length}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              {repairs.filter(r => r.status === "COMPLETED").length} voltooide reparaties
            </p>
          </CardFooter>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200 card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Nieuwe reparatie</CardTitle>
            <CardDescription>Laat je fiets repareren</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 button-hover">
              <Link href="/repair">
                <Bike className="mr-2 h-4 w-4" />
                Reparatie aanvragen
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Actieve reparaties</TabsTrigger>
          <TabsTrigger value="completed">Voltooide reparaties</TabsTrigger>
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
          ) : (
            <div className="space-y-4">
              {repairs.filter(repair => 
                ["PENDING", "MATCHED", "BOOKED"].includes(repair.status)
              ).length === 0 ? (
                <Card>
                  <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
                    <Bike className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">
                      Je hebt geen actieve reparaties. 
                      <br />
                      <Link href="/repair" className="text-orange-500 hover:underline">
                        Vraag een nieuwe reparatie aan
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              ) : (
                repairs
                  .filter(repair => ["PENDING", "MATCHED", "BOOKED"].includes(repair.status))
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map(repair => (
                    <Card key={repair.id} className="card-hover">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{repair.issueType}</CardTitle>
                            <CardDescription>
                              Aangevraagd op {formatDate(repair.createdAt)}
                            </CardDescription>
                          </div>
                          {getStatusBadge(repair.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {repair.status === "PENDING" && (
                          <div className="flex items-center text-yellow-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>We zoeken een geschikte fixer voor je...</span>
                          </div>
                        )}
                        
                        {repair.status === "MATCHED" && (
                          <div className="space-y-2">
                            <div className="flex items-center text-blue-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span>We hebben een fixer voor je gevonden!</span>
                            </div>
                            <p>
                              <strong>Fixer:</strong> {repair.fixer?.name}
                            </p>
                            <p>
                              <strong>Geschatte kosten:</strong> €{repair.repairCost?.toFixed(2) || "?"}
                            </p>
                            <Button asChild className="mt-2 bg-orange-500 hover:bg-orange-600 button-hover">
                              <Link href={`/repair/${repair.id}/book`}>
                                Nu boeken (€4)
                              </Link>
                            </Button>
                          </div>
                        )}
                        
                        {repair.status === "BOOKED" && (
                          <div className="space-y-2">
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span>Je reparatie is geboekt!</span>
                            </div>
                            <p>
                              <strong>Fixer:</strong> {repair.fixer?.name}
                            </p>
                            <p>
                              <strong>Telefoonnummer:</strong> {repair.fixer?.phoneNumber}
                            </p>
                            {repair.bookingTime && (
                              <p>
                                <strong>Afspraak:</strong> {formatDate(repair.bookingTime)}
                              </p>
                            )}
                            <p>
                              <strong>Reparatiekosten:</strong> €{repair.repairCost?.toFixed(2) || "?"}
                              <span className="text-xs text-muted-foreground ml-1">
                                (contant of Tikkie aan fixer)
                              </span>
                            </p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/repair/${repair.id}`}>
                            Details
                          </Link>
                        </Button>
                        
                        {repair.status !== "PENDING" && (
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            Annuleren
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
              )}
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
          ) : (
            <div className="space-y-4">
              {repairs.filter(repair => 
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
                repairs
                  .filter(repair => ["COMPLETED", "CANCELLED"].includes(repair.status))
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map(repair => (
                    <Card key={repair.id} className="card-hover">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{repair.issueType}</CardTitle>
                            <CardDescription>
                              {repair.status === "COMPLETED" 
                                ? `Gerepareerd op ${formatDate(repair.bookingTime || repair.createdAt)}`
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
                              <strong>Fixer:</strong> {repair.fixer?.name}
                            </p>
                            <p>
                              <strong>Totale kosten:</strong> €{((repair.platformFee || 4) + (repair.repairCost || 0)).toFixed(2)}
                              <span className="text-xs text-muted-foreground ml-1">
                                (€{repair.platformFee.toFixed(2)} platformkosten + €{(repair.repairCost || 0).toFixed(2)} reparatiekosten)
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
                  ))
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}