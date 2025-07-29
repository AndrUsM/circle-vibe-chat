import { useContext } from "react";
import classNames from "classnames";

import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

import { CellGroupContext } from "../context";

export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
  head?: boolean;
}

export const TableCell: ExtendedReactFunctionalComponent<TableCellProps> = ({
  children,
  head = false,
  className,
  ...rest
}) => {
  const { isHead } = useContext(CellGroupContext);

  if (isHead) {
    return (
      <th className={classNames("p-2", className)} {...rest}>
        {children}
      </th>
    );
  }

  return (
    <td className={classNames("p-2", className)} {...rest}>
      {children}
    </td>
  );
};
