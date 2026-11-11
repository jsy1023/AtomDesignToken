'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import {
  LayoutGrid,
  List as ListIcon,
  Search,
  Bookmark,
  ArrowUpRight,
  Palette,
  Layers,
  Shield,
  Zap,
} from 'lucide-react';

interface CardItem {
  id: string;
  category: 'Foundation' | 'Component' | 'Pattern';
  title: string;
  description: string;
  tag: string;
  price: string;
  icon: 'palette' | 'layers' | 'shield' | 'zap';
}

const INITIAL_CARDS: CardItem[] = [
  {
    id: 'c1',
    category: 'Foundation',
    title: '시맨틱 색상 & 다크모드 매트릭스',
    description: 'W3C DTCG 표준 3단계 계층 구조를 준수하는 토큰 기반 컬러 시스템.',
    tag: 'W3C 표준',
    price: 'Free',
    icon: 'palette',
  },
  {
    id: 'c2',
    category: 'Component',
    title: '고접근성 인터랙티브 모달 & 드로어',
    description: '포커스 트랩과 키보드 내비게이션을 보장하는 시맨틱 레이어 컴포넌트.',
    tag: 'A11y AAA',
    price: '$19',
    icon: 'layers',
  },
  {
    id: 'c3',
    category: 'Pattern',
    title: 'B2B 핀테크 인증 & 결제 승인 플로우',
    description: '실시간 유효성 검증과 가맹점 수수료율 자동 산출 반응형 위젯.',
    tag: 'Fintech UX',
    price: '$39',
    icon: 'shield',
  },
  {
    id: 'c4',
    category: 'Component',
    title: '가변 폰트 & 타이포 스케일러',
    description: 'Fluid 폰트 크기 및 행간을 토큰으로 제어하는 타이포그래피 블록.',
    tag: 'Typography',
    price: 'Free',
    icon: 'zap',
  },
];

export function CardListBlock() {
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = cards.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getIcon = (type: CardItem['icon']) => {
    switch (type) {
      case 'palette':
        return <Palette className="w-4 h-4 text-purple-500" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-blue-500" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-emerald-500" />;
      case 'zap':
        return <Zap className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-colors">
      {/* 1. Filter Toolbar composed with Button components */}
      <div className="p-4 border-b border-(--border-subtle) bg-(--bg-secondary)/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {['All', 'Foundation', 'Component', 'Pattern'].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="text-xs py-1 px-2.5 whitespace-nowrap"
            >
              {cat === 'All' ? '전체' : cat}
            </Button>
          ))}
        </div>

        {/* View mode & Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-secondary)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="카드 필터..."
              className="text-xs pl-7 pr-2.5 py-1 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) focus:outline-none"
            />
          </div>

          <div className="flex rounded-(--radius-sm) border border-(--border-subtle) p-0.5 bg-(--bg-secondary)">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid"
              className={`p-1 rounded-(--radius-sm) transition-colors ${
                viewMode === 'grid' ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs' : 'text-(--text-secondary)'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List"
              className={`p-1 rounded-(--radius-sm) transition-colors ${
                viewMode === 'list' ? 'bg-(--bg-primary) text-(--text-primary) shadow-xs' : 'text-(--text-secondary)'
              }`}
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Cards Viewport composed with UI Card & Badge */}
      <div className="p-4 sm:p-5">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {filteredCards.map((c) => (
              <Card
                key={c.id}
                interactive
                className="p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="p-2 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle)">
                      {getIcon(c.icon)}
                    </div>
                    <Badge variant="neutral" className="text-[11px]">
                      {c.tag}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-xs text-(--text-primary) line-clamp-1 mb-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-(--text-secondary) line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-(--border-subtle) flex items-center justify-between mt-3 text-xs">
                  <span className="font-semibold text-(--text-primary)">{c.price}</span>
                  <button className="text-xs font-medium text-(--accent-primary) hover:underline flex items-center gap-0.5">
                    <span>선택</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredCards.map((c) => (
              <Card
                key={c.id}
                className="p-3 px-4 flex items-center justify-between transition-colors gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle)">
                    {getIcon(c.icon)}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-(--text-primary)">{c.title}</div>
                    <div className="text-[11px] text-(--text-secondary) line-clamp-1">{c.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <span className="font-semibold text-(--text-primary)">{c.price}</span>
                  <Button variant="secondary" size="sm" className="text-xs py-1 px-2.5">
                    상세보기
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
