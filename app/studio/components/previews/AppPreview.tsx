import React from 'react';
import { Card, CardContent } from '@/app/templates/Card/Card';

export function AppPreview() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-bg-wrapper py-8">
      {/* Mobile Device Container */}
      <div className="w-[375px] h-[720px] bg-bg-card rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col border-4 border-border-standard">
        
        {/* Status Bar Mock */}
        <div className="h-6 bg-bg-card w-full flex justify-between items-center px-6 pt-2">
          <div className="text-[10px] font-bold text-text-title">9:41</div>
          <div className="flex gap-1">
            <div className="w-3 h-2.5 bg-text-title rounded-[2px]"></div>
            <div className="w-4 h-2.5 bg-text-title rounded-[2px]"></div>
          </div>
        </div>

        {/* App Bar */}
        <header className="px-6 py-4 flex justify-between items-center bg-bg-card">
          <div className="flex flex-col">
            <span className="text-text-sub text-xs">Good Morning</span>
            <span className="font-bold text-text-title" style={{ fontSize: 'var(--font-sizes-h5)' }}>Alex</span>
          </div>
          <div className="w-10 h-10 rounded-circle bg-bg-wrapper border border-border-standard"></div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-container-padding py-component-padding flex flex-col gap-section-gap bg-bg-wrapper rounded-t-3xl">
          
          {/* Balance Card */}
          <div className="w-full bg-primary rounded-common p-6 text-white shadow-md">
            <div className="text-blue-100 text-sm mb-1 opacity-80">Total Balance</div>
            <div className="font-extrabold" style={{ fontSize: 'var(--font-sizes-h2)' }}>$12,450.00</div>
            <div className="mt-4 flex gap-4">
               <div className="flex-1 py-2 bg-white bg-opacity-20 rounded text-center text-sm font-bold active:bg-opacity-30 cursor-pointer">
                 Send
               </div>
               <div className="flex-1 py-2 bg-white bg-opacity-20 rounded text-center text-sm font-bold active:bg-opacity-30 cursor-pointer">
                 Receive
               </div>
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="flex flex-col gap-component-gap">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-text-title">Recent Activity</h3>
              <span className="text-primary text-xs font-bold cursor-pointer">See All</span>
            </div>
            
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="!rounded-common border-none shadow-sm">
                <CardContent className="!p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-circle bg-bg-wrapper flex items-center justify-center">
                      <div className="w-4 h-4 rounded-circle bg-gray-400"></div>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-text-title">Payment {i}</div>
                      <div className="text-xs text-text-sub">Today, 10:00 AM</div>
                    </div>
                  </div>
                  <div className="font-bold text-sm text-text-title">-$45.00</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
        </main>

        {/* Bottom Navigation */}
        <nav className="h-16 bg-bg-card border-t border-border-standard flex justify-around items-center px-4">
          <div className="flex flex-col items-center text-primary cursor-pointer">
            <div className="w-6 h-6 rounded bg-primary"></div>
            <span className="text-[10px] mt-1 font-bold">Home</span>
          </div>
          <div className="flex flex-col items-center text-text-disabled hover:text-text-sub cursor-pointer">
            <div className="w-6 h-6 rounded bg-text-disabled"></div>
            <span className="text-[10px] mt-1">Cards</span>
          </div>
          <div className="flex flex-col items-center text-text-disabled hover:text-text-sub cursor-pointer">
            <div className="w-6 h-6 rounded bg-text-disabled"></div>
            <span className="text-[10px] mt-1">Profile</span>
          </div>
        </nav>
        
        {/* Home Indicator */}
        <div className="h-4 bg-bg-card flex justify-center items-center">
          <div className="w-1/3 h-1 bg-text-disabled rounded-full"></div>
        </div>

      </div>
    </div>
  );
}
