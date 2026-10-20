'use client';

import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Terminal,
  Code,
  Search,
  ExternalLink,
  Shield,
  Activity,
  Layers,
  Info,
} from 'lucide-react';
import { OidNode } from '@/lib/data/mibModels';

interface OidDetailPanelProps {
  node: OidNode | null;
  onSelectOidByPath?: (oid: string) => void;
}

export function OidDetailPanel({ node, onSelectOidByPath }: OidDetailPanelProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'commands' | 'json'>('info');

  if (!node) {
    return (
      <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] text-center text-[var(--text-muted)]">
        <Info className="w-10 h-10 mb-3 opacity-30" />
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">선택된 OID 노드가 없습니다</h3>
        <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm">
          좌측 OID 계층 트리나 검색 결과에서 원하는 노드를 클릭하면 상세 속성 및 SNMP 명령어가 표시됩니다.
        </p>
      </div>
    );
  }

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // SNMP CLI 명령어 생성
  const snmpGetCmd = `snmpget -v 2c -c public <target_host> ${node.numericOid}.0`;
  const snmpWalkCmd = `snmpwalk -v 2c -c public <target_host> ${node.numericOid}`;

  // Python pysnmp 코드 스니펫
  const pythonSnippet = `from pysnmp.hlapi import *

iterator = getCmd(
    SnmpEngine(),
    CommunityData('public', mpModel=1),
    UdpTransportTarget(('192.168.1.1', 161)),
    ContextData(),
    ObjectType(ObjectIdentity('${node.numericOid}.0'))
)
errorIndication, errorStatus, errorIndex, varBinds = next(iterator)
for varBind in varBinds:
    print(' = '.join([x.prettyPrint() for x in varBind]))`;

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-xs">
      {/* 1. 상단 헤더: OID 이름 & 빠른 복사 */}
      <div className="p-4 sm:p-5 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono font-extrabold text-[var(--text-primary)]">
                {node.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {node.nodeType.toUpperCase()}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[var(--text-secondary)] font-mono">
                {node.moduleName}
              </span>
            </div>

            {/* Numeric OID */}
            <div className="flex items-center gap-2 mt-1.5 font-mono text-xs text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--accent-primary)]">{node.numericOid}</span>
              <button
                type="button"
                onClick={() => copyText(node.numericOid, 'oid')}
                className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                title="OID 복사"
              >
                {copiedKey === 'oid' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* 탭 전환 버튼 */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'info'
                  ? 'bg-white dark:bg-neutral-900 text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              상세 속성
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('commands')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'commands'
                  ? 'bg-white dark:bg-neutral-900 text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              SNMP 코드/CLI
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'json'
                  ? 'bg-white dark:bg-neutral-900 text-[var(--text-primary)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              JSON 스펙
            </button>
          </div>
        </div>
      </div>

      {/* 2. 본문 탭 영역 */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto custom-scrollbar space-y-4">
        {activeTab === 'info' && (
          <div className="space-y-4 text-xs">
            {/* 기본 스펙 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[11px] font-medium text-[var(--text-muted)] block">SYNTAX (타입)</span>
                <span className="font-mono font-semibold text-[var(--text-primary)] block mt-0.5">
                  {node.syntax || 'N/A (Group/Container)'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[11px] font-medium text-[var(--text-muted)] block">MAX-ACCESS (접근권한)</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400 block mt-0.5">
                  {node.access || 'not-accessible'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[11px] font-medium text-[var(--text-muted)] block">STATUS (상태)</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  {node.status || 'current'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[11px] font-medium text-[var(--text-muted)] block">PARENT (부모 OID)</span>
                <button
                  type="button"
                  onClick={() => node.parentOid && onSelectOidByPath?.(node.parentOid)}
                  className="font-mono font-semibold text-[var(--accent-primary)] hover:underline block mt-0.5 truncate text-left"
                  title={node.parentOid || ''}
                >
                  {node.parentName ? `${node.parentName} (${node.parentOid})` : 'Root'}
                </button>
              </div>
            </div>

            {/* 테이블 인덱스 필드 (해당되는 경우) */}
            {node.indices && node.indices.length > 0 && (
              <div className="p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/20">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block mb-1">
                  TABLE INDEX (테이블 키 인덱스)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {node.indices.map((idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-purple-500/10 text-purple-700 dark:text-purple-300"
                    >
                      {idx}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <span className="text-[11px] font-bold text-[var(--text-primary)] block mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                DESCRIPTION (객체 설명)
              </span>
              <p className="text-[12px] leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap font-sans">
                {node.description || '이 노드에 대한 상세 설명이 MIB 파일에 정의되어 있지 않습니다.'}
              </p>
            </div>

            {/* REFERENCE (참조 문서) */}
            {node.reference && (
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                  REFERENCE
                </span>
                <p className="text-[11px] text-[var(--text-secondary)]">{node.reference}</p>
              </div>
            )}
          </div>
        )}

        {/* 2. CLI / 코드 스니펫 탭 */}
        {activeTab === 'commands' && (
          <div className="space-y-4 text-xs">
            {/* SNMPGET */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-amber-500" />
                  Net-SNMP CLI (snmpget)
                </span>
                <button
                  type="button"
                  onClick={() => copyText(snmpGetCmd, 'snmpget')}
                  className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline"
                >
                  {copiedKey === 'snmpget' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  복사
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto">
                {snmpGetCmd}
              </pre>
            </div>

            {/* SNMPWALK */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  Net-SNMP Subtree Walk (snmpwalk)
                </span>
                <button
                  type="button"
                  onClick={() => copyText(snmpWalkCmd, 'snmpwalk')}
                  className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline"
                >
                  {copiedKey === 'snmpwalk' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  복사
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto">
                {snmpWalkCmd}
              </pre>
            </div>

            {/* Python pysnmp Code */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
                  <Code className="w-3.5 h-3.5 text-blue-500" />
                  Python 3 (pysnmp API)
                </span>
                <button
                  type="button"
                  onClick={() => copyText(pythonSnippet, 'python')}
                  className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline"
                >
                  {copiedKey === 'python' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  복사
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto">
                {pythonSnippet}
              </pre>
            </div>
          </div>
        )}

        {/* 3. JSON 원본 탭 */}
        {activeTab === 'json' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                OID Node JSON Data
              </span>
              <button
                type="button"
                onClick={() => copyText(JSON.stringify(node, null, 2), 'json_spec')}
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-semibold"
              >
                {copiedKey === 'json_spec' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                JSON 복사
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-neutral-900 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[350px]">
              {JSON.stringify(node, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
