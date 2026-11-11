import React, { useState } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  selectedId?: string;
  onSelect?: (node: TreeNode) => void;
  defaultExpandedIds?: string[];
  className?: string;
}

export const Tree: React.FC<TreeProps> = ({
  data,
  selectedId,
  onSelect,
  defaultExpandedIds = [],
  className = '',
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedId);

  const activeSelectedId = selectedId !== undefined ? selectedId : internalSelectedId;

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelect = (node: TreeNode) => {
    if (node.disabled) return;
    setInternalSelectedId(node.id);
    if (onSelect) {
      onSelect(node);
    }
  };

  const renderNodes = (nodes: TreeNode[]) => {
    return (
      <ul className="atom-tree-list" role="group">
        {nodes.map((node) => {
          const hasChildren = Boolean(node.children && node.children.length > 0);
          const isExpanded = expandedIds.includes(node.id);
          const isSelected = activeSelectedId === node.id;

          return (
            <li
              key={node.id}
              className="atom-tree-item"
              role="treeitem"
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={isSelected}
              aria-disabled={node.disabled}
            >
              <div
                className={`atom-tree-node ${isSelected ? 'is-selected' : ''} ${
                  node.disabled ? 'is-disabled' : ''
                }`}
                onClick={() => {
                  if (hasChildren && !isExpanded) {
                    setExpandedIds((prev) => [...prev, node.id]);
                  }
                  handleSelect(node);
                }}
                tabIndex={node.disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (hasChildren) {
                      setExpandedIds((prev) =>
                        prev.includes(node.id)
                          ? prev.filter((item) => item !== node.id)
                          : [...prev, node.id]
                      );
                    }
                    handleSelect(node);
                  }
                }}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    className={`atom-tree-toggle ${isExpanded ? 'is-expanded' : ''}`}
                    onClick={(e) => toggleExpand(node.id, e)}
                    aria-label={isExpanded ? '접기' : '펼치기'}
                    tabIndex={-1}
                  >
                    ▶
                  </button>
                ) : (
                  <span className="atom-tree-toggle-spacer" aria-hidden="true" />
                )}

                {node.icon && <span className="atom-tree-icon">{node.icon}</span>}
                <span className="atom-tree-label">{node.label}</span>
              </div>

              {hasChildren && isExpanded && (
                <div className="atom-tree-children">{renderNodes(node.children!)}</div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={`atom-tree ${className}`} role="tree">
      {renderNodes(data)}
    </div>
  );
};
