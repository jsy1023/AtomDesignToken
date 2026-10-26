'use client';

import React, { useState } from 'react';
import { PatternPlatform } from '@/lib/data/patterns';
import { PatternInteractiveScreen } from './PatternInteractiveScreen';
import { Monitor, Smartphone, RotateCcw, ExternalLink } from 'lucide-react';

interface DeviceMockupViewProps {
  patternId: string;
  defaultPlatform: PatternPlatform;
}

export function DeviceMockupView({ patternId, defaultPlatform }: DeviceMockupViewProps) {
  const [deviceMode, setDeviceMode] = useState<PatternPlatform>(defaultPlatform);
  const isWeb = deviceMode === 'web';

  return (
    <div className="flex flex-col items-center w-full">
      {/* Device Viewport Toggle Toolbar */}
      <div className="flex items-center justify-between w-full mb-3 px-1">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 border border-neutral-300/60 dark:border-neutral-700">
          <button
            onClick={() => setDeviceMode('web')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              isWeb
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              !isWeb
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        <span className="text-[11px] text-neutral-400">
          {isWeb ? '데스크톱 뷰포트' : '모바일 뷰포트 (375px)'}
        </span>
      </div>

      {/* Frame Container */}
      {isWeb ? (
        /* WEB BROWSER FRAME */
        <div className="w-full rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden flex flex-col">
          {/* Browser Top Navigation Bar */}
          <div className="h-10 bg-neutral-100 dark:bg-neutral-850 border-b border-neutral-200 dark:border-neutral-800 px-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>

            {/* URL Address Bar */}
            <div className="flex-1 max-w-lg h-6 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-750 px-3 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
              <span className="truncate">https://app.atomsystem.design/patterns/{patternId}</span>
              <span className="text-emerald-500 font-bold text-[10px]">SSL 보안</span>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-xs">
              <RotateCcw className="w-3.5 h-3.5 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200" />
            </div>
          </div>

          {/* Browser Body Screen */}
          <div className="min-h-[460px] max-h-[580px] overflow-y-auto bg-white dark:bg-neutral-950 p-4">
            <PatternInteractiveScreen patternId={patternId} />
          </div>
        </div>
      ) : (
        /* SMARTPHONE DEVICE FRAME */
        <div className="relative w-[375px] max-w-full rounded-[44px] bg-neutral-950 p-3 shadow-2xl ring-1 ring-neutral-700/80 dark:ring-neutral-800">
          {/* Hardware Side Buttons */}
          <div className="absolute -left-[3px] top-24 w-[3px] h-9 bg-neutral-600 rounded-l"></div>
          <div className="absolute -left-[3px] top-36 w-[3px] h-9 bg-neutral-600 rounded-l"></div>
          <div className="absolute -right-[3px] top-28 w-[3px] h-12 bg-neutral-600 rounded-r"></div>

          {/* Screen Glass */}
          <div className="relative rounded-[36px] bg-white dark:bg-neutral-950 overflow-hidden h-[620px] flex flex-col justify-between">
            {/* Dynamic Island / Notch & Top Status Bar */}
            <div className="pt-2 px-6 flex items-center justify-between select-none z-20 text-[10px] font-bold text-neutral-800 dark:text-neutral-200">
              <span>09:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-4 rounded-full bg-neutral-900 dark:bg-black mx-auto flex items-center justify-end px-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse"></span>
              </div>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Mobile Screen Content */}
            <div className="flex-1 overflow-y-auto px-2 py-2">
              <PatternInteractiveScreen patternId={patternId} />
            </div>

            {/* Home Indicator Bar */}
            <div className="py-2 flex justify-center z-20">
              <div className="w-32 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
