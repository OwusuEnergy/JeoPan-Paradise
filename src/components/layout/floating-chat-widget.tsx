"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.89-5.451 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);


const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.6 5.82h2.75v5.1h-2.75V5.82ZM13.84 5.82h2.75v11.3h-2.75V5.82h.01Z M12.98 10.3c-1.11 0-2.11-.4-2.88-1.13V17.1h-2.75V8.58c1.6.95 3.51 1.13 5.63 1.13v2.86c-1.47-.28-2.92-.85-4.22-1.66v2.86c.96.53 2.05.8 3.19.8.52 0 1.04-.08 1.54-.25v2.87c-.5.11-1.02.17-1.54.17Z"/>
    </svg>
);


export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div
          className={cn(
            "flex flex-col items-center gap-2 transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <Button asChild size="icon" className="rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white w-12 h-12">
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="w-7 h-7" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </Button>
          <Button asChild size="icon" className="rounded-full bg-black hover:bg-gray-800 text-white w-12 h-12">
            <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer">
                <TikTokIcon className="w-6 h-6" />
                <span className="sr-only">TikTok</span>
            </a>
          </Button>
          <Button asChild size="icon" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground w-12 h-12">
            <a href="mailto:contact@jeopan.com">
              <Mail className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
          <Button asChild size="icon" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground w-12 h-12">
            <a href="tel:+1234567890">
              <Phone className="w-6 h-6" />
              <span className="sr-only">Phone</span>
            </a>
          </Button>
        </div>

        <Button
          size="icon"
          variant="destructive"
          className="rounded-full w-16 h-16 shadow-lg mt-4 animate-pulse-glow"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
          <span className="sr-only">Toggle chat options</span>
        </Button>
      </div>
    </div>
  );
}
