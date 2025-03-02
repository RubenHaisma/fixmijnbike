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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadWidget } from "next-cloudinary";
import { Bike, Upload, AlertCircle, Image as ImageIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

const bikeIssues = [
  { value: "flat-tire", label: "Lekke band" },
  { value: "brakes", label: "Remmen" },
  { value: "chain", label: "Ketting" },
  { value: "gears", label: "Versnellingen" },
  { value: "wheel-alignment", label: "Wiel uitlijning" },
  { value: "lights", label: "Verlichting" },
  { value: "general-maintenance", label: "Algemeen onderhoud" },
  { value: "other", label: "Anders" },
];

const formSchema = z.object({
  issueType: z.string({
    required_error: "Selecteer een probleem",
  }),
  description: z.string().optional(),
  postalCode: z.string().regex(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i, "Ongeldige postcode (bijv. 1234 AB)"),
  imageUrl: z.string().optional(),
});

export default function RepairRequestPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueType: "",
      description: "",
      postalCode: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    // Add the image URL if one was uploaded
    if (imageUrl) {
      values.imageUrl = imageUrl;
    }

    try {
      const response = await fetch("/api/repairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Er is een fout opgetreden bij het aanvragen van de reparatie");
        return;
      }

      // Redirect to the repair details page
      router.push(`/repair/${data.id}`);
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
            <Bike className="h-10 w-10 text-orange-500" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Vraag een fietsreparatie aan
          </h1>
          <p className="text-sm text-muted-foreground">
            Vertel ons wat er mis is met je fiets en we vinden een student-fixer in jouw buurt
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
              name="issueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wat is het probleem met je fiets?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een probleem" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bikeIssues.map((issue) => (
                        <SelectItem key={issue.value} value={issue.value}>
                          {issue.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschrijving (optioneel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Geef meer details over het probleem..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Hoe meer details je geeft, hoe beter de fixer je kan helpen
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 AB" {...field} />
                  </FormControl>
                  <FormDescription>
                    We gebruiken je postcode om fixers in jouw buurt te vinden
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto (optioneel)</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-4">
                      <CldUploadWidget
                        uploadPreset="bikefixnl"
                        onSuccess={(result: any) => {
                          setImageUrl(result.info.secure_url);
                          field.onChange(result.info.secure_url);
                        }}
                      >
                        {({ open }) => (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => open()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload een foto
                          </Button>
                        )}
                      </CldUploadWidget>

                      {imageUrl && (
                        <Card className="overflow-hidden">
                          <CardContent className="p-2">
                            <div className="relative aspect-video">
                              <img
                                src={imageUrl}
                                alt="Uploaded bike issue"
                                className="object-cover w-full h-full rounded-md"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {!imageUrl && (
                        <div className="border rounded-md p-8 flex flex-col items-center justify-center text-muted-foreground">
                          <ImageIcon className="h-8 w-8 mb-2" />
                          <p className="text-sm">Nog geen foto geüpload</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Een foto helpt de fixer om het probleem beter te begrijpen
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? "Bezig met aanvragen..." : "Reparatie aanvragen"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}