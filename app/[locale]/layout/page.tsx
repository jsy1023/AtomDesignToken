'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import { Container, Stack, Grid, Card, Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import {
  Maximize2,
  Columns,
  Rows,
  Layers,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function LayoutGuidePage() {
  const { theme } = useThemeEditor();
  const t = useTranslations('layoutPage');
  const brandColor = theme?.color?.primary || 'var(--accent-primary)';

  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeStackGap, setActiveStackGap] = useState<'2' | '4' | '6' | '8'>('4');
  const [activeGridCols, setActiveGridCols] = useState<2 | 3 | 4>(3);
  const [activeContainerSize, setActiveContainerSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const containerSpecs = [
    { name: 'sm', token: '--atom-container-sm', width: '640px', usage: t('containerSm') },
    { name: 'md', token: '--atom-container-md', width: '768px', usage: t('containerMd') },
    { name: 'lg', token: '--atom-container-lg', width: '1024px', usage: t('containerLg') },
    { name: 'xl', token: '--atom-container-xl', width: '1280px', usage: t('containerXl') },
    { name: '2xl', token: '--atom-container-2xl', width: '1536px', usage: t('container2Xl') },
  ];

  const spacingScale = [
    { step: '1', token: '--atom-space-1', px: '4px', usage: t('space1') },
    { step: '2', token: '--atom-space-2', px: '8px', usage: t('space2') },
    { step: '3', token: '--atom-space-3', px: '12px', usage: t('space3') },
    { step: '4', token: '--atom-space-4', px: '16px', usage: t('space4') },
    { step: '5', token: '--atom-space-5', px: '20px', usage: t('space5') },
    { step: '6', token: '--atom-space-6', px: '24px', usage: t('space6') },
    { step: '8', token: '--atom-space-8', px: '32px', usage: t('space8') },
    { step: '12', token: '--atom-space-12', px: '48px', usage: t('space12') },
    { step: '16', token: '--atom-space-16', px: '64px', usage: t('space16') },
  ];

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) flex flex-col justify-between transition-colors font-sans">
      <Header brandColor={brandColor} />

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 flex-1 flex flex-col gap-10">
        {/* Hero Section */}
        <section className="space-y-3 border-b border-(--border-subtle) pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-(--text-muted)">
            <span className="text-(--atom-color-success) font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t('badgeArchitecture')}
            </span>
            <span>•</span>
            <span>{t('badgeStandard')}</span>
            <span>•</span>
            <span>{t('badgeZeroRuntime')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--text-primary)">
            {t('title')}
          </h1>

          <p className="text-base text-(--text-secondary) leading-relaxed max-w-3xl">
            {t('description')}
          </p>
        </section>

        {/* 1. Container Architecture & Live Interactive Demo */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-(--accent-primary)" />
                <span>{t('containerTitle')}</span>
              </h2>
              <p className="text-sm text-(--text-secondary) mt-1">
                {t('containerDesc')}
              </p>
            </div>
          </div>

          {/* Interactive Controller */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-(--radius) bg-(--bg-secondary)/50 border border-(--border-subtle)">
            <span className="text-xs font-semibold text-(--text-secondary) uppercase tracking-wider mr-2">
              {t('containerTest')}
            </span>
            {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
              <Button
                key={sz}
                variant={activeContainerSize === sz ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveContainerSize(sz)}
                className={`px-3 py-1.5 h-auto text-xs font-mono ${
                  activeContainerSize === sz ? 'font-semibold shadow-xs' : 'text-(--text-secondary)'
                }`}
              >
                size="{sz}" ({containerSpecs.find((c) => c.name === sz)?.width})
              </Button>
            ))}
          </div>

          {/* Live Preview Stage */}
          <div className="p-6 rounded-(--radius) border border-(--border-subtle) bg-(--bg-secondary)/20 flex items-center justify-center overflow-hidden min-h-[160px]">
            <Container
              size={activeContainerSize}
              className="p-6 rounded-(--radius) border-2 border-dashed border-(--accent-primary) bg-(--bg-primary) text-center transition-all duration-300"
            >
              <div className="font-mono text-sm font-bold text-(--text-primary)">
                &lt;Container size="{activeContainerSize}" /&gt;
              </div>
              <p className="text-xs text-(--text-secondary) mt-1">
                {t('containerMaxWidthNotice', {
                  width: containerSpecs.find((c) => c.name === activeContainerSize)?.width || ''
                })}
              </p>
            </Container>
          </div>

          {/* Container Token Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-3">{t('thSize')}</TableHead>
                <TableHead className="p-3">{t('thToken')}</TableHead>
                <TableHead className="p-3">{t('thMaxWidth')}</TableHead>
                <TableHead className="p-3">{t('thUsage')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {containerSpecs.map((c) => (
                <TableRow key={c.name} className="hover:bg-(--bg-secondary)/30 transition-colors">
                  <TableCell className="p-3 font-mono font-bold text-(--text-primary)">size="{c.name}"</TableCell>
                  <TableCell className="p-3 font-mono text-xs text-(--text-secondary)">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(`var(${c.token})`)}
                      className="hover:underline flex items-center gap-1 h-auto p-0 text-xs font-mono"
                      title="Copy"
                    >
                      <span>var({c.token})</span>
                      {copiedToken === `var(${c.token})` ? (
                        <Check className="w-3 h-3 text-(--atom-color-success)" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-40" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="p-3 font-mono font-semibold text-(--text-primary)">{c.width}</TableCell>
                  <TableCell className="p-3 text-sm text-(--text-secondary)">{c.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* 2. Spacing Scale System */}
        <section className="space-y-4 pt-4 border-t border-(--border-subtle)">
          <div>
            <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
              <Layers className="w-5 h-5 text-(--accent-primary)" />
              <span>{t('spacingTitle')}</span>
            </h2>
            <p className="text-sm text-(--text-secondary) mt-1">
              {t('spacingDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {spacingScale.map((s) => (
              <Card key={s.step} className="p-3.5 flex flex-col justify-between gap-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-(--text-primary)">
                    gap="{s.step}" / space-{s.step}
                  </span>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-(--radius-sm) bg-(--bg-secondary) text-(--text-primary) border border-(--border-subtle)">
                    {s.px}
                  </span>
                </div>

                {/* Visual Representation Bar */}
                <div className="w-full bg-(--bg-secondary) h-3 rounded-(--radius-sm) overflow-hidden flex items-center">
                  <div
                    className="bg-(--accent-primary) h-full rounded-(--radius-sm)"
                    style={{ width: `min(100%, ${parseInt(s.px, 10) * 2}px)` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-(--text-secondary) pt-1 border-t border-(--border-subtle)">
                  <span className="truncate pr-2">{s.usage}</span>
                  <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(`var(${s.token})`)}
                        className="hover:underline flex items-center gap-1 h-auto p-0 text-xs font-mono"
                        title="Copy"
                      >
                        <span>var({s.token})</span>
                        {copiedToken === `var(${s.token})` ? (
                          <Check className="w-3 h-3 text-(--atom-color-success)" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-40" />
                        )}
                      </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Stack (Vertical / Horizontal) & Grid */}
        <section className="space-y-4 pt-4 border-t border-(--border-subtle)">
          <div>
            <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
              <Rows className="w-5 h-5 text-(--accent-primary)" />
              <span>{t('stackGridTitle')}</span>
            </h2>
            <p className="text-sm text-(--text-secondary) mt-1">
              {t('stackGridDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stack Live Demo */}
            <div className="p-5 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-(--text-primary) flex items-center gap-1.5">
                  <Rows className="w-4 h-4 text-(--accent-primary)" />
                  {t('stackTitle')}
                </span>
                <div className="flex items-center gap-1">
                  {(['2', '4', '6', '8'] as const).map((g) => (
                    <Button
                      key={g}
                      variant={activeStackGap === g ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setActiveStackGap(g)}
                      className={`px-2 py-0.5 h-auto text-xs font-mono ${
                        activeStackGap === g
                          ? 'font-bold'
                          : 'text-(--text-secondary)'
                      }`}
                    >
                      gap="{g}"
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) min-h-[160px]">
                <Stack gap={activeStackGap}>
                  <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-sm font-medium">
                    Stack Item A
                  </div>
                  <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-sm font-medium">
                    Stack Item B
                  </div>
                  <div className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-sm font-medium">
                    Stack Item C
                  </div>
                </Stack>
              </div>

              <div className="text-xs text-(--text-secondary) font-mono bg-(--bg-secondary)/30 p-2.5 rounded-(--radius-sm)">
                &lt;Stack gap="{activeStackGap}"&gt;...&lt;/Stack&gt;
              </div>
            </div>

            {/* Grid Live Demo */}
            <div className="p-5 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-(--text-primary) flex items-center gap-1.5">
                  <Columns className="w-4 h-4 text-(--accent-primary)" />
                  {t('gridTitle')}
                </span>
                <div className="flex items-center gap-1">
                  {([2, 3, 4] as const).map((c) => (
                    <Button
                      key={c}
                      variant={activeGridCols === c ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setActiveGridCols(c)}
                      className={`px-2 py-0.5 h-auto text-xs font-mono ${
                        activeGridCols === c
                          ? 'font-bold'
                          : 'text-(--text-secondary)'
                      }`}
                    >
                      cols={c}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) min-h-[160px]">
                <Grid cols={activeGridCols} gap="3">
                  {Array.from({ length: activeGridCols }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-(--radius-sm) bg-(--bg-primary) border border-(--border-subtle) text-center text-sm font-medium"
                    >
                      Col {i + 1}
                    </div>
                  ))}
                </Grid>
              </div>

              <div className="text-xs text-(--text-secondary) font-mono bg-(--bg-secondary)/30 p-2.5 rounded-(--radius-sm)">
                &lt;Grid cols={activeGridCols} gap="3"&gt;...&lt;/Grid&gt;
              </div>
            </div>
          </div>
        </section>

        {/* 4. Best Practices (Do's & Don'ts) */}
        <section className="space-y-4 pt-4 border-t border-(--border-subtle)">
          <h2 className="text-lg font-bold text-(--text-primary)">
            {t('dosDontsTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border-(--atom-color-success)/20 bg-(--atom-color-success)/5 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-(--atom-color-success)">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('doTitle')}</span>
              </div>
              <ul className="text-sm text-(--text-primary) space-y-1.5 list-disc list-inside leading-relaxed">
                <li>{t('doItem1')}</li>
                <li>{t('doItem2')}</li>
                <li>{t('doItem3')}</li>
              </ul>
            </Card>

            <Card className="p-4 border-(--atom-color-destructive)/20 bg-(--atom-color-destructive)/5 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-(--atom-color-destructive)">
                <XCircle className="w-4 h-4" />
                <span>{t('dontTitle')}</span>
              </div>
              <ul className="text-sm text-(--text-primary) space-y-1.5 list-disc list-inside leading-relaxed">
                <li>{t('dontItem1')}</li>
                <li>{t('dontItem2')}</li>
                <li>{t('dontItem3')}</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Navigation to Components */}
        <section className="pt-6 border-t border-(--border-subtle) flex items-center justify-between">
          <Link
            href="/tokens"
            className="text-sm font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors flex items-center gap-1"
          >
            {t('linkToTokens')}
          </Link>
          <Link
            href="/components/button"
            className="text-sm font-bold text-(--text-primary) hover:underline flex items-center gap-1"
          >
            {t('linkToComponents')}
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-(--border-subtle) py-6 px-6 text-center text-xs text-(--text-muted) bg-(--bg-secondary)/30 mt-12">
        <p>© 2026 AtomDesignToken · W3C Design Tokens Community Group Standard</p>
      </footer>
    </div>
  );
}
