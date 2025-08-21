import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h1: ({ children }) => <h1 className="text-h1 mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-h2 mb-2 mt-8">{children}</h2>,
  h3: ({ children }) => <h3 className="text-h3 mb-2 mt-8">{children}</h3>,
  p: ({ children }) => <p className="text-standard">{children}</p>,
  hr: ({ children }) => <hr className="my-4">{children}</hr>,
  ul: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
