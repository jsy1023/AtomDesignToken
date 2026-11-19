'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { Sliders, Sparkles } from 'lucide-react';
import { useStudio } from '@/components/studio/context/StudioContext';
import { StudioStatusBanner } from '@/components/studio/layout/StudioShell';
import { ComponentTypeStageCard } from './ComponentTypeStageCard';
import { TokenBindingInspector } from './TokenBindingInspector';
import { formatLocaleText } from '@/lib/utils/localeFormat';

export function ComponentStudioWorkspace() {
  const { locale, currentComponent, currentTypes, setIsAddTypeOpen } = useStudio();

  return (
    <div className="flex-1 min-w-0 h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
      {/* Central Live Stage Pane */}
      <main className="flex-1 min-w-0 lg:h-full lg:overflow-y-auto p-4 sm:p-6 studio-scrollbar flex flex-col gap-5">
        <StudioStatusBanner />

        <div className="flex flex-col gap-5 pb-10">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-(--accent-primary)" />
              <div>
                <h2 className="text-sm sm:text-base font-bold text-(--text-primary) flex items-center gap-2">
                  <span>{formatLocaleText(currentComponent.name, locale)}</span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) border border-(--accent-primary)/20">
                    {currentTypes.length} Types
                  </span>
                </h2>
                <p className="text-xs text-(--text-secondary) mt-0.5">
                  {locale === 'ko'
                    ? '각 디자인 형태(Type) 카드 하위에서 버튼 규격(size)과 아이콘 슬롯(slots), 상태(status)를 독립적으로 설정할 수 있습니다.'
                    : 'Adjust size, icon slot, and status independently on each Type card.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {currentTypes.map((tp, index) => (
              <ComponentTypeStageCard key={tp.id} typeSpec={tp} index={index} />
            ))}

            <div className="pt-2 flex flex-col gap-2.5">
              <Button
                variant="secondary"
                onClick={() => setIsAddTypeOpen(true)}
                className="w-full py-4 px-5 border-2 border-dashed border-(--accent-primary)/30 hover:border-(--accent-primary) bg-(--accent-primary)/5 hover:bg-(--accent-primary)/10 text-(--accent-primary) rounded-(--radius) flex items-center justify-center gap-2.5 font-bold transition-all shadow-xs group cursor-pointer"
                title={
                  locale === 'ko'
                    ? '새로운 외형 형태(Type)를 추가하고 아래에 라이브 스테이지 카드를 즉시 생성합니다'
                    : 'Add a new visual design Type and generate a new Live Stage card below'
                }
              >
                <Sparkles className="w-4 h-4 text-(--accent-primary) group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm">
                  {locale === 'ko'
                    ? '+ 새 Type(디자인 형태) 추가하고 아래에 Live Stage 카드 생성'
                    : '+ Add New Design Type & Generate Live Stage Below'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Right Full-Height Inspector Pane */}
      <TokenBindingInspector />
    </div>
  );
}
