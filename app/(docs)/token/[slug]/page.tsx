export default async function TokenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/markdown/token/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [
    { slug: "color" },
    { slug: "spacing" },
    { slug: "typo" },
  ];
}

export const dynamicParams = false;
