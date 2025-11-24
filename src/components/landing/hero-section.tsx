import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { findImage } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const heroImage = findImage("hero-background");

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden p-0">
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 liquid-glass">
            <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/20 blob-1" />
            <div className="absolute top-1/2 right-1/4 h-80 w-80 rounded-full bg-accent/20 blob-2" />
            <div className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-secondary/20 blob-3" />
        </div>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className={cn("font-headline text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl")}>
            Jeopan Paradise
          </h1>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-10 duration-1000 delay-500">
          <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
            Where Comfort Meets Adventure
          </p>
        </div>
        <div className="mt-8 animate-in fade-in-0 duration-1000 delay-700">
          <Button
            size="lg"
            variant="destructive"
            className="h-12 px-8 text-lg animate-pulse-glow"
            asChild
          >
            <Link href="/checkout">Book Your Stay</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white">
        <ArrowDown className="h-8 w-8 animate-bounce-slow" />
      </div>
    </section>
  );
}
