'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { GALLERY_COMPONENTS, GalleryComponent } from '@/lib/data/components';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocsTOC } from '@/components/docs/DocsTOC';
import { ComponentDocCard } from '@/components/docs/ComponentDocCard';
import {
  Sparkles,
  Terminal,
  Copy,
  Check,
  RefreshCw,
  Search,
  Bell,
  X,
  ChevronRight,
  ExternalLink,
  Code2,
  Info
} from 'lucide-react';

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('getting-started');

  // Interactive Live Demo states
  const [copiedCli, setCopiedCli] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'password' | 'settings'>('account');
  const [showAlert, setShowAlert] = useState(true);

  // Search filtering
  const filteredComponents = GALLERY_COMPONENTS.filter((comp) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      comp.name.toLowerCase().includes(query) ||
      comp.description.toLowerCase().includes(query) ||
      comp.category.toLowerCase().includes(query) ||
      comp.id.toLowerCase().includes(query)
    );
  });

  // Render Live Preview per component id
  const renderComponentPreview = (id: string) => {
    switch (id) {
      case 'button':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition">
              Primary Button
            </button>
            <button className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs border border-neutral-200 dark:border-neutral-700 active:scale-95 transition">
              Secondary
            </button>
            <button className="px-4 py-2 rounded-xl border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 font-semibold text-xs active:scale-95 transition">
              Outline
            </button>
            <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition">
              Destructive
            </button>
            <button className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 font-semibold text-xs cursor-not-allowed opacity-60">
              Disabled
            </button>
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs inline-flex items-center gap-2 opacity-80 cursor-wait">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>로딩 중...</span>
            </button>
          </div>
        );

      case 'input':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <div>
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 block mb-1.5">
                기본 텍스트 인풋
              </label>
              <input
                type="text"
                placeholder="홍길동"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-500 block mb-1.5">
                에러 상태 인풋
              </label>
              <input
                type="email"
                defaultValue="invalid-email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-rose-500 text-rose-500 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
              <span className="text-[10px] text-rose-500 mt-1 block font-medium">유효한 이메일을 입력하세요.</span>
            </div>
          </div>
        );

      case 'selection':
        return (
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Switch Toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
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
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                {switchState ? '알림 켜짐' : '알림 꺼짐'}
              </span>
            </label>

            {/* Checkbox */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxState}
                onChange={(e) => setCheckboxState(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                이용약관 전체 동의
              </span>
            </label>
          </div>
        );

      case 'dialog':
        return (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition"
            >
              모달 다이얼로그 열기
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">정말 탈퇴하시겠습니까?</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    계정을 삭제하면 모든 디자인 토큰 설정과 저장된 프로젝트가 영구히 소멸됩니다.
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'sheet':
        return (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setIsSheetOpen(true)}
              className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs shadow-md transition"
            >
              바텀시트 드로어 열기
            </button>

            {isSheetOpen && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center">
                <div className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 rounded-t-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
                  <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">필터 및 정렬 옵션</h3>
                    <button onClick={() => setIsSheetOpen(false)} className="text-neutral-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                    <label className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-850">
                      <span>최신순 정렬</span>
                      <input type="radio" name="sort" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-850">
                      <span>인기순 정렬</span>
                      <input type="radio" name="sort" />
                    </label>
                  </div>
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    적용하기
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'alert':
        return showAlert ? (
          <div className="w-full max-w-md p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-100 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold block">새로운 버전 v1.2 업데이트</span>
                <span className="text-[11px] text-blue-700 dark:text-blue-300">
                  W3C DTCG 호환 스타일 딕셔너리 컴파일러가 추가되었습니다.
                </span>
              </div>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-blue-400 hover:text-blue-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAlert(true)}
            className="text-xs text-blue-600 font-semibold underline"
          >
            알림 다시 보기
          </button>
        );

      case 'tabs':
        return (
          <div className="w-full max-w-sm flex flex-col gap-3">
            <div className="flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold">
              {(['account', 'password', 'settings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 rounded-lg transition capitalize ${
                    activeTab === tab
                      ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 text-center">
              현재 활성화된 탭 패널: <strong className="text-neutral-900 dark:text-white">{activeTab}</strong>
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              NEW Feature
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              온라인 활성
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              대기중
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
              심사 반려
            </span>
          </div>
        );

      case 'card':
        return (
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-300 max-w-xs w-full flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">토큰 바인딩 카드</span>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">토스뱅크 자유적금</h4>
            <div className="text-lg font-black text-neutral-900 dark:text-white">₩ 12,450,000</div>
            <p className="text-[11px] text-neutral-500">연 4.5% 최고 금리 적용 중</p>
          </div>
        );

      case 'table':
        return (
          <div className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-neutral-100 dark:bg-neutral-850 text-neutral-700 dark:text-neutral-300 font-bold border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="p-2.5">멤버</th>
                  <th className="p-2.5">상태</th>
                  <th className="p-2.5">권한</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-850">
                  <td className="p-2.5 font-bold">김민수</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">정상 가동</td>
                  <td className="p-2.5 text-neutral-500">소유자 (Admin)</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-850">
                  <td className="p-2.5 font-bold">이지은</td>
                  <td className="p-2.5 text-blue-600 font-semibold">초대 수락</td>
                  <td className="p-2.5 text-neutral-500">디자이너</td>
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors">
      {/* Global Header */}
      <Header />

      {/* Main 3-Column Documentation Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex gap-8 items-start">
        {/* 1. Left Column: Documentation Tree & Search Sidebar */}
        <DocsSidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeId={activeSectionId}
          onSelectComponent={setActiveSectionId}
        />

        {/* 2. Center Column: Main Documentation Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {/* Documentation Hero & CLI Quickstart Section */}
          <section id="getting-started" className="scroll-mt-28 flex flex-col gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-600 dark:text-blue-400 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3단 개발자 기술 문서 & API 레퍼런스 UX 패턴 적용</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                컴포넌트 갤러리 & API 레퍼런스
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                W3C DTCG 디자인 토큰 표준과 shadcn/ui + Bootstrap 접근성을 결합한 10대 핵심 컴포넌트입니다. 복사 한 번으로 프로젝트에 즉시 붙여넣을 수 있습니다.
              </p>
            </div>

            {/* Quickstart CLI Callout Box */}
            <div className="p-4 rounded-2xl bg-neutral-900 text-white flex flex-col gap-2 font-mono shadow-md border border-neutral-800">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  라이브러리 원클릭 초기화 (Quickstart)
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('npx atomsystem init');
                    setCopiedCli(true);
                    setTimeout(() => setCopiedCli(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white transition px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-750"
                >
                  {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCli ? '복사완료!' : '명령어 복사'}</span>
                </button>
              </div>
              <div className="text-emerald-400 text-xs sm:text-sm">
                $ npx atomsystem init
              </div>
            </div>
          </section>

          {/* Component Documentation Cards List */}
          <div className="flex flex-col gap-8">
            {filteredComponents.map((component) => (
              <ComponentDocCard
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
              <p className="text-xs text-neutral-400 mt-1">다른 검색어를 입력하시거나 좌측 사이드바에서 찾아보세요.</p>
            </div>
          )}
        </div>

        {/* 3. Right Column: TOC Scroll Spy (On this page) */}
        <DocsTOC
          activeId={activeSectionId}
          onSelectId={setActiveSectionId}
        />
      </main>

      {/* Global Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-12 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 AtomDesignToken · Developer Documentation & API Reference UX Pattern</p>
      </footer>
    </div>
  );
}
