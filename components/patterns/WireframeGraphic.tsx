'use client';

import React from 'react';
import { PatternPlatform } from '@/lib/data/patterns';

interface WireframeGraphicProps {
  wireframeType: string;
  platform: PatternPlatform;
  className?: string;
}

export function WireframeGraphic({ wireframeType, platform, className = '' }: WireframeGraphicProps) {
  const isWeb = platform === 'web';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-3 select-none flex flex-col justify-between transition-all ${className}`}
      style={{ aspectRatio: isWeb ? '16 / 10' : '16 / 11' }}
    >
      {/* Mini Device Window Header */}
      {isWeb ? (
        <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-200/70 dark:border-neutral-800">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400/80"></span>
            <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400/80"></span>
          </div>
          <div className="flex-1 max-w-[120px] h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 mx-auto"></div>
        </div>
      ) : (
        <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200/50 dark:border-neutral-800">
          <div className="w-3.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="w-12 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 opacity-60"></div>
          <div className="w-3.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
        </div>
      )}

      {/* Wireframe Diagram per Type */}
      <div className="flex-1 flex flex-col justify-center pt-2">
        {wireframeType === 'dashboard-grid' && (
          <div className="flex gap-2 h-full">
            {/* Sidebar */}
            <div className="w-1/4 bg-neutral-200 dark:bg-neutral-800 rounded flex flex-col gap-1 p-1">
              <div className="h-1.5 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-1.5 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-1.5 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
            </div>
            {/* Content Area */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="grid grid-cols-3 gap-1">
                <div className="h-6 bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 rounded flex flex-col justify-center p-1">
                  <div className="h-1 w-2/3 bg-blue-400 rounded"></div>
                </div>
                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded p-1 flex flex-col justify-center">
                  <div className="h-1 w-2/3 bg-neutral-400 rounded"></div>
                </div>
                <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded p-1 flex flex-col justify-center">
                  <div className="h-1 w-2/3 bg-neutral-400 rounded"></div>
                </div>
              </div>
              <div className="flex-1 bg-neutral-150 dark:bg-neutral-850 border border-dashed border-neutral-300 dark:border-neutral-700 rounded flex items-end gap-1 p-1.5">
                <div className="w-1/6 bg-blue-400 rounded-t h-[40%]"></div>
                <div className="w-1/6 bg-blue-500 rounded-t h-[70%]"></div>
                <div className="w-1/6 bg-blue-400 rounded-t h-[55%]"></div>
                <div className="w-1/6 bg-blue-600 rounded-t h-[90%]"></div>
                <div className="w-1/6 bg-blue-400 rounded-t h-[65%]"></div>
                <div className="w-1/6 bg-blue-500 rounded-t h-[80%]"></div>
              </div>
            </div>
          </div>
        )}

        {wireframeType === 'chat-stream' && (
          <div className="flex flex-col gap-1.5 h-full justify-between">
            {/* Messages */}
            <div className="flex flex-col gap-1.5">
              <div className="self-start max-w-[70%] bg-neutral-200 dark:bg-neutral-800 rounded-lg p-1.5">
                <div className="h-1.5 w-16 bg-neutral-400 rounded mb-1"></div>
                <div className="h-1.5 w-24 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              </div>
              <div className="self-end max-w-[70%] bg-blue-500 text-white rounded-lg p-1.5">
                <div className="h-1.5 w-20 bg-blue-200 rounded"></div>
              </div>
              <div className="self-start max-w-[70%] bg-neutral-200 dark:bg-neutral-800 rounded-lg p-1.5">
                <div className="h-1.5 w-28 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              </div>
            </div>
            {/* Input Bar */}
            <div className="h-5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-full flex items-center px-2 justify-between">
              <div className="h-1.5 w-24 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
          </div>
        )}

        {wireframeType === 'kyc-camera' && (
          <div className="flex flex-col gap-1.5 h-full">
            <div className="h-2 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded mx-auto"></div>
            {/* ID Card Zone */}
            <div className="flex-1 border-2 border-dashed border-blue-400/80 rounded-lg flex flex-col items-center justify-center p-2 bg-blue-50/50 dark:bg-blue-950/20">
              <div className="w-10 h-7 border border-neutral-400 rounded flex gap-1 p-1">
                <div className="w-3 h-4 bg-neutral-400 rounded"></div>
                <div className="flex-1 flex flex-col gap-1 justify-center">
                  <div className="h-1 bg-neutral-400 rounded"></div>
                  <div className="h-1 w-2/3 bg-neutral-300 rounded"></div>
                </div>
              </div>
            </div>
            {/* Action Button */}
            <div className="h-5 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="h-1.5 w-16 bg-white/80 rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'editor-toolbar' && (
          <div className="flex flex-col gap-1.5 h-full">
            {/* Toolbar */}
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded flex items-center gap-1.5 px-2">
              <div className="w-2.5 h-2.5 bg-neutral-400 rounded"></div>
              <div className="w-2.5 h-2.5 bg-neutral-400 rounded"></div>
              <div className="w-2.5 h-2.5 bg-neutral-400 rounded"></div>
              <div className="w-px h-3 bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="h-1.5 w-8 bg-neutral-400 rounded"></div>
            </div>
            {/* Doc Body */}
            <div className="flex-1 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 rounded p-2 flex flex-col gap-1.5">
              <div className="h-2.5 w-2/3 bg-neutral-800 dark:bg-neutral-200 rounded"></div>
              <div className="h-1.5 w-full bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-1.5 w-4/5 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-1.5 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'map-sheet' && (
          <div className="relative flex-1 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200/60 dark:border-emerald-800/60 overflow-hidden flex flex-col justify-between p-2">
            {/* Map Pin */}
            <div className="flex justify-center pt-1">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 shadow animate-pulse"></div>
            </div>
            {/* Bottom Sheet */}
            <div className="bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700 rounded-t-lg p-2 shadow-lg -mx-2 -mb-2">
              <div className="w-6 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-1"></div>
              <div className="h-1.5 w-20 bg-neutral-800 dark:bg-neutral-200 rounded mb-1"></div>
              <div className="h-1 w-12 bg-emerald-500 rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'flight-swap' && (
          <div className="flex flex-col gap-1.5 h-full justify-center">
            {/* Route swap bar */}
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-1.5">
              <div className="flex-1 bg-white dark:bg-neutral-900 rounded p-1 text-center">
                <div className="h-1.5 w-8 bg-blue-500 rounded mx-auto mb-0.5"></div>
                <div className="h-1 w-12 bg-neutral-300 dark:bg-neutral-700 rounded mx-auto"></div>
              </div>
              <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">
                ⇄
              </div>
              <div className="flex-1 bg-white dark:bg-neutral-900 rounded p-1 text-center">
                <div className="h-1.5 w-8 bg-blue-500 rounded mx-auto mb-0.5"></div>
                <div className="h-1 w-12 bg-neutral-300 dark:bg-neutral-700 rounded mx-auto"></div>
              </div>
            </div>
            {/* Date and CTA */}
            <div className="flex gap-1.5">
              <div className="flex-1 h-5 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              <div className="w-16 h-5 bg-blue-600 rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'wizard-steps' && (
          <div className="flex flex-col gap-2 h-full justify-center">
            {/* Stepper bar */}
            <div className="flex items-center justify-between px-2">
              <div className="w-3 h-3 rounded-full bg-blue-600 text-[7px] text-white flex items-center justify-center font-bold">1</div>
              <div className="flex-1 h-0.5 bg-blue-600 mx-1"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600 text-[7px] text-white flex items-center justify-center font-bold">2</div>
              <div className="flex-1 h-0.5 bg-neutral-300 dark:bg-neutral-700 mx-1"></div>
              <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700 text-[7px] flex items-center justify-center font-bold">3</div>
            </div>
            {/* Choice cards */}
            <div className="flex flex-col gap-1">
              <div className="h-5 bg-blue-50 dark:bg-blue-950/40 border border-blue-400 rounded flex items-center px-2 justify-between">
                <div className="h-1.5 w-20 bg-blue-600 rounded"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              </div>
              <div className="h-5 bg-white dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700 rounded flex items-center px-2 justify-between">
                <div className="h-1.5 w-16 bg-neutral-400 rounded"></div>
                <div className="w-2 h-2 rounded-full border border-neutral-400"></div>
              </div>
            </div>
          </div>
        )}

        {wireframeType === 'uploader-dropzone' && (
          <div className="flex flex-col gap-1.5 h-full">
            <div className="flex-1 border-2 border-dashed border-blue-400/80 rounded-lg flex flex-col items-center justify-center bg-blue-50/30 dark:bg-blue-950/20 p-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                <span className="text-blue-600 text-[10px]">↑</span>
              </div>
              <div className="h-1.5 w-20 bg-blue-600 rounded mb-0.5"></div>
              <div className="h-1 w-14 bg-neutral-400 rounded"></div>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
            </div>
          </div>
        )}

        {wireframeType === 'keypad-transfer' && (
          <div className="flex flex-col gap-1.5 h-full justify-between">
            <div className="text-center pt-1">
              <div className="h-1 w-16 bg-neutral-400 rounded mx-auto mb-1"></div>
              <div className="h-3 w-28 bg-neutral-900 dark:bg-white rounded mx-auto"></div>
            </div>
            {/* Numeric Keypad Grid */}
            <div className="grid grid-cols-3 gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div key={n} className="h-3 bg-white dark:bg-neutral-700 rounded flex items-center justify-center text-[7px] font-bold text-neutral-600 dark:text-neutral-200">
                  {n}
                </div>
              ))}
            </div>
            <div className="h-4 bg-blue-600 rounded text-center flex items-center justify-center">
              <div className="h-1.5 w-12 bg-white rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'cart-sticky' && (
          <div className="flex flex-col gap-1.5 h-full justify-between">
            {/* Cart Items */}
            <div className="flex flex-col gap-1">
              <div className="h-5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded flex items-center px-1.5 justify-between">
                <div className="w-3 h-3 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                <div className="h-1.5 w-16 bg-neutral-400 rounded"></div>
                <div className="h-1.5 w-8 bg-blue-600 rounded"></div>
              </div>
              <div className="h-5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded flex items-center px-1.5 justify-between">
                <div className="w-3 h-3 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                <div className="h-1.5 w-14 bg-neutral-400 rounded"></div>
                <div className="h-1.5 w-8 bg-blue-600 rounded"></div>
              </div>
            </div>
            {/* Sticky Bar */}
            <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded p-1.5 flex items-center justify-between">
              <div className="h-1.5 w-12 bg-white/70 dark:bg-neutral-900/70 rounded"></div>
              <div className="h-3 w-16 bg-blue-500 rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'search-empty' && (
          <div className="flex flex-col gap-1.5 h-full justify-center">
            {/* Search Input Bar */}
            <div className="h-5 bg-white dark:bg-neutral-850 border border-neutral-300 dark:border-neutral-700 rounded-full flex items-center px-2 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full border border-neutral-400"></div>
              <div className="h-1.5 w-24 bg-neutral-400 rounded"></div>
            </div>
            {/* Empty illustration box */}
            <div className="flex-1 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-900 p-2 flex flex-col items-center justify-center gap-1">
              <div className="w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-[8px] text-neutral-500">
                ✕
              </div>
              <div className="h-1.5 w-24 bg-neutral-400 rounded"></div>
              <div className="flex gap-1 mt-0.5">
                <div className="h-2 w-8 bg-blue-100 dark:bg-blue-950 rounded-full"></div>
                <div className="h-2 w-8 bg-blue-100 dark:bg-blue-950 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Blueprint Grid Watermark Badge */}
      <div className="absolute right-2 bottom-2 text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-neutral-200/70 dark:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400 backdrop-blur">
        {isWeb ? 'WEB Wireframe' : 'Mobile Wireframe'}
      </div>
    </div>
  );
}
