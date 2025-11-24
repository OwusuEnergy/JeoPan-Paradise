"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { BlogComment } from "@/lib/types";
import { findImage } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const commentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }),
});

export default function CommentsSection({ comments }: { comments: BlogComment[] }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { name: "", comment: "" },
  });

  function onSubmit(values: z.infer<typeof commentFormSchema>) {
    console.log(values);
    toast({
      title: "Comment Submitted!",
      description: "Thanks for your feedback. Your comment is awaiting moderation.",
    });
    form.reset();
  }

  return (
    <section className="border-t py-12 md:py-24">
      <div className="container max-w-3xl">
        <h2 className={cn("font-headline mb-8 text-3xl font-bold")}>
          Comments ({comments.length})
        </h2>

        <div className="space-y-8">
          {comments.map((comment) => {
            const authorImage = findImage(comment.authorImageId);
            return (
              <div key={comment.id} className="flex items-start gap-4">
                <Avatar>
                  {authorImage && <AvatarImage src={authorImage.imageUrl} alt={comment.author} />}
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.date}</p>
                  </div>
                  <p className="mt-1 text-muted-foreground">{comment.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 border-t pt-12">
          <h3 className={cn("font-headline mb-4 text-2xl font-bold")}>Leave a Comment</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Post Comment</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
