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
  return [{ slug: "input" }, { slug: "select" }, { slug: "badge" }];
}

export const dynamicParams = false;
