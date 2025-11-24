
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CheckoutForm from "@/components/checkout/checkout-form";
import { cn } from "@/lib/utils";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const roomType = searchParams.get('roomType');

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className={cn("font-headline text-4xl font-bold tracking-tight md:text-5xl")}>
              Confirm Your Booking
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              You're just a few steps away from your paradise escape.
            </p>
          </div>
          <div className="mt-12">
            <CheckoutForm preselectedRoom={roomType} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
