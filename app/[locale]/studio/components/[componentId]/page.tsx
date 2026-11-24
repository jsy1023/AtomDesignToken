'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ComponentStudioWorkspace } from '@/components/studio/workspace/ComponentStudioWorkspace';
import { useStudio } from '@/components/studio/context/StudioContext';
import { resolveStudioComponentId } from '@/lib/data/studioData';

export default function StudioComponentDetailPage() {
  const params = useParams();
  const rawComponentId = typeof params?.componentId === 'string' ? params.componentId : '';
  const resolvedId = resolveStudioComponentId(rawComponentId);
  const { selectedComponentId, handleSelectComponent, components } = useStudio();

  useEffect(() => {
    if (resolvedId && resolvedId !== selectedComponentId && components.some((c) => c.id === resolvedId)) {
      handleSelectComponent(resolvedId);
    }
  }, [resolvedId, selectedComponentId, components, handleSelectComponent]);

  return <ComponentStudioWorkspace />;
}
