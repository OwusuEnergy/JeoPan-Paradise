import Image from "next/image";
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
        <div className="absolute inset-0 bg-black/50" />
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
          >
            Book Your Stay
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white">
        <ArrowDown className="h-8 w-8 animate-bounce-slow" />
      </div>
    </section>
  );
}
