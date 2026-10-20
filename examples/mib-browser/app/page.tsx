'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MibParserService } from '@/lib/services/mibParserService';
import { OidSearchEngine } from '@/lib/services/oidSearchEngine';
import { OidNode, MibDocument, OidSearchFilter, OidSearchResult } from '@/lib/data/mibModels';
import { SAMPLE_MIBS, SampleMibEntry } from '@/lib/data/sampleMibs';
import { MibStatsSummary } from '@/components/MibStatsSummary';
import { MibUploader } from '@/components/MibUploader';
import { OidTreeView } from '@/components/OidTreeView';
import { OidDetailPanel } from '@/components/OidDetailPanel';
import { MibSearchPanel } from '@/components/MibSearchPanel';
import { ElasticsearchModal } from '@/components/ElasticsearchModal';
import {
  UploadCloud,
  Download,
  RotateCcw,
} from 'lucide-react';

export default function MibExplorerPage() {
  // 싱글톤 서비스 인스턴스 (OOP & SRP)
  const parserService = useMemo(() => new MibParserService(), []);
  const searchEngine = useMemo(() => new OidSearchEngine(), []);

  // 상태 관리
  const [documents, setDocuments] = useState<MibDocument[]>([]);
  const [nodeMap, setNodeMap] = useState<Map<string, OidNode>>(new Map());
  const [rootNodes, setRootNodes] = useState<OidNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<OidNode | null>(null);

  // 검색 상태
  const [searchFilter, setSearchFilter] = useState<OidSearchFilter>({ query: '' });
  const [searchResults, setSearchResults] = useState<OidSearchResult[]>([]);

  // 모달 상태
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // 초기 로딩: 기본으로 표준 RFC1213-MIB 로드하여 즉각적인 사용 경험 제공
  useEffect(() => {
    const defaultSample = SAMPLE_MIBS[0]; // RFC1213-MIB
    loadSampleMib(defaultSample);
  }, []);

  // 노드 맵이 갱신될 때마다 인메모리 역색인 엔진 갱신
  useEffect(() => {
    searchEngine.indexNodes(nodeMap);
    if (searchFilter.query || searchFilter.module || searchFilter.nodeType) {
      setSearchResults(searchEngine.search(searchFilter));
    }
  }, [nodeMap, searchEngine, searchFilter]);

  // 검색 필터 즉시 반영 핸들러
  const handleSearchFilterChange = (newFilter: OidSearchFilter) => {
    setSearchFilter(newFilter);
    setSearchResults(searchEngine.search(newFilter));
  };

  // MIB 파일 업로드 핸들러
  const handleUploadFiles = (files: { name: string; content: string }[]) => {
    const newDocs: MibDocument[] = [];
    const newMaps: Map<string, OidNode>[] = [];

    files.forEach((f) => {
      const parsed = parserService.parseMib(f.content, f.name);
      newDocs.push(parsed.document);
      newMaps.push(parsed.nodes);
    });

    const currentDocMap = documents.map((d) => {
      return parserService.parseMib(d.rawContent, d.fileName).nodes;
    });

    const merged = parserService.mergeNodes([...currentDocMap, ...newMaps]);

    setDocuments((prev) => [...prev, ...newDocs]);
    setNodeMap(merged.mergedMap);
    setRootNodes(merged.roots);

    if (merged.roots.length > 0 && !selectedNode) {
      setSelectedNode(merged.roots[0]);
    }
  };

  // 샘플 MIB 로드 핸들러
  const loadSampleMib = (sample: SampleMibEntry) => {
    if (documents.some((d) => d.fileName === sample.fileName)) {
      return;
    }

    const parsed = parserService.parseMib(sample.content, sample.fileName);
    const existingNodeMaps = documents.map((d) =>
      parserService.parseMib(d.rawContent, d.fileName).nodes
    );

    const merged = parserService.mergeNodes([...existingNodeMaps, parsed.nodes]);

    setDocuments((prev) => [...prev, parsed.document]);
    setNodeMap(merged.mergedMap);
    setRootNodes(merged.roots);

    if (!selectedNode && merged.roots.length > 0) {
      const findFirstScalar = (nodes: OidNode[]): OidNode | null => {
        for (const n of nodes) {
          if (n.nodeType === 'scalar') return n;
          const found = findFirstScalar(n.children);
          if (found) return found;
        }
        return nodes[0] || null;
      };
      setSelectedNode(findFirstScalar(merged.roots));
    }
  };

  // 개별 문서 삭제 핸들러
  const handleRemoveDocument = (docId: string) => {
    const remainingDocs = documents.filter((d) => d.id !== docId);
    if (remainingDocs.length === 0) {
      setDocuments([]);
      setNodeMap(new Map());
      setRootNodes([]);
      setSelectedNode(null);
      setSearchResults([]);
      return;
    }

    const nodeMaps = remainingDocs.map((d) =>
      parserService.parseMib(d.rawContent, d.fileName).nodes
    );
    const merged = parserService.mergeNodes(nodeMaps);

    setDocuments(remainingDocs);
    setNodeMap(merged.mergedMap);
    setRootNodes(merged.roots);
    if (selectedNode && !merged.mergedMap.has(selectedNode.numericOid)) {
      setSelectedNode(merged.roots[0] || null);
    }
  };

  // 전체 초기화
  const handleResetAll = () => {
    setDocuments([]);
    setNodeMap(new Map());
    setRootNodes([]);
    setSelectedNode(null);
    setSearchFilter({ query: '' });
    setSearchResults([]);
  };

  // 통계 계산
  const stats = useMemo(() => {
    let tables = 0;
    let scalars = 0;
    nodeMap.forEach((n) => {
      if (n.nodeType === 'table' || n.nodeType === 'row') tables++;
      if (n.nodeType === 'scalar') scalars++;
    });

    return {
      mibCount: documents.length,
      totalOidCount: nodeMap.size,
      tableCount: tables,
      scalarCount: scalars,
      indexedCount: nodeMap.size,
    };
  }, [documents, nodeMap]);

  // 검색엔진용 OID 노드 배열
  const allOidNodes = useMemo(() => Array.from(nodeMap.values()), [nodeMap]);

  // 사용 가능한 모듈 목록
  const availableModules = useMemo(() => {
    const set = new Set<string>();
    nodeMap.forEach((n) => set.add(n.moduleName));
    return Array.from(set);
  }, [nodeMap]);

  // JSON 전체 다운로드
  const handleDownloadAllJson = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      modules: documents.map((d) => ({ name: d.moduleName, file: d.fileName })),
      totalOids: allOidNodes.length,
      oids: allOidNodes,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oid-hierarchy-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* 상단 타이틀 & 주요 액션 바 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400">
              SNMP MIB & OID Studio
            </span>
            <span className="text-xs text-[var(--text-muted)] font-medium">
              Standalone Consumer Example App
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-[var(--text-primary)]">
            MIB 파서 & OID 계층 트리 검색엔진
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
            SNMP MIB(SMIv1/SMIv2) 파일을 파싱하여 완전한 OID 계층 트리를 구성하고, 인메모리 고속 전문 검색 및 Elasticsearch/OpenSearch 인덱스에 벌크 색인합니다.
          </p>
        </div>

        {/* 우측 액션 버튼들 */}
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            disabled={allOidNodes.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xs shadow-md active:scale-95 transition disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4" />
            <span>검색엔진에 색인하기</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadAllJson}
            disabled={allOidNodes.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-semibold text-[var(--text-primary)] transition active:scale-95 disabled:opacity-50"
            title="전체 OID JSON 다운로드"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">JSON 저장</span>
          </button>

          <button
            type="button"
            onClick={handleResetAll}
            disabled={documents.length === 0}
            className="p-2.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] hover:text-red-500 hover:border-red-400 text-xs text-[var(--text-secondary)] transition disabled:opacity-50"
            title="전체 초기화"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. 상단 메트릭 요약 바 */}
      <MibStatsSummary {...stats} />

      {/* 2. MIB 업로더 & 샘플 로더 */}
      <div className="p-4 rounded-3xl bg-[var(--bg-secondary)]/40 border border-[var(--border-subtle)]">
        <MibUploader
          documents={documents}
          onUploadFile={handleUploadFiles}
          onLoadSample={loadSampleMib}
          onRemoveDocument={handleRemoveDocument}
        />
      </div>

      {/* 3. 검색 및 필터 패널 */}
      <div className="p-4 rounded-3xl bg-[var(--bg-secondary)]/30 border border-[var(--border-subtle)]">
        <MibSearchPanel
          filter={searchFilter}
          onFilterChange={handleSearchFilterChange}
          results={searchResults}
          selectedOid={selectedNode?.numericOid}
          onSelectResult={(res) => setSelectedNode(res.node)}
          availableModules={availableModules}
        />
      </div>

      {/* 4. 스플릿 뷰: 좌측 OID 트리 / 우측 OID 상세 및 CLI 코드 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 좌측: OID 계층 트리 (5 cols) */}
        <div className="lg:col-span-5 h-[680px]">
          <OidTreeView
            rootNodes={rootNodes}
            selectedOid={selectedNode?.numericOid}
            onSelectNode={setSelectedNode}
            searchQuery={searchFilter.query}
          />
        </div>

        {/* 우측: OID 상세 속성 & SNMP 명령어 패널 (7 cols) */}
        <div className="lg:col-span-7 h-[680px]">
          <OidDetailPanel
            node={selectedNode}
            onSelectOidByPath={(oid) => {
              const found = nodeMap.get(oid);
              if (found) setSelectedNode(found);
            }}
          />
        </div>
      </div>

      {/* Elasticsearch / OpenSearch 색인 연동 모달 */}
      <ElasticsearchModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        nodes={allOidNodes}
        searchEngine={searchEngine}
      />
    </div>
  );
}
