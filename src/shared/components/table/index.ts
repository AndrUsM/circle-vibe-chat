import { Table } from './table/index.js';
import { TableBody } from './table-body/index.js';
import { TableCell } from './table-cell/index.js';
import { EmptyTableRow } from './table-empty-row/index.js';
import { TableHead } from './table-head/index.js';
import { TableRow } from './table-row/index.js';
import { TableSortCell } from './table-sort-cell/index.js';
import { TableComponent } from './types/index.js';

(Table as TableComponent).Cell = TableCell;
(Table as TableComponent).Body = TableBody;
(Table as TableComponent).EmptyCell = EmptyTableRow;
(Table as TableComponent).Head = TableHead;
(Table as TableComponent).Row = TableRow;
(Table as TableComponent).SortCell = TableSortCell;
(Table as TableComponent).Body = TableBody;

const TableCompositeComponent = Table as TableComponent;

export { TableCompositeComponent as Table };

export type { TableComponent };
