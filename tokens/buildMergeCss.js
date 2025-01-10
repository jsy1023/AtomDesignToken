import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";

import { readFileSync, writeFileSync } from "fs";

import path from "path";

register(StyleDictionary);

// 원본 token.json 파일 읽기
const tokenFile = readFileSync("token.json", "utf8");
const tokenData = JSON.parse(tokenFile);
// console.log(tokenData);

// css 파일 빌드 후 통합하여 global.css에 제공하는 함수
const processCss = async (tokenSetOrder) => {
  let globalCSS = "";

  let globalItems = readFileSync(
    path.join(process.cwd(), "build", `global.variables.css`),
    "utf8"
  )
    .replace(":root {", "")
    .replace(/}\s*$/, ""); // 마지막 } 제거;

  tokenSetOrder.forEach((tokenValue) => {
    const filePath = path.join(
      process.cwd(),
      "build",
      `${tokenValue}.variables.css`
    );

    try {
      let items = readFileSync(filePath, "utf8")
        .replace(":root {", "")
        .replace(/}\s*$/, ""); // 마지막 } 제거;

      // 각 토큰별 css를 구조에 맞게 추가
      globalCSS += `
      
      .${tokenValue} {
        ${items}
      }
      `;
    } catch (error) {
      console.log(`파일 읽기 실패:${filePath}`, error);
    }
  });

  // tailwind 지시어와 통합

  const combinedCSS = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    @layer base{
        :root{
          ${globalItems}
        }
      }

    ${globalCSS}
    `;

  // 결과를 app/globals.css에 저장
  writeFileSync(
    path.join(process.cwd(), "app", "globals.css"),
    combinedCSS,
    "utf8"
  );
  console.log("global.css 파일이 성공적으로 생성되었습니다.");
};

try {
  processCss(tokenData.$metadata.tokenSetOrder);
} catch (error) {
  console.error("css파일 통합 처리중 오류가 발생했습니다:", error);
}
