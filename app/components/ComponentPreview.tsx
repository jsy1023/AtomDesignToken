import React from "react";
import { getRegistryComponent } from "@/lib/registry";
import { ComponentPreviewClient } from "./ComponentPreviewClient";
import ComponentSource from "./ComponentSource";

interface ComponentPreviewProps {
  name: string;
  className?: string;
  previewClassName?: string;
  children?: React.ReactNode;
  // props to pass to the previewed component
  [key: string]: any;
}

/**
 * MDX에서 사용하는 메인 컴포넌트 프리뷰어입니다. (Server Component)
 * 이름을 기반으로 실제 컴포넌트와 소스 코드를 연결합니다.
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
      {children ? children : <Component {...props} />}
    </ComponentPreviewClient>
  );
}
