"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      setError("Geen verificatietoken gevonden");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${token}`, {
          method: "GET",
        });

        if (response.ok) {
          setIsSuccess(true);
        } else {
          const data = await response.json();
          setError(data.error || "Er is een fout opgetreden bij het verifiëren van je e-mailadres");
        }
      } catch (error) {
        setError("Er is een fout opgetreden bij het verifiëren van je e-mailadres");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">E-mailadres verifiëren</CardTitle>
          <CardDescription className="text-center">
            {isVerifying ? "Je e-mailadres wordt geverifieerd..." : isSuccess ? "Je e-mailadres is geverifieerd!" : "Verificatie mislukt"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {isVerifying ? (
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
          ) : isSuccess ? (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg">Je e-mailadres is succesvol geverifieerd!</p>
              <p className="text-muted-foreground mt-2">Je kunt nu inloggen op je account.</p>
            </div>
          ) : (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <p className="text-lg">Verificatie mislukt</p>
              <p className="text-muted-foreground mt-2">{error || "Er is een fout opgetreden bij het verifiëren van je e-mailadres."}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isVerifying && (
            <Button 
              asChild 
              className={isSuccess ? "bg-green-500 hover:bg-green-600" : ""}
            >
              <Link href="/login">
                {isSuccess ? "Inloggen" : "Terug naar inloggen"}
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}