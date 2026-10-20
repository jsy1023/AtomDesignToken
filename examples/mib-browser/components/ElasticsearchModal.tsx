'use client';

import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  Check,
  Copy,
  Download,
  Terminal,
  Settings2,
  Server,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { OidNode, SearchEngineConfig } from '@/lib/data/mibModels';
import { OidSearchEngine } from '@/lib/services/oidSearchEngine';

interface ElasticsearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: OidNode[];
  searchEngine: OidSearchEngine;
}

export function ElasticsearchModal({
  isOpen,
  onClose,
  nodes,
  searchEngine,
}: ElasticsearchModalProps) {
  const [engineType, setEngineType] = useState<'elasticsearch' | 'opensearch'>('elasticsearch');
  const [endpointUrl, setEndpointUrl] = useState('http://localhost:9200');
  const [indexName, setIndexName] = useState('snmp-mibs');
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'push' | 'ndjson' | 'mapping'>('push');

  const [isPushing, setIsPushing] = useState(false);
  const [pushResult, setPushResult] = useState<{
    success: boolean;
    totalIndexed: number;
    message: string;
    rawResponse?: unknown;
  } | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleDownloadNdjson = () => {
    const ndjson = searchEngine.generateBulkNdjson(nodes, indexName);
    const blob = new Blob([ndjson], { type: 'application/x-ndjson;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${indexName}-bulk-${Date.now()}.ndjson`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePush = async () => {
    setIsPushing(true);
    setPushResult(null);

    const config: SearchEngineConfig = {
      engineType,
      endpointUrl,
      indexName,
      apiKey: apiKey.trim() || undefined,
    };

    try {
      const result = await searchEngine.pushToSearchEngine(config, nodes);
      setPushResult(result);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setPushResult({
        success: false,
        totalIndexed: 0,
        message: errMsg || '색인 요청 실패',
      });
    } finally {
      setIsPushing(false);
    }
  };

  const mappingSchema = searchEngine.generateElasticsearchMapping(indexName);
  const ndjsonSample = searchEngine.generateBulkNdjson(nodes.slice(0, 10), indexName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[var(--bg-primary)] border border-[var(--border-strong)] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* 상단 헤더 */}
        <div className="px-6 py-4 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[var(--text-primary)]">
                검색엔진(Elasticsearch / OpenSearch) 색인 파이프라인
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                파싱된 {nodes.length}개의 OID 노드를 검색엔진 인덱스에 벌크 전송하거나 스키마를 내보냅니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 text-[var(--text-secondary)] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="px-6 pt-3 flex border-b border-[var(--border-subtle)] gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('push')}
            className={`pb-2.5 transition-all border-b-2 ${
              activeTab === 'push'
                ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            REST API 색인 전송
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ndjson')}
            className={`pb-2.5 transition-all border-b-2 ${
              activeTab === 'ndjson'
                ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Bulk NDJSON 데이터 ({nodes.length}건)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mapping')}
            className={`pb-2.5 transition-all border-b-2 ${
              activeTab === 'mapping'
                ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            인덱스 매핑 스키마
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-4">
          {activeTab === 'push' && (
            <div className="space-y-4 text-xs">
              {/* 설정 폼 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                    검색엔진 종류
                  </label>
                  <select
                    value={engineType}
                    onChange={(e) => setEngineType(e.target.value as 'elasticsearch' | 'opensearch')}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                  >
                    <option value="elasticsearch">Elasticsearch</option>
                    <option value="opensearch">OpenSearch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                    인덱스 이름 (Index Name)
                  </label>
                  <input
                    type="text"
                    value={indexName}
                    onChange={(e) => setIndexName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                    엔드포인트 URL (e.g. http://localhost:9200 또는 클라우드 URL)
                  </label>
                  <input
                    type="text"
                    value={endpointUrl}
                    onChange={(e) => setEndpointUrl(e.target.value)}
                    placeholder="http://localhost:9200"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                    API Key (선택 사항)
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Elasticsearch / OpenSearch API Key"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] font-mono"
                  />
                </div>
              </div>

              {/* cURL 예시 */}
              <div className="p-3 rounded-xl bg-neutral-900 text-neutral-200">
                <span className="text-[10px] text-neutral-400 font-semibold block mb-1">
                  터미널 cURL 명령으로 직접 색인할 수도 있습니다:
                </span>
                <pre className="font-mono text-[11px] overflow-x-auto">
                  curl -X POST &quot;{endpointUrl}/_bulk&quot; -H &quot;Content-Type: application/x-ndjson&quot; --data-binary @mibs.ndjson
                </pre>
              </div>

              {/* 실행 결과 알림 */}
              {pushResult && (
                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    pushResult.success
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  {pushResult.success ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <div className="text-xs">
                    <div className="font-bold">
                      {pushResult.success ? '색인 성공' : '색인 실패 또는 오류'}
                    </div>
                    <div className="mt-0.5">{pushResult.message}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ndjson' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">
                  Elasticsearch Bulk API 규격 ndjson 미리보기 (처음 10건 표시)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        searchEngine.generateBulkNdjson(nodes, indexName),
                        'all_ndjson'
                      )
                    }
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-strong)] hover:text-blue-600 transition"
                  >
                    {copiedKey === 'all_ndjson' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    전체 복사
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadNdjson}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    .ndjson 파일 다운로드
                  </button>
                </div>
              </div>
              <pre className="p-3.5 rounded-2xl bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto max-h-[360px]">
                {ndjsonSample}
              </pre>
            </div>
          )}

          {activeTab === 'mapping' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">
                  인덱스 매핑 정의서 (PUT /{indexName})
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(JSON.stringify(mappingSchema, null, 2), 'mapping')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-strong)] hover:text-blue-600 transition"
                >
                  {copiedKey === 'mapping' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  매핑 JSON 복사
                </button>
              </div>
              <pre className="p-3.5 rounded-2xl bg-neutral-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-[360px]">
                {JSON.stringify(mappingSchema, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* 하단 푸터 액션 */}
        <div className="px-6 py-4 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-neutral-200 dark:bg-neutral-800 text-[var(--text-primary)] hover:bg-neutral-300 transition"
          >
            닫기
          </button>

          {activeTab === 'push' && (
            <button
              type="button"
              onClick={handlePush}
              disabled={isPushing || nodes.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-md active:scale-95 transition disabled:opacity-50"
            >
              {isPushing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>검색엔진 색인 전송 중...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>검색엔진에 {nodes.length}개 OID 색인 시작</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
