import { Table } from "./table";
import { TableBody } from "./table-body";
import { TableCell } from "./table-cell";
import { EmptyTableRow } from "./table-empty-row";
import { TableHead } from "./table-head";
import { TableRow } from "./table-row";
import { TableSortCell } from "./table-sort-cell";

import { TableComponent } from "./types";

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
