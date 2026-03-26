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

export const componentRegistry: Record<string, React.ElementType> = {
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
};

export function getRegistryComponent(name: string) {
  return componentRegistry[name];
}
