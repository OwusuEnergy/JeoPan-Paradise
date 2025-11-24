"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.75 13.96c.25.13.41.2.52.32.11.12.15.31.11.5-.04.19-.2.38-.41.56-.21.18-.46.31-.76.41-.3.1-.65.11-1.05.05-.4-.06-.8-.2-1.15-.4-.35-.2-.7-.46-1.05-.78-.35-.32-.65-.68-.9-1.06-.25-.38-.45-.78-.6-1.18-.15-.4-.2-.8-.15-1.15s.15-.65.35-1 .4-.65.65-.9c.25-.25.5-.45.8-.6s.55-.25.8-.3c.25-.05.5,0,.7.1.2.1.4.25.55.45.15.2.25.4.3.6s.05.4,0,.6c-.05.2-.1.35-.2.5s-.2.3-.3.4-.2.15-.35.2c-.15.05-.25.1-.35.1s-.2,0-.3-.05c-.1-.05-.2-.1-.3-.15l-.3-.15c-.6-.3-1.15-.45-1.65-.45-.5,0-1,.1-1.4.3s-.75.5-1.05.85c-.3.35-.5.75-.65 1.2s-.2 1-.15 1.5c.05.5.2 1 .45 1.5s.6 1,1 1.45c.4.45.85.8 1.35 1.1s1.05.5,1.6.6c.55.1,1.1.05,1.6-.1.5-.15.95-.4,1.3-.75.35-.35.6-.8.7-1.3.1-.5,0-1-.1-1.5s-.3-1-.55-1.45c-.1-.2-.25-.4-.4-.55-.15-.15-.3-.25-.5-.35-.2-.1-.4-.1-.6-.05Z" />
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
              <WhatsAppIcon className="w-6 h-6" />
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
