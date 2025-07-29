import { SortDirection } from "@circle-vibe/shared";

export interface ITableContext {
  onSort: (sortingKey: string) => void;
  toggleSortDirection: VoidFunction;
  sortingKey: string | null;
  sortDirection: SortDirection | null;
}
