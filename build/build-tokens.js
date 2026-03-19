import StyleDictionary from "style-dictionary";


// 1. Style Dictionary 인스턴스 초기화
const myStyleDictionary = new StyleDictionary({
  source: ["tokens/tokens.json"],
  preprocessors: ['flatten-global'],
  hooks: {
      preprocessors: {
        'flatten-global': (dictionary) => {
          // 1. global 객체를 찾습니다.
          const { global, ...rest } = dictionary;
          
          // 2. global 내부의 내용을 루트로 끌어올려 병합합니다.
          // 이렇게 하면 {palette.white} 참조가 루트 레벨에서 해석 가능해집니다.
          return {
            ...global,
            ...rest
          };
        }
      }
    },
  platforms: {
    css: {
      transformGroup: "css", // CSS 기본 변환 적용 (예: size/rem, color/hex 등)
      buildPath: "build/css/",
      files: [
        {
          destination: "_variables.css",
          format: "myCustomFormat", // 아래에서 정의한 커스텀 포맷 사용
          options: {
            outputReferences: true, // CSS 변수 참조 활성화 (var(--name))
          },
        },
      ],
    },
    typescript: {
      transformGroup: "js",
      buildPath: "build/typescript/",
      files: [
        {
          destination: "theme.ts",
          format: "theme",
        },
      ],
    },
  },
  log: {
    verbosity: 'verbose', // 어떤 reference를 못 찾는지 정확히 찍어줍니다.
  },
});

// 2. 커스텀 포맷 등록
// 토큰 그룹을 CSS 변수 블록으로 변환합니다.
// - 'global' 카테고리 -> @theme 블록
// - 그 외 카테고리 -> .{category} 클래스 블록
myStyleDictionary.registerFormat({
  name: "myCustomFormat",
  format: function ({ dictionary, options }) {
    // [헬퍼 함수]
    // 1. getName: 토큰의 계층(type, item, subitem)을 하이픈(-)으로 연결하여 CSS 변수명 생성
    //    예: palette.gray.500 -> palette-gray-500
    const getName = (token) => token.path.slice(1).join("-");

    // 2. getSemanticName: 시멘틱 토큰명을 생성 (예: color-card)
    //    이름 규칙: $type(color)-...path -> color-bg-card
    const getSemanticName = (token) => {
      if (token.$type === "color") {
        return [token.$type, ...token.path.slice(1)].join("-");
      } else {
        return null;
      }
    };

    // [참조 맵 생성]
    // {global.palette.white} 같은 참조 경로를 실제 토큰 객체로 찾기 위한 Map 생성
    const tokenMap = new Map(
      dictionary.allTokens.map((t) => [t.path.join("."), t])
    );

    // [토큰 그룹화]
    // tokens.json의 최상위 카테고리(global, white, dark)별로 토큰을 묶음
    const grouped = dictionary.allTokens.reduce((acc, token) => {
      const category = token.attributes.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(token);
      return acc;
    }, {});

    // [시멘틱 변수 수집 로직]
    // global이 아닌 테마별 토큰(white, dark 등)을 순회하며 시멘틱 변수 정의를 수집함
    // 목적: @theme 블록 안에 "--color-card: var(--card);" 형태의 매핑을 한 번만 선언하기 위함.
    // 각 테마 파일(.white, .dark)에서는 --card 변수만 재정의하면 됨.
    const themeTokens = dictionary.allTokens.filter(t => t.attributes.category !== 'palette');
    const semanticMap = new Map();
    
    themeTokens.forEach(token => {
        const semanticName = getSemanticName(token); // 예: color-card
        const varName = getName(token);              // 예: card
        
        // 중복 선언 방지: 동일한 시멘틱 이름이 여러 테마에 있어도 한 번만 수집
        if (semanticName && !semanticMap.has(semanticName)) {
            semanticMap.set(semanticName, varName);
        }
    });

    // 수집된 시멘틱 변수들을 CSS 문자열로 변환
    const semanticCss = Array.from(semanticMap.entries())
        .map(([name, val]) => `  --${name}: var(--${val});`)
        .join('\n');


    // [최종 CSS 생성]
    // 그룹별로 순회하며 CSS 블록 생성
    return Object.entries(grouped)
      .map(([category, tokens]) => {
        // 선택자 결정: 
        // - 'global' 카테고리는 Tailwind CSS v4의 '@theme' 블록으로 변환
        // - 나머지(white, dark)는 클래스 선택자(예: .white)로 변환
        const selector = category === "palette" ? "@theme" : `.${category}`;


        // 정렬
        const typeOrder = ["color", "fontSizes", "fontWeights", "fontFamily", "borderRadius"];

        const cssVariables = tokens
          .sort((a, b) => {
            const indexA = typeOrder.indexOf(a.$type);
            const indexB = typeOrder.indexOf(b.$type);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
          })
          .map((token) => {
            const name = getName(token);
            // 기본 값. 참조가 있다면 원본 값("{global.palette...}")을 가져옴
            let value = token.$value || token.value;
            const originalValue = token.original.$value || token.original.value;

            // [수동 참조 해결]
            // 값이 "{...}" 형태의 참조인 경우, 해당 참조를 var(--이름) 형태로 변환
            if (
              options?.outputReferences &&
              typeof originalValue === "string" && // 값이 문자열이고
              originalValue.includes("{")          // '{'를 포함하면 참조로 간주
            ) {
              value = originalValue.replace(/{([^}]+)}/g, (match, pathStr) => {
                const refToken = tokenMap.get(pathStr);
                if (refToken) {
                  return `var(--${getName(refToken)})`;
                }
                return match; 
              });
            }

            if (category === "palette") {
              // $type을 확인하여 borderRadius나 dimension이면 px 추가
              if(token.$type === "borderRadius" | token.$type === "fontSizes" | token.$type === "spacing" | token.$type === "sizing" | token.$type === "dimension") {
                 if (!String(value).endsWith("px")) {
                     return `--${name}: ${value}px;`;
                 }
              }
              return `--${name}: ${value};`;
            }
            // 그 외 카테고리(테마)
            if (token.$type === "color") {
              return `--${name}: ${value};`;
            }
            if (token.$type === "spacing" || token.$type === "sizing") {
               if (!String(value).endsWith("px") && !String(value).includes("var(")) {
                   return `--${name}: ${value}px;`;
               }
               return `--${name}: ${value};`;
            }
            
            return null;
          })
          .filter(Boolean)
          .join("\n");

        // global(@theme)인 경우에만 수집해둔 시멘틱 변수(semanticCss)를 추가
        // @theme: Tailwind 유틸리티 클래스 생성에 필요 (bg-primary, text-secondary 등)
        // Tailwind CSS v4의 @theme은 빌드 시 자동으로 :root에도 등록되므로 별도 :root 선언 불필요
        if (selector === "@theme") {
          return `@theme {\n${cssVariables}\n\n${semanticCss}\n}`;
        }
        return `${selector} {\n${cssVariables}\n} `;
      })
      .join("\n\n");
  },
});

// 3. theme와 관련된 커스텀 포맷 등록
// theme.ts 파일을 위한 포맷 등록
myStyleDictionary.registerFormat({
  name: "theme",
  format: function ({ dictionary }) {
    const groupedThemes = dictionary.allTokens.reduce((acc, token) => {
      const category = token.attributes.category;
      if (category === "palette") return acc;

      if (category.includes("-")) {
        const prefix = category.split("-")[0];
        if (!acc[prefix]) acc[prefix] = [];
        if (!acc[prefix].includes(category)) {
          acc[prefix].push(category);
        }
      } else {
        if (!acc.global) acc.global = [];
        if (!acc.global.includes(category)) {
          acc.global.push(category);
        }
      }
      return acc;
    }, { global: [] });

    return `export const themes: Record<string, string[]> = ${JSON.stringify(groupedThemes, null, 2)};`;
  },
});

// 3. 모든 플랫폼 빌드
await myStyleDictionary.buildAllPlatforms();