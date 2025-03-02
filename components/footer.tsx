import Link from "next/link";
import { Bike, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="FixMijnBike Logo" 
                width={40} 
                height={40} 
                className="rounded-full"
              />
              <span className="text-xl font-bold text-primary">FixMijnBike</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Persoonlijke fietsreparatie door studenten, voor studenten. Betaalbaar, snel en gemakkelijk.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Navigatie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/repair" className="text-muted-foreground hover:text-primary transition-colors">
                  Reparatie Aanvragen
                </Link>
              </li>
              <li>
                <Link href="/become-fixer" className="text-muted-foreground hover:text-primary transition-colors">
                  Word een Fixer
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  Hoe het werkt
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Inloggen
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Aanmelden
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Profiel
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@fixmijnbike.nl" className="text-muted-foreground hover:text-primary transition-colors">
                  info@fixmijnbike.nl
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+31612345678" className="text-muted-foreground hover:text-primary transition-colors">
                  +31 6 12345678
                </a>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
              <p className="text-sm text-orange-800 handwritten text-lg">
                &quot;Wij fixen jouw fiets met een persoonlijke touch!&quot;
              </p>
              <p className="text-xs text-right mt-2 text-orange-600">- Team FixMijnBike</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FixMijnBike. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Algemene Voorwaarden
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacybeleid
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookiebeleid
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}