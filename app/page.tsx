"use client"

import { useState } from "react";

const themes = ['default', 'dark', 'digitalFont']

export default function Home() {

  const [theme, setTheme] = useState<string>(themes[0])

  return (
    <div className={`theme-${theme} transition-all duration-300`}>
      <div className="text-center h-screen flex flex-col justify-center items-center bg-fillWrapper text-textStandard">
        <p >
          안녕하세요!<br />
          아톰그라운드의 디자인 시스템 가이드 문서입니다.
        </p>

        <br />

        <div className="flex gap-8">
          <p>theme 선택</p>
          <div className="flex gap-4">
            {themes.map((theme) => (
              <button className={`cursor-pointer`} key={theme} onClick={() => setTheme(theme)}>{theme}</button>
            ))}
          </div>
        </div>    
                 
      </div>
    </div>
  );
}
