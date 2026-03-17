import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
  h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
  h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
  p: ({ children, ...props }) => <p {...props}>{children}</p>,
  hr: ({ children, ...props }) => (
    <hr className="border-border-standard my-4" {...props}>
      {children}
    </hr>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6" {...props}>
      {children}
    </ol>
  ),
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
