import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

function processCSS() {
  // CSS 파일들 읽기
  const globalCSS = readFileSync(path.join(process.cwd(), 'build', 'global.variables.css'), 'utf8')
    .replace(':root {', '')
    .replace(/}\s*$/, '');  // 마지막 } 제거
    
  const darkCSS = readFileSync(path.join(process.cwd(), 'build', 'dark.variables.css'), 'utf8')
    .replace(':root {', '')
    .replace(/}\s*$/, '');
    
  const digitalFontCSS = readFileSync(path.join(process.cwd(), 'build', 'digitalFont.variables.css'), 'utf8')
    .replace(':root {', '')
    .replace(/}\s*$/, '');

  // Tailwind 지시어와 함께 CSS 통합
  const combinedCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    ${globalCSS}
  }
}

.theme-dark {
  ${darkCSS}
}

.theme-digitalFont {
  ${digitalFontCSS}
}`;

  // 결과를 app/globals.css에 저장
  writeFileSync(path.join(process.cwd(), 'app', 'globals.css'), combinedCSS);
}

try {
  processCSS();
  console.log('CSS 파일이 성공적으로 생성되었습니다.');
} catch (error) {
  console.error('CSS 처리 중 오류가 발생했습니다:', error);
}