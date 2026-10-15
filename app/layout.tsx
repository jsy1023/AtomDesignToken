import type { Metadata } from 'next';
import './globals.css';
import { ThemeEditorRoot } from '@/components/editor/ThemeEditorRoot';

export const metadata: Metadata = {
  title: 'AtomDesignToken - UI/UX 디자이너의 피그마 해방 | 말로 디자인하는 시대',
  description: '검증된 UX 패턴 선택부터 브랜드 토큰, AI 프롬프트까지. 복사 한 번으로 완성되는 완전히 달라진 디자인 작업.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body 
        className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased"
        suppressHydrationWarning
      >
        <ThemeEditorRoot>
          {children}
        </ThemeEditorRoot>
      </body>
    </html>
  );
}
