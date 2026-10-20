'use client';

import React from 'react';
import { Search, X, Filter, Sparkles, Hash, FileCode, CheckCircle2 } from 'lucide-react';
import { OidSearchResult, OidSearchFilter, OidNodeType } from '@/lib/data/mibModels';

interface MibSearchPanelProps {
  filter: OidSearchFilter;
  onFilterChange: (newFilter: OidSearchFilter) => void;
  results: OidSearchResult[];
  selectedOid?: string;
  onSelectResult: (result: OidSearchResult) => void;
  availableModules: string[];
}

export function MibSearchPanel({
  filter,
  onFilterChange,
  results,
  selectedOid,
  onSelectResult,
  availableModules,
}: MibSearchPanelProps) {
  const handleQueryChange = (q: string) => {
    onFilterChange({ ...filter, query: q });
  };

  const handleModuleSelect = (mod?: string) => {
    onFilterChange({ ...filter, module: mod === filter.module ? undefined : mod });
  };

  const handleTypeSelect = (type?: OidNodeType) => {
    onFilterChange({ ...filter, nodeType: type === filter.nodeType ? undefined : type });
  };

  const clearAllFilters = () => {
    onFilterChange({ query: '' });
  };

  const hasActiveFilters = Boolean(filter.query || filter.module || filter.nodeType || filter.access);

  return (
    <div className="flex flex-col gap-3">
      {/* 1. 검색 입력창 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
          <Search className="w-4 h-4 text-blue-500" />
        </div>
        <input
          type="text"
          value={filter.query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="OID 이름, 숫자(1.3.6.1...), 설명, 문법 실시간 검색..."
          className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/40 focus:border-[var(--accent-primary)] transition"
        />
        {filter.query && (
          <button
            type="button"
            onClick={() => handleQueryChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. 필터 칩스 (모듈 & 노드 타입) */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] font-semibold text-[var(--text-muted)] flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3" />
          필터:
        </span>

        {/* 타입 필터 칩 */}
        {(['scalar', 'table', 'row', 'notification'] as OidNodeType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTypeSelect(t)}
            className={`px-2.5 py-1 rounded-xl font-medium transition-all ${
              filter.nodeType === t
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}

        {/* 모듈 필터 칩 */}
        {availableModules.map((mod) => (
          <button
            key={mod}
            type="button"
            onClick={() => handleModuleSelect(mod)}
            className={`px-2.5 py-1 rounded-xl font-medium transition-all ${
              filter.module === mod
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {mod}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="ml-auto text-[11px] font-semibold text-rose-500 hover:underline px-1.5"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 3. 검색 결과 목록 */}
      {filter.query && (
        <div className="space-y-2 mt-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium px-1">
            <span>
              검색 결과: <strong className="text-[var(--text-primary)]">{results.length}</strong>건 발견
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">정확도 순 정렬</span>
          </div>

          <div className="max-h-[360px] overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
            {results.length === 0 ? (
              <div className="p-6 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)]/50 rounded-2xl border border-[var(--border-subtle)]">
                '{filter.query}' 에 일치하는 OID를 찾지 못했습니다.
              </div>
            ) : (
              results.map((res) => {
                const isSelected = selectedOid === res.node.numericOid;
                return (
                  <div
                    key={res.node.numericOid}
                    onClick={() => onSelectResult(res)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[var(--accent-light)] border-[var(--accent-primary)] shadow-xs'
                        : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/40 hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono font-bold text-xs text-[var(--text-primary)] truncate">
                          {res.node.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {res.node.nodeType}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        점수: {res.score}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-[var(--accent-primary)] mt-1">
                      {res.node.numericOid}
                    </div>

                    {/* 매칭된 필드 스니펫 */}
                    {res.matchedFields.length > 0 && (
                      <div className="mt-1.5 text-[11px] text-[var(--text-secondary)] line-clamp-2 bg-[var(--bg-secondary)] p-1.5 rounded-lg">
                        <strong className="text-[var(--text-primary)] font-semibold mr-1">
                          [{res.matchedFields[0].field}]:
                        </strong>
                        <span>{res.matchedFields[0].snippet}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
