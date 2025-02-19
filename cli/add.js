#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { copyFileSync } from "fs";

// 컴포넌트 템플릿이 위치한 디렉토리
const templateDir = path.join(__dirname, "templates");

// 사용할 수 있는 컴포넌트 목록
const components = ["button", "card", "navbar"]; // 여기 추가할 컴포넌트 목록

// 사용자에게 추가할 컴포넌트를 선택하도록 묻습니다.
inquirer
  .prompt([
    {
      type: "list",
      name: "component",
      message: "Which component would you like to add?",
      choices: ["all", ...components], // 'all'을 첫 번째로 추가
    },
  ])
  .then((answers) => {
    const { component } = answers;

    // 'all'이 선택되면 모든 컴포넌트를 추가합니다.
    if (component === "all") {
      console.log("Adding all components...");

      components.forEach((comp) => {
        const componentPath = path.join(templateDir, `${comp}.js`);

        if (fs.existsSync(componentPath)) {
          const targetDir = path.join(process.cwd(), "app", "components");
          const targetPath = path.join(targetDir, `${comp}.js`);
          copyFileSync(componentPath, targetPath);
          console.log(`${comp} component has been added to ${targetPath}`);
        } else {
          console.log(
            `Component ${comp} does not exist in the templates directory.`
          );
        }
      });
    } else {
      // 개별 컴포넌트 추가
      const componentPath = path.join(templateDir, `${component}.js`);
      if (fs.existsSync(componentPath)) {
        const targetDir = path.join(process.cwd(), "app", "components");
        const targetPath = path.join(targetDir, `${component}.js`);
        copyFileSync(componentPath, targetPath);
        console.log(`${component} component has been added to ${targetPath}`);
      } else {
        console.log(
          `Component ${component} does not exist in the templates directory.`
        );
      }
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
