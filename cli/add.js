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
  "Badge",
  "Card",
  "CodeBlock",
  "GlobalNav",
  "Input",
  "Theme",
  "Tab",
  "Toast",
  "Pagination",
  "Table",
  "Modal",
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
