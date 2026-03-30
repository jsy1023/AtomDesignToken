// 이 파일은 클라이언트 사이드에서도 사용될 수 있도록 fs를 포함하지 않습니다.
import { Button } from "@/app/templates/Button/Button";
import { Badge } from "@/app/templates/Badge/Badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/app/templates/Card/Card";
import { Navigation, NavBrand, NavList, NavItem } from "@/app/templates/Navigation/Navigation";
import { Sidemenu } from "@/app/templates/Sidemenu/Sidemenu";
import { Modal } from "@/app/templates/Modal/Modal";
import { Toast } from "@/app/templates/Toast/Toast";
import Tab from "@/app/templates/Tab/Tab";
import { Input, Select, Radio, Checkbox, Label } from "@/app/templates/Form/Form";
import Table from "@/app/templates/Table/Table";
import Pagination from "@/app/templates/Pagination/Pagination";
import { Collapse } from "@/app/templates/Collapse/Collapse";
import TOC from "@/app/templates/TOC/TOC";

// ── Demo 예제 파일 (shadcn/ui 패턴) ──────────────────────────────
import ButtonDemo from "@/app/examples/button/button-demo";
import ButtonVariants from "@/app/examples/button/button-variants";
import ButtonSizes from "@/app/examples/button/button-sizes";
import ButtonDisabled from "@/app/examples/button/button-disabled";

import BadgeDemo from "@/app/examples/badge/badge-demo";
import BadgeTinted from "@/app/examples/badge/badge-tinted";

import CardDemo from "@/app/examples/card/card-demo";

import CheckboxDemo from "@/app/examples/checkbox/checkbox-demo";

import CollapseDemo from "@/app/examples/collapse/collapse-demo";
import CollapseAccordion from "@/app/examples/collapse/collapse-accordion";

import InputDemo from "@/app/examples/input/input-demo";

import SelectDemo from "@/app/examples/select/select-demo";

import RadioDemo from "@/app/examples/radio/radio-demo";

import ModalDemo from "@/app/examples/modal/modal-demo";

import ToastDemo from "@/app/examples/toast/toast-demo";

import PaginationDemo from "@/app/examples/pagination/pagination-demo";

import TabDemo from "@/app/examples/tab/tab-demo";

import TableDemo from "@/app/examples/table/table-demo";

import TocDemo from "@/app/examples/toc/toc-demo";

import SidemenuDemo from "@/app/examples/sidemenu/sidemenu-demo";
import NavigationDemo from "@/app/examples/navigation/navigation-demo";

export const componentRegistry: Record<string, React.ElementType> = {
  // ── 원본 컴포넌트 ────────────────────────────────────────────────
  Button,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Navigation,
  NavBrand,
  NavList,
  NavItem,
  Sidemenu,
  Modal,
  Toast,
  Tab,
  Input,
  Select,
  Radio,
  Checkbox,
  Label,
  Table,
  Pagination,
  Collapse,
  TOC,

  // ── Demo 예제 컴포넌트 ────────────────────────────────────────────
  "button-demo": ButtonDemo,
  "button-variants": ButtonVariants,
  "button-sizes": ButtonSizes,
  "button-disabled": ButtonDisabled,

  "badge-demo": BadgeDemo,
  "badge-tinted": BadgeTinted,

  "card-demo": CardDemo,

  "checkbox-demo": CheckboxDemo,

  "collapse-demo": CollapseDemo,
  "collapse-accordion": CollapseAccordion,

  "input-demo": InputDemo,

  "select-demo": SelectDemo,

  "radio-demo": RadioDemo,

  "modal-demo": ModalDemo,

  "toast-demo": ToastDemo,

  "pagination-demo": PaginationDemo,

  "tab-demo": TabDemo,

  "table-demo": TableDemo,

  "toc-demo": TocDemo,

  "navigation-demo": NavigationDemo,

  "sidemenu-demo": SidemenuDemo,
};

export function getRegistryComponent(name: string) {
  return componentRegistry[name];
}
