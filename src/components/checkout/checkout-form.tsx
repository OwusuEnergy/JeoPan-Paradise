
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format, addDays } from "date-fns";
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
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn, findImage } from "@/lib/utils";
import { rooms } from "@/lib/data";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const checkoutFormSchema = z.object({
  checkin: z.date({ required_error: "Check-in date is required." }),
  checkout: z.date({ required_error: "Check-out date is required." }),
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
}).refine(data => data.checkout > data.checkin, {
  message: "Check-out date must be after check-in date.",
  path: ["checkout"],
});

type AvailabilityStatus = "available" | "unavailable" | "idle";

const getMockUnavailableDates = () => {
  const today = new Date();
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7));
  return [
    new Date(nextFriday),
    addDays(nextFriday, 1),
    addDays(nextFriday, 2),
  ];
};
const unavailableDates = getMockUnavailableDates();

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

  const watchCheckin = form.watch("checkin");
  const watchCheckout = form.watch("checkout");
  const watchGuests = form.watch("guests");
  const watchRoomType = form.watch("roomType");

  const selectedRoom = rooms.find(room => room.name === watchRoomType);
  const roomImage = selectedRoom ? findImage(selectedRoom.imageIds[0]) : null;

  const [availability, setAvailability] = React.useState<AvailabilityStatus>("idle");
  const [suggestedDate, setSuggestedDate] = React.useState<Date | null>(null);

  function checkAvailability(from: Date, to: Date): boolean {
    if (!from || !to) return true;
    const fromDay = new Date(from.setHours(0,0,0,0));
    return !unavailableDates.some(unavailableDate => 
      fromDay.getTime() === unavailableDate.getTime()
    );
  }

  function getNextAvailableDate(from: Date): Date {
      let nextDate = addDays(from, 1);
      while(!checkAvailability(nextDate, addDays(nextDate, 1))) {
        nextDate = addDays(nextDate, 1);
      }
      return nextDate;
  }

  React.useEffect(() => {
    if (watchCheckin && watchCheckout) {
      const isAvailable = checkAvailability(watchCheckin, watchCheckout);
      if (isAvailable) {
        setAvailability("available");
        setSuggestedDate(null);
      } else {
        setAvailability("unavailable");
        setSuggestedDate(getNextAvailableDate(watchCheckin));
      }
    } else {
      setAvailability("idle");
    }
  }, [watchCheckin, watchCheckout]);

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log(values);
    
    if (availability === 'unavailable') {
        toast({
            variant: "destructive",
            title: "Unavailable Dates",
            description: "Please select an available date range before booking.",
        });
        return;
    }

    toast({
      title: "Booking Confirmed!",
      description: "Your trip to paradise is booked. We've sent a confirmation to your email.",
    });
    form.reset();
  }

  const calculateNights = () => {
    if (watchCheckin && watchCheckout) {
      const diffTime = Math.abs(watchCheckout.getTime() - watchCheckin.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
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
                  name="checkin"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-in Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "LLL dd, y")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="checkout"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Check-out Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "LLL dd, y")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < (watchCheckin || new Date(new Date().setHours(0, 0, 0, 0)))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               {availability === 'available' && watchCheckin && watchCheckout && (
                <Alert className="border-green-500 text-green-700">
                  <CheckCircle2 className="h-4 w-4 !text-green-500" />
                  <AlertTitle>Dates Available!</AlertTitle>
                  <AlertDescription>
                    Good news! This room is available for your selected dates.
                  </AlertDescription>
                </Alert>
              )}

              {availability === 'unavailable' && suggestedDate && (
                 <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Unavailable Dates</AlertTitle>
                  <AlertDescription>
                    Unfortunately, this room is booked for your selected check-in date. The next available check-in is {format(suggestedDate, "EEEE, LLL dd")}. Please try new dates.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
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
                        <Input placeholder="Last Name" {...field} />
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
                      <Input placeholder="your@email.com" {...field} />
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
                      <Input placeholder="Phone Number" {...field} />
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
                    <span>{watchCheckin ? format(watchCheckin, "LLL dd, yyyy") : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{watchCheckout ? format(watchCheckout, "LLL dd, yyyy") : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{watchGuests} Adult{parseInt(watchGuests) > 1 ? 's' : ''}</span>
                </div>
                <Separator />
                {nights > 0 && selectedRoom ? (
                <>
                <div className="flex justify-between font-semibold">
                    <span>{nights} night{nights > 1 && 's'} x GH₵{pricePerNight.toFixed(2)}</span>
                    <span>GH₵{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees (13%)</span>
                    <span className="text-muted-foreground">GH₵{taxes.toFixed(2)}</span>
                </div>
                </>
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    Please select your dates to see the price breakdown.
                  </div>
                )}
            </CardContent>
            <CardFooter className="flex-col items-stretch space-y-4">
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>GH₵{total.toFixed(2)}</span>
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
                        <Input placeholder="Name on Card" {...field} />
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
        
        <Button type="submit" form="checkout-form" size="lg" className="w-full" disabled={availability === 'unavailable'}>
            Confirm and Pay
        </Button>
      </div>
    </div>
  );
}
