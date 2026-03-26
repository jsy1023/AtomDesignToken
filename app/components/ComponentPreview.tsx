import React from "react";
import { getRegistryComponent } from "@/lib/registry";
import { ComponentPreviewClient } from "./ComponentPreviewClient";
import ComponentSource from "./ComponentSource";

interface ComponentPreviewProps {
  name: string;
  className?: string;
  previewClassName?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

/**
 * MDX에서 사용하는 메인 컴포넌트 프리뷰어입니다. (Server Component)
 * Shadcn/UI 패턴: name으로 레지스트리에서 Demo 컴포넌트를 찾아 렌더링합니다.
 */
export default async function ComponentPreview({
  name,
  className,
  previewClassName,
  children,
  ...props
}: ComponentPreviewProps) {
  const Component = getRegistryComponent(name);

  if (!Component) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
        Component <strong>{name}</strong> not found in registry.
      </div>
    );
  }

  return (
    <ComponentPreviewClient
      className={className}
      previewClassName={previewClassName}
      source={<ComponentSource name={name} />}
    >
      <Component {...props}>{children}</Component>
    </ComponentPreviewClient>
  );
}
