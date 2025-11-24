import Image from "next/image";
import { experiences } from "@/lib/data";
import { findImage } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ExperienceSection() {
  const mapImage = findImage("experience-map");
  return (
    <section id="experience" className="bg-background/70">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl")}>
            Discover the Local Experience
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Your adventure doesn't stop at our doorstep. Explore the vibrant culture and natural beauty that surrounds us.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
                <h3 className="font-headline text-2xl font-bold">Top Experiences Curated For You</h3>
                <div className="space-y-4">
                    {experiences.map(exp => {
                        const expImage = findImage(exp.imageId)
                        return (
                            <div key={exp.id} className="flex items-start gap-4">
                                {expImage && 
                                    <Image 
                                        src={expImage.imageUrl} 
                                        alt={exp.title}
                                        width={150}
                                        height={100}
                                        className="rounded-lg object-cover"
                                        data-ai-hint={expImage.imageHint}
                                    />
                                }
                                <div>
                                    <h4 className="font-semibold">{exp.title}</h4>
                                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex items-center justify-center">
                {mapImage && (
                    <Image
                        src={mapImage.imageUrl}
                        alt="Map of local area"
                        width={1200}
                        height={800}
                        className="rounded-lg object-cover shadow-lg"
                        data-ai-hint={mapImage.imageHint}
                    />
                )}
            </div>
        </div>
      </div>
    </section>
  );
}
