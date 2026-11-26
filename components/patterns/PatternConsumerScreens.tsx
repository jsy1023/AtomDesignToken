'use client';

import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Calendar,
  FileCheck,
  Navigation2,
  Phone,
  Search,
  ShieldCheck,
  UploadCloud,
  X,
} from 'lucide-react';
import { Button, Checkbox, Input, Textarea } from '@/components/ui';

export function KycVerificationScreen() {
  const [otp, setOtp] = useState(['1', '8', '4', '', '', '']);
  const [agreedAll, setAgreedAll] = useState(false);

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <div>
        <span className="text-[10px] font-bold text-(--accent-primary) uppercase tracking-wider">Step 2 of 3</span>
        <h2 className="text-base font-bold text-(--text-primary) mt-0.5">신분증 및 본인인증</h2>
        <p className="text-xs text-(--text-secondary)">안전한 금융 거래를 위해 주민등록증 또는 운전면허증을 준비해주세요.</p>
      </div>

      <div className="border-2 border-dashed border-(--accent-primary)/60 rounded-2xl p-6 bg-(--accent-primary)/10 text-center flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-(--accent-primary)/15 text-(--accent-primary) flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold text-(--text-primary)">신분증 앞면 촬영하기</span>
        <p className="text-[11px] text-(--text-muted) leading-tight">빛 반사에 주의하며 프레임 영역에 맞춰주세요.</p>
        <Button variant="outline" size="sm" className="mt-1">카메라 실행</Button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-bold">휴대폰 SMS 인증번호 (6자리)</label>
          <span className="text-xs font-semibold text-(--atom-color-destructive)">02:45</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {otp.map((slot, i) => (
            <Input
              key={i}
              type="text"
              maxLength={1}
              value={slot}
              onChange={(e) => {
                const newOtp = [...otp];
                newOtp[i] = e.target.value;
                setOtp(newOtp);
              }}
              className="h-10 text-center text-sm font-bold"
            />
          ))}
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-(--bg-secondary) border border-(--border-subtle)">
        <Checkbox
          checked={agreedAll}
          onChange={(e) => setAgreedAll(e.target.checked)}
          label="[필수] 본인확인 및 고유식별정보 처리 동의"
        />
      </div>

      <Button variant="primary" size="md" className="w-full font-bold">인증 완료하고 다음 단계</Button>
    </div>
  );
}

export function BlogEditorScreen() {
  const [blogTitle, setBlogTitle] = useState('차세대 디자인 토큰으로 프론트엔드 생산성 10배 올리기');

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between pb-2 border-b border-(--border-subtle)">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-(--atom-color-success)"></span>
          <span className="text-xs text-(--text-muted) font-medium">자동 저장됨 (방금 전)</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">임시저장</Button>
          <Button variant="primary" size="sm" className="font-bold">발행하기</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-(--bg-secondary) text-xs font-bold text-(--text-secondary)">
        {['H1', 'H2', 'B', 'I', 'U', 'Quote', 'Code', 'Link', 'Image'].map((fmt) => (
          <Button key={fmt} variant="ghost" size="sm" className="px-2 py-1 h-auto text-xs font-bold">
            {fmt}
          </Button>
        ))}
      </div>

      <Input
        type="text"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="text-lg sm:text-xl font-bold"
      />
      <Textarea
        rows={5}
        defaultValue="디자인 토큰은 색상, 타이포그래피, 간격 등의 디자인 의도를 표준화된 변수로 정의하여 개발자와 디자이너 간의 협업 장벽을 제거합니다. W3C DTCG 표준을 준수하면 프레임워크와 상관없이 단일 진실 공급원(SSOT)을 유지할 수 있습니다."
        className="w-full flex-1 text-xs"
      />
    </div>
  );
}

export function MapLocationScreen() {
  const selectedPlace = '성수 블루보틀 카페';
  return (
    <div className="relative h-full flex flex-col justify-between rounded-xl overflow-hidden bg-(--atom-color-success)/10 border border-(--border-subtle)">
      <div className="p-3 z-10">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-(--bg-primary) shadow-md border border-(--border-subtle)">
          <Search className="w-4 h-4 text-(--text-muted)" />
          <Input type="text" placeholder="장소, 주소, 매장 검색" className="w-full text-xs" />
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="absolute flex flex-col items-center transition-all duration-300">
          <div className="px-2 py-1 rounded-md bg-(--text-primary) text-(--bg-primary) text-[10px] font-bold shadow-lg mb-1 whitespace-nowrap animate-pulse">
            {selectedPlace}
          </div>
          <div className="w-5 h-5 rounded-full bg-(--atom-color-destructive) ring-4 ring-(--atom-color-destructive)/20 shadow-md flex items-center justify-center text-white text-[10px]">
            ★
          </div>
        </div>
      </div>

      <div className="bg-(--bg-primary) border-t border-(--border-subtle) p-4 rounded-t-2xl shadow-2xl z-10 flex flex-col gap-2.5">
        <div className="w-8 h-1 bg-(--border-strong) rounded-full mx-auto"></div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-sm text-(--text-primary)">{selectedPlace}</h3>
            <span className="text-[11px] text-(--atom-color-success) font-semibold">● 영업 중 (21:00 마감)</span>
          </div>
          <span className="text-xs font-bold text-(--accent-primary)">320m</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <Button variant="primary" size="sm" className="w-full font-bold flex items-center justify-center gap-1.5">
            <Navigation2 className="w-3.5 h-3.5" />
            <span>길찾기</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full font-bold flex items-center justify-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>전화걸기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FlightBookingScreen() {
  const [flightDep, setFlightDep] = useState('서울/인천 (ICN)');
  const [flightArr, setFlightArr] = useState('도쿄/나리타 (NRT)');
  const [passengers, setPassengers] = useState(2);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full bg-(--accent-primary) text-white text-xs font-bold">왕복</span>
        <span className="px-3 py-1 rounded-full bg-(--bg-secondary) text-xs font-semibold text-(--text-secondary)">편도</span>
        <span className="px-3 py-1 rounded-full bg-(--bg-secondary) text-xs font-semibold text-(--text-secondary)">다구간</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
        <div className="md:col-span-2 p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle)">
          <span className="text-[10px] text-(--text-muted) font-medium block">출발지</span>
          <span className="text-sm font-bold">{flightDep}</span>
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            size="sm"
            isIconOnly
            onClick={() => {
              const t = flightDep;
              setFlightDep(flightArr);
              setFlightArr(t);
            }}
            className="rounded-full h-9 w-9"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="md:col-span-2 p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle)">
          <span className="text-[10px] text-(--text-muted) font-medium block">도착지</span>
          <span className="text-sm font-bold">{flightArr}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) flex items-center justify-between">
          <div>
            <span className="text-[10px] text-(--text-muted) font-medium block">가는날 - 오는날</span>
            <span className="text-xs font-bold">2026.11.12 (목) - 2026.11.16 (월)</span>
          </div>
          <Calendar className="w-4 h-4 text-(--accent-primary)" />
        </div>

        <div className="p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) flex items-center justify-between">
          <div>
            <span className="text-[10px] text-(--text-muted) font-medium block">탑승객 수</span>
            <span className="text-xs font-bold">성인 {passengers}명 · 일반석</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" isIconOnly onClick={() => setPassengers(Math.max(1, passengers - 1))} className="w-6 h-6 p-0 font-bold text-xs">-</Button>
            <Button variant="outline" size="sm" isIconOnly onClick={() => setPassengers(passengers + 1)} className="w-6 h-6 p-0 font-bold text-xs">+</Button>
          </div>
        </div>
      </div>

      <Button variant="primary" size="md" className="w-full font-bold">
        최저가 항공권 검색하기 (26건 발견)
      </Button>
    </div>
  );
}

export function OnboardingWizardScreen() {
  const [onboardingStep, setOnboardingStep] = useState(2);
  const [selectedRole, setSelectedRole] = useState('designer');

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-1 text-xs text-(--text-muted)">
          <span>온보딩 단계</span>
          <span className="font-bold text-(--accent-primary)">{onboardingStep}/3단계</span>
        </div>
        <div className="h-1.5 w-full bg-(--bg-secondary) rounded-full overflow-hidden">
          <div style={{ width: `${(onboardingStep / 3) * 100}%` }} className="h-full bg-(--accent-primary) rounded-full transition-all"></div>
        </div>
        <h2 className="text-base font-bold text-(--text-primary) mt-4">어떤 역할을 주로 담당하시나요?</h2>
        <p className="text-xs text-(--text-secondary) mt-1">선택하신 직무에 꼭 맞는 토큰 프리셋과 UX 패턴을 추천해 드립니다.</p>
      </div>

      <div className="flex flex-col gap-2">
        {[
          { id: 'designer', title: 'UI/UX 디자이너', desc: '피그마와 스타일 토큰을 실시간 동기화' },
          { id: 'developer', title: '프론트엔드 엔지니어', desc: 'React, Vue, 바닐라 CSS 즉시 임포트' },
          { id: 'pm', title: '프로덕트 매니저', desc: 'AI 프롬프트로 기획서와 시제품 신속 구현' },
        ].map((role) => (
          <div
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`p-3 rounded-xl border cursor-pointer transition ${
              selectedRole === role.id
                ? 'border-(--accent-primary) bg-(--accent-primary)/10 ring-2 ring-(--accent-primary)/20'
                : 'border-(--border-subtle) hover:bg-(--bg-secondary)'
            }`}
          >
            <div className="font-bold text-xs">{role.title}</div>
            <div className="text-[11px] text-(--text-secondary)">{role.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="md" onClick={() => setOnboardingStep(Math.max(1, onboardingStep - 1))} className="px-4 text-xs font-semibold">
          이전
        </Button>
        <Button variant="primary" size="md" onClick={() => setOnboardingStep(Math.min(3, onboardingStep + 1))} className="flex-1 font-bold text-xs">
          다음 단계로
        </Button>
      </div>
    </div>
  );
}

export function FileUploaderScreen() {
  const uploadedFiles = [
    { name: 'business_license.pdf', size: '2.4 MB', progress: 100 },
    { name: 'id_card_front.jpg', size: '4.8 MB', progress: 68 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-dashed border-(--accent-primary)/70 rounded-2xl p-8 bg-(--accent-primary)/10 text-center flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-(--accent-primary)/15 text-(--accent-primary) flex items-center justify-center">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold">파일을 이곳으로 드래그하거나 클릭하여 업로드</div>
        <span className="text-xs text-(--text-muted)">PDF, JPG, PNG 파일 (개별 최대 20MB)</span>
      </div>

      <div className="flex flex-col gap-2">
        {uploadedFiles.map((f, i) => (
          <div key={i} className="p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-4 h-4 text-(--accent-primary)" />
              <div>
                <span className="text-xs font-bold block">{f.name}</span>
                <span className="text-[10px] text-(--text-muted)">{f.size}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-(--border-subtle) rounded-full overflow-hidden">
                <div style={{ width: `${f.progress}%` }} className="h-full bg-(--accent-primary) rounded-full"></div>
              </div>
              <span className="text-[10px] font-bold text-(--text-secondary)">{f.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FintechTransferScreen() {
  const [amount, setAmount] = useState(500000);

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto justify-between h-full">
      <div>
        <div className="p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) flex justify-between items-center mb-3">
          <div>
            <span className="text-[10px] text-(--text-muted) block">출금 계좌</span>
            <span className="text-xs font-bold">스마트뱅크 · 1002-***-4921</span>
          </div>
          <span className="text-xs font-bold text-(--atom-color-success)">잔액 ₩3,450,000</span>
        </div>

        <div className="text-center py-4">
          <span className="text-[11px] text-(--text-muted) font-medium">보낼 금액</span>
          <div className="text-3xl font-black text-(--text-primary) mt-1">₩{amount.toLocaleString()}</div>
          <span className="text-xs font-semibold text-(--accent-primary) mt-1 block">수수료 평생 무료</span>
        </div>
      </div>

      <div className="flex gap-2">
        {[
          { label: '+1만', add: 10000 },
          { label: '+5만', add: 50000 },
          { label: '+10만', add: 100000 },
          { label: '전액', add: 3450000, set: true },
        ].map((q) => (
          <Button
            key={q.label}
            variant="outline"
            size="sm"
            onClick={() => setAmount((prev) => (q.set ? q.add : prev + q.add))}
            className="flex-1 text-xs font-bold"
          >
            {q.label}
          </Button>
        ))}
      </div>

      <Button variant="primary" size="md" className="w-full font-bold text-xs">
        김철수님에게 송금하기 (수수료 면제)
      </Button>
    </div>
  );
}

export function EcommerceCheckoutScreen() {
  const [cartCount, setCartCount] = useState(2);
  const unitPrice = 49000;

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto justify-between h-full">
      <div>
        <h3 className="font-bold text-sm mb-2">장바구니 주문서</h3>
        <div className="p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) flex gap-3">
          <div className="w-14 h-14 rounded-lg bg-(--bg-primary) border border-(--border-subtle) flex items-center justify-center font-bold text-xs text-(--text-muted)">
            ITEM
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <span className="text-xs font-bold">프리미엄 미니멀 무선 키보드</span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-(--accent-primary)">₩{(unitPrice * cartCount).toLocaleString()}</span>
              <div className="flex items-center gap-1.5 bg-(--bg-primary) rounded border border-(--border-subtle) px-1">
                <Button variant="ghost" size="sm" isIconOnly onClick={() => setCartCount(Math.max(1, cartCount - 1))} className="h-5 w-5 p-0 text-xs">-</Button>
                <span className="text-xs font-bold px-1">{cartCount}</span>
                <Button variant="ghost" size="sm" isIconOnly onClick={() => setCartCount(cartCount + 1)} className="h-5 w-5 p-0 text-xs">+</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-(--bg-secondary) border border-(--border-subtle) flex flex-col gap-1.5 text-xs">
        <div className="flex justify-between text-(--text-secondary)">
          <span>상품금액</span>
          <span>₩{(unitPrice * cartCount).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-(--text-secondary)">
          <span>배송비</span>
          <span className="text-(--atom-color-success) font-semibold">무료 배송</span>
        </div>
        <div className="flex justify-between font-bold text-sm pt-2 border-t border-(--border-subtle)">
          <span>총 결제금액</span>
          <span className="text-(--accent-primary) font-black">₩{(unitPrice * cartCount).toLocaleString()}</span>
        </div>
      </div>

      <Button variant="primary" size="md" className="w-full font-bold text-xs">
        ₩{(unitPrice * cartCount).toLocaleString()} 원클릭 간편결제
      </Button>
    </div>
  );
}

export function SearchEmptyScreen() {
  const [searchVal, setSearchVal] = useState('존재하지않는쿼리XYZ');

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
        <Input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 text-xs font-medium"
        />
        {searchVal && (
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            onClick={() => setSearchVal('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-(--text-muted)"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="p-8 rounded-2xl bg-(--bg-secondary) border border-(--border-subtle) text-center flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-(--bg-primary) text-(--text-muted) flex items-center justify-center">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-sm">&apos;{searchVal}&apos;에 대한 검색 결과가 없습니다</h3>
        <p className="text-xs text-(--text-muted) max-w-xs">
          단어의 철자가 정확한지 확인하시거나, 아래 추천 인기 키워드를 확인해보세요.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
          <span className="text-[11px] text-(--text-muted) mr-1 font-semibold">추천 검색어:</span>
          {['디자인 토큰', '반응형 헤더', 'SaaS 대시보드', '간편 송금'].map((rec) => (
            <Button
              key={rec}
              variant="outline"
              size="sm"
              onClick={() => setSearchVal(rec)}
              className="rounded-full text-xs font-semibold h-7 px-2.5"
            >
              {rec}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
