import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PostHeader from "@/components/blog/post-header";
import PostContent from "@/components/blog/post-content";
import RelatedPosts from "@/components/blog/related-posts";
import CommentsSection from "@/components/blog/comments-section";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter(p => post.relatedPostIds?.includes(p.id));

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <article>
          <PostHeader post={post} />
          <PostContent content={post.content} />
        </article>
        <RelatedPosts posts={relatedPosts} />
        <CommentsSection comments={post.comments} />
      </main>
      <Footer />
    </div>
  );
}
