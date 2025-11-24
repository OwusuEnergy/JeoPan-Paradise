export default function PostContent({ content }: { content: string }) {
  return (
    <div className="container py-12">
      <div
        className="prose prose-lg mx-auto max-w-3xl dark:prose-invert prose-headings:font-headline prose-a:text-primary hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
