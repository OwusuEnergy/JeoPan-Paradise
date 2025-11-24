import Image from "next/image";
import { findImage } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostHeader({ post }: { post: BlogPost }) {
  const image = findImage(post.imageId);
  const authorImage = findImage(post.authorImageId);

  return (
    <header className="relative py-20 md:py-32 lg:py-40">
      <div className="absolute inset-0">
        {image && (
          <Image
            src={image.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container relative z-10 text-center text-white">
        <h1 className={cn("font-headline text-4xl font-bold md:text-5xl lg:text-6xl")}>
          {post.title}
        </h1>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Avatar>
            {authorImage && <AvatarImage src={authorImage.imageUrl} alt={post.author} data-ai-hint={authorImage.imageHint} />}
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm text-white/80">{post.date}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
