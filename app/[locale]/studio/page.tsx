'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { exportToTokensJson, exportToCSS } from '@/lib/services/themeEngine';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { Button, Card, Badge, Input } from '@/components/ui';
import {
  Sliders,
  Sparkles,
  Save,
  Check,
  RotateCcw,
  Layers,
  Component,
  Palette,
  Type,
  FileCode,
  ShieldCheck,
  Eye,
  Terminal,
  ExternalLink,
} from 'lucide-react';

export default function LocalStudioPage() {
  const { theme, updateColor, updateBorderRadius, resetTheme } = useThemeEditor();
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'preview'>('tokens');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLocalHost, setIsLocalHost] = useState<boolean | null>(null);
  const [hostname, setHostname] = useState<string>('');
  const [copiedCli, setCopiedCli] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      setHostname(host);
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host.endsWith('.local');
      setIsLocalHost(isLocal);
    }
  }, []);

  const copyStudioCommand = () => {
    navigator.clipboard.writeText('npx atomsystem studio');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  // Brand Color & Radius
  const brandColor = theme?.color?.primary || '#3182f6';
  const borderRadius = theme?.borderRadius || '16px';

  // Save changes directly to tokens/token.json & css/atom-ui.css via /api/tokens
  const handleSaveToProject = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const generatedTokensJson = JSON.parse(exportToTokensJson(theme));
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: generatedTokensJson }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save');
      }

      setSaveSuccess(true);
      setStatusMessage('tokens/token.json 및 css/atom-ui.css에 실시간 반영되었습니다!');
      setTimeout(() => {
        setSaveSuccess(false);
        setStatusMessage(null);
      }, 4000);
    } catch (err: any) {
      setStatusMessage('저장 실패: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col font-sans transition-colors">
      <Header brandColor={brandColor} />

      {/* Case 1: Remote Production Web Environment Guard */}
      {isLocalHost === false ? (
        <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex-1 flex flex-col items-center justify-center text-center gap-6 animate-in fade-in">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
            <Terminal className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-semibold border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>로컬 프로젝트 전용 개발 도구 (Local-Only Feature)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-(--text-primary)">
              /studio는 로컬 환경에서만 동작합니다
            </h1>
            <p className="text-sm text-(--text-secondary) leading-relaxed">
              이 스튜디오는 라이브러리 사용자의 로컬 프로젝트 파일(<code className="font-mono text-xs px-1 py-0.5 rounded bg-(--bg-secondary)">tokens/token.json</code> 및 <code className="font-mono text-xs px-1 py-0.5 rounded bg-(--bg-secondary)">css/atom-ui.css</code>)과 직접 통신하여 토큰을 영구 저장하는 <strong>로컬 개발자 전용 GUI 도구</strong>입니다.
              <br />
              원격 배포 웹 환경({hostname})에서는 보안 및 격리 정책상 로컬 파일시스템에 접근할 수 없습니다.
            </p>
          </div>

          {/* Quick Command Execution Card */}
          <div className="w-full max-w-md p-5 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) flex flex-col gap-3 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-(--text-secondary) uppercase tracking-wider">
                로컬 프로젝트에서 스튜디오 실행 커맨드
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">
                CLI Command
              </span>
            </div>
            <div className="p-3.5 rounded-lg bg-(--bg-primary) border border-(--border-subtle) flex items-center justify-between font-mono text-sm">
              <span className="text-(--text-primary)">$ npx atomsystem studio</span>
              <button
                type="button"
                onClick={copyStudioCommand}
                className="text-neutral-400 hover:text-(--text-primary) transition cursor-pointer ml-2"
                title="커맨드 복사"
              >
                {copiedCli ? <Check className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-(--text-muted) leading-relaxed">
              💡 터미널에서 위 명령어를 실행하면 사용 중인 프로젝트의 토큰과 컴포넌트를 로컬 브라우저(<code className="font-mono">http://localhost:3000/studio</code>)에서 즉시 조회 및 편집할 수 있습니다.
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/guide"
              className="px-4 py-2 rounded-(--radius-sm) bg-(--text-primary) text-(--bg-primary) text-xs font-semibold hover:opacity-90 transition shadow-xs flex items-center gap-1.5"
            >
              <span>스튜디오 활용 가이드 읽기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/components/button"
              className="px-4 py-2 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) text-xs font-semibold hover:bg-(--bg-primary) transition shadow-xs"
            >
              컴포넌트 카탈로그 조회
            </Link>
          </div>
        </main>
      ) : (
        /* Case 2: Local Development Environment (localhost / 127.0.0.1) */
        <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col gap-8 animate-in fade-in">
          {/* Studio Hero Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-(--border-subtle) pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  🟢 LOCALHOST CONNECTED
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                  로컬 파일시스템 연동 (/studio)
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-(--text-primary)">
                로컬 디자인 토큰 & 컴포넌트 스튜디오 (Studio)
              </h1>
              <p className="text-sm text-(--text-secondary) mt-1">
                GUI 테마 에디터에서 시각적으로 토큰을 조정한 뒤, 클릭 한 번으로 내 로컬 프로젝트의 <code className="font-mono text-xs">tokens/token.json</code>과 <code className="font-mono text-xs">css/atom-ui.css</code>에 영구 반영합니다.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={resetTheme}
                className="flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>초기화</span>
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveToProject}
                disabled={isSaving}
                className="flex items-center gap-2 bg-(--accent-primary) text-(--bg-primary)"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>반영 완료!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? '프로젝트 저장 중...' : '프로젝트에 즉시 반영하기'}</span>
                  </>
                )}
              </Button>
            </div>
          </div>

        {/* Status notification banner */}
        {statusMessage && (
          <div className={`p-3.5 rounded-(--radius) text-sm font-medium flex items-center gap-2 ${
            saveSuccess 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
          }`}>
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Studio Mode Tabs */}
        <div className="flex items-center gap-2 border-b border-(--border-subtle) pb-2">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-4 py-2 rounded-(--radius-sm) text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'tokens'
                ? 'bg-(--text-primary) text-(--bg-primary)'
                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>토큰 실시간 편집 (Token Editor)</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`px-4 py-2 rounded-(--radius-sm) text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'components'
                ? 'bg-(--text-primary) text-(--bg-primary)'
                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
            }`}
          >
            <Component className="w-4 h-4" />
            <span>컴포넌트 실시간 조회 (Live Components)</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-(--radius-sm) text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-(--text-primary) text-(--bg-primary)'
                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>컴파일된 W3C JSON & CSS 보기</span>
          </button>
        </div>

        {/* Tab 1: Token Editor Controls */}
        {activeTab === 'tokens' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Color Controls */}
            <Card className="p-5 flex flex-col gap-4 shadow-xs">
              <div className="flex items-center gap-2 border-b border-(--border-subtle) pb-3">
                <Palette className="w-4 h-4 text-(--accent-primary)" />
                <h3 className="font-bold text-sm text-(--text-primary)">브랜드 & 서피스 컬러</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-(--text-secondary) mb-1.5 block">
                    Primary Brand Color (주요 액션)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => updateColor('primary', e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer border border-(--border-subtle) bg-transparent"
                    />
                    <input
                      type="text"
                      value={brandColor}
                      onChange={(e) => updateColor('primary', e.target.value)}
                      className="flex-1 font-mono text-xs px-2.5 py-1.5 rounded border border-(--border-subtle) bg-(--bg-secondary) text-(--text-primary)"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-(--text-secondary) mb-1.5 block">
                    Secondary / Surface Background
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={theme?.color?.bgSecondary || '#f8f9fa'}
                      onChange={(e) => updateColor('bgSecondary', e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer border border-(--border-subtle) bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme?.color?.bgSecondary || '#f8f9fa'}
                      onChange={(e) => updateColor('bgSecondary', e.target.value)}
                      className="flex-1 font-mono text-xs px-2.5 py-1.5 rounded border border-(--border-subtle) bg-(--bg-secondary) text-(--text-primary)"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Radius & Border Controls */}
            <Card className="p-5 flex flex-col gap-4 shadow-xs">
              <div className="flex items-center gap-2 border-b border-(--border-subtle) pb-3">
                <Sliders className="w-4 h-4 text-(--accent-primary)" />
                <h3 className="font-bold text-sm text-(--text-primary)">모서리 곡률 (Border Radius)</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-(--text-secondary) mb-1.5 block">
                    기본 곡률 프리셋
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['4px', '8px', '12px', '16px', '20px', '24px', '9999px'].map((r) => (
                      <button
                        key={r}
                        onClick={() => updateBorderRadius(r)}
                        className={`px-2 py-1.5 text-xs font-mono rounded cursor-pointer ${
                          borderRadius === r
                            ? 'bg-(--text-primary) text-(--bg-primary) font-bold'
                            : 'bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary)'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded border border-(--border-subtle) bg-(--bg-secondary)/40 flex items-center justify-center min-h-[90px]">
                  <div
                    style={{ borderRadius, backgroundColor: brandColor }}
                    className="w-24 h-12 flex items-center justify-center text-white text-xs font-mono font-bold shadow-xs transition-all duration-200"
                  >
                    {borderRadius}
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Live Preview Box */}
            <Card className="p-5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 border-b border-(--border-subtle) pb-3 mb-4">
                  <Eye className="w-4 h-4 text-(--accent-primary)" />
                  <h3 className="font-bold text-sm text-(--text-primary)">즉시 컴포넌트 반응</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      Primary CTA
                    </Button>
                    <Button variant="outline" size="sm">
                      Outline
                    </Button>
                  </div>
                  <Input placeholder="실시간 토큰 연동 인풋..." defaultValue="AtomDesignToken" />
                  <div className="flex items-center gap-2">
                    <Badge variant="primary">Active Badge</Badge>
                    <Badge variant="neutral">Neutral Tag</Badge>
                  </div>
                </div>
              </div>

              <p className="text-xs text-(--text-muted) mt-4 pt-2 border-t border-(--border-subtle)">
                상단 [프로젝트에 즉시 반영하기]를 누르면 저장소의 모든 토큰 파일에 자동 기록됩니다.
              </p>
            </Card>
          </div>
        )}

        {/* Tab 2: Live Components Browser */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 flex flex-col gap-3">
              <span className="font-bold text-sm text-(--text-primary)">Button 컴포넌트 패밀리</span>
              <p className="text-xs text-(--text-secondary)">Primary, Secondary, Outline, Destructive 상태</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="primary">저장하기</Button>
                <Button variant="secondary">취소</Button>
                <Button variant="outline">미리보기</Button>
                <Button variant="destructive">삭제</Button>
              </div>
            </Card>

            <Card className="p-5 flex flex-col gap-3">
              <span className="font-bold text-sm text-(--text-primary)">Form Inputs & Selection</span>
              <p className="text-xs text-(--text-secondary)">W3C 토큰 기반 반응형 폼 필드</p>
              <div className="space-y-2 pt-1">
                <Input placeholder="이메일 주소 입력" />
                <div className="flex items-center gap-2">
                  <Badge variant="primary">NEW</Badge>
                  <span className="text-xs text-(--text-secondary)">토큰 규격 자동 반영 중</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 3: Generated JSON & CSS */}
        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-(--text-secondary)">
                <span>tokens/token.json (W3C DTCG Format)</span>
              </div>
              <CodeHighlight
                code={exportToTokensJson(theme)}
                language="json"
                className="max-h-[460px] text-xs"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-(--text-secondary)">
                <span>css/atom-ui.css (Zero-Runtime CSS Variables)</span>
              </div>
              <CodeHighlight
                code={exportToCSS(theme)}
                language="css"
                className="max-h-[460px] text-xs"
              />
            </div>
          </div>
        )}
      </main>
      )}
    </div>
  );
}
