import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

export interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: ExtendedReactFunctionalComponent<TableBodyProps> = ({
  children,
  ...rest
}) => {
  return <tbody {...rest}>{children}</tbody>;
};
