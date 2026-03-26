import { useMDXComponents } from "../../../../mdx-components";

export default async function ComponentsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(`@/markdown/components/${slug}.mdx`);
  const components = useMDXComponents({});

  return <Post components={components} />;
}

export function generateStaticParams() {
  return [
    { slug: "input" },
    { slug: "select" },
    { slug: "badge" },
    { slug: "button" },
    { slug: "card" },
    { slug: "checkbox" },
    { slug: "radio" },
    { slug: "collapse" },
    { slug: "global-nav" },
    { slug: "tab" },
    { slug: "table" },
    { slug: "toc" },
    { slug: "pagination" },
    { slug: "toast" },
    { slug: "modal" },
  ];
}

export const dynamicParams = false;
