'use client';

import React, { useEffect, useState } from 'react';
import { FolderSearch, Loader2, Sparkles } from 'lucide-react';
import { Badge, Button, Card, Checkbox, Input, Modal } from '@/components/ui';
import type { AtomComponentSubmissionSpec, StudioRegistry } from '@/lib/data/studioData';

interface ExtractedColorStat {
  value: string;
  count: number;
  sources: string[];
}

interface DetectedCandidate {
  id: string;
  name: string;
  category: 'Form' | 'Layout' | 'Feedback' | 'Navigation' | 'Data';
  sourceKind: 'existing-component' | 'raw-html-pattern';
  occurrences: number;
  files: string[];
  detectedVariants: string[];
  detectedStatuses: string[];
  spec: AtomComponentSubmissionSpec;
}

interface AnalysisReport {
  scannedFiles: number;
  suggestedBrandColor: string;
  extractedColors: ExtractedColorStat[];
  candidates: DetectedCandidate[];
}

interface StudioImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  onImported: (result: {
    registry: StudioRegistry;
    importedComponents: string[];
    filesWritten: string[];
  }) => void;
}

export function StudioImportModal({
  isOpen,
  onClose,
  locale,
  onImported,
}: StudioImportModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [applyBrandTheme, setApplyBrandTheme] = useState(true);
  const [themeName, setThemeName] = useState('Imported Project Theme');
  const [brandColor, setBrandColor] = useState('var(--accent-primary)');

  const runAnalyze = async () => {
    setIsScanning(true);
    setError(null);
    try {
      const res = await fetch('/api/studio/analyze', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || '프로젝트 분석에 실패했습니다.');
        return;
      }
      const rep = data.report as AnalysisReport;
      setReport(rep);
      setBrandColor(rep.suggestedBrandColor || 'var(--accent-primary)');
      const initialSel: Record<string, boolean> = {};
      rep.candidates.forEach((c) => {
        initialSel[c.id] = true;
      });
      setSelectedIds(initialSel);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '네트워크 오류가 발생했습니다.');
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      void runAnalyze();
    }
  }, [isOpen]);

  const toggleCandidate = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleImport = async () => {
    if (!report) return;
    setIsImporting(true);
    setError(null);
    try {
      const chosenSpecs = report.candidates
        .filter((c) => selectedIds[c.id])
        .map((c) => c.spec);

      const res = await fetch('/api/studio/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          themeName: applyBrandTheme ? themeName : undefined,
          brandColor: applyBrandTheme ? brandColor : undefined,
          specs: chosenSpecs,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError((data.errors || []).join(' | ') || '가져오기 적용에 실패했습니다.');
        return;
      }
      onImported({
        registry: data.registry,
        importedComponents: data.importedComponents || [],
        filesWritten: data.filesWritten || [],
      });
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '가져오기 중 오류가 발생했습니다.');
    } finally {
      setIsImporting(false);
    }
  };

  const selectedCount = report
    ? report.candidates.filter((c) => selectedIds[c.id]).length
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        locale === 'ko'
          ? '기존 프로젝트 코드 분석 & 스튜디오 반영'
          : 'Analyze & Import Existing Project'
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-(--text-secondary)">
            {locale === 'ko'
              ? '현재 프로젝트의 소스코드를 스캔해 색상 토큰과 컴포넌트 후보를 추출하고 스튜디오 SSOT에 반영합니다.'
              : 'Scans project source files to extract brand colors and component candidates into Studio SSOT.'}
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={runAnalyze}
            disabled={isScanning}
            className="shrink-0 flex items-center gap-1.5 text-xs"
          >
            {isScanning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FolderSearch className="w-3.5 h-3.5" />
            )}
            <span>{locale === 'ko' ? '다시 스캔' : 'Rescan'}</span>
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-(--radius-sm) bg-(--atom-color-destructive)/10 border border-(--atom-color-destructive)/30 text-xs text-(--atom-color-destructive)">
            {error}
          </div>
        )}

        {isScanning && !report && (
          <div className="py-10 flex flex-col items-center justify-center gap-2 text-xs text-(--text-secondary)">
            <Loader2 className="w-5 h-5 animate-spin text-(--accent-primary)" />
            <span>{locale === 'ko' ? '프로젝트 소스코드 분석 중...' : 'Analyzing source files...'}</span>
          </div>
        )}

        {report && (
          <>
            <Card className="p-3.5 bg-(--bg-secondary)/60 border border-(--border-subtle) space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Checkbox
                  checked={applyBrandTheme}
                  onChange={(e) => setApplyBrandTheme(e.target.checked)}
                  label={
                    locale === 'ko'
                      ? `추출된 브랜드 테마 반영 (스캔 파일 ${report.scannedFiles}개)`
                      : `Apply extracted brand theme (${report.scannedFiles} files scanned)`
                  }
                />
                <Badge variant="info">{brandColor}</Badge>
              </div>

              {applyBrandTheme && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <Input
                    label={locale === 'ko' ? '테마 이름' : 'Theme Name'}
                    value={themeName}
                    onChange={(e) => setThemeName(e.target.value)}
                  />
                  <Input
                    label={locale === 'ko' ? '대표 브랜드 컬러 (HEX)' : 'Brand Color (HEX)'}
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                  />
                </div>
              )}

              {report.extractedColors.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {report.extractedColors.slice(0, 10).map((c) => (
                    <Button
                      key={c.value}
                      variant="secondary"
                      size="sm"
                      onClick={() => setBrandColor(c.value)}
                      className="h-6 px-2 text-[11px] font-mono flex items-center gap-1.5"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-(--border-strong)"
                        style={{ backgroundColor: c.value }}
                      />
                      <span>{c.value}</span>
                      <span className="text-(--text-muted)">({c.count})</span>
                    </Button>
                  ))}
                </div>
              )}
            </Card>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              <div className="text-xs font-semibold text-(--text-secondary)">
                {locale === 'ko'
                  ? `감지된 컴포넌트 후보 (${selectedCount}/${report.candidates.length} 선택됨)`
                  : `Detected Component Candidates (${selectedCount}/${report.candidates.length} selected)`}
              </div>

              {report.candidates.length === 0 ? (
                <Card className="p-4 text-center text-xs text-(--text-secondary)">
                  {locale === 'ko'
                    ? '감지된 신규 컴포넌트 후보가 없습니다.'
                    : 'No new component candidates detected.'}
                </Card>
              ) : (
                report.candidates.map((cand) => (
                  <Card
                    key={cand.id}
                    className="p-3 border border-(--border-subtle) flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <Checkbox
                        checked={Boolean(selectedIds[cand.id])}
                        onChange={() => toggleCandidate(cand.id)}
                        label={`${cand.name} (${cand.id})`}
                      />
                      <div className="text-[11px] font-mono text-(--text-secondary) pl-6 truncate">
                        {cand.files.slice(0, 2).join(', ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge variant="default">{cand.category}</Badge>
                      <Badge variant="info">
                        {cand.occurrences}
                        {locale === 'ko' ? '회' : 'x'}
                      </Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-(--border-subtle)">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {locale === 'ko' ? '취소' : 'Cancel'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleImport}
            disabled={isScanning || isImporting || !report}
            className="flex items-center gap-1.5"
          >
            {isImporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>
              {locale === 'ko'
                ? `스튜디오에 반영 (${selectedCount}개)`
                : `Import to Studio (${selectedCount})`}
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
