'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bike, Wrench, ArrowRight, Star, Euro, Clock, CheckCircle, Shield, Award, MapPin, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Ensure this line is present

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full bg-gray-50">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-orange-50 via-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-6 max-w-4xl mx-auto text-center"
          >
            <Image 
              src="/logo.png" 
              alt="FixMijnBike Logo" 
              width={140} 
              height={140} 
              className="mx-auto mb-4 shadow-md rounded-full"
              priority
            />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary">
              FixMijnBike
            </h1>
            <p className="text-xl font-semibold text-secondary">
              Persoonlijke fietsreparatie door studenten, voor studenten
            </p>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
              Lekke band? Piepende remmen? Kapotte ketting? Vind een student-fixer in jouw buurt die je snel en betaalbaar helpt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                <Link href="/repair">
                  <Bike className="mr-2 h-5 w-5" />
                  Fix Mijn Fiets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 transition-all duration-300 transform hover:scale-105">
                <Link href="/become-fixer">
                  <Wrench className="mr-2 h-5 w-5" />
                  Word een Fixer
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-gradient-to-r from-orange-50 to-blue-50">
        <div className="container px-4 md:px-6">
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

      {/* How It Works */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 max-w-5xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Hoe Het Werkt
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg">
              Eenvoudig, betaalbaar en snel je fiets laten repareren
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            {[
              { step: 1, icon: Bike, title: "Beschrijf je probleem", desc: "Vertel ons wat er mis is met je fiets en upload een foto", img: "/stap1.jpg", color: "orange" },
              { step: 2, icon: Wrench, title: "Kies een Fixer", desc: "Bekijk student-fixers in jouw buurt en hun tarieven", img: "/tim.jpg", color: "blue" },
              { step: 3, icon: Clock, title: "Boek een tijdslot", desc: "Betaal €4 platformkosten en plan je reparatie", img: "/stap3.jpg", color: "pink" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`flex flex-col items-center space-y-4 p-6 rounded-xl border-${item.color}-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className={`p-3 rounded-full bg-${item.color}-100 shadow-sm`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{item.step}. {item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
                <Image 
                  src={item.img}
                  alt={item.title}
                  width={250}
                  height={150}
                  className="rounded-lg mt-2 object-cover shadow-md hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-16 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/bikefixing.jpg"
                alt="Student repairing a Bike"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl transition-transform duration-500 hover:scale-105"
                priority
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
                Voordelen voor Studenten
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Star, title: "Betaalbare reparaties", desc: "Bespaar met studentvriendelijke tarieven, lager dan fietswinkels" },
                  { icon: Clock, title: "Flexibele tijden", desc: "Reparaties wanneer het jou uitkomt, zelfs 's avonds en in weekends" },
                  { icon: Euro, title: "Verdien bij als Fixer", desc: "Verdien €5-€15 per uur met je fietskennis in je vrije tijd" },
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="flex items-start space-x-3"
                  >
                    <benefit.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                <Link href="/signup">
                  Meld je nu aan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-16 bg-white">
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
              { icon: Shield, title: "Betrouwbaar", desc: "Geverifieerde fixers met topbeoordelingen.", color: "green" },
              { icon: MapPin, title: "Lokaal", desc: "Fixers uit jouw buurt, geen wachttijden.", color: "blue" },
              { icon: Award, title: "Kwaliteit", desc: "Hoogwaardige reparaties met garantie.", color: "purple" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`p-3 rounded-full bg-${item.color}-100 mb-4 shadow-sm`}>
                  <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 max-w-5xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Wat Studenten Zeggen
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            {[
              { name: "Emma", uni: "UvA", quote: "Mijn ketting was kapot en Joost fixte het in 20 minuten voor €10!", img: "/emma.jpg", color: "orange" },
              { name: "Tim", uni: "TU Delft", quote: "Ik verdien €100 per week extra als fixer, perfect naast mijn studie!", img: "/tim.jpg", color: "blue" },
              { name: "Sophie", uni: "RUG", quote: "Lekke band op zondag? FixMijnBike regelde het dezelfde dag!", img: "/sophie.jpg", color: "pink" },
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
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                <div className="flex text-yellow-500">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fixers */}
      <section className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 max-w-5xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Onze Top Fixers
            </h2>
            <p className="text-gray-700 md:text-lg">
              Maak kennis met enkele van onze beste student-fixers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
            {[
              { name: "Tim", uni: "TU Delft", specialty: "Versnellingen", img: "/tim.jpg", rating: 4.9, reviews: 42 },
              { name: "Lisa", uni: "VU", specialty: "Remmen", img: "/lisa.jpg", rating: 4.8, reviews: 36 },
              { name: "Martijn", uni: "Groningen", specialty: "Elektrische fietsen", img: "/martijn.jpg", rating: 4.9, reviews: 51 },
              { name: "Maarten", uni: "UU", specialty: "Lekke banden", img: "/maarten.jpg", rating: 4.7, reviews: 29 },
            ].map((fixer, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="p-4 flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-24 h-24 mb-3">
                  <Image 
                    src={fixer.img}
                    alt={fixer.name}
                    fill
                    className="rounded-full object-cover border-2 border-primary"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-800">{fixer.name}</h3>
                <p className="text-sm text-gray-600">{fixer.uni}</p>
                <p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mt-1">{fixer.specialty}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm ml-1 font-medium">{fixer.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({fixer.reviews})</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary">
              Actief in Deze Steden
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-lg mt-2">
              Onze community van fixers en riders groeit elke dag
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {[
              "Amsterdam", "Utrecht", "Rotterdam", "Groningen", "Eindhoven", "Leiden", "Maastricht", "Delft", "Enschede", "Nijmegen",
              "Tilburg", "Arnhem", "Breda", "Den Haag", "Haarlem", "Leeuwarden", "Zwolle", "Almere", "Amersfoort", "Apeldoorn",
              "Assen", "Deventer", "Dordrecht", "Emmen", "Heerenveen", "Hilversum", "Hoorn", "Lelystad", "Middelburg", "Roermond",
              "Sneek", "Venlo", "Zutphen"
            ].map((city, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors duration-300"
              >
                {city}
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
            className="flex flex-col items-center space-y-6 max-w-4xl mx-auto text-center"
          >
            <Bike className="h-12 w-12" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Klaar om te Beginnen?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              Meld je vandaag nog aan en ervaar het gemak van FixMijnBike
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                <Link href="/repair">
                  <Bike className="mr-2 h-5 w-5" />
                  Fix Mijn Fiets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
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