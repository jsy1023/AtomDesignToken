import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, type = 'single', className = '' }) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (type === 'single') {
      setOpenIds(openIds.includes(id) ? [] : [id]);
    } else {
      setOpenIds(openIds.includes(id) ? openIds.filter((item) => item !== id) : [...openIds, id]);
    }
  };

  return (
    <div className={`atom-accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="atom-accordion-item">
            <button
              type="button"
              className="atom-accordion-trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="atom-accordion-icon" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                ▾
              </span>
            </button>
            {isOpen && <div className="atom-accordion-content">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
