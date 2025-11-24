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

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BookingWidget />
        <FeaturesSection />
        <GallerySection />
        <TestimonialsSection />
        <ExperienceSection />
        <CtaSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
