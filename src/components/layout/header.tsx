"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Palmtree } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinkItems = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="#" className="mr-6 flex items-center gap-2" prefetch={false}>
          <Palmtree className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-semibold tracking-wide text-primary">
            Jeopan Paradise
          </span>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
          <NavLinkItems />
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Button variant="destructive" className="hidden sm:inline-flex">Book Now</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link
                  href="#"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <Palmtree className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-semibold">
                    Jeopan Paradise
                  </span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                     <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-lg font-medium transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                  ))}
                </nav>
                 <SheetClose asChild>
                    <Button variant="destructive" size="lg">Book Now</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
