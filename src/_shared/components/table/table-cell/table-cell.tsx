import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

interface TableBodyProps {
  children: React.ReactNode;
  head?: boolean;
}

export const TableCell: ExtendedReactFunctionalComponent<TableBodyProps> = ({
  children,
  head = false,
}) => {
  if (head) {
    return <th>{children}</th>;
  }

  return <td>{children}</td>;
};
