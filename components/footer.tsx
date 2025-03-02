import Link from "next/link";
import { Bike, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bike className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-orange-500">BikeFixNL</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fietsreparatie door studenten, voor studenten. Betaalbaar, snel en gemakkelijk.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Navigatie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/repair" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  Reparatie Aanvragen
                </Link>
              </li>
              <li>
                <Link href="/become-fixer" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  Word een Fixer
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  Hoe het werkt
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  Inloggen
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  Aanmelden
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-orange-500 transition-colors">
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
                <a href="mailto:info@bikefixnl.nl" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  info@bikefixnl.nl
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+31612345678" className="text-muted-foreground hover:text-orange-500 transition-colors">
                  +31 6 12345678
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 BikeFixNL. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-orange-500 transition-colors">
              Algemene Voorwaarden
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-orange-500 transition-colors">
              Privacybeleid
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-orange-500 transition-colors">
              Cookiebeleid
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}