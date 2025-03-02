"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Wrench, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const bikeSkills = [
  {
    id: "flat-tire",
    label: "Lekke band",
  },
  {
    id: "brakes",
    label: "Remmen",
  },
  {
    id: "chain",
    label: "Ketting",
  },
  {
    id: "gears",
    label: "Versnellingen",
  },
  {
    id: "wheel-alignment",
    label: "Wiel uitlijning",
  },
  {
    id: "lights",
    label: "Verlichting",
  },
  {
    id: "general-maintenance",
    label: "Algemeen onderhoud",
  },
];

const formSchema = z.object({
  skills: z.array(z.string()).min(1, "Selecteer minimaal één vaardigheid"),
  hourlyRate: z.number().min(5, "Minimumtarief is €5").max(15, "Maximumtarief is €15"),
  isAvailable: z.boolean(),
});

export default function FixerOnboardingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [],
      hourlyRate: 10,
      isAvailable: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users/fixer-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Er is een fout opgetreden bij het opslaan van je profiel");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-3xl py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Wrench className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Stel je Fixer profiel in
          </h1>
          <p className="text-sm text-muted-foreground">
            Laat studenten weten hoe jij hen kunt helpen
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <FormLabel>Fietsreparatie vaardigheden</FormLabel>
                  <FormDescription>
                    Selecteer alle reparaties die je kunt uitvoeren
                  </FormDescription>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {bikeSkills.map((skill) => (
                      <FormField
                        key={skill.id}
                        control={form.control}
                        name="skills"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={skill.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(skill.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, skill.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== skill.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {skill.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uurtarief (€)</FormLabel>
                  <FormDescription>
                    Stel je uurtarief in tussen €5 en €15
                  </FormDescription>
                  <div className="space-y-4">
                    <Slider
                      min={5}
                      max={15}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="w-full"
                    />
                    <div className="flex justify-between">
                      <span>€5</span>
                      <span className="font-bold text-blue-600">€{field.value}</span>
                      <span>€15</span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal cursor-pointer">
                      Ik ben beschikbaar voor reparaties
                    </FormLabel>
                    <FormDescription>
                      Je kunt dit later altijd wijzigen in je dashboard
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Bezig met opslaan..." : "Profiel opslaan"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}