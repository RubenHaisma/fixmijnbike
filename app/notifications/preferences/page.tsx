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
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, AlertCircle, CheckCircle, Smartphone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  inAppNotifications: z.boolean(),
});

export default function NotificationPreferencesPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      inAppNotifications: true,
    },
  });

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    async function fetchPreferences() {
      try {
        const response = await fetch("/api/notifications/preferences");
        if (response.ok) {
          const data = await response.json();
          form.reset({
            emailNotifications: data.emailNotifications,
            pushNotifications: data.pushNotifications,
            inAppNotifications: data.inAppNotifications,
          });
        }
      } catch (error) {
        console.error("Error fetching notification preferences:", error);
        setError("Er is een fout opgetreden bij het ophalen van je notificatievoorkeuren");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPreferences();
  }, [session, router, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/notifications/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Er is een fout opgetreden bij het opslaan van je notificatievoorkeuren");
        return;
      }

      setSuccess("Notificatievoorkeuren succesvol bijgewerkt!");
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      setError("Er is een fout opgetreden bij het opslaan van je notificatievoorkeuren");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Notificatievoorkeuren</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Notificatie-instellingen</CardTitle>
          <CardDescription>
            Beheer hoe en wanneer je notificaties ontvangt
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <Mail className="mr-2 h-4 w-4" />
                          E-mailnotificaties
                        </FormLabel>
                        <FormDescription>
                          Ontvang notificaties via e-mail
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <Smartphone className="mr-2 h-4 w-4" />
                          Push-notificaties
                        </FormLabel>
                        <FormDescription>
                          Ontvang push-notificaties op je apparaat
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="inAppNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center">
                          <Bell className="mr-2 h-4 w-4" />
                          In-app notificaties
                        </FormLabel>
                        <FormDescription>
                          Ontvang notificaties binnen de app
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSaving}
                >
                  {isSaving ? "Bezig met opslaan..." : "Voorkeuren opslaan"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}