import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: ExtendedReactFunctionalComponent<TableBodyProps> = ({
  children,
}) => {
  return <tbody>{children}</tbody>;
};
