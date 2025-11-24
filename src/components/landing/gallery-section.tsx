"use client";

import { useState } from "react";
import Image from "next/image";
import { rooms } from "@/lib/data";
import type { Room, RoomType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { findImage } from "@/lib/utils";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const roomTypes: ("All" | RoomType)[] = [
  "All",
  "Dormitory",
  "Private Room",
  "Suite",
];

const RoomCard = ({ room }: { room: Room }) => {
  const image = findImage(room.imageId);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group animate-in fade-in-0 duration-800 overflow-hidden cursor-pointer">
          <div className="overflow-hidden">
            {image && (
              <Image
                src={image.imageUrl}
                alt={room.name}
                width={800}
                height={600}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold">{room.name}</h3>
            <p className="text-sm text-muted-foreground">{room.type}</p>
          </CardContent>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button variant="secondary">View Details</Button>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            {image && (
                <Image
                    src={image.imageUrl}
                    alt={room.name}
                    width={800}
                    height={600}
                    className="rounded-lg object-cover"
                    data-ai-hint={image.imageHint}
                />
            )}
          </div>
          <div className="flex flex-col">
            <DialogHeader>
              <Badge className="w-fit">{room.type}</Badge>
              <DialogTitle className={cn("font-headline text-3xl mt-2")}>{room.name}</DialogTitle>
            </DialogHeader>
            <p className="mt-4 text-3xl font-semibold text-primary">
              ${room.price}
              <span className="text-sm font-normal text-muted-foreground">/night</span>
            </p>
            <DialogDescription className="mt-4 text-base">
              A beautifully appointed room offering the best in comfort and style.
            </DialogDescription>
            <ul className="mt-6 space-y-2">
              {room.amenities.map(amenity => (
                <li key={amenity} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{amenity}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" variant="destructive" className="mt-auto">Book Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function GallerySection() {
  const [filter, setFilter] = useState<"All" | RoomType>("All");

  const filteredRooms =
    filter === "All" ? rooms : rooms.filter((room) => room.type === filter);

  return (
    <section id="rooms" className="bg-background/70">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl")}>
            Rooms & Suites
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Choose your perfect sanctuary. From social dorms to luxurious private suites, every space is designed for comfort.
          </p>
        </div>
        <div className="mb-8 flex justify-center gap-2">
          {roomTypes.map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              onClick={() => setFilter(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
