'use client';

import React, { useState, useMemo } from 'react';
import { useThemeEditor } from '../ThemeEditorProvider';
import {
  AWESOME_DESIGN_MD_THEMES,
  AWESOME_CATEGORIES,
  AwesomeDesignMdTheme,
} from '@/lib/data/awesomeThemes';
import {
  Search,
  Check,
  FileText,
  Sparkles,
  ExternalLink,
  Copy,
  X,
  BookOpen
} from 'lucide-react';

export function AwesomeThemesTab() {
  const { theme, applyFullTheme } = useThemeEditor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewingMd, setViewingMd] = useState<{ name: string; content: string } | null>(null);
  const [loadingMd, setLoadingMd] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  // 검색 및 카테고리 필터링
  const filteredThemes = useMemo(() => {
    return AWESOME_DESIGN_MD_THEMES.filter((t) => {
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleApply = (targetTheme: AwesomeDesignMdTheme) => {
    applyFullTheme({
      color: targetTheme.color,
      typography: targetTheme.typography,
      borderRadius: targetTheme.borderRadius,
    });
  };

  const handleViewDesignMd = async (targetTheme: AwesomeDesignMdTheme) => {
    setLoadingMd(true);
    try {
      const res = await fetch(targetTheme.designMdPath);
      if (res.ok) {
        const text = await res.text();
        setViewingMd({ name: targetTheme.name, content: text });
      } else {
        setViewingMd({
          name: targetTheme.name,
          content: `# ${targetTheme.name} DESIGN.md\n\n${targetTheme.description}`,
        });
      }
    } catch {
      setViewingMd({
        name: targetTheme.name,
        content: `# ${targetTheme.name} DESIGN.md\n\n${targetTheme.description}`,
      });
    } finally {
      setLoadingMd(false);
    }
  };

  const copyMdContent = () => {
    if (!viewingMd) return;
    navigator.clipboard.writeText(viewingMd.content);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Intro Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/60 dark:border-blue-900/40">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
            VoltAgent Awesome DESIGN.md 라이브러리
          </h3>
        </div>
        <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
          글로벌 84개 테크 기업(Apple, Linear, Stripe, Vercel, Claude 등)의 실제 디자인 시스템 분석 파일에서 추출된 색상과 타이포그래피 스케일입니다. 클릭 한 번으로 사이트 전체에 즉각 적용됩니다.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="브랜드 검색 (Apple, Stripe, Linear, Claude...)"
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-400"
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {AWESOME_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            style={selectedCategory === cat ? { backgroundColor: 'var(--accent-primary)', color: '#ffffff' } : {}}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all text-[11px] ${
              selectedCategory === cat
                ? 'font-bold shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Theme Count */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400">
        <span>총 {filteredThemes.length}개 브랜드 가이드</span>
      </div>

      {/* Themes List Grid */}
      <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
        {filteredThemes.map((t) => {
          const isApplied = theme.color.primary === t.color.primary;

          return (
            <div
              key={t.id}
              className={`p-3.5 rounded-xl border transition-all text-xs flex flex-col gap-2.5 ${
                isApplied
                  ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-xs ring-1 ring-blue-500/20'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                      {t.name}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-1 shrink-0 p-1 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-700/60">
                  <span
                    title={`Primary: ${t.color.primary}`}
                    className="w-4 h-4 rounded-full shadow-xs border border-black/10"
                    style={{ backgroundColor: t.color.primary }}
                  />
                  <span
                    title={`Surface: ${t.color.bgPrimary}`}
                    className="w-4 h-4 rounded-full shadow-xs border border-black/10"
                    style={{ backgroundColor: t.color.bgPrimary }}
                  />
                  <span
                    title={`Text: ${t.color.textPrimary}`}
                    className="w-4 h-4 rounded-full shadow-xs border border-black/10"
                    style={{ backgroundColor: t.color.textPrimary }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
                <button
                  type="button"
                  onClick={() => handleViewDesignMd(t)}
                  className="flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>DESIGN.md 원문</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApply(t)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                    isApplied
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>적용 중</span>
                    </>
                  ) : (
                    <span>스타일 적용하기</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {filteredThemes.length === 0 && (
          <div className="text-center py-8 text-xs text-neutral-400">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* DESIGN.md Viewer Modal / Drawer overlay */}
      {viewingMd && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {viewingMd.name} DESIGN.md
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    AI Agent 및 디자인 시스템 호환 원본 가이드
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={copyMdContent}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {copiedMd ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>MD 전문 복사</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setViewingMd(null)}
                  className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs leading-relaxed bg-neutral-950 text-neutral-200 whitespace-pre-wrap select-text">
              {viewingMd.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
