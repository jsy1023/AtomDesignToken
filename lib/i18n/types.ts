export type Locale = 'ko' | 'en' | 'ja';

export interface LocaleOption {
  code: Locale;
  label: string;
  shortLabel: string;
}

export const LOCALES: LocaleOption[] = [
  { code: 'ko', label: '한국어', shortLabel: 'KO' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'ja', label: '日本語', shortLabel: 'JA' },
];

export interface TranslationDictionary {
  common: {
    copy: string;
    copied: string;
    download: string;
    search: string;
    close: string;
    home: string;
    docs: string;
    language: string;
    initCommand: string;
    preview: string;
    name: string;
    value: string;
    description: string;
    category: string;
    variable: string;
  };
  nav: {
    foundations: string;
    principles: string;
    tokens: string;
    motion: string;
    library: string;
    components: string;
    icons: string;
    blocks: string;
    patterns: string;
    engineering: string;
    dependencies: string;
    guide: string;
  };
  tokens: {
    title: string;
    description: string;
    brandColor: string;
    radius: string;
    w3cSpec: string;
    ssot: string;
    architecture: string;
    tabColors: string;
    tabTypography: string;
    tabRadius: string;
    tabSpacing: string;
    tabShadow: string;
    tabLayout: string;
    tabJson: string;
    jsonTitle: string;
    jsonBadge: string;
    jsonCopy: string;
    jsonDownload: string;
    jsonCliGuide: string;
    emptySearch: string;
  };
  blocks: {
    title: string;
    description: string;
    allBlocks: string;
    realtimeChart: string;
    chat: string;
    cardList: string;
    slider: string;
    pricing: string;
    kpi: string;
    fileExplorer: string;
    searchPlaceholder: string;
    noResults: string;
  };
}
