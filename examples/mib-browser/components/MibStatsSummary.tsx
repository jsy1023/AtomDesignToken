'use client';

import React from 'react';
import { Database, FolderTree, Search, Layers, FileCode } from 'lucide-react';

interface MibStatsSummaryProps {
  mibCount: number;
  totalOidCount: number;
  tableCount: number;
  scalarCount: number;
  indexedCount: number;
  activeModuleName?: string;
}

export function MibStatsSummary({
  mibCount,
  totalOidCount,
  tableCount,
  scalarCount,
  indexedCount,
}: MibStatsSummaryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
      {/* 1. MIB 모듈 수 */}
      <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-3 transition-all hover:border-[var(--accent-primary)]/40">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <FileCode className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-[var(--text-secondary)] font-medium">업로드된 MIB</div>
          <div className="text-lg font-bold text-[var(--text-primary)]">{mibCount}개</div>
        </div>
      </div>

      {/* 2. 전체 OID 수 */}
      <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-3 transition-all hover:border-[var(--accent-primary)]/40">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <FolderTree className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-[var(--text-secondary)] font-medium">전체 OID 노드</div>
          <div className="text-lg font-bold text-[var(--text-primary)]">{totalOidCount.toLocaleString()}개</div>
        </div>
      </div>

      {/* 3. 테이블/로우 수 */}
      <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-3 transition-all hover:border-[var(--accent-primary)]/40">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-[var(--text-secondary)] font-medium">테이블 / 엔트리</div>
          <div className="text-lg font-bold text-[var(--text-primary)]">{tableCount}개</div>
        </div>
      </div>

      {/* 4. 스칼라 OID 수 */}
      <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-3 transition-all hover:border-[var(--accent-primary)]/40">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-[var(--text-secondary)] font-medium">스칼라 OID</div>
          <div className="text-lg font-bold text-[var(--text-primary)]">{scalarCount}개</div>
        </div>
      </div>

      {/* 5. 검색엔진 색인 상태 */}
      <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-3 transition-all hover:border-[var(--accent-primary)]/40 col-span-2 sm:col-span-4 lg:col-span-1">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
          <Search className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-[var(--text-secondary)] font-medium">색인된 OID</div>
          <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
            {indexedCount > 0 ? `${indexedCount.toLocaleString()}건` : '대기중'}
          </div>
        </div>
      </div>
    </div>
  );
}
