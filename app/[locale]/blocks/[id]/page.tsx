import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BLOCKS_COLLECTION } from '@/lib/data/blocks';
import { BlockDetailPageContent } from '@/components/blocks/BlockDetailPageContent';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return BLOCKS_COLLECTION.map((block) => ({
    id: block.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const block = BLOCKS_COLLECTION.find((b) => b.id === id);

  if (!block) {
    return {
      title: '디자인 블록을 찾을 수 없습니다 | AtomDesignToken',
    };
  }

  return {
    title: `${block.title} (${block.englishTitle}) 디자인 블록 문서 | AtomDesignToken`,
    description: block.summary,
  };
}

export default async function BlockDetailPage({ params }: Props) {
  const { id } = await params;
  const block = BLOCKS_COLLECTION.find((b) => b.id === id);

  if (!block) {
    notFound();
  }

  return <BlockDetailPageContent block={block} />;
}
