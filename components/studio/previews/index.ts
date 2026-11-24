import React from 'react';
import { StudioPreviewItemProps } from './types';
import { ButtonStudioPreview } from './ButtonStudioPreview';
import {
  CheckboxStudioPreview,
  InputStudioPreview,
  RadioStudioPreview,
  SelectStudioPreview,
  SliderStudioPreview,
  SwitchStudioPreview,
  TextareaStudioPreview,
  TokenSelectStudioPreview,
} from './FormStudioPreviews';
import {
  BreadcrumbStudioPreview,
  NavbarStudioPreview,
  NavStudioPreview,
  PaginationStudioPreview,
  SidebarStudioPreview,
  TabsStudioPreview,
  TreeStudioPreview,
} from './NavigationStudioPreviews';
import {
  AccordionStudioPreview,
  AvatarStudioPreview,
  BadgeStudioPreview,
  CalendarStudioPreview,
  CardStudioPreview,
  ChartStudioPreview,
  ContainerStudioPreview,
  LayoutStudioPreview,
  SeparatorStudioPreview,
  TableStudioPreview,
} from './DataLayoutStudioPreviews';
import {
  AlertStudioPreview,
  GenericStudioPreview,
  ModalStudioPreview,
  OffcanvasStudioPreview,
  ProgressStudioPreview,
  SheetStudioPreview,
  SkeletonStudioPreview,
  ToastStudioPreview,
  TooltipStudioPreview,
} from './FeedbackStudioPreviews';

export type StudioPreviewRenderer = React.ComponentType<StudioPreviewItemProps>;

export const STUDIO_PREVIEW_REGISTRY: Record<string, StudioPreviewRenderer> = {
  button: ButtonStudioPreview,
  badge: BadgeStudioPreview,
  card: CardStudioPreview,
  input: InputStudioPreview,
  modal: ModalStudioPreview,
  textarea: TextareaStudioPreview,
  switch: SwitchStudioPreview,
  tabs: TabsStudioPreview,
  table: TableStudioPreview,
  avatar: AvatarStudioPreview,
  navbar: NavbarStudioPreview,
  sidebar: SidebarStudioPreview,
  sidemenu: SidebarStudioPreview,
  nav: NavStudioPreview,
  checkbox: CheckboxStudioPreview,
  select: SelectStudioPreview,
  radio: RadioStudioPreview,
  slider: SliderStudioPreview,
  progress: ProgressStudioPreview,
  skeleton: SkeletonStudioPreview,
  tooltip: TooltipStudioPreview,
  accordion: AccordionStudioPreview,
  breadcrumb: BreadcrumbStudioPreview,
  pagination: PaginationStudioPreview,
  separator: SeparatorStudioPreview,
  calendar: CalendarStudioPreview,
  chart: ChartStudioPreview,
  offcanvas: OffcanvasStudioPreview,
  toast: ToastStudioPreview,
  container: ContainerStudioPreview,
  layout: LayoutStudioPreview,
  tree: TreeStudioPreview,
  'token-select': TokenSelectStudioPreview,
  alert: AlertStudioPreview,
  sheet: SheetStudioPreview,
};

export function resolveStudioPreviewRenderer(componentId: string): StudioPreviewRenderer {
  const key = (componentId || '').trim().toLowerCase();
  return STUDIO_PREVIEW_REGISTRY[key] || GenericStudioPreview;
}

export * from './types';
export * from './ButtonStudioPreview';
export * from './FormStudioPreviews';
export * from './NavigationStudioPreviews';
export * from './DataLayoutStudioPreviews';
export * from './FeedbackStudioPreviews';
