#!/usr/bin/env node

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
  "Card",
  "CodeBlock",
  "GlobalNav",
  "Input",
  "Theme",
]; // 여기 추가할 컴포넌트 목록

// 명령어에서 컴포넌트 이름 가져오기
const args = process.argv.slice(2); // 'npx atomsystem-add Button -> [Button]'
const component = args[0] || "all"; // '사용자가 입력하지 않으면 기본적으로 'all''

function addComponent(comp) {
  const componentPath = path.join(templateDir, comp, `${comp}.tsx`);
  const targetDir = path.join(process.cwd(), "app", "components", comp);
  const targetPath = path.join(targetDir, `${comp}.tsx`);

  if (fs.existsSync(componentPath)) {
    // 대상 디렉토리가 없으면 생성
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Created directory: ${targetDir}`);
    }
    copyFileSync(componentPath, targetPath);
    console.log(`${comp} component has been added to ${targetPath}`);
  } else {
    console.log(`Component ${comp} does not exist in the atomsystem.`);
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

// "all" 이면 모든 컴포넌트를 추가

// 사용자에게 추가할 컴포넌트를 선택하도록 묻습니다.
// inquirer
//   .prompt([
//     {
//       type: "list",
//       name: "component",
//       message: "Which component would you like to add?",
//       choices: ["all", ...components], // 'all'을 첫 번째로 추가
//     },
//   ])
//   .then((answers) => {
//     const { component } = answers;

//     // 'all'이 선택되면 모든 컴포넌트를 추가합니다.
//     if (component === "all") {
//       console.log("Adding all components...");

//       components.forEach((comp) => {
//         const componentPath = path.join(templateDir, `${comp}/${comp}.tsx`);
//         const targetDir = path.join(process.cwd(), "app", "components", comp);
//         const targetPath = path.join(targetDir, `${comp}.tsx`);

//         if (fs.existsSync(componentPath)) {
//           // 대상 디렉토리가 없으면 생성
//           if (!fs.existsSync(targetDir)) {
//             fs.mkdirSync(targetDir, { recursive: true });
//             console.log(`Created directory: ${targetDir}`);
//           }

//           copyFileSync(componentPath, targetPath);
//           console.log(`${comp} component has been added to ${targetPath}`);
//         } else {
//           console.log(
//             `Component ${comp} does not exist in the templates directory.`
//           );
//         }
//       });
//     } else {
//       // 개별 컴포넌트 추가
//       const componentPath = path.join(
//         templateDir,
//         `${component}/${component}.tsx`
//       );
//       const targetDir = path.join(
//         process.cwd(),
//         "app",
//         "components",
//         component
//       );
//       const targetPath = path.join(targetDir, `${component}.tsx`);

//       if (fs.existsSync(componentPath)) {
//         // 대상 디렉토리가 없으면 생성
//         if (!fs.existsSync(targetDir)) {
//           fs.mkdirSync(targetDir, { recursive: true });
//           console.log(`Created directory: ${targetDir}`);
//         }

//         copyFileSync(componentPath, targetPath);
//         console.log(`${component} component has been added to ${targetPath}`);
//       } else {
//         console.log(
//           `Component ${component} does not exist in the templates directory.`
//         );
//       }
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
