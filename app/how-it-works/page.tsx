'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Recycle as Bicycle, Wrench, ArrowRight, Star, Euro, Clock, CheckCircle, MapPin, Shield, Award, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FAQSchema, ServiceSchema } from '@/components/structured-data';

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col items-center bg-gray-50">
      {/* Structured Data */}
      <FAQSchema
        questions={[
          {
            question: "Hoe snel kan mijn fiets gerepareerd worden?",
            answer: "Meestal binnen 24-48 uur, afhankelijk van fixer-beschikbaarheid."
          },
          {
            question: "Wat als de reparatie niet lukt?",
            answer: "Je betaalt alleen de platformkosten als de reparatie niet lukt."
          },
          {
            question: "Hoe worden reparatiekosten bepaald?",
            answer: "Gebaseerd op het uurtarief van de fixer (€5-€15) en de tijd."
          },
          {
            question: "Kan ik een specifieke fixer kiezen?",
            answer: "Momenteel automatisch gematcht, keuze komt in de toekomst."
          },
          {
            question: "Wat als ik mijn afspraak annuleer?",
            answer: "Kosteloos tot 2 uur voor de afspraak, anders platformkosten."
          },
          {
            question: "Zijn de fixers gekwalificeerd?",
            answer: "Fixers geven hun vaardigheden aan en bouwen reputatie op via reviews."
          }
        ]}
      />
      
      <ServiceSchema
        name="Fietsreparatie voor Studenten"
        description="Betaalbare fietsreparatie door studenten, voor studenten. Lekke band? Piepende remmen? Vind een student-fixer in jouw buurt die je snel en betaalbaar helpt."
        provider={{
          name: "FixMijnBike",
          url: "https://fixmijnbike.nl"
        }}
        serviceArea={[
          { name: "Amsterdam", type: "City" },
          { name: "Utrecht", type: "City" },
          { name: "Rotterdam", type: "City" },
          { name: "Groningen", type: "City" },
          { name: "Nederland", type: "Country" }
        ]}
        offers={[
          { price: "4.00", priceCurrency: "EUR", description: "Platformkosten per reparatie" },
          { price: "5.00-15.00", priceCurrency: "EUR", description: "Uurtarief voor reparaties" }
        ]}
      />

      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 via-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-6 text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary">
              Hoe FixMijnBike Werkt
            </h1>
            <p className="text-xl font-semibold text-secondary">
              Eenvoudig, Betaalbaar en Snel je Fiets Repareren
            </p>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
              FixMijnBike verbindt studenten met fietsreparatiebehoeften aan student-fixers die extra geld willen verdienen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "2500+", label: "Reparaties voltooid", color: "primary" },
              { value: "150+", label: "Actieve fixers", color: "secondary" },
              { value: "4.8/5", label: "Gemiddelde beoordeling", color: "accent" },
              { value: "€15K+", label: "Verdiend door studenten", color: "green-500" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Riders */}
      <section className="w-full py-16 md:py-24 bg-white" id="for-riders">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center mb-12"
          >
            <div className="p-4 rounded-full bg-orange-100 shadow-md">
              <Bicycle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
              Voor Riders
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
              Zo laat je je fiets repareren door een student-fixer
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto">
            {[
              { step: 1, icon: Bicycle, title: "Beschrijf je probleem", desc: "Vertel ons wat er mis is met je fiets en upload een foto", img: "/images/stap1.jpg" },
              { step: 2, icon: MapPin, title: "Vind een Fixer", desc: "We matchen je met een beschikbare student-fixer in jouw buurt", img: "/images/bikefixing.jpg" },
              { step: 3, icon: Euro, title: "Betaal en boek", desc: "Betaal €4 platformkosten en plan een reparatie", img: "/images/stap3.jpg" },
              { step: 4, icon: CheckCircle, title: "Fiets gerepareerd!", desc: "De fixer repareert je fiets en je betaalt alleen voor de reparatie", img: "/images/sophie.jpg" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex flex-col items-center space-y-4 relative"
              >
                <div className="p-4 rounded-full bg-orange-100 relative shadow-sm">
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">{item.step}</span>
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
                <Image 
                  src={item.img}
                  alt={item.title}
                  width={200}
                  height={150}
                  className="rounded-lg mt-2 shadow-md hover:scale-105 transition-transform duration-300"
                />
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 right-0 w-full h-4 transform translate-x-1/2">
                    <div className="w-full h-0.5 bg-gray-200"></div>
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
              <Link href="/repair">
                <Bicycle className="mr-2 h-5 w-5" />
                Reparatie aanvragen
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-16 bg-gradient-to-b from-blue-50 to-white" id="why-choose-us">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Waarom FixMijnBike?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg mt-2">
              We maken fietsreparaties toegankelijk, betaalbaar en persoonlijk
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Betrouwbaar", desc: "Alle fixers worden geverifieerd en beoordeeld door andere studenten.", color: "green" },
              { icon: MapPin, title: "Lokaal", desc: "Fixers komen uit jouw buurt of universiteit, geen voorrijkosten.", color: "blue" },
              { icon: Award, title: "Kwaliteit", desc: "Hoogwaardige reparaties met geld-terug-garantie als je niet tevreden bent.", color: "purple" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`flex flex-col items-center space-y-4 p-6 rounded-xl border-${item.color}-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className={`p-3 rounded-full bg-${item.color}-100 mb-4`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Fixers */}
      <section className="w-full py-16 md:py-24 bg-blue-50" id="for-fixers">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center mb-12"
          >
            <div className="p-4 rounded-full bg-blue-100 shadow-md">
              <Wrench className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Voor Fixers
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
              Zo verdien je geld met je fietsreparatievaardigheden
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto">
            {[
              { step: 1, icon: Wrench, title: "Maak je profiel aan", desc: "Meld je aan en geef aan welke reparaties je kunt doen", img: "/images/tim.jpg" },
              { step: 2, icon: Euro, title: "Stel je tarief in", desc: "Kies je uurtarief tussen €5-€15", img: "/images/stap3.jpg" },
              { step: 3, icon: Bicycle, title: "Ontvang reparaties", desc: "Krijg verzoeken van studenten in jouw buurt", img: "/images/bikefixing.jpg" },
              { step: 4, icon: Euro, title: "Verdien geld", desc: "Ontvang €3 platformvergoeding plus je tarief", img: "/images/lisa.jpg" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex flex-col items-center space-y-4 relative"
              >
                <div className="p-4 rounded-full bg-blue-100 relative shadow-sm">
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">{item.step}</span>
                  <item.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
                <Image 
                  src={item.img}
                  alt={item.title}
                  width={200}
                  height={150}
                  className="rounded-lg mt-2 shadow-md hover:scale-105 transition-transform duration-300 object-cover"
                />
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 right-0 w-full h-4 transform translate-x-1/2">
                    <div className="w-full h-0.5 bg-gray-200"></div>
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105">
              <Link href="/become-fixer">
                <Wrench className="mr-2 h-5 w-5" />
                Word een Fixer
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-16 bg-white" id="testimonials">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Wat Onze Gebruikers Zeggen
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg mt-2">
              Ervaringen van echte studenten die FixMijnBike gebruiken
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Emma", uni: "UvA", quote: "Mijn ketting was kapot en Joost had het in 20 minuten gefixt voor €10!", img: "/images/emma.jpg", color: "orange" },
              { name: "Tim", uni: "TU Delft", quote: "Ik verdien €100 per week extra als fixer, perfect naast mijn studie!", img: "/images/tim.jpg", color: "blue" },
              { name: "Sophie", uni: "RUG", quote: "Lekke band op zondag? FixMijnBike regelde het dezelfde dag nog!", img: "/images/sophie.jpg", color: "green" },
              { name: "Maarten", uni: "UU", quote: "Betaalbaar, snel en betrouwbaar. Echt een aanrader voor studenten!", img: "/images/maarten.jpg", color: "purple" },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`p-6 bg-${testimonial.color}-50 rounded-xl border border-${testimonial.color}-100 shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-center mb-4">
                  <Image 
                    src={testimonial.img}
                    alt={`${testimonial.name}, ${testimonial.uni} student`}
                    width={80}
                    height={80}
                    className={`rounded-full border-2 border-${testimonial.color}-500`}
                  />
                  <div className="ml-3">
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.uni} student</p>
                    <div className="flex text-yellow-500 mt-1">
                      {Array(5).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-16 md:py-24 bg-white" id="pricing">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-800">
              Transparante Prijzen
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
              Geen verborgen kosten, alleen eerlijke prijzen voor iedereen
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Voor Riders", icon: Bicycle, color: "primary", bg: "orange-50", border: "orange-100", items: [
                { label: "€4 platformkosten", desc: "Eenmalige kosten per reparatie" },
                { label: "Reparatiekosten", desc: "Gebaseerd op het uurtarief van de fixer (€5-€15)" },
                { label: "Gratis eerste boeking", desc: "Voor studenten met een .nl e-mailadres" },
                { label: "Geen voorrijkosten", desc: "De fixer komt naar jou toe" },
              ], link: "/repair" },
              { title: "Voor Fixers", icon: Wrench, color: "secondary", bg: "blue-50", border: "blue-100", items: [
                { label: "€3 platformvergoeding", desc: "Voor elke voltooide reparatie" },
                { label: "Zelf je uurtarief bepalen", desc: "Tussen €5 en €15 per uur" },
                { label: "Geen abonnementskosten", desc: "Alleen een kleine fee per reparatie" },
                { label: "Gratis uitbetalingen", desc: "Geen kosten voor je saldo" },
              ], link: "/become-fixer" },
            ].map((pricing, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`border rounded-xl p-6 bg-${pricing.bg} border-${pricing.border} shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-center mb-4">
                  <pricing.icon className={`h-8 w-8 text-${pricing.color} mr-3`} />
                  <h3 className={`text-2xl font-bold text-${pricing.color}`}>{pricing.title}</h3>
                </div>
                <ul className="space-y-4 mb-6">
                  {pricing.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <span className="font-bold">{item.label}</span>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full bg-${pricing.color} hover:bg-${pricing.color}/90 transition-all duration-300`}>
                  <Link href={pricing.link}>
                    {pricing.title === "Voor Riders" ? "Reparatie aanvragen" : "Word een Fixer"}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Repairs */}
      <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white" id="common-repairs">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Veelvoorkomende Reparaties
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg mt-2">
              Dit zijn de meest gevraagde fietsreparaties op ons platform
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Lekke band", desc: "Binnenband vervangen of plakken", price: "€5-€10", time: "15-30 min" },
              { title: "Remmen", desc: "Remblokken vervangen en afstellen", price: "€10-€15", time: "20-40 min" },
              { title: "Ketting", desc: "Ketting vervangen of smeren", price: "€8-€15", time: "15-30 min" },
              { title: "Versnellingen", desc: "Afstellen en repareren", price: "€10-€20", time: "30-60 min" },
              { title: "Verlichting", desc: "Lampjes vervangen en bedrading", price: "€5-€15", time: "10-30 min" },
              { title: "Wielen", desc: "Spaken en uitlijning", price: "€15-€25", time: "30-60 min" },
            ].map((repair, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-bold text-lg mb-1 text-gray-800">{repair.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{repair.desc}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Euro className="h-4 w-4 mr-1" />
                    <span>{repair.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{repair.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 md:py-24 bg-gray-50" id="faq">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4 text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-800">
              Veelgestelde Vragen
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { q: "Hoe snel kan mijn fiets gerepareerd worden?", a: "Meestal binnen 24-48 uur, afhankelijk van fixer-beschikbaarheid." },
              { q: "Wat als de reparatie niet lukt?", a: "Je betaalt alleen de platformkosten als de reparatie niet lukt." },
              { q: "Hoe worden reparatiekosten bepaald?", a: "Gebaseerd op het uurtarief van de fixer (€5-€15) en de tijd." },
              { q: "Kan ik een specifieke fixer kiezen?", a: "Momenteel automatisch gematcht, keuze komt in de toekomst." },
              { q: "Wat als ik mijn afspraak annuleer?", a: "Kosteloos tot 2 uur voor de afspraak, anders platformkosten." },
              { q: "Zijn de fixers gekwalificeerd?", a: "Fixers geven hun vaardigheden aan en bouwen reputatie op via reviews." },
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-800">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 bg-secondary text-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 text-center"
          >
            <Bicycle className="h-12 w-12" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Klaar om te Beginnen?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              Meld je vandaag nog aan en ervaar het gemak van FixMijnBike
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                <Link href="/repair">
                  <Bicycle className="mr-2 h-5 w-5" />
                  Fix Mijn Fiets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-black/80 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <Link href="/become-fixer">
                  <Wrench className="mr-2 h-5 w-5" />
                  Word een Fixer
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}