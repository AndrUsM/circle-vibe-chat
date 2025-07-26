import { createContext } from "react";

import { noop } from "@circle-vibe/components";

import { ITableContext } from "./table.context.interface";

export const TableContext = createContext<ITableContext>({
  onSort: noop,
  toggleSortDirection: noop,
  sortingKey: null,
  sortDirection: null
});
