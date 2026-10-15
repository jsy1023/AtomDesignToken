'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { GalleryComponent } from '@/lib/data/components';
import { PATTERNS_COLLECTION } from '@/lib/data/patterns';
import {
  ArrowLeft,
  Copy,
  Check,
  Code2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  BookOpen,
  RefreshCw,
  X,
  Bell
} from 'lucide-react';

interface ComponentDetailPageContentProps {
  component: GalleryComponent;
}

export function ComponentDetailPageContent({ component }: ComponentDetailPageContentProps) {
  const { theme } = useThemeEditor();
  const brandColor = theme?.color?.primary || '#3182f6';
  const radius = theme?.borderRadius || '16px';

  const [activeSnippetTab, setActiveSnippetTab] = useState<'react' | 'vue' | 'html'>('react');
  const [copied, setCopied] = useState(false);

  // Interactive Live Demo states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'password' | 'settings'>('account');
  const [showAlert, setShowAlert] = useState(true);

  const activeSnippet =
    activeSnippetTab === 'react'
      ? component.reactSnippet
      : activeSnippetTab === 'vue'
      ? component.vueSnippet || component.reactSnippet
      : component.htmlSnippet;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render Live Preview
  const renderPreview = () => {
    switch (component.id) {
      case 'button':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition">
              Primary Action
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs border border-neutral-200 dark:border-neutral-700 active:scale-95 transition">
              Secondary
            </button>
            <button className="px-5 py-2.5 rounded-xl border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 font-bold text-xs active:scale-95 transition">
              Outline
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition">
              Destructive
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 font-bold text-xs cursor-not-allowed opacity-60">
              Disabled
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs inline-flex items-center gap-2 opacity-80 cursor-wait">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>로딩 중...</span>
            </button>
          </div>
        );

      case 'input':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                이메일 주소 (기본)
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-rose-500 block mb-1.5">
                에러 상태 인풋
              </label>
              <input
                type="text"
                defaultValue="invalid_email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-rose-500 text-rose-500 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
              <span className="text-[10px] text-rose-500 mt-1 block font-semibold">
                유효한 이메일 형식을 입력하세요.
              </span>
            </div>
          </div>
        );

      case 'selection':
        return (
          <div className="flex flex-wrap items-center justify-center gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setSwitchState(!switchState)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  switchState ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    switchState ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </div>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                {switchState ? '야간 푸시 알림 켜짐' : '야간 푸시 알림 꺼짐'}
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxState}
                onChange={(e) => setCheckboxState(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                이용약관 및 개인정보 처리방침 전체 동의
              </span>
            </label>
          </div>
        );

      case 'dialog':
        return (
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
            >
              모달 다이얼로그 열기
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">정말 송금하시겠습니까?</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    받는 분: 김토스 (토스뱅크 1002-***-4921)<br />
                    보낼 금액: <strong>₩500,000</strong> (수수료 면제)
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
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                    >
                      송금 완료
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
              className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs shadow-md transition"
            >
              바텀시트 드로어 열기
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
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 text-xs">
                    <div className="font-bold">블루보틀 성수 카페</div>
                    <div className="text-emerald-600 mt-1">● 현재 영업 중 (21:00 마감)</div>
                  </div>
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    길찾기 실행
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'alert':
        return showAlert ? (
          <div className="w-full max-w-md p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-100 flex items-start justify-between gap-3 text-xs">
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
          <button onClick={() => setShowAlert(true)} className="text-xs text-blue-600 font-semibold underline">
            알림 다시 열기
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
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 text-center">
              선택된 탭: <strong className="text-neutral-900 dark:text-white">{activeTab}</strong>
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              NEW Feature
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              온라인 연결됨
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              대기중
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
              오류 발생
            </span>
          </div>
        );

      case 'card':
        return (
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-300 max-w-xs w-full flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">토큰 바인딩 서피스</span>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white">토스뱅크 자유적금</h4>
            <div className="text-xl font-black text-neutral-900 dark:text-white">₩ 12,450,000</div>
            <p className="text-xs text-neutral-500">연 4.5% 최고 금리 적용 중</p>
          </div>
        );

      case 'table':
        return (
          <div className="w-full max-w-lg border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-neutral-100 dark:bg-neutral-850 text-neutral-700 dark:text-neutral-300 font-bold border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="p-3">멤버</th>
                  <th className="p-3">상태</th>
                  <th className="p-3">역할</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-850">
                  <td className="p-3 font-bold">김민수</td>
                  <td className="p-3 text-emerald-600 font-semibold">정상 가동</td>
                  <td className="p-3 text-neutral-500">소유자 (Admin)</td>
                </tr>
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-850">
                  <td className="p-3 font-bold">이지은</td>
                  <td className="p-3 text-blue-600 font-semibold">초대 수락</td>
                  <td className="p-3 text-neutral-500">디자이너</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  // Related Patterns
  const relatedPatterns = PATTERNS_COLLECTION.filter((p) =>
    component.relatedPatternIds?.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between transition-colors">
      {/* Global Header */}
      <Header brandColor={brandColor} />

      {/* Main 3-Column Documentation Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex gap-8 items-start">
        {/* 1. Left Column: Components Sidebar */}
        <DocsSidebar activeId={component.id} />

        {/* 2. Center Column: Main Component Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {/* Navigation & Header */}
          <div className="flex flex-col gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <Link
            href="/components"
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>전체 컴포넌트 갤러리로 돌아가기</span>
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span 
                  style={{ backgroundColor: `${brandColor}15`, color: brandColor, borderColor: `${brandColor}30` }}
                  className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                >
                  .atom-{component.id}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                  {component.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                  {component.source}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">
                {component.name}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed max-w-2xl">
                {component.description}
              </p>
            </div>

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '복사 완료!' : '컴포넌트 코드 복사'}</span>
            </button>
          </div>
        </div>

        {/* 1. Interactive Live Preview */}
        <section id="preview" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
            인터랙티브 라이브 프리뷰 (Interactive Preview)
          </h2>
          <div className="w-full min-h-[220px] p-8 rounded-3xl bg-neutral-100/70 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center shadow-inner">
            {renderPreview()}
          </div>
        </section>

        {/* 2. Code Copy Section (React / Vue / HTML) */}
        <section id="code" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-500" />
              <span>컴포넌트 코드 스니펫 (Code Copy)</span>
            </h2>
            <span className="text-xs text-neutral-400 font-mono">Framework Agnostic</span>
          </div>

          <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl text-neutral-200">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-950/80 text-xs font-semibold">
              <div className="flex items-center gap-1">
                {(['react', 'vue', 'html'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSnippetTab(tab)}
                    className={`px-3 py-1.5 rounded-lg transition capitalize ${
                      activeSnippetTab === tab
                        ? 'bg-neutral-800 text-blue-400 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab === 'react' ? 'React / Next.js' : tab === 'vue' ? 'Vue 3' : 'Vanilla HTML'}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-neutral-800"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨!' : '전체 코드 복사'}</span>
              </button>
            </div>

            <pre className="p-5 text-xs font-mono leading-relaxed overflow-x-auto text-neutral-300">
              <code>{activeSnippet}</code>
            </pre>
          </div>
        </section>

        {/* 3. Use Cases (사용 케이스) */}
        <section id="use-cases" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>실무 주요 사용 케이스 (Use Cases)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {component.useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Usage Patterns & Best Practices (사용 패턴) */}
        <section id="patterns" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>권장 사용 패턴 및 설계 지침 (Usage Patterns)</span>
          </h2>
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col gap-2.5">
            {component.usagePatterns.map((pattern, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <p className="leading-relaxed font-medium">{pattern}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Do's & Don'ts */}
        {component.dosAndDonts && component.dosAndDonts.length > 0 && (
          <section id="dos-donts" className="scroll-mt-28 flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              올바른 사용법 & 안티패턴 방지 (Do's & Don'ts)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {component.dosAndDonts.map((rule, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>DO (권장)</span>
                    </div>
                    <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                      {rule.do}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                      <XCircle className="w-4 h-4" />
                      <span>DON'T (지양)</span>
                    </div>
                    <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
                      {rule.dont}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {/* 6. API Props Reference */}
        {component.propsSpec && component.propsSpec.length > 0 && (
          <section id="props" className="scroll-mt-28 flex flex-col gap-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              API Props 규격 명세 (API Reference)
            </h2>
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-neutral-50 dark:bg-neutral-850 text-neutral-700 dark:text-neutral-300 font-bold border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    <th className="p-3 w-1/4">Property</th>
                    <th className="p-3 w-1/3">Type</th>
                    <th className="p-3 w-1/6">Default</th>
                    <th className="p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {component.propsSpec.map((prop, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-850/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{prop.name}</td>
                      <td className="p-3 font-mono text-[11px] text-purple-600 dark:text-purple-400">{prop.type}</td>
                      <td className="p-3 font-mono text-neutral-500 dark:text-neutral-400">{prop.defaultValue}</td>
                      <td className="p-3 text-neutral-700 dark:text-neutral-300 font-medium">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 7. Related UX Patterns */}
        {relatedPatterns.length > 0 && (
          <section id="related" className="scroll-mt-28 flex flex-col gap-3 pt-4 border-t border-neutral-200/80 dark:border-neutral-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>이 컴포넌트가 사용되는 실무 UX 패턴</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedPatterns.map((pattern) => (
                <Link
                  key={pattern.id}
                  href={`/patterns`}
                  className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 transition-all flex flex-col justify-between gap-2 shadow-xs group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">{pattern.categoryName}</span>
                    <h4 className="font-bold text-xs text-neutral-900 dark:text-white group-hover:text-blue-600 transition">
                      {pattern.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600">
                    <span>패턴 상세 보기</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        </div>

        {/* 3. Right Column: Quick On-Page Section TOC */}
        <aside className="w-52 shrink-0 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-neutral-200/80 dark:border-neutral-800 select-none hidden xl:flex flex-col gap-3">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            이 페이지 목차
          </span>
          <ul className="flex flex-col gap-1 text-xs">
            <li>
              <a href="#preview" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 py-1 block">
                라이브 프리뷰
              </a>
            </li>
            <li>
              <a href="#code" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 py-1 block">
                코드 스니펫
              </a>
            </li>
            <li>
              <a href="#use-cases" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 py-1 block">
                실무 사용 케이스
              </a>
            </li>
            <li>
              <a href="#patterns" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 py-1 block">
                권장 사용 패턴
              </a>
            </li>
            {component.dosAndDonts && component.dosAndDonts.length > 0 && (
              <li>
                <a href="#dos-donts" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 py-1 block">
                  Do's & Don'ts
                </a>
              </li>
            )}
            {component.propsSpec && component.propsSpec.length > 0 && (
              <li>
                <a href="#props" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 py-1 block">
                  API Props 규격
                </a>
              </li>
            )}
            {relatedPatterns.length > 0 && (
              <li>
                <a href="#related" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 py-1 block">
                  연관 UX 패턴
                </a>
              </li>
            )}
          </ul>
        </aside>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 mt-12 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 AtomDesignToken · W3C Design Tokens Community Group Standard</p>
      </footer>
    </div>
  );
}
