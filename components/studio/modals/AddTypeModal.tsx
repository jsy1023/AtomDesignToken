'use client';

import React, { useState } from 'react';
import { Button, Input, Modal } from '@/components/ui';
import { useStudio } from '@/components/studio/context/StudioContext';
import { formatLocaleText } from '@/lib/utils/localeFormat';

export function AddTypeModal() {
  const { locale, t, currentComponent, isAddTypeOpen, setIsAddTypeOpen, handleCreateType } =
    useStudio();

  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeKey, setNewTypeKey] = useState('');
  const [newTypeDesc, setNewTypeDesc] = useState('');
  const [newTypeWhenToUse, setNewTypeWhenToUse] = useState('');

  const handleSubmit = () => {
    if (!newTypeName.trim() || !newTypeKey.trim()) return;
    handleCreateType({
      id: newTypeKey,
      name: newTypeName,
      description: newTypeDesc,
      whenToUse: newTypeWhenToUse,
    });
    setNewTypeName('');
    setNewTypeKey('');
    setNewTypeDesc('');
    setNewTypeWhenToUse('');
  };

  return (
    <Modal
      isOpen={isAddTypeOpen}
      onClose={() => setIsAddTypeOpen(false)}
      title={
        locale === 'ko'
          ? `새 디자인 양식(Type) 추가 — ${formatLocaleText(currentComponent.name, locale)}`
          : `Add New Design Type — ${formatLocaleText(currentComponent.name, locale)}`
      }
    >
      <div className="space-y-4 text-xs">
        <p className="text-(--text-secondary) leading-relaxed">
          {locale === 'ko'
            ? '기존 디자인의 색상 옵션(Variable)이 아닌, 형태와 조형 자체가 다른 새로운 디자인 양식(예: Ghost, Pill, Floating, Glassmorphic 등)을 신설합니다.'
            : 'Define a completely new visual structure/shape rather than a simple color variation.'}
        </p>

        <div className="space-y-3">
          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {locale === 'ko' ? 'Type 이름 (예: Pill 라운드 캡슐형)' : 'Type Name'}
            </label>
            <Input
              type="text"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              placeholder={locale === 'ko' ? '예: Floating 그림자형' : 'e.g. Floating Elevated'}
              autoFocus
            />
          </div>

          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {locale === 'ko' ? 'Type Key/식별자 (영문)' : 'Type Key'}
            </label>
            <Input
              type="text"
              value={newTypeKey}
              onChange={(e) => setNewTypeKey(e.target.value)}
              placeholder="예: floating-elevated"
              className="font-mono"
            />
          </div>

          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {locale === 'ko' ? '디자인 설명 (특징 요약)' : 'Description'}
            </label>
            <Input
              type="text"
              value={newTypeDesc}
              onChange={(e) => setNewTypeDesc(e.target.value)}
              placeholder="예: 바닥면과 분리되는 입체 섀도우 플로팅 형태"
            />
          </div>

          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {locale === 'ko' ? '사용 시점 및 가이드 (When to use)' : 'When To Use'}
            </label>
            <Input
              type="text"
              value={newTypeWhenToUse}
              onChange={(e) => setNewTypeWhenToUse(e.target.value)}
              placeholder="예: 복잡한 리스트 상단이나 지도 화면의 플로팅 액션에 사용"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
          <Button variant="secondary" size="sm" onClick={() => setIsAddTypeOpen(false)}>
            {t('cancel')}
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} className="font-bold">
            {locale === 'ko' ? 'Type 신설하기' : 'Create Type'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
