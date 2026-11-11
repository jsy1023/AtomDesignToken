import React from 'react';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = '', children, ...props }, ref) => (
    <div className="w-full overflow-auto rounded-(--radius) border border-(--border-subtle)">
      <table
        ref={ref}
        className={`w-full caption-bottom text-xs text-left ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => (
  <thead
    ref={ref}
    className={`bg-(--bg-secondary)/60 border-b border-(--border-subtle) font-semibold text-(--text-secondary) ${className}`}
    {...props}
  >
    {children}
  </thead>
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', children, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`divide-y divide-(--border-subtle) bg-(--bg-primary) ${className}`}
    {...props}
  >
    {children}
  </tbody>
));
TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className = '', children, ...props }, ref) => (
  <tr
    ref={ref}
    className={`hover:bg-(--bg-secondary)/40 transition-colors ${className}`}
    {...props}
  >
    {children}
  </tr>
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className = '', children, ...props }, ref) => (
  <th
    ref={ref}
    className={`p-3 text-left font-medium text-(--text-secondary) ${className}`}
    {...props}
  >
    {children}
  </th>
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className = '', children, ...props }, ref) => (
  <td
    ref={ref}
    className={`p-3 text-(--text-primary) align-middle ${className}`}
    {...props}
  >
    {children}
  </td>
));
TableCell.displayName = 'TableCell';
