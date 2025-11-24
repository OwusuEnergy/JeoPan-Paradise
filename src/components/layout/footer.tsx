import Link from "next/link";
import { Palmtree, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="w-full border-t bg-card text-card-foreground">
      <div className="container grid items-center gap-8 px-4 py-12 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <Palmtree className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-semibold tracking-wide text-primary">
              Jeopan Paradise
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Where comfort meets adventure in a luxurious bohemian paradise.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <h3 className="font-semibold">Quick Links</h3>
          <Link href="#rooms" className="hover:underline" prefetch={false}>
            Our Rooms
          </Link>
          <Link href="#experience" className="hover:underline" prefetch={false}>
            The Experience
          </Link>
          <Link href="#blog" className="hover:underline" prefetch={false}>
            Blog
          </Link>
        </div>
        <div className="grid gap-2 text-sm">
          <h3 className="font-semibold">Contact</h3>
          <p>123 Paradise Lane, Heaven</p>
          <p>Email: contact@jeopan.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="#" aria-label="Facebook" prefetch={false}>
              <Facebook className="h-5 w-5 hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Instagram" prefetch={false}>
              <Instagram className="h-5 w-5 hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Twitter" prefetch={false}>
              <Twitter className="h-5 w-5 hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex items-center justify-between px-4 py-4 text-sm text-muted-foreground md:px-6">
          <p>&copy; {new Date().getFullYear()} Jeopan Paradise. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
