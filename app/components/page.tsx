'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  Search,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Bell,
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Layers,
  Layout,
  MessageSquare,
  FormInput,
  Eye,
  Info,
  Terminal,
  Code2
} from 'lucide-react';

type ComponentCategory = 'all' | 'form' | 'feedback' | 'navigation' | 'data';

interface ComponentItem {
  id: string;
  name: string;
  category: ComponentCategory;
  source: 'shadcn + bootstrap';
  description: string;
  htmlSnippet: string;
  reactSnippet: string;
  render: (copiedId: string | null, onCopy: (id: string, text: string) => void) => React.ReactNode;
}

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal / Sheet interactive demo state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [checkboxState, setCheckboxState] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'password' | 'settings'>('account');
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);
  const [sliderVal, setSliderVal] = useState(65);
  const [showAlert, setShowAlert] = useState(true);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const COMPONENTS: ComponentItem[] = [
    // 1. Button (shadcn + Bootstrap Buttons)
    {
      id: 'button',
      name: 'Button (버튼 배리언트)',
      category: 'form',
      source: 'shadcn + bootstrap',
      description: 'Primary, Secondary, Outline, Ghost, Destructive, Loading 등 상태별 버튼 풀세트',
      htmlSnippet: `<button class="atom-btn atom-btn-primary">Primary</button>
<button class="atom-btn atom-btn-secondary">Secondary</button>
<button class="atom-btn atom-btn-outline">Outline</button>
<button class="atom-btn atom-btn-destructive">Destructive</button>`,
      reactSnippet: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition">
            Primary Button
          </button>
          <button className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 font-semibold text-xs border border-neutral-200 dark:border-neutral-700 active:scale-95 transition">
            Secondary
          </button>
          <button className="px-4 py-2 rounded-xl border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 font-semibold text-xs active:scale-95 transition">
            Outline
          </button>
          <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition">
            Destructive
          </button>
          <button className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 font-semibold text-xs cursor-not-allowed opacity-60">
            Disabled
          </button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs inline-flex items-center gap-2 opacity-80 cursor-wait">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>로딩 중...</span>
          </button>
        </div>
      )
    },

    // 2. Input & Form Controls
    {
      id: 'input',
      name: 'Input & Textarea (입력 필드)',
      category: 'form',
      source: 'shadcn + bootstrap',
      description: '아이콘 접두사, 에러 상태 피드백, 텍스트에어리어 등 표준 폼 컨트롤',
      htmlSnippet: `<div class="atom-input-wrapper">
  <input type="text" class="atom-input" placeholder="이메일을 입력하세요" />
  <span class="atom-error-text">유효한 이메일을 입력해주세요.</span>
</div>`,
      reactSnippet: `<Input placeholder="이메일을 입력하세요" error="유효한 이메일을 입력해주세요." />`,
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div>
            <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 block mb-1.5">
              기본 텍스트 인풋
            </label>
            <input 
              type="text" 
              placeholder="홍길동"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                에러 상태 인풋
              </label>
              <span className="text-[10px] text-rose-500">필수 항목</span>
            </div>
            <input 
              type="text" 
              defaultValue="잘못된_이메일_값"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-rose-400 dark:border-rose-800 text-rose-600 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <span className="text-[10px] text-rose-500 mt-1 block">이메일 형식이 올바르지 않습니다.</span>
          </div>
        </div>
      )
    },

    // 3. Selection Controls: Switch, Checkbox, Radio
    {
      id: 'selection',
      name: 'Switch & Checkbox & Radio (선택 컨트롤)',
      category: 'form',
      source: 'shadcn + bootstrap',
      description: '부트스트랩 스위치 토글, shadcn 스타일 체크박스 및 라디오 그룹',
      htmlSnippet: `<label class="atom-switch">
  <input type="checkbox" checked />
  <span class="atom-slider"></span>
</label>`,
      reactSnippet: `<Switch checked={enabled} onChange={setEnabled} />
<Checkbox checked={agreed} onChange={setAgreed} label="약관 동의" />`,
      render: () => (
        <div className="flex flex-wrap items-center gap-8">
          {/* Switch Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSwitchState(!switchState)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                switchState ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  switchState ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-xs font-medium">푸시 알림 수신 ({switchState ? 'ON' : 'OFF'})</span>
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={checkboxState} 
              onChange={(e) => setCheckboxState(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 border-neutral-300 dark:border-neutral-700 focus:ring-blue-500"
            />
            <span className="text-xs font-medium">마케팅 정보 수신 동의</span>
          </label>

          {/* Radio */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="demo-radio" defaultChecked className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs">옵션 A</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="demo-radio" className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs">옵션 B</span>
            </label>
          </div>
        </div>
      )
    },

    // 4. Modal / Dialog (Bootstrap Modal + shadcn Dialog)
    {
      id: 'dialog',
      name: 'Modal / Dialog (모달 & 다이얼로그)',
      category: 'feedback',
      source: 'shadcn + bootstrap',
      description: '백드롭 블러, ESC 키 닫기, 시멘틱 헤더/바디/푸터가 포함된 인터랙티브 모달',
      htmlSnippet: `<div class="atom-modal-backdrop">
  <div class="atom-modal">
    <div class="atom-modal-header"><h3>회원 탈퇴</h3></div>
    <div class="atom-modal-body"><p>정말 탈퇴하시겠습니까?</p></div>
    <div class="atom-modal-footer">
      <button class="atom-btn atom-btn-ghost">취소</button>
      <button class="atom-btn atom-btn-destructive">탈퇴</button>
    </div>
  </div>
</div>`,
      reactSnippet: `<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader><DialogTitle>회원 탈퇴</DialogTitle></DialogHeader>
    <DialogFooter><Button variant="destructive">탈퇴</Button></DialogFooter>
  </DialogContent>
</Dialog>`,
      render: () => (
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition"
          >
            모달 다이얼로그 열기 테스트
          </button>

          {/* Modal Live Overlay */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
              <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">프로젝트 삭제 확인</h4>
                  <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                  삭제된 프로젝트는 복구할 수 없습니다. 계속 진행하시겠습니까?
                </p>
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white shadow"
                  >
                    영구 삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },

    // 5. Drawer / Offcanvas (Sheet)
    {
      id: 'sheet',
      name: 'Sheet / Drawer (바텀시트 & 사이드 드로어)',
      category: 'feedback',
      source: 'shadcn + bootstrap',
      description: '부트스트랩의 오프캔버스(Offcanvas) 및 shadcn Sheet 규격의 모바일 슬라이드 패널',
      htmlSnippet: `<div class="atom-sheet atom-sheet-right open">
  <div class="atom-sheet-content">
    <h3>환경 설정</h3>
  </div>
</div>`,
      reactSnippet: `<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent side="right">...</SheetContent>
</Sheet>`,
      render: () => (
        <div>
          <button
            onClick={() => setIsSheetOpen(true)}
            className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition"
          >
            사이드 드로어(Sheet) 열기
          </button>

          {isSheetOpen && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
              <div className="w-full max-w-xs h-full bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-sm">필터 & 설정 (Drawer)</h4>
                    <button onClick={() => setIsSheetOpen(false)}>
                      <X className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="font-semibold block mb-1 text-neutral-500">가격 범위</span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderVal} 
                        onChange={(e) => setSliderVal(Number(e.target.value))}
                        className="w-full" 
                      />
                      <span className="text-[11px] text-blue-500 font-bold">{sliderVal}%</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsSheetOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  적용 완료
                </button>
              </div>
            </div>
          )}
        </div>
      )
    },

    // 6. Alert & Banner
    {
      id: 'alert',
      name: 'Alert (알림 배너)',
      category: 'feedback',
      source: 'shadcn + bootstrap',
      description: '부트스트랩 alert-dismissible 및 shadcn Callout 알림 규격',
      htmlSnippet: `<div class="atom-alert atom-alert-info">
  <span class="atom-icon">ℹ️</span>
  <div>새로운 기능이 추가되었습니다.</div>
</div>`,
      reactSnippet: `<Alert variant="info" onClose={() => {}}>
  <AlertTitle>공지사항</AlertTitle>
  <AlertDescription>새로운 업데이트가 배포되었습니다.</AlertDescription>
</Alert>`,
      render: () => (
        <div className="space-y-3 w-full">
          {showAlert && (
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 flex items-start justify-between text-xs">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>새로운 <strong>Design Token v2.0</strong> 스펙이 추가되었습니다.</span>
              </div>
              <button onClick={() => setShowAlert(false)} className="text-blue-400 hover:text-blue-600">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>작업이 성공적으로 저장되었습니다.</span>
          </div>
        </div>
      )
    },

    // 7. Tabs
    {
      id: 'tabs',
      name: 'Tabs (탭 내비게이션)',
      category: 'navigation',
      source: 'shadcn + bootstrap',
      description: '세그먼트 컨트롤 형태 및 언더라인형 표준 탭 컴포넌트',
      htmlSnippet: `<div class="atom-tabs">
  <button class="atom-tab active">계정</button>
  <button class="atom-tab">비밀번호</button>
</div>`,
      reactSnippet: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
  </TabsList>
</Tabs>`,
      render: () => (
        <div className="w-full max-w-md">
          <div className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'account' ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-neutral-500'
              }`}
            >
              계정 설정
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'password' ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-neutral-500'
              }`}
            >
              비밀번호 변경
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'settings' ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-neutral-500'
              }`}
            >
              환경설정
            </button>
          </div>
          <div className="p-4 mt-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500">
            현재 탭: <strong className="text-neutral-900 dark:text-white uppercase font-mono">{activeTab}</strong> 화면 활성화
          </div>
        </div>
      )
    },

    // 8. Accordion (Collapse)
    {
      id: 'accordion',
      name: 'Accordion / Collapse (아코디언)',
      category: 'navigation',
      source: 'shadcn + bootstrap',
      description: '부트스트랩 아코디언 및 shadcn 애니메이션 접이식 FAQ 컴포넌트',
      htmlSnippet: `<div class="atom-accordion">
  <div class="atom-accordion-item">
    <button class="atom-accordion-trigger">질문 1</button>
    <div class="atom-accordion-content">답변 내용...</div>
  </div>
</div>`,
      reactSnippet: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>질문 1</AccordionTrigger>
    <AccordionContent>답변 내용...</AccordionContent>
  </AccordionItem>
</Accordion>`,
      render: () => (
        <div className="w-full max-w-lg space-y-2">
          {[
            { q: 'AtomDesignToken은 어떤 프레임워크를 지원하나요?', a: 'React, Vue, Svelte, Angular, 바닐라 HTML/JS 등 CSS를 쓸 수 있는 모든 환경에서 100% 동일하게 동작합니다.' },
            { q: 'shadcn과 어떻게 연동하나요?', a: '컴포넌트의 토큰 값을 tokens.json으로 통일하여 shadcn 및 tailwind와 원활하게 매핑됩니다.' }
          ].map((item, idx) => (
            <div key={idx} className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setAccordionOpen(accordionOpen === idx ? null : idx)}
                className="w-full p-3.5 text-left text-xs font-bold flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-850 transition"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${accordionOpen === idx ? 'rotate-180 text-blue-500' : 'text-neutral-400'}`} />
              </button>
              {accordionOpen === idx && (
                <div className="p-3.5 pt-0 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-850">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    },

    // 9. Card & Data Display
    {
      id: 'card',
      name: 'Card (카드 컴포넌트)',
      category: 'data',
      source: 'shadcn + bootstrap',
      description: '헤더, 이미지, 바디, 액션 버튼 푸터가 정렬된 엔터프라이즈 카드',
      htmlSnippet: `<div class="atom-card">
  <div class="atom-card-header"><h4>제목</h4></div>
  <div class="atom-card-body"><p>내용...</p></div>
  <div class="atom-card-footer"><button>확인</button></div>
</div>`,
      reactSnippet: `<Card>
  <CardHeader><CardTitle>제목</CardTitle></CardHeader>
  <CardContent><p>내용...</p></CardContent>
  <CardFooter><Button>확인</Button></CardFooter>
</Card>`,
      render: () => (
        <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600">
              FEATURED
            </span>
            <span className="text-xs text-neutral-400">1분 전</span>
          </div>
          <h4 className="font-bold text-sm mb-1">Agent-Driven 디자인 토큰</h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
            마크다운으로 디자인 의도를 선언하면, AI가 자동으로 컴포넌트와 토큰을 빌드합니다.
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-xs font-bold text-blue-600">자세히 보기</span>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      )
    },

    // 10. Badge & Status Indicators
    {
      id: 'badge',
      name: 'Badge (배지 & 상태 인디케이터)',
      category: 'data',
      source: 'shadcn + bootstrap',
      description: '부트스트랩 pill 배지, 상태 도트(Dot) 및 카운트 배지',
      htmlSnippet: `<span class="atom-badge atom-badge-primary">NEW</span>
<span class="atom-badge atom-badge-success">활성</span>
<span class="atom-badge atom-badge-warning">대기</span>`,
      reactSnippet: `<Badge variant="primary">NEW</Badge>
<Badge variant="success">활성</Badge>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 border border-blue-200 dark:border-blue-900">
            Primary Pill
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-900 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-200 dark:border-amber-900">
            Pending
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-200 dark:border-rose-900">
            Rejected
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            v0.1.48
          </span>
        </div>
      )
    },

    // 11. Table (Responsive Table)
    {
      id: 'table',
      name: 'Table (데이터 테이블)',
      category: 'data',
      source: 'shadcn + bootstrap',
      description: '부트스트랩의 table-striped / table-hover 및 shadcn 스타일 클린 테이블',
      htmlSnippet: `<table class="atom-table">
  <thead><tr><th>이름</th><th>상태</th><th>역할</th></tr></thead>
  <tbody><tr><td>김민수</td><td>정상</td><td>관리자</td></tr></tbody>
</table>`,
      reactSnippet: `<Table>
  <TableHeader><TableRow><TableHead>이름</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>김민수</TableCell></TableRow></TableBody>
</Table>`,
      render: () => (
        <div className="w-full overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-850 text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-3 font-semibold">이름</th>
                <th className="p-3 font-semibold">상태</th>
                <th className="p-3 font-semibold">역할</th>
                <th className="p-3 font-semibold text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-850/50 transition">
                <td className="p-3 font-bold">이서연</td>
                <td className="p-3"><span className="text-emerald-500 font-bold">● 활성</span></td>
                <td className="p-3 text-neutral-500">리드 디자이너</td>
                <td className="p-3 text-right text-blue-600 font-bold cursor-pointer">편집</td>
              </tr>
              <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-850/50 transition">
                <td className="p-3 font-bold">박준호</td>
                <td className="p-3"><span className="text-amber-500 font-bold">● 대기</span></td>
                <td className="p-3 text-neutral-500">프론트엔드 개발</td>
                <td className="p-3 text-right text-blue-600 font-bold cursor-pointer">편집</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },

    // 12. Skeleton Loading
    {
      id: 'skeleton',
      name: 'Skeleton (스켈레톤 로딩)',
      category: 'feedback',
      source: 'shadcn + bootstrap',
      description: '부트스트랩 placeholder 및 shadcn pulse 스켈레톤 로딩 애니메이션',
      htmlSnippet: `<div class="atom-skeleton atom-skeleton-avatar"></div>
<div class="atom-skeleton atom-skeleton-text"></div>`,
      reactSnippet: `<Skeleton className="w-12 h-12 rounded-full" />
<Skeleton className="w-full h-4" />`,
      render: () => (
        <div className="flex items-center gap-4 w-full max-w-sm">
          <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="w-3/4 h-3.5 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
            <div className="w-1/2 h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
      )
    }
  ];

  const filteredComponents = COMPONENTS.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#090a0f] text-neutral-900 dark:text-neutral-100 flex flex-col justify-between">
      
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-[#090a0f]/80 border-b border-neutral-200/70 dark:border-neutral-800/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>메인으로</span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight">AtomDesignToken</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                Components Gallery
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/patterns" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition">
              UX 패턴 보러가기
            </Link>
            <button
              onClick={() => {
                navigator.clipboard.writeText('npx atomsystem init');
                setCopiedId('cli');
                setTimeout(() => setCopiedId(null), 2000);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-mono text-[11px]"
            >
              <Terminal className="w-3 h-3 text-blue-500" />
              <span>npx atomsystem init</span>
              {copiedId === 'cli' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-60" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-6 py-10 flex-1 flex flex-col gap-8">
        
        {/* Title & Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bootstrap + shadcn/ui Best Practice</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              통합 컴포넌트 라이브러리
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              부트스트랩의 탄탄한 기본기(Grid, Alerts, Modal, Table)와 shadcn/ui의 세련된 모던 인터랙션(Sheet, Switch, Skeleton, Dialog)을 
              AtomDesignToken 시멘틱 토큰으로 통합한 컴포넌트 모음입니다.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="컴포넌트 검색 (Button, Modal, Card...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: '전체 보기' },
            { id: 'form', label: 'Form & Controls' },
            { id: 'feedback', label: 'Feedback & Overlays' },
            { id: 'navigation', label: 'Navigation' },
            { id: 'data', label: 'Data Display' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as ComponentCategory)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-xs text-neutral-400 ml-auto hidden sm:inline">
            총 {filteredComponents.length}개 컴포넌트
          </span>
        </div>

        {/* Component Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredComponents.map((comp) => (
            <div
              key={comp.id}
              className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-neutral-100 dark:border-neutral-850 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white">{comp.name}</h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                      {comp.source}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {comp.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(`${comp.id}-react`, comp.reactSnippet)}
                    className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition text-[11px] font-mono flex items-center gap-1"
                    title="React 코드 복사"
                  >
                    {copiedId === `${comp.id}-react` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>React</span>
                  </button>
                  <button
                    onClick={() => handleCopy(`${comp.id}-html`, comp.htmlSnippet)}
                    className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition text-[11px] font-mono flex items-center gap-1"
                    title="HTML/CSS 복사"
                  >
                    {copiedId === `${comp.id}-html` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>HTML</span>
                  </button>
                </div>
              </div>

              {/* Live Render Area */}
              <div className="p-6 bg-neutral-50/50 dark:bg-neutral-950/40 flex-1 flex items-center justify-center min-h-[140px]">
                {comp.render(copiedId, handleCopy)}
              </div>

              {/* Code Snippet Footer */}
              <div className="px-5 py-3 bg-neutral-100/50 dark:bg-neutral-850/60 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="truncate max-w-md">{comp.htmlSnippet.split('\n')[0]}</span>
                <span className="text-blue-500 font-semibold text-[10px]">Ready to Copy</span>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 bg-white/50 dark:bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">AtomDesignToken Component Engine</span>
            <span> — Bootstrap Reliability × shadcn Sophistication</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">메인으로</Link>
            <Link href="/patterns" className="hover:underline">UX 패턴</Link>
            <span>v0.1.48</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
