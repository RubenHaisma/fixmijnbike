"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Phone, MapPin, Copy, Check, Share2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const profileSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 karakters bevatten"),
  phoneNumber: z.string().regex(/^(\+31|0)6[0-9]{8}$/, "Ongeldig telefoonnummer (bijv. 0612345678)"),
  postalCode: z.string().regex(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i, "Ongeldige postcode (bijv. 1234 AB)"),
});

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState([]);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, referralsRes] = await Promise.all([
          fetch("/api/users/me"),
          fetch("/api/referrals")
        ]);
        
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
          form.reset({
            name: userData.name || "",
            phoneNumber: userData.phoneNumber || "",
            postalCode: userData.postalCode || "",
          });
        }
        
        if (referralsRes.ok) {
          const referralsData = await referralsRes.json();
          setReferrals(referralsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (session) {
      fetchData();
    } else {
      router.push("/login");
    }
  }, [session, router, form]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Er is een fout opgetreden bij het bijwerken van je profiel");
        return;
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      
      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          name: updatedUser.name,
        },
      });
      
      setSuccess("Profiel succesvol bijgewerkt!");
    } catch (error) {
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
    } finally {
      setIsSaving(false);
    }
  }

  function copyReferralLink() {
    if (!user) return;
    
    const referralLink = `${window.location.origin}/signup?ref=${user.id}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Profiel</h1>
        <div className="space-y-6">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Profiel</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Algemeen</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Persoonlijke gegevens</CardTitle>
              <CardDescription>
                Werk je profielgegevens bij
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="mb-4 bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-600">{success}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Naam</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Volledige naam"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postcode</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="1234 AB"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefoonnummer</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="0612345678"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600"
                      disabled={isSaving}
                    >
                      {isSaving ? "Bezig met opslaan..." : "Opslaan"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account informatie</CardTitle>
                <CardDescription>
                  Details over je account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">E-mailadres</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Rol</h3>
                    <Badge variant="outline" className="mt-1">
                      {user?.role === "RIDER" ? "Rider" : "Fixer"}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Saldo</h3>
                    <p className="text-muted-foreground">€{user?.walletBalance.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Lid sinds</h3>
                    <p className="text-muted-foreground">{formatDate(user?.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Verdien €4 voor elke vriend die je uitnodigt</CardTitle>
              <CardDescription>
                Deel je unieke referral link en ontvang €4 wanneer een vriend zich aanmeldt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                <h3 className="font-medium text-orange-800 mb-2">Hoe het werkt:</h3>
                <ol className="list-decimal list-inside space-y-1 text-orange-700">
                  <li>Deel je unieke referral link met vrienden</li>
                  <li>Zij ontvangen €4 bij aanmelding</li>
                  <li>Jij ontvangt ook €4 wanneer zij zich aanmelden</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Jouw referral link</h3>
                <div className="flex">
                  <Input 
                    value={`${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${user?.id}`}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button
                    onClick={copyReferralLink}
                    className={`rounded-l-none ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-500 hover:bg-orange-600'}`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Gekopieerd
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Kopiëren
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Deel direct</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => {
                    const text = `Repareer je fiets goedkoop met FixMijnBike! Gebruik mijn link voor €4 korting: ${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${user?.id}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}>
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => {
                    const text = `Repareer je fiets goedkoop met FixMijnBike! Gebruik mijn link voor €4 korting: ${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${user?.id}`;
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}/signup?ref=${user?.id}&text=${encodeURIComponent(text)}`, '_blank');
                  }}>
                    Telegram
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => {
                    const text = `Repareer je fiets goedkoop met FixMijnBike! Gebruik mijn link voor €4 korting: ${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${user?.id}`;
                    window.open(`mailto:?subject=€4 korting op fietsreparatie&body=${encodeURIComponent(text)}`, '_blank');
                  }}>
                    E-mail
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Jouw uitnodigingen ({referrals.length})</h3>
                {referrals.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg">
                    <Share2 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Je hebt nog niemand uitgenodigd.
                      <br />
                      Deel je link om €4 te verdienen!
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Naam
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Datum
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {referrals.map((referral: any) => (
                          <tr key={referral.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {referral.referred.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {referral.referred.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(referral.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {referral.isRedeemed ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  €4 ontvangen
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                  In afwachting
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}