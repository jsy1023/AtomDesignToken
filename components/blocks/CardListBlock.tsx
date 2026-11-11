'use client';

import React, { useState } from 'react';
import {
  LayoutGrid,
  List as ListIcon,
  Search,
  Bookmark,
  Star,
  Eye,
  ArrowUpRight,
  Sparkles,
  Layers,
  Palette,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface CardItem {
  id: string;
  category: 'Foundation' | 'Component' | 'Pattern';
  title: string;
  description: string;
  tag: string;
  icon: 'palette' | 'layers' | 'shield' | 'zap';
  stats: { views: string; rating: number };
  date: string;
  isBookmarked?: boolean;
}

const INITIAL_CARDS: CardItem[] = [
  {
    id: 'c1',
    category: 'Foundation',
    title: '시맨틱 색상 및 다크모드 매트릭스',
    description: 'W3C DTCG 표준 3단계 계층 구조(Primitive → Semantic → Component)를 완벽히 준수하는 컬러 시스템.',
    tag: 'W3C 표준',
    icon: 'palette',
    stats: { views: '14.2k', rating: 4.9 },
    date: '2026.11',
  },
  {
    id: 'c2',
    category: 'Component',
    title: '고접근성 인터랙티브 모달 & 드로어',
    description: 'ARIA-1.2 명세를 100% 만족하며 포커스 트랩과 ESC 키 닫기, 백드롭 블러를 지원하는 레이어 컴포넌트.',
    tag: 'A11y AAA',
    icon: 'layers',
    stats: { views: '9.8k', rating: 4.8 },
    date: '2026.10',
  },
  {
    id: 'c3',
    category: 'Pattern',
    title: 'B2B 핀테크 인증 및 결제 승인 플로우',
    description: '생체 인증, 간편 비밀번호, 카드 CVC 실시간 유효성 검증과 가맹점 수수료율 자동 산출 UX.',
    tag: 'Fintech UX',
    icon: 'shield',
    stats: { views: '18.5k', rating: 5.0 },
    date: '2026.11',
  },
  {
    id: 'c4',
    category: 'Component',
    title: '실시간 가변 폰트 & 타이포 스케일러',
    description: 'Pretendard Variable 기반의 유동적(Fluid) 폰트 크기 및 행간(Line-height) 자동 보정 시스템.',
    tag: 'Typography',
    icon: 'zap',
    stats: { views: '7.1k', rating: 4.7 },
    date: '2026.09',
  },
  {
    id: 'c5',
    category: 'Pattern',
    title: 'AI 에이전트 스트리밍 메시지 뷰포트',
    description: '대규모 언어 모델의 토큰 단위 스트리밍을 60fps로 매끄럽게 자동 스크롤하는 차세대 피드.',
    tag: 'AI System',
    icon: 'layers',
    stats: { views: '23.4k', rating: 4.9 },
    date: '2026.11',
  },
  {
    id: 'c6',
    category: 'Foundation',
    title: '모션 이징 & 스프링 물리 타이밍 토큰',
    description: '자연스러운 사용자 경험을 위한 GSAP 및 CSS transition 타이밍 커브 세트.',
    tag: 'Micro Interaction',
    icon: 'palette',
    stats: { views: '11.0k', rating: 4.8 },
    date: '2026.10',
  },
];

export function CardListBlock() {
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleBookmark = (id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isBookmarked: !c.isBookmarked } : c))
    );
  };

  const filteredCards = cards.filter((card) => {
    const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (type: CardItem['icon']) => {
    switch (type) {
      case 'palette':
        return <Palette className="w-4 h-4 text-purple-500" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-blue-500" />;
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'zap':
        return <Zap className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="w-full bg-(--bg-primary) rounded-2xl border border-(--border-subtle) shadow-sm p-5 sm:p-6 transition-colors">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-(--border-subtle)">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Foundation', 'Component', 'Pattern'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-(--accent-primary) text-white shadow-xs'
                  : 'bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary)'
              }`}
            >
              {cat === 'All' ? '전체' : cat}
            </button>
          ))}
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="블록 및 토큰 검색..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-lg bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--accent-primary) w-36 sm:w-48 transition-colors"
            />
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-(--bg-secondary) border border-(--border-subtle)">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="그리드 보기"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs'
                  : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="리스트 보기"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs'
                  : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Viewport */}
      {filteredCards.length === 0 ? (
        <div className="py-16 text-center text-xs text-(--text-muted)">
          검색 조건에 맞는 블록 항목이 없습니다.
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col justify-between p-4 rounded-xl bg-(--bg-secondary)/50 hover:bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-(--bg-primary) border border-(--border-subtle)">
                      {getIcon(card.icon)}
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-(--bg-primary) text-(--text-secondary) border border-(--border-subtle)">
                      {card.tag}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(card.id)}
                    className="p-1.5 rounded-lg text-(--text-muted) hover:text-(--accent-primary) transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${card.isBookmarked ? 'fill-(--accent-primary) text-(--accent-primary)' : ''}`}
                    />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-(--text-primary) group-hover:text-(--accent-primary) transition-colors line-clamp-1 mb-1.5">
                  {card.title}
                </h4>
                <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-2 mb-4">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-(--border-subtle) text-[11px] text-(--text-muted)">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-(--text-primary)">{card.stats.rating}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{card.stats.views}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-(--accent-primary) group-hover:translate-x-0.5 transition-transform">
                  <span>보기</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List Layout */
        <div className="space-y-3 pt-5">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-(--bg-secondary)/50 hover:bg-(--bg-secondary) border border-(--border-subtle) hover:border-(--border-strong) transition-all gap-4 shadow-xs"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2.5 rounded-lg bg-(--bg-primary) border border-(--border-subtle) shrink-0 mt-0.5 sm:mt-0">
                  {getIcon(card.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-(--bg-primary) text-(--text-secondary) border border-(--border-subtle)">
                      {card.tag}
                    </span>
                    <span className="text-[10px] text-(--text-muted)">{card.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-(--text-primary) group-hover:text-(--accent-primary) transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-(--text-secondary) mt-0.5 line-clamp-1 max-w-xl">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-(--border-subtle)">
                <div className="flex items-center gap-3 text-xs text-(--text-muted)">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-(--text-primary)">{card.stats.rating}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{card.stats.views}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(card.id)}
                    className="p-1.5 rounded-lg text-(--text-muted) hover:text-(--accent-primary) transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${card.isBookmarked ? 'fill-(--accent-primary) text-(--accent-primary)' : ''}`}
                    />
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-(--bg-primary) hover:bg-(--accent-primary) hover:text-white text-(--text-primary) border border-(--border-subtle) transition-colors flex items-center gap-1">
                    <span>상세보기</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
