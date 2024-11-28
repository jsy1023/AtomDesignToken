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
    <div className={`transition-all duration-300`}>
      {/* bg-fillWrapper text-textStandard */}
      <div className="">
        <p>
          안녕하세요!
          <br />
          아톰그라운드의 디자인 시스템 가이드 문서입니다.
        </p>

        <br />

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
      </div>
    </div>
  );
};

export default DocsHome;
