import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";

interface TableHeadProps {
  children: React.ReactNode;
}

export const TableHead: ExtendedReactFunctionalComponent<TableHeadProps> = ({
  children,
}) => {
  return <thead>{children}</thead>;
};
