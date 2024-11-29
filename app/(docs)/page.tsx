"use client";

const themes = ["default", "dark", "digitalFont"];

const DocsHome = () => {
  const handleThemeChange = (theme: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme); // 로컬 스토리지에 새로운 테마 저장
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div>
      <h1>Atomground Design System</h1>
      <p>base Atomic Design System</p>

      <br />
      <p>
        아톰그라운드 오픈 소스 디자인 시스템에 오신걸 환영합니다. 아토믹 디자인
        시스템에 대한 설명과 디자인방법론, 디자인리소스와 웹페이지와의
        연결방법까지 모든 디자인 이론과 함께기술합니다.
      </p>

      <br />
      <hr className="my-4" />
      <div className="flex gap-8">
        <p>theme 선택</p>
        <div className="flex gap-4">
          {themes.map((theme) => (
            <button
              className={`cursor-pointer`}
              key={theme}
              onClick={() => handleThemeChange(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-4" />
      <h6>아래의 기술을 사용합니다.</h6>
      <ul>
        <li>Next.js</li>
        <li>React</li>
        <li>style dicitionary</li>
        <li>Figma</li>
        <li>Token Studio</li>
      </ul>
      <hr className="my-4" />
      <h6>아래의 이론을 바탕으로 디자인 시스템을 설계합니다.</h6>
      <ul>
        <li>atomic design systme</li>
        <li>component driven development</li>
      </ul>
    </div>
  );
};

export default DocsHome;
