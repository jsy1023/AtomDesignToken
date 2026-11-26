'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GalleryComponent } from '@/lib/data/components';
import { PATTERNS_COLLECTION } from '@/lib/data/patterns';
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { getComponentTypes, resolveStudioComponentId } from '@/lib/data/studioData';
import { useStudioRegistry, getStudioComponentById } from '@/lib/hooks/useStudioRegistry';
import { CodeHighlight } from '@/components/common/CodeHighlight';
import { getComponentTokens, getLocalizedToken } from '@/lib/data/componentTokens';
import {
  getComponentLocalizedData,
  getLocalizedPropDescription,
  getLocalizedSnippet,
  getLocalizedPattern,
} from '@/lib/i18n/componentTranslations';
import { useI18n } from '@/lib/i18n';
import { ComponentPreviewStage } from './ComponentLayoutDataStage';
import {
  ArrowRight,
  BookOpen,
  Box,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  Layers,
  Sliders,
  Sparkles,
  XCircle,
} from 'lucide-react';

interface ComponentDetailPageContentProps {
  component: GalleryComponent;
}

export function ComponentDetailPageContent({ component }: ComponentDetailPageContentProps) {
  const { t, locale } = useI18n();

  const localizedData = getComponentLocalizedData(component.id, locale);
  const displayName = localizedData?.name || component.name;
  const displayDescription = localizedData?.description || component.description;
  const displayUseCases = localizedData?.useCases || component.useCases;
  const displayUsagePatterns = localizedData?.usagePatterns || component.usagePatterns;
  const displayDosAndDonts = localizedData?.dosAndDonts || component.dosAndDonts;

  const [activeSnippetTab, setActiveSnippetTab] = useState<'react' | 'vue' | 'html'>('react');
  const [previewMode, setPreviewMode] = useState<'preview' | 'tokens'>('preview');
  const [copied, setCopied] = useState(false);
  const componentTokens = getComponentTokens(component.id);

  const { components: studioComponents, paletteVariables: studioPalette } = useStudioRegistry();
  const studioCompId = resolveStudioComponentId(component.id);
  const studioDef = getStudioComponentById(studioComponents, component.id);
  const compTypes = getComponentTypes(studioCompId, studioDef?.types);

  const rawSnippet =
    activeSnippetTab === 'react'
      ? component.reactSnippet
      : activeSnippetTab === 'vue'
      ? component.vueSnippet || component.reactSnippet
      : component.htmlSnippet;
  const activeSnippet = getLocalizedSnippet(rawSnippet, locale);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPatterns = PATTERNS_COLLECTION.filter((p) =>
    component.relatedPatternIds?.includes(p.id)
  );

  return (
    <>
      <div className="flex-1 min-w-0 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4 pb-6 border-b border-(--border-subtle)">
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle)">
                  .atom-{component.id}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                  {component.category}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-secondary) border border-(--border-subtle)">
                  {component.source}
                </span>
                <a
                  href="#tokens"
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) border border-(--accent-primary)/20 hover:bg-(--accent-primary)/20 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('componentsDoc.tokensBoundBadge', 'W3C 디자인 토큰 {n}개 연동됨 ↓').replace('{n}', String(componentTokens.length))}</span>
                </a>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">{displayName}</h1>
              <p className="text-sm sm:text-base text-(--text-secondary) mt-1.5 max-w-2xl leading-relaxed">{displayDescription}</p>
            </div>

            <Button variant="primary" size="md" onClick={handleCopyCode} className="text-sm font-medium flex items-center gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('common.copied', '복사 완료!') : t('componentsDoc.copyComponentCode', '컴포넌트 코드 복사')}</span>
            </Button>
          </div>
        </div>

        {/* 1. Interactive Live Preview */}
        <section id="preview" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-(--text-primary)">
              {t('componentsDoc.previewTitle', '인터랙티브 라이브 프리뷰 (Interactive Preview)')}
            </h2>
            <div className="flex items-center gap-1 bg-(--bg-secondary) p-1 rounded-(--radius) border border-(--border-subtle)">
              <Button
                type="button"
                size="sm"
                variant={previewMode === 'preview' ? 'primary' : 'ghost'}
                onClick={() => setPreviewMode('preview')}
                className="text-sm font-semibold h-auto py-1.5 px-3 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('componentsDoc.tabLivePreview', '라이브 뷰')}</span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant={previewMode === 'tokens' ? 'primary' : 'ghost'}
                onClick={() => setPreviewMode('tokens')}
                className="text-sm font-semibold h-auto py-1.5 px-3 flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t('componentsDoc.tabInspectTokens', '디자인 토큰값 조회')} ({componentTokens.length})</span>
              </Button>
            </div>
          </div>

          <div className="w-full min-h-[220px] p-6 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle) flex items-center justify-center">
            {previewMode === 'preview' ? (
              <ComponentPreviewStage
                componentId={component.id}
                studioCompId={studioCompId}
                locale={locale}
                studioDef={studioDef}
                compTypes={compTypes}
                studioPalette={studioPalette}
              />
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in">
                {componentTokens.map((tm, idx) => {
                  const locToken = getLocalizedToken(tm, locale);
                  return (
                    <div key={idx} className="p-4 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) flex flex-col gap-2 shadow-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-(--text-primary)">{locToken.role}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-(--bg-secondary) text-(--text-secondary) shrink-0">{tm.dtcgPath}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <code className="text-sm font-mono text-(--accent-primary) font-semibold">{tm.variable}</code>
                        <div className="flex items-center gap-2">
                          {tm.type === 'color' && (
                            <span
                              className="w-4 h-4 rounded-full border border-(--border-subtle) shadow-xs shrink-0"
                              style={{ backgroundColor: tm.defaultValue.startsWith('#') || tm.defaultValue.startsWith('rgb') ? tm.defaultValue : 'var(--accent-primary)' }}
                            />
                          )}
                          <span className="text-sm font-mono font-bold text-(--text-primary)">{tm.defaultValue}</span>
                        </div>
                      </div>
                      <p className="text-sm text-(--text-secondary) leading-relaxed mt-0.5">{locToken.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 2-A. Studio Design Types */}
        {compTypes && compTypes.length > 0 && (
          <section id="studio-types" className="scroll-mt-28 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-(--accent-primary)" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">
                  {locale === 'ko' ? '1. Type 디자인 외형 양식 카탈로그 (Studio Types)' : '1. Component Type Specifications'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) text-xs font-mono font-semibold">
                  {compTypes.length} Types Registered
                </span>
              </div>
              <Link href={`/studio?component=${studioCompId}`} className="text-xs font-semibold px-3 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) hover:bg-(--bg-primary) transition flex items-center gap-1.5 shadow-xs">
                <span>스튜디오에서 Type 관리</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {compTypes.map((tp, idx) => (
                <div key={tp.id} className="p-4 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-primary) flex flex-col justify-between gap-3 shadow-xs hover:border-(--accent-primary) transition group">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted)">#{idx + 1}</span>
                        <span className="font-bold text-xs text-(--text-primary)">{tp.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary)">type=&quot;{tp.id}&quot;</span>
                    </div>

                    <div className="py-3 px-2 rounded bg-(--bg-secondary)/40 border border-(--border-subtle)/60 flex items-center justify-center">
                      {component.id === 'button' ? (
                        <Button componentType={tp.id} variable="primary" size="sm">{tp.name.split(' (')[0]}</Button>
                      ) : (
                        <div className="text-xs font-mono text-(--text-muted)">&lt;{component.name.split(' (')[0]} componentType=&quot;{tp.id}&quot; /&gt;</div>
                      )}
                    </div>

                    <p className="text-[11px] text-(--text-secondary) leading-snug">{tp.description}</p>
                    {tp.whenToUse && (
                      <div className="text-[10px] text-(--text-muted) bg-(--bg-secondary)/50 p-2 rounded leading-relaxed border border-(--border-subtle)/30">
                        <strong className="text-(--text-secondary)">💡 추천 상황:</strong> {tp.whenToUse}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-(--border-subtle)/40 flex items-center justify-between text-[11px]">
                    <code className="text-[10px] text-(--text-muted) font-mono">componentType=&quot;{tp.id}&quot;</code>
                    <Link href={`/studio?component=${studioCompId}`} className="text-(--accent-primary) font-semibold hover:underline flex items-center gap-1">
                      <span>편집</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2-B. Studio Design Variables */}
        {studioDef && studioDef.variables.length > 0 && (
          <section id="studio-variables" className="scroll-mt-28 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-(--accent-primary)" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-primary)">
                  {locale === 'ja' ? '2. Studio 登録デザイン変数仕様 (Studio Variables)' : locale === 'en' ? '2. Studio-Configured Design Variables' : '2. Variable 디자인 세부 옵션 명세 (Studio Variables)'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) text-xs font-mono font-semibold">
                  {studioDef.variables.length} Variables Registered
                </span>
              </div>
              <Link href={`/studio?component=${studioCompId}`} className="text-xs font-semibold px-3 py-1.5 rounded-(--radius-sm) bg-(--accent-primary) text-white hover:opacity-90 transition flex items-center gap-1.5 shadow-xs">
                <span>스튜디오에서 변수 커스텀하기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {studioDef.variables.map((v) => (
                <div key={v.id} className="p-4 rounded-(--radius-sm) border border-(--border-subtle) bg-(--bg-primary) flex flex-col justify-between gap-3 shadow-xs hover:border-(--accent-primary) transition group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-(--text-primary)">{v.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-(--bg-secondary) text-(--text-muted) border border-(--border-subtle)">.{component.id}--{v.id}</span>
                    </div>
                    {component.id === 'button' && (
                      <div className="py-2.5 px-2 rounded bg-(--bg-secondary)/30 border border-(--border-subtle)/50 flex items-center justify-center">
                        <Button variable={v.id} size="sm">{v.name.split(' (')[0]}</Button>
                      </div>
                    )}
                    <p className="text-[11px] text-(--text-secondary) leading-snug line-clamp-2">{v.description}</p>
                  </div>

                  <div className="pt-2 border-t border-(--border-subtle)/60 space-y-1">
                    <div className="text-[10px] font-mono font-bold text-(--text-muted) uppercase">Token Bindings:</div>
                    <div className="space-y-0.5">
                      {Object.entries(v.tokenBindings).slice(0, 3).map(([prop, val]) => (
                        <div key={prop} className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-(--text-secondary)">{prop}:</span>
                          <span className="text-(--accent-primary) font-semibold truncate max-w-[130px]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-(--border-subtle)/40 flex items-center justify-between text-[11px]">
                    <code className="text-[10px] text-(--text-muted) font-mono">variable=&quot;{v.id}&quot;</code>
                    <Link href={`/studio?component=${studioCompId}`} className="text-(--accent-primary) font-semibold hover:underline flex items-center gap-1">
                      <span>편집</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. W3C DTCG Token Mapping Specification */}
        <section id="tokens" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-(--accent-primary)" />
              <span className="text-(--text-primary)">{t('componentsDoc.tokensTitle', '연동된 W3C DTCG 디자인 토큰 (tokens/tokens.json)')}</span>
              <span className="ml-1 px-2.5 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) text-xs font-mono font-semibold">
                {componentTokens.length} Tokens Bound
              </span>
            </h2>
            <div className="flex items-center gap-3">
              <Link href="/studio" className="text-sm font-semibold px-3 py-1.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle) hover:bg-(--bg-primary) transition flex items-center gap-1.5 shadow-xs">
                <Sliders className="w-3.5 h-3.5 text-(--accent-primary)" />
                <span>{t('componentsDoc.tokensEditInStudio', '테마 에디터에서 수정 (/studio)')}</span>
              </Link>
              <Link href="/tokens" className="text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) underline">
                {t('componentsDoc.tokensViewAll', '전체 토큰 명세 보기 →')}
              </Link>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">{t('componentsDoc.thRole', '토큰 역할 (Role)')}</TableHead>
                <TableHead className="w-1/4">{t('componentsDoc.thVariable', 'CSS 변수 (Variable)')}</TableHead>
                <TableHead className="w-1/4">{t('componentsDoc.thDtcgPath', 'DTCG JSON 경로')}</TableHead>
                <TableHead className="w-1/4">{t('componentsDoc.thDefaultValue', '기본값 및 기능 매핑')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentTokens.map((tm, idx) => {
                const locToken = getLocalizedToken(tm, locale);
                return (
                  <TableRow key={idx}>
                    <TableCell className="font-semibold text-sm text-(--text-primary)">{locToken.role}</TableCell>
                    <TableCell className="font-mono text-sm text-(--accent-primary) font-semibold"><code>{tm.variable}</code></TableCell>
                    <TableCell className="font-mono text-sm text-(--text-secondary)">{tm.dtcgPath}</TableCell>
                    <TableCell className="text-sm text-(--text-secondary)">
                      <div className="flex items-center gap-2">
                        {tm.type === 'color' && (
                          <span className="w-4 h-4 rounded-full border border-(--border-subtle) shrink-0 shadow-xs" style={{ backgroundColor: tm.defaultValue.startsWith('#') || tm.defaultValue.startsWith('rgb') ? tm.defaultValue : 'var(--accent-primary)' }} />
                        )}
                        <span className="font-mono font-bold text-(--text-primary)">{tm.defaultValue}</span>
                      </div>
                      <p className="text-sm text-(--text-secondary) mt-0.5">{locToken.description}</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>

        {/* 4. Code Copy Section */}
        <section id="code" className="scroll-mt-28 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-(--text-primary) flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-(--accent-primary)" />
              <span>{t('componentsDoc.codeSnippetTitle', '컴포넌트 코드 스니펫 (Code Copy)')}</span>
            </h2>
            <span className="text-sm text-(--text-secondary) font-mono">Framework Agnostic</span>
          </div>

          <div className="rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) overflow-hidden text-(--text-primary)">
            <div className="flex items-center justify-between px-4 py-2 border-b border-(--border-subtle) bg-(--bg-secondary)/40 text-sm font-semibold">
              <div className="flex items-center gap-1">
                {(['react', 'vue', 'html'] as const).map((tab) => (
                  <Button key={tab} variant={activeSnippetTab === tab ? 'primary' : 'ghost'} size="sm" onClick={() => setActiveSnippetTab(tab)} className="text-sm font-medium px-3 py-1.5 h-auto">
                    {tab === 'react' ? 'React / Next.js' : tab === 'vue' ? 'Vue 3' : 'Vanilla HTML'}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyCode} className="text-sm font-medium flex items-center gap-1.5 h-auto py-1.5">
                {copied ? <Check className="w-4 h-4 text-(--atom-color-success)" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t('componentsDoc.copied', '복사됨!') : t('componentsDoc.copyCode', '전체 코드 복사')}</span>
              </Button>
            </div>

            <CodeHighlight code={activeSnippet} language={activeSnippetTab === 'html' || activeSnippetTab === 'vue' ? 'html' : 'tsx'} className="p-4 bg-(--bg-secondary)/10" />
          </div>
        </section>

        {/* 5. Use Cases */}
        <section id="use-cases" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-(--accent-primary)" />
            <span>{t('componentsDoc.useCasesTitle', '실무 주요 사용 케이스 (Use Cases)')}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayUseCases.map((useCase, idx) => (
              <Card key={idx} className="p-4 flex items-start gap-3 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-(--bg-secondary) text-(--text-primary) font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-(--border-subtle)">
                  {idx + 1}
                </div>
                <p className="text-sm text-(--text-primary) leading-relaxed">{useCase}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 6. Usage Patterns */}
        <section id="patterns" className="scroll-mt-28 flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-(--accent-primary)" />
            <span>{t('componentsDoc.usagePatternsTitle', '권장 사용 패턴 및 설계 지침 (Usage Patterns)')}</span>
          </h2>
          <Card className="p-4 flex flex-col gap-2.5">
            {displayUsagePatterns.map((pattern, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-(--text-primary)">
                <span className="w-1.5 h-1.5 rounded-full bg-(--accent-primary) mt-2 shrink-0" />
                <p className="leading-relaxed">{pattern}</p>
              </div>
            ))}
          </Card>
        </section>

        {/* 7. Do's & Don'ts */}
        {displayDosAndDonts && displayDosAndDonts.length > 0 && (
          <section id="dos-donts" className="scroll-mt-28 flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary)">
              {t('componentsDoc.dosAndDontsTitle', "올바른 사용법 & 안티패턴 방지 (Do's & Don'ts)")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayDosAndDonts.map((rule, idx) => (
                <React.Fragment key={idx}>
                  <Card className="p-4 border-(--atom-color-success)/20 bg-(--atom-color-success)/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-(--atom-color-success)">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('componentsDoc.doLabel', 'DO (권장)')}</span>
                    </div>
                    <p className="text-sm text-(--text-primary) leading-relaxed">{rule.do}</p>
                  </Card>

                  <Card className="p-4 border-(--atom-color-destructive)/20 bg-(--atom-color-destructive)/5 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-(--atom-color-destructive)">
                      <XCircle className="w-4 h-4" />
                      <span>{t('componentsDoc.dontLabel', "DON'T (지양)")}</span>
                    </div>
                    <p className="text-sm text-(--text-primary) leading-relaxed">{rule.dont}</p>
                  </Card>
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {/* 8. API Props Reference */}
        {component.propsSpec && component.propsSpec.length > 0 && (
          <section id="props" className="scroll-mt-28 flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary)">
              {t('componentsDoc.propsSpecTitle', 'API Props 규격 명세 (API Reference)')}
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">{t('componentsDoc.propName', 'Property')}</TableHead>
                  <TableHead className="w-1/3">{t('componentsDoc.propType', 'Type')}</TableHead>
                  <TableHead className="w-1/6">{t('componentsDoc.propDefault', 'Default')}</TableHead>
                  <TableHead>{t('componentsDoc.propDescription', 'Description')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {component.propsSpec.map((prop, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-mono font-semibold text-(--text-primary) text-sm">{prop.name}</TableCell>
                    <TableCell className="font-mono text-sm text-(--text-secondary)">{prop.type}</TableCell>
                    <TableCell className="font-mono text-sm text-(--text-muted)">{prop.defaultValue}</TableCell>
                    <TableCell className="text-sm text-(--text-primary)">{getLocalizedPropDescription(prop.name, prop.description, locale)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        )}

        {/* 9. Related UX Patterns */}
        {relatedPatterns.length > 0 && (
          <section id="related" className="scroll-mt-28 flex flex-col gap-3 pt-4 border-t border-(--border-subtle)">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-(--text-secondary) flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-(--accent-primary)" />
              <span>{t('componentsDoc.relatedPatternsTitle', '이 컴포넌트가 사용되는 실무 UX 패턴')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedPatterns.map((pattern) => {
                const localizedPattern = getLocalizedPattern(pattern.id, pattern.title, pattern.categoryName, locale);
                return (
                  <Link
                    key={pattern.id}
                    href="/patterns"
                    className="p-4 rounded-(--radius) bg-(--bg-primary) border border-(--border-subtle) hover:border-(--border-strong) transition-colors flex flex-col justify-between gap-2 shadow-xs group"
                  >
                    <div>
                      <span className="text-xs font-medium text-(--text-secondary) uppercase">{localizedPattern.categoryName}</span>
                      <h3 className="text-base font-semibold text-(--text-primary) group-hover:text-(--accent-primary) transition-colors mt-0.5">
                        {localizedPattern.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-(--accent-primary)">
                      <span>{locale === 'ja' ? 'パターン詳細を見る' : locale === 'en' ? 'View Pattern Detail' : '패턴 상세 보기'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Right Column: On-Page TOC */}
      <aside className="w-52 shrink-0 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-(--border-subtle) select-none hidden xl:flex flex-col gap-3 text-sm">
        <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider">
          {t('componentsDoc.tocTitle', '이 페이지 목차')}
        </span>
        <ul className="flex flex-col gap-1.5 text-sm">
          <li><a href="#preview" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">{t('common.preview', '라이브 프리뷰')}</a></li>
          {studioDef && studioDef.variables.length > 0 && (
            <li>
              <a href="#studio-variables" className="text-(--accent-primary) font-semibold py-1 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>스튜디오 변수 ({studioDef.variables.length})</span>
              </a>
            </li>
          )}
          <li>
            <a href="#tokens" className="text-(--accent-primary) font-semibold py-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{t('componentsDoc.tokensTitle', '디자인 토큰 명세')} ({componentTokens.length})</span>
            </a>
          </li>
          <li><a href="#code" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">{t('componentsDoc.codeSnippetTitle', '코드 스니펫')}</a></li>
          <li><a href="#use-cases" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">{t('componentsDoc.useCasesTitle', '실무 사용 케이스')}</a></li>
          <li><a href="#patterns" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">{t('componentsDoc.usagePatternsTitle', '권장 사용 패턴')}</a></li>
          {component.dosAndDonts && component.dosAndDonts.length > 0 && (
            <li><a href="#dos-donts" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">{t('componentsDoc.dosAndDontsTitle', "Do's & Don'ts")}</a></li>
          )}
          {component.propsSpec && component.propsSpec.length > 0 && (
            <li><a href="#props" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">{t('componentsDoc.propsSpecTitle', 'API Props 명세')}</a></li>
          )}
          {relatedPatterns.length > 0 && (
            <li><a href="#related" className="text-(--text-secondary) hover:text-(--text-primary) py-1 block transition-colors">{t('componentsDoc.relatedPatternsTitle', '관련 UX 패턴')}</a></li>
          )}
        </ul>
      </aside>
    </>
  );
}
