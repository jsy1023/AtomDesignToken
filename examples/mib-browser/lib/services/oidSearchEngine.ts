import { OidNode, OidSearchResult, OidSearchFilter, ElasticsearchOidDocument, SearchEngineConfig } from '@/lib/data/mibModels';

/**
 * 인메모리 역색인 및 검색 엔진 클래스 (SRP & OOP)
 */
export class OidSearchEngine {
  private documents: Map<string, OidNode> = new Map();
  private invertedIndex: Map<string, Set<string>> = new Map(); // token -> Set<oid>
  private isIndexed = false;

  /**
   * OID 노드 컬렉션을 색인합니다.
   */
  public indexNodes(nodes: OidNode[] | Map<string, OidNode>): void {
    this.documents.clear();
    this.invertedIndex.clear();

    const nodeList = nodes instanceof Map ? Array.from(nodes.values()) : nodes;

    nodeList.forEach((node) => {
      this.documents.set(node.numericOid, node);

      // 토큰 추출
      const tokens = this.tokenizeNode(node);
      tokens.forEach((token) => {
        if (!this.invertedIndex.has(token)) {
          this.invertedIndex.set(token, new Set());
        }
        this.invertedIndex.get(token)!.add(node.numericOid);
      });
    });

    this.isIndexed = true;
  }

  /**
   * 텍스트 쿼리 및 필터를 바탕으로 검색 수행
   */
  public search(filter: OidSearchFilter): OidSearchResult[] {
    if (!this.isIndexed || this.documents.size === 0) {
      return [];
    }

    const query = filter.query.trim().toLowerCase();
    const results: OidSearchResult[] = [];

    // 필터링 및 점수 계산
    this.documents.forEach((node) => {
      // 1. 카테고리 필터
      if (filter.module && node.moduleName !== filter.module) return;
      if (filter.nodeType && node.nodeType !== filter.nodeType) return;
      if (filter.access && node.access !== filter.access) return;
      if (filter.onlyWithDescription && !node.description) return;

      // 쿼리가 비어있는 경우 필터만 적용된 목록 반환
      if (!query) {
        results.push({
          node,
          score: 1,
          matchedFields: [],
        });
        return;
      }

      // 2. 가중치 점수 및 매칭 필드 검사
      let score = 0;
      const matchedFields: OidSearchResult['matchedFields'] = [];

      // A. OID 숫자 완전 일치 또는 prefix
      if (node.numericOid === query) {
        score += 120;
        matchedFields.push({ field: 'numericOid', snippet: node.numericOid });
      } else if (node.numericOid.startsWith(query)) {
        score += 80;
        matchedFields.push({ field: 'numericOid', snippet: node.numericOid });
      } else if (node.numericOid.includes(query)) {
        score += 40;
        matchedFields.push({ field: 'numericOid', snippet: node.numericOid });
      }

      // B. 심볼 이름 매칭
      const nameLower = node.name.toLowerCase();
      if (nameLower === query) {
        score += 100;
        matchedFields.push({ field: 'name', snippet: node.name });
      } else if (nameLower.startsWith(query)) {
        score += 70;
        matchedFields.push({ field: 'name', snippet: node.name });
      } else if (nameLower.includes(query)) {
        score += 50;
        matchedFields.push({ field: 'name', snippet: node.name });
      }

      // C. Syntax 타입 매칭
      if (node.syntax && node.syntax.toLowerCase().includes(query)) {
        score += 30;
        matchedFields.push({ field: 'syntax', snippet: node.syntax });
      }

      // D. Description 설명 매칭
      if (node.description) {
        const descLower = node.description.toLowerCase();
        const foundIdx = descLower.indexOf(query);
        if (foundIdx !== -1) {
          score += 25;
          const start = Math.max(0, foundIdx - 30);
          const end = Math.min(node.description.length, foundIdx + query.length + 30);
          const snippet = (start > 0 ? '...' : '') + node.description.slice(start, end) + (end < node.description.length ? '...' : '');
          matchedFields.push({ field: 'description', snippet });
        }
      }

      // E. Module 이름 매칭
      if (node.moduleName.toLowerCase().includes(query)) {
        score += 15;
        matchedFields.push({ field: 'moduleName', snippet: node.moduleName });
      }

      if (score > 0) {
        results.push({
          node,
          score,
          matchedFields,
        });
      }
    });

    // 점수 내림차순 정렬
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * 노드에서 인덱싱용 토큰 추출
   */
  private tokenizeNode(node: OidNode): string[] {
    const tokens = new Set<string>();

    const addWordTokens = (text?: string) => {
      if (!text) return;
      // 특수문자 분리
      const words = text.toLowerCase().split(/[^a-zA-Z0-9_.-]+/);
      words.forEach((w) => {
        if (w.length >= 2) tokens.add(w);
      });
      // CamelCase 분리 (e.g. sysDescr -> sys, descr)
      const camelWords = text.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().split(/\s+/);
      camelWords.forEach((cw) => {
        if (cw.length >= 2) tokens.add(cw);
      });
    };

    tokens.add(node.numericOid);
    addWordTokens(node.name);
    addWordTokens(node.moduleName);
    addWordTokens(node.syntax);
    addWordTokens(node.description);

    return Array.from(tokens);
  }

  /**
   * Elasticsearch / OpenSearch 표준 인덱스 매핑 스키마 JSON 생성
   */
  public generateElasticsearchMapping(indexName: string = 'snmp-mibs'): object {
    return {
      settings: {
        number_of_shards: 1,
        number_of_replicas: 0,
        analysis: {
          analyzer: {
            oid_ngram_analyzer: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['lowercase', 'oid_edge_ngram'],
            },
          },
          filter: {
            oid_edge_ngram: {
              type: 'edge_ngram',
              min_gram: 2,
              max_gram: 15,
            },
          },
        },
      },
      mappings: {
        properties: {
          numeric_oid: {
            type: 'keyword',
            fields: {
              prefix: {
                type: 'text',
                analyzer: 'oid_ngram_analyzer',
                search_analyzer: 'standard',
              },
            },
          },
          name: {
            type: 'text',
            analyzer: 'oid_ngram_analyzer',
            search_analyzer: 'standard',
            fields: {
              keyword: { type: 'keyword' },
            },
          },
          module: { type: 'keyword' },
          node_type: { type: 'keyword' },
          syntax: { type: 'keyword' },
          access: { type: 'keyword' },
          status: { type: 'keyword' },
          description: { type: 'text', analyzer: 'standard' },
          parent_name: { type: 'keyword' },
          parent_oid: { type: 'keyword' },
          depth: { type: 'integer' },
          suggest: { type: 'completion' },
          indexed_at: { type: 'date' },
        },
      },
    };
  }

  /**
   * Elasticsearch / OpenSearch `_bulk` ndjson 포맷 데이터 생성
   */
  public generateBulkNdjson(nodes: OidNode[], indexName: string = 'snmp-mibs'): string {
    const lines: string[] = [];

    nodes.forEach((node) => {
      // 1. 메타데이터 헤더
      const action = {
        index: {
          _index: indexName,
          _id: node.numericOid,
        },
      };
      lines.push(JSON.stringify(action));

      // 2. 도큐먼트 바디
      const doc: ElasticsearchOidDocument = {
        id: node.numericOid,
        numeric_oid: node.numericOid,
        name: node.name,
        module: node.moduleName,
        node_type: node.nodeType,
        syntax: node.syntax,
        access: node.access,
        status: node.status,
        description: node.description,
        parent_name: node.parentName,
        parent_oid: node.parentOid,
        depth: node.depth,
        indices: node.indices,
        suggest: {
          input: [node.name, node.numericOid],
          weight: node.nodeType === 'table' || node.nodeType === 'scalar' ? 10 : 5,
        },
        indexed_at: new Date().toISOString(),
      };
      lines.push(JSON.stringify(doc));
    });

    return lines.join('\n') + '\n';
  }

  /**
   * 실제 검색엔진 엔드포인트로 Bulk 데이터를 전송하는 파이프라인
   */
  public async pushToSearchEngine(
    config: SearchEngineConfig,
    nodes: OidNode[]
  ): Promise<{ success: boolean; totalIndexed: number; message: string; rawResponse?: unknown }> {
    if (!config.endpointUrl) {
      throw new Error('검색엔진 엔드포인트 URL이 지정되지 않았습니다.');
    }

    const ndjson = this.generateBulkNdjson(nodes, config.indexName);
    const targetUrl = `${config.endpointUrl.replace(/\/+$/, '')}/_bulk`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/x-ndjson',
    };

    if (config.apiKey) {
      headers['Authorization'] = `ApiKey ${config.apiKey}`;
    } else if (config.username && config.password) {
      const basicAuth = btoa(`${config.username}:${config.password}`);
      headers['Authorization'] = `Basic ${basicAuth}`;
    }

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers,
        body: ndjson,
      });

      if (!response.ok) {
        const errText = await response.text();
        return {
          success: false,
          totalIndexed: 0,
          message: `HTTP ${response.status}: ${errText.slice(0, 300)}`,
        };
      }

      const resJson = await response.json();
      const itemsCount = resJson.items ? resJson.items.length : nodes.length;
      const hasErrors = resJson.errors === true;

      return {
        success: !hasErrors,
        totalIndexed: itemsCount,
        message: hasErrors 
          ? '일부 문서 색인 중 에러가 발생했습니다. 응답 상세를 확인하세요.' 
          : `성공적으로 ${itemsCount}개의 OID 문서가 '${config.indexName}' 인덱스에 색인되었습니다!`,
        rawResponse: resJson,
      };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        totalIndexed: 0,
        message: `네트워크 또는 CORS 오류: ${errMsg}`,
      };
    }
  }
}
