import Link from "next/link";
import { Button } from "../templates/Button/Button";
import { Card } from "../templates/Card/Card";

export default function LandingPage() {
  const advantages = [
    {
      title: "디자인과 코드가 완벽히 이어져요",
      subtitle: "Figma to Code Sync",
      description: "Tokens Studio와 Style Dictionary로 디자인 토큰 변경사항이 CSS와 TypeScript에 실시간으로 반영돼요.",
      icon: "sync",
    },
    {
      title: "기초 단위부터 탄탄하게 설계해요",
      subtitle: "Atomic Methodology",
      description: "가장 작은 원자(Atom) 토큰부터 복잡한 템플릿(Template)까지 일관된 구조로 체계적으로 관리해요.",
      icon: "account_tree",
    },
    {
      title: "서비스 맞춤 멀티 테마를 지원해요",
      subtitle: "Multi-Theme Architecture",
      description: "라이트/다크 모드는 물론, 금융·커머스 등 다양한 브랜드 테마를 코드 수정 없이 유연하게 전환해요.",
      icon: "palette",
    },
    {
      title: "필요한 소스 코드를 그대로 소유해요",
      subtitle: "Code Duality",
      description: "블랙박스 패키지가 아닌, 내 프로젝트에 직접 컴포넌트 코드를 내려받아 자유롭게 커스터마이징해요.",
      icon: "code",
    },
    {
      title: "CLI 명령어 한 줄로 즉시 시작해요",
      subtitle: "Design System CLI",
      description: "atomsystem-init과 add 명령어로 복잡한 보일러플레이트 없이 필요한 컴포넌트를 바로 추가해요.",
      icon: "terminal",
    },
    {
      title: "엄격한 타입과 자동완성을 지원해요",
      subtitle: "Developer Friendly",
      description: "정교한 TypeScript 타입 정의와 CSS 변수 자동완성으로 엔지니어링 생산성을 극대화해요.",
      icon: "speed",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-bg-wrapper min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6 border-b border-border-standard bg-bg-card/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-primary text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Toss Design System Preset Supported
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-title mb-6 leading-tight">
            디자인 토큰부터 <br className="hidden sm:inline" />
            <span className="text-primary">프로덕션 코드까지</span>
          </h1>
          <p className="text-lg md:text-xl text-text-sub max-w-2xl mx-auto mb-10 leading-relaxed">
            아톰시스템은 디자인과 엔지니어링의 간극을 매끄럽게 연결해요. <br className="hidden md:inline" />
            단 한 줄의 JSON 토큰으로 일관되고 신뢰할 수 있는 인터페이스를 경험해보세요.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link href="/showcases">
              <Button type="primary" className="!px-7 !py-4 !text-base !font-semibold !rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                쇼케이스 체험하기
              </Button>
            </Link>
            <Link href="/docs">
              <Button type="secondary" className="!px-7 !py-4 !text-base !font-semibold !rounded-2xl border border-border-standard transition-all active:scale-[0.98]">
                문서 둘러보기
              </Button>
            </Link>
            <Link href="https://github.com/jsy1023/AtomDesignToken" target="_blank">
              <Button type="gray" className="!px-7 !py-4 !text-base !font-semibold !rounded-2xl border border-border-standard transition-all active:scale-[0.98]">
                GitHub 저장소
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold tracking-wider uppercase mb-2 block">
              Core Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-text-title">
              왜 아톰시스템을 선택할까요?
            </h2>
            <p className="text-text-sub text-base md:text-lg max-w-2xl mx-auto">
              가장 직관적이고 효율적인 방식으로 디자인 시스템을 구축하고 운영할 수 있도록 도울게요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((adv, index) => (
              <Card
                key={index}
                className="p-8 hover:-translate-y-1 transition-all duration-200 border border-border-standard shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-bg-card rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {adv.icon}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-primary block mb-1">
                    {adv.subtitle}
                  </span>
                  <h3 className="text-xl font-bold mb-3 text-text-title">
                    {adv.title}
                  </h3>
                  <p className="text-text-sub leading-relaxed text-sm">
                    {adv.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white tracking-tight">
            지금 바로 시작해볼까요?
          </h2>
          <p className="text-white/80 mb-8 text-base md:text-lg leading-relaxed">
            단 한 줄의 명령어면 프로덕션 수준의 디자인 시스템 환경이 완성돼요.
          </p>
          <div className="bg-black/20 backdrop-blur-sm px-6 py-3.5 rounded-2xl font-mono text-sm mb-10 inline-flex items-center gap-3 border border-white/20 text-white select-all">
            <span className="text-white/60">$</span>
            <span>npx atomsystem-init</span>
          </div>
          <div>
            <Link href="/docs/install">
              <Button type="gray" className="!bg-white !text-primary !border-none !px-8 !py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition-all">
                설치 가이드 확인하기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
