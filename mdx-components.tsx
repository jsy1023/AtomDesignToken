import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

// 문서화 전용 컴포넌트
import ComponentPreview from "@/app/components/ComponentPreview";
import ComponentSource from "@/app/components/ComponentSource";
import { Callout } from "@/app/components/Callout";
import { Steps, Step } from "@/app/components/Steps";
import MdxCodeBlock from "@/app/components/MdxCodeBlock";
import ComponentProps from "@/app/components/ComponentProps";

// 디자인 시스템 컴포넌트 (레지스트리 활용 권장되지만, 직접 매핑도 유지)
import { Button } from "@/app/templates/Button/Button";
import { Badge } from "@/app/templates/Badge/Badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/app/templates/Card/Card";
import { Navigation, NavBrand, NavList, NavItem } from "@/app/templates/Navigation/Navigation";
import { Sidemenu } from "@/app/templates/Sidemenu/Sidemenu";
import { Modal, ModalContent } from "@/app/templates/Modal/Modal";
import { Toast } from "@/app/templates/Toast/Toast";
import Tab from "@/app/templates/Tab/Tab";

// Form 및 기타 컴포넌트 추가
import { Input, Select, Radio, Checkbox, Label } from "@/app/templates/Form/Form";
import Table from "@/app/templates/Table/Table";
import Pagination from "@/app/templates/Pagination/Pagination";
import { Collapse } from "@/app/templates/Collapse/Collapse";
import TOC from "@/app/templates/TOC/TOC";

const customComponents = {
  // --- 전문가급 HTML 요소 스타일링 (Shadcn/UI 스타일) ---
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-[var(--color-text-title)]",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}
      className={cn(
        "mt-10 scroll-m-20 border-b border-[var(--color-border-standard)] pb-1 text-3xl font-semibold tracking-tight first:mt-0 text-[var(--color-text-title)]",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-[var(--color-text-title)]",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-[var(--color-text-title)]",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6 text-[var(--color-text-body)]", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2 text-[var(--color-text-body)]", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-[var(--color-primary)] pl-6 italic text-[var(--color-text-sub)]",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8 border-[var(--color-border-standard)]" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full border-collapse border border-[var(--color-border-standard)]", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t border-[var(--color-border-standard)] p-0 even:bg-[var(--color-bg-input-standard)]", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border border-[var(--color-border-standard)] px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right bg-[var(--color-table-header-bg)] text-[var(--color-table-header-text)]",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border border-[var(--color-border-standard)] px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right text-[var(--color-text-body)]",
        className
      )}
      {...props}
    />
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      className="rounded-md border border-[var(--color-border-standard)] my-4"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
  // MDX 마크다운 코드블록(```tsx 등) — hljs 서버사이드 하이라이팅 + Collapse
  pre: (props) => <MdxCodeBlock {...props} />,
  // 인라인 코드 (`code`) 스타일
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-[var(--color-bg-input-standard)] px-[0.3rem] py-[0.2rem] font-mono text-sm text-[var(--color-text-title)]",
        className
      )}
      {...props}
    />
  ),


  // --- 문서화 전역 컴포넌트 ---
  ComponentPreview,
  ComponentSource,
  ComponentProps,
  Callout,
  Steps,
  Step,

  // --- 디자인 시스템 컴포넌트 ---
  Button,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Navigation,
  NavBrand,
  NavList,
  NavItem,
  Sidemenu,
  Modal,
  ModalContent,
  Toast,
  Tab,
  Input,
  Select,
  Radio,
  Checkbox,
  Label,
  Table,
  Pagination,
  Collapse,
  TOC,

  // --- 프레임워크 컴포넌트 ---
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  Image,
} satisfies MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...customComponents,
  };
}
