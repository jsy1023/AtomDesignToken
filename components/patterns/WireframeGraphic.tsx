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
      className={`relative w-full overflow-hidden rounded-xl bg-neutral-50  border border-(--border-subtle)/80  p-3 select-none flex flex-col justify-between transition-all ${className}`}
      style={{ aspectRatio: isWeb ? '16 / 10' : '16 / 11' }}
    >
      {/* Mini Device Window Header */}
      {isWeb ? (
        <div className="flex items-center gap-1.5 pb-2 border-b border-(--border-subtle)/70 ">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400/80"></span>
            <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400/80"></span>
          </div>
          <div className="flex-1 max-w-[120px] h-2 rounded-full bg-(--bg-tertiary)  mx-auto"></div>
        </div>
      ) : (
        <div className="flex items-center justify-between pb-1.5 border-b border-(--border-subtle)/50 ">
          <div className="w-3.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="w-12 h-1.5 rounded-full bg-(--bg-secondary) dark:bg-(--bg-secondary) opacity-60"></div>
          <div className="w-3.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
        </div>
      )}

      {/* Wireframe Diagram per Type */}
      <div className="flex-1 flex flex-col justify-center pt-2">
        {wireframeType === 'dashboard-grid' && (
          <div className="flex gap-2 h-full">
            {/* Sidebar */}
            <div className="w-1/4 bg-(--bg-tertiary)  rounded flex flex-col gap-1 p-1">
              <div className="h-1.5 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-1.5 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-1.5 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
            </div>
            {/* Content Area */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="grid grid-cols-3 gap-1">
                <div className="h-6 bg-blue-100  border border-(--accent-primary)/20 dark:border-blue-900 rounded flex flex-col justify-center p-1">
                  <div className="h-1 w-2/3 bg-blue-400 rounded"></div>
                </div>
                <div className="h-6 bg-(--bg-tertiary)  rounded p-1 flex flex-col justify-center">
                  <div className="h-1 w-2/3 bg-neutral-400 rounded"></div>
                </div>
                <div className="h-6 bg-(--bg-tertiary)  rounded p-1 flex flex-col justify-center">
                  <div className="h-1 w-2/3 bg-neutral-400 rounded"></div>
                </div>
              </div>
              <div className="flex-1 bg-neutral-150  border border-dashed border-(--border-strong)  rounded flex items-end gap-1 p-1.5">
                <div className="w-1/6 bg-blue-400 rounded-t h-[40%]"></div>
                <div className="w-1/6 bg-(--accent-primary) rounded-t h-[70%]"></div>
                <div className="w-1/6 bg-blue-400 rounded-t h-[55%]"></div>
                <div className="w-1/6 bg-(--accent-primary) rounded-t h-[90%]"></div>
                <div className="w-1/6 bg-blue-400 rounded-t h-[65%]"></div>
                <div className="w-1/6 bg-(--accent-primary) rounded-t h-[80%]"></div>
              </div>
            </div>
          </div>
        )}

        {wireframeType === 'chat-stream' && (
          <div className="flex flex-col gap-1.5 h-full justify-between">
            {/* Messages */}
            <div className="flex flex-col gap-1.5">
              <div className="self-start max-w-[70%] bg-(--bg-tertiary)  rounded-lg p-1.5">
                <div className="h-1.5 w-16 bg-neutral-400 rounded mb-1"></div>
                <div className="h-1.5 w-24 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              </div>
              <div className="self-end max-w-[70%] bg-(--accent-primary) text-white rounded-lg p-1.5">
                <div className="h-1.5 w-20 bg-blue-200 rounded"></div>
              </div>
              <div className="self-start max-w-[70%] bg-(--bg-tertiary)  rounded-lg p-1.5">
                <div className="h-1.5 w-28 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              </div>
            </div>
            {/* Input Bar */}
            <div className="h-5 bg-white  border border-(--border-strong)  rounded-full flex items-center px-2 justify-between">
              <div className="h-1.5 w-24 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
              <div className="w-3 h-3 rounded-full bg-(--accent-primary)"></div>
            </div>
          </div>
        )}

        {wireframeType === 'kyc-camera' && (
          <div className="flex flex-col gap-1.5 h-full">
            <div className="h-2 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded mx-auto"></div>
            {/* ID Card Zone */}
            <div className="flex-1 border-2 border-dashed border-blue-400/80 rounded-lg flex flex-col items-center justify-center p-2 bg-(--accent-primary)/10/50 dark:bg-(--accent-primary)/10">
              <div className="w-10 h-7 border border-neutral-400 rounded flex gap-1 p-1">
                <div className="w-3 h-4 bg-neutral-400 rounded"></div>
                <div className="flex-1 flex flex-col gap-1 justify-center">
                  <div className="h-1 bg-neutral-400 rounded"></div>
                  <div className="h-1 w-2/3 bg-neutral-300 rounded"></div>
                </div>
              </div>
            </div>
            {/* Action Button */}
            <div className="h-5 bg-(--accent-primary) rounded-lg flex items-center justify-center">
              <div className="h-1.5 w-16 bg-white/80 rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'editor-toolbar' && (
          <div className="flex flex-col gap-1.5 h-full">
            {/* Toolbar */}
            <div className="h-4 bg-(--bg-tertiary)  rounded flex items-center gap-1.5 px-2">
              <div className="w-2.5 h-2.5 bg-neutral-400 rounded"></div>
              <div className="w-2.5 h-2.5 bg-neutral-400 rounded"></div>
              <div className="w-2.5 h-2.5 bg-neutral-400 rounded"></div>
              <div className="w-px h-3 bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="h-1.5 w-8 bg-neutral-400 rounded"></div>
            </div>
            {/* Doc Body */}
            <div className="flex-1 bg-white  border border-(--border-subtle)  rounded p-2 flex flex-col gap-1.5">
              <div className="h-2.5 w-2/3 bg-(--bg-secondary) dark:bg-(--bg-tertiary) rounded"></div>
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
            <div className="bg-white  border border-(--border-subtle)  rounded-t-lg p-2 shadow-lg -mx-2 -mb-2">
              <div className="w-6 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full mx-auto mb-1"></div>
              <div className="h-1.5 w-20 bg-(--bg-secondary) dark:bg-(--bg-tertiary) rounded mb-1"></div>
              <div className="h-1 w-12 bg-(--atom-color-success) rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'flight-swap' && (
          <div className="flex flex-col gap-1.5 h-full justify-center">
            {/* Route swap bar */}
            <div className="flex items-center gap-1 bg-(--bg-secondary)  border border-(--border-subtle)  rounded-lg p-1.5">
              <div className="flex-1 bg-(--bg-primary) rounded p-1 text-center">
                <div className="h-1.5 w-8 bg-(--accent-primary) rounded mx-auto mb-0.5"></div>
                <div className="h-1 w-12 bg-neutral-300 dark:bg-neutral-700 rounded mx-auto"></div>
              </div>
              <div className="w-4 h-4 rounded-full bg-(--accent-primary) text-white flex items-center justify-center text-[8px] font-bold">
                ⇄
              </div>
              <div className="flex-1 bg-(--bg-primary) rounded p-1 text-center">
                <div className="h-1.5 w-8 bg-(--accent-primary) rounded mx-auto mb-0.5"></div>
                <div className="h-1 w-12 bg-neutral-300 dark:bg-neutral-700 rounded mx-auto"></div>
              </div>
            </div>
            {/* Date and CTA */}
            <div className="flex gap-1.5">
              <div className="flex-1 h-5 bg-(--bg-tertiary)  rounded"></div>
              <div className="w-16 h-5 bg-(--accent-primary) rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'wizard-steps' && (
          <div className="flex flex-col gap-2 h-full justify-center">
            {/* Stepper bar */}
            <div className="flex items-center justify-between px-2">
              <div className="w-3 h-3 rounded-full bg-(--accent-primary) text-[7px] text-white flex items-center justify-center font-bold">1</div>
              <div className="flex-1 h-0.5 bg-(--accent-primary) mx-1"></div>
              <div className="w-3 h-3 rounded-full bg-(--accent-primary) text-[7px] text-white flex items-center justify-center font-bold">2</div>
              <div className="flex-1 h-0.5 bg-neutral-300 dark:bg-neutral-700 mx-1"></div>
              <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700 text-[7px] flex items-center justify-center font-bold">3</div>
            </div>
            {/* Choice cards */}
            <div className="flex flex-col gap-1">
              <div className="h-5 bg-(--accent-primary)/10 dark:bg-blue-950/40 border border-blue-400 rounded flex items-center px-2 justify-between">
                <div className="h-1.5 w-20 bg-(--accent-primary) rounded"></div>
                <div className="w-2 h-2 rounded-full bg-(--accent-primary)"></div>
              </div>
              <div className="h-5 bg-white  border border-(--border-subtle)  rounded flex items-center px-2 justify-between">
                <div className="h-1.5 w-16 bg-neutral-400 rounded"></div>
                <div className="w-2 h-2 rounded-full border border-neutral-400"></div>
              </div>
            </div>
          </div>
        )}

        {wireframeType === 'uploader-dropzone' && (
          <div className="flex flex-col gap-1.5 h-full">
            <div className="flex-1 border-2 border-dashed border-blue-400/80 rounded-lg flex flex-col items-center justify-center bg-(--accent-primary)/10/30 dark:bg-(--accent-primary)/10 p-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                <span className="text-(--accent-primary) text-[10px]">↑</span>
              </div>
              <div className="h-1.5 w-20 bg-(--accent-primary) rounded mb-0.5"></div>
              <div className="h-1 w-14 bg-neutral-400 rounded"></div>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-(--bg-tertiary)  rounded-full overflow-hidden">
              <div className="h-full bg-(--accent-primary) w-3/4 rounded-full"></div>
            </div>
          </div>
        )}

        {wireframeType === 'keypad-transfer' && (
          <div className="flex flex-col gap-1.5 h-full justify-between">
            <div className="text-center pt-1">
              <div className="h-1 w-16 bg-neutral-400 rounded mx-auto mb-1"></div>
              <div className="h-3 w-28 bg-(--bg-secondary) dark:bg-white rounded mx-auto"></div>
            </div>
            {/* Numeric Keypad Grid */}
            <div className="grid grid-cols-3 gap-1 bg-(--bg-secondary)  p-1 rounded-lg">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div key={n} className="h-3 bg-white dark:bg-neutral-700 rounded flex items-center justify-center text-[7px] font-bold text-(--text-secondary) ">
                  {n}
                </div>
              ))}
            </div>
            <div className="h-4 bg-(--accent-primary) rounded text-center flex items-center justify-center">
              <div className="h-1.5 w-12 bg-white rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'cart-sticky' && (
          <div className="flex flex-col gap-1.5 h-full justify-between">
            {/* Cart Items */}
            <div className="flex flex-col gap-1">
              <div className="h-5 bg-white  border border-(--border-subtle)  rounded flex items-center px-1.5 justify-between">
                <div className="w-3 h-3 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                <div className="h-1.5 w-16 bg-neutral-400 rounded"></div>
                <div className="h-1.5 w-8 bg-(--accent-primary) rounded"></div>
              </div>
              <div className="h-5 bg-white  border border-(--border-subtle)  rounded flex items-center px-1.5 justify-between">
                <div className="w-3 h-3 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
                <div className="h-1.5 w-14 bg-neutral-400 rounded"></div>
                <div className="h-1.5 w-8 bg-(--accent-primary) rounded"></div>
              </div>
            </div>
            {/* Sticky Bar */}
            <div className="bg-(--bg-secondary) dark:bg-(--bg-secondary) text-white dark:text-(--text-primary) rounded p-1.5 flex items-center justify-between">
              <div className="h-1.5 w-12 bg-white/70 /70 rounded"></div>
              <div className="h-3 w-16 bg-(--accent-primary) rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'search-empty' && (
          <div className="flex flex-col gap-1.5 h-full justify-center">
            {/* Search Input Bar */}
            <div className="h-5 bg-white  border border-(--border-strong)  rounded-full flex items-center px-2 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full border border-neutral-400"></div>
              <div className="h-1.5 w-24 bg-neutral-400 rounded"></div>
            </div>
            {/* Empty illustration box */}
            <div className="flex-1 border border-(--border-subtle)  rounded bg-(--bg-primary) p-2 flex flex-col items-center justify-center gap-1">
              <div className="w-4 h-4 rounded-full bg-(--bg-tertiary) dark:bg-neutral-700 flex items-center justify-center text-[8px] text-(--text-secondary)">
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

        {wireframeType === 'docs-layout' && (
          <div className="flex gap-2 h-full">
            {/* Left Nav Sidebar */}
            <div className="w-1/4 bg-(--bg-tertiary)/80  rounded p-1.5 flex flex-col gap-1">
              <div className="h-2 w-3/4 bg-neutral-400 dark:bg-neutral-600 rounded"></div>
              <div className="h-1.5 w-full bg-(--accent-primary)/70 rounded mt-1"></div>
              <div className="h-1.5 w-5/6 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-1.5 w-4/6 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
            </div>
            {/* Center Content: Title, text, code block */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="h-2.5 w-1/2 bg-(--bg-secondary) dark:bg-(--bg-tertiary) rounded"></div>
              <div className="h-1.5 w-full bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-1.5 w-4/5 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              {/* Terminal Code Snippet Block */}
              <div className="flex-1 bg-(--bg-secondary) rounded p-1.5 flex flex-col gap-1 justify-center">
                <div className="flex items-center justify-between">
                  <div className="h-1 w-10 bg-(--bg-secondary) rounded"></div>
                  <div className="w-2 h-2 rounded bg-neutral-600"></div>
                </div>
                <div className="h-1.5 w-3/4 bg-emerald-400 rounded"></div>
              </div>
            </div>
            {/* Right TOC Column */}
            <div className="w-1/5 border-l border-(--border-subtle)  pl-1.5 flex flex-col gap-1 justify-center">
              <div className="h-1 w-3/4 bg-neutral-400 rounded"></div>
              <div className="h-1 w-full bg-(--accent-primary) rounded"></div>
              <div className="h-1 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
            </div>
          </div>
        )}

        {wireframeType === 'complex-form' && (
          <div className="flex gap-2 h-full flex-col justify-between">
            <div className="flex gap-2 flex-1">
              {/* Left Subnav Sidebar */}
              <div className="w-1/4 bg-(--bg-tertiary)/80 /80 rounded p-1.5 flex flex-col gap-1">
                <div className="h-1.5 w-full bg-(--accent-primary) rounded"></div>
                <div className="h-1.5 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
                <div className="h-1.5 w-5/6 bg-neutral-300 dark:bg-neutral-700 rounded"></div>
              </div>
              {/* Right Form Fields */}
              <div className="flex-1 flex flex-col gap-1.5 justify-center">
                <div className="h-4 bg-white  border border-(--border-subtle)  rounded px-1.5 flex items-center justify-between">
                  <div className="h-1.5 w-1/3 bg-neutral-400 rounded"></div>
                  <div className="w-2 h-2 rounded-full bg-(--atom-color-success)"></div>
                </div>
                {/* Toggle Switch row */}
                <div className="h-4 bg-white  border border-(--border-subtle)  rounded px-1.5 flex items-center justify-between">
                  <div className="h-1.5 w-1/2 bg-neutral-400 rounded"></div>
                  <div className="w-4 h-2 rounded-full bg-(--accent-primary) flex items-center justify-end px-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                </div>
                {/* Conditional sub-input */}
                <div className="h-3.5 bg-(--bg-secondary)  border border-rose-300 dark:border-rose-900 rounded px-1.5 flex items-center justify-between ml-2">
                  <div className="h-1 w-2/3 bg-rose-400 rounded"></div>
                </div>
              </div>
            </div>
            {/* Bottom Floating Unsaved Changes Bar */}
            <div className="h-4 bg-(--bg-secondary) text-white rounded px-2 flex items-center justify-between shadow-xs">
              <div className="h-1 w-16 bg-neutral-300 rounded"></div>
              <div className="h-2.5 w-8 bg-(--accent-primary) rounded"></div>
            </div>
          </div>
        )}
      </div>

      {/* Blueprint Grid Watermark Badge */}
      <div className="absolute right-2 bottom-2 text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-(--bg-tertiary)/70 /80 text-(--text-secondary) dark:text-(--text-muted) backdrop-blur">
        {isWeb ? 'WEB Wireframe' : 'Mobile Wireframe'}
      </div>
    </div>
  );
}
