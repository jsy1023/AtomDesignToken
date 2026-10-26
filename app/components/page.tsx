'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { GALLERY_COMPONENTS, ComponentCategory } from '@/lib/data/components';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { ComponentCatalogCard } from '@/components/docs/ComponentCatalogCard';
import {
  Sparkles,
  Terminal,
  Copy,
  Check,
  RefreshCw,
  Search,
  Bell,
  X,
  Layers,
  Code2
} from 'lucide-react';

export default function ComponentsGalleryPage() {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';
  const radius = theme?.borderRadius || '16px';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('all');
  const [copiedCli, setCopiedCli] = useState(false);

  // Interactive Live Demo states for cards
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'password' | 'settings'>('account');
  const [showAlert, setShowAlert] = useState(true);

  // Filtering
  const filteredComponents = GALLERY_COMPONENTS.filter((comp) => {
    const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      comp.name.toLowerCase().includes(query) ||
      comp.description.toLowerCase().includes(query) ||
      comp.id.toLowerCase().includes(query)
    );
  });

  // Category counts
  const categoryCounts = {
    all: GALLERY_COMPONENTS.length,
    form: GALLERY_COMPONENTS.filter((c) => c.category === 'form').length,
    feedback: GALLERY_COMPONENTS.filter((c) => c.category === 'feedback').length,
    navigation: GALLERY_COMPONENTS.filter((c) => c.category === 'navigation').length,
    data: GALLERY_COMPONENTS.filter((c) => c.category === 'data').length
  };

  // Render Mini Preview per component id
  const renderComponentPreview = (id: string) => {
    switch (id) {
      case 'button':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition">
              Primary
            </button>
            <button className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs border border-neutral-200 dark:border-neutral-700 active:scale-95 transition">
              Secondary
            </button>
            <button className="px-3.5 py-1.5 rounded-xl border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 font-semibold text-xs active:scale-95 transition">
              Outline
            </button>
            <button className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs active:scale-95 transition">
              Destructive
            </button>
          </div>
        );

      case 'input':
        return (
          <div className="w-full max-w-xs flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
              이메일 주소 입력
            </label>
            <input
              type="email"
              placeholder="user@atomdesign.com"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        );

      case 'selection':
        return (
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setSwitchState(!switchState)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  switchState ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    switchState ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {switchState ? '알림 켬' : '알림 끔'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxState}
                onChange={(e) => setCheckboxState(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                약관 동의
              </span>
            </label>
          </div>
        );

      case 'dialog':
        return (
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition"
            >
              다이얼로그 팝업 열기
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white">정말 탈퇴하시겠습니까?</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    탈퇴 시 저장된 모든 디자인 토큰 및 UX 설정 데이터가 즉시 삭제됩니다.
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white"
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'sheet':
        return (
          <div>
            <button
              onClick={() => setIsSheetOpen(true)}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs active:scale-95 transition"
            >
              바텀시트 슬라이드 열기
            </button>

            {isSheetOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
                <div className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 rounded-t-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
                  <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">매장 상세 정보</h3>
                    <button onClick={() => setIsSheetOpen(false)} className="text-neutral-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    모바일 환경에 최적화된 아래에서 위로 밀려 올라오는 인터랙션 시트입니다.
                  </p>
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'alert':
        return showAlert ? (
          <div className="w-full max-w-xs p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-100 flex items-start justify-between gap-2 text-xs">
            <div className="flex items-start gap-2">
              <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold block text-[11px]">토큰 업데이트 v1.2</span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300">새로운 시맨틱 컬러가 추가되었습니다.</span>
              </div>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-blue-400 hover:text-blue-600">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button onClick={() => setShowAlert(true)} className="text-xs text-blue-600 font-semibold underline">
            알림 다시 보기
          </button>
        );

      case 'tabs':
        return (
          <div className="w-full max-w-xs flex flex-col gap-2">
            <div className="flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold">
              {(['account', 'password', 'settings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1 rounded-lg transition capitalize text-[11px] ${
                    activeTab === tab
                      ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-600 dark:text-neutral-400">
              선택된 탭: <span className="font-bold text-blue-600 dark:text-blue-400 capitalize">{activeTab}</span>
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold text-xs">
              Primary
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs">
              정상 가동
            </span>
            <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold text-xs">
              오류 발생
            </span>
            <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 font-bold text-xs">
              대기 중
            </span>
          </div>
        );

      case 'card':
        return (
          <div className="w-full max-w-xs p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-blue-600 uppercase">자유적금 통장</span>
            <h4 className="font-bold text-xs text-neutral-900 dark:text-white">토스뱅크 굴비 적금</h4>
            <p className="text-[11px] text-neutral-500">연 4.5% 최고 금리 적용 중</p>
          </div>
        );

      case 'table':
        return (
          <div className="w-full max-w-xs border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden text-[11px]">
            <table className="w-full text-left">
              <thead className="bg-neutral-100 dark:bg-neutral-850 text-neutral-700 dark:text-neutral-300 font-bold border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="p-2">멤버</th>
                  <th className="p-2">상태</th>
                  <th className="p-2">권한</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-850">
                  <td className="p-2 font-bold">김민수</td>
                  <td className="p-2 text-emerald-600 font-semibold">정상</td>
                  <td className="p-2 text-neutral-500">Admin</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-850">
                  <td className="p-2 font-bold">이지은</td>
                  <td className="p-2 text-blue-600 font-semibold">활성</td>
                  <td className="p-2 text-neutral-500">Designer</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between transition-colors">
      {/* Global Header */}
      <Header brandColor={brandColor} />

      {/* Main 2-Column Documentation Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex gap-8 items-start">
        {/* 1. Left Column: Documentation Tree & Search Sidebar */}
        <DocsSidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeId="overview"
        />

        {/* 2. Right/Center Column: Component Catalog Hub */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {/* Hero Section */}
          <section className="flex flex-col gap-3 pb-6 border-b border-[var(--border-subtle)]">
            <div className="text-xs font-mono text-neutral-400">
              10 Core UI Components · Semantic Tokens & Framework Agnostic
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                컴포넌트 갤러리 (Components)
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                각 컴포넌트의 프리뷰와 실무 사용 케이스를 확인하고, 상세 페이지에서 React, Vue, HTML 구현 명세 및 설계 지침을 탐색할 수 있습니다.
              </p>
            </div>
          </section>

          {/* Category Filter Tabs & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(
                [
                  { id: 'all', label: '전체' },
                  { id: 'form', label: 'Form & Inputs' },
                  { id: 'feedback', label: 'Feedback' },
                  { id: 'navigation', label: 'Navigation' },
                  { id: 'data', label: 'Data Display' }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategory === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === tab.id ? 'bg-blue-700 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300'
                  }`}>
                    {categoryCounts[tab.id]}
                  </span>
                </button>
              ))}
            </div>

            {/* Live Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="컴포넌트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Component Catalog Cards Grid (Separate Page Links) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredComponents.map((component) => (
              <ComponentCatalogCard
                key={component.id}
                component={component}
                renderPreview={() => renderComponentPreview(component.id)}
              />
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <Search className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-neutral-700 dark:text-neutral-300">일치하는 컴포넌트가 없습니다</h3>
              <p className="text-xs text-neutral-400 mt-1">다른 검색어를 입력하시거나 카테고리 필터를 변경해보세요.</p>
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-12 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 AtomDesignToken · W3C DTCG Standard Component Catalog</p>
      </footer>
    </div>
  );
}
