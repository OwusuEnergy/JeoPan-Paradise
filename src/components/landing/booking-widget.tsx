
"use client";

import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, addDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  Users,
  BedDouble,
  Loader2,
  CheckCircle2,
  XCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";


const bookingFormSchema = z.object({
  dates: z.object({
    from: z.date({
      required_error: "Check-in date is required.",
    }),
    to: z.date({
      required_error: "Check-out date is required.",
    }),
  }),
  guests: z.string().min(1, "Please select number of guests."),
  roomType: z.string().min(1, "Please select a room type."),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

type AvailabilityStatus = "available" | "unavailable" | "checking" | "idle";

// Mock unavailable dates (e.g., a weekend in the near future)
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

export default function BookingWidget() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityStatus>("idle");
  const [suggestedDate, setSuggestedDate] = useState<Date | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const lastScrollY = useRef(0);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY.current;

      if (currentScrollY > 200) {
        if (scrollDifference > 5) { // Scrolling down
          setIsExpanded(false);
        } else if (scrollDifference < -5) { // Scrolling up
          setIsExpanded(true);
        }
      } else {
        setIsExpanded(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      guests: "2",
      roomType: "Private Room",
    },
  });

  function checkAvailability(from: Date, to: Date): boolean {
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

  function onSubmit(data: BookingFormValues) {
    setIsLoading(true);
    setAvailability("checking");
    console.log(data);

    setTimeout(() => {
      const isAvailable = checkAvailability(data.dates.from, data.dates.to);
      
      if (isAvailable) {
        setAvailability("available");
        setSuggestedDate(null);
        toast({
          title: "Availability Checked!",
          description: "Great news! Rooms are available for your selected dates.",
        });
      } else {
        setAvailability("unavailable");
        setSuggestedDate(getNextAvailableDate(data.dates.from));
      }
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="sticky top-[63px] z-40 -mt-12">
      <div className="container animate-in fade-in-0 slide-in-from-top-10 duration-800">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="rounded-lg border bg-card p-4 shadow-lg md:p-6">
          <CollapsibleContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 items-end gap-4 md:grid-cols-4 lg:grid-cols-10">
                <div className="lg:col-span-4">
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
                                variant="outline"
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
                              selected={{from: field.value?.from, to: field.value?.to}}
                              onSelect={field.onChange}
                              numberOfMonths={2}
                              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="lg:col-span-2">
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
                <div className="lg:col-span-2">
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
                            <SelectItem value="Dormitory">Dormitory</SelectItem>
                            <SelectItem value="Private Room">Private Room</SelectItem>
                            <SelectItem value="Suite">Suite</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="lg:col-span-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      "Check Availability"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {availability === 'available' && (
              <Alert className="mt-4 border-green-500 text-green-700">
                <CheckCircle2 className="h-4 w-4 !text-green-500" />
                <AlertTitle>Rooms Available!</AlertTitle>
                <AlertDescription>
                  Good news! We have rooms available for your selected dates. Proceed to booking.
                </AlertDescription>
              </Alert>
            )}

            {availability === 'unavailable' && suggestedDate && (
              <Alert variant="destructive" className="mt-4">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Unavailable Dates</AlertTitle>
                <AlertDescription>
                  Unfortunately, we are fully booked for your selected dates. The next available check-in is {format(suggestedDate, "EEEE, LLL dd")}. Please try searching for new dates.
                </AlertDescription>
              </Alert>
            )}
          </CollapsibleContent>

          <div className="flex items-center justify-center">
             <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-1">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    <span className="sr-only">Toggle booking form</span>
                </Button>
             </CollapsibleTrigger>
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
