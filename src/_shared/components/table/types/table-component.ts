import React from "react";

import { TableProps } from "../table";
import { TableBodyProps } from "../table-body";
import { TableCellProps } from "../table-cell";
import { TableEmptyRowProps } from "../table-empty-row";
import { TableHeadProps } from "../table-head";
import { TableRowProps } from "../table-row";
import { TableSortCellProps } from "../table-sort-cell";

export interface TableComponent extends React.FC<TableProps>  {
  Head: React.FC<TableHeadProps>;
  Body: React.FC<TableBodyProps>;
  Row: React.FC<TableRowProps>;
  Cell: React.FC<TableCellProps>;
  SortCell: React.FC<TableSortCellProps>;
  EmptyCell: React.FC<TableEmptyRowProps>;
}