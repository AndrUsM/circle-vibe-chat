import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

interface TableRowProps {
  children: React.ReactNode;
}

export const TableRow: ExtendedReactFunctionalComponent<TableRowProps> = ({
  children,
}) => {
  return <tr>{children}</tr>;
};
