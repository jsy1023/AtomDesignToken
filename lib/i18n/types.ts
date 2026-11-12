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
    themeEditor?: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    getStarted: string;
    principlesTitle: string;
    principlesDesc: string;
    principlesLink: string;
    tokensTitle: string;
    tokensDesc: string;
    tokensLink: string;
    motionTitle: string;
    motionDesc: string;
    motionLink: string;
    componentsTitle: string;
    componentsDesc: string;
    componentsLink: string;
    blocksTitle: string;
    blocksDesc: string;
    blocksLink: string;
    patternsTitle: string;
    patternsDesc: string;
    patternsLink: string;
    dependenciesTitle: string;
    dependenciesDesc: string;
    dependenciesLink: string;
    guideTitle: string;
    guideDesc: string;
    guideLink: string;
  };
  nav: {
    foundations: string;
    principles: string;
    tokens: string;
    motion: string;
    library: string;
    layout: string;
    components: string;
    icons: string;
    blocks: string;
    patterns: string;
    engineering: string;
    dependencies: string;
    guide: string;
    subDescriptions: Record<string, string>;
  };
  sidebar: {
    apiReference: string;
    searchPlaceholder: string;
    foundationsGroup: string;
    layoutAndSpacing: string;
    colorAndStatus: string;
    fontAndTypography: string;
    formGroup: string;
    feedbackGroup: string;
    navGroup: string;
    dataGroup: string;
    layoutGroup: string;
    components: Record<string, string>;
  };
  principles: {
    title: string;
    subtitle: string;
    categoryAll: string;
    categoryAgent: string;
    categoryCore: string;
    categoryArchitecture: string;
    categoryToken: string;
    categoryAccessibility: string;
    badgeDo: string;
    badgeDont: string;
    items: Record<
      string,
      {
        title: string;
        subtitle: string;
        description: string;
        dos: string[];
        donts: string[];
      }
    >;
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
  motion: {
    title: string;
    description: string;
    tabDuration: string;
    tabEasing: string;
    tabInteractive: string;
    previewTitle: string;
    speedTitle: string;
    copyVariable: string;
  };
  dependencies: {
    title: string;
    description: string;
    filterAll: string;
    filterRuntime: string;
    filterBuild: string;
    filterTypes: string;
    filterQA: string;
    matrixTitle: string;
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
  componentsDoc: {
    previewTitle: string;
    codeSnippetTitle: string;
    copyCode: string;
    copyComponentCode: string;
    copied: string;
    useCasesTitle: string;
    usagePatternsTitle: string;
    dosAndDontsTitle: string;
    propsSpecTitle: string;
    relatedPatternsTitle: string;
    tokensTitle: string;
    tokensViewAll: string;
    tokensBoundBadge: string;
    tokensEditInStudio: string;
    tabLivePreview: string;
    tabInspectTokens: string;
    thRole: string;
    thVariable: string;
    thDtcgPath: string;
    thDefaultValue: string;
    propName: string;
    propType: string;
    propDefault: string;
    propDescription: string;
    doLabel: string;
    dontLabel: string;
    tocTitle: string;
    searchPlaceholder: string;
  };
}
