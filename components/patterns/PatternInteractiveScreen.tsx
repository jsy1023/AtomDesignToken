'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Send,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Compass,
  ArrowRightLeft,
  Users,
  Search,
  X,
  Plus,
  Minus,
  Sparkles,
  RefreshCw,
  Phone,
  Navigation2,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Code2,
  Settings,
  Globe,
  Key,
  HelpCircle,
  Save,
  RotateCcw,
  Lock
} from 'lucide-react';

interface PatternInteractiveScreenProps {
  patternId: string;
}

export function PatternInteractiveScreen({ patternId }: PatternInteractiveScreenProps) {
  // SaaS Dashboard State
  const [dashboardFilter, setDashboardFilter] = useState<'7d' | '30d' | '90d'>('7d');

  // Chat Support State
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
    { sender: 'user', text: '배송지 변경은 어떻게 하나요?' },
    { sender: 'bot', text: '주문 상세 페이지에서 [배송지 수정] 버튼을 클릭하시면 즉시 변경 가능합니다.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // KYC OTP State
  const [otp, setOtp] = useState(['1', '8', '4', '', '', '']);
  const [agreedAll, setAgreedAll] = useState(false);

  // Flight Booking State
  const [flightDep, setFlightDep] = useState('서울/인천 (ICN)');
  const [flightArr, setFlightArr] = useState('도쿄/나리타 (NRT)');
  const [passengers, setPassengers] = useState(2);

  // Blog Editor State
  const [blogTitle, setBlogTitle] = useState('차세대 디자인 토큰으로 프론트엔드 생산성 10배 올리기');
  const [autoSavedTime, setAutoSavedTime] = useState('방금 전');

  // Map Location State
  const [selectedPlace, setSelectedPlace] = useState('성수 블루보틀 카페');

  // Onboarding State
  const [onboardingStep, setOnboardingStep] = useState(2);
  const [selectedRole, setSelectedRole] = useState('designer');

  // File Uploader State
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'business_license.pdf', size: '2.4 MB', progress: 100 },
    { name: 'id_card_front.jpg', size: '4.8 MB', progress: 68 }
  ]);

  // Fintech Transfer State
  const [amount, setAmount] = useState('500000');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // E-commerce State
  const [cartCount, setCartCount] = useState(2);
  const unitPrice = 49000;

  // Search Empty State
  const [searchVal, setSearchVal] = useState('존재하지않는쿼리XYZ');

  // Developer Docs State
  const [activeDocNav, setActiveDocNav] = useState('quickstart');
  const [copiedDocSnippet, setCopiedDocSnippet] = useState(false);

  // Complex Form Settings State
  const [activeFormTab, setActiveFormTab] = useState<'general' | 'security' | 'webhooks' | 'danger'>('general');
  const [formValues, setFormValues] = useState({
    projectName: 'acme-commerce-api',
    environment: 'production',
    customDomain: 'api.acme-store.com',
    enable2FA: true,
    sessionTimeout: '30m',
    enableWebhooks: true,
    webhookUrl: 'https://api.acme.com/v1/events',
    secretKey: 'whsec_9948291034821',
    eventOrders: true,
    eventUsers: false,
    deleteConfirmText: '',
  });
  const [initialFormValues, setInitialFormValues] = useState({ ...formValues });
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isFormDirty = JSON.stringify(formValues) !== JSON.stringify(initialFormValues);

  const domainError =
    formValues.customDomain && !formValues.customDomain.includes('.')
      ? '유효한 도메인 주소(예: api.example.com) 형식이 아닙니다.'
      : '';

  const handleSaveForm = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setInitialFormValues({ ...formValues });
      setIsSavedFeedback(true);
      setTimeout(() => setIsSavedFeedback(false), 2500);
    }, 600);
  };

  const handleResetForm = () => {
    setFormValues({ ...initialFormValues });
  };

  return (
    <div className="w-full h-full text-neutral-900 dark:text-neutral-100 p-4 overflow-y-auto">
      {/* 1. SaaS Dashboard (Web) */}
      {patternId === 'saas-dashboard' && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <h2 className="text-lg font-bold">비즈니스 KPI 대시보드</h2>
              <p className="text-xs text-neutral-500">실시간 성과 지표 및 전환율 모니터링</p>
            </div>
            <div className="inline-flex rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1 text-xs font-semibold">
              {(['7d', '30d', '90d'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setDashboardFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    dashboardFilter === filter
                      ? 'bg-white dark:bg-neutral-900 shadow-sm text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  최근 {filter}
                </button>
              ))}
            </div>
          </div>

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: '월간 반복 매출 (MRR)', val: '₩48,250,000', change: '+14.8%', up: true },
              { label: '활성 사용자 (MAU)', val: '128,420명', change: '+8.2%', up: true },
              { label: '유료 플랜 전환율', val: '4.65%', change: '+0.8%', up: true },
              { label: '고객 이탈률 (Churn)', val: '1.12%', change: '-0.3%', up: false }
            ].map((kpi, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800">
                <span className="text-[11px] font-medium text-neutral-500 block mb-1">{kpi.label}</span>
                <div className="text-lg font-black text-neutral-900 dark:text-white">{kpi.val}</div>
                <div className={`mt-1 text-[11px] font-bold flex items-center gap-1 ${kpi.up ? 'text-emerald-500' : 'text-blue-500'}`}>
                  <TrendingUp className="w-3 h-3" />
                  <span>전주 대비 {kpi.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Trend Bar Chart & Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-bold block mb-3">일별 매출 추이</span>
              <div className="h-32 flex items-end gap-2 pt-4 px-2">
                {[45, 60, 55, 75, 90, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div style={{ height: `${h}%` }} className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-500"></div>
                    <span className="text-[10px] text-neutral-400">10/{i + 8}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
              <span className="text-xs font-bold block mb-2">실시간 상태 현황</span>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span>API 서버 가동률</span>
                  <span className="font-bold text-emerald-500">99.98%</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span>초당 요청 수 (RPS)</span>
                  <span className="font-bold text-blue-500">4,820 req/s</span>
                </div>
              </div>
              <button className="w-full py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition mt-3">
                전체 리포트 내보내기 (CSV)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Chat Support (Mobile) */}
      {patternId === 'chat-support' && (
        <div className="flex flex-col h-full max-w-sm mx-auto justify-between">
          {/* Header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">AI</div>
              <span className="absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900"></span>
            </div>
            <div>
              <div className="font-bold text-xs">고객지원 어시스턴트</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">상담 가능 · 평균 응답 1초</div>
            </div>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2.5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-none border border-neutral-200/80 dark:border-neutral-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ Chips */}
          <div className="flex gap-1.5 overflow-x-auto py-2">
            {['반품 신청 방법', '배송 현황 조회', '쿠폰 적용 오류'].map((chip) => (
              <button
                key={chip}
                onClick={() => setMessages([...messages, { sender: 'user', text: chip }])}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-[11px] font-medium text-neutral-600 dark:text-neutral-300"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="flex gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && chatInput.trim()) {
                  setMessages([...messages, { sender: 'user', text: chatInput }]);
                  setChatInput('');
                }
              }}
              className="flex-1 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                if (chatInput.trim()) {
                  setMessages([...messages, { sender: 'user', text: chatInput }]);
                  setChatInput('');
                }
              }}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. KYC Verification (Mobile) */}
      {patternId === 'kyc-verification' && (
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Step 2 of 3</span>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">신분증 및 본인인증</h2>
            <p className="text-xs text-neutral-500">안전한 금융 거래를 위해 주민등록증 또는 운전면허증을 준비해주세요.</p>
          </div>

          {/* ID Scanner Box */}
          <div className="border-2 border-dashed border-blue-400 dark:border-blue-600/60 rounded-2xl p-6 bg-blue-50/40 dark:bg-blue-950/20 text-center flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">신분증 앞면 촬영하기</span>
            <p className="text-[11px] text-neutral-400 leading-tight">빛 반사에 주의하며 프레임 영역에 맞춰주세요.</p>
            <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold shadow-sm mt-1">
              카메라 실행
            </button>
          </div>

          {/* 6-slot OTP Code */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold">휴대폰 SMS 인증번호 (6자리)</label>
              <span className="text-xs font-semibold text-rose-500">02:45</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {otp.map((slot, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={slot}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[i] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="h-10 text-center text-sm font-bold rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>

          {/* Agreement Check */}
          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={agreedAll}
              onChange={(e) => setAgreedAll(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span className="font-semibold">[필수] 본인확인 및 고유식별정보 처리 동의</span>
          </label>

          <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20">
            인증 완료하고 다음 단계
          </button>
        </div>
      )}

      {/* 4. Blog Editor (Web) */}
      {patternId === 'blog-editor' && (
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-neutral-400 font-medium">자동 저장됨 ({autoSavedTime})</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800">
                임시저장
              </button>
              <button className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700">
                발행하기
              </button>
            </div>
          </div>

          {/* Formatting Bar */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-300">
            {['H1', 'H2', 'B', 'I', 'U', 'Quote', 'Code', 'Link', 'Image'].map((fmt) => (
              <button key={fmt} className="px-2 py-1 rounded hover:bg-white dark:hover:bg-neutral-700 transition">
                {fmt}
              </button>
            ))}
          </div>

          {/* Editor Body */}
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            className="text-xl font-black bg-transparent border-none focus:outline-none placeholder-neutral-400"
            placeholder="제목을 입력하세요..."
          />
          <textarea
            rows={5}
            defaultValue="디자인 토큰은 색상, 타이포그래피, 간격 등의 디자인 의도를 표준화된 변수로 정의하여 개발자와 디자이너 간의 협업 장벽을 제거합니다. W3C DTCG 표준을 준수하면 프레임워크와 상관없이 단일 진실 공급원(SSOT)을 유지할 수 있습니다."
            className="w-full flex-1 bg-transparent border-none text-xs leading-relaxed focus:outline-none resize-none placeholder-neutral-400"
          ></textarea>
        </div>
      )}

      {/* 5. Map Location (Mobile) */}
      {patternId === 'map-location' && (
        <div className="relative h-full flex flex-col justify-between rounded-xl overflow-hidden bg-emerald-50 dark:bg-emerald-950/40 border border-neutral-200 dark:border-neutral-800">
          {/* Top Search Bar */}
          <div className="p-3 z-10">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800">
              <Search className="w-4 h-4 text-neutral-400" />
              <input type="text" placeholder="장소, 주소, 매장 검색" className="w-full text-xs bg-transparent focus:outline-none" />
            </div>
          </div>

          {/* Map Center Pins */}
          <div className="flex-1 relative flex items-center justify-center">
            <div className="absolute flex flex-col items-center animate-bounce">
              <div className="px-2 py-1 rounded-md bg-neutral-900 text-white text-[10px] font-bold shadow-lg mb-1 whitespace-nowrap">
                {selectedPlace}
              </div>
              <div className="w-5 h-5 rounded-full bg-rose-500 ring-4 ring-rose-500/20 shadow-md flex items-center justify-center text-white text-[10px]">
                ★
              </div>
            </div>
          </div>

          {/* Sliding Bottom Sheet */}
          <div className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 p-4 rounded-t-2xl shadow-2xl z-10 flex flex-col gap-2.5">
            <div className="w-8 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto"></div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">{selectedPlace}</h3>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">● 영업 중 (21:00 마감)</span>
              </div>
              <span className="text-xs font-bold text-blue-600">320m</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button className="py-2 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5">
                <Navigation2 className="w-3.5 h-3.5" />
                <span>길찾기</span>
              </button>
              <button className="py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold flex items-center justify-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>전화걸기</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Flight Booking (Web) */}
      {patternId === 'flight-booking' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">왕복</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-500">편도</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-500">다구간</span>
          </div>

          {/* Route Swap Bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
            <div className="md:col-span-2 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <span className="text-[10px] text-neutral-400 font-medium block">출발지</span>
              <span className="text-sm font-bold">{flightDep}</span>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  const t = flightDep;
                  setFlightDep(flightArr);
                  setFlightArr(t);
                }}
                className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition active:rotate-180"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="md:col-span-2 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <span className="text-[10px] text-neutral-400 font-medium block">도착지</span>
              <span className="text-sm font-bold">{flightArr}</span>
            </div>
          </div>

          {/* Date & Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 font-medium block">가는날 - 오는날</span>
                <span className="text-xs font-bold">2026.11.12 (목) - 2026.11.16 (월)</span>
              </div>
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>

            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 font-medium block">탑승객 수</span>
                <span className="text-xs font-bold">성인 {passengers}명 · 일반석</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-6 h-6 rounded bg-white dark:bg-neutral-700 flex items-center justify-center font-bold text-xs border"
                >
                  -
                </button>
                <button
                  onClick={() => setPassengers(passengers + 1)}
                  className="w-6 h-6 rounded bg-white dark:bg-neutral-700 flex items-center justify-center font-bold text-xs border"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20">
            최저가 항공권 검색하기 (26건 발견)
          </button>
        </div>
      )}

      {/* 7. Onboarding Wizard (Mobile) */}
      {patternId === 'onboarding-wizard' && (
        <div className="flex flex-col gap-4 max-w-sm mx-auto justify-between h-full">
          <div>
            <div className="flex justify-between items-center mb-1 text-xs text-neutral-400">
              <span>온보딩 단계</span>
              <span className="font-bold text-blue-600">{onboardingStep}/3단계</span>
            </div>
            <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div style={{ width: `${(onboardingStep / 3) * 100}%` }} className="h-full bg-blue-600 rounded-full transition-all"></div>
            </div>

            <h2 className="text-base font-bold text-neutral-900 dark:text-white mt-4">어떤 역할을 주로 담당하시나요?</h2>
            <p className="text-xs text-neutral-500 mt-1">선택하신 직무에 꼭 맞는 토큰 프리셋과 UX 패턴을 추천해 드립니다.</p>
          </div>

          {/* Role Cards */}
          <div className="flex flex-col gap-2">
            {[
              { id: 'designer', title: 'UI/UX 디자이너', desc: '피그마와 스타일 토큰을 실시간 동기화' },
              { id: 'developer', title: '프론트엔드 엔지니어', desc: 'React, Vue, 바닐라 CSS 즉시 임포트' },
              { id: 'pm', title: '프로덕트 매니저', desc: 'AI 프롬프트로 기획서와 시제품 신속 구현' }
            ].map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedRole === role.id
                    ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="font-bold text-xs">{role.title}</div>
                <div className="text-[11px] text-neutral-500">{role.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setOnboardingStep(Math.max(1, onboardingStep - 1))}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold"
            >
              이전
            </button>
            <button
              onClick={() => setOnboardingStep(Math.min(3, onboardingStep + 1))}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
            >
              다음 단계로
            </button>
          </div>
        </div>
      )}

      {/* 8. File Uploader (Web) */}
      {patternId === 'file-uploader' && (
        <div className="flex flex-col gap-4">
          <div className="border-2 border-dashed border-blue-400 dark:border-blue-600/70 rounded-2xl p-8 bg-blue-50/30 dark:bg-blue-950/20 text-center flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold">파일을 이곳으로 드래그하거나 클릭하여 업로드</div>
            <span className="text-xs text-neutral-400">PDF, JPG, PNG 파일 (개별 최대 20MB)</span>
          </div>

          {/* Uploaded File List */}
          <div className="flex flex-col gap-2">
            {uploadedFiles.map((f, i) => (
              <div key={i} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-xs font-bold block">{f.name}</span>
                    <span className="text-[10px] text-neutral-400">{f.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div style={{ width: `${f.progress}%` }} className="h-full bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-500">{f.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. Fintech Transfer (Mobile) */}
      {patternId === 'fintech-transfer' && (
        <div className="flex flex-col gap-4 max-w-sm mx-auto justify-between h-full">
          <div>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 flex justify-between items-center mb-3">
              <div>
                <span className="text-[10px] text-neutral-400 block">출금 계좌</span>
                <span className="text-xs font-bold">토스뱅크 · 1002-***-4921</span>
              </div>
              <span className="text-xs font-bold text-emerald-500">잔액 ₩3,450,000</span>
            </div>

            <div className="text-center py-4">
              <span className="text-[11px] text-neutral-400 font-medium">보낼 금액</span>
              <div className="text-3xl font-black text-neutral-900 dark:text-white mt-1">
                ₩{Number(amount).toLocaleString()}
              </div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1 block">
                오십만 원
              </span>
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="flex gap-2">
            {['+1만', '+5만', '+10만', '전액'].map((q) => (
              <button
                key={q}
                className="flex-1 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                {q}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
          >
            김토스님에게 송금하기 (수수료 면제)
          </button>
        </div>
      )}

      {/* 10. E-commerce Checkout (Mobile) */}
      {patternId === 'ecommerce-checkout' && (
        <div className="flex flex-col gap-3 max-w-sm mx-auto justify-between h-full">
          <div>
            <h3 className="font-bold text-sm mb-2">장바구니 주문서</h3>
            {/* Item Card */}
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 flex gap-3">
              <div className="w-14 h-14 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-400">
                ITEM
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <span className="text-xs font-bold">프리미엄 미니멀 무선 키보드</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600">₩{(unitPrice * cartCount).toLocaleString()}</span>
                  <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 rounded border px-1">
                    <button onClick={() => setCartCount(Math.max(1, cartCount - 1))} className="text-xs px-1">-</button>
                    <span className="text-xs font-bold px-1">{cartCount}</span>
                    <button onClick={() => setCartCount(cartCount + 1)} className="text-xs px-1">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-neutral-500">
              <span>상품금액</span>
              <span>₩{(unitPrice * cartCount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>배송비</span>
              <span className="text-emerald-500 font-semibold">무료 배송</span>
            </div>
            <div className="flex justify-between font-bold text-sm pt-2 border-t border-neutral-200 dark:border-neutral-700">
              <span>총 결제금액</span>
              <span className="text-blue-600 font-black">₩{(unitPrice * cartCount).toLocaleString()}</span>
            </div>
          </div>

          {/* Sticky Pay CTA */}
          <button className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-lg">
            ₩{(unitPrice * cartCount).toLocaleString()} 원클릭 간편결제
          </button>
        </div>
      )}

      {/* 11. Search Empty (Web) */}
      {patternId === 'search-empty' && (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchVal && (
              <button
                onClick={() => setSearchVal('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Zero Results Feedback */}
          <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 text-center flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm">'{searchVal}'에 대한 검색 결과가 없습니다</h3>
            <p className="text-xs text-neutral-400 max-w-xs">
              단어의 철자가 정확한지 확인하시거나, 아래 추천 인기 키워드를 확인해보세요.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
              <span className="text-[11px] text-neutral-400 mr-1 font-semibold">추천 검색어:</span>
              {['디자인 토큰', '반응형 헤더', 'SaaS 대시보드', '토스 송금'].map((rec) => (
                <button
                  key={rec}
                  onClick={() => setSearchVal(rec)}
                  className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100"
                >
                  {rec}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 12. Developer Docs (Web) */}
      {patternId === 'developer-docs' && (
        <div className="flex gap-4 h-full">
          {/* Left Documentation Sidebar (Navigation Tree) */}
          <div className="w-48 shrink-0 bg-neutral-50 dark:bg-neutral-850/60 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-200/60 dark:border-neutral-700">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-neutral-900 dark:text-white">DOCS v1.2</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">시작하기</span>
              {[
                { id: 'quickstart', label: '빠른 시작 가이드' },
                { id: 'installation', label: 'CLI 라이브러리 설치' },
                { id: 'dtcg-spec', label: 'W3C 토큰 표준 규격' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveDocNav(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition font-medium ${
                    activeDocNav === item.id
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-1 pt-1 border-t border-neutral-200/50 dark:border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">API 레퍼런스</span>
              {[
                { id: 'button-api', label: 'Button API' },
                { id: 'input-api', label: 'Input API' },
                { id: 'dialog-api', label: 'Modal / Dialog' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveDocNav(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition font-medium ${
                    activeDocNav === item.id
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Center Main Content Area */}
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4 text-xs">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
              <span>Docs</span>
              <span>/</span>
              <span>Getting Started</span>
              <span>/</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">Quickstart</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-neutral-900 dark:text-white">
                  개발자 빠른 시작 가이드 (Quickstart)
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                  Latest v1.2.4
                </span>
              </div>
              <p className="text-neutral-500 mt-1 leading-relaxed">
                AtomSystem은 React, Vue, 바닐라 웹 등 모든 프론트엔드 환경에서 디자인 토큰과 UI 컴포넌트를 즉시 바인딩할 수 있도록 표준 CSS 변수와 사전 컴파일된 스타일 딕셔너리를 제공합니다.
              </p>
            </div>

            {/* CLI Installation Box with Copy */}
            <div className="p-3.5 rounded-xl bg-neutral-900 text-white flex flex-col gap-2 font-mono">
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-1.5 border-b border-neutral-800">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Terminal CLI
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('npx atomsystem init');
                    setCopiedDocSnippet(true);
                    setTimeout(() => setCopiedDocSnippet(false), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-[10px] text-neutral-300 hover:text-white transition"
                >
                  {copiedDocSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedDocSnippet ? '복사완료!' : '복사'}</span>
                </button>
              </div>
              <div className="text-emerald-400 text-xs">
                $ npx atomsystem init --preset toss
              </div>
            </div>

            {/* Code Block Example */}
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">2. 컴포넌트 임포트 및 사용</span>
              <div className="p-3.5 rounded-xl bg-neutral-900 text-neutral-200 font-mono text-[11px] leading-relaxed overflow-x-auto">
                <div className="text-neutral-400">// React / Next.js 프로젝트</div>
                <div><span className="text-purple-400">import</span> &#123; Button, Input &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">'@atomsystem/ui'</span>;</div>
                <div className="mt-1"><span className="text-blue-400">&lt;Button</span> variant=<span className="text-emerald-400">"primary"</span> size=<span className="text-emerald-400">"lg"</span>&gt;</div>
                <div className="pl-4">지금 시작하기</div>
                <div><span className="text-blue-400">&lt;/Button&gt;</span></div>
              </div>
            </div>

            {/* API Parameters Spec Table */}
            <div className="flex flex-col gap-2">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">Button Props 규격</span>
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead className="bg-neutral-100 dark:bg-neutral-850 text-neutral-600 dark:text-neutral-300 font-bold border-b border-neutral-200 dark:border-neutral-800">
                    <tr>
                      <th className="p-2">Property</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Default</th>
                      <th className="p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    <tr>
                      <td className="p-2 font-mono font-bold text-blue-600">variant</td>
                      <td className="p-2 font-mono text-neutral-400">'primary' | 'secondary' | 'outline'</td>
                      <td className="p-2 font-mono">'primary'</td>
                      <td className="p-2 text-neutral-600 dark:text-neutral-400">버튼 시각적 스타일 배리언트</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-blue-600">loading</td>
                      <td className="p-2 font-mono text-neutral-400">boolean</td>
                      <td className="p-2 font-mono">false</td>
                      <td className="p-2 text-neutral-600 dark:text-neutral-400">로딩 스피너 및 비활성화 상태 토글</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right TOC Column (On this page) */}
          <div className="w-40 shrink-0 border-l border-neutral-200/80 dark:border-neutral-800 pl-3 flex flex-col gap-2 text-xs">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">On this page</span>
            <ul className="flex flex-col gap-1.5 text-[11px]">
              <li className="font-bold text-blue-600 dark:text-blue-400 cursor-pointer">빠른 시작 개요</li>
              <li className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer">1. CLI 라이브러리 설치</li>
              <li className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer">2. 컴포넌트 임포트</li>
              <li className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer">3. Button Props 규격</li>
            </ul>
          </div>
        </div>
      )}

      {/* 13. Complex Form Settings (Web) */}
      {patternId === 'complex-form-settings' && (
        <div className="relative flex flex-col h-full gap-4 text-xs">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  엔터프라이즈 프로젝트 환경설정
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Best UX Form
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                섹션 청킹, 점진적 공개, 인라인 유효성 검사, 하단 플로팅 세이브 바가 결합된 모범 사례입니다.
              </p>
            </div>

            {/* Save Status Badge */}
            <div className="flex items-center gap-1.5 text-[11px]">
              {isSavedFeedback ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  변경사항이 저장되었습니다!
                </span>
              ) : isFormDirty ? (
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                  <AlertCircle className="w-3.5 h-3.5" />
                  저장되지 않은 변경사항 있음
                </span>
              ) : (
                <span className="flex items-center gap-1 text-neutral-400 px-2 py-1">
                  <Check className="w-3 h-3" />
                  모든 변경사항 최신 동기화됨
                </span>
              )}
            </div>
          </div>

          {/* 2-Column Section Layout */}
          <div className="flex-1 flex gap-5 overflow-hidden">
            {/* Left Nav: Section Chunking */}
            <div className="w-44 shrink-0 flex flex-col gap-1 border-r border-neutral-200/80 dark:border-neutral-800 pr-3">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1 px-2">
                설정 카테고리
              </span>
              {[
                { id: 'general', label: '일반 설정', icon: Settings },
                { id: 'security', label: '보안 & 2FA', icon: Lock },
                { id: 'webhooks', label: '웹훅 & 이벤트', icon: Globe },
                { id: 'danger', label: '위험 구역', icon: AlertCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeFormTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFormTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left font-medium transition text-xs ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                    } ${tab.id === 'danger' && !isActive ? 'hover:text-rose-500' : ''}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Form Fields Area */}
            <div className="flex-1 overflow-y-auto pr-2 pb-16 space-y-5">
              {/* Tab 1: General Settings */}
              {activeFormTab === 'general' && (
                <div className="space-y-4">
                  {/* Field 1: Project Name */}
                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-neutral-900 dark:text-neutral-100">
                        프로젝트 식별자 (Project Name)
                      </label>
                      <span className="text-[10px] font-mono text-neutral-400">필수</span>
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      API 엔드포인트와 내부 리소스 네임스페이스에 고유하게 사용되는 식별자입니다.
                    </p>
                    <input
                      type="text"
                      value={formValues.projectName}
                      onChange={(e) =>
                        setFormValues({ ...formValues, projectName: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Field 2: Environment Card Selection */}
                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2.5">
                    <label className="font-bold text-neutral-900 dark:text-neutral-100 block">
                      배포 환경 (Deployment Environment)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'production', name: 'Production', desc: '실서비스 및 SLA 99.9%' },
                        { id: 'staging', name: 'Staging', desc: '사전 QA 검증 환경' },
                        { id: 'development', name: 'Development', desc: '로컬 개발 및 샌드박스' },
                      ].map((env) => (
                        <button
                          key={env.id}
                          type="button"
                          onClick={() => setFormValues({ ...formValues, environment: env.id })}
                          className={`p-2.5 rounded-xl border text-left transition ${
                            formValues.environment === env.id
                              ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold shadow-xs'
                              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                          }`}
                        >
                          <div className="font-bold text-xs">{env.name}</div>
                          <div className="text-[10px] text-neutral-400 font-normal mt-0.5 line-clamp-1">
                            {env.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field 3: Custom Domain with Real-time Inline Validation */}
                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <label className="font-bold text-neutral-900 dark:text-neutral-100">
                          커스텀 도메인 (Custom Domain)
                        </label>
                        <span className="text-[10px] text-neutral-400">(선택)</span>
                      </div>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        CNAME DNS 레코드 안내
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formValues.customDomain}
                        onChange={(e) =>
                          setFormValues({ ...formValues, customDomain: e.target.value })
                        }
                        placeholder="예: api.yourcompany.com"
                        className={`w-full px-3 py-2 text-xs rounded-lg border font-mono transition ${
                          domainError
                            ? 'border-rose-500 bg-rose-50/30 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 focus:ring-rose-500'
                            : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 text-neutral-900 dark:text-neutral-100 focus:ring-blue-500'
                        } focus:outline-none focus:ring-2`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {domainError ? (
                          <AlertCircle className="w-4 h-4 text-rose-500" />
                        ) : formValues.customDomain ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : null}
                      </div>
                    </div>
                    {/* Inline Error or Helper */}
                    {domainError ? (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
                        {domainError}
                      </p>
                    ) : (
                      <p className="text-[11px] text-neutral-400">
                        HTTPS SSL 인증서가 무료로 자동 발급 및 갱신됩니다.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Security & 2FA */}
              {activeFormTab === 'security' && (
                <div className="space-y-4">
                  {/* 2FA Toggle Row */}
                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        조직원 2단계 인증(2FA) 강제
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        모든 팀원이 로그인 시 OTP 또는 하드웨어 보안키를 필수로 인증합니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormValues({ ...formValues, enable2FA: !formValues.enable2FA })
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        formValues.enable2FA ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                          formValues.enable2FA ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Session Timeout */}
                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
                    <label className="font-bold text-neutral-900 dark:text-neutral-100 block">
                      유휴 세션 자동 로그아웃 시간
                    </label>
                    <select
                      value={formValues.sessionTimeout}
                      onChange={(e) =>
                        setFormValues({ ...formValues, sessionTimeout: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="15m">15분 (가장 엄격)</option>
                      <option value="30m">30분 (권장)</option>
                      <option value="1h">1시간</option>
                      <option value="8h">8시간 (근무 시간)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Tab 3: Webhooks (Progressive Disclosure Example) */}
              {activeFormTab === 'webhooks' && (
                <div className="space-y-4">
                  {/* Master Toggle */}
                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-emerald-500" />
                        실시간 웹훅(Webhooks) 이벤트 발송
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        주문, 결제, 회원 상태 변경 시 외부 서버로 HTTP POST 요청을 보냅니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormValues({
                          ...formValues,
                          enableWebhooks: !formValues.enableWebhooks,
                        })
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        formValues.enableWebhooks
                          ? 'bg-emerald-600'
                          : 'bg-neutral-300 dark:bg-neutral-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                          formValues.enableWebhooks ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Dependent Conditional Fields (Progressive Disclosure) */}
                  {formValues.enableWebhooks ? (
                    <div className="p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3.5 animate-fade-in">
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>웹훅 상세 엔드포인트 설정 (활성화됨)</span>
                      </div>

                      {/* Webhook Endpoint URL */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                          수신 엔드포인트 URL (Webhook Endpoint)
                        </label>
                        <input
                          type="text"
                          value={formValues.webhookUrl}
                          onChange={(e) =>
                            setFormValues({ ...formValues, webhookUrl: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      {/* Secret Signing Key */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                            서명 검증 시크릿 키 (Signing Secret)
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(formValues.secretKey);
                              alert('시크릿 키가 복사되었습니다!');
                            }}
                            className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            복사
                          </button>
                        </div>
                        <input
                          type="text"
                          readOnly
                          value={formValues.secretKey}
                          className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed"
                        />
                      </div>

                      {/* Event Subscriptions Checkboxes */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 block">
                          구독할 이벤트 트리거
                        </span>
                        <div className="flex items-center gap-4 text-xs">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formValues.eventOrders}
                              onChange={(e) =>
                                setFormValues({ ...formValues, eventOrders: e.target.checked })
                              }
                              className="rounded border-neutral-300 text-emerald-600"
                            />
                            <span>order.created / order.paid</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formValues.eventUsers}
                              onChange={(e) =>
                                setFormValues({ ...formValues, eventUsers: e.target.checked })
                              }
                              className="rounded border-neutral-300 text-emerald-600"
                            />
                            <span>user.signup / user.deleted</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 text-center text-[11px] text-neutral-400 py-6">
                      웹훅 기능을 활성화하면 엔드포인트 URL 및 시크릿 키 설정이 노출됩니다.
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Danger Zone (Safeguard Example) */}
              {activeFormTab === 'danger' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
                      <AlertCircle className="w-4 h-4" />
                      <span>프로젝트 영구 삭제 (Danger Zone)</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      이 작업은 즉시 모든 프로덕션 데이터베이스, API 키, 결제 연동 내역을 삭제하며 되돌릴 수 없습니다.
                    </p>
                    <div className="space-y-1.5 pt-1">
                      <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                        확인을 위해 <span className="font-mono text-rose-600 font-bold">delete acme-commerce-api</span> 를 입력하세요:
                      </label>
                      <input
                        type="text"
                        value={formValues.deleteConfirmText}
                        onChange={(e) =>
                          setFormValues({ ...formValues, deleteConfirmText: e.target.value })
                        }
                        placeholder="delete acme-commerce-api"
                        className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-rose-300 dark:border-rose-900 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={formValues.deleteConfirmText !== 'delete acme-commerce-api'}
                      className="w-full py-2 rounded-lg bg-rose-600 text-white font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-700 transition"
                    >
                      프로젝트 영구 삭제 확정
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating Sticky Unsaved Changes Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 bg-neutral-900/95 dark:bg-neutral-950/95 text-white rounded-xl shadow-2xl border border-neutral-700 flex items-center justify-between transition-all duration-300 backdrop-blur-md ${
              isFormDirty
                ? 'translate-y-0 opacity-100 pointer-events-auto'
                : 'translate-y-12 opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-neutral-200">
                수정된 변경사항이 있습니다. 저장하지 않으면 변경 내용이 유실됩니다.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition"
              >
                되돌리기 (Reset)
              </button>
              <button
                type="button"
                onClick={handleSaveForm}
                disabled={isSaving || !!domainError}
                className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>저장 중...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>변경사항 저장</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
