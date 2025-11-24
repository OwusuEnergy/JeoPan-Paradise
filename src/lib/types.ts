import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type RoomType = "Dormitory" | "Private Room" | "Suite";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  imageIds: string[];
  amenities: string[];
}

export interface Testimonial {
  name: string;
  country: string;
  rating: number;
  quote: string;
  imageId: string;
}

export interface BlogComment {
    id: string;
    author: string;
    authorImageId: string;
    date: string;
    text: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageId: string;
  href: string;
  author: string;
  authorImageId: string;
  date: string;
  content: string;
  relatedPostIds: string[];
  comments: BlogComment[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  imageId: string;
}
