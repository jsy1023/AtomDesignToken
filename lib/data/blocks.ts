export type BlockCategoryId = 'all' | 'chart' | 'chat' | 'card' | 'slider' | 'pricing' | 'stats' | 'files';

export interface BlockCategory {
  id: BlockCategoryId;
  name: string;
  englishName: string;
  description: string;
  icon: string;
}

export interface BlockCodeSnippet {
  react: string;
  htmlCss: string;
}

export interface BlockItem {
  id: string;
  title: string;
  englishTitle: string;
  category: BlockCategoryId;
  badge: string;
  summary: string;
  description: string;
  features: string[];
  tokensUsed: string[];
  codeSnippets: BlockCodeSnippet;
}

export const BLOCK_CATEGORIES: BlockCategory[] = [
  {
    id: 'all',
    name: '전체 블록',
    englishName: 'All Blocks',
    description: '프로덕션 즉시 투입 가능한 복합 디자인 블록 전체 목록',
    icon: 'Layers',
  },
  {
    id: 'chart',
    name: '실시간 차트',
    englishName: 'Realtime Chart',
    description: '시계열 데이터 실시간 틱 스트리밍 및 주가/지표 시각화 블록',
    icon: 'LineChart',
  },
  {
    id: 'chat',
    name: '채팅 & 메신저',
    englishName: 'Chat & Messenger',
    description: 'AI 어시스턴트, 타이핑 인디케이터, 빠른 제안 칩 인터랙티브 블록',
    icon: 'MessageSquare',
  },
  {
    id: 'card',
    name: '카드 리스트',
    englishName: 'Card Grid & List',
    description: '그리드/리스트 뷰 전환, 필터/정렬 탭, 반응형 카드 컬렉션 블록',
    icon: 'LayoutGrid',
  },
  {
    id: 'slider',
    name: '슬라이더 & 캐러셀',
    englishName: 'Slider & Showcase',
    description: '비용/수치 시뮬레이션 인터랙티브 슬라이더 및 캐러셀 쇼케이스 블록',
    icon: 'Sliders',
  },
  {
    id: 'pricing',
    name: '가격 정책 UX',
    englishName: 'Pricing & Plans',
    description: '월간/연간 결제 토글, 티어별 기능 비교, 하이라이트 CTA 블록',
    icon: 'CreditCard',
  },
  {
    id: 'stats',
    name: '통계 & KPI 지표',
    englishName: 'Metric & Stats',
    description: '트렌드 증감률 뱃지, 미니 스파크라인, 4대 핵심 비즈니스 KPI 블록',
    icon: 'BarChart3',
  },
  {
    id: 'files',
    name: '파일 탐색기',
    englishName: 'File Explorer',
    description: '폴더 계층 트리, 파일 브레드크럼, 그리드/리스트 뷰, 실시간 파일 미리보기 블록',
    icon: 'FolderTree',
  },
];

export const BLOCKS_COLLECTION: BlockItem[] = [
  {
    id: 'realtime-chart',
    title: '실시간 시계열 메트릭 & 틱 차트',
    englishTitle: 'Realtime Metric & Tick Chart',
    category: 'chart',
    badge: '실시간 스트리밍',
    summary: '초당 실시간 가격/데이터 틱 변동, 캔들/라인 차트 모드, 시간 프레임 필터 및 고가/저가/변동률 KPI가 결합된 블록입니다.',
    description: '금융 핀테크, 서버 모니터링, 실시간 매출 트래킹 등에 즉시 사용할 수 있도록 경량 SVG 패스와 실시간 애니메이션 인터랙션을 제공합니다. 런타임 차트 라이브러리 없이 0KB 순수 SVG 및 CSS 토큰으로 렌더링됩니다.',
    features: [
      '1초 주기 실시간 틱 데이터 스트리밍 시뮬레이션 (재생/일시정지 토글)',
      '라인 차트 및 면적 그라디언트 렌더링',
      '시간 범위 탭 필터 (1m, 5m, 1h, 1d)',
      '실시간 마우스 호버 크로스헤어(십자선) 및 데이터 툴팁',
      '고가/저가/거래량 KPI 요약 칩 제공'
    ],
    tokensUsed: ['--accent-primary', '--atom-success', '--atom-destructive', '--bg-secondary', '--border-subtle'],
    codeSnippets: {
      react: `import React, { useState, useEffect } from 'react';

export function RealtimeChartBlock() {
  const [data, setData] = useState([45, 52, 49, 62, 58, 70, 75, 72, 85, 92]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const next = Math.max(20, Math.min(100, last + (Math.random() * 12 - 6)));
        return [...prev.slice(1), Math.round(next)];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="p-6 rounded-2xl bg-(--bg-primary) border border-(--border-subtle) shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-xs text-(--text-muted)">KRW-ATOM / 실시간 체결가</span>
          <h3 className="text-2xl font-bold text-(--text-primary)">₩84,200 <span className="text-sm font-medium text-emerald-500">+4.8%</span></h3>
        </div>
        <button onClick={() => setIsPlaying(!isPlaying)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-(--bg-secondary) text-(--text-primary)">
          {isPlaying ? '일시정지' : '실시간 재생'}
        </button>
      </div>
      <svg className="w-full h-44 overflow-visible" viewBox="0 0 400 150">
        <path d="M 0 100 Q 100 40, 200 80 T 400 20" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-(--accent-primary)" />
      </svg>
    </div>
  );
}`,
      htmlCss: `<div class="atom-realtime-chart-card">
  <div class="chart-header">
    <div class="title-group">
      <span class="symbol">KRW-ATOM / 실시간 체결가</span>
      <h3 class="price">₩84,200 <span class="badge positive">+4.8%</span></h3>
    </div>
    <button class="control-btn" id="stream-toggle">실시간 틱 수신 중</button>
  </div>
  <svg class="chart-canvas" viewBox="0 0 400 150">
    <path class="trend-line" d="M 0 120 L 50 110 L 100 80 L 150 90 L 200 60 L 250 70 L 300 40 L 350 45 L 400 20" />
  </svg>
</div>`
    }
  },
  {
    id: 'interactive-chat',
    title: '인터랙티브 AI 챗 & 메신저 피드',
    englishTitle: 'Interactive AI Chat & Feed',
    category: 'chat',
    badge: '대화형 에이전트',
    summary: '메시지 발송, AI 타이핑 애니메이션 인디케이터, 빠른 질문 제안 칩, 자동 스크롤 대화 피드 블록입니다.',
    description: '고객지원, AI 대화 에이전트, 상담 위젯에 최적화된 반응형 챗 UI 블록입니다. 실시간 전송 인터랙션과 디자인 토큰 기반 말풍선 스타일링이 완벽하게 내장되어 있습니다.',
    features: [
      '실시간 메시지 발송 및 사용자/봇 분기 말풍선 UI',
      'AI 응답 생성 시 펄스 도트(Pulse Dot) 타이핑 인디케이터',
      '원클릭 빠른 프롬프트 제안 칩 (Quick Suggestions)',
      '시간 타임스탬프 및 아바타 상태 뱃지 (Online)',
      '키보드 Enter 단축키 전송 및 빈 입력 방지'
    ],
    tokensUsed: ['--accent-primary', '--bg-secondary', '--text-primary', '--border-subtle', '--atom-radius-lg'],
    codeSnippets: {
      react: `import React, { useState } from 'react';

export function ChatBlock() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: '안녕하세요! 디자인 시스템과 토큰 구축을 도와드릴게요.', time: '오전 10:00' }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: input, time: '방금' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-96 rounded-2xl bg-(--bg-primary) border border-(--border-subtle) overflow-hidden">
      <div className="p-4 border-b border-(--border-subtle) font-semibold">AI Assistant</div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map(m => (
          <div key={m.id} className={\`flex \${m.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
            <div className={\`p-3 rounded-2xl text-sm max-w-[80%] \${m.role === 'user' ? 'bg-(--accent-primary) text-white' : 'bg-(--bg-secondary) text-(--text-primary)'}\`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-(--border-subtle) flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="메시지를 입력하세요..." className="flex-1 px-3 py-2 rounded-xl bg-(--bg-secondary) text-sm outline-none" />
        <button onClick={send} className="px-4 py-2 rounded-xl bg-(--accent-primary) text-white text-sm font-semibold">전송</button>
      </div>
    </div>
  );
}`,
      htmlCss: `<div class="atom-chat-block">
  <div class="chat-header">
    <span class="status-indicator online"></span>
    <span class="bot-name">AI Assistant</span>
  </div>
  <div class="chat-messages">
    <div class="message incoming"><p>디자인 시스템 구축 무엇을 도와드릴까요?</p></div>
    <div class="message outgoing"><p>색상 토큰을 확장하고 싶습니다.</p></div>
  </div>
  <div class="chat-input-bar">
    <input type="text" placeholder="메시지 입력..." />
    <button class="send-btn">전송</button>
  </div>
</div>`
    }
  },
  {
    id: 'card-list',
    title: '반응형 필터 카드 그리드 & 리스트',
    englishTitle: 'Responsive Filter Card Grid & List',
    category: 'card',
    badge: '쇼케이스/카탈로그',
    summary: '그리드/리스트 뷰포트 토글, 카테고리 필터링 탭, 검색 인풋, 호버 애니메이션이 적용된 카드 컬렉션 블록입니다.',
    description: '콘텐츠 카탈로그, 템플릿 탐색기, 프로젝트 리스트 등 대규모 아이템을 직관적으로 탐색하고 정렬할 수 있는 고접근성 블록입니다.',
    features: [
      '그리드(3열/2열) ↔ 수평 리스트(1열) 원클릭 뷰포트 전환',
      '실시간 키워드 검색 및 카테고리 필터 태그',
      '카드 즐겨찾기(Bookmark) 토글 인터랙션',
      '아이템별 태그 뱃지, 작성일, 메트릭(조회수, 평점) 표시',
      '부드러운 호버 리프트(Lift) 및 보더 하이라이트 효과'
    ],
    tokensUsed: ['--bg-secondary', '--border-subtle', '--border-strong', '--text-primary', '--accent-primary'],
    codeSnippets: {
      react: `import React, { useState } from 'react';

export function CardListBlock() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['All', 'Design', 'Code', 'Tokens'].map(tab => (
            <button key={tab} onClick={() => setFilter(tab)} className={\`px-3 py-1.5 rounded-lg text-xs font-medium \${filter === tab ? 'bg-(--accent-primary) text-white' : 'bg-(--bg-secondary) text-(--text-secondary)'}\`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-1 border border-(--border-subtle) rounded-lg p-1">
          <button onClick={() => setView('grid')} className={\`p-1 rounded \${view === 'grid' ? 'bg-(--bg-secondary)' : ''}\`}>Grid</button>
          <button onClick={() => setView('list')} className={\`p-1 rounded \${view === 'list' ? 'bg-(--bg-secondary)' : ''}\`}>List</button>
        </div>
      </div>
      <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
        {/* Card Items */}
      </div>
    </div>
  );
}`,
      htmlCss: `<div class="atom-card-grid-block">
  <div class="filter-toolbar">
    <div class="tabs">
      <button class="active">전체</button>
      <button>디자인</button>
      <button>개발</button>
    </div>
  </div>
  <div class="cards-wrapper grid-view">
    <article class="atom-card">
      <div class="card-badge">인기</div>
      <h3>디자인 토큰 규격 가이드</h3>
      <p>W3C DTCG 표준 기반 토큰 컴파일 가이드라인</p>
    </article>
  </div>
</div>`
    }
  },
  {
    id: 'interactive-slider',
    title: '비용 시뮬레이터 & 캐러셀 슬라이더',
    englishTitle: 'Cost Calculator & Carousel Slider',
    category: 'slider',
    badge: '인터랙티브 제어',
    summary: '슬라이더 값 조절에 따른 실시간 비용/견적 동적 계산기 및 스와이프 기능 캐러셀 쇼케이스 블록입니다.',
    description: 'SaaS 요금제 계산, 팀원 수/서버 용량 조절, 제품 쇼케이스에 필수적인 슬라이더 제어 블록입니다. 실시간 값 반영과 매끄러운 썸(Thumb) 트랙 애니메이션을 제공합니다.',
    features: [
      '팀 멤버 수(1~200명) & 스토리지 용량(10GB~2TB) 듀얼 슬라이더 제어',
      '월 예상 결제 금액 및 연간 결제 시 절감액 실시간 동적 계산',
      '커스텀 레인지 트랙 스타일링 (진행률 백분율 연동)',
      '미디어/피처 캐러셀 슬라이더 탭 내장 (좌우 스텝 이동 및 인디케이터)',
      '모바일 터치 및 키보드 화살표 정밀 조정 지원'
    ],
    tokensUsed: ['--accent-primary', '--accent-hover', '--bg-secondary', '--atom-radius-full'],
    codeSnippets: {
      react: `import React, { useState } from 'react';

export function CostSimulatorBlock() {
  const [users, setUsers] = useState(15);
  const [storage, setStorage] = useState(250);

  const monthlyPrice = (users * 8) + Math.round(storage * 0.15);

  return (
    <div className="p-6 rounded-2xl bg-(--bg-primary) border border-(--border-subtle) max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-6">사용량 맞춤 실시간 견적</h3>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span>활성 팀원 수</span>
            <span className="text-(--accent-primary)">{users} 명</span>
          </div>
          <input type="range" min="1" max="100" value={users} onChange={e => setUsers(Number(e.target.value))} className="w-full accent-(--accent-primary)" />
        </div>
        <div>
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span>클라우드 저장 공간</span>
            <span className="text-(--accent-primary)">{storage} GB</span>
          </div>
          <input type="range" min="10" max="1000" step="10" value={storage} onChange={e => setStorage(Number(e.target.value))} className="w-full accent-(--accent-primary)" />
        </div>
        <div className="pt-4 border-t border-(--border-subtle) flex justify-between items-center">
          <div>
            <span className="text-xs text-(--text-muted)">월 예상 결제 금액</span>
            <div className="text-3xl font-extrabold text-(--text-primary)">\${monthlyPrice} <span className="text-sm font-normal text-(--text-secondary)">/월</span></div>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-(--accent-primary) text-white font-semibold text-sm">시작하기</button>
        </div>
      </div>
    </div>
  );
}`,
      htmlCss: `<div class="atom-slider-calculator">
  <h3>사용량 기반 요금 계산기</h3>
  <div class="slider-group">
    <label>팀원 수: <span id="user-count">15명</span></label>
    <input type="range" min="1" max="100" value="15" class="atom-range" />
  </div>
  <div class="total-summary">
    <span>예상 요금:</span>
    <strong class="total-amount">$157 /월</strong>
  </div>
</div>`
    }
  },
  {
    id: 'pricing-table',
    title: '플랜 비교 & 가격 정책 UX 블록',
    englishTitle: 'Pricing Matrix & Plan Comparison',
    category: 'pricing',
    badge: '전환율 최적화',
    summary: '월간/연간(20% 할인) 결제 주기 토글, 3티어 플랜 카드, Most Popular 하이라이트 배지, 기능 체크리스트 블록입니다.',
    description: 'B2B/B2C SaaS 서비스의 가입 전환율을 극대화하는 표준 가격 정책 블록입니다. 명확한 시각적 계층 구조와 토큰 연동 하이라이트 카드로 구성되어 있습니다.',
    features: [
      '월간(Monthly) / 연간(Annual -20%) 원클릭 토글 스위치',
      '3단계 티어(Starter, Pro, Enterprise) 비교 구조',
      'Pro 플랜 시각적 하이라이트 (브랜드 보더 및 "인기 플랜" 뱃지)',
      '플랜별 포함/미포함 기능 체크/엑스 리스트',
      '플랜 선택 즉시 피드백 및 원클릭 CTA'
    ],
    tokensUsed: ['--accent-primary', '--accent-hover', '--bg-secondary', '--border-subtle', '--border-strong'],
    codeSnippets: {
      react: `import React, { useState } from 'react';

export function PricingBlock() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="space-y-8">
      <div className="flex justify-center items-center gap-3">
        <span className={\`text-sm \${!annual ? 'font-bold' : 'text-(--text-muted)'}\`}>월간 결제</span>
        <button onClick={() => setAnnual(!annual)} className="w-12 h-6 rounded-full bg-(--accent-primary) p-1 flex items-center">
          <div className={\`w-4 h-4 rounded-full bg-white transition-transform \${annual ? 'translate-x-6' : ''}\`} />
        </button>
        <span className={\`text-sm \${annual ? 'font-bold text-(--accent-primary)' : 'text-(--text-muted)'}\`}>연간 결제 (20% 할인)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pricing Cards */}
      </div>
    </div>
  );
}`,
      htmlCss: `<div class="atom-pricing-section">
  <div class="billing-cycle-switch">
    <span>월간</span>
    <input type="checkbox" id="cycle-toggle" />
    <span>연간 (20% OFF)</span>
  </div>
  <div class="pricing-grid">
    <div class="pricing-card">
      <div class="plan-name">Starter</div>
      <div class="plan-price">$0</div>
    </div>
    <div class="pricing-card highlighted">
      <div class="popular-badge">가장 인기있는 선택</div>
      <div class="plan-name">Pro</div>
      <div class="plan-price">$29</div>
    </div>
  </div>
</div>`
    }
  },
  {
    id: 'metric-stats',
    title: '비즈니스 메트릭 & 4대 KPI 스탯 블록',
    englishTitle: 'Business Metrics & 4-KPI Stats',
    category: 'stats',
    badge: '대시보드 KPI',
    summary: '매출, 활성 유저, 가동률, 전환율 등 핵심 지표 요약 카드와 전주 대비 증감 뱃지, 미니 스파크라인 트렌드 블록입니다.',
    description: '대시보드 메인 화면 상단에 위치하는 필수 컴포넌트로, 경영 지표와 성능 지표를 한눈에 파악할 수 있는 반응형 4분할 그리드입니다.',
    features: [
      '4분할 반응형 KPI 그리드 (데스크톱 4열 / 태블릿 2열 / 모바일 1열)',
      '전주/전월 대비 증감률(+, -) 및 긍정/부정 색상 뱃지',
      '지표별 마이크로 스파크라인(Sparkline) 트렌드 차트',
      '숫자 포맷팅 (통화 단위, 백분율, K/M 접미사)',
      '호버 시 미세한 엘리베이션 및 시각 피드백'
    ],
    tokensUsed: ['--bg-secondary', '--border-subtle', '--atom-success', '--atom-destructive', '--accent-primary'],
    codeSnippets: {
      react: `import React from 'react';

export function MetricStatsBlock() {
  const stats = [
    { label: '총 매출 (ARR)', value: '₩128,450,000', change: '+18.2%', isPos: true },
    { label: '월간 활성 유저 (MAU)', value: '48,290명', change: '+9.4%', isPos: true },
    { label: '전환율 (CVR)', value: '4.82%', change: '-0.3%', isPos: false },
    { label: '시스템 가동률', value: '99.99%', change: '+0.01%', isPos: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="p-5 rounded-2xl bg-(--bg-primary) border border-(--border-subtle) shadow-sm">
          <span className="text-xs text-(--text-muted) font-medium">{s.label}</span>
          <div className="text-2xl font-bold text-(--text-primary) my-2">{s.value}</div>
          <span className={\`text-xs font-semibold px-2 py-0.5 rounded-md \${s.isPos ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}\`}>
            {s.change} 전월 대비
          </span>
        </div>
      ))}
    </div>
  );
}`,
      htmlCss: `<div class="atom-metric-stats-grid">
  <div class="stat-card">
    <div class="stat-title">총 매출 (ARR)</div>
    <div class="stat-value">₩128,450,000</div>
    <span class="badge positive">+18.2%</span>
  </div>
</div>`
    }
  },
  {
    id: 'file-explorer',
    title: '프로덕션 파일 탐색기 & 계층 트리',
    englishTitle: 'Hierarchical File Explorer & Tree',
    category: 'files',
    badge: '파일 매니저',
    summary: '폴더 트리 사이드바, 경로 브레드크럼, 파일 그리드/리스트 뷰, 실시간 파일 미리보기 패널이 통합된 블록입니다.',
    description: '클라우드 스토리지, 개발 IDE 프로젝트 트리, CMS 미디어 라이브러리 등에 즉시 투입 가능한 반응형 파일 탐색 블록입니다. 파일 크기, 확장자별 아이콘, 다중 선택 및 원클릭 복사/다운로드 인터랙션을 제공합니다.',
    features: [
      '좌측 접이식 폴더 계층 트리 (하위 디렉토리 토글 및 파일 카운트)',
      '상단 동적 경로 브레드크럼 (상위 디렉토리 원클릭 이동)',
      '그리드(썸네일/아이콘) ↔ 테이블 상세 리스트 뷰 전환',
      '확장자별(코드/이미지/문서/JSON) 시맨틱 컬러 아이콘 및 배지',
      '우측 파일 실시간 인스펙터 (크기, 수정일, 해시, 코드/내용 프리뷰)'
    ],
    tokensUsed: ['--bg-secondary', '--border-subtle', '--border-strong', '--text-primary', '--accent-primary'],
    codeSnippets: {
      react: `import React, { useState } from 'react';
import { Folder, FileCode, FileText, Image, ChevronRight, ChevronDown } from 'lucide-react';

export function FileExplorerBlock() {
  const [selectedFolder, setSelectedFolder] = useState('src');
  const [selectedFile, setSelectedFile] = useState('tokens.json');

  const files = [
    { name: 'tokens.json', size: '14.2 KB', type: 'json' },
    { name: 'Button.tsx', size: '4.8 KB', type: 'code' },
    { name: 'logo.svg', size: '2.1 KB', type: 'image' },
  ];

  return (
    <div className="flex h-96 rounded-2xl bg-(--bg-primary) border border-(--border-subtle) overflow-hidden">
      {/* Sidebar Tree */}
      <div className="w-56 border-r border-(--border-subtle) p-3 bg-(--bg-secondary)/40">
        <div className="text-xs font-bold text-(--text-muted) mb-2">PROJECT ROOT</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-(--bg-primary) font-semibold">
            <Folder className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <span>src</span>
          </div>
        </div>
      </div>
      {/* File List */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-3">
          {files.map(f => (
            <div key={f.name} onClick={() => setSelectedFile(f.name)} className={\`p-3 rounded-xl border cursor-pointer \${selectedFile === f.name ? 'border-(--accent-primary) bg-(--accent-primary)/5' : 'border-(--border-subtle)'}\`}>
              <div className="text-sm font-semibold">{f.name}</div>
              <div className="text-xs text-(--text-muted)">{f.size}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
      htmlCss: `<div class="atom-file-explorer">
  <aside class="folder-tree">
    <div class="tree-item active"><span class="folder-icon">📁</span> src</div>
  </aside>
  <main class="file-grid">
    <div class="file-card selected">
      <span class="file-icon">📄</span>
      <span class="file-name">tokens.json</span>
    </div>
  </main>
</div>`
    }
  }
];
