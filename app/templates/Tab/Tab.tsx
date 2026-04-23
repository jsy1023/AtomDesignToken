"use client";

import React, { createContext, useContext, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs compound components must be used within a <Tabs> component.");
  return context;
};

export const Tabs = ({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`flex flex-col w-full ${className || ""}`}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`tab ${className || ""}`}>{children}</div>;
};

export const TabsTrigger = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`tab-nav-item ${isActive ? "tab-nav-item-active" : ""} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { activeTab } = useTabsContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (activeTab === value && contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power4.out" }
      );
    }
  }, [activeTab]);

  if (activeTab !== value) return null;

  return (
    <div className={`tab-content ${className || ""}`}>
      <div ref={contentRef} className="tab-content-item">
        {children}
      </div>
    </div>
  );
};
