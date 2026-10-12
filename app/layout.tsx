import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sensual UI - The Interaction-First UI Engine',
  description: 'AI가 절대 혼자 만들 수 없는 압도적인 마이크로 인터랙션과 실전 블록 라이브러리',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
