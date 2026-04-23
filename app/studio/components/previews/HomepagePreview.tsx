import React from 'react';
import { Button } from '@/app/templates/Button/Button';
import { Card, CardContent, CardHeader } from '@/app/templates/Card/Card';

export function HomepagePreview() {
  return (
    <div className="flex flex-col w-full h-full bg-bg-wrapper text-text-standard overflow-y-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-border-standard bg-bg-card">
        <span className="font-extrabold text-h5 text-text-title tracking-tight">Acme.</span>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:text-primary transition-colors">Products</a>
          <a href="#" className="hover:text-primary transition-colors">Solutions</a>
          <a href="#" className="hover:text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex gap-3">
          <Button type="gray">Log In</Button>
          <Button type="primary">Sign Up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-section-padding px-container-padding gap-component-gap">
        <h1 className="text-text-title font-extrabold" style={{ fontSize: 'var(--font-sizes-h1)' }}>
          Design without Limits
        </h1>
        <p className="text-text-body max-w-2xl" style={{ fontSize: 'var(--font-sizes-h5)' }}>
          Build scalable and consistent web applications faster than ever using our robust and flexible atomic design token system.
        </p>
        <div className="flex gap-4 mt-4">
            <Button className="px-8 py-3 text-base font-bold shadow-lg">Get Started</Button>
            <Button type="outline" className="px-8 py-3 text-base font-bold bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm">Read Documentation</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-section-padding px-container-padding max-w-container-width mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-section-gap">
        <Card>
          <CardHeader>
            <h3 className="font-bold text-text-title" style={{ fontSize: 'var(--font-sizes-h4)' }}>Dynamic Themes</h3>
          </CardHeader>
          <CardContent>
            <p className="text-text-body text-[14px]">
              Effortlessly switch between light, dark, or standard custom layouts with zero extra CSS overhead.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-bold text-text-title" style={{ fontSize: 'var(--font-sizes-h4)' }}>Semantic Tokens</h3>
          </CardHeader>
          <CardContent>
            <p className="text-text-body text-[14px]">
              A rigid structure giving your colors, spacing, and typography a deep meaningful context.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-bold text-text-title" style={{ fontSize: 'var(--font-sizes-h4)' }}>React Ready</h3>
          </CardHeader>
          <CardContent>
            <p className="text-text-body text-[14px]">
              Comes packed with headless UI and interactive component templates.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-border-standard flex justify-center text-text-disabled text-sm">
        © 2026 Atom Design System. All rights reserved.
      </footer>
    </div>
  );
}
