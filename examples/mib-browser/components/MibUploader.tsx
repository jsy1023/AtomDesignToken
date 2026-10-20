'use client';

import React, { useRef, useState } from 'react';
import { Upload, FileText, Sparkles, X, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { SAMPLE_MIBS, SampleMibEntry } from '@/lib/data/sampleMibs';
import { MibDocument } from '@/lib/data/mibModels';

interface MibUploaderProps {
  documents: MibDocument[];
  onUploadFile: (files: { name: string; content: string }[]) => void;
  onLoadSample: (sample: SampleMibEntry) => void;
  onRemoveDocument: (docId: string) => void;
  isLoading?: boolean;
}

export function MibUploader({
  documents,
  onUploadFile,
  onLoadSample,
  onRemoveDocument,
  isLoading = false,
}: MibUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processFiles(Array.from(files));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  const processFiles = async (files: File[]) => {
    const fileContents: { name: string; content: string }[] = [];
    for (const file of files) {
      try {
        const text = await file.text();
        fileContents.push({ name: file.name, content: text });
      } catch (err) {
        console.error(`Failed to read file ${file.name}`, err);
      }
    }
    if (fileContents.length > 0) {
      onUploadFile(fileContents);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 1. 드래그 앤 드롭 영역 및 업로드 버튼 */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? 'border-[var(--accent-primary)] bg-[var(--accent-light)]/40 scale-[0.99]'
            : 'border-[var(--border-strong)] bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)]/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".mib,.my,.txt"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[var(--accent-primary)] flex items-center justify-center transition-transform group-hover:scale-110">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm font-bold text-[var(--text-primary)]">
              MIB 파일 업로드
            </span>
            <span className="text-xs text-[var(--text-secondary)] block mt-0.5">
              .mib, .my, .txt 파일을 드래그하거나 클릭하여 추가하세요 (다중 업로드 지원)
            </span>
          </div>
        </div>
      </div>

      {/* 2. 빠른 샘플 MIB 로드 칩스 */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          샘플 MIB 즉시 로드:
        </span>
        {SAMPLE_MIBS.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => onLoadSample(sample)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--accent-light)] border border-[var(--border-strong)] hover:border-[var(--accent-primary)]/40 text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-all shadow-xs active:scale-95 disabled:opacity-50"
            title={sample.description}
          >
            <Plus className="w-3 h-3 text-[var(--accent-primary)]" />
            <span>{sample.name}</span>
          </button>
        ))}
      </div>

      {/* 3. 업로드된 MIB 파일 리스트 */}
      {documents.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-[var(--border-subtle)]">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">
            로드된 모듈 ({documents.length}):
          </span>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="group flex items-center gap-2 px-3 py-1 rounded-xl bg-white dark:bg-neutral-800 border border-[var(--border-subtle)] shadow-xs text-xs font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-semibold text-[var(--text-primary)]">{doc.moduleName}</span>
              <span className="text-[10px] text-[var(--text-muted)]">({doc.nodeCount} OID)</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveDocument(doc.id);
                }}
                className="opacity-60 group-hover:opacity-100 hover:text-red-500 transition-opacity p-0.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
                title="이 MIB 제거"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
