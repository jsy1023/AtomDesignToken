'use client';

import React from 'react';
import { useThemeEditor } from '../ThemeEditorProvider';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export function LivePreviewTab() {
  const { theme } = useThemeEditor();
  const { color, typography, borderRadius } = theme;

  return (
    <div className="space-y-6">
      {/* 1. Typography Hierarchy Showcase */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
          타이포그래피 계층 (h1 ~ h6)
        </h3>
        <div className="space-y-3 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              H1 ({typography.h1.fontSize}px / w{typography.h1.fontWeight})
            </span>
            <h1
              style={{
                fontSize: `${typography.h1.fontSize}px`,
                lineHeight: typography.h1.lineHeight,
                fontWeight: typography.h1.fontWeight,
                letterSpacing: typography.h1.letterSpacing,
                color: color.textPrimary,
              }}
            >
              차세대 디자인 토큰 시스템
            </h1>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              H2 ({typography.h2.fontSize}px / w{typography.h2.fontWeight})
            </span>
            <h2
              style={{
                fontSize: `${typography.h2.fontSize}px`,
                lineHeight: typography.h2.lineHeight,
                fontWeight: typography.h2.fontWeight,
                letterSpacing: typography.h2.letterSpacing,
                color: color.textPrimary,
              }}
            >
              원클릭 프롬프트 및 코드 동기화
            </h2>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              H3 ({typography.h3.fontSize}px / w{typography.h3.fontWeight})
            </span>
            <h3
              style={{
                fontSize: `${typography.h3.fontSize}px`,
                lineHeight: typography.h3.lineHeight,
                fontWeight: typography.h3.fontWeight,
                letterSpacing: typography.h3.letterSpacing,
                color: color.textPrimary,
              }}
            >
              W3C 커뮤니티 그룹 표준 토큰 스키마
            </h3>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              H4 ({typography.h4.fontSize}px / w{typography.h4.fontWeight})
            </span>
            <h4
              style={{
                fontSize: `${typography.h4.fontSize}px`,
                lineHeight: typography.h4.lineHeight,
                fontWeight: typography.h4.fontWeight,
                letterSpacing: typography.h4.letterSpacing,
                color: color.textPrimary,
              }}
            >
              모든 프레임워크 지원 (React, Vue, 바닐라)
            </h4>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              H5 ({typography.h5.fontSize}px / w{typography.h5.fontWeight})
            </span>
            <h5
              style={{
                fontSize: `${typography.h5.fontSize}px`,
                lineHeight: typography.h5.lineHeight,
                fontWeight: typography.h5.fontWeight,
                letterSpacing: typography.h5.letterSpacing,
                color: color.textPrimary,
              }}
            >
              고접근성 가이드라인 및 색상 대비 준수
            </h5>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              H6 ({typography.h6.fontSize}px / w{typography.h6.fontWeight})
            </span>
            <h6
              style={{
                fontSize: `${typography.h6.fontSize}px`,
                lineHeight: typography.h6.lineHeight,
                fontWeight: typography.h6.fontWeight,
                letterSpacing: typography.h6.letterSpacing,
                color: color.textSecondary,
              }}
            >
              카탈로그 메타데이터 및 섹션 헤더
            </h6>
          </div>
        </div>
      </div>

      {/* 2. Body & Small Texts */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
          본문 및 서브 텍스트
        </h3>
        <div className="space-y-3 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              Body ({typography.body.fontSize}px / w{typography.body.fontWeight})
            </span>
            <p
              style={{
                fontSize: `${typography.body.fontSize}px`,
                lineHeight: typography.body.lineHeight,
                fontWeight: typography.body.fontWeight,
                letterSpacing: typography.body.letterSpacing,
                color: color.textPrimary,
              }}
            >
              사용자가 정의한 스타일은 실시간으로 `:root` CSS 변수에 즉시 반영되며, 브라우저 새로고침 후에도 유지됩니다.
            </p>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              Small ({typography.sm.fontSize}px / w{typography.sm.fontWeight})
            </span>
            <p
              style={{
                fontSize: `${typography.sm.fontSize}px`,
                lineHeight: typography.sm.lineHeight,
                fontWeight: typography.sm.fontWeight,
                letterSpacing: typography.sm.letterSpacing,
                color: color.textSecondary,
              }}
            >
              스몰 텍스트는 보조 설명, 입력창 헬퍼 텍스트, 카드 부가 정보 등에 적합합니다.
            </p>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span className="text-[10px] font-mono text-neutral-400 block mb-1">
              Micro / XS ({typography.xs.fontSize}px / w{typography.xs.fontWeight})
            </span>
            <p
              style={{
                fontSize: `${typography.xs.fontSize}px`,
                lineHeight: typography.xs.lineHeight,
                fontWeight: typography.xs.fontWeight,
                letterSpacing: typography.xs.letterSpacing,
                color: color.textMuted,
              }}
            >
              2026-10-15 • DTCG V2 COMPLIANT • ATOMGROUND
            </p>
          </div>
        </div>
      </div>

      {/* 3. Integrated Component Card Preview */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
          통합 컴포넌트 렌더링
        </h3>
        <div
          style={{
            backgroundColor: color.bgSecondary,
            borderColor: color.borderStrong,
            borderRadius: borderRadius,
          }}
          className="p-5 border shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <span
              style={{
                backgroundColor: color.primaryLight,
                color: color.primary,
                borderRadius: borderRadius,
              }}
              className="px-2.5 py-1 text-xs font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              추천 플로우
            </span>
            <span
              style={{ color: color.statusSuccess }}
              className="flex items-center gap-1 text-xs font-semibold"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              활성 상태
            </span>
          </div>

          <div>
            <h4
              style={{
                fontSize: `${typography.h4.fontSize}px`,
                lineHeight: typography.h4.lineHeight,
                fontWeight: typography.h4.fontWeight,
                color: color.textPrimary,
              }}
            >
              즉시 송금 보안 인증 컴포넌트
            </h4>
            <p
              style={{
                fontSize: `${typography.body.fontSize}px`,
                lineHeight: typography.body.lineHeight,
                color: color.textSecondary,
              }}
              className="mt-1"
            >
              정의하신 브랜드 컬러와 라운딩이 완벽하게 동기화되어 동작합니다.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              style={{
                backgroundColor: color.primary,
                borderRadius: borderRadius,
              }}
              className="px-4 py-2 text-white text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
            >
              Primary 버튼
            </button>
            <button
              type="button"
              style={{
                borderColor: color.borderStrong,
                borderRadius: borderRadius,
                color: color.textPrimary,
              }}
              className="px-4 py-2 border bg-white dark:bg-neutral-900 text-xs font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              보조 버튼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
