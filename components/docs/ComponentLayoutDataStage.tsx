'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Badge,
  Button,
  Chart,
  Container,
  Grid,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarNav,
  Offcanvas,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarToggle,
  Stack,
  Toast,
} from '@/components/ui';
import {
  ComponentTypeSpec,
  PaletteVariable,
  StudioComponentDefinition,
} from '@/lib/data/studioData';
import { StudioLivePreview } from '@/components/studio/StudioLivePreview';
import {
  ExternalLink,
  Layers,
  LayoutDashboard,
  Palette,
  Settings,
  Users,
} from 'lucide-react';
import { ComponentCoreStage } from './ComponentInteractiveStage';

const CORE_STAGE_IDS = new Set([
  'layout-spacing',
  'color-status',
  'typography',
  'button',
  'input',
  'selection',
  'dialog',
  'sheet',
  'alert',
  'token-select',
  'tabs',
  'badge',
  'card',
  'table',
  'tree',
]);

export interface ComponentLayoutDataStageProps {
  componentId: string;
  studioCompId: string;
  locale: string;
  studioDef?: StudioComponentDefinition;
  compTypes: ComponentTypeSpec[];
  studioPalette: PaletteVariable[];
}

export function ComponentPreviewStage({
  componentId,
  studioCompId,
  locale,
  studioDef,
  compTypes,
  studioPalette,
}: ComponentLayoutDataStageProps) {
  const [navbarVariable, setNavbarVariable] = useState<'default' | 'floating'>('default');
  const [sidebarVariable, setSidebarVariable] = useState<'default' | 'floating'>('default');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeNavId, setActiveNavId] = useState('dash');

  if (CORE_STAGE_IDS.has(componentId)) {
    return (
      <ComponentCoreStage
        componentId={componentId}
        locale={locale}
        compTypes={compTypes}
        studioVariables={studioDef?.variables || []}
      />
    );
  }

  switch (componentId) {
    case 'container':
      return (
        <div className="w-full space-y-4">
          <Container size="sm" className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-secondary)/50 text-center">
            <span className="text-sm font-mono text-(--text-secondary)">Container size=&quot;sm&quot; (640px)</span>
          </Container>
          <Container size="md" className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-secondary)/50 text-center">
            <span className="text-sm font-mono text-(--text-secondary)">Container size=&quot;md&quot; (768px)</span>
          </Container>
          <Container size="lg" className="p-4 rounded-(--radius) border border-(--border-strong) bg-(--bg-secondary)/50 text-center">
            <span className="text-sm font-mono font-semibold text-(--text-primary)">Container size=&quot;lg&quot; (1024px)</span>
          </Container>
        </div>
      );

    case 'layout':
      return (
        <div className="w-full p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary) space-y-4">
          <div className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-2">
            {locale === 'ja' ? 'Stack & Grid トークン連携プレビュー' : locale === 'en' ? 'Stack & Grid Token Preview' : 'Stack & Grid 토큰 연동 프리뷰'}
          </div>
          <Stack gap="3">
            <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-sm font-mono">
              {locale === 'ja' ? 'Stack gap="3" (12px) アイテム 1' : locale === 'en' ? 'Stack gap="3" (12px) Item 1' : 'Stack gap="3" (12px) 아이템 1'}
            </div>
            <div className="p-2.5 rounded-(--radius-sm) bg-(--bg-secondary) text-sm font-mono">
              {locale === 'ja' ? 'Stack gap="3" (12px) アイテム 2' : locale === 'en' ? 'Stack gap="3" (12px) Item 2' : 'Stack gap="3" (12px) 아이템 2'}
            </div>
          </Stack>
          <Grid cols={3} gap="2" className="mt-3">
            {['Col 1', 'Col 2', 'Col 3'].map((c) => (
              <div key={c} className="p-3 text-center rounded-(--radius-sm) border border-(--border-subtle) text-sm font-mono">{c}</div>
            ))}
          </Grid>
        </div>
      );

    case 'navbar':
      return (
        <div className="w-full flex flex-col gap-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
              {locale === 'ja' ? 'ナビゲーションバー形式の切り替え' : locale === 'en' ? 'Navbar Variant Switcher' : '네비게이션 바 스타일 변수 선택'}
            </span>
            <div className="flex items-center gap-1 bg-(--bg-secondary) p-1 rounded-(--radius-sm) border border-(--border-subtle)">
              <Button type="button" size="sm" variant={navbarVariable === 'default' ? 'primary' : 'ghost'} onClick={() => setNavbarVariable('default')} className="px-2.5 py-1 text-xs font-medium h-auto">표준 스티키 (Standard)</Button>
              <Button type="button" size="sm" variant={navbarVariable === 'floating' ? 'primary' : 'ghost'} onClick={() => setNavbarVariable('floating')} className="px-2.5 py-1 text-xs font-medium h-auto">플로팅 필 (Floating Pill)</Button>
            </div>
          </div>

          <div className="p-4 rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle)">
            <Navbar key={navbarVariable} variable={navbarVariable} bordered blur className={navbarVariable === 'floating' ? 'max-w-4xl mx-auto rounded-full shadow-md' : 'rounded-(--radius-sm)'}>
              <NavbarBrand href="#brand">
                <div className="w-7 h-7 rounded-lg bg-(--atom-color-primary,var(--accent-primary)) text-white flex items-center justify-center font-bold text-xs shadow-xs">AT</div>
                <span className="font-bold text-sm">AtomSystem</span>
              </NavbarBrand>
              <NavbarNav>
                {[
                  { id: 'dash', label: '대시보드' },
                  { id: 'components', label: '컴포넌트' },
                  { id: 'tokens', label: '디자인 토큰' },
                ].map((n) => (
                  <NavbarLink key={n.id} href={`#${n.id}`} active={activeNavId === n.id} onClick={(e) => { e.preventDefault(); setActiveNavId(n.id); }}>
                    {n.label}
                  </NavbarLink>
                ))}
              </NavbarNav>
              <NavbarActions>
                <Button variant="outline" size="sm">문서 보기</Button>
                <Button variant="primary" size="sm">시작하기</Button>
              </NavbarActions>
            </Navbar>
          </div>
        </div>
      );

    case 'sidebar':
      return (
        <div className="w-full flex flex-col gap-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">
              {locale === 'ja' ? 'サイドバーの展開/折りたたみ操作' : locale === 'en' ? 'Sidebar Expand / Collapse' : '사이드바 인터랙션 및 상태 제어'}
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-xs">
                {isSidebarCollapsed ? '전체 펼치기 (Expand)' : '슬림 접기 (Collapse)'}
              </Button>
              <div className="flex items-center gap-1 bg-(--bg-secondary) p-1 rounded-(--radius-sm) border border-(--border-subtle)">
                <Button type="button" size="sm" variant={sidebarVariable === 'default' ? 'primary' : 'ghost'} onClick={() => setSidebarVariable('default')} className="px-2.5 py-1 text-xs font-medium h-auto">엔터프라이즈 (Default)</Button>
                <Button type="button" size="sm" variant={sidebarVariable === 'floating' ? 'primary' : 'ghost'} onClick={() => setSidebarVariable('floating')} className="px-2.5 py-1 text-xs font-medium h-auto">플로팅 카드 (Floating)</Button>
              </div>
            </div>
          </div>

          <div className="h-96 w-full rounded-(--radius) bg-(--bg-secondary)/40 border border-(--border-subtle) flex overflow-hidden">
            <Sidebar collapsed={isSidebarCollapsed} variable={sidebarVariable} className={sidebarVariable === 'floating' ? 'm-3 rounded-(--radius) shadow-md border' : 'h-full'}>
              <SidebarHeader>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-(--atom-color-primary,var(--accent-primary)) text-white flex items-center justify-center font-bold text-xs shrink-0">AT</div>
                  {!isSidebarCollapsed && (
                    <div className="truncate">
                      <div className="font-bold text-xs text-(--text-primary)">Atom Console</div>
                      <div className="text-[10px] text-(--text-muted) font-mono">Workspace Pro</div>
                    </div>
                  )}
                </div>
                <SidebarToggle collapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>메인 메뉴 (Core)</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton active={activeNavId === 'dash'} collapsed={isSidebarCollapsed} onClick={() => setActiveNavId('dash')} icon={<LayoutDashboard className="w-4 h-4" />} badge={<span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white border border-white/30">Live</span>}>
                        대시보드
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton active={activeNavId === 'components'} collapsed={isSidebarCollapsed} onClick={() => setActiveNavId('components')} icon={<Layers className="w-4 h-4" />} badge={<Badge variant="neutral">35</Badge>}>
                        컴포넌트 라이브러리
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton active={activeNavId === 'tokens'} collapsed={isSidebarCollapsed} onClick={() => setActiveNavId('tokens')} icon={<Palette className="w-4 h-4" />}>
                        디자인 토큰 스튜디오
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>설정 및 관리 (Admin)</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton active={activeNavId === 'team'} collapsed={isSidebarCollapsed} onClick={() => setActiveNavId('team')} icon={<Users className="w-4 h-4" />}>
                        팀원 및 권한 관리
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton active={activeNavId === 'settings'} collapsed={isSidebarCollapsed} onClick={() => setActiveNavId('settings')} icon={<Settings className="w-4 h-4" />}>
                        환경 설정
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter>
                {!isSidebarCollapsed ? (
                  <div className="flex items-center justify-between text-xs text-(--text-secondary)">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-(--atom-color-success)/20 text-(--atom-color-success) font-bold flex items-center justify-center text-[10px]">JS</div>
                      <span className="truncate font-medium">관리자 (Admin)</span>
                    </div>
                    <span className="font-mono text-[10px] text-(--text-muted)">v0.15</span>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-(--atom-color-success)/20 text-(--atom-color-success) font-bold flex items-center justify-center text-[10px] mx-auto">JS</div>
                )}
              </SidebarFooter>
            </Sidebar>

            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center gap-2 text-(--text-secondary)">
              <div className="w-10 h-10 rounded-full bg-(--accent-primary)/10 text-(--accent-primary) flex items-center justify-center font-bold">✓</div>
              <div className="font-bold text-sm text-(--text-primary)">
                {activeNavId === 'dash' ? '대시보드 뷰어 활성화됨' : activeNavId === 'components' ? '컴포넌트 라이브러리 뷰어 활성화됨' : activeNavId === 'tokens' ? '디자인 토큰 스튜디오 뷰어 활성화됨' : '관리 메뉴 뷰어'}
              </div>
              <p className="text-xs text-(--text-muted) max-w-xs">
                사이드바 메뉴 클릭 시 active 상태 전환 및 접기/펼치기 반응형 너비가 토큰 기반으로 부드럽게 전환됩니다.
              </p>
            </div>
          </div>
        </div>
      );

    case 'chart':
      return (
        <div className="w-full max-w-xl py-2 flex flex-col gap-4">
          <Chart
            type="area"
            variant="primary"
            data={[
              { label: '1월', value: 120 },
              { label: '2월', value: 180 },
              { label: '3월', value: 150 },
              { label: '4월', value: 240 },
              { label: '5월', value: 310 },
            ]}
            height={200}
          />
        </div>
      );

    case 'offcanvas':
      return (
        <div className="w-full max-w-md py-2">
          <Offcanvas
            isOpen={true}
            onClose={() => {}}
            inline={true}
            placement="right"
            title="상세정보 인스펙터"
            description="선택한 항목의 세부 속성을 편집합니다."
            footer={
              <div className="flex justify-end gap-2">
                <Button variant="secondary" size="sm">취소</Button>
                <Button variant="primary" size="sm">적용하기</Button>
              </div>
            }
          >
            <div className="space-y-3 py-2 text-xs">
              <div className="p-3 rounded-(--radius) bg-(--bg-secondary) space-y-1">
                <div className="font-semibold text-(--text-primary)">오프캔버스 드로어</div>
                <div className="text-(--text-muted)">메인 화면의 컨텍스트를 유지하면서 추가 정보를 제공합니다.</div>
              </div>
            </div>
          </Offcanvas>
        </div>
      );

    case 'toast':
      return (
        <div className="w-full max-w-md py-2 flex flex-col gap-3">
          <Toast variant="success" title="저장 완료" description="변경 사항이 안전하게 클라우드에 동기화되었습니다." inline={true} onClose={() => {}} />
          <Toast variant="action" title="항목 삭제됨" description="선택한 프로젝트가 휴지통으로 이동되었습니다." inline={true} action={{ label: '실행 취소', onClick: () => {} }} onClose={() => {}} />
        </div>
      );

    default:
      if (studioDef) {
        const activeVar = studioDef.variables[0];
        const activeType = compTypes[0];
        return (
          <div className="w-full max-w-md flex flex-col items-center gap-4 py-2">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-(--text-secondary) uppercase tracking-wider">Studio SSOT Synchronized Preview</span>
              <Link href={`/studio?component=${studioCompId}`} className="text-xs font-semibold text-(--accent-primary) hover:underline flex items-center gap-1">
                <span>스튜디오에서 편집</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <StudioLivePreview
              componentId={studioDef.id}
              variable={activeVar}
              type={activeType}
              getPaletteValue={(palId) => studioPalette.find((p) => p.id === palId)?.value || `var(${palId})`}
            />
          </div>
        );
      }
      return null;
  }
}
