"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bike, Menu, User, LogIn } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="FixMijnBike Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <span className="text-xl font-bold text-primary">FixMijnBike</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/repair" className="text-sm font-medium hover:text-primary transition-colors">
            Reparatie Aanvragen
          </Link>
          <Link href="/become-fixer" className="text-sm font-medium hover:text-primary transition-colors">
            Word een Fixer
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            Hoe het werkt
          </Link>
          
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || "Profielfoto"} 
                      fill 
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mijn Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full cursor-pointer">Profiel</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                  Uitloggen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Inloggen
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                <Link href="/signup">Aanmelden</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-8">
              <Link 
                href="/repair" 
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Reparatie Aanvragen
              </Link>
              <Link 
                href="/become-fixer" 
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Word een Fixer
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Hoe het werkt
              </Link>
              
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile" 
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Profiel
                  </Link>
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                  >
                    Uitloggen
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link 
                      href="/login"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Inloggen
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Link 
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                    >
                      Aanmelden
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}