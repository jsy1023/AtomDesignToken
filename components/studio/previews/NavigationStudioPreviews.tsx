'use client';

import React from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Nav,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarNav,
  NavDropdown,
  NavDropdownItem,
  NavItem,
  NavLink,
  Pagination,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  Tree,
  TreeNode,
} from '@/components/ui';
import { FileCode, Folder } from 'lucide-react';
import { StudioPreviewItemProps } from './types';

export function TabsStudioPreview({ variable, getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div className="flex items-center gap-2 p-1.5 rounded-(--radius) bg-(--bg-secondary)/60 border border-(--border-subtle)">
      <Button
        variant="secondary"
        size="sm"
        style={{
          backgroundColor: variable?.id === 'pills' ? getPaletteValue(b.activeIndicator || '') : 'transparent',
          color: getPaletteValue(b.activeText || ''),
          borderRadius: getPaletteValue(b.borderRadius || ''),
          borderBottom:
            variable?.id === 'underlined' ? `2px solid ${getPaletteValue(b.activeIndicator || '')}` : 'none',
        }}
        className="px-3 py-1.5 text-xs font-bold"
      >
        Active Tab
      </Button>
      <Button
        variant="ghost"
        size="sm"
        style={{
          color: getPaletteValue(b.inactiveText || ''),
        }}
        className="px-3 py-1.5 text-xs font-medium"
      >
        Inactive Tab
      </Button>
    </div>
  );
}

export function NavbarStudioPreview({ getPaletteValue, b }: StudioPreviewItemProps) {
  return (
    <div className="w-full max-w-xl">
      <Navbar
        bordered={false}
        blur={false}
        innerClassName="h-12 w-full px-4"
        style={{
          backgroundColor: getPaletteValue(b.background || ''),
          border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
          borderRadius: getPaletteValue(b.borderRadius || ''),
        }}
        className="shadow-xs transition-all overflow-hidden"
      >
        <NavbarBrand>
          <span
            className="w-3.5 h-3.5 rounded-(--radius-sm) flex items-center justify-center shrink-0"
            style={{ backgroundColor: getPaletteValue(b.activeText || '') }}
          />
          <span className="font-bold text-sm tracking-tight text-(--text-primary)">AtomBrand</span>
        </NavbarBrand>

        <NavbarNav>
          <NavbarLink
            active
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              color: getPaletteValue(b.activeText || ''),
              backgroundColor: 'transparent',
            }}
            className="text-xs font-semibold"
          >
            대시보드
          </NavbarLink>
          <NavbarLink
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              color: getPaletteValue(b.textColor || ''),
            }}
            className="text-xs hover:opacity-80"
          >
            컴포넌트
          </NavbarLink>
          <NavbarLink
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
              color: getPaletteValue(b.textColor || ''),
            }}
            className="text-xs hover:opacity-80"
          >
            문서
          </NavbarLink>
        </NavbarNav>

        <NavbarActions>
          <Button
            variant="primary"
            size="sm"
            style={{
              backgroundColor: getPaletteValue(b.activeText || ''),
              color: '#ffffff',
              borderColor: 'transparent',
            }}
            className="text-xs h-7 px-2.5"
          >
            시작하기
          </Button>
        </NavbarActions>
      </Navbar>
    </div>
  );
}

export function SidebarStudioPreview({ getPaletteValue, locale, b }: StudioPreviewItemProps) {
  return (
    <div className="w-full max-w-xs">
      <Sidebar
        width="100%"
        style={{
          backgroundColor: getPaletteValue(b.background || ''),
          border: `1px solid ${getPaletteValue(b.borderColor || '')}`,
          borderRadius: getPaletteValue(b.borderRadius || ''),
        }}
        className="h-auto p-4 flex flex-col gap-3 shadow-xs transition-all overflow-hidden"
      >
        <SidebarHeader className="h-auto pb-3 px-0 border-b border-(--border-subtle)">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs"
              style={{
                backgroundColor: getPaletteValue(b.activeBackground || ''),
                color: getPaletteValue(b.activeText || ''),
              }}
            >
              A
            </div>
            <span className="font-bold text-sm text-(--text-primary)">Atom Console</span>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-0 flex flex-col gap-1">
          <SidebarMenuButton
            active
            style={{
              backgroundColor: getPaletteValue(b.activeBackground || ''),
              color: getPaletteValue(b.activeText || ''),
              borderRadius: getPaletteValue(b.borderRadius || ''),
            }}
            className="px-3 py-2 text-xs font-semibold flex items-center justify-between shadow-xs"
          >
            <span>{locale === 'ko' ? '개요' : 'Overview'}</span>
            <Badge variant="primary" className="text-[10px] py-0 px-1.5">
              Live
            </Badge>
          </SidebarMenuButton>
          <SidebarMenuButton
            style={{
              color: getPaletteValue(b.textColor || ''),
              borderRadius: getPaletteValue(b.borderRadius || ''),
            }}
            className="px-3 py-2 text-xs hover:bg-(--bg-secondary) transition"
          >
            {locale === 'ko' ? '토큰 카탈로그' : 'Token Catalog'}
          </SidebarMenuButton>
          <SidebarMenuButton
            style={{
              color: getPaletteValue(b.textColor || ''),
              borderRadius: getPaletteValue(b.borderRadius || ''),
            }}
            className="px-3 py-2 text-xs hover:bg-(--bg-secondary) transition"
          >
            {locale === 'ko' ? '설정' : 'Settings'}
          </SidebarMenuButton>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export function NavStudioPreview({ variable, getPaletteValue, locale, b }: StudioPreviewItemProps) {
  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-4">
      <Nav variant={(variable?.id as any) || 'default'} className="transition-all">
        <NavItem active>
          <NavLink
            asButton
            active
            style={{
              backgroundColor: getPaletteValue(b.activeBackground || ''),
              color: getPaletteValue(b.activeText || ''),
              borderRadius: getPaletteValue(b.borderRadius || ''),
              paddingLeft: getPaletteValue(b.paddingX || ''),
              paddingRight: getPaletteValue(b.paddingX || ''),
              paddingTop: getPaletteValue(b.paddingY || ''),
              paddingBottom: getPaletteValue(b.paddingY || ''),
            }}
          >
            {locale === 'ko' ? '대시보드' : 'Dashboard'}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            asButton
            style={{
              color: getPaletteValue(b.textColor || ''),
              borderRadius: getPaletteValue(b.borderRadius || ''),
              paddingLeft: getPaletteValue(b.paddingX || ''),
              paddingRight: getPaletteValue(b.paddingX || ''),
              paddingTop: getPaletteValue(b.paddingY || ''),
              paddingBottom: getPaletteValue(b.paddingY || ''),
            }}
          >
            컴포넌트
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            asButton
            style={{
              color: getPaletteValue(b.textColor || ''),
              borderRadius: getPaletteValue(b.borderRadius || ''),
              paddingLeft: getPaletteValue(b.paddingX || ''),
              paddingRight: getPaletteValue(b.paddingX || ''),
              paddingTop: getPaletteValue(b.paddingY || ''),
              paddingBottom: getPaletteValue(b.paddingY || ''),
            }}
          >
            가이드
          </NavLink>
        </NavItem>
        <NavItem>
          <NavDropdown label="더보기">
            <NavDropdownItem title="디자인 토큰" description="W3C DTCG 표준 토큰 규격" />
            <NavDropdownItem title="UX 패턴" description="27개 실무 검증 인터랙션" />
          </NavDropdown>
        </NavItem>
      </Nav>
    </div>
  );
}

export function BreadcrumbStudioPreview({ variable }: StudioPreviewItemProps) {
  return (
    <Breadcrumb
      items={[
        { label: '홈', href: '#' },
        { label: '라이브러리', href: '#' },
        { label: variable?.name || 'Current Item' },
      ]}
    />
  );
}

export function PaginationStudioPreview() {
  return <Pagination currentPage={3} totalPages={8} onPageChange={() => {}} />;
}

export function TreeStudioPreview({
  activeTypeId,
  getPaletteValue,
  b,
  statusWrapperStyle,
}: StudioPreviewItemProps) {
  const [previewTreeId, setPreviewTreeId] = React.useState('Button.tsx');
  const bg = b.background ? getPaletteValue(b.background) : 'var(--bg-primary)';
  const border = b.borderColor ? getPaletteValue(b.borderColor) : 'var(--border-subtle)';
  const text = b.textColor ? getPaletteValue(b.textColor) : 'var(--text-primary)';
  const radius = b.borderRadius ? getPaletteValue(b.borderRadius) : 'var(--radius-md)';
  const padding = b.padding ? getPaletteValue(b.padding) : '12px';

  const treeData: TreeNode[] = [
    {
      id: 'components',
      label: 'components/ui',
      icon: <Folder className="w-3.5 h-3.5" />,
      children: [
        { id: 'Button.tsx', label: 'Button.tsx', icon: <FileCode className="w-3.5 h-3.5" /> },
        { id: 'TokenSelect.tsx', label: 'TokenSelect.tsx', icon: <FileCode className="w-3.5 h-3.5" /> },
        { id: 'Alert.tsx', label: 'Alert.tsx', icon: <FileCode className="w-3.5 h-3.5" /> },
      ],
    },
    {
      id: 'tokens',
      label: 'tokens/token.json',
      icon: <FileCode className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="w-full max-w-sm transition-all" style={statusWrapperStyle}>
      <div
        style={{
          backgroundColor: bg,
          borderColor: border,
          color: text,
          borderRadius: radius,
          padding,
        }}
        className={`${activeTypeId.includes('bordered') ? 'border-2' : 'border'} shadow-2xs ${
          activeTypeId.includes('compact') ? 'text-xs' : ''
        }`}
      >
        <Tree
          data={treeData}
          defaultExpandedIds={['components']}
          selectedId={previewTreeId}
          onSelect={(node) => setPreviewTreeId(node.id)}
        />
      </div>
    </div>
  );
}
