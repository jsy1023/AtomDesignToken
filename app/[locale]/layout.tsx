import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeEditorRoot } from '@/components/editor/ThemeEditorRoot';
import '../../css/atom-ui.css';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isJa = locale === 'ja';

  return {
    title: isJa
      ? 'AtomDesignToken - UI/UXデザイナーのFigma解放 | 言葉でデザインする時代'
      : isEn
      ? 'AtomDesignToken - Universal Design Token & Real-world UX Pattern System'
      : 'AtomDesignToken - UI/UX 디자이너의 피그마 해방 | 말로 디자인하는 시대',
    description: isJa
      ? '検証済みのUXパターンの選択からブランドトークン、AIプロンプトまで。一度のコピーで完了する全く新しいデザイン作業。'
      : isEn
      ? 'Universal W3C DTCG design tokens, accessible production UI components, and vetted UX patterns for enterprise applications.'
      : '검증된 UX 패턴 선택부터 브랜드 토큰, AI 프롬프트까지. 복사 한 번으로 완성되는 완전히 달라진 디자인 작업.',
  };
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeEditorRoot>
            {children}
          </ThemeEditorRoot>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
