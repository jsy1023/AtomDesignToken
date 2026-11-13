'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useI18n } from '@/lib/i18n';
import {
  BLOCK_CATEGORIES,
  BLOCKS_COLLECTION,
  BlockCategoryId,
  BlockItem,
} from '@/lib/data/blocks';
import {
  Layers,
  Search,
  LineChart,
  MessageSquare,
  LayoutGrid,
  Sliders,
  CreditCard,
  BarChart3,
  FolderTree,
  ArrowRight,
  Terminal,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function BlocksHubPage() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<BlockCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryName = (catId: string, fallback: string) => {
    switch (catId) {
      case 'all': return t('blocks.allBlocks', fallback);
      case 'chart': return t('blocks.realtimeChart', fallback);
      case 'chat': return t('blocks.chat', fallback);
      case 'card': return t('blocks.cardList', fallback);
      case 'slider': return t('blocks.slider', fallback);
      case 'pricing': return t('blocks.pricing', fallback);
      case 'stats': return t('blocks.kpi', fallback);
      case 'tree': return t('blocks.fileExplorer', fallback);
      default: return fallback;
    }
  };

  const filteredBlocks = BLOCKS_COLLECTION.filter((block) => {
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    const matchesSearch =
      block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'LineChart':
        return <LineChart className="w-3.5 h-3.5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-3.5 h-3.5" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-3.5 h-3.5" />;
      case 'Sliders':
        return <Sliders className="w-3.5 h-3.5" />;
      case 'CreditCard':
        return <CreditCard className="w-3.5 h-3.5" />;
      case 'BarChart3':
        return <BarChart3 className="w-3.5 h-3.5" />;
      case 'FolderTree':
        return <FolderTree className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col font-sans transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Simple & Clean Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary) mb-2">
            {t('blocks.title')}
          </h1>
          <p className="text-xs sm:text-sm text-(--text-secondary) max-w-xl leading-relaxed">
            {t('blocks.description')}
          </p>
        </div>

        {/* Toolbar: Categories & Search */}
        <div className="sticky top-11 z-30 bg-(--bg-primary)/95 backdrop-blur-md py-3 border-y border-(--border-subtle) mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Category Pills (Pure Minimalist, No Scrollbar) */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5">
              {BLOCK_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 px-2.5 py-1 rounded-(--radius-sm) text-xs transition-colors ${
                      isActive
                        ? 'bg-(--text-primary) text-(--bg-primary) font-semibold'
                        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                    }`}
                  >
                    {getCategoryName(cat.id, cat.name)}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blocks.searchPlaceholder')}
                className="w-full sm:w-64 text-xs pl-8 pr-3 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--border-strong) transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Grid Catalog of Blocks */}
        {filteredBlocks.length === 0 ? (
          <div className="py-20 text-center rounded-(--radius) border border-dashed border-(--border-subtle)">
            <h3 className="text-sm font-semibold text-(--text-primary)">{t('blocks.noResults')}</h3>
            <p className="text-xs text-(--text-secondary) mt-1">카테고리나 검색어를 변경해 보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBlocks.map((block) => (
              <Link
                key={block.id}
                href={`/blocks/${block.id}`}
                className="group p-4 rounded-(--radius) border border-(--border-subtle) hover:border-(--border-strong) bg-(--bg-primary) transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-(--text-muted)">
                      {block.id}
                    </span>
                  </div>

                  <h2 className="text-sm font-semibold text-(--text-primary) group-hover:text-(--accent-primary) transition-colors mb-1">
                    {block.title}
                  </h2>
                  <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-2 mb-4">
                    {block.summary}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-(--border-subtle) flex items-center justify-between text-xs text-(--text-secondary)">
                  <span className="font-mono text-[11px] text-(--text-muted)">
                    add {block.id}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-xs text-(--text-primary) group-hover:translate-x-0.5 transition-transform">
                    <span>문서</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
