'use client';

import React, { useMemo, useState } from 'react';
import {
  AI_COMPONENT_SUBMISSION_TEMPLATE,
  AtomComponentSubmissionSpec,
  buildAiComponentSubmissionPrompt,
  StudioComponentDefinition,
  StudioRegistry,
} from '@/lib/data/studioData';
import { Badge, Button, Input, Modal, NativeSelect, Textarea } from '@/components/ui';
import { Check, Copy, FileCode2, Sparkles, Wand2 } from 'lucide-react';

export interface StudioComponentSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  onSubmitted: (result: {
    component: StudioComponentDefinition;
    registry: StudioRegistry;
    filesWritten: string[];
  }) => void;
}

const DEFAULT_JSON_TEXT = JSON.stringify(AI_COMPONENT_SUBMISSION_TEMPLATE, null, 2);

export function StudioComponentSubmitModal({
  isOpen,
  onClose,
  locale,
  onSubmitted,
}: StudioComponentSubmitModalProps) {
  const isKo = locale === 'ko';
  const [mode, setMode] = useState<'json' | 'form'>('json');
  const [jsonInput, setJsonInput] = useState<string>(DEFAULT_JSON_TEXT);
  const [promptCopied, setPromptCopied] = useState(false);

  // Quick Form Mode state
  const [compId, setCompId] = useState('status-banner');
  const [compName, setCompName] = useState('Status Banner (상태 공지 배너)');
  const [compCategory, setCompCategory] = useState<AtomComponentSubmissionSpec['category']>('Feedback');
  const [compDesc, setCompDesc] = useState('상단 중요 공지 및 상태 안내를 Type·Variable·Status 규칙으로 렌더링하는 배너');
  const [typeIdsText, setTypeIdsText] = useState('soft, solid, outlined');
  const [varIdsText, setVarIdsText] = useState('primary, warning, success');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorList, setErrorList] = useState<string[]>([]);

  const parsedPreview = useMemo(() => {
    if (mode !== 'json') return null;
    try {
      const obj = JSON.parse(jsonInput);
      const id = typeof obj?.id === 'string' ? obj.id.trim() : '';
      const typesCount = Array.isArray(obj?.types) ? obj.types.length : 0;
      const varsCount = Array.isArray(obj?.variables) ? obj.variables.length : 0;
      const pascal = id
        .split(/[^a-zA-Z0-9]+/)
        .filter(Boolean)
        .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
        .join('');
      return { validJson: true, id, pascal, typesCount, varsCount };
    } catch {
      return { validJson: false, id: '', pascal: '', typesCount: 0, varsCount: 0 };
    }
  }, [jsonInput, mode]);

  const handleCopyPrompt = () => {
    const prompt = buildAiComponentSubmissionPrompt(
      isKo ? '요청한 신규 UI 컴포넌트' : 'Requested UI component'
    );
    navigator.clipboard.writeText(prompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const buildSpecFromForm = (): AtomComponentSubmissionSpec => {
    const cleanId = compId
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const parsedTypes = typeIdsText
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const types = (parsedTypes.length > 0 ? parsedTypes : ['solid', 'outlined']).map((tId) => ({
      id: tId,
      name: `${tId.charAt(0).toUpperCase() + tId.slice(1)} (${tId})`,
      description: `${tId} 외형 양식`,
      whenToUse: `${tId} 디자인 양식이 필요한 화면 맥락에서 사용합니다.`,
    }));

    const parsedVars = varIdsText
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const tokenPreset = (vId: string) => {
      if (vId.includes('warn')) {
        return {
          background: '--atom-palette-amber-50',
          textColor: '--atom-palette-amber-800',
          borderColor: '--atom-color-warning',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        };
      }
      if (vId.includes('succ')) {
        return {
          background: '--atom-palette-emerald-50',
          textColor: '--atom-palette-emerald-800',
          borderColor: '--atom-color-success',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        };
      }
      if (vId.includes('dang') || vId.includes('destr')) {
        return {
          background: '--atom-palette-rose-50',
          textColor: '--atom-palette-rose-800',
          borderColor: '--atom-color-danger',
          borderRadius: '--atom-radius-md',
          paddingX: '--atom-space-4',
          paddingY: '--atom-space-2',
        };
      }
      return {
        background: '--atom-color-primary-subtle',
        textColor: '--atom-color-primary',
        borderColor: '--atom-color-primary',
        borderRadius: '--atom-radius-md',
        paddingX: '--atom-space-4',
        paddingY: '--atom-space-2',
      };
    };

    const variables = (parsedVars.length > 0 ? parsedVars : ['primary']).map((vId) => ({
      id: vId,
      name: `${vId.charAt(0).toUpperCase() + vId.slice(1)} (${vId})`,
      description: `${vId} 시맨틱 토큰 변형`,
      tokenBindings: tokenPreset(vId),
    }));

    return {
      id: cleanId || 'custom-widget',
      name: compName.trim() || cleanId || 'Custom Widget',
      category: compCategory,
      description: compDesc.trim() || '로컬 스튜디오에서 생성된 시맨틱 UI 컴포넌트',
      types,
      variables,
      supportedStatuses: ['default', 'hover', 'active', 'focus', 'disabled'],
    };
  };

  const handleSubmit = async () => {
    setErrorList([]);
    let payloadSpec: unknown;

    if (mode === 'json') {
      try {
        payloadSpec = JSON.parse(jsonInput);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Invalid JSON syntax';
        setErrorList([`JSON 파싱 오류: ${msg}`]);
        return;
      }
    } else {
      payloadSpec = buildSpecFromForm();
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/studio/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spec: payloadSpec }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setErrorList(
          Array.isArray(data?.errors)
            ? data.errors
            : [data?.error || '컴포넌트 등록에 실패했습니다.']
        );
        return;
      }

      onSubmitted({
        component: data.component,
        registry: data.registry,
        filesWritten: data.filesWritten || [],
      });
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setErrorList([msg]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isKo ? 'AI 컴포넌트 양식 제출 & 프로젝트 자동 반영' : 'Submit Component Spec to Studio SSOT'}
    >
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1 studio-scrollbar text-xs">
        {/* Intro Banner */}
        <div className="p-3 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle) space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-(--text-primary) flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-(--accent-primary)" />
              <span>{isKo ? 'Type · Variable · Status 표준 양식 자동 스캐폴딩' : '3-Tier Component Auto-Scaffolding'}</span>
            </span>
            <Badge variant="primary" className="text-[10px] font-mono">
              SSOT Registry
            </Badge>
          </div>
          <p className="text-[11px] text-(--text-secondary) leading-relaxed">
            {isKo
              ? '제출 즉시 components/ui/<Name>.tsx, index.ts, tokens/studio.registry.json, tokens/token.json, css/atom-ui.css가 자동 생성·동기화되어 스튜디오와 문서 전체에 즉시 반영됩니다.'
              : 'Automatically scaffolds components/ui/<Name>.tsx, exports barrel index, updates studio.registry.json, and recompiles tokens & CSS.'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-(--radius-sm) bg-(--bg-secondary) border border-(--border-subtle)">
          <Button
            variant={mode === 'json' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setMode('json')}
            className="text-xs h-8 flex items-center justify-center gap-1.5"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>{isKo ? 'AI JSON 명세 제출' : 'AI JSON Spec'}</span>
          </Button>
          <Button
            variant={mode === 'form' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setMode('form')}
            className="text-xs h-8 flex items-center justify-center gap-1.5"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>{isKo ? '빠른 폼 생성' : 'Quick Builder'}</span>
          </Button>
        </div>

        {mode === 'json' ? (
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyPrompt}
                className="text-[11px] h-7 px-2.5 flex items-center gap-1.5"
              >
                {promptCopied ? (
                  <Check className="w-3 h-3 text-(--atom-color-success)" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{promptCopied ? 'AI 프롬프트 복사됨' : 'AI 요청 프롬프트 복사'}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setJsonInput(DEFAULT_JSON_TEXT)}
                className="text-[11px] h-7 px-2 text-(--accent-primary)"
              >
                {isKo ? '샘플 양식 채우기' : 'Load Sample'}
              </Button>
            </div>

            <Textarea
              label={isKo ? 'AI 컴포넌트 명세 JSON (AtomComponentSubmissionSpec)' : 'Component Spec JSON'}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={11}
              className="font-mono text-[11px] leading-relaxed"
            />

            {parsedPreview && (
              <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary)/60 border border-(--border-subtle) flex flex-wrap items-center justify-between gap-2 text-[11px]">
                {parsedPreview.validJson ? (
                  <>
                    <div className="font-mono text-(--text-primary)">
                      ID: <strong className="text-(--accent-primary)">{parsedPreview.id || '?'}</strong>
                      {' · '}
                      File: <strong>components/ui/{parsedPreview.pascal || '?'}.tsx</strong>
                    </div>
                    <div className="font-mono text-(--text-secondary)">
                      {parsedPreview.typesCount} Types · {parsedPreview.varsCount} Vars
                    </div>
                  </>
                ) : (
                  <span className="text-(--atom-color-destructive) font-medium">
                    유효한 JSON 형식이 아닙니다.
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Input
                label="컴포넌트 ID (kebab-case)"
                value={compId}
                onChange={(e) => setCompId(e.target.value)}
                placeholder="status-banner"
              />
              <Input
                label="표시 이름"
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                placeholder="Status Banner (상태 배너)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-(--text-primary)">카테고리</label>
                <NativeSelect
                  value={compCategory}
                  onChange={(e) =>
                    setCompCategory(e.target.value as AtomComponentSubmissionSpec['category'])
                  }
                >
                  <option value="Form">Form (입력/액션)</option>
                  <option value="Layout">Layout (레이아웃)</option>
                  <option value="Feedback">Feedback (피드백)</option>
                  <option value="Navigation">Navigation (네비게이션)</option>
                  <option value="Data">Data (데이터)</option>
                </NativeSelect>
              </div>
              <Input
                label="Type 목록 (쉼표 구분)"
                value={typeIdsText}
                onChange={(e) => setTypeIdsText(e.target.value)}
                placeholder="soft, solid, outlined"
              />
            </div>

            <Input
              label="Variable 목록 (쉼표 구분)"
              value={varIdsText}
              onChange={(e) => setVarIdsText(e.target.value)}
              placeholder="primary, warning, success"
            />

            <Textarea
              label="설명 (Description)"
              value={compDesc}
              onChange={(e) => setCompDesc(e.target.value)}
              rows={2}
            />
          </div>
        )}

        {errorList.length > 0 && (
          <div className="p-2.5 rounded-(--radius-sm) border border-(--atom-color-destructive) bg-(--atom-color-danger-subtle,rgba(239,68,68,0.08)) text-(--atom-color-destructive) space-y-1 text-[11px]">
            {errorList.map((err, i) => (
              <div key={i}>• {err}</div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-(--border-subtle)">
          <Button variant="secondary" size="sm" onClick={onClose} disabled={isSubmitting}>
            {isKo ? '취소' : 'Cancel'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={isSubmitting}
            onClick={handleSubmit}
            className="font-bold"
          >
            {isSubmitting
              ? isKo
                ? '스캐폴딩 및 반영 중...'
                : 'Submitting...'
              : isKo
              ? '컴포넌트 등록 & 프로젝트 반영'
              : 'Register & Sync Component'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
