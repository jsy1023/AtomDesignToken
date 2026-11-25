'use client';

import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, NativeSelect } from '@/components/ui';
import { PaletteVariable } from '@/lib/data/studioData';
import { useStudio } from '@/components/studio/context/StudioContext';

export function AddPaletteModal() {
  const { locale, t, isAddPaletteOpen, setIsAddPaletteOpen, handleCreatePalette } = useStudio();

  const [newPaletteName, setNewPaletteName] = useState('');
  const [newPaletteId, setNewPaletteId] = useState('');
  const [newPaletteCategory, setNewPaletteCategory] = useState<PaletteVariable['category']>('color');
  const [newPaletteFamily, setNewPaletteFamily] = useState('blue');
  const [newPaletteValue, setNewPaletteValue] = useState('var(--accent-primary)');
  const [newPaletteDesc, setNewPaletteDesc] = useState('');

  const handleSubmit = () => {
    if (!newPaletteName.trim() || !newPaletteId.trim() || !newPaletteValue.trim()) return;
    handleCreatePalette({
      id: newPaletteId,
      name: newPaletteName,
      category: newPaletteCategory,
      value: newPaletteValue,
      description: newPaletteDesc,
      family: newPaletteFamily,
    });
    setNewPaletteName('');
    setNewPaletteId('');
    setNewPaletteValue('var(--accent-primary)');
    setNewPaletteDesc('');
  };

  return (
    <Modal isOpen={isAddPaletteOpen} onClose={() => setIsAddPaletteOpen(false)} title={t('addPaletteBtn')}>
      <div className="space-y-4 text-xs">
        <div className="space-y-3">
          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {t('paletteNameLabel')}
            </label>
            <Input
              type="text"
              value={newPaletteName}
              onChange={(e) => setNewPaletteName(e.target.value)}
              placeholder="예: Brand Cyan 500"
              autoFocus
            />
          </div>

          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {t('paletteIdLabel')}
            </label>
            <Input
              type="text"
              value={newPaletteId}
              onChange={(e) => setNewPaletteId(e.target.value)}
              placeholder="예: --atom-palette-cyan-500"
              className="font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-(--text-secondary) block mb-1">
                {t('thPaletteCategory')}
              </label>
              <NativeSelect
                value={newPaletteCategory}
                onChange={(e) => setNewPaletteCategory(e.target.value as PaletteVariable['category'])}
                className="w-full"
              >
                <option value="color">Color</option>
                <option value="size">Size / Spacing</option>
                <option value="radius">Border Radius</option>
                <option value="typography">Typography</option>
              </NativeSelect>
            </div>

            {newPaletteCategory === 'color' && (
              <div>
                <label className="font-semibold text-(--text-secondary) block mb-1">
                  Color Family
                </label>
                <NativeSelect
                  value={newPaletteFamily}
                  onChange={(e) => setNewPaletteFamily(e.target.value)}
                  className="w-full"
                >
                  <option value="blue">Blue</option>
                  <option value="gray">Gray</option>
                  <option value="emerald">Emerald</option>
                  <option value="rose">Rose</option>
                  <option value="amber">Amber</option>
                  <option value="purple">Purple</option>
                  <option value="neutral">Neutral</option>
                </NativeSelect>
              </div>
            )}
          </div>

          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {t('thPaletteValue')}
            </label>
            <Input
              type="text"
              value={newPaletteValue}
              onChange={(e) => setNewPaletteValue(e.target.value)}
              placeholder="예: #06b6d4, 16px, 8px"
              className="font-mono"
            />
          </div>

          <div>
            <label className="font-semibold text-(--text-secondary) block mb-1">
              {t('paletteDescLabel')}
            </label>
            <Input
              type="text"
              value={newPaletteDesc}
              onChange={(e) => setNewPaletteDesc(e.target.value)}
              placeholder="예: 테크 지향적 포인트 컬러"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
          <Button variant="secondary" size="sm" onClick={() => setIsAddPaletteOpen(false)}>
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

export function EditPaletteModal() {
  const { locale, t, editingPalette, setEditingPalette, handleSaveEditPalette } = useStudio();
  const [editName, setEditName] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    if (editingPalette) {
      setEditName(editingPalette.name);
      setEditValue(editingPalette.value);
      setEditDesc(editingPalette.description || '');
    }
  }, [editingPalette]);

  return (
    <Modal
      isOpen={!!editingPalette}
      onClose={() => setEditingPalette(null)}
      title={
        editingPalette
          ? `${locale === 'ko' ? '팔레트 토큰 값 수정' : 'Edit Palette Token'} (${editingPalette.id})`
          : ''
      }
    >
      {editingPalette && (
        <div className="space-y-4 text-xs">
          <div className="space-y-3">
            <div>
              <label className="font-semibold text-(--text-secondary) block mb-1">
                {t('paletteNameLabel')}
              </label>
              <Input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="예: Blue 500"
                autoFocus
              />
            </div>

            <div>
              <label className="font-semibold text-(--text-secondary) block mb-1">
                {t('thPaletteValue')}
              </label>
              <div className="flex items-center gap-2">
                {editingPalette.category === 'color' && (
                  <span
                    style={{ backgroundColor: editValue }}
                    className="w-7 h-7 rounded border border-(--border-subtle) shrink-0 shadow-xs"
                  />
                )}
                <Input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="예: var(--accent-primary), 16px, 8px"
                  className="font-mono flex-1"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-(--text-secondary) block mb-1">
                {t('paletteDescLabel')}
              </label>
              <Input
                type="text"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="예: 기본 브랜드 블루 컬러"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-(--border-subtle)">
            <Button variant="secondary" size="sm" onClick={() => setEditingPalette(null)}>
              {t('cancel')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                handleSaveEditPalette(editingPalette.id, {
                  name: editName,
                  value: editValue,
                  description: editDesc,
                })
              }
            >
              {locale === 'ko' ? '저장하기' : 'Save Changes'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
