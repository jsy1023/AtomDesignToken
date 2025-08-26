export default async function ComponentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/markdown/components/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [
    { slug: "input" },
    { slug: "select" },
    { slug: "badge" },
    { slug: "button" },
    { slug: "checkbox" },
    { slug: "radio" },
    { slug: "collapse" },
    { slug: "pagination" },
    { slug: "tab" },
    { slug: "table" },
    { slug: "toc" },
  ];
}

export const dynamicParams = false;
