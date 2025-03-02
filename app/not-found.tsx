"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bike, Wrench, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-blue-50 text-center px-4">
      {/* Animated Bike */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-8"
      >
        <Bike className="h-24 w-24 text-primary animate-spin-slow" />
      </motion.div>

      {/* 404 Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl md:text-8xl font-extrabold text-secondary mb-4"
      >
        404
      </motion.h1>

      {/* Funny Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-xl md:text-2xl text-gray-700 mb-6 max-w-lg"
      >
        Oeps! Het lijkt erop dat je fiets een lekke band heeft gekregen in de digitale wereld. Onze fixers kunnen helaas geen pixels repareren!
      </motion.p>

      {/* Funny Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-md text-gray-600 mb-8"
      >
        &quot;Misschien heb je de verkeerde afslag genomen bij de fietsenstalling van het internet?&quot;
      </motion.p>

      {/* Back Home Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white transition-all duration-300"
        >
          <Link href="/">
            <Wrench className="mr-2 h-5 w-5" />
            Terug naar de Werkplaats
          </Link>
        </Button>
      </motion.div>

      {/* Extra Humor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6 flex items-center text-gray-500"
      >
        <AlertTriangle className="h-5 w-5 mr-2" />
        <p className="text-sm">
          Geen paniek, je fiets is niet écht kapot... toch?
        </p>
      </motion.div>
    </div>
  );
}