import React from "react";
import PreviewLayout from "@/app/components/mdx-layout";

interface DocDemoProps {
  componentName: string;
  props?: Record<string, any>;
  children?: React.ReactNode;
  className?: string; // Wrapper className for the preview
  importPath?: string;
}

const propsToString = (props: Record<string, any>) => {
  return Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === "string") return `${key}="${value}"`;
      if (typeof value === "boolean") return value ? key : "";
      return `${key}={${JSON.stringify(value)}}`;
    })
    .filter((s) => s !== "")
    .join(" ");
};

/**
 * ComponentExample: Shows a single component preview and its code automatically.
 */
export const ComponentExample = ({
  componentName,
  props = {},
  children,
  className = "",
  importPath = "@/app/templates",
}: DocDemoProps & { component?: React.ElementType }) => {
  // We need the actual component passed in if we want to render it, 
  // but since we're in MDX, we can just use children if provided.
  
  const propStr = propsToString(props);
  const code = `import { ${componentName} } from "${importPath}/${componentName}/${componentName}";\n\n<${componentName}${propStr ? " " + propStr : ""}>${children ? "\n  " + children + "\n" : ""}</${componentName}>`;

  return (
    <div className={className}>
      <PreviewLayout
        preview={children}
        code={code}
      />
    </div>
  );
};

interface VariantDemoProps {
  component: React.ElementType;
  componentName: string;
  variants: Array<string | Record<string, any>>;
  commonProps?: Record<string, any>;
  label?: string;
  importPath?: string;
  containerClass?: string;
}

/**
 * VariantDemo: Shows multiple variants of a component (e.g., all button types) 
 * at once and automatically generates the consolidated code snippet.
 */
export const VariantDemo = ({
  component: Component,
  componentName,
  variants,
  commonProps = {},
  label = "",
  importPath = "@/app/templates",
  containerClass = "flex flex-wrap gap-2 justify-center w-full",
}: VariantDemoProps) => {
  const preview = (
    <div className={containerClass}>
      {variants.map((v, i) => {
        const p = typeof v === "string" ? { type: v } : v;
        return (
          <Component key={i} {...commonProps} {...p}>
            {label}
          </Component>
        );
      })}
    </div>
  );

  const importText = `import { ${componentName} } from "${importPath}/${componentName}/${componentName}";\n\n`;
  const codeText = variants
    .map((v) => {
      const p = { ...commonProps, ...(typeof v === "string" ? { type: v } : v) };
      const propStr = propsToString(p);
      return `<${componentName}${propStr ? " " + propStr : ""}>${label}</${componentName}>`;
    })
    .join("\n");

  return <PreviewLayout preview={preview} code={importText + codeText} />;
};
