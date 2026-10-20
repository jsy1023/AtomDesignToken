import { OidNode, OidNodeType, MibDocument } from '@/lib/data/mibModels';
import { STANDARD_ROOT_OIDS } from '@/lib/data/sampleMibs';

interface RawOidDefinition {
  name: string;
  parentName: string | null;
  subId: number;
  nodeType: OidNodeType;
  moduleName: string;
  syntax?: string;
  access?: string;
  status?: string;
  description?: string;
  reference?: string;
  indices?: string[];
}

/**
 * MIB 파싱 및 OID 계층 트리 생성 서비스 (SRP & OOP 준수)
 */
export class MibParserService {
  /**
   * MIB 텍스트 파일 내용을 분석하여 파싱된 문서 및 OID 노드 맵을 반환합니다.
   */
  public parseMib(content: string, fileName: string): {
    document: MibDocument;
    nodes: Map<string, OidNode>;
    rootNodes: OidNode[];
  } {
    const warnings: string[] = [];
    const sanitized = this.removeComments(content);

    // 1. 모듈 이름 파싱
    const moduleName = this.extractModuleName(sanitized) || fileName.replace(/\.[^/.]+$/, '');

    // 2. 정의 블록들 추출
    const rawDefs = this.extractDefinitions(sanitized, moduleName, warnings);

    // 3. OID 수치 경로 해석 (Multi-pass OID Resolution)
    const resolvedNodes = this.resolveNumericOids(rawDefs, moduleName);

    // 4. 계층 트리 생성
    const rootNodes = this.buildHierarchicalTree(resolvedNodes);

    const document: MibDocument = {
      id: `mib-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      fileName,
      moduleName,
      rawSize: content.length,
      uploadedAt: new Date().toISOString(),
      nodeCount: resolvedNodes.size,
      rawContent: content,
      warnings,
    };

    return {
      document,
      nodes: resolvedNodes,
      rootNodes,
    };
  }

  /**
   * 주석 (-- ...) 제거. 단, 따옴표 안의 주석 기호는 보존
   */
  private removeComments(text: string): string {
    const lines = text.split(/\r?\n/);
    const cleanedLines = lines.map((line) => {
      let inQuote = false;
      let commentIdx = -1;
      for (let i = 0; i < line.length - 1; i++) {
        if (line[i] === '"') {
          inQuote = !inQuote;
        } else if (!inQuote && line[i] === '-' && line[i + 1] === '-') {
          commentIdx = i;
          break;
        }
      }
      return commentIdx !== -1 ? line.substring(0, commentIdx) : line;
    });
    return cleanedLines.join('\n');
  }

  /**
   * 모듈명 추출 (e.g. RFC1213-MIB DEFINITIONS ::= BEGIN)
   */
  private extractModuleName(text: string): string | null {
    const match = text.match(/([a-zA-Z0-9_-]+)\s+DEFINITIONS\s*::=\s*BEGIN/i);
    return match ? match[1] : null;
  }

  /**
   * 텍스트로부터 OBJECT-TYPE, OBJECT IDENTIFIER, MODULE-IDENTITY 블록 추출
   */
  private extractDefinitions(
    text: string,
    moduleName: string,
    warnings: string[]
  ): Map<string, RawOidDefinition> {
    const defs = new Map<string, RawOidDefinition>();

    // 1. OBJECT-TYPE 블록 매칭
    // sysDescr OBJECT-TYPE ... ::= { system 1 }
    const objectTypeRegex = /([a-zA-Z0-9_-]+)\s+OBJECT-TYPE\s+([\s\S]*?)::=\s*\{\s*([a-zA-Z0-9_-]+)\s+([0-9]+)\s*\}/g;
    let match: RegExpExecArray | null;

    while ((match = objectTypeRegex.exec(text)) !== null) {
      const name = match[1].trim();
      const body = match[2];
      const parentName = match[3].trim();
      const subId = parseInt(match[4], 10);

      const syntax = this.extractClause(body, /SYNTAX\s+([\s\S]*?)(?=(ACCESS|MAX-ACCESS|STATUS|DESCRIPTION|INDEX|REFERENCE|::=|$))/i);
      const access = this.extractClause(body, /(?:ACCESS|MAX-ACCESS)\s+([a-zA-Z0-9_-]+)/i);
      const status = this.extractClause(body, /STATUS\s+([a-zA-Z0-9_-]+)/i);
      const description = this.extractQuotedClause(body, /DESCRIPTION\s+"([\s\S]*?)"/i);
      const reference = this.extractQuotedClause(body, /REFERENCE\s+"([\s\S]*?)"/i);
      const indexStr = this.extractClause(body, /INDEX\s*\{\s*([\s\S]*?)\s*\}/i);

      let nodeType: OidNodeType = 'scalar';
      if (syntax && /SEQUENCE\s+OF/i.test(syntax)) {
        nodeType = 'table';
      } else if (syntax && /^([A-Z][a-zA-Z0-9_-]*Entry)$/i.test(syntax.trim())) {
        nodeType = 'row';
      }

      const indices = indexStr ? indexStr.split(',').map((s) => s.trim()).filter(Boolean) : undefined;

      defs.set(name, {
        name,
        parentName,
        subId,
        nodeType,
        moduleName,
        syntax: syntax ? syntax.replace(/\s+/g, ' ').trim() : undefined,
        access: access ? access.toLowerCase() : undefined,
        status: status ? status.toLowerCase() : undefined,
        description: description ? description.replace(/\s+/g, ' ').trim() : undefined,
        reference: reference ? reference.replace(/\s+/g, ' ').trim() : undefined,
        indices,
      });
    }

    // 2. OBJECT IDENTIFIER 및 MODULE-IDENTITY 매칭
    // system OBJECT IDENTIFIER ::= { mib-2 1 }
    // host MODULE-IDENTITY ... ::= { mib-2 25 }
    const objIdRegex = /([a-zA-Z0-9_-]+)\s+(?:OBJECT\s+IDENTIFIER|MODULE-IDENTITY)[\s\S]*?::=\s*\{\s*([a-zA-Z0-9_-]+)\s+([0-9]+)\s*\}/g;
    while ((match = objIdRegex.exec(text)) !== null) {
      const name = match[1].trim();
      const parentName = match[2].trim();
      const subId = parseInt(match[3], 10);

      if (!defs.has(name)) {
        defs.set(name, {
          name,
          parentName,
          subId,
          nodeType: 'group',
          moduleName,
        });
      }
    }

    // 3. NOTIFICATION-TYPE / TRAP-TYPE 매칭
    const notifRegex = /([a-zA-Z0-9_-]+)\s+(?:NOTIFICATION-TYPE|TRAP-TYPE)[\s\S]*?::=\s*\{\s*([a-zA-Z0-9_-]+)\s+([0-9]+)\s*\}/g;
    while ((match = notifRegex.exec(text)) !== null) {
      const name = match[1].trim();
      const parentName = match[2].trim();
      const subId = parseInt(match[3], 10);

      if (!defs.has(name)) {
        defs.set(name, {
          name,
          parentName,
          subId,
          nodeType: 'notification',
          moduleName,
        });
      }
    }

    return defs;
  }

  private extractClause(text: string, regex: RegExp): string | undefined {
    const m = text.match(regex);
    return m ? m[1].trim() : undefined;
  }

  private extractQuotedClause(text: string, regex: RegExp): string | undefined {
    const m = text.match(regex);
    return m ? m[1].trim() : undefined;
  }

  /**
   * 부모 OID를 찾아 전체 숫자 OID(e.g. 1.3.6.1.2.1.1.1)를 해석합니다.
   */
  private resolveNumericOids(
    defs: Map<string, RawOidDefinition>,
    moduleName: string
  ): Map<string, OidNode> {
    const resolved = new Map<string, OidNode>();
    const knownOidMap = new Map<string, string>(); // name -> numericOid

    // 표준 루트 OID 미리 등록
    Object.entries(STANDARD_ROOT_OIDS).forEach(([name, oid]) => {
      knownOidMap.set(name, oid);
    });

    // 다중 패스 해석 (최대 10회 순환하여 의존성 해결)
    let progressed = true;
    let passes = 0;
    const remaining = new Map(defs);

    while (progressed && remaining.size > 0 && passes < 15) {
      progressed = false;
      passes++;

      for (const [name, def] of Array.from(remaining.entries())) {
        const parentName = def.parentName;
        let parentNumericOid: string | null = null;

        if (parentName && knownOidMap.has(parentName)) {
          parentNumericOid = knownOidMap.get(parentName)!;
        } else if (parentName && /^[0-9]+(\.[0-9]+)*$/.test(parentName)) {
          parentNumericOid = parentName;
        }

        if (parentNumericOid) {
          const numericOid = `${parentNumericOid}.${def.subId}`;
          knownOidMap.set(name, numericOid);

          const oidNode: OidNode = {
            id: numericOid,
            name: def.name,
            numericOid,
            subId: def.subId,
            parentName: def.parentName,
            parentOid: parentNumericOid,
            moduleName: def.moduleName,
            nodeType: def.nodeType,
            syntax: def.syntax,
            access: def.access,
            status: def.status,
            description: def.description,
            reference: def.reference,
            indices: def.indices,
            children: [],
            depth: numericOid.split('.').length,
          };

          resolved.set(numericOid, oidNode);
          remaining.delete(name);
          progressed = true;
        }
      }
    }

    // 아직 미해결된 노드(부모가 외부 MIB에 선언되어 있거나 누락된 경우) 임시 네임스페이스에 연결
    for (const [name, def] of remaining.entries()) {
      const fallbackParent = def.parentName || 'unknown';
      const fallbackOid = `0.0.unknown.${name}`;
      
      const oidNode: OidNode = {
        id: fallbackOid,
        name: def.name,
        numericOid: fallbackOid,
        subId: def.subId,
        parentName: def.parentName,
        parentOid: null,
        moduleName: def.moduleName,
        nodeType: def.nodeType,
        syntax: def.syntax,
        access: def.access,
        status: def.status,
        description: def.description,
        reference: def.reference,
        indices: def.indices,
        children: [],
        depth: 99,
      };

      resolved.set(fallbackOid, oidNode);
    }

    return resolved;
  }

  /**
   * 평면 OID 맵으로부터 부모-자식 트리 구조를 완성하고 루트 노드 배열을 반환합니다.
   */
  private buildHierarchicalTree(nodes: Map<string, OidNode>): OidNode[] {
    const treeNodeMap = new Map<string, OidNode>();

    // 딥카피 트리 노드 맵 생성
    nodes.forEach((node, key) => {
      treeNodeMap.set(key, { ...node, children: [] });
    });

    const rootNodes: OidNode[] = [];

    treeNodeMap.forEach((node) => {
      if (node.parentOid && treeNodeMap.has(node.parentOid)) {
        const parent = treeNodeMap.get(node.parentOid)!;
        parent.children.push(node);
      } else {
        // 부모가 없거나 최상위인 경우 루트 목록에 추가
        rootNodes.push(node);
      }
    });

    // 각 브랜치의 자식 노드들을 subId 순으로 정렬
    const sortChildren = (n: OidNode) => {
      n.children.sort((a, b) => a.subId - b.subId);
      n.children.forEach(sortChildren);
    };

    rootNodes.sort((a, b) => a.subId - b.subId);
    rootNodes.forEach(sortChildren);

    return rootNodes;
  }

  /**
   * 여러 개의 MIB 파일 파싱 결과를 단일 트리/인덱스 맵으로 병합합니다.
   */
  public mergeNodes(allNodes: Map<string, OidNode>[]): {
    mergedMap: Map<string, OidNode>;
    roots: OidNode[];
  } {
    const mergedMap = new Map<string, OidNode>();

    allNodes.forEach((nodeMap) => {
      nodeMap.forEach((node, oid) => {
        if (!mergedMap.has(oid)) {
          mergedMap.set(oid, { ...node, children: [] });
        } else {
          // 중복 OID 발견 시 설명이나 구문이 더 풍부한 쪽으로 머지
          const existing = mergedMap.get(oid)!;
          if (!existing.description && node.description) existing.description = node.description;
          if (!existing.syntax && node.syntax) existing.syntax = node.syntax;
        }
      });
    });

    const roots = this.buildHierarchicalTree(mergedMap);
    return { mergedMap, roots };
  }
}
