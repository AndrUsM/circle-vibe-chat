import React from 'react';

import { TableProps } from '../table/index.js';
import { TableBodyProps } from '../table-body/index.js';
import { TableCellProps } from '../table-cell/index.js';
import { TableEmptyRowProps } from '../table-empty-row/index.js';
import { TableHeadProps } from '../table-head/index.js';
import { TableRowProps } from '../table-row/index.js';
import { TableSortCellProps } from '../table-sort-cell/index.js';

export interface TableComponent extends React.FC<TableProps> {
  Head: React.FC<TableHeadProps>;
  Body: React.FC<TableBodyProps>;
  Row: React.FC<TableRowProps>;
  Cell: React.FC<TableCellProps>;
  SortCell: React.FC<TableSortCellProps>;
  EmptyCell: React.FC<TableEmptyRowProps>;
}
