"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle, AlertTriangle, DollarSign, Users, Bicycle, Wrench } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Payout = {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: string;
  createdAt: string;
  processedAt: string | null;
};

type Stats = {
  totalUsers: number;
  totalRiders: number;
  totalFixers: number;
  totalRepairs: number;
  totalRevenue: number;
  pendingPayouts: number;
};

export function AdminDashboard() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [payoutsRes, statsRes] = await Promise.all([
          fetch("/api/admin/payouts"),
          fetch("/api/admin/stats")
        ]);
        
        if (payoutsRes.ok && statsRes.ok) {
          const payoutsData = await payoutsRes.json();
          const statsData = await statsRes.json();
          
          setPayouts(payoutsData);
          setStats(statsData);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  async function processPayout(payoutId: string) {
    try {
      const response = await fetch(`/api/admin/payouts/${payoutId}/process`, {
        method: "PUT",
      });
      
      if (response.ok) {
        // Update payouts list
        setPayouts(payouts.map(payout => 
          payout.id === payoutId 
            ? { ...payout, status: "processed", processedAt: new Date().toISOString() } 
            : payout
        ));
        
        // Update stats
        if (stats) {
          const processedAmount = payouts.find(p => p.id === payoutId)?.amount || 0;
          setStats({
            ...stats,
            pendingPayouts: stats.pendingPayouts - processedAmount
          });
        }
      }
    } catch (error) {
      console.error("Error processing payout:", error);
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

  function getStatusBadge(status: string) {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In behandeling</Badge>;
      case "processed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Verwerkt</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Geannuleerd</Badge>;
      default:
        return <Badge variant="outline">Onbekend</Badge>;
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Gebruikers</CardTitle>
            <CardDescription>Totaal aantal gebruikers</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                {stats?.totalUsers || 0}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground flex flex-col">
              <span>{stats?.totalRiders || 0} riders</span>
              <span>{stats?.totalFixers || 0} fixers</span>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Reparaties</CardTitle>
            <CardDescription>Totaal aantal reparaties</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold flex items-center">
                <Bicycle className="h-5 w-5 mr-2 text-orange-500" />
                {stats?.totalRepairs || 0}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inkomsten</CardTitle>
            <CardDescription>Totale inkomsten</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                €{stats?.totalRevenue.toFixed(2) || "0.00"}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              €1 per boeking
            </p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Uitbetalingen</CardTitle>
            <CardDescription>In behandeling</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="text-2xl font-bold flex items-center">
                <Wrench className="h-5 w-5 mr-2 text-blue-600" />
                €{stats?.pendingPayouts.toFixed(2) || "0.00"}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              {payouts.filter(p => p.status === "pending").length} openstaande verzoeken
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Openstaande uitbetalingen</TabsTrigger>
          <TabsTrigger value="processed">Verwerkte uitbetalingen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fixer</TableHead>
                      <TableHead>Bedrag</TableHead>
                      <TableHead>Aangevraagd op</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actie</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.filter(p => p.status === "pending").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Geen openstaande uitbetalingen
                        </TableCell>
                      </TableRow>
                    ) : (
                      payouts
                        .filter(p => p.status === "pending")
                        .map(payout => (
                          <TableRow key={payout.id}>
                            <TableCell>{payout.userName}</TableCell>
                            <TableCell>€{payout.amount.toFixed(2)}</TableCell>
                            <TableCell>{formatDate(payout.createdAt)}</TableCell>
                            <TableCell>{getStatusBadge(payout.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => processPayout(payout.id)}
                              >
                                Verwerken
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="processed">
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fixer</TableHead>
                      <TableHead>Bedrag</TableHead>
                      <TableHead>Aangevraagd op</TableHead>
                      <TableHead>Verwerkt op</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.filter(p => p.status === "processed").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Geen verwerkte uitbetalingen
                        </TableCell>
                      </TableRow>
                    ) : (
                      payouts
                        .filter(p => p.status === "processed")
                        .map(payout => (
                          <TableRow key={payout.id}>
                            <TableCell>{payout.userName}</TableCell>
                            <TableCell>€{payout.amount.toFixed(2)}</TableCell>
                            <TableCell>{formatDate(payout.createdAt)}</TableCell>
                            <TableCell>{payout.processedAt ? formatDate(payout.processedAt) : "-"}</TableCell>
                            <TableCell>{getStatusBadge(payout.status)}</TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}