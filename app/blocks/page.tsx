'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import {
  BLOCK_CATEGORIES,
  BLOCKS_COLLECTION,
  BlockCategoryId,
  BlockItem,
} from '@/lib/data/blocks';
import {
  RealtimeChartBlock,
  InteractiveChatBlock,
  CardListBlock,
  SliderShowcaseBlock,
  PricingPlanBlock,
  MetricStatsBlock,
  FileExplorerBlock,
  BlockViewerCard,
} from '@/components/blocks';
import {
  Layers,
  Sparkles,
  Zap,
  Search,
  CheckCircle2,
  Code2,
  Box,
  LineChart,
  MessageSquare,
  LayoutGrid,
  Sliders,
  CreditCard,
  BarChart3,
  FolderTree,
} from 'lucide-react';

export default function BlocksPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlockCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlocks = BLOCKS_COLLECTION.filter((block) => {
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    const matchesSearch =
      block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'LineChart':
        return <LineChart className="w-4 h-4" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-4 h-4" />;
      case 'Sliders':
        return <Sliders className="w-4 h-4" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      case 'FolderTree':
        return <FolderTree className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const renderBlockComponent = (blockId: string) => {
    switch (blockId) {
      case 'realtime-chart':
        return <RealtimeChartBlock />;
      case 'interactive-chat':
        return <InteractiveChatBlock />;
      case 'card-list':
        return <CardListBlock />;
      case 'interactive-slider':
        return <SliderShowcaseBlock />;
      case 'pricing-table':
        return <PricingPlanBlock />;
      case 'metric-stats':
        return <MetricStatsBlock />;
      case 'file-explorer':
        return <FileExplorerBlock />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col font-sans transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-(--accent-primary)/10 text-(--accent-primary) mb-3">
            <Box className="w-3.5 h-3.5" />
            <span>디자인 블록 (Design Blocks) 아키텍처</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            프로덕션 즉시 투입 가능한 <br className="hidden sm:inline" />
            <span className="text-(--accent-primary)">고품질 완성형 디자인 블록</span>
          </h1>

          <p className="text-sm sm:text-base text-(--text-secondary) max-w-2xl leading-relaxed mb-6">
            개별 아톰 UI 컴포넌트와 화면 단위 UX 패턴 사이에 위치하는 실무 복합 모듈입니다.
            실시간 차트, AI 대화형 메신저, 반응형 카드 컬렉션, 인터랙티브 슬라이더, 가격 정책 UX를 원클릭으로
            복사하여 사용하세요.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl pt-2">
            <div className="p-3 rounded-xl bg-(--bg-secondary)/60 border border-(--border-subtle)">
              <div className="text-[11px] text-(--text-muted)">검증된 블록 컬렉션</div>
              <div className="text-lg font-bold text-(--text-primary)">6개 모듈 완비</div>
            </div>
            <div className="p-3 rounded-xl bg-(--bg-secondary)/60 border border-(--border-subtle)">
              <div className="text-[11px] text-(--text-muted)">토큰 바인딩</div>
              <div className="text-lg font-bold text-emerald-500">W3C DTCG 100%</div>
            </div>
            <div className="p-3 rounded-xl bg-(--bg-secondary)/60 border border-(--border-subtle)">
              <div className="text-[11px] text-(--text-muted)">번들 런타임 오버헤드</div>
              <div className="text-lg font-bold text-(--accent-primary)">0KB Zero-Runtime</div>
            </div>
            <div className="p-3 rounded-xl bg-(--bg-secondary)/60 border border-(--border-subtle)">
              <div className="text-[11px] text-(--text-muted)">반응형 지원</div>
              <div className="text-lg font-bold text-purple-500">Mobile to Desktop</div>
            </div>
          </div>
        </div>

        {/* Toolbar: Categories & Search */}
        <div className="sticky top-11 z-30 bg-(--bg-primary)/95 backdrop-blur-md py-4 border-y border-(--border-subtle) mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {BLOCK_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-(--accent-primary) text-white shadow-xs'
                        : 'bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--border-subtle)'
                    }`}
                  >
                    {getCategoryIcon(cat.icon)}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="블록 기능 및 이름 검색..."
                className="w-full sm:w-64 text-xs pl-9 pr-4 py-2 rounded-xl bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--accent-primary) transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Block List Content */}
        {filteredBlocks.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-(--border-strong)">
            <Box className="w-10 h-10 text-(--text-muted) mx-auto mb-3" />
            <h3 className="text-sm font-bold text-(--text-primary)">일치하는 블록을 찾을 수 없습니다.</h3>
            <p className="text-xs text-(--text-secondary) mt-1">다른 검색어나 카테고리를 선택해 보세요.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredBlocks.map((block) => (
              <BlockViewerCard key={block.id} block={block}>
                {renderBlockComponent(block.id)}
              </BlockViewerCard>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
