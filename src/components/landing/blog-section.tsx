import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { findImage } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogSection() {
  return (
    <section id="blog" className="bg-background/70">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className={cn("font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl")}>
            From Our Blog
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Get inspired with our latest stories, tips, and guides for the modern traveler.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => {
            const image = findImage(post.imageId);
            return (
              <div
                key={post.id}
                className="animate-in fade-in slide-in-from-bottom-10 duration-800"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
              >
              <Card className="group flex h-full flex-col overflow-hidden">
                {image && (
                  <div className="overflow-hidden">
                    <Link href={post.href} prefetch={false}>
                      <Image
                        src={image.imageUrl}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                      />
                    </Link>
                  </div>
                )}
                <CardHeader>
                  <Link href={post.href} prefetch={false}>
                    <h3 className="text-lg font-semibold hover:text-primary">{post.title}</h3>
                  </Link>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col">
                  <p className="flex-grow text-sm text-muted-foreground">{post.excerpt}</p>
                  <Link href={post.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary" prefetch={false}>
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
