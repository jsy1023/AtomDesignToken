'use client';

import React, { useEffect, useState } from 'react';
import { GALLERY_COMPONENTS } from '@/lib/data/components';

interface DocsTOCProps {
  activeId: string;
  onSelectId: (id: string) => void;
}

export function DocsTOC({ activeId, onSelectId }: DocsTOCProps) {
  const [currentActive, setCurrentActive] = useState(activeId || 'getting-started');

  useEffect(() => {
    if (activeId) {
      setCurrentActive(activeId);
    }
  }, [activeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrentActive(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0
      }
    );

    const sectionIds = ['getting-started', ...GALLERY_COMPONENTS.map((c) => c.id)];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    onSelectId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="w-56 shrink-0 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-neutral-200/80 dark:border-neutral-800 select-none hidden xl:flex flex-col gap-3">
      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
        On this page
      </span>

      <ul className="flex flex-col gap-1.5 text-xs">
        <li>
          <button
            onClick={() => scrollTo('getting-started')}
            className={`text-left transition font-medium truncate w-full ${
              currentActive === 'getting-started'
                ? 'text-blue-600 dark:text-blue-400 font-bold translate-x-1'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            시작하기 (Quickstart)
          </button>
        </li>

        {GALLERY_COMPONENTS.map((comp) => {
          const isActive = currentActive === comp.id;
          return (
            <li key={comp.id}>
              <button
                onClick={() => scrollTo(comp.id)}
                className={`text-left transition font-medium truncate w-full flex items-center justify-between ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold translate-x-1'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <span>{comp.name.split(' (')[0]}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
