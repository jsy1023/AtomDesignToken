import Link from "next/link";
import { Button } from "../templates/Button/Button";
import { Card } from "../templates/Card/Card";

export default function LandingPage() {
  const advantages = [
    {
      title: "Figma to Code Sync",
      description: "Tokens Studio와 Style Dictionary를 통해 피그마 디자인 변경사항을 즉시 코드(CSS, TS)로 동기화합니다.",
      icon: "sync",
    },
    {
      title: "Atomic Methodology",
      description: "아토믹 디자인 방법론을 기반으로 가장 작은 단위부터 복잡한 템플릿까지 체계적으로 관리합니다.",
      icon: "account_tree",
    },
    {
      title: "Multi-Theme Architecture",
      description: "단순한 다크모드를 넘어, 브랜드별/서비스별 멀티 테마를 실시간으로 전환할 수 있는 구조를 제공합니다.",
      icon: "palette",
    },
    {
      title: "Code Duality",
      description: "추상화된 라이브러리가 아닌, 직접 수정 가능한 실제 소스 코드를 프로젝트에 주입하여 커스텀 자유도를 극대화합니다.",
      icon: "code",
    },
    {
      title: "Design System CLI",
      description: "atomsystem-init, add 명령어를 통해 반복적인 설정과 컴포넌트 추가 작업을 자동화합니다.",
      icon: "terminal",
    },
    {
      title: "Developer Friendly",
      description: "강력한 타입 시스템과 CSS 변수 자동 완성으로 개발 환경의 생산성을 높여줍니다.",
      icon: "speed",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-bg-wrapper text-text-standard">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 border-b border-border-standard">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Atomic Design to <br />
            <span className="text-primary bg-clip-text">Production Code</span>
          </h1>
          <p className="text-xl opacity-70 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            아톰시스템은 디자인과 엔지니어링의 간극을 좁히는 꼼꼼한 디자인 시스템 예제입니다. 
            단 한 줄의 JSON으로 디자인부터 구현까지 일관된 워크플로우를 경험하세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs">
              <Button type="primary" className="!px-8 !py-6 !text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                문서 보기
              </Button>
            </Link>
            <Link href="https://github.com/jsy1023/AtomDesignToken" target="_blank">
              <Button type="secondary" className="!px-8 !py-6 !text-lg rounded-full border-2">
                GitHub 저장소
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 px-6 bg-bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Atom System?</h2>
            <p className="opacity-60">디자인 시스템을 만드는 가장 꼼꼼하고 효율적인 방법들을 담았습니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((adv, index) => (
              <Card key={index} className="p-8 hover:translate-y-[-4px] transition-transform duration-300 border border-border-standard shadow-sm bg-bg-wrapper/50">
                <span className="material-symbols-outlined text-primary text-4xl mb-6 block">
                  {adv.icon}
                </span>
                <h3 className="text-xl font-bold mb-3">{adv.title}</h3>
                <p className="opacity-70 leading-relaxed text-sm">
                  {adv.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">지금 바로 시작해보세요</h2>
          <p className="text-white/80 mb-10 text-lg">
            단 한 줄의 명령어면 디자인 시스템 구축 환경이 완성됩니다.
          </p>
          <div className="bg-black/20 p-4 rounded-lg font-mono text-sm mb-10 inline-block border border-white/20 text-white">
            npx atomsystem-init
          </div>
          <div>
            <Link href="/docs/install">
              <Button type="gray" className="!bg-white !text-primary !border-none !px-8 rounded-full font-bold">
                설치 가이드 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
