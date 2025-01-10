import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";
import { expandTypesMap } from "@tokens-studio/sd-transforms";

import { readFileSync, writeFileSync, rmSync, mkdirSync } from "fs";
import { existsSync } from "fs";

register(StyleDictionary);

// 원본 token.json 파일 읽기
const tokenFile = readFileSync("token.json", "utf8");
const tokenData = JSON.parse(tokenFile);
// console.log(tokenData);

// build 디렉토리가 없으면 생성
const buildDir = "build/";
if (existsSync(buildDir)) {
  rmSync(buildDir, { recursive: true, force: true });
}
mkdirSync(buildDir);

const buildTokens = async () => {
  // tokenSetOrder 배열에서 각 항목에 대해 파일 생성
  tokenData.$metadata.tokenSetOrder.forEach((tokenSet) => {
    const fileName = `tokens/token/${tokenSet}.json`;

    // 각 토큰셋의 데이터를 가져옴
    const originalTokens = tokenData[tokenSet] || {};
    const globalTokens = tokenData["global"] || {};
    const cleanedTokens = { ...globalTokens }; // 초기값으로 globalTokens 추가

    //   console.log(originalTokens);
    // console.log(globalTokens);

    // 최상위 그룹을 제외한 나머지 데이터 처리
    Object.entries(originalTokens).forEach(([groupKey, groupValue]) => {
      if (groupKey === tokenSet) {
        return; // 최상위 그룹 스킵
      }

      if (groupValue && typeof groupValue === "object") {
        cleanedTokens[groupKey] = groupValue;
      }
    });

    // 각 토큰 파일 생성
    writeFileSync(fileName, JSON.stringify(cleanedTokens, null, 2), "utf8");
    console.log(`${fileName} 파일이 생성되었습니다.`);

    // StyleDictionary 인스턴스 생성 및 빌드
    const sdTransfer = new StyleDictionary({
      source: [fileName],
      preprocessors: ["tokens-studio"],
      expand: {
        typesMap: expandTypesMap,
      },
      platforms: {
        css: {
          transformGroup: "tokens-studio",
          transforms: ["ts/size/px", "ts/opacity", "name/kebab"],
          buildPath: buildDir,
          files: [
            {
              destination: `${tokenSet}.variables.css`,
              format: "css/variables",
            },
          ],
        },
      },
    });

    sdTransfer.cleanAllPlatforms(); // 기존 빌드 삭제
    sdTransfer.buildAllPlatforms(); // 빌드 실행
  });
};

try {
  buildTokens();
} catch (error) {
  console.error("토크파일 처리중 오류가 발생했습니다:", error);
}
