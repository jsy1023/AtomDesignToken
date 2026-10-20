'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Table,
  FileCode,
  Bell,
  Box,
  Layers,
  Copy,
  Check,
  Expand,
  Minimize2,
} from 'lucide-react';
import { OidNode, OidNodeType } from '@/lib/data/mibModels';

interface OidTreeViewProps {
  rootNodes: OidNode[];
  selectedOid?: string;
  onSelectNode: (node: OidNode) => void;
  searchQuery?: string;
}

export function OidTreeView({
  rootNodes,
  selectedOid,
  onSelectNode,
  searchQuery = '',
}: OidTreeViewProps) {
  // 열려있는 OID 노드 Set
  const [expandedOids, setExpandedOids] = useState<Set<string>>(() => {
    // 기본적으로 depth 3까지는 펼침
    const initial = new Set<string>();
    const expandRec = (nodes: OidNode[], currentDepth: number) => {
      nodes.forEach((n) => {
        if (currentDepth <= 4 && n.children.length > 0) {
          initial.add(n.numericOid);
          expandRec(n.children, currentDepth + 1);
        }
      });
    };
    expandRec(rootNodes, 1);
    return initial;
  });

  const [copiedOid, setCopiedOid] = useState<string | null>(null);

  // 모든 노드 펼치기
  const expandAll = () => {
    const all = new Set<string>();
    const rec = (nodes: OidNode[]) => {
      nodes.forEach((n) => {
        if (n.children.length > 0) {
          all.add(n.numericOid);
          rec(n.children);
        }
      });
    };
    rec(rootNodes);
    setExpandedOids(all);
  };

  // 모든 노드 접기
  const collapseAll = () => {
    setExpandedOids(new Set());
  };

  const toggleExpand = (oid: string) => {
    setExpandedOids((prev) => {
      const next = new Set(prev);
      if (next.has(oid)) {
        next.delete(oid);
      } else {
        next.add(oid);
      }
      return next;
    });
  };

  const handleCopy = (e: React.MouseEvent, oid: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(oid);
    setCopiedOid(oid);
    setTimeout(() => setCopiedOid(null), 1800);
  };

  // 노드 타입별 아이콘 및 뱃지 스타일 매핑
  const getNodeMeta = (type: OidNodeType, hasChildren: boolean, isOpen: boolean) => {
    switch (type) {
      case 'table':
        return {
          icon: <Table className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />,
          badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
          label: 'Table',
        };
      case 'row':
        return {
          icon: <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />,
          badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          label: 'Entry',
        };
      case 'scalar':
        return {
          icon: <FileCode className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          label: 'Scalar',
        };
      case 'notification':
        return {
          icon: <Bell className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />,
          badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          label: 'Trap',
        };
      case 'group':
      default:
        return {
          icon: isOpen ? (
            <FolderOpen className="w-3.5 h-3.5 text-blue-500" />
          ) : (
            <Folder className="w-3.5 h-3.5 text-blue-500" />
          ),
          badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
          label: hasChildren ? 'Group' : 'Node',
        };
    }
  };

  // 단일 노드 렌더러 (재귀)
  const renderNode = (node: OidNode, depth: number) => {
    const hasChildren = node.children.length > 0;
    const isOpen = expandedOids.has(node.numericOid);
    const isSelected = selectedOid === node.numericOid;
    const meta = getNodeMeta(node.nodeType, hasChildren, isOpen);

    // 검색어 하이라이트 체크
    const isMatched = searchQuery
      ? node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.numericOid.includes(searchQuery)
      : false;

    return (
      <div key={node.numericOid} className="select-none text-xs">
        <div
          onClick={() => onSelectNode(node)}
          style={{ paddingLeft: `${Math.max(8, depth * 16)}px` }}
          className={`group flex items-center justify-between py-1.5 pr-2.5 rounded-xl cursor-pointer transition-colors ${
            isSelected
              ? 'bg-[var(--accent-light)] text-[var(--accent-primary)] font-semibold border border-[var(--accent-primary)]/30'
              : isMatched
              ? 'bg-amber-500/10 text-[var(--text-primary)] font-medium'
              : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
          }`}
        >
          {/* Left: Expand Arrow, Icon, Name, SubId */}
          <div className="flex items-center gap-1.5 min-w-0 pr-2">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(node.numericOid);
                }}
                className="w-4 h-4 flex items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[var(--text-secondary)] shrink-0 transition-transform"
              >
                {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <span className="w-4 shrink-0" />
            )}

            <span className="shrink-0">{meta.icon}</span>

            {/* OID 심볼명 */}
            <span
              className={`truncate font-mono ${
                isSelected ? 'font-bold' : ''
              } ${isMatched ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}`}
            >
              {node.name}
            </span>

            {/* SubId 표기 (e.g. (1)) */}
            <span className="text-[10px] text-[var(--text-muted)] font-mono shrink-0">
              ({node.subId})
            </span>
          </div>

          {/* Right: Badge & OID Copy Action */}
          <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100">
            <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-semibold border ${meta.badge}`}>
              {meta.label}
            </span>

            <button
              type="button"
              onClick={(e) => handleCopy(e, node.numericOid)}
              className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-neutral-200/60 dark:hover:bg-neutral-700 transition"
              title={`OID 복사: ${node.numericOid}`}
            >
              {copiedOid === node.numericOid ? (
                <Check className="w-3 h-3 text-emerald-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
        </div>

        {/* 자식 노드 재귀 렌더링 */}
        {hasChildren && isOpen && (
          <div className="border-l border-[var(--border-subtle)] ml-3.5">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-xs">
      {/* 트리 컨트롤 상단 바 */}
      <div className="px-4 py-2.5 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-bold text-[var(--text-primary)]">
            OID 계층 트리
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
            {rootNodes.length} Roots
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={expandAll}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[11px] font-medium transition"
            title="모두 펼치기"
          >
            <Expand className="w-3 h-3" />
            <span className="hidden sm:inline">모두 펼치기</span>
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[11px] font-medium transition"
            title="모두 접기"
          >
            <Minimize2 className="w-3 h-3" />
            <span className="hidden sm:inline">접기</span>
          </button>
        </div>
      </div>

      {/* 트리 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar min-h-[350px] max-h-[680px]">
        {rootNodes.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-center p-6 text-[var(--text-muted)] text-xs">
            <Box className="w-8 h-8 mb-2 opacity-40" />
            <p>로드된 OID 트리가 없습니다.</p>
            <p className="text-[11px] mt-1">상단에서 MIB 파일을 업로드하거나 샘플을 로드하세요.</p>
          </div>
        ) : (
          rootNodes.map((root) => renderNode(root, 0))
        )}
      </div>
    </div>
  );
}
