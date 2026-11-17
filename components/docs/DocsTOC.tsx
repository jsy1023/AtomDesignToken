'use client';

import React, { useEffect, useState } from 'react';
import { GALLERY_COMPONENTS } from '@/lib/data/components';
import { Button } from '@/components/ui/Button';

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
    <aside className="w-56 shrink-0 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-(--border-subtle)/80  select-none hidden xl:flex flex-col gap-3">
      <span className="text-[11px] font-bold text-(--text-muted) uppercase tracking-wider">
        On this page
      </span>

      <ul className="flex flex-col gap-1.5 text-xs">
        <li>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollTo('getting-started')}
            className={`w-full justify-start text-left text-xs font-medium truncate h-auto py-1 px-1.5 ${
              currentActive === 'getting-started'
                ? 'text-(--accent-primary) font-bold translate-x-1'
                : 'text-(--text-secondary) hover:text-(--text-primary)'
            }`}
          >
            시작하기 (Quickstart)
          </Button>
        </li>

        {GALLERY_COMPONENTS.map((comp) => {
          const isActive = currentActive === comp.id;
          return (
            <li key={comp.id}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollTo(comp.id)}
                className={`w-full justify-between text-left text-xs font-medium truncate h-auto py-1 px-1.5 ${
                  isActive
                    ? 'text-(--accent-primary) font-bold translate-x-1'
                    : 'text-(--text-secondary) hover:text-(--text-primary)'
                }`}
              >
                <span className="truncate">{comp.name.split(' (')[0]}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-(--accent-primary) shrink-0 ml-1"></span>}
              </Button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
