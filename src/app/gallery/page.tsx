import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GallerySection from "@/components/landing/gallery-section";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="py-12 md:py-24 lg:py-32">
             <div className="container text-center">
                <h1 className={cn("font-headline text-4xl font-bold tracking-tight md:text-5xl")}>
                    Our Rooms & Suites
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Explore our collection of beautifully designed dormitories, private rooms, and suites. Each space is crafted to provide comfort, style, and a touch of paradise.
                </p>
            </div>
        </div>
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
