'use client';

import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  Image as ImageIcon,
  ChevronRight,
  ChevronDown,
  Search,
  LayoutGrid,
  List as ListIcon,
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  HardDrive,
  File,
  Eye,
  ExternalLink,
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
    id: 'f-src',
    name: 'src',
    type: 'folder',
    updatedAt: '2026.11.10',
    children: [
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
            updatedAt: '2026.11.10 14:20',
            content: `import React from 'react';\n\nexport interface ButtonProps {\n  variant?: 'primary' | 'secondary';\n  children: React.ReactNode;\n}\n\nexport const Button = ({ variant = 'primary', children }: ButtonProps) => {\n  return <button className={\`atom-btn-\${variant}\`}>{children}</button>;\n};`,
          },
          {
            id: 'f-card',
            name: 'Card.tsx',
            type: 'file',
            extension: 'tsx',
            size: '2.1 KB',
            updatedAt: '2026.11.09 11:15',
            content: `export const Card = ({ title, children }) => (\n  <div className="atom-card">\n    <h3>{title}</h3>\n    {children}\n  </div>\n);`,
          },
          {
            id: 'f-input',
            name: 'Input.tsx',
            type: 'file',
            extension: 'tsx',
            size: '1.8 KB',
            updatedAt: '2026.11.08 17:40',
            content: `export const Input = (props) => <input className="atom-input" {...props} />;`,
          },
        ],
      },
      {
        id: 'f-tokens',
        name: 'tokens',
        type: 'folder',
        updatedAt: '2026.11.11',
        children: [
          {
            id: 'f-tokens-json',
            name: 'tokens.json',
            type: 'file',
            extension: 'json',
            size: '18.6 KB',
            updatedAt: '2026.11.11 09:30',
            content: `{\n  "color": {\n    "primary": { "value": "#3182f6", "type": "color" },\n    "bg": { "value": "#ffffff", "type": "color" }\n  }\n}`,
          },
          {
            id: 'f-token-types',
            name: 'token.types.ts',
            type: 'file',
            extension: 'ts',
            size: '4.2 KB',
            updatedAt: '2026.11.10 16:55',
            content: `export type ColorToken = 'primary' | 'secondary' | 'accent';`,
          },
        ],
      },
    ],
  },
  {
    id: 'f-public',
    name: 'public',
    type: 'folder',
    updatedAt: '2026.11.05',
    children: [
      {
        id: 'f-logo',
        name: 'atom-logo.svg',
        type: 'file',
        extension: 'svg',
        size: '5.2 KB',
        updatedAt: '2026.11.05 10:00',
        content: `<svg viewBox="0 0 100 100" fill="none">\n  <circle cx="50" cy="50" r="40" stroke="#3182f6" strokeWidth="8"/>\n</svg>`,
      },
    ],
  },
  {
    id: 'f-readme',
    name: 'README.md',
    type: 'file',
    extension: 'md',
    size: '6.8 KB',
    updatedAt: '2026.11.10 18:00',
    content: `# AtomDesignToken\n\nFramework-Agnostic W3C DTCG Token Architecture with 0KB Runtime.`,
  },
  {
    id: 'f-package',
    name: 'package.json',
    type: 'file',
    extension: 'json',
    size: '2.5 KB',
    updatedAt: '2026.11.11 08:45',
    content: `{\n  "name": "atomsystem",\n  "version": "0.4.0",\n  "type": "module"\n}`,
  },
];

export function FileExplorerBlock() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'f-src': true,
    'f-components': true,
    'f-tokens': false,
    'f-public': false,
  });

  const [currentFolder, setCurrentFolder] = useState<FileNode>({
    id: 'f-components',
    name: 'components',
    type: 'folder',
    updatedAt: '2026.11.11',
    children: FILE_TREE[0].children![0].children,
  });

  const [selectedFile, setSelectedFile] = useState<FileNode>(
    FILE_TREE[0].children![0].children![0]
  );

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const getFileIcon = (ext?: string) => {
    switch (ext) {
      case 'tsx':
      case 'ts':
        return <FileCode className="w-4 h-4 text-blue-500" />;
      case 'json':
        return <FileJson className="w-4 h-4 text-amber-500" />;
      case 'svg':
        return <ImageIcon className="w-4 h-4 text-emerald-500" />;
      case 'md':
        return <FileText className="w-4 h-4 text-purple-500" />;
      default:
        return <File className="w-4 h-4 text-(--text-muted)" />;
    }
  };

  const copyContent = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentFiles = (currentFolder.children || []).filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-(--bg-primary) rounded-2xl border border-(--border-subtle) shadow-sm overflow-hidden flex flex-col h-[520px] transition-colors">
      {/* Top Header & Breadcrumb & Action Toolbar */}
      <div className="px-4 py-3 border-b border-(--border-subtle) bg-(--bg-secondary)/40 flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-(--text-secondary)">
          <HardDrive className="w-4 h-4 text-(--accent-primary)" />
          <span>project-root</span>
          <ChevronRight className="w-3.5 h-3.5 text-(--text-muted)" />
          <span>src</span>
          <ChevronRight className="w-3.5 h-3.5 text-(--text-muted)" />
          <span className="font-bold text-(--text-primary) px-1.5 py-0.5 rounded bg-(--bg-secondary)">
            {currentFolder.name}
          </span>
        </div>

        {/* Search, View Mode & New File */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="파일 검색..."
              className="text-xs pl-8 pr-3 py-1 rounded-lg bg-(--bg-primary) text-(--text-primary) border border-(--border-subtle) focus:outline-none focus:border-(--accent-primary) w-32 sm:w-44 transition-colors"
            />
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-(--bg-primary) border border-(--border-subtle)">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="그리드 뷰"
              className={`p-1 rounded ${
                viewMode === 'grid'
                  ? 'bg-(--bg-secondary) text-(--text-primary)'
                  : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              aria-label="테이블 뷰"
              className={`p-1 rounded ${
                viewMode === 'table'
                  ? 'bg-(--bg-secondary) text-(--text-primary)'
                  : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-(--accent-primary) text-white shadow-xs hover:bg-(--accent-hover) transition-colors">
            <Plus className="w-3 h-3" />
            <span>추가</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Body: Tree Sidebar | File List Viewport | File Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. Left Tree Sidebar */}
        <aside className="w-48 sm:w-56 border-r border-(--border-subtle) bg-(--bg-secondary)/20 p-3 overflow-y-auto shrink-0 select-none">
          <div className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider mb-2 px-1">
            EXPLORER TREE
          </div>

          <div className="space-y-0.5 text-xs">
            {FILE_TREE.map((node) => {
              if (node.type === 'folder') {
                const isOpen = openFolders[node.id];
                return (
                  <div key={node.id}>
                    <button
                      onClick={() => toggleFolder(node.id)}
                      className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors text-left"
                    >
                      {isOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-(--text-muted)" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-(--text-muted)" />
                      )}
                      {isOpen ? (
                        <FolderOpen className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                      ) : (
                        <Folder className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                      )}
                      <span className="font-semibold truncate">{node.name}</span>
                    </button>

                    {/* Subfolders & Subfiles */}
                    {isOpen && node.children && (
                      <div className="pl-4 space-y-0.5 border-l border-(--border-subtle) ml-3.5 my-0.5">
                        {node.children.map((sub) => {
                          if (sub.type === 'folder') {
                            const isSubOpen = openFolders[sub.id];
                            const isCurrent = currentFolder.id === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  toggleFolder(sub.id);
                                  setCurrentFolder(sub);
                                }}
                                className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-left transition-colors ${
                                  isCurrent
                                    ? 'bg-(--accent-primary)/10 text-(--accent-primary) font-bold'
                                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                                }`}
                              >
                                {isSubOpen ? (
                                  <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
                                ) : (
                                  <Folder className="w-3.5 h-3.5 text-amber-500" />
                                )}
                                <span className="truncate">{sub.name}</span>
                              </button>
                            );
                          } else {
                            const isSelected = selectedFile?.id === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => setSelectedFile(sub)}
                                className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-left transition-colors ${
                                  isSelected
                                    ? 'bg-(--accent-primary)/10 text-(--accent-primary) font-semibold'
                                    : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)'
                                }`}
                              >
                                {getFileIcon(sub.extension)}
                                <span className="truncate">{sub.name}</span>
                              </button>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedFile(node)}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) text-left"
                  >
                    {getFileIcon(node.extension)}
                    <span className="truncate">{node.name}</span>
                  </button>
                );
              }
            })}
          </div>
        </aside>

        {/* 2. Middle Files Viewport */}
        <main className="flex-1 p-4 overflow-y-auto bg-(--bg-primary)">
          <div className="flex items-center justify-between text-xs text-(--text-muted) mb-3 pb-2 border-b border-(--border-subtle)">
            <span>{currentFiles.length}개 파일 항목</span>
            <span>최종 갱신: {currentFolder.updatedAt}</span>
          </div>

          {currentFiles.length === 0 ? (
            <div className="py-16 text-center text-xs text-(--text-muted)">
              검색된 파일이 없습니다.
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid Mode */
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentFiles.map((file) => {
                const isSelected = selectedFile?.id === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`group p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-(--accent-primary) bg-(--accent-primary)/5 shadow-xs ring-2 ring-(--accent-primary)/10'
                        : 'border-(--border-subtle) hover:border-(--border-strong) bg-(--bg-secondary)/30 hover:bg-(--bg-secondary)'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-(--bg-primary) border border-(--border-subtle)">
                        {getFileIcon(file.extension)}
                      </div>
                      <span className="text-[10px] font-mono text-(--text-muted) uppercase">
                        {file.extension}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-(--text-primary) truncate mb-1">
                        {file.name}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-(--text-muted)">
                        <span>{file.size}</span>
                        <span>{file.updatedAt.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table Mode */
            <div className="border border-(--border-subtle) rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-(--bg-secondary)/60 text-(--text-muted) text-[11px] font-semibold border-b border-(--border-subtle)">
                  <tr>
                    <th className="p-2.5 pl-3">이름</th>
                    <th className="p-2.5">유형</th>
                    <th className="p-2.5">크기</th>
                    <th className="p-2.5">수정 일시</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--border-subtle)">
                  {currentFiles.map((file) => {
                    const isSelected = selectedFile?.id === file.id;
                    return (
                      <tr
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-(--accent-primary)/10 font-semibold text-(--accent-primary)'
                            : 'hover:bg-(--bg-secondary)/50 text-(--text-primary)'
                        }`}
                      >
                        <td className="p-2.5 pl-3 flex items-center gap-2">
                          {getFileIcon(file.extension)}
                          <span>{file.name}</span>
                        </td>
                        <td className="p-2.5 text-(--text-muted) uppercase font-mono text-[10px]">
                          {file.extension}
                        </td>
                        <td className="p-2.5 text-(--text-secondary)">{file.size}</td>
                        <td className="p-2.5 text-(--text-muted)">{file.updatedAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* 3. Right File Preview & Inspector Panel */}
        <aside className="w-60 sm:w-72 border-l border-(--border-subtle) bg-(--bg-secondary)/30 p-4 flex flex-col justify-between overflow-y-auto shrink-0">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-(--border-subtle)">
              <span className="text-[11px] font-bold text-(--text-muted) uppercase tracking-wider flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                파일 인스펙터
              </span>
              <button
                onClick={() => copyContent(selectedFile?.content)}
                className="text-[10px] text-(--accent-primary) font-semibold flex items-center gap-1 hover:underline"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '복사됨' : '내용 복사'}</span>
              </button>
            </div>

            {selectedFile ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-(--bg-primary) border border-(--border-subtle)">
                  <div className="p-2 rounded-lg bg-(--bg-secondary)">
                    {getFileIcon(selectedFile.extension)}
                  </div>
                  <div className="truncate">
                    <h5 className="text-xs font-bold text-(--text-primary) truncate">
                      {selectedFile.name}
                    </h5>
                    <span className="text-[10px] text-(--text-muted)">{selectedFile.size}</span>
                  </div>
                </div>

                {/* Details Meta */}
                <div className="text-[11px] space-y-1.5 p-2.5 rounded-lg bg-(--bg-primary)/60 border border-(--border-subtle)">
                  <div className="flex justify-between text-(--text-secondary)">
                    <span>확장자</span>
                    <span className="font-mono uppercase font-bold text-(--text-primary)">
                      {selectedFile.extension}
                    </span>
                  </div>
                  <div className="flex justify-between text-(--text-secondary)">
                    <span>수정 일시</span>
                    <span className="text-(--text-primary)">{selectedFile.updatedAt}</span>
                  </div>
                  <div className="flex justify-between text-(--text-secondary)">
                    <span>보안 검증</span>
                    <span className="text-emerald-500 font-semibold">100% Verified</span>
                  </div>
                </div>

                {/* File Preview Snippet */}
                <div>
                  <span className="text-[10px] font-bold text-(--text-muted) mb-1 block">
                    코드/데이터 미리보기
                  </span>
                  <div className="rounded-lg bg-(--bg-primary) border border-(--border-subtle) p-2 text-[10px] font-mono text-(--text-secondary) overflow-x-auto max-h-36 leading-relaxed">
                    <pre>
                      <code>{selectedFile.content || '// 파일 내용이 없습니다.'}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-xs text-(--text-muted)">
                선택된 파일이 없습니다.
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-(--border-subtle) flex gap-2">
            <button
              onClick={() => copyContent(selectedFile?.content)}
              className="flex-1 py-1.5 rounded-lg bg-(--accent-primary) hover:bg-(--accent-hover) text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>다운로드</span>
            </button>
            <button
              className="p-1.5 rounded-lg bg-(--bg-primary) hover:bg-rose-500/10 hover:text-rose-500 text-(--text-muted) border border-(--border-subtle) transition-colors"
              title="삭제"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
