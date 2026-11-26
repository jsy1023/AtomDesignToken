import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ComponentCategory, GALLERY_COMPONENTS, GalleryComponent } from '@/lib/data/components';
import { getComponentTypes, resolveStudioComponentId } from '@/lib/data/studioData';
import { toPascalCase } from '@/lib/services/componentScaffold';
import { loadProjectRegistry } from '@/lib/services/studioRegistryServer';
import { ComponentDetailPageContent } from '@/components/docs/ComponentDetailPageContent';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

function resolveComponentDoc(id: string): GalleryComponent | undefined {
  const staticComp = GALLERY_COMPONENTS.find((c) => c.id === id);
  if (staticComp) return staticComp;

  try {
    const { registry } = loadProjectRegistry(process.cwd());
    const resolvedId = resolveStudioComponentId(id);
    const studioDef = registry.components.find(
      (c) => c.id === id || c.id === resolvedId
    );
    if (!studioDef) return undefined;

    const pascal = toPascalCase(studioDef.id);
    const types = getComponentTypes(studioDef.id, studioDef.types);
    const defaultType = types[0]?.id || 'standard';
    const defaultVar = studioDef.variables[0]?.id || 'default';
    const catLower = studioDef.category.toLowerCase();
    const mappedCategory: ComponentCategory =
      catLower === 'form' ||
      catLower === 'feedback' ||
      catLower === 'navigation' ||
      catLower === 'data' ||
      catLower === 'layout'
        ? catLower
        : 'form';

    return {
      id: studioDef.id,
      name: studioDef.name,
      category: mappedCategory,
      source: studioDef.sourceFile || 'Local Studio SSOT',
      description: studioDef.description,
      callout: {
        type: 'tip',
        title: '로컬 스튜디오 SSOT 자동 연동 컴포넌트',
        text: `이 문서는 tokens/tokens.json 및 ${
          studioDef.sourceFile || `components/ui/${pascal}.tsx`
        } 정의와 실시간 동기화됩니다.`,
      },
      propsSpec: studioDef.docs?.propsSpec || [
        {
          name: 'componentType',
          type: types.map((t) => `'${t.id}'`).join(' | ') || 'string',
          defaultValue: `'${defaultType}'`,
          description: '스튜디오에서 정의한 컴포넌트 외형 양식 (1. Type)',
        },
        {
          name: 'variable',
          type: studioDef.variables.map((v) => `'${v.id}'`).join(' | ') || 'string',
          defaultValue: `'${defaultVar}'`,
          description: '시맨틱 상태/옵션 토큰 변형 (2. Variable)',
        },
        {
          name: 'status',
          type: "'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading'",
          defaultValue: "'default'",
          description: '사용자 인터랙션 상태 피드백 (3. Status)',
        },
      ],
      useCases: studioDef.docs?.useCases || [
        `${studioDef.name} 표준 UI 블록 및 페이지 조립`,
        '로컬 스튜디오에서 토큰 변경 시 프로젝트 전체 스타일 즉시 반영',
      ],
      usagePatterns: studioDef.docs?.usagePatterns || [
        `componentType="${defaultType}"와 variable="${defaultVar}" 조합으로 Type·Variable·Status 3대 아키텍처를 일관되게 유지하세요.`,
      ],
      dosAndDonts: [
        {
          do: `@/components/ui에서 <${pascal} />를 import하고 스튜디오 시맨틱 토큰 변수를 사용하세요.`,
          dont: '임의 HEX 컬러나 raw HTML 컨트롤로 동일 UI를 중복 구현하지 마세요.',
        },
      ],
      relatedPatternIds: [],
      htmlSnippet: `<div class="atom-${studioDef.id} atom-${studioDef.id}--${defaultVar}" data-component="${studioDef.id}" data-type="${defaultType}" data-variable="${defaultVar}">\n  ${studioDef.name}\n</div>`,
      reactSnippet: `import { ${pascal} } from '@/components/ui';\n\nexport function Example${pascal}() {\n  return (\n    <${pascal}\n      componentType="${defaultType}"\n      variable="${defaultVar}"\n      title="${studioDef.name}"\n      description="${studioDef.description}"\n    />\n  );\n}`,
    };
  } catch {
    return undefined;
  }
}

export async function generateStaticParams() {
  return GALLERY_COMPONENTS.map((comp) => ({
    id: comp.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const component = resolveComponentDoc(id);

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
  const { id, locale } = await params;
  if (locale) {
    setRequestLocale(locale);
  }
  const component = resolveComponentDoc(id);

  if (!component) {
    notFound();
  }

  return <ComponentDetailPageContent component={component} />;
}
