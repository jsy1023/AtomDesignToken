import fs from "fs";
import path from "path";

// 컴포넌트 이름과 실제 경로를 매핑하는 레지스트리
export const componentRegistry: Record<string, { path: string; componentName: string }> = {
  Button: { path: "app/templates/Button/Button.tsx", componentName: "Button" },
  Badge: { path: "app/templates/Badge/Badge.tsx", componentName: "Badge" },
  Card: { path: "app/templates/Card/Card.tsx", componentName: "Card" },
  Navigation: { path: "app/templates/Navigation/Navigation.tsx", componentName: "Navigation" },
  Sidemenu: { path: "app/templates/Sidemenu/Sidemenu.tsx", componentName: "Sidemenu" },
  Modal: { path: "app/templates/Modal/Modal.tsx", componentName: "Modal" },
  Toast: { path: "app/templates/Toast/Toast.tsx", componentName: "Toast" },
  Tab: { path: "app/templates/Tab/Tab.tsx", componentName: "Tab" },
  // Form 관련
  Input: { path: "app/templates/Form/Form.tsx", componentName: "Input" },
  Select: { path: "app/templates/Form/Form.tsx", componentName: "Select" },
  Radio: { path: "app/templates/Form/Form.tsx", componentName: "Radio" },
  Checkbox: { path: "app/templates/Form/Form.tsx", componentName: "Checkbox" },
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
  const item = componentRegistry[name];
  if (!item) return null;

  try {
    const fullPath = path.join(process.cwd(), item.path);
    const source = await fs.promises.readFile(fullPath, "utf8");
    return source;
  } catch (error) {
    console.error(`Failed to read source for ${name}:`, error);
    return null;
  }
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
