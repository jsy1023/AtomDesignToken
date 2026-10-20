export type OidNodeType = 
  | 'root' 
  | 'module' 
  | 'table' 
  | 'row' 
  | 'scalar' 
  | 'notification' 
  | 'group' 
  | 'unknown';

export type OidAccess = 
  | 'read-only' 
  | 'read-write' 
  | 'read-create' 
  | 'write-only' 
  | 'not-accessible' 
  | 'accessible-for-notify' 
  | string;

export type OidStatus = 
  | 'current' 
  | 'deprecated' 
  | 'obsolete' 
  | 'mandatory' 
  | 'optional' 
  | string;

/**
 * 단일 OID 노드 엔티티 모델 (SSOT)
 */
export interface OidNode {
  id: string;                      // 고유 ID (보통 numericOid or name)
  name: string;                    // OID 심볼명 (e.g. sysDescr, ifInOctets)
  numericOid: string;              // 전체 숫자 OID (e.g. 1.3.6.1.2.1.1.1)
  subId: number;                   // 부모로부터의 서브 번호 (e.g. 1)
  parentName: string | null;       // 부모 노드 심볼명 (e.g. system)
  parentOid: string | null;        // 부모 노드 숫자 OID (e.g. 1.3.6.1.2.1.1)
  moduleName: string;              // 정의된 MIB 모듈명 (e.g. RFC1213-MIB)
  nodeType: OidNodeType;           // 노드 형태 (table, row, scalar, notification 등)
  syntax?: string;                 // SNMP 데이터 타입 (e.g. DisplayString, Counter32)
  access?: OidAccess;              // 접근 권한 (e.g. read-only, read-write)
  status?: OidStatus;              // 상태 (current, deprecated 등)
  description?: string;            // 상세 설명
  reference?: string;              // 참조 문서
  indices?: string[];              // 테이블 엔트리 인덱스 필드 목록
  children: OidNode[];             // 계층 자식 노드 배열
  depth: number;                   // 루트로부터의 깊이
}

/**
 * 파싱된 MIB 파일 문서 메타데이터
 */
export interface MibDocument {
  id: string;
  fileName: string;
  moduleName: string;
  rawSize: number;
  uploadedAt: string;
  nodeCount: number;
  rawContent: string;
  warnings: string[];
}

/**
 * 검색 결과 아이템 모델
 */
export interface OidSearchResult {
  node: OidNode;
  score: number;
  matchedFields: {
    field: 'name' | 'numericOid' | 'syntax' | 'description' | 'moduleName';
    snippet: string;
  }[];
}

/**
 * 검색 필터 옵션
 */
export interface OidSearchFilter {
  query: string;
  module?: string;
  nodeType?: OidNodeType;
  access?: string;
  onlyWithDescription?: boolean;
}

/**
 * Elasticsearch / OpenSearch 색인용 도큐먼트 구조
 */
export interface ElasticsearchOidDocument {
  id: string;
  numeric_oid: string;
  name: string;
  module: string;
  node_type: OidNodeType;
  syntax?: string;
  access?: string;
  status?: string;
  description?: string;
  parent_name?: string | null;
  parent_oid?: string | null;
  depth: number;
  indices?: string[];
  suggest: {
    input: string[];
    weight: number;
  };
  indexed_at: string;
}

/**
 * 검색엔진 벌크 전송 설정
 */
export interface SearchEngineConfig {
  engineType: 'elasticsearch' | 'opensearch';
  endpointUrl: string;
  indexName: string;
  apiKey?: string;
  username?: string;
  password?: string;
}
