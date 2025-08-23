import React from "react";
import classNames from "classnames";

export interface TableEmptyRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  colSpan: number;
}

export const EmptyTableRow: React.FC<TableEmptyRowProps> = ({
  colSpan,
  className,
  ...rest
}) => {
  return (
    <tr className={classNames("w-full p-2 element_effect-hover", className)} {...rest}>
      <td colSpan={colSpan} />
    </tr>
  );
};
