
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import Image from "next/image";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BedDouble,
  Calendar as CalendarIcon,
  Users,
} from "lucide-react";
import { cn, findImage } from "@/lib/utils";
import { rooms } from "@/lib/data";

const checkoutFormSchema = z.object({
  dates: z
    .object({
      from: z.date({ required_error: "Check-in date is required." }),
      to: z.date({ required_error: "Check-out date is required." }),
    })
    .refine((data) => data.from && data.to, "Both dates are required"),
  guests: z.string().min(1, "Please select number of guests."),
  roomType: z.string().min(1, "Please select a room type."),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  cardName: z.string().min(1, "Name on card is required"),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().min(3, "CVC must be 3 digits").max(4, "CVC can be up to 4 digits"),
});

export default function CheckoutForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      guests: "2",
      roomType: "The Bohemian Hideaway",
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

  const watchDates = form.watch("dates");
  const watchGuests = form.watch("guests");
  const watchRoomType = form.watch("roomType");

  const selectedRoom = rooms.find(room => room.name === watchRoomType);
  const roomImage = selectedRoom ? findImage(selectedRoom.imageIds[0]) : null;

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log(values);
    toast({
      title: "Booking Confirmed!",
      description: "Your trip to paradise is booked. We've sent a confirmation to your email.",
    });
    form.reset();
  }

  const calculateNights = () => {
    if (watchDates?.from && watchDates?.to) {
      const diffTime = Math.abs(watchDates.to.getTime() - watchDates.from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 0;
  }

  const nights = calculateNights();
  const pricePerNight = selectedRoom?.price || 0;
  const subtotal = nights * pricePerNight;
  const taxes = subtotal * 0.13;
  const total = subtotal + taxes;

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="dates"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-in / Check-out</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value?.from && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value?.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                    {format(field.value.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(field.value.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date range</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value?.from}
                            selected={{
                              from: field.value?.from,
                              to: field.value?.to,
                            }}
                            onSelect={field.onChange}
                            numberOfMonths={1}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guests</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <Users className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(8)].map((_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              {i + 1} Guest{i > 0 && "s"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger>
                            <BedDouble className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select a room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rooms.map(room => (
                            <SelectItem key={room.id} value={room.name}>
                              {room.type} - {room.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                {selectedRoom && (
                  <CardDescription>{selectedRoom.name} - {selectedRoom.type}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
              {roomImage && (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image 
                    src={roomImage.imageUrl} 
                    alt={selectedRoom?.name || ""} 
                    fill
                    className="object-cover"
                    data-ai-hint={roomImage.imageHint}
                  />
                </div>
              )}
                <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{watchDates?.from ? format(watchDates.from, "LLL dd, yyyy") : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{watchDates?.to ? format(watchDates.to, "LLL dd, yyyy") : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{watchGuests} Adult{parseInt(watchGuests) > 1 ? 's' : ''}</span>
                </div>
                <Separator />
                {nights > 0 && (
                <>
                <div className="flex justify-between font-semibold">
                    <span>{nights} night{nights > 1 && 's'} x GHS{pricePerNight.toFixed(2)}</span>
                    <span>GHS{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="text-muted-foreground">GHS{taxes.toFixed(2)}</span>
                </div>
                </>
                )}
            </CardContent>
            <CardFooter className="flex-col items-stretch space-y-4">
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>GHS{total.toFixed(2)}</span>
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

    