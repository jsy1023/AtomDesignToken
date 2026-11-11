'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  File,
} from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  extension?: 'tsx' | 'ts' | 'json' | 'css' | 'svg' | 'md';
  size?: string;
  updatedAt: string;
  content?: string;
  children?: FileNode[];
}

const FILE_TREE: FileNode[] = [
  {
    id: 'f-tokens',
    name: 'tokens',
    type: 'folder',
    updatedAt: '2026.11.11',
    children: [
      {
        id: 'f-color',
        name: 'color.json',
        type: 'file',
        extension: 'json',
        size: '1.8 KB',
        updatedAt: '2026.11.11 10:20',
        content: `{\n  "color": {\n    "primary": { "value": "var(--accent-primary)" },\n    "neutral": { "value": "var(--bg-primary)" }\n  }\n}`,
      },
      {
        id: 'f-space',
        name: 'spacing.json',
        type: 'file',
        extension: 'json',
        size: '1.2 KB',
        updatedAt: '2026.11.11 09:15',
        content: `{\n  "spacing": {\n    "1": { "value": "4px" },\n    "2": { "value": "8px" },\n    "4": { "value": "16px" }\n  }\n}`,
      },
    ],
  },
  {
    id: 'f-components',
    name: 'components',
    type: 'folder',
    updatedAt: '2026.11.11',
    children: [
      {
        id: 'f-btn',
        name: 'Button.tsx',
        type: 'file',
        extension: 'tsx',
        size: '3.4 KB',
        updatedAt: '2026.11.11 09:30',
        content: `export function Button({ children, variant = 'primary' }) {\n  return (\n    <button className="px-4 py-2 rounded-(--radius) bg-(--accent-primary) text-white font-medium">\n      {children}\n    </button>\n  );\n}`,
      },
      {
        id: 'f-card',
        name: 'Card.tsx',
        type: 'file',
        extension: 'tsx',
        size: '4.2 KB',
        updatedAt: '2026.11.10 16:20',
        content: `export function Card({ title, children }) {\n  return (\n    <div className="p-4 rounded-(--radius) border border-(--border-subtle) bg-(--bg-primary)">\n      <h3>{title}</h3>\n      {children}\n    </div>\n  );\n}`,
      },
    ],
  },
];

export function FileExplorerBlock() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'f-tokens': true,
    'f-components': true,
  });

  const [selectedFile, setSelectedFile] = useState<FileNode>(
    FILE_TREE[0].children![0]
  );
  const [copied, setCopied] = useState(false);

  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const getFileIcon = (ext?: string) => {
    switch (ext) {
      case 'tsx':
      case 'ts':
        return <FileCode className="w-3.5 h-3.5 text-blue-500" />;
      case 'json':
        return <FileJson className="w-3.5 h-3.5 text-amber-500" />;
      case 'md':
        return <FileText className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <File className="w-3.5 h-3.5 text-(--text-secondary)" />;
    }
  };

  const handleCopy = () => {
    if (selectedFile.content) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="flex flex-col md:flex-row h-[380px] overflow-hidden transition-colors">
      {/* 1. Left Tree Nav */}
      <aside className="w-full md:w-56 border-r border-(--border-subtle) bg-(--bg-secondary)/20 p-3 overflow-y-auto shrink-0 space-y-1 text-xs">
        <div className="text-[11px] font-mono text-(--text-secondary) uppercase tracking-wider px-2 py-1 mb-1">
          Project Files
        </div>
        {FILE_TREE.map((node) => {
          const isOpen = openFolders[node.id];
          return (
            <div key={node.id} className="space-y-0.5">
              <button
                onClick={() => toggleFolder(node.id)}
                className="w-full flex items-center gap-1.5 px-2 py-1 rounded-(--radius-sm) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) text-left transition-colors"
              >
                {isOpen ? (
                  <ChevronDown className="w-3 h-3 text-(--text-secondary)" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-(--text-secondary)" />
                )}
                {isOpen ? (
                  <FolderOpen className="w-3.5 h-3.5 text-(--accent-primary)" />
                ) : (
                  <Folder className="w-3.5 h-3.5 text-(--text-secondary)" />
                )}
                <span className="font-medium truncate">{node.name}</span>
              </button>

              {isOpen && node.children && (
                <div className="pl-4 space-y-0.5 border-l border-(--border-subtle) ml-3">
                  {node.children.map((file) => {
                    const isSelected = selectedFile?.id === file.id;
                    return (
                      <button
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-(--radius-sm) text-left transition-colors ${
                          isSelected
                            ? 'bg-(--accent-primary)/10 text-(--accent-primary) font-semibold'
                            : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                        }`}
                      >
                        {getFileIcon(file.extension)}
                        <span className="truncate">{file.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </aside>

      {/* 2. File Preview & Code Area composed with Button & Card */}
      <main className="flex-1 flex flex-col bg-(--bg-primary) overflow-hidden">
        <div className="px-4 py-2.5 border-b border-(--border-subtle) bg-(--bg-secondary)/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {getFileIcon(selectedFile.extension)}
            <span className="font-mono font-medium text-(--text-primary)">{selectedFile.name}</span>
            <Badge variant="neutral" className="text-xs">
              {selectedFile.size}
            </Badge>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs py-1 px-2.5 flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? '복사됨' : '코드 복사'}</span>
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed bg-(--bg-secondary)/10">
          <pre className="text-(--text-primary)">{selectedFile.content}</pre>
        </div>
      </main>
    </Card>
  );
}
