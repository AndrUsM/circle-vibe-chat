import {
  ExtendedReactFunctionalComponent,
  noop,
} from "@circle-vibe/components";

import { TableProvier } from "../context";

interface TableProps {
  children: React.ReactNode;
  onSort?: (sortingKey: string) => void;
  sortingKey?: string;
}

export const Table: ExtendedReactFunctionalComponent<TableProps> = ({
  children,
  onSort = noop,
  sortingKey = null,
}) => {
  return (
    <TableProvier onSort={onSort} sortingKey={sortingKey}>
      <table>{children}</table>
    </TableProvier>
  );
};
