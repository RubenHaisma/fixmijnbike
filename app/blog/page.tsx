'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, ArrowRight, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    slug: 'lekke-band-repareren',
    title: 'Lekke Band Repareren: Stap voor Stap Handleiding',
    description: 'Leer hoe je zelf een lekke band kunt plakken of vervangen. Met deze handleiding kun je in 15-30 minuten weer op weg zijn.',
    image: '/images/tire-removal.jpg',
    category: 'Reparatie',
    readTime: '8 min',
    author: 'Tim',
    date: '2025-05-01',
  },
  {
    slug: 'fiets-remmen-afstellen',
    title: 'Fietsremmen Afstellen: Zo Doe Je Dat Zelf',
    description: 'Piepende of slecht werkende remmen? Leer hoe je je remmen perfect kunt afstellen voor optimale veiligheid.',
    image: '/images/brakes.jpg',
    category: 'Onderhoud',
    readTime: '10 min',
    author: 'Lisa',
    date: '2025-04-28',
  },
  {
    slug: 'ketting-smeren-vervangen',
    title: 'Fietsketting Smeren en Vervangen: Complete Gids',
    description: 'Een goed onderhouden ketting is essentieel voor je fiets. Ontdek hoe je je ketting kunt smeren en wanneer deze vervangen moet worden.',
    image: '/images/chain.jpg',
    category: 'Onderhoud',
    readTime: '12 min',
    author: 'Martijn',
    date: '2025-04-25',
  },
  {
    slug: 'versnellingen-afstellen',
    title: 'Fietsversnellingen Afstellen: Tips & Tricks',
    description: 'Schakel je niet meer soepel? Met deze handleiding leer je hoe je je versnellingen zelf kunt afstellen.',
    image: '/images/gears.jpg',
    category: 'Reparatie',
    readTime: '15 min',
    author: 'Tim',
    date: '2025-04-22',
  },
  {
    slug: 'fiets-onderhoud-tips',
    title: '10 Essentiële Fiets Onderhoudstips',
    description: 'Voorkom problemen met deze belangrijke onderhoudstips. Een goed onderhouden fiets gaat jaren langer mee!',
    image: '/images/maintenance.jpg',
    category: 'Onderhoud',
    readTime: '7 min',
    author: 'Lisa',
    date: '2025-04-19',
  },
  {
    slug: 'fietsverlichting-repareren',
    title: 'Fietsverlichting Repareren en Vervangen',
    description: 'Kapotte verlichting? Ontdek hoe je zelf je fietsverlichting kunt repareren of vervangen. Veiligheid eerst!',
    image: '/images/lights.jpg',
    category: 'Reparatie',
    readTime: '8 min',
    author: 'Martijn',
    date: '2025-04-16',
  }
];

export default function BlogPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Fiets Reparatie Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Leer hoe je zelf je fiets kunt repareren en onderhouden met onze uitgebreide handleidingen. 
          Kom je er niet uit? Onze fixers staan voor je klaar!
        </p>
      </motion.div>

      {/* Featured Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-12"
      >
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-[300px] md:h-auto">
              <Image
                src="/images/flat-tire.jpg"
                alt="Lekke band repareren"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Uitgelicht
                </Badge>
                <span className="text-sm text-muted-foreground">8 min leestijd</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Lekke Band Repareren: Stap voor Stap Handleiding
              </h2>
              <p className="text-muted-foreground mb-4">
                Leer hoe je zelf een lekke band kunt plakken of vervangen. Met deze handleiding kun je in 15-30 minuten weer op weg zijn.
              </p>
              <Button asChild className="w-fit">
                <Link href="/blog/lekke-band-repareren">
                  Lees verder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.date).toLocaleDateString('nl-NL')}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${post.slug}`}>
                    Lees artikel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 text-center bg-secondary text-white rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-4">
          Kom je er zelf niet uit?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Geen zorgen! Onze ervaren student-fixers staan voor je klaar om je fiets snel en betaalbaar te repareren.
        </p>
        <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100">
          <Link href="/repair">
            <Wrench className="mr-2 h-5 w-5" />
            Boek een Fixer
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}