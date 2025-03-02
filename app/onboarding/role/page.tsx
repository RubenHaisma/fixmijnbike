"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Bike, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoleSelectionPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function selectRole(role: "RIDER" | "FIXER") {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/users/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update role");
      }
      
      // Update the session
      await update({
        ...session,
        user: {
          ...session?.user,
          role,
        },
      });
      
      // Redirect based on role
      if (role === "FIXER") {
        router.push("/onboarding/fixer");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-3xl">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Welkom bij FixMijnBike!
          </h1>
          <p className="text-muted-foreground">
            Kies hoe je FixMijnBike wilt gebruiken
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 hover:border-orange-500 cursor-pointer transition-all" onClick={() => selectRole("RIDER")}>
            <CardHeader className="text-center">
              <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit">
                <Bike className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle className="text-xl">Ik wil mijn fiets laten repareren</CardTitle>
              <CardDescription>
                Vind betaalbare student-fixers in jouw buurt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Vind fixers in jouw buurt</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Betaalbare studentenprijzen</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Flexibele tijden voor reparaties</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Snel en gemakkelijk boeken</span>
                </li>
              </ul>
              <Button className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                Kies Rider
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-600 cursor-pointer transition-all" onClick={() => selectRole("FIXER")}>
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Ik wil geld verdienen als fixer</CardTitle>
              <CardDescription>
                Gebruik je fietskennis om extra geld te verdienen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Verdien €5-€15 per uur</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Werk wanneer het jou uitkomt</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Ontvang €3 per boeking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Bouw een reputatie op met badges</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                Kies Fixer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}