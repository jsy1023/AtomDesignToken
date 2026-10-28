import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="atom-card w-full max-w-lg p-6 bg-[var(--atom-bg-surface)] rounded-[var(--atom-radius-lg)] shadow-2xl relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between pb-4 border-b border-[var(--atom-border-subtle)]">
            <h3 className="text-lg font-bold text-[var(--atom-text-primary)]">{title}</h3>
            <button
              onClick={onClose}
              aria-label="닫기"
              className="text-[var(--atom-text-secondary)] hover:text-[var(--atom-text-primary)] text-xl leading-none"
            >
              ×
            </button>
          </div>
        )}
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};
