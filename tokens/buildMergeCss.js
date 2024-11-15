import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

function processCSS() {
  // CSS 파일들 읽기
  const globalCSS = readFileSync(path.join(process.cwd(), 'build', 'global.variables.css'), 'utf8');
  const darkCSS = readFileSync(path.join(process.cwd(), 'build', 'dark.variables.css'), 'utf8');
  const digitalFontCSS = readFileSync(path.join(process.cwd(), 'build', 'digitalFont.variables.css'), 'utf8');

  // global CSS를 @layer base로 래핑
  const wrappedGlobalCSS = `@layer base {
    ${globalCSS}
  }`;

  // dark와 digitalFont CSS를 테마 클래스로 래핑
  const wrappedDarkCSS = `.theme-dark {
    ${darkCSS}
  }`;

  const wrappedDigitalFontCSS = `.theme-digitalFont {
    ${digitalFontCSS}
  }`;

  // 모든 CSS 통합
  const combinedCSS = `${wrappedGlobalCSS}

${wrappedDarkCSS}

${wrappedDigitalFontCSS}`;

  // 결과를 app/globals.css에 저장
  writeFileSync(path.join(process.cwd(), 'app', 'globals.css'), combinedCSS);
}

try {
  processCSS();
  console.log('CSS 파일이 성공적으로 생성되었습니다.');
} catch (error) {
  console.error('CSS 처리 중 오류가 발생했습니다:', error);
}