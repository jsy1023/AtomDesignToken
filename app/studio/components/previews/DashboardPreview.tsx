import React from 'react';
import { Button } from '@/app/templates/Button/Button';
import { Card, CardContent, CardHeader } from '@/app/templates/Card/Card';

export function DashboardPreview() {
  return (
    <div className="flex w-full h-full bg-bg-wrapper text-text-standard overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-border-standard bg-bg-cardShrink-0">
        <div className="p-6 font-bold text-text-title" style={{ fontSize: 'var(--font-sizes-h4)' }}>
          Console
        </div>
        <nav className="flex flex-col gap-2 px-4 flex-1">
          <div className="px-4 py-2 rounded-common bg-primary text-white cursor-pointer font-bold transition-colors">
            Overview
          </div>
          <div className="px-4 py-2 rounded-common hover:bg-bg-hover text-text-sub cursor-pointer transition-colors">
            Analytics
          </div>
          <div className="px-4 py-2 rounded-common hover:bg-bg-hover text-text-sub cursor-pointer transition-colors">
            Settings
          </div>
        </nav>
        <div className="p-4 border-t border-border-standard">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-circle bg-primary opacity-20 border border-primary"></div>
            <div className="text-sm">
              <div className="font-bold text-text-title">Admin User</div>
              <div className="text-text-disabled text-xs">admin@acme.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-border-standard bg-bg-card">
          <h2 className="font-bold text-text-title" style={{ fontSize: 'var(--font-sizes-h5)' }}>Overview</h2>
          <Button type="primary" className="!py-1.5 !px-4">New Project</Button>
        </header>

        {/* Content */}
        <div className="p-section-padding flex flex-col gap-section-gap">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-component-gap">
            <Card>
              <CardContent className="py-6">
                <div className="text-text-sub text-sm mb-2">Total Revenue</div>
                <div className="text-text-title font-extrabold" style={{ fontSize: 'var(--font-sizes-h2)' }}>$45,231</div>
                <div className="text-success text-xs font-bold mt-2">+20.1% from last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6">
                <div className="text-text-sub text-sm mb-2">New Users</div>
                <div className="text-text-title font-extrabold" style={{ fontSize: 'var(--font-sizes-h2)' }}>+2,350</div>
                <div className="text-success text-xs font-bold mt-2">+15% from last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6">
                <div className="text-text-sub text-sm mb-2">Active Sessions</div>
                <div className="text-text-title font-extrabold" style={{ fontSize: 'var(--font-sizes-h2)' }}>12,234</div>
                <div className="text-danger text-xs font-bold mt-2">-4% from last hour</div>
              </CardContent>
            </Card>
          </div>

          {/* Data Table Mock */}
          <Card className="flex-1">
            <CardHeader>
              <h3 className="font-bold text-text-title">Recent Transactions</h3>
            </CardHeader>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bg-card border-b border-border-standard">
                    <th className="py-3 px-4 font-bold text-text-sub text-sm">ID</th>
                    <th className="py-3 px-4 font-bold text-text-sub text-sm">Customer</th>
                    <th className="py-3 px-4 font-bold text-text-sub text-sm">Amount</th>
                    <th className="py-3 px-4 font-bold text-text-sub text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-standard">
                    <td className="py-3 px-4 text-sm">#1001</td>
                    <td className="py-3 px-4 font-bold text-text-title text-sm">John Doe</td>
                    <td className="py-3 px-4 text-sm">$120.00</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-success opacity-20 text-success rounded-full text-xs font-bold">Paid</span></td>
                  </tr>
                  <tr className="border-b border-border-standard bg-bg-hover">
                    <td className="py-3 px-4 text-sm">#1002</td>
                    <td className="py-3 px-4 font-bold text-text-title text-sm">Jane Smith</td>
                    <td className="py-3 px-4 text-sm">$45.00</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-warning opacity-20 text-warning rounded-full text-xs font-bold">Pending</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm">#1003</td>
                    <td className="py-3 px-4 font-bold text-text-title text-sm">Bob Johnson</td>
                    <td className="py-3 px-4 text-sm">$890.00</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-danger opacity-20 text-danger rounded-full text-xs font-bold">Failed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
