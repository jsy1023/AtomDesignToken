import * as LucideIcons from 'lucide-react';
import iconNames from './icons-list.json';

export interface IconCategory {
  id: string;
  name: string;
  keywords: string[];
}

export const ICON_CATEGORIES: IconCategory[] = [
  { id: 'all', name: '전체 (All)', keywords: [] },
  { id: 'arrows', name: '화살표 & 내비게이션', keywords: ['arrow', 'chevron', 'caret', 'corner', 'move', 'navigation', 'compass'] },
  { id: 'ui', name: '기본 인터페이스 (UI)', keywords: ['menu', 'x', 'check', 'plus', 'minus', 'search', 'settings', 'sliders', 'filter', 'more', 'grid', 'list', 'layout'] },
  { id: 'media', name: '미디어 & 오디오', keywords: ['play', 'pause', 'video', 'image', 'camera', 'music', 'volume', 'mic', 'film', 'speaker', 'radio', 'disc'] },
  { id: 'communication', name: '커뮤니케이션 & 알림', keywords: ['mail', 'message', 'chat', 'bell', 'phone', 'send', 'inbox', 'at-sign', 'share', 'rss'] },
  { id: 'dev', name: '코드 & 엔지니어링', keywords: ['code', 'terminal', 'git', 'cpu', 'database', 'server', 'bug', 'binary', 'workflow', 'braces', 'brackets', 'file-code'] },
  { id: 'commerce', name: '쇼핑 & 금융 (Fintech)', keywords: ['shopping', 'cart', 'credit-card', 'wallet', 'dollar', 'banknote', 'badge-percent', 'coins', 'receipt', 'tag'] },
  { id: 'files', name: '문서 & 파일 (Docs)', keywords: ['file', 'folder', 'archive', 'paperclip', 'clipboard', 'book', 'bookmark', 'layers', 'newspaper'] },
  { id: 'devices', name: '하드웨어 & 디바이스', keywords: ['laptop', 'monitor', 'smartphone', 'tablet', 'tv', 'watch', 'printer', 'hard-drive', 'usb', 'bluetooth', 'wifi'] },
  { id: 'shapes', name: '도형 & 심볼', keywords: ['heart', 'star', 'circle', 'square', 'triangle', 'shield', 'flag', 'sparkles', 'flame', 'zap', 'sun', 'moon'] },
];

export const ALL_ICON_NAMES: string[] = iconNames as string[];

/**
 * 아이콘 이름으로 Lucide React 컴포넌트 안전 룩업
 */
export function getLucideIcon(iconName: string): React.ComponentType<{ className?: string; size?: number | string; style?: React.CSSProperties }> | null {
  const comp = (LucideIcons as Record<string, any>)[iconName];
  if (comp && (typeof comp === 'object' || typeof comp === 'function')) {
    return comp;
  }
  return null;
}
