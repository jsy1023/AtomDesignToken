'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X, Sparkles } from 'lucide-react';
import { Input } from './Input';
import { Badge } from './Badge';

export interface TokenOption {
  id: string; // e.g. '--atom-palette-blue-500'
  name: string; // e.g. 'Blue 500 (Brand Primary)'
  value: string; // e.g. 'var(--accent-primary)' or '8px'
  category?: 'color' | 'size' | 'spacing' | 'radius' | 'typography' | 'status' | string;
  family?: string; // e.g. 'blue', 'gray', 'emerald', 'neutral', 'status'
  description?: string;
}

export interface TokenSelectProps {
  options: TokenOption[];
  value?: string;
  onChange?: (value: string, option?: TokenOption) => void;
  placeholder?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'subtle';
  disabled?: boolean;
  className?: string;
  showColorSwatch?: boolean;
  showVarId?: boolean;
  showValueBadge?: boolean;
  id?: string;
  'aria-label'?: string;
}

const isColorValue = (val?: string): boolean => {
  if (!val) return false;
  return (
    val.startsWith('#') ||
    val.startsWith('rgb') ||
    val.startsWith('hsl') ||
    val.includes('--atom-palette-') ||
    val.includes('--atom-color-')
  );
};

export const TokenSelect: React.FC<TokenSelectProps> = ({
  options = [],
  value = '',
  onChange,
  placeholder = '토큰 검색 및 선택...',
  label,
  size = 'md',
  variant = 'outlined',
  disabled = false,
  className = '',
  showColorSwatch = true,
  showVarId = true,
  showValueBadge = true,
  id,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find currently selected option by id or by value
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.id === value || opt.value === value);
  }, [options, value]);

  // Extract unique families for filter chips
  const uniqueFamilies = useMemo(() => {
    const families = new Set<string>();
    options.forEach((opt) => {
      if (opt.family) families.add(opt.family);
      else if (opt.category) families.add(opt.category);
    });
    return Array.from(families);
  }, [options]);

  // Filter options by search query and family
  const filteredOptions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return options.filter((opt) => {
      // Family filter
      if (selectedFamily !== 'all') {
        const matchesFamily = opt.family === selectedFamily || opt.category === selectedFamily;
        if (!matchesFamily) return false;
      }
      // Query filter
      if (!q) return true;
      const matchName = opt.name.toLowerCase().includes(q);
      const matchId = opt.id.toLowerCase().includes(q);
      const matchVal = opt.value.toLowerCase().includes(q);
      const matchFamily = opt.family?.toLowerCase().includes(q);
      return matchName || matchId || matchVal || matchFamily;
    });
  }, [options, searchQuery, selectedFamily]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
      setSelectedFamily('all');
    }
  }, [isOpen]);

  // Handle keyboard events (Escape to close, Enter to select top)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && isOpen && filteredOptions.length > 0) {
      const topMatch = filteredOptions[0];
      onChange?.(topMatch.id, topMatch);
      setIsOpen(false);
    }
  };

  // Size specific metrics
  const sizeClasses = {
    sm: 'h-7 text-xs px-2 py-1',
    md: 'h-8 text-xs px-2.5 py-1.5',
    lg: 'h-10 text-sm px-3 py-2',
  }[size];

  // Variant specific styling
  const variantClasses = {
    outlined: 'border border-(--border-subtle) bg-(--bg-primary) hover:border-(--border-strong)',
    filled: 'border border-transparent bg-(--bg-secondary)/80 hover:bg-(--bg-secondary)',
    subtle: 'border border-transparent bg-transparent hover:bg-(--bg-secondary)/60',
  }[variant];

  const displayColor = selectedOption && isColorValue(selectedOption.value) ? selectedOption.value : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col gap-1 ${className}`}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          htmlFor={id}
          className="text-[11px] font-medium text-(--text-secondary) block select-none"
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || label || placeholder}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 rounded-(--radius-sm) cursor-pointer select-none transition-all outline-none focus-visible:ring-1 focus-visible:ring-(--accent-primary) ${sizeClasses} ${variantClasses} ${
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        } ${isOpen ? 'ring-1 ring-(--accent-primary) border-(--accent-primary)' : ''}`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Color Preview Swatch */}
          {showColorSwatch && displayColor && (
            <span
              style={{ backgroundColor: displayColor }}
              className="w-4 h-4 rounded-xs border border-(--border-subtle) shrink-0 shadow-2xs"
              title={displayColor}
            />
          )}

          {/* Token Name & Value */}
          <span className="truncate font-medium text-(--text-primary)">
            {selectedOption ? selectedOption.name : placeholder}
          </span>

          {/* Value Badge */}
          {showValueBadge && selectedOption && (
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-(--bg-secondary) text-(--text-secondary) shrink-0 border border-(--border-subtle)/50">
              {selectedOption.value}
            </span>
          )}
        </div>

        {/* Chevron Icon */}
        <ChevronDown
          className={`w-3.5 h-3.5 text-(--text-muted) shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-(--accent-primary)' : ''
          }`}
        />
      </div>

      {/* Floating Popover Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1 min-w-[280px] max-w-[420px] rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col"
          style={{ maxHeight: '340px' }}
        >
          {/* Search Bar Header */}
          <div className="p-2 border-b border-(--border-subtle) bg-(--bg-secondary)/40 flex items-center gap-1.5 shrink-0">
            <div className="relative flex-1">
              <Input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="토큰명, var ID, HEX 검색..."
                leftIcon={<Search className="w-3.5 h-3.5 text-(--text-muted)" />}
                className="h-7 text-xs bg-(--bg-primary)"
              />
              {searchQuery && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-primary) cursor-pointer"
                  title="검색어 지우기"
                >
                  <X className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>

          {/* Quick Family Chips Row */}
          {uniqueFamilies.length > 1 && (
            <div className="px-2 py-1.5 border-b border-(--border-subtle)/60 bg-(--bg-secondary)/20 flex items-center gap-1 overflow-x-auto shrink-0 scrollbar-none">
              <span
                role="button"
                tabIndex={0}
                onClick={() => setSelectedFamily('all')}
                className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition shrink-0 ${
                  selectedFamily === 'all'
                    ? 'bg-(--accent-primary) text-white font-semibold'
                    : 'bg-(--bg-primary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
                }`}
              >
                전체 ({options.length})
              </span>
              {uniqueFamilies.map((fam) => {
                const count = options.filter(
                  (o) => o.family === fam || o.category === fam
                ).length;
                return (
                  <span
                    key={fam}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedFamily(fam)}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition shrink-0 capitalize ${
                      selectedFamily === fam
                        ? 'bg-(--accent-primary) text-white font-semibold'
                        : 'bg-(--bg-primary) text-(--text-secondary) hover:text-(--text-primary) border border-(--border-subtle)'
                    }`}
                  >
                    {fam} ({count})
                  </span>
                );
              })}
            </div>
          )}

          {/* Options List */}
          <div className="overflow-y-auto flex-1 divide-y divide-(--border-subtle)/30">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-xs text-(--text-muted) flex flex-col items-center justify-center gap-1">
                <Search className="w-4 h-4 opacity-40 mb-1" />
                <span>일치하는 디자인 토큰이 없습니다.</span>
                <span className="text-[10px] opacity-70">
                  다른 키워드나 색상값(HEX)으로 검색해 보세요.
                </span>
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.id === value || opt.value === value;
                const isColor = isColorValue(opt.value);

                return (
                  <div
                    key={opt.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange?.(opt.id, opt);
                      setIsOpen(false);
                    }}
                    className={`px-2.5 py-1.5 flex items-center justify-between gap-2 cursor-pointer transition text-xs select-none ${
                      isSelected
                        ? 'bg-(--accent-primary)/10 border-l-2 border-(--accent-primary)'
                        : 'hover:bg-(--bg-secondary)/70'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {/* Selection Checkmark */}
                      <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-(--accent-primary)" />
                        ) : null}
                      </span>

                      {/* Swatch */}
                      {showColorSwatch && isColor && (
                        <span
                          style={{ backgroundColor: opt.value }}
                          className="w-4 h-4 rounded-xs border border-(--border-subtle) shrink-0 shadow-2xs"
                        />
                      )}

                      {/* Token Details */}
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`truncate text-xs ${
                            isSelected
                              ? 'font-bold text-(--accent-primary)'
                              : 'font-medium text-(--text-primary)'
                          }`}
                        >
                          {opt.name}
                        </span>
                        {showVarId && (
                          <span className="text-[10px] font-mono text-(--text-muted) truncate">
                            var({opt.id})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Value Badge */}
                    <div className="shrink-0 flex items-center gap-1">
                      {opt.family && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-(--bg-secondary)/60 text-(--text-muted) uppercase">
                          {opt.family}
                        </span>
                      )}
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)/50">
                        {opt.value}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Info */}
          <div className="px-2.5 py-1 bg-(--bg-secondary)/30 border-t border-(--border-subtle) text-[10px] font-mono text-(--text-muted) flex items-center justify-between shrink-0">
            <span>총 {filteredOptions.length}개 토큰</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-(--accent-primary)" />
              W3C DTCG
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
