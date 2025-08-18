export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/markdown/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [{ slug: "input" }, { slug: "select" }];
}

export const dynamicParams = false;
