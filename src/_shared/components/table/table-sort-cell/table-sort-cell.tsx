import { SyntheticEvent, useContext } from "react";
import classNames from "classnames";

import { SortDirection } from "@circle-vibe/shared";
import {
  Button,
  CenteredVertialLayout,
  ExtendedReactFunctionalComponent,
  Icon,
  StackLayout,
  useIcons,
} from "@circle-vibe/components";

import { TableContext } from "../context/table";

export interface TableSortCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  sortingKey: string;
}

export const TableSortCell: ExtendedReactFunctionalComponent<
  TableSortCellProps
> = ({ children, sortingKey, className, ...rest }) => {
  const { cilSortDescending, cilSortAscending } = useIcons();
  const {
    onSort,
    sortingKey: currentSortingKey,
    sortDirection,
  } = useContext(TableContext);

  const handleSort = (e: SyntheticEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    onSort(sortingKey);
  };
  return (
    <th
      onClick={handleSort}
      className={classNames("element_effect-hover cursor-pointer", className)}
      {...rest}
    >
      <CenteredVertialLayout>
        {children}

        <StackLayout>
          <Button
            size="small"
            color={sortingKey === currentSortingKey ? "primary" : "secondary"}
            className="font-bold"
          >
            <Icon
              name={
                sortDirection === SortDirection.ASC
                  ? cilSortAscending
                  : cilSortDescending
              }
              color="var(--color-primary)"
            />
          </Button>
        </StackLayout>
      </CenteredVertialLayout>
    </th>
  );
};
