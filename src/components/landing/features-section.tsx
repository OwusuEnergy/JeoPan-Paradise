import { features } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-background">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl")}>
            The Jeopan Experience
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            We blend hostel affordability with hotel-level luxury, creating an unforgettable stay.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-in fade-in slide-in-from-bottom-10 duration-800"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
            >
              <Card className="h-full text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
