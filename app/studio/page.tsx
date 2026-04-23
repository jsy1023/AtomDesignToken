"use client";

import React, { useState } from 'react';
import { TokenEditor } from './components/TokenEditor';
import { HomepagePreview } from './components/previews/HomepagePreview';
import { DashboardPreview } from './components/previews/DashboardPreview';
import { AppPreview } from './components/previews/AppPreview';

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<'homepage' | 'dashboard' | 'app'>('homepage');

  return (
    <div className="flex w-screen h-screen bg-bg-wrapper text-text-standard overflow-hidden">
      {/* Sidebar: Token Editor */}
      <aside className="w-[320px] flex shrink-0 z-10 shadow-lg">
        <TokenEditor />
      </aside>

      {/* Main Content: Previews Workspace */}
      <main className="flex-1 flex flex-col items-center bg-bg-wrapper overflow-hidden relative" id="studio-preview">
        
        {/* Preview Tabs */}
        <div className="absolute top-4 z-20 flex gap-2 bg-bg-card p-1 rounded-common shadow-md border border-border-standard">
          <button 
            className={`px-4 py-2 rounded-common text-sm font-bold transition-colors ${activeTab === 'homepage' ? 'bg-primary text-white' : 'text-text-sub hover:bg-bg-hover'}`}
            onClick={() => setActiveTab('homepage')}
          >
            Homepage
          </button>
          <button 
            className={`px-4 py-2 rounded-common text-sm font-bold transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-text-sub hover:bg-bg-hover'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`px-4 py-2 rounded-common text-sm font-bold transition-colors ${activeTab === 'app' ? 'bg-primary text-white' : 'text-text-sub hover:bg-bg-hover'}`}
            onClick={() => setActiveTab('app')}
          >
            App
          </button>
        </div>

        {/* Selected Preview Container */}
        <div className="flex-1 w-full h-full flex justify-center items-center p-8 pt-20 overflow-y-auto">
          <div className="shrink-0 w-[400px] border-r border-border-standard bg-bg-card flex flex-col relative z-20">
            {activeTab === 'homepage' && <HomepagePreview />}
            {activeTab === 'dashboard' && <DashboardPreview />}
            {activeTab === 'app' && <AppPreview />}
          </div>
        </div>

      </main>
    </div>
  );
}
