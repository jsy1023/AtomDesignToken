'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, Copy, Check, Terminal, Layers, Zap, MousePointerClick } from 'lucide-react';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'haptic' | 'spotlight' | 'sheet'>('haptic');

  const copyCommand = () => {
    navigator.clipboard.writeText('npx sensual-ui@latest init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      {/* Navigation Header */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Sensual UI</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-medium">v0.1 Clean Slate</span>
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <a href="#showcase" className="hover:text-neutral-900 dark:hover:text-white transition-colors">인터랙션 쇼케이스</a>
          <a href="#blocks" className="hover:text-neutral-900 dark:hover:text-white transition-colors">풀페이지 블록</a>
          <button 
            onClick={copyCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
            <span>npx sensual-ui init</span>
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-60" />}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/60 text-xs font-semibold text-neutral-600 dark:text-neutral-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>토큰 관리의 피로도를 끝내고, 압도적인 인터랙션에 집중합니다</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-neutral-900 dark:text-white mb-6">
          AI가 절대 흉내 낼 수 없는<br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            손맛 있는 감성 인터랙션
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
          수백 개의 토큰을 외울 필요가 없습니다. 복사 한 번으로 토스, 애플, 스트라이프 수준의 
          쫀득한 마이크로 인터랙션과 완성된 풀페이지 블록을 프로젝트에 꽂아 넣으세요.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 hover:bg-blue-700 active:scale-[0.97] transition-all duration-150">
            <span>컴포넌트 갤러리 탐색</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={copyCommand}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-850 active:scale-[0.97] transition-all"
          >
            <Terminal className="w-4 h-4 text-blue-500" />
            <span>CLI 복사하기</span>
          </button>
        </div>
      </section>

      {/* Interactive Micro-Interactions Showcase Demo */}
      <section id="showcase" className="relative z-10 max-w-5xl w-full mx-auto px-6 pb-24">
        <div className="p-1 rounded-3xl bg-gradient-to-b from-neutral-200/80 to-transparent dark:from-neutral-800/80 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
          <div className="bg-white dark:bg-neutral-900 rounded-[22px] p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-neutral-100 dark:border-neutral-800 gap-4">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <MousePointerClick className="w-5 h-5 text-blue-500" />
                  <span>실시간 마이크로 인터랙션 연구소</span>
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  클릭하고 드래그하며 직접 손맛(Haptic Feel)을 확인해보세요.
                </p>
              </div>

              {/* Tabs */}
              <div className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('haptic')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'haptic'
                      ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  토스 쫀득 버튼
                </button>
                <button
                  onClick={() => setActiveTab('spotlight')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'spotlight'
                      ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  3D 스포트라이트 카드
                </button>
                <button
                  onClick={() => setActiveTab('sheet')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'sheet'
                      ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  스마트 바텀시트
                </button>
              </div>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="py-16 flex items-center justify-center min-h-[280px]">
              {activeTab === 'haptic' && (
                <div className="flex flex-col items-center gap-4">
                  <button className="relative px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-base shadow-xl shadow-blue-500/30 active:scale-90 transition-all duration-75 select-none cursor-pointer">
                    꾹 눌러보세요 (Toss Haptic Spring)
                  </button>
                  <p className="text-xs text-neutral-400 font-mono">
                    active:scale-90 & transition-all duration-75 (즉각 감속 반응)
                  </p>
                </div>
              )}

              {activeTab === 'spotlight' && (
                <div className="w-80 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850 hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base mb-1">Depth & Spotlight Card</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    마우스를 올리면 시각적 깊이감(Z-axis)과 미세한 경계광이 부드럽게 살아납니다.
                  </p>
                </div>
              )}

              {activeTab === 'sheet' && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-72 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center animate-bounce">
                    <div className="w-10 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-3" />
                    <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                      속도(Velocity) 기반 제스처 바텀시트
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400">드래그 속도를 감지해 자연스럽게 튕겨 올라옵니다</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-100 dark:border-neutral-800/80 py-8 text-center text-xs text-neutral-400">
        <p>© 2026 Sensual UI. Built for the Agentic & AI Coding Era.</p>
      </footer>
    </main>
  );
}
