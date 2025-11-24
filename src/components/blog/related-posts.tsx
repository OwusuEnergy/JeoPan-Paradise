import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types";
import { findImage } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-background/70 py-12 md:py-24">
      <div className="container">
        <h2 className={cn("font-headline mb-8 text-center text-3xl font-bold")}>
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const image = findImage(post.imageId);
            return (
              <Card key={post.id} className="group flex h-full flex-col overflow-hidden">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
