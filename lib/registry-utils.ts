import fs from "fs";
import path from "path";

// 컴포넌트 이름과 실제 경로를 매핑하는 레지스트리
export const componentRegistry: Record<string, { path: string; componentName: string }> = {
  Button: { path: "app/templates/Button/Button.tsx", componentName: "Button" },
  Badge: { path: "app/templates/Badge/Badge.tsx", componentName: "Badge" },
  Card: { path: "app/templates/Card/Card.tsx", componentName: "Card" },
  Navigation: { path: "app/templates/Navigation/Navigation.tsx", componentName: "Navigation" },
  Sidebar: { path: "app/templates/Sidebar/Sidebar.tsx", componentName: "Sidebar" },
  Modal: { path: "app/templates/Modal/Modal.tsx", componentName: "Modal" },
  Toast: { path: "app/templates/Toast/Toast.tsx", componentName: "Toast" },
  Tab: { path: "app/templates/Tab/Tab.tsx", componentName: "Tab" },
  // Form 관련
  Input: { path: "app/templates/Input/Input.tsx", componentName: "Input" },
  Select: { path: "app/templates/Select/Select.tsx", componentName: "Select" },
  Radio: { path: "app/templates/Radio/Radio.tsx", componentName: "Radio" },
  Checkbox: { path: "app/templates/Checkbox/Checkbox.tsx", componentName: "Checkbox" },
  Label: { path: "app/templates/Label/Label.tsx", componentName: "Label" },
  // 기타
  Table: { path: "app/templates/Table/Table.tsx", componentName: "Table" },
  Pagination: { path: "app/templates/Pagination/Pagination.tsx", componentName: "Pagination" },
  Collapse: { path: "app/templates/Collapse/Collapse.tsx", componentName: "Collapse" },
  TOC: { path: "app/templates/TOC/TOC.tsx", componentName: "TOC" },
};

/**
 * 서버 사이드에서 컴포넌트의 소스 코드를 읽어옵니다.
 */
export async function getComponentSource(name: string): Promise<string | null> {
  // 1. Static Registry Lookup
  const item = componentRegistry[name];
  if (item) {
    try {
      const fullPath = path.join(process.cwd(), item.path);
      const source = await fs.promises.readFile(fullPath, "utf8");
      return source;
    } catch (error) {
      console.error(`Failed to read source for ${name}:`, error);
      return null;
    }
  }

  // 2. Dynamic Example Lookup (e.g. name="button-demo")
  try {
    const examplesPath = path.join(process.cwd(), "app/examples");
    if (fs.existsSync(examplesPath)) {
      const folders = await fs.promises.readdir(examplesPath);
      // 가장 긴 디렉터리 이름부터 매칭되도록 정렬 (e.g. global-nav 우선 매칭)
      folders.sort((a, b) => b.length - a.length);

      for (const folder of folders) {
        if (name.startsWith(folder)) {
          const fullPath = path.join(examplesPath, folder, `${name}.tsx`);
          if (fs.existsSync(fullPath)) {
            const source = await fs.promises.readFile(fullPath, "utf8");
            return source;
          }
        }
      }
    }
  } catch (error) {
    console.error(`Failed to read dynamic source for ${name}:`, error);
  }

  return null;
}

/**
 * 파일 경로에서 직접 소스 코드를 읽어옵니다.
 */
export async function getFileSource(relativeUri: string): Promise<string | null> {
  try {
    const cleanPath = relativeUri.startsWith("/") ? relativeUri.slice(1) : relativeUri;
    const fullPath = path.join(process.cwd(), cleanPath);
    const source = await fs.promises.readFile(fullPath, "utf8");
    return source;
  } catch (error) {
    console.error(`Failed to read file source for ${relativeUri}:`, error);
    return null;
  }
}
