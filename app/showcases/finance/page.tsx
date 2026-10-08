"use client";

import React, { Suspense } from 'react';
import { FinanceShowcaseContent } from './FinanceShowcaseContent';

export default function FinanceShowcasePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <FinanceShowcaseContent />
    </Suspense>
  );
}
