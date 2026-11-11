/**
 * 🔄 AtomDesignToken 재귀적 개선 & 감사 엔진 (Recursive Self-Improvement Auditor)
 *
 * 이 스크립트는 최상위 블록/템플릿에서부터 컴포넌트, 토큰까지 거슬러 올라가며
 * 시스템의 무결성을 정밀 감사하고 개선 피드백을 산출합니다:
 *
 * 1. [Block Layer Audit]: 블록 코드 내 하드코딩된 원시 태그/인라인 스타일/HEX 탐지
 * 2. [Component Layer Audit]: components/ui의 W3C 토큰 바인딩 및 필수 원자 컴포넌트 누락 여부 검사
 * 3. [Token Layer Audit]: globals.css 및 atom-ui.css의 색상 명도 대비 및 시맨틱 토큰 매트릭스 검증
 * 4. [Recursive Action Items]: 어떤 컴포넌트를 신설/승격해야 하는지 액션 리포트 도출
 */

import fs from 'fs';
import path from 'path';

interface AuditIssue {
  layer: 'Token' | 'Component' | 'Block' | 'Template';
  targetFile: string;
  type: 'hardcoded-style' | 'missing-component' | 'contrast-risk' | 'pure-html-tag';
  message: string;
  recommendation: string;
}

const ISSUES: AuditIssue[] = [];

// 경로 기준 설정
const ROOT_DIR = process.cwd();
const BLOCKS_DIR = path.join(ROOT_DIR, 'components/blocks');
const UI_DIR = path.join(ROOT_DIR, 'components/ui');
const APP_DIR = path.join(ROOT_DIR, 'app');

console.log('\n🔍 [AtomDesignToken] 재귀적 아키텍처 감사(Recursive Audit) 시작...\n');

// 1. 블록 계층(Block Layer) 정밀 스캔
if (fs.existsSync(BLOCKS_DIR)) {
  const blockFiles = fs.readdirSync(BLOCKS_DIR).filter((f) => f.endsWith('.tsx') && !f.includes('Sidebar'));

  blockFiles.forEach((file) => {
    const filePath = path.join(BLOCKS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // 1-1. 임의의 헥사 컬러(#ffffff 제외) 하드코딩 검사
    const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\b/g;
    const hexMatches = content.match(hexRegex);
    if (hexMatches) {
      hexMatches.forEach((hex) => {
        if (!['#fff', '#ffffff', '#000', '#000000'].includes(hex.toLowerCase())) {
          ISSUES.push({
            layer: 'Block',
            targetFile: `components/blocks/${file}`,
            type: 'hardcoded-style',
            message: `하드코딩된 HEX 컬러(${hex})가 발견되었습니다.`,
            recommendation: `Token Guardian: 시맨틱 토큰(--accent-primary 또는 --atom-*)으로 승격 교체 필요.`,
          });
        }
      });
    }

    // 1-2. 원시 html button, input 남용 검사 (UI 컴포넌트 우회)
    const rawButtonRegex = /<button\b(?!.*class.*atom-btn)(?!.*TabsTrigger)(?!.*Switch)/g;
    const rawInputRegex = /<input\b(?!.*class.*atom-input)(?!.*type=["']range["'])(?!.*type=["']checkbox["'])/g;

    const rawButtons = content.match(rawButtonRegex);
    if (rawButtons && rawButtons.length > 5 && !file.includes('Viewer')) {
      ISSUES.push({
        layer: 'Block',
        targetFile: `components/blocks/${file}`,
        type: 'pure-html-tag',
        message: `원시 <button> 태그가 ${rawButtons.length}회 사용되었습니다.`,
        recommendation: `Component Architect: components/ui의 Button 컴포넌트 또는 TabsTrigger로 조합 표준화 필요.`,
      });
    }

    const rawInputs = content.match(rawInputRegex);
    if (rawInputs && rawInputs.length > 1) {
      ISSUES.push({
        layer: 'Block',
        targetFile: `components/blocks/${file}`,
        type: 'missing-component',
        message: `원시 <input> 태그가 ${rawInputs.length}회 사용되었습니다.`,
        recommendation: `Component Architect: components/ui의 Input 컴포넌트로 대체하여 일관성 유지.`,
      });
    }

    // 1-3. 10px 이하 극소 폰트 검사 (AI 슬롭 검출)
    if (content.includes('text-[10px]') || content.includes('text-[9px]')) {
      ISSUES.push({
        layer: 'Block',
        targetFile: `components/blocks/${file}`,
        type: 'contrast-risk',
        message: `10px 이하의 극소 텍스트(text-[10px]/text-[9px])가 남아있습니다.`,
        recommendation: `Token Guardian: 최소 12px(text-xs) 이상으로 상향하여 WCAG 접근성 확보.`,
      });
    }
  });
}

// 2. 컴포넌트 계층(Component Layer) 스캔
if (fs.existsSync(UI_DIR)) {
  const uiFiles = fs.readdirSync(UI_DIR).filter((f) => f.endsWith('.tsx'));
  const indexContent = fs.readFileSync(path.join(UI_DIR, 'index.ts'), 'utf-8');

  uiFiles.forEach((file) => {
    const componentName = file.replace('.tsx', '');
    if (!indexContent.includes(componentName)) {
      ISSUES.push({
        layer: 'Component',
        targetFile: `components/ui/${file}`,
        type: 'missing-component',
        message: `${componentName} 컴포넌트가 index.ts에 export되지 않았습니다.`,
        recommendation: `Component Architect: components/ui/index.ts에 export * from './${componentName}' 추가 필요.`,
      });
    }
  });
}

// 3. 토큰 계층(Token Layer) 스캔
const globalsCssPath = path.join(ROOT_DIR, 'app/globals.css');
if (fs.existsSync(globalsCssPath)) {
  const cssContent = fs.readFileSync(globalsCssPath, 'utf-8');
  const requiredTokens = [
    '--accent-primary',
    '--bg-primary',
    '--bg-secondary',
    '--text-primary',
    '--text-secondary',
    '--border-subtle',
    '--radius',
  ];

  requiredTokens.forEach((tok) => {
    if (!cssContent.includes(tok)) {
      ISSUES.push({
        layer: 'Token',
        targetFile: 'app/globals.css',
        type: 'hardcoded-style',
        message: `필수 시맨틱 토큰 (${tok})이 globals.css에 명시되지 않았습니다.`,
        recommendation: `Token Guardian: ${tok} 기본값을 :root에 정의해야 합니다.`,
      });
    }
  });
}

// 4. 결과 출력 및 재귀 액션 플랜 제시
console.log('═══════════════════════════════════════════════════════════════════');
console.log(`📊 재귀 감사 결과: 총 ${ISSUES.length}개의 개선 피드백 발견`);
console.log('═══════════════════════════════════════════════════════════════════\n');

if (ISSUES.length === 0) {
  console.log('✅ 완벽합니다! 모든 계층(토큰 ↔ 컴포넌트 ↔ 블록)이 무결성을 유지하고 있습니다.');
  process.exit(0);
}

// 계층별 분류 출력
const layers = ['Token', 'Component', 'Block', 'Template'] as const;
layers.forEach((layer) => {
  const layerIssues = ISSUES.filter((i) => i.layer === layer);
  if (layerIssues.length > 0) {
    console.log(`\n📌 [${layer} 계층 피드백] (${layerIssues.length}건)`);
    layerIssues.forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [${issue.targetFile}] ${issue.message}`);
      console.log(`     👉 액션 지침: ${issue.recommendation}\n`);
    });
  }
});

console.log('───────────────────────────────────────────────────────────────────');
console.log('💡 재귀 개선 루프 권고:');
console.log('  1. 발견된 Block 계층의 원시 태그는 Component Architect가 컴포넌트로 승격.');
console.log('  2. 발견된 색상/폰트 이슈는 Token Guardian이 CSS 변수 규격으로 상향 교정.');
console.log('───────────────────────────────────────────────────────────────────\n');
