import { useCallback, useState } from "react";
import { SortDirection } from "@circle-vibe/shared";

import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

import { TableContext } from "./table.context";

interface TableProvierProps {
  onSort: (sortingKey: string) => void;
  sortingKey: string | null;
}

export const TableProvier: ExtendedReactFunctionalComponent<
  TableProvierProps
> = ({ children, onSort }) => {
  const [sortingKey, setSortingKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(
    null
  );
  const handleSortKeyChange = useCallback(
    (updatedSortingKey: string) => {
      if (updatedSortingKey !== sortingKey) {
        setSortingKey(updatedSortingKey);
        onSort(updatedSortingKey);
      }
    },
    [sortingKey]
  );

  const toggleSortDirection = useCallback(() => {
    setSortDirection(
      sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC
    );
  }, [sortDirection]);

  return (
    <TableContext.Provider
      value={{
        onSort: handleSortKeyChange,
        toggleSortDirection,
        sortingKey,
        sortDirection,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
