'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  Download,
  Search,
  Navigation,
  ShieldCheck,
  Plane,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Eye,
  Sliders,
  ChevronRight,
  RefreshCw,
  Terminal,
  Calendar,
  Users,
  ArrowRightLeft,
  Share2,
  Bookmark,
  Menu,
  X,
  FileText
} from 'lucide-react';

interface PatternVariant {
  id: string;
  name: string;
  description: string;
  checklist: string[];
  antiPatterns: string[];
  markdown: string;
}

interface PatternCategory {
  id: string;
  title: string;
  categoryName: string;
  badge: string;
  iconName: 'navigation' | 'search' | 'auth' | 'flight' | 'blog';
  summary: string;
  variants: PatternVariant[];
}

const PATTERNS_DATA: PatternCategory[] = [
  {
    id: 'navigation',
    title: '네비게이션 UX 패턴',
    categoryName: 'Navigation',
    badge: 'Core UI',
    iconName: 'navigation',
    summary: '반응형 헤더, 모바일 바텀 탭바, 스크롤 감지 및 드로어 메뉴 탐색 패턴',
    variants: [
      {
        id: 'responsive-header',
        name: '반응형 헤더 & 모바일 드로어',
        description: '데스크톱에서는 가로형 메뉴, 모바일(768px 미만)에서는 백드롭 차단 드로어와 햄버거 토글이 적용되는 표준 네비게이션.',
        checklist: [
          '모바일 메뉴 오픈 시 배경 스크롤 차단 (overflow: hidden)',
          'ESC 키 입력 또는 바깥 영역(Backdrop) 터치 시 즉시 닫힘 처리',
          '현재 위치(Active Route)에 명확한 인디케이터(볼드 + 브랜드 컬러) 노출',
          '접근성: aria-expanded 및 aria-controls 속성 필수 포함'
        ],
        antiPatterns: [
          '모바일 화면에서 메뉴 항목을 2줄로 강제 줄바꿈하여 본문 가림',
          '드로어가 열렸는데 뒤쪽 콘텐츠가 스크롤되는 현상',
          '닫기(X) 버튼 터치 영역이 44x44px 미만으로 너무 작음'
        ],
        markdown: `# [UX Pattern] 반응형 헤더 & 모바일 드로어 네비게이션

## 1. 목적 및 개요
반응형 웹 전반에서 데스크톱과 모바일 뷰포트 간 자연스러운 전환을 보장하고, 사용자에게 현재 위치와 이동 경로를 명확히 제시합니다.

## 2. 필수 UX 규칙 (AI 구현 지침)
- **Breakpoints**: 768px 미만에서 모바일 네비게이션 모드로 전환.
- **Backdrop & Scroll Lock**: 드로어 오픈 시 \`document.body.style.overflow = 'hidden'\`을 적용하여 배경 스크롤 차단.
- **A11y**: 햄버거 버튼에 \`aria-label="메뉴 열기"\`, \`aria-expanded="true/false"\` 적용.
- **인터랙션 피드백**: 현재 활성화된 페이지 링크는 브랜드 색상과 하단 언더라인 또는 뱃지로 식별 가능해야 함.

## 3. 권장 시멘틱 컴포넌트 클래스
\`\`\`html
<header class="atom-header atom-header-sticky">
  <div class="atom-header-inner">
    <a href="/" class="atom-brand-logo">Service</a>
    <!-- 데스크톱 메뉴 -->
    <nav class="atom-nav-desktop hidden md:flex">
      <a href="/features" class="atom-nav-link active">기능소개</a>
      <a href="/pricing" class="atom-nav-link">요금안내</a>
    </nav>
    <!-- 모바일 트리거 -->
    <button class="atom-btn-icon md:hidden" aria-label="메뉴 열기">
      <span class="atom-icon-menu"></span>
    </button>
  </div>
</header>
\`\`\`
`
      },
      {
        id: 'bottom-nav',
        name: '모바일 바텀 탭 네비게이션 (App Style)',
        description: '모바일 웹/앱 환경에서 한 손 조작을 극대화하는 하단 고정 4~5개 주요 탭바.',
        checklist: [
          '엄지손가락 터치 반경을 고려한 높이(56~64px) 및 Safe Area 대응',
          '아이콘 + 11px 레이블 병행 표기로 오인 방지',
          '탭 전환 시 햅틱/마이크로 스케일 인터랙션 제공',
          '탭 개수는 3~5개로 제한하여 시인성 확보'
        ],
        antiPatterns: [
          '하단 네비게이션 탭이 6개 이상으로 좁아져 오터치 발생',
          'iOS Safari 하단 홈 바(Home indicator)와 겹치는 패딩 미처리',
          '텍스트 없이 아이콘만 배치하여 탭의 용도를 모호하게 만듦'
        ],
        markdown: `# [UX Pattern] 모바일 바텀 탭 네비게이션 (Bottom Tab Bar)

## 1. 목적
모바일 사용자가 한 손으로 서비스의 3~5개 핵심 영역을 즉각 오갈 수 있도록 하단에 고정 배치합니다.

## 2. 필수 UX 요구사항
- **Safe Area**: iOS 하단 바 대응 (\`padding-bottom: env(safe-area-inset-bottom, 16px)\`).
- **아이콘 + 텍스트**: 아이콘 단독 배치를 지양하고, 한글 10~11px 레이블을 항상 함께 노출.
- **배지(Badge)**: 알림이나 새 기능이 있을 경우 탭 우상단에 6px 도트 또는 카운트 배지 노출.
`
      }
    ]
  },
  {
    id: 'search',
    title: '검색 UX 패턴',
    categoryName: 'Search & Filter',
    badge: 'Discovery',
    iconName: 'search',
    summary: '실시간 자동완성, 최근/추천 검색어, 필터 태그 및 결과 없음(Empty State) 대응',
    variants: [
      {
        id: 'autocomplete-empty',
        name: '실시간 검색어 & 결과 없음(Empty) UX',
        description: '입력 즉시 디바운스 검색을 실행하고, 검색 결과가 없을 때 사용자가 이탈하지 않도록 복구 경로를 제공.',
        checklist: [
          '입력 시 300ms 디바운스(Debounce) 적용으로 불필요한 API 요청 방지',
          '입력 내용 즉시 지우기 (Clear X) 버튼 상시 배치',
          '검색 결과 없을 때: 친절한 문구 + 추천 검색어 + 필터 초기화 CTA 제공',
          '로딩 중에는 스켈레톤(Skeleton UI) 노출로 화면 깜빡임 제거'
        ],
        antiPatterns: [
          '글자 하나 칠 때마다 즉시 서버 요청을 보내 깜빡거림 유발',
          '결과가 없을 때 하얀 백지 화면만 덜렁 노출하여 사용자 이탈',
          '지우기 버튼이 없어 백스페이스를 연타하게 만듦'
        ],
        markdown: `# [UX Pattern] 실시간 검색 & 결과 없음(Empty State) 복구 패턴

## 1. 개요
검색은 사용자가 원하는 정보를 찾는 가장 빠른 수단입니다. 빠른 피드백과 실패 없는 복구 흐름을 설계해야 합니다.

## 2. 필수 UX 명세
- **Debounce**: 사용자 입력 후 300ms 동안 추가 입력이 없을 때 API 요청.
- **Search States (4단계 상태 머신)**:
  1. \`Initial\`: 최근 검색어(로컬스토리지) + 실시간 인기 검색어 칩 노출.
  2. \`Searching\`: 스켈레톤 리스트 (\`atom-skeleton-item\`) 3개 노출.
  3. \`Success\`: 하이라이트된 검색어 매칭 목록 노출.
  4. \`Empty\`: 일러스트/아이콘 + "검색 결과가 없습니다" + [검색어 초기화] 버튼.

## 3. 프롬프트 지침
AI에게 지시할 때 반드시 \`isSearching\`, \`results.length === 0\` 상태 분기 처리를 코드로 작성하도록 강제하십시오.
`
      }
    ]
  },
  {
    id: 'auth',
    title: '개인정보 인증확인 UX 패턴',
    categoryName: 'Identity & Auth',
    badge: 'Security',
    iconName: 'auth',
    summary: 'SMS 6자리 인증번호 타이머, 실시간 폼 유효성 검사, 민감정보 마스킹 보안 패턴',
    variants: [
      {
        id: 'sms-otp-timer',
        name: '6자리 인증번호 입력 & 카운트다운 타이머',
        description: '휴대폰/이메일 본인 확인 시 3분 타이머와 자동 포커스 이동, 재전송 쿨다운을 지원하는 고접근성 패턴.',
        checklist: [
          '3분(180초) 실시간 카운트다운 타이머 노출 (03:00 -> 00:00)',
          '타이머 만료 시 입력 비활성화 및 [인증번호 재전송] 안내',
          '숫자 1자리 입력 시 다음 칸 자동 포커스(Auto-focus next input)',
          '클립보드 전체 복사(Paste) 시 6칸 자동 채우기 지원'
        ],
        antiPatterns: [
          '재전송 버튼에 쿨다운이 없어 연타 공격이나 비용 과다 발생',
          '백스페이스 누를 때 이전 칸으로 포커스가 돌아가지 않는 문제',
          '타이머가 끝났는데도 사용자가 입력하고 실패할 때까지 방치'
        ],
        markdown: `# [UX Pattern] 6자리 SMS 본인인증 & 카운트다운 타이머

## 1. 핵심 흐름
1. 휴대폰 번호 입력 후 [인증요청] 클릭
2. 6칸의 숫자 전용 OTP Input 활성화 및 180초 타이머 시작
3. 6자리 입력 완료 시 별도 확인 버튼 없이 자동 검증(Auto Submit)
4. 실패 시 인라인 에러 ("인증번호가 일치하지 않습니다. 남은 횟수 3회")

## 2. AI 구현 규칙
- OTP Input은 \`inputMode="numeric"\`, \`maxLength={1}\` 적용.
- Paste 이벤트 감지 시 \`e.clipboardData\`에서 6자리 추출하여 6개 input에 자동 분배.
`
      }
    ]
  },
  {
    id: 'flight',
    title: '항공권 검색 UX 패턴',
    categoryName: 'Flight Booking',
    badge: 'Complex Flow',
    iconName: 'flight',
    summary: '왕복/편도 전환, 출발지-도착지 원클릭 스왑, 날짜 범위 캘린더 및 승객/좌석 바텀시트',
    variants: [
      {
        id: 'roundtrip-booking',
        name: '항공권 예약 종합 검색 (Round-trip & Passengers)',
        description: '복잡한 날짜, 출발지, 인원 정보를 직관적으로 선택하고 오류를 사전에 차단하는 여행 버티컬 대표 패턴.',
        checklist: [
          '출발지-도착지 간 원클릭 스왑(↔ Swap) 버튼 및 전환 애니메이션',
          '출발지와 도착지에 동일한 공항을 선택하지 못하도록 자동 유효성 검사',
          '가는날 선택 시, 오는날은 가는날 이전 날짜를 선택할 수 없도록 비활성화',
          '성인/소아/유아 인원수 카운터 및 유아 규정(만 2세 미만) 툴팁 제공'
        ],
        antiPatterns: [
          '오는날이 가는날보다 앞선 날짜로 선택되는 치명적 날짜 버그',
          '모바일 화면에서 캘린더가 뷰포트를 벗어나 날짜 확인이 불가능함',
          '출발지-도착지 변경 시 입력했던 날짜가 초기화되어 사용자 분노 유발'
        ],
        markdown: `# [UX Pattern] 항공권 검색 및 예약 종합 플로우

## 1. 개요
다양한 변수(여정 유형, 공항, 날짜 범위, 승객 구분, 좌석 등급)를 다루는 복잡한 입력 폼을 직관적인 UI로 정리합니다.

## 2. 필수 인터랙션 규약
1. **여정 토글**: [왕복] / [편도] / [다구간] 상단 탭.
2. **공항 스왑**: 출발지(ICN) ↔ 도착지(NRT) 스왑 버튼 클릭 시 부드러운 180도 회전 트랜지션.
3. **캘린더 정책**:
   - 최소 날짜는 오늘(Today).
   - 가는날 선택 후 오는날 호버 시 날짜 범위(Range) 하이라이트.
4. **승객 인원 선택 모달/시트**:
   - 성인 (만 12세 이상), 소아 (만 2세~11세), 유아 (만 2세 미만).
   - 성인 1명당 유아 최대 1명 규칙 반영.
`
      }
    ]
  },
  {
    id: 'blog',
    title: '블로그 & 콘텐츠 UX 패턴',
    categoryName: 'Content & Media',
    badge: 'Reading Experience',
    iconName: 'blog',
    summary: '읽기 진행률 프로그레스바, 우측 동적 목차(TOC), 코드 블록 원클릭 복사, 북마크 인터랙션',
    variants: [
      {
        id: 'article-reader',
        name: '기술 블로그 & 아티클 리더 (TOC & Progress)',
        description: '긴 글을 읽는 사용자의 집중도를 높이고, 원하는 섹션으로 빠르게 이동할 수 있는 콘텐츠 친화적 패턴.',
        checklist: [
          '상단 고정 2px 스크롤 진행률 프로그레스바 (0% ~ 100%)',
          '오른쪽 목차(Table of Contents)에서 현재 보고 있는 헤딩 자동 하이라이트',
          '코드 블록 우상단에 언어 배지 및 원클릭 복사(Copy) 피드백 토스트',
          '하단 아티클 끝 도달 시 다음 추천 글 및 저자 프로필/구독 CTA 노출'
        ],
        antiPatterns: [
          '모바일에서 목차가 본문을 가려 글을 읽을 수 없게 만듦',
          '스크롤 감지가 너무 둔하거나 끊겨서 TOC 하이라이트가 엉뚱한 곳을 가리킴',
          '코드 복사 버튼을 눌렀는데 복사되었는지 시각적 피드백이 없음'
        ],
        markdown: `# [UX Pattern] 기술 블로그 및 아티클 독서 경험 패턴

## 1. 목적
개발자 및 독자가 기술 아티클과 긴 글을 읽을 때 탐색의 피로도를 낮추고 완독률을 높입니다.

## 2. 필수 UX 명세
- **Scroll Progress**: \`window.scrollY / (documentHeight - windowHeight) * 100\` 실시간 상단 바 반영.
- **Intersection Observer TOC**: \`h2, h3\` 요소를 관찰하여 뷰포트 상단 20%에 걸칠 때 활성 목차 상태 갱신.
- **Code Block**:
  - 언어 식별 태그 (TSX, JSON, BASH 등).
  - 복사 버튼 클릭 시 2초간 체크 아이콘(\`Check\`) 및 토스트 알림.
`
      }
    ]
  }
];

export default function PatternsPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('flight');
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Flight interactive preview state
  const [flightType, setFlightType] = useState<'round' | 'oneWay'>('round');
  const [departure, setDeparture] = useState('서울/인천 (ICN)');
  const [arrival, setArrival] = useState('도쿄/나리타 (NRT)');
  const [passengers, setPassengers] = useState(1);

  // Search interactive preview state
  const [liveSearchQuery, setLiveSearchQuery] = useState('');

  // SMS OTP preview state
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(179);

  // Current selected data
  const currentCategory = PATTERNS_DATA.find((p) => p.id === selectedCategoryId) || PATTERNS_DATA[0];
  const currentVariant = currentCategory.variants[selectedVariantIndex] || currentCategory.variants[0];

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(currentVariant.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([currentVariant.markdown], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `ux-pattern-${currentCategory.id}-${currentVariant.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSwapAirport = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between">
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#090a0f]/80 border-b border-neutral-200/70 dark:border-neutral-800/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>메인으로 돌아가기</span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight">AtomDesignToken</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                UX Pattern Catalog
              </span>
            </div>
            <Link 
              href="/components" 
              className="hidden md:inline-flex text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition ml-2"
            >
              컴포넌트 갤러리
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'AI 지시용 .md 복사완료!' : '선택된 패턴 .md 복사'}</span>
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              title="파일 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">.md 다운로드</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container: 2 Column Layout */}
      <div className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Pattern Categories List (4 Cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">UX Pattern 라이브러리</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              AI에게 지시하기 전, 검증된 사용자 경험 패턴을 선택하세요.
            </p>
          </div>

          {/* Quick Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text"
              placeholder="패턴 검색 (예: 네비게이션, 항공권, 인증...)"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pattern Cards List */}
          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {PATTERNS_DATA.filter((p) => 
              p.title.includes(searchFilter) || 
              p.categoryName.toLowerCase().includes(searchFilter.toLowerCase()) ||
              p.summary.includes(searchFilter)
            ).map((pattern) => {
              const isSelected = pattern.id === selectedCategoryId;
              return (
                <button
                  key={pattern.id}
                  onClick={() => {
                    setSelectedCategoryId(pattern.id);
                    setSelectedVariantIndex(0);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-850 border-blue-500 shadow-md ring-2 ring-blue-500/10'
                      : 'bg-white/60 dark:bg-neutral-900/60 border-neutral-200/80 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {pattern.categoryName}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                      {pattern.variants.length}개 세부 패턴
                    </span>
                  </div>

                  <div className="font-bold text-sm text-neutral-900 dark:text-white flex items-center justify-between">
                    <span>{pattern.title}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-blue-500' : 'text-neutral-300 dark:text-neutral-600'}`} />
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {pattern.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Detailed Pattern View & Preview & AI Markdown (8 Cols) */}
        <main className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top Banner of Selected Pattern */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                    {currentCategory.badge}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">ID: {currentCategory.id}</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight mt-2 text-neutral-900 dark:text-white">
                  {currentCategory.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {currentCategory.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 active:scale-95 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사됨!' : 'AI 프롬프트 .md 복사'}</span>
                </button>
              </div>
            </div>

            {/* Sub-variant Tabs (다양한 패턴 선택기) */}
            <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-neutral-400 shrink-0 mr-1">세부 패턴:</span>
              {currentCategory.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    selectedVariantIndex === idx
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Live Preview Box */}
          <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  실시간 인터랙티브 프리뷰
                </span>
                <h3 className="text-base font-bold mt-1">{currentVariant.name}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{currentVariant.description}</p>
              </div>
            </div>

            {/* Dynamic Interactive Component Preview by Category */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800 flex items-center justify-center min-h-[220px]">
              
              {/* 1. Flight Booking Preview */}
              {currentCategory.id === 'flight' && (
                <div className="w-full max-w-lg bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                  {/* Flight Type Toggle */}
                  <div className="flex items-center gap-2 mb-4">
                    <button 
                      onClick={() => setFlightType('round')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        flightType === 'round' ? 'bg-blue-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      왕복
                    </button>
                    <button 
                      onClick={() => setFlightType('oneWay')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        flightType === 'oneWay' ? 'bg-blue-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      편도
                    </button>
                    <div className="ml-auto text-xs text-neutral-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>성인 {passengers}명 · 일반석</span>
                    </div>
                  </div>

                  {/* Airport Swap Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center mb-3">
                    <div className="sm:col-span-5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block font-semibold">출발지</span>
                      <span className="text-xs font-bold">{departure}</span>
                    </div>

                    <div className="sm:col-span-1 flex justify-center">
                      <button 
                        onClick={handleSwapAirport}
                        className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-50 hover:text-blue-600 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center transition active:scale-90"
                        title="출발지-도착지 맞바꾸기"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="sm:col-span-5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block font-semibold">도착지</span>
                      <span className="text-xs font-bold">{arrival}</span>
                    </div>
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-semibold">가는날</span>
                        <span className="text-xs font-bold">10월 24일 (목)</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <div>
                        <span className="text-[10px] text-neutral-400 block font-semibold">오는날</span>
                        <span className="text-xs font-bold">{flightType === 'round' ? '10월 28일 (월)' : '선택 안 함'}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2">
                    <Plane className="w-4 h-4" />
                    <span>최저가 항공권 검색하기</span>
                  </button>
                </div>
              )}

              {/* 2. Navigation Preview */}
              {currentCategory.id === 'navigation' && (
                <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-lg">
                  <div className="h-12 px-4 bg-neutral-100 dark:bg-neutral-850 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
                    <div className="font-bold text-xs flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-600" />
                      <span>AtomPortal</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
                      <span className="text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5">홈</span>
                      <span className="text-neutral-500">탐색</span>
                      <span className="text-neutral-500">마이페이지</span>
                    </div>
                    <button className="sm:hidden p-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800">
                      <Menu className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 text-center text-xs text-neutral-400">
                    반응형 뷰포트에 따라 햄버거 메뉴 및 Safe-Area 바텀 탭바로 자동 최적화됩니다.
                  </div>
                </div>
              )}

              {/* 3. Search & Empty State Preview */}
              {currentCategory.id === 'search' && (
                <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                  <div className="relative mb-3">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input 
                      type="text" 
                      placeholder="검색어를 입력해보세요 ('오류' 입력 시 Empty)"
                      value={liveSearchQuery}
                      onChange={(e) => setLiveSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium"
                    />
                  </div>

                  {liveSearchQuery.includes('오류') ? (
                    <div className="p-6 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                      <div className="text-xs font-bold text-neutral-600 dark:text-neutral-300">일치하는 결과가 없습니다</div>
                      <p className="text-[11px] text-neutral-400 mt-1 mb-3">검색어를 초기화하거나 다른 단어로 검색해보세요.</p>
                      <button 
                        onClick={() => setLiveSearchQuery('')}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold"
                      >
                        검색어 초기화
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex justify-between">
                        <span>항공권 최저가 알림 설정</span>
                        <span className="text-[10px] text-neutral-400">추천</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 flex justify-between">
                        <span>네비게이션 드로어 패턴</span>
                        <span className="text-[10px] text-neutral-400">인기</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. Auth & OTP Preview */}
              {currentCategory.id === 'auth' && (
                <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold">휴대폰 SMS 본인확인</span>
                    <span className="text-xs font-mono font-bold text-rose-500">
                      02:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 mb-4">전송된 6자리 인증번호를 입력해주세요.</p>

                  <div className="flex items-center justify-between gap-2 mb-4">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <input 
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={otpValues[idx]}
                        onChange={(e) => {
                          const newVals = [...otpValues];
                          newVals[idx] = e.target.value;
                          setOtpValues(newVals);
                        }}
                        className="w-10 h-12 text-center font-bold text-lg rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    ))}
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition">
                    인증 확인 완료
                  </button>
                </div>
              )}

              {/* 5. Blog Reader Preview */}
              {currentCategory.id === 'blog' && (
                <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-lg">
                  {/* Reading Progress Indicator */}
                  <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-3 overflow-hidden">
                    <div className="w-2/3 h-full bg-blue-600" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>읽는 중: 67% 완료</span>
                    <span>예상 소요 시간 4분</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">UI/UX 디자이너가 AI 시대를 주도하는 방법</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                    말(자연어)로 디자인 시스템을 지휘하고, 규격화된 토큰과 UX 패턴을 통해 개발자와의 핸드오프 검수 비용을 0으로 만드는 새로운 디자인 패러다임...
                  </p>
                </div>
              )}

            </div>

            {/* Checklist & Anti-patterns Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Do's Checklist */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                  필수 UX 체크리스트 (Do's)
                </span>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {currentVariant.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts Anti-patterns */}
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-2.5">
                  <AlertTriangle className="w-4 h-4" />
                  피해야 할 안티패턴 (Don'ts)
                </span>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                  {currentVariant.antiPatterns.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* AI Markdown Instruction Section (복사 및 제공 영역) */}
          <div className="rounded-3xl bg-neutral-900 text-neutral-100 p-6 sm:p-8 border border-neutral-800 shadow-xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  AI Agent 지시용 .md 파일 명세서
                </span>
                <p className="text-xs text-neutral-400 mt-1">
                  이 마크다운 가이드를 복사하여 Cursor, Claude Code, Antigravity에게 프롬프트로 던지세요.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white border border-neutral-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사 완료!' : '클립보드 복사'}</span>
                </button>
                <button
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.md 다운로드</span>
                </button>
              </div>
            </div>

            {/* Markdown Code Viewer */}
            <div className="relative">
              <pre className="p-5 rounded-2xl bg-neutral-950 text-neutral-300 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800 max-h-[380px] overflow-y-auto whitespace-pre-wrap">
                {currentVariant.markdown}
              </pre>
            </div>
          </div>

        </main>

      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 bg-white/50 dark:bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">AtomDesignToken UX Pattern Catalog</span>
            <span> — Agent-Native UX Constitution</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">메인으로 가기</Link>
            <span>v0.1.48</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
