import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { findImage } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  return (
    <section className="bg-background">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl")}>
            Stories from Paradise
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Don't just take our word for it. Here's what our guests have to say about their stay at Jeopan Paradise.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const image = findImage(testimonial.imageId);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                        <div className="mb-4 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5",
                                i < testimonial.rating
                                  ? "fill-accent text-accent"
                                  : "fill-muted text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                        <blockquote className="mb-6 flex-grow text-base text-muted-foreground">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            {image && (
                              <AvatarImage
                                src={image.imageUrl}
                                alt={testimonial.name}
                                data-ai-hint={image.imageHint}
                              />
                            )}
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.country}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
