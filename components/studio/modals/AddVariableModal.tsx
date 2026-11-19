'use client';

import React, { useState } from 'react';
import { Button, Input, Modal } from '@/components/ui';
import { useStudio } from '@/components/studio/context/StudioContext';
import { formatLocaleText } from '@/lib/utils/localeFormat';

export function AddVariableModal() {
  const {
    locale,
    t,
    currentComponent,
    isAddVariableOpen,
    setIsAddVariableOpen,
    handleCreateVariable,
  } = useStudio();

  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableKey, setNewVariableKey] = useState('');
  const [newVariableDesc, setNewVariableDesc] = useState('');

  const handleSubmit = () => {
    if (!newVariableName.trim() || !newVariableKey.trim()) return;
    handleCreateVariable({
      id: newVariableKey,
      name: newVariableName,
      description: newVariableDesc,
    });
    setNewVariableName('');
    setNewVariableKey('');
    setNewVariableDesc('');
  };

  return (
    <Modal
      isOpen={isAddVariableOpen}
      onClose={() => setIsAddVariableOpen(false)}
      title={`${t('addVariableBtn')} (${formatLocaleText(currentComponent.name, locale)})`}
    >
      <div className="space-y-4 text-xs">
        <div className="space-y-3">
          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {t('variableNameLabel')}
            </label>
            <Input
              type="text"
              value={newVariableName}
              onChange={(e) => setNewVariableName(e.target.value)}
              placeholder={locale === 'ko' ? '예: 라운드 필 버튼' : 'e.g. Pill CTA Button'}
              autoFocus
            />
          </div>

          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {t('variableKeyLabel')}
            </label>
            <Input
              type="text"
              value={newVariableKey}
              onChange={(e) => setNewVariableKey(e.target.value)}
              placeholder="예: pill-cta"
              className="font-mono"
            />
          </div>

          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {t('variableDescLabel')}
            </label>
            <Input
              type="text"
              value={newVariableDesc}
              onChange={(e) => setNewVariableDesc(e.target.value)}
              placeholder="예: 랜딩 페이지 전용 라운드 디자인"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
          <Button variant="secondary" size="sm" onClick={() => setIsAddVariableOpen(false)}>
            {t('cancel')}
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {locale === 'ko' ? '생성하기' : 'Create'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
