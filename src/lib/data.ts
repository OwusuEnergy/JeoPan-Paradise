import type { Feature, Room, Testimonial, BlogPost, Experience, BlogComment } from "./types";
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

const blogComments: BlogComment[] = [
    { id: "c1", author: "Alex Johnson", authorImageId: "testimonial-avatar-2", date: "2 days ago", text: "Great guide! I never knew about the night market. I'll be checking it out tonight." },
    { id: "c2", author: "Maria Garcia", authorImageId: "testimonial-avatar-1", date: "1 day ago", text: "The food here is incredible. Thanks for the recommendations!" },
]

export const blogPosts: BlogPost[] = [
  {
    id: "a-foodies-guide-to-our-local-cuisine",
    title: "A Foodie's Guide to Our Local Cuisine",
    excerpt: "Forget everything you thought you knew about street food. We're taking you on a journey to discover the most delicious and authentic flavors our town has to offer.",
    imageId: "blog-1",
    href: "/blog/a-foodies-guide-to-our-local-cuisine",
    author: "Casey Lee",
    authorImageId: "testimonial-avatar-3",
    date: "July 12, 2024",
    content: `<p>Welcome, adventurous eaters! If you think you know food, prepare to have your mind (and taste buds) blown. Our little slice of paradise is a melting pot of flavors, offering everything from savory street-side snacks to exquisite seafood feasts. In this guide, we'll take you on a culinary tour of the must-try dishes that define our local food scene.</p><h3>The Morning Ritual: Coffee and Pastries</h3><p>Start your day like a local with a cup of robust, locally-grown coffee. The beans here have a unique chocolatey note that you won't find anywhere else. Pair it with a 'pan de coco,' a slightly sweet bread roll with a gooey coconut filling. It's the perfect fuel for a day of exploration.</p><h3>Lunch on the Go: Street Food Staples</h3><p>The heart of our cuisine beats on its streets. Don't be shy; dive into the world of street food. Look for vendors selling 'pinchos,' which are grilled skewers of marinated chicken or pork. Another must-try is the 'arepa de huevo,' a deep-fried corn cake stuffed with a whole egg. It's a crispy, savory delight.</p><h3>The Main Event: Fresh Seafood Dinner</h3><p>Being a coastal town, our seafood is second to none. For dinner, find a restaurant by the beach and order the 'pescado frito,' a whole fried fish served with coconut rice and patacones (fried plantains). It’s simple, fresh, and utterly delicious. The sound of the waves crashing as you eat is just a bonus!</p>`,
    relatedPostIds: ["5-hidden-waterfalls-you-cant-miss", "travel-with-purpose-our-sustainability-efforts"],
    comments: blogComments,
  },
  {
    id: "5-hidden-waterfalls-you-cant-miss",
    title: "5 Hidden Waterfalls You Can't Miss",
    excerpt: "Just a short trip from our doors lies a world of natural wonder. Here are our top picks for breathtaking waterfalls that are off the beaten path.",
    imageId: "blog-2",
    href: "/blog/5-hidden-waterfalls-you-cant-miss",
    author: "Alex Johnson",
    authorImageId: "testimonial-avatar-2",
    date: "July 8, 2024",
    content: `<p>Ready to chase some waterfalls? While the beaches are stunning, the true magic of our region lies inland, hidden within the lush jungle. We've rounded up five incredible waterfalls that offer a refreshing escape from the tropical heat. Lace up your hiking boots and let's go!</p><h3>1. El Salto Escondido</h3><p>True to its name ("The Hidden Jump"), this waterfall requires a bit of a trek to reach, but the reward is a secluded turquoise pool perfect for swimming. The trail itself is an adventure, winding through dense foliage and over hanging bridges.</p><h3>2. La Cascada de los Sueños</h3><p>Known as "The Waterfall of Dreams," this is one of the most photogenic spots on the island. A curtain of water cascades over a moss-covered cliff into a crystal-clear cenote. Go early in the morning to catch the light filtering through the trees.</p><h3>3. El Chorro Macho</h3><p>This powerful waterfall is easily accessible and perfect for a quick trip. You can walk behind the falls for a unique perspective and a refreshing spray. Legend has it the waters have rejuvenating properties!</p>`,
    relatedPostIds: ["a-foodies-guide-to-our-local-cuisine", "travel-with-purpose-our-sustainability-efforts"],
    comments: [],
  },
  {
    id: "travel-with-purpose-our-sustainability-efforts",
    title: "Travel with Purpose: Our Sustainability Efforts",
    excerpt: "We believe in giving back to the paradise we call home. Learn about how we're making a positive impact on the environment and our local community.",
    imageId: "blog-3",
    href: "/blog/travel-with-purpose-our-sustainability-efforts",
    author: "Maria Garcia",
    authorImageId: "testimonial-avatar-1",
    date: "July 1, 2024",
    content: `<p>At Jeopan Paradise, we're passionate about preserving the natural beauty that makes our home so special. We believe that tourism can and should be a force for good. That's why we've implemented a number of initiatives to minimize our environmental footprint and support our local community.</p><h3>Reducing Our Footprint</h3><p>From solar panels on our roof to a comprehensive recycling and composting program, we're committed to reducing waste and conserving energy. We've eliminated single-use plastics and source our water from a natural spring, which is then filtered on-site.</p><h3>Supporting Local</h3><p>We believe that a thriving community is essential for sustainable tourism. We partner with local farmers and artisans to source the food for our cafe and the decor for our rooms. By staying with us, you're directly contributing to the local economy and helping to preserve traditional crafts and agricultural practices.</p>`,
    relatedPostIds: ["a-foodies-guide-to-our-local-cuisine", "5-hidden-waterfalls-you-cant-miss"],
    comments: [],
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
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "#rooms", label: "Rooms" },
    { href: "#experience", label: "Experience" },
    { href: "#features", label: "About" },
    { href: "#contact", label: "Contact" },
]
