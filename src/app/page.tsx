import Header from "@/components/layout/header";
import HeroSection from "@/components/landing/hero-section";
import BookingWidget from "@/components/landing/booking-widget";
import FeaturesSection from "@/components/landing/features-section";
import GallerySection from "@/components/landing/gallery-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import ExperienceSection from "@/components/landing/experience-section";
import CtaSection from "@/components/landing/cta-section";
import BlogSection from "@/components/landing/blog-section";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BookingWidget />
        <FeaturesSection />
        <section id="rooms" className="bg-background/70 py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="mb-12 text-center">
                <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl")}>
                    Rooms & Suites
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                    Choose your perfect sanctuary. From social dorms to luxurious private suites, every space is designed for comfort.
                </p>
                </div>
                <GallerySection />
            </div>
        </section>
        <TestimonialsSection />
        <ExperienceSection />
        <CtaSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
