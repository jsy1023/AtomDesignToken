/**
 * W3C DTCG Token JSON -> CSS Custom Properties 변환 유틸리티
 */
export function compileTokensToCss(tokenJson: Record<string, any>): string {
  const cssVars: string[] = [];

  function traverse(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    if (obj.variable && obj.$value !== undefined) {
      cssVars.push(`  ${obj.variable}: ${obj.$value};`);
      return;
    }

    for (const key of Object.keys(obj)) {
      if (key.startsWith('$')) continue;
      traverse(obj[key]);
    }
  }

  traverse(tokenJson);

  return `:root {\n${cssVars.join('\n')}\n}\n`;
}
