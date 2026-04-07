

export interface PropInfo {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
  required: boolean;
}

/**
 * 소스 코드에서 export된 모든 컴포넌트의 이름을 찾아냅니다.
 */
export function findExportedComponents(source: string): string[] {
  const components: string[] = [];

  // 1. "export { A, B, C }" 형식 찾기
  const exportBlockMatch = source.match(/export\s*{([^}]*)}/);
  if (exportBlockMatch) {
    const list = exportBlockMatch[1].split(',').map(s => s.trim());
    components.push(...list.filter(s => s && /^[A-Z]/.test(s))); // 대문자로 시작하는 것만 컴포넌트로 간주
  }

  // 2. "export const MyComp = ..." 또는 "export function MyComp" 형식 찾기
  const namedExportMatch = source.matchAll(/export\s+(?:const|function)\s+([A-Z]\w+)/g);
  for (const match of namedExportMatch) {
    if (!components.includes(match[1])) {
      components.push(match[1]);
    }
  }

  return components;
}

/**
 * 기본적으로 간단한 정규식을 사용하여 TypeScript 인터페이스/타입에서 속성을 파싱합니다.
 */
export async function parsePropsFromSource(source: string, componentName: string): Promise<PropInfo[]> {
  // 1. 해당 컴포넌트가 사용하는 인터페이스/타입 이름 및 구조 분해 기본값 찾기
  // 패턴: const Component = ({ ...[default] ... }: InterfaceName) =>
  const componentPattern = new RegExp(`(?:const|function)\\s+${componentName}\\s*(?:=\\s*)?\\(\\s*{([^}]*)}\\s*:\\s*(\\w+)`, 'm');
  const match = source.match(componentPattern);
  
  const interfaceName = match ? match[2] : componentName;
  const destructuringContent = match ? match[1] : '';

  // 기본값 맵 생성
  const defaultValues: Record<string, string> = {};
  if (destructuringContent) {
    const parts = destructuringContent.split(',');
    for (const part of parts) {
      const kv = part.trim().split('=');
      if (kv.length === 2) {
        defaultValues[kv[0].trim()] = kv[1].trim().replace(/['"]/g, ''); // 따옴표 제거
      }
    }
  }

  // 2. 인터페이스 또는 타입 정의 찾기
  // 패턴: interface InterfaceName [extends Base] { ... }
  // 또는: type InterfaceName = { ... }
  const interfacePattern = new RegExp(`(?:interface|type)\\s+${interfaceName}(?:\\s+extends\\s+([\\w\\s,]+))?\\s*=?\\s*{([^}]*)}`, 'm');
  const interfaceMatch = source.match(interfacePattern);

  if (!interfaceMatch) return [];

  const extendsClause = interfaceMatch[1];
  const body = interfaceMatch[2];

  // 3. 만약 extends가 있다면 부모 인터페이스도 재귀적으로 파싱 (현재는 같은 파일 내에서만)
  const props: PropInfo[] = [];
  if (extendsClause) {
    const parentNames = extendsClause.split(',').map(s => s.trim());
    for (const parentName of parentNames) {
      props.push(...(await parseInterfaceDirectly(source, parentName)));
    }
  }

  // 4. 바디 부분 파싱
  const propLines = body.split('\n');
  let currentDescription = '';

  for (let i = 0; i < propLines.length; i++) {
    const line = propLines[i].trim();
    
    // JSDoc 또는 주석 처리
    if (line.startsWith('/**') || line.startsWith('*') || line.startsWith('//')) {
      const content = line.replace(/[\/\*]/g, '').trim();
      if (content) currentDescription += content + ' ';
      continue;
    }

    // 속성 매칭 (name[?]: type)
    const propMatch = line.match(/^(\w+)(\?)?\s*:\s*([^;]+);?/);
    if (propMatch) {
      const pName = propMatch[1];
      props.push({
        name: pName,
        required: !propMatch[2],
        type: propMatch[3].trim(),
        defaultValue: defaultValues[pName] || '—',
        description: currentDescription.trim() || '—'
      });
      currentDescription = '';
    }
  }

  return props;
}

async function parseInterfaceDirectly(source: string, interfaceName: string): Promise<PropInfo[]> {
  const interfacePattern = new RegExp(`(?:interface|type)\\s+${interfaceName}(?:\\s+extends\\s+([\\w\\s,]+))?\\s*=?\\s*{([^}]*)}`, 'm');
  const match = source.match(interfacePattern);
  if (!match) return [];
  
  const extendsClause = match[1];
  const body = match[2];
  const props: PropInfo[] = [];

  if (extendsClause) {
    const parentNames = extendsClause.split(',').map(s => s.trim());
    for (const parentName of parentNames) {
      props.push(...(await parseInterfaceDirectly(source, parentName)));
    }
  }

  const propLines = body.split('\n');
  let currentDescription = '';
  for (const line of propLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('/**') || trimmed.startsWith('*') || trimmed.startsWith('//')) {
      currentDescription += trimmed.replace(/[\/\*]/g, '').trim() + ' ';
      continue;
    }
    const propMatch = trimmed.match(/^(\w+)(\?)?\s*:\s*([^;]+);?/);
    if (propMatch) {
      props.push({
        name: propMatch[1],
        required: !propMatch[2],
        type: propMatch[3].trim(),
        defaultValue: '—',
        description: currentDescription.trim() || '—'
      });
      currentDescription = '';
    }
  }
  return props;
}
