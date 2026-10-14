import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { GALLERY_COMPONENTS } from '@/lib/data/components';
import { ComponentDetailPageContent } from '@/components/docs/ComponentDetailPageContent';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return GALLERY_COMPONENTS.map((comp) => ({
    id: comp.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const component = GALLERY_COMPONENTS.find((c) => c.id === id);

  if (!component) {
    return {
      title: '컴포넌트를 찾을 수 없습니다 | AtomDesignToken',
    };
  }

  return {
    title: `${component.name} 컴포넌트 가이드 & 사용 케이스 | AtomDesignToken`,
    description: `${component.name} 컴포넌트의 실무 사용 패턴, 설계 원칙, 코드 복사 및 API 명세`,
  };
}

export default async function ComponentDetailPage({ params }: Props) {
  const { id } = await params;
  const component = GALLERY_COMPONENTS.find((c) => c.id === id);

  if (!component) {
    notFound();
  }

  return <ComponentDetailPageContent component={component} />;
}
