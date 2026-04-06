import React from "react";
import { getComponentSource } from "@/lib/registry-utils";
import { parsePropsFromSource, findExportedComponents, PropInfo } from "@/lib/props-parser";
import { cn } from "@/lib/utils";

interface ComponentPropsProps {
  name: string;        // 레지스트리에 등록된 컴포넌트 이름 (예: Navigation)
  component?: string;   // 파일 내 특정 컴포넌트 이름 (생략 시 모든 export 컴포넌트 표시)
  className?: string;
}

/**
 * 특정 컴포넌트 하나에 대한 Props Table 컴포넌트
 */
const PropsTable = ({ componentName, props, className }: { componentName: string, props: PropInfo[], className?: string }) => {
  if (props.length === 0) return null;

  return (
    <div className={cn("my-8 w-full overflow-y-auto", className)}>
      <h4 className="text-xl font-semibold mb-4 text-[var(--color-text-title)]">{componentName}</h4>
      <table className="w-full border-collapse border border-[var(--color-border-standard)]">
        <thead>
          <tr className="bg-[var(--color-table-header-bg)]">
            <th className="border border-[var(--color-border-standard)] px-4 py-2 text-left font-bold text-[var(--color-table-header-text)]">속성</th>
            <th className="border border-[var(--color-border-standard)] px-4 py-2 text-left font-bold text-[var(--color-table-header-text)]">타입</th>
            <th className="border border-[var(--color-border-standard)] px-4 py-2 text-left font-bold text-[var(--color-table-header-text)]">기본값</th>
            <th className="border border-[var(--color-border-standard)] px-4 py-2 text-left font-bold text-[var(--color-table-header-text)]">설명</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-t border-[var(--color-border-standard)] even:bg-[var(--color-bg-input-standard)]">
              <td className="border border-[var(--color-border-standard)] px-4 py-2 font-mono text-sm text-[var(--color-primary)]">
                {prop.name}
                {prop.required && <span className="text-red-500 ml-1">*</span>}
              </td>
              <td className="border border-[var(--color-border-standard)] px-4 py-2 font-mono text-xs text-[var(--color-text-title)]">
                {prop.type}
              </td>
              <td className="border border-[var(--color-border-standard)] px-4 py-2 text-sm text-[var(--color-text-body)]">
                <code>{prop.defaultValue}</code>
              </td>
              <td className="border border-[var(--color-border-standard)] px-4 py-2 text-sm text-[var(--color-text-body)]">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * 컴포넌트의 소스 코드를 읽어 Props를 자동으로 표로 렌더링합니다.
 */
export default async function ComponentProps({
  name,
  component,
  className
}: ComponentPropsProps) {
  const source = await getComponentSource(name);

  if (!source) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
        Source for <strong>{name}</strong> not found.
      </div>
    );
  }

  // 1. 단일 컴포넌트 모드 (component가 명시된 경우)
  if (component) {
    const props = await parsePropsFromSource(source, component);
    return <PropsTable componentName={component} props={props} className={className} />;
  }

  // 2. 자동 모드 (파일 내 모든 export된 컴포넌트 탐색)
  const allComponents = findExportedComponents(source);

  if (allComponents.length === 0) {
    return (
      <div className="my-6 text-sm text-[var(--color-text-sub)] italic">
        No exported components found in {name}.
      </div>
    );
  }

  // 모든 컴포넌트에 대해 Props 추출
  const results = await Promise.all(
    allComponents.map(async (compName) => ({
      name: compName,
      props: await parsePropsFromSource(source, compName)
    }))
  );

  return (
    <div className={cn("space-y-12", className)}>
      {results.map((res) => (
        <PropsTable key={res.name} componentName={res.name} props={res.props} />
      ))}
    </div>
  );
}
