'use client';

import React, { useState, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useThemeEditor } from '@/components/editor/ThemeEditorProvider';
import {
  Button,
  Input,
  Card,
  Badge,
  Slider,
} from '@/components/ui';
import {
  Building2,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Check,
  Sparkles,
  Info,
  Trash2,
  Sliders,
  ExternalLink,
} from 'lucide-react';

export function StudioBrandSettings() {
  const locale = useLocale();
  const { brandConfig, updateBrandConfig, resetBrandConfig, theme } = useThemeEditor();

  const [name, setName] = useState(brandConfig?.name || 'AtomDesignToken');
  const [slogan, setSlogan] = useState(brandConfig?.slogan || 'Universal Design Token & Agentic UI System');
  const [logoUrl, setLogoUrl] = useState<string | null>(brandConfig?.logoUrl || null);
  const [logoHeight, setLogoHeight] = useState<number>(brandConfig?.logoHeight || 22);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeColor = theme?.color?.primary || 'var(--accent-primary)';

  // Handle image upload and convert to base64 Data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('이미지 파일(PNG, JPG, SVG, WebP)만 업로드할 수 있습니다.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('파일 크기가 너무 큽니다 (최대 5MB 허용).');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLogoUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded image -> reverts back to default logo
  const handleRemoveImage = () => {
    setLogoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Save changes to project & localStorage
  const handleSave = () => {
    updateBrandConfig({
      name: name.trim() || 'AtomDesignToken',
      slogan: slogan.trim(),
      logoUrl: logoUrl,
      logoHeight: Number(logoHeight) || 22,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Reset to default
  const handleReset = () => {
    resetBrandConfig();
    setName('AtomDesignToken');
    setSlogan('Universal Design Token & Agentic UI System');
    setLogoUrl(null);
    setLogoHeight(22);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const isCustom = !!logoUrl || name !== 'AtomDesignToken';

  return (
    <div className="flex flex-col gap-6 max-w-4xl pb-16">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-(--radius) bg-(--bg-secondary)/30 border border-(--border-subtle)">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-(--accent-primary)/10 text-(--accent-primary) font-bold border border-(--accent-primary)/20 flex items-center gap-1.5 shadow-xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>BRAND IDENTITY MANAGER</span>
            </span>
            <Badge variant={isCustom ? 'primary' : 'neutral'} className="text-[11px]">
              {isCustom ? '커스텀 브랜드 적용 중' : '기본 시스템 로고 사용 중'}
            </Badge>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-(--text-primary) flex items-center gap-2">
            <span>{locale === 'ko' ? '브랜드 셋팅' : 'Brand Settings'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-(--text-secondary) mt-1">
            내 서비스의 로고 이미지와 브랜드 명칭을 교체하여 프로젝트 전체에 적용합니다. 이미지를 업로드하지 않으면 기본 시스템 로고가 유지됩니다.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1.5"
            title="기본 로고 및 명칭으로 복원"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 복원</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            className="flex items-center gap-1.5 bg-(--accent-primary) text-(--bg-primary)"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>적용 완료!</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>브랜드 설정 저장 및 적용</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="p-3.5 rounded-(--radius-sm) bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-semibold animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>브랜드 설정이 성공적으로 저장되었습니다! 상단 내비게이션 바 로고에 즉시 반영되었습니다.</span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3.5 rounded-(--radius-sm) bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 font-semibold">
          <Info className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2. Live Header Mockup Preview */}
      <Card className="p-5 flex flex-col gap-4 border-(--border-subtle)">
        <div className="flex items-center justify-between pb-3 border-b border-(--border-subtle)">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-(--accent-primary)" />
            <h3 className="font-bold text-sm text-(--text-primary)">
              {locale === 'ko' ? '실시간 상단 헤더 렌더링 미리보기' : 'Live Header Mockup Preview'}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-(--text-muted)">
            {logoUrl
              ? (locale === 'ko' ? '업로드된 커스텀 로고' : 'Uploaded Custom Logo')
              : (locale === 'ko' ? '기본 시스템 로고' : 'Default System Logo')}
          </span>
        </div>

        {/* Mockup in Light Surface */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-(--text-secondary) font-semibold block">
            {locale === 'ko' ? '라이트 모드' : 'Light Mode'}
          </span>
          <div className="p-3.5 rounded-(--radius-sm) bg-white border border-(--border-subtle) shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={name}
                  style={{ height: `${logoHeight}px` }}
                  className="w-auto max-w-[160px] object-contain rounded-(--radius-sm)"
                />
              ) : (
                <span
                  className="w-4 h-4 rounded-(--radius-sm) flex items-center justify-center shrink-0"
                  style={{ backgroundColor: activeColor }}
                />
              )}
              <span className="font-bold text-sm tracking-tight text-(--text-primary)">
                {name || 'AtomDesignToken'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-(--text-secondary) font-medium">
              <span className="hover:text-(--text-primary) cursor-pointer">파운데이션</span>
              <span className="hover:text-(--text-primary) cursor-pointer">컴포넌트</span>
              <span className="hover:text-(--text-primary) cursor-pointer">가이드</span>
            </div>
          </div>
        </div>

        {/* Mockup in Dark Surface */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-(--text-secondary) font-semibold block">
            {locale === 'ko' ? '다크 모드' : 'Dark Mode'}
          </span>
          <div className="p-3.5 rounded-(--radius-sm) bg-neutral-900 border border-neutral-800 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={name}
                  style={{ height: `${logoHeight}px` }}
                  className="w-auto max-w-[160px] object-contain rounded-(--radius-sm)"
                />
              ) : (
                <span
                  className="w-4 h-4 rounded-(--radius-sm) flex items-center justify-center shrink-0"
                  style={{ backgroundColor: activeColor }}
                />
              )}
              <span className="font-bold text-sm tracking-tight text-neutral-100">
                {name || 'AtomDesignToken'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-(--text-muted) font-medium">
              <span className="hover:text-neutral-100 cursor-pointer">파운데이션</span>
              <span className="hover:text-neutral-100 cursor-pointer">컴포넌트</span>
              <span className="hover:text-neutral-100 cursor-pointer">가이드</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Logo Image Upload Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Upload Zone (7 cols) */}
        <Card className="md:col-span-7 p-5 flex flex-col gap-4 border-(--border-subtle)">
          <div className="flex items-center gap-2 pb-2 border-b border-(--border-subtle)">
            <ImageIcon className="w-4 h-4 text-(--accent-primary)" />
            <h3 className="font-bold text-sm text-(--text-primary)">
              로고 이미지 업로드
            </h3>
          </div>

          {logoUrl ? (
            <div className="p-5 rounded-(--radius-sm) bg-(--bg-secondary)/60 border border-(--border-subtle) flex flex-col items-center justify-center gap-3 text-center">
              <div className="p-3 rounded bg-(--bg-primary) border border-(--border-subtle) shadow-xs flex items-center justify-center min-h-[70px]">
                <img
                  src={logoUrl}
                  alt="업로드된 로고"
                  style={{ height: `${logoHeight}px` }}
                  className="w-auto max-w-[200px] object-contain"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-(--text-primary) block">
                  커스텀 로고가 등록되었습니다.
                </span>
                <p className="text-[11px] text-(--text-muted)">
                  현재 로고가 활성화되어 상단 내비게이션에 반영 중입니다.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs py-1 px-2.5 h-auto"
                >
                  <Upload className="w-3.5 h-3.5 mr-1" />
                  다른 이미지로 변경
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="text-xs py-1 px-2.5 h-auto"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  이미지 삭제 (기본 로고 복원)
                </Button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 rounded-(--radius-sm) border-2 border-dashed border-(--border-subtle) hover:border-(--accent-primary) bg-(--bg-secondary)/30 hover:bg-(--bg-secondary)/60 transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) flex items-center justify-center shadow-xs">
                <Upload className="w-5 h-5" />
              </div>

              <div>
                <span className="font-semibold text-xs text-(--text-primary) block">
                  클릭하여 로고 이미지 업로드
                </span>
                <span className="text-[11px] text-(--text-muted) block mt-0.5">
                  PNG, SVG, JPG, WebP 지원 (권장 높이: 20px ~ 32px)
                </span>
              </div>

              <Button variant="secondary" size="sm" className="text-xs pointer-events-none mt-1">
                내 컴퓨터에서 파일 선택
              </Button>
            </div>
          )}

          {/* Hidden File Input */}
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Logo Size Control */}
          <div className="space-y-2 pt-2 border-t border-(--border-subtle)">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-(--text-primary) flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-(--text-muted)" />
                <span>{locale === 'ko' ? '헤더 로고 높이' : 'Logo Height'}</span>
              </span>
              <span className="font-mono text-[11px] font-bold text-(--accent-primary)">
                {logoHeight}px
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Slider
                min={16}
                max={48}
                step={2}
                value={logoHeight}
                onChange={setLogoHeight}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {/* Brand Text Info (5 cols) */}
        <Card className="md:col-span-5 p-5 flex flex-col gap-4 border-(--border-subtle)">
          <div className="flex items-center gap-2 pb-2 border-b border-(--border-subtle)">
            <Building2 className="w-4 h-4 text-(--accent-primary)" />
            <h3 className="font-bold text-sm text-(--text-primary)">
              {locale === 'ko' ? '브랜드 명칭 & 슬로건' : 'Brand Name & Slogan'}
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-(--text-primary) block mb-1">
                {locale === 'ko' ? '브랜드 명칭' : 'Brand Name'}
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'ko' ? '예: 서비스 브랜드명' : 'e.g. Service Brand Name'}
                className="text-xs w-full font-bold"
              />
              <span className="text-[10px] text-(--text-muted) block mt-1">
                {locale === 'ko' ? '상단 내비게이션 바 및 스튜디오 타이틀에 노출됩니다.' : 'Displayed in the top navigation bar and studio title.'}
              </span>
            </div>

            <div>
              <label className="font-semibold text-(--text-primary) block mb-1">
                {locale === 'ko' ? '브랜드 슬로건' : 'Brand Slogan'}
              </label>
              <Input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder={locale === 'ko' ? '예: 차세대 플랫폼 디자인 시스템' : 'e.g. Next-Gen Design System'}
                className="text-xs w-full"
              />
            </div>
          </div>

          {/* Quick Notice Info Box */}
          <div className="p-3 rounded-(--radius-sm) bg-(--bg-secondary)/60 border border-(--border-subtle) text-[11px] text-(--text-secondary) space-y-1.5 mt-auto">
            <div className="flex items-center gap-1.5 font-semibold text-(--text-primary)">
              <Info className="w-3.5 h-3.5 text-(--accent-primary) shrink-0" />
              <span>로고 미등록 시 기본 동작</span>
            </div>
            <p className="leading-relaxed">
              이미지를 업로드하지 않으면 브랜드 시그니처 사각 큐브와 &apos;AtomDesignToken&apos; 기본 로고가 유지됩니다. 언제든지 변경하거나 초기화할 수 있습니다.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
