"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const formSchema = z.object({
  password: z.string().min(8, "Wachtwoord moet minimaal 8 karakters bevatten"),
  confirmPassword: z.string().min(8, "Wachtwoord moet minimaal 8 karakters bevatten"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Wachtwoorden komen niet overeen",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!token) {
      setIsValidating(false);
      setError("Geen reset token gevonden");
      return;
    }
    
    const validateToken = async () => {
      try {
        const response = await fetch(`/api/validate-reset-token?token=${token}`, {
          method: "GET",
        });
        
        if (response.ok) {
          setIsTokenValid(true);
        } else {
          const data = await response.json();
          setError(data.error || "Ongeldig of verlopen token");
        }
      } catch (error) {
        setError("Er is een fout opgetreden bij het valideren van het token");
      } finally {
        setIsValidating(false);
      }
    };
    
    validateToken();
  }, [token]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Er is een fout opgetreden bij het resetten van je wachtwoord");
        return;
      }

      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login?success=password_reset");
      }, 3000);
    } catch (error) {
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Wachtwoord resetten</CardTitle>
          <CardDescription>
            {isValidating 
              ? "Token wordt gevalideerd..." 
              : isTokenValid 
                ? "Voer je nieuwe wachtwoord in" 
                : "Ongeldig of verlopen token"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isValidating ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : success ? (
            <Alert className="bg-green-50 border-green-200 mb-4">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Je wachtwoord is succesvol gereset. Je wordt doorgestuurd naar de inlogpagina...
              </AlertDescription>
            </Alert>
          ) : isTokenValid ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nieuw wachtwoord</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bevestig wachtwoord</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 button-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Bezig met resetten..." : "Wachtwoord resetten"}
                </Button>
              </form>
            </Form>
          ) : null}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Terug naar inloggen
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}