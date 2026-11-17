/**
 * 로케일에 따라 한글(English) 병기 텍스트를 단일 언어로 분리 렌더링하는 유틸리티
 *
 * - locale === 'ko': 한국어만 반환 (예: "Button (버튼)" -> "버튼", "배경 색상 (Background)" -> "배경 색상", "오션 블루 (Ocean Blue)" -> "오션 블루")
 * - locale === 'en': 영어만 반환 (예: "Button (버튼)" -> "Button", "배경 색상 (Background)" -> "Background", "오션 블루 (Ocean Blue)" -> "Ocean Blue")
 * - locale === 'ja': 일본어/영어 반환
 */
export function formatLocaleText(text: string, locale: string = 'ko'): string {
  if (!text) return '';

  // Match pattern: "Something (SomethingElse)"
  const match = text.match(/^(.*?)\s*\((.*?)\)$/);
  if (!match) return text;

  const left = match[1].trim();
  const right = match[2].trim();

  // Check which side contains Hangul (\uAC00-\uD7A3, \u1100-\u11FF, \u3130-\u318F)
  const hasHangulLeft = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/.test(left);
  const hasHangulRight = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/.test(right);

  if (locale === 'ko') {
    if (hasHangulLeft) return left;
    if (hasHangulRight) return right;
    return left;
  }

  // locale === 'en' or other latin locales
  if (locale === 'en') {
    if (hasHangulLeft && !hasHangulRight) return right;
    if (!hasHangulLeft && hasHangulRight) return left;
    return left;
  }

  // locale === 'ja'
  const hasKanjiKanaLeft = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(left);
  const hasKanjiKanaRight = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(right);
  if (hasKanjiKanaLeft) return left;
  if (hasKanjiKanaRight) return right;

  if (hasHangulLeft && !hasHangulRight) return right;
  if (!hasHangulLeft && hasHangulRight) return left;
  return left;
}
