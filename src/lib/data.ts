import type { Feature, Room, Testimonial, BlogPost, Experience } from "./types";
import { Wifi, Waves, ShieldCheck, Map, Briefcase, Wine, Star, Calendar, Users, BedDouble } from "lucide-react";

export const features: Feature[] = [
  {
    icon: Wifi,
    title: "Free High-Speed Wi-Fi",
    description: "Stay connected with our blazing fast internet, perfect for digital nomads and casual surfers alike.",
  },
  {
    icon: Waves,
    title: "Luxurious Swimming Pool",
    description: "Take a dip in our serene pool, an oasis of calm in the heart of paradise.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    description: "Your safety is our priority. We offer round-the-clock security for your peace of mind.",
  },
  {
    icon: Map,
    title: "Organized Tours",
    description: "Discover the best local spots with our curated tours and adventures.",
  },
  {
    icon: Briefcase,
    title: "Co-Working Space",
    description: "A dedicated space for you to work, with all the amenities you need to be productive.",
  },
  {
    icon: Wine,
    title: "Rooftop Bar",
    description: "Enjoy stunning sunsets and handcrafted cocktails at our exclusive rooftop bar.",
  },
];

export const rooms: Room[] = [
  {
    id: "dorm1",
    name: "The Voyager's Bunk",
    type: "Dormitory",
    price: 45,
    imageIds: ["room-dorm-1", "room-dorm-1a", "room-dorm-1b"],
    amenities: ["Shared Bathroom", "Locker", "A/C", "Reading Light"],
  },
  {
    id: "dorm2",
    name: "The Social Sleeper",
    type: "Dormitory",
    price: 48,
    imageIds: ["room-dorm-2", "room-dorm-2a", "room-dorm-2b"],
    amenities: ["Ensuite Bathroom", "Privacy Curtain", "Locker", "A/C"],
  },
  {
    id: "private1",
    name: "The Bohemian Hideaway",
    type: "Private Room",
    price: 120,
    imageIds: ["room-private-1", "room-private-1a", "room-private-1b"],
    amenities: ["Queen Bed", "Ensuite Bathroom", "Mini-fridge", "A/C", "Garden View"],
  },
  {
    id: "private2",
    name: "The Garden Oasis",
    type: "Private Room",
    price: 135,
    imageIds: ["room-private-2", "room-private-2a", "room-private-2b"],
    amenities: ["King Bed", "Ensuite Bathroom", "Smart TV", "A/C", "Balcony"],
  },
  {
    id: "suite1",
    name: "The Paradise Suite",
    type: "Suite",
    price: 250,
    imageIds: ["room-suite-1", "room-suite-1a", "room-suite-1b"],
    amenities: ["King Bed", "Living Area", "Kitchenette", "Rainfall Shower", "Ocean View"],
  },
  {
    id: "suite2",
    name: "The Luxe Loft",
    type: "Suite",
    price: 280,
    imageIds: ["room-suite-2", "room-suite-2a", "room-suite-2b"],
    amenities: ["Split-level", "King Bed", "Full Kitchen", "Soaking Tub", "Private Terrace"],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah L.",
    country: "Canada",
    rating: 5,
    quote: "Absolutely breathtaking! Jeopan Paradise is the perfect blend of luxury and hostel community. The rooftop bar has views to die for. I met so many amazing people. Can't wait to come back!",
    imageId: "testimonial-avatar-1",
  },
  {
    name: "Mike T.",
    country: "USA",
    quote: "As a digital nomad, the co-working space was a game-changer. Fast Wi-Fi, great coffee, and an inspiring environment. This isn't just a hostel, it's an experience.",
    imageId: "testimonial-avatar-2",
  },
  {
    name: "Chloe V.",
    country: "France",
    quote: "The attention to detail in the design is incredible. Every corner is picture-perfect. The staff were so friendly and helpful, and the organized tours were the highlight of my trip.",
    imageId: "testimonial-avatar-3",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog1",
    title: "A Foodie's Guide to Our Local Cuisine",
    excerpt: "Forget everything you thought you knew about street food. We're taking you on a journey...",
    imageId: "blog-1",
    href: "#",
  },
  {
    id: "blog2",
    title: "5 Hidden Waterfalls You Can't Miss",
    excerpt: "Just a short trip from our doors lies a world of natural wonder. Here are our top picks for...",
    imageId: "blog-2",
    href: "#",
  },
  {
    id: "blog3",
    title: "Travel with Purpose: Our Sustainability Efforts",
    excerpt: "We believe in giving back to the paradise we call home. Learn about how we're making a...",
    imageId: "blog-3",
    href: "#",
  },
];

export const experiences: Experience[] = [
    {
        id: "exp1",
        title: "Pristine Beach Day",
        description: "Just minutes away, sink your toes into white sands and turquoise waters.",
        imageId: "experience-beach"
    },
    {
        id: "exp2",
        title: "Vibrant Local Market",
        description: "Immerse yourself in local culture and find unique crafts and flavors.",
        imageId: "experience-market"
    },
    {
        id: "exp3",
        title: "Jungle Hiking Trail",
        description: "Explore lush landscapes and discover breathtaking viewpoints.",
        imageId: "experience-hike"
    }
]

export const navLinks = [
    { href: "#rooms", label: "Rooms" },
    { href: "#experience", label: "Experience" },
    { href: "#features", label: "About" },
    { href: "#contact", label: "Contact" },
]
