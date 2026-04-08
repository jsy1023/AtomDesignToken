add.ts co#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { copyFileSync } from "fs";
import { fileURLToPath } from "url";

// 현재 실행중인 CLI 파일의 디렉토리 찾기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 컴포넌트 템플릿이 위치한 디렉토리
const templateDir = path.join(__dirname, "..", "app", "templates");

// 사용할 수 있는 컴포넌트 목록
const components = [
  "Button",
  "Badge",
  "Card",
  "Collapse",
  "CodeBlock",
  "Navigation",
  "Sidebar",
  "Input",
  "Theme",
  "Tab",
  "Toast",
  "Pagination",
  "Table",
  "Modal",
  "TOC",
  "Dropdown",
]; // 여기 추가할 컴포넌트 목록


// 명령어에서 컴포넌트 이름 가져오기
const args = process.argv.slice(2); // 'npx atomsystem-add Button -> [Button]'
const component = args[0] || "all"; // '사용자가 입력하지 않으면 기본적으로 'all''

// 일부 컴포넌트의 의존성 구조 (Theme 설치시 내부적으로 Button, Form, Modal 등이 필요함)
const dependenciesMap = {
  Theme: ["Button", "Form", "Modal"], // Form 안에는 Radio가 들어있음
};

// 재귀 방지를 위한 Set
const addedComponents = new Set();

function addComponent(comp) {
  if (addedComponents.has(comp)) return;
  addedComponents.add(comp);
  const componentPath = path.join(templateDir, comp, `${comp}.tsx`);
  const targetDir = path.join(process.cwd(), "app", "components", comp);
  const targetPath = path.join(targetDir, `${comp}.tsx`);

  // 컴포넌트의 CSS 파일 복제 지원
  const cssFileName = `${comp}.css`.toLowerCase();
  const sourceCssPath = path.join(templateDir, comp, cssFileName);
  const targetCssPath = path.join(targetDir, cssFileName);

  if (fs.existsSync(componentPath)) {
    // 대상 디렉토리가 없으면 생성
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Created directory: ${targetDir}`);
    }
    
    // 1) TSX 복사
    copyFileSync(componentPath, targetPath);
    console.log(`✅ ${comp} component typescript has been added to ${targetPath}`);

    // 2) CSS 복사 + globals.css에 @import 자동 추가
    if (fs.existsSync(sourceCssPath)) {
      copyFileSync(sourceCssPath, targetCssPath);
      console.log(`✅ ${comp} component stylesheet has been added to ${targetCssPath}`);

      // globals.css에 @import 추가
      const globalsPath = path.join(process.cwd(), "app", "globals.css");
      const importLine = `@import "./components/${comp}/${cssFileName}";`;

      if (fs.existsSync(globalsPath)) {
        const globalsContent = fs.readFileSync(globalsPath, "utf8");

        if (!globalsContent.includes(importLine)) {
          // "/* Component Styles */" 섹션 이후에 추가, 없으면 파일 끝에 추가
          let updatedContent;
          const componentSectionMarker = "/* Component Styles */";

          if (globalsContent.includes(componentSectionMarker)) {
            // 마커 이후의 마지막 @import 뒤에 추가
            const markerIndex = globalsContent.indexOf(componentSectionMarker);
            const afterMarker = globalsContent.slice(markerIndex);
            const lastImportInSection = afterMarker.lastIndexOf("@import");
            
            if (lastImportInSection !== -1) {
              const endOfLastImport = markerIndex + lastImportInSection + afterMarker.slice(lastImportInSection).indexOf("\n") + 1;
              updatedContent =
                globalsContent.slice(0, endOfLastImport) +
                importLine + "\n" +
                globalsContent.slice(endOfLastImport);
            } else {
              updatedContent =
                globalsContent.slice(0, markerIndex + componentSectionMarker.length) +
                "\n" + importLine + "\n" +
                globalsContent.slice(markerIndex + componentSectionMarker.length);
            }
          } else {
            // 마커가 없으면 "/* Component Styles */" 섹션과 함께 파일 끝에 추가
            updatedContent = globalsContent.trimEnd() + "\n\n/* Component Styles */\n" + importLine + "\n";
          }

          fs.writeFileSync(globalsPath, updatedContent, "utf8");
          console.log(`✅ Added @import for ${comp} to globals.css`);
        } else {
          console.log(`ℹ️  ${comp} is already imported in globals.css`);
        }
      } else {
        console.log(`⚠️  globals.css not found at ${globalsPath}. Please add manually:\n   ${importLine}`);
      }
    }
    // 3) 의존성 컴포넌트 자동 복사 (Recursive Copy)
    if (dependenciesMap[comp]) {
      console.log(`\n⏳ Checking dependencies for ${comp}...`);
      dependenciesMap[comp].forEach((dep) => {
        addComponent(dep);
      });
      console.log(`✅ Finished adding dependencies for ${comp}.\n`);
    }

  } else {
    console.log(`❌ Component ${comp} does not exist in the atomsystem.`);
  }
}

if (component == "all") {
  console.log("Adding all components...");

  components.forEach((comp) => {
    addComponent(comp);
  });
} else {
  // 특정 컴포넌트 추가
  addComponent(component);
}
