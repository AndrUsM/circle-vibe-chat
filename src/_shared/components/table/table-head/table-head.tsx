import React from "react";
import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

import { CellGroupProvider } from "../context";

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

export const TableHead: ExtendedReactFunctionalComponent<TableHeadProps> = ({
  children,
  ...rest
}) => {
  return (
    <CellGroupProvider>
      <thead {...rest}>{children}</thead>
    </CellGroupProvider>
  );
};
