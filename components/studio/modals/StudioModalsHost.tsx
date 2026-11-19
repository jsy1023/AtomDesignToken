'use client';

import React from 'react';
import { PaletteScaleGeneratorModal } from '@/components/studio/PaletteScaleGeneratorModal';
import { StudioComponentSubmitModal } from '@/components/studio/StudioComponentSubmitModal';
import { useStudio } from '@/components/studio/context/StudioContext';
import { AddTypeModal } from './AddTypeModal';
import { AddVariableModal } from './AddVariableModal';
import { AddPaletteModal, EditPaletteModal } from './PaletteTokenModal';

export function StudioModalsHost() {
  const {
    locale,
    isPaletteGeneratorOpen,
    setIsPaletteGeneratorOpen,
    handleAddPaletteScale,
    isSubmitComponentOpen,
    setIsSubmitComponentOpen,
    handleSubmittedComponent,
  } = useStudio();

  return (
    <>
      <AddTypeModal />
      <AddVariableModal />
      <AddPaletteModal />
      <EditPaletteModal />
      <PaletteScaleGeneratorModal
        isOpen={isPaletteGeneratorOpen}
        onClose={() => setIsPaletteGeneratorOpen(false)}
        onAddScale={handleAddPaletteScale}
        locale={locale}
      />
      <StudioComponentSubmitModal
        isOpen={isSubmitComponentOpen}
        onClose={() => setIsSubmitComponentOpen(false)}
        locale={locale}
        onSubmitted={handleSubmittedComponent}
      />
    </>
  );
}
