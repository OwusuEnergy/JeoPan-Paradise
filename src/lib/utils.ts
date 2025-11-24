import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PlaceHolderImages, type ImagePlaceholder } from "./placeholder-images";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findImage(id: string): ImagePlaceholder | undefined {
  return PlaceHolderImages.find((img) => img.id === id);
}
