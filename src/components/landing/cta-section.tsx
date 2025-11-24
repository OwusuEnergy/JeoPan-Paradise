import Image from "next/image";
import { Button } from "@/components/ui/button";
import { findImage } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CtaSection() {
  const ctaImage = findImage("cta-background");

  return (
    <section className="relative p-0">
        <div className="relative h-[60vh] min-h-[400px]">
            {ctaImage && (
                <Image
                src={ctaImage.imageUrl}
                alt={ctaImage.description}
                fill
                className="object-cover"
                data-ai-hint={ctaImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-primary/70" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
                <h2 className={cn("font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl")}>
                Ready for Your Paradise Escape?
                </h2>
                <p className="mt-4 max-w-2xl text-lg md:text-xl">
                Your adventure awaits. Secure your spot in paradise today.
                </p>
                <Button size="lg" variant="destructive" className="mt-8 h-12 px-8 text-lg animate-pulse-glow">
                Book Now
                </Button>
            </div>
      </div>
    </section>
  );
}
