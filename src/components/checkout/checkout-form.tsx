"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const checkoutFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  cardName: z.string().min(1, "Name on card is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(16, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().min(3, "CVC must be 3 digits").max(4, "CVC can be up to 4 digits"),
});

export default function CheckoutForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log(values);
    toast({
      title: "Booking Confirmed!",
      description: "Your trip to paradise is booked. We've sent a confirmation to your email.",
    });
    form.reset();
  }

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (234) 567-890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>The Bohemian Hideaway</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>July 25, 2024</span>
                </div>
                <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>July 29, 2024</span>
                </div>
                <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>2 Adults</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                    <span>4 nights</span>
                    <span>GHS480.00</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="text-muted-foreground">GHS62.40</span>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch space-y-4">
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>GHS542.40</span>
                </div>
            </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                 <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input placeholder="John M. Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="•••• •••• •••• ••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Button type="submit" form="checkout-form" size="lg" className="w-full">
            Confirm and Pay
        </Button>
      </div>
    </div>
  );
}
