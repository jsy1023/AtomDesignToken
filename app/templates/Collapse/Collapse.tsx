"use client";

import { createContext, useContext, useState, ReactNode, useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// Types
export interface CollapseProps {
  children: ReactNode;
  type?: "accordion" | "collapse";
  defaultActiveKeys?: (string | number)[];
}

interface CollapseContextValue {
  type: "accordion" | "collapse";
  activeKeys: Set<string | number>;
  toggle: (key: string | number) => void;
}

const CollapseContext = createContext<CollapseContextValue | undefined>(undefined);

const useCollapseContext = () => {
  const context = useContext(CollapseContext);
  if (!context) {
    return { type: "collapse" as const, activeKeys: new Set<string | number>(), toggle: () => {} };
  }
  return context;
};

// Provider
const CollapseProvider = ({ 
  children, 
  type = "collapse", 
  defaultActiveKeys = [] 
}: CollapseProps) => {
  const [activeKeys, setActiveKeys] = useState<Set<string | number>>(new Set(defaultActiveKeys));

  const toggle = (key: string | number) => {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        if (type === "accordion") {
          next.clear();
        }
        next.add(key);
      }
      return next;
    });
  };

  return (
    <CollapseContext.Provider value={{ type, activeKeys, toggle }}>
      {children}
    </CollapseContext.Provider>
  );
};

// Root Container
const Collapse = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`collapse-group ${className || ""}`}>{children}</div>;
};

// Item Context for child components
const ItemContext = createContext<{ value: string | number } | undefined>(undefined);
const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error("Collapse sub-components must be used within CollapseItem");
  return context;
};

const CollapseItem = ({ 
  value, 
  children, 
  className 
}: { 
  value: string | number; 
  children: ReactNode; 
  className?: string;
}) => {
  const { activeKeys } = useCollapseContext();
  const isOpen = activeKeys.has(value);

  return (
    <ItemContext.Provider value={{ value }}>
      <div 
        className={`collapse-item ${isOpen ? "open" : "closed"} ${className || ""}`}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
};

const CollapseHeader = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) => {
  const { value } = useItemContext();
  const { activeKeys, toggle } = useCollapseContext();
  const isOpen = activeKeys.has(value);
  const iconRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: isOpen ? 90 : 0,
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: true
      });
    }
  }, [isOpen]);

  return (
    <div 
      className={`collapse-header cursor-pointer flex items-center justify-between ${className || ""}`} 
      onClick={() => toggle(value)}
    >
      {children}
      <span
        ref={iconRef}
        className="material-symbols-outlined collapse-icon"
      >
        keyboard_arrow_right
      </span>
    </div>
  );
};

const CollapseContent = ({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string;
}) => {
  const { value } = useItemContext();
  const { activeKeys } = useCollapseContext();
  const isOpen = activeKeys.has(value);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      // 열기: 현재 높이가 0이거나 display: none인 상태에서도 부드럽게 시작할 수 있도록 처리
      gsap.fromTo(contentRef.current, 
        { height: 0, opacity: 0, display: "block" },
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            // 애니메이션 완료 후 height를 auto로 고정하여 반응형 대응
            if (contentRef.current) {
              gsap.set(contentRef.current, { clearProps: "height" });
            }
          }
        }
      );
    } else {
      // 닫기
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => {
          if (contentRef.current && !isOpen) {
            gsap.set(contentRef.current, { display: "none" });
          }
        }
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={contentRef}
      className={`collapse-content overflow-hidden ${className || ""}`}
      style={{ height: 0, opacity: 0, display: "none" }}
    >
      <div style={{ padding: "var(--spacing-common-x)" }}>
        {children}
      </div>
    </div>
  );
};

const NodeCollapse = ({ 
  type = "collapse", 
  collapses 
}: { 
  type?: "accordion" | "collapse"; 
  collapses: { title: ReactNode; content: ReactNode }[];
}) => {
  return (
    <CollapseProvider type={type}>
      <Collapse>
        {collapses.map((item, index) => (
          <CollapseItem key={index} value={index}>
            <CollapseHeader>{item.title}</CollapseHeader>
            <CollapseContent>{item.content}</CollapseContent>
          </CollapseItem>
        ))}
      </Collapse>
    </CollapseProvider>
  );
};

export {
  Collapse,
  CollapseProvider,
  CollapseItem,
  CollapseHeader,
  CollapseContent,
  NodeCollapse
};
