import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { StudioGuideView } from '@/components/guide/StudioGuideView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return {
      title: 'Local Studio Guide | AtomDesignToken',
      description:
        'How to run npx atomsystem studio, edit tokens and components in the local GUI, save SSOT files, and sync with Figma.',
    };
  }
  if (locale === 'ja') {
    return {
      title: 'ローカルスタジオガイド | AtomDesignToken',
      description:
        'npx atomsystem studio の起動方法からトークン・コンポーネントの編集、保存、Figma連携までの使い方ガイド。',
    };
  }
  return {
    title: '로컬 스튜디오 가이드 | AtomDesignToken',
    description:
      'npx atomsystem studio 실행 방법부터 토큰/컴포넌트 편집, 저장 및 Figma 연동까지 로컬 스튜디오 사용 가이드.',
  };
}

export default function LocalStudioGuidePage() {
  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <Header />
      <main>
        <StudioGuideView />
      </main>
    </div>
  );
}
