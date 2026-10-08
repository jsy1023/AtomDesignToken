"use client";

import React, { Suspense } from 'react';
import { DashboardShowcaseContent } from './DashboardShowcaseContent';

export default function DashboardShowcasePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <DashboardShowcaseContent />
    </Suspense>
  );
}
