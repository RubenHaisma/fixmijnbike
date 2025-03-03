"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import { Bike, Upload, AlertCircle, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
  issueType: z.string({ required_error: "Selecteer een probleem" }),
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
    defaultValues: { issueType: "", description: "", postalCode: "", imageUrl: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    if (imageUrl) values.imageUrl = imageUrl;

    try {
      const response = await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Er is een fout opgetreden bij het aanvragen van de reparatie");
        return;
      }

      router.push(`/repair/${data.id}`);
    } catch (error) {
      setError("Er is een fout opgetreden. Probeer het later opnieuw.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="container max-w-3xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-6 text-center"
        >
          <div className="p-4 rounded-full bg-orange-100 shadow-md">
            <Bike className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-orange-600">
            Vraag een fietsreparatie aan
          </h1>
          <p className="text-md text-gray-600 max-w-md">
            Vertel ons wat er mis is met je fiets en we vinden een student-fixer in jouw buurt
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8"
        >
          {error && (
            <Alert variant="destructive" className="mb-6 animate-shake">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="issueType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700">Wat is het probleem?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-orange-200 focus:ring-orange-500">
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Beschrijving (optioneel)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Geef meer details over het probleem..."
                            className="resize-none border-orange-200 focus:ring-orange-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-sm text-gray-500">
                          Meer details helpen de fixer om zich beter voor te bereiden
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Postcode</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="1234 AB" 
                            className="border-orange-200 focus:ring-orange-500"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-sm text-gray-500">
                          We matchen je met fixers in jouw buurt
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
                        <FormLabel className="text-lg font-semibold text-gray-700">Foto (optioneel)</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <CldUploadWidget
                              uploadPreset="FixMijnBike"
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
                                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 transition-all duration-300"
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload een foto
                                </Button>
                              )}
                            </CldUploadWidget>

                            {imageUrl && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                              >
                                <Card className="overflow-hidden border-orange-200">
                                  <CardContent className="p-2">
                                    <div className="relative aspect-video">
                                      <Image
                                        src={imageUrl}
                                        alt="Uploaded bike issue"
                                        fill
                                        className="object-cover rounded-md transition-transform duration-300 hover:scale-105"
                                      />
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            )}

                            {!imageUrl && (
                              <div className="border border-dashed border-orange-200 rounded-md p-8 flex flex-col items-center justify-center text-gray-400 hover:bg-orange-50 transition-colors duration-300">
                                <ImageIcon className="h-8 w-8 mb-2" />
                                <p className="text-sm">Nog geen foto geüpload</p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription className="text-sm text-gray-500">
                          Een foto helpt de fixer om het probleem beter te begrijpen
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Bezig met aanvragen...
                        </span>
                      ) : (
                        <>
                          Reparatie aanvragen
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}