import {
  ExtendedReactFunctionalComponent,
  noop,
} from "@circle-vibe/components";

import { TableProvider } from "../context";
import classNames from "classnames";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  onSort?: (sortingKey: string) => void;
  sortingKey?: string;
}

export const Table: ExtendedReactFunctionalComponent<TableProps> = ({
  children,
  onSort = noop,
  sortingKey = null,
  className,
  ...rest
}) => {
  return (
    <TableProvider onSort={onSort} sortingKey={sortingKey}>
      <table className={classNames("text-center", className)} {...rest}>
        {children}
      </table>
    </TableProvider>
  );
};
