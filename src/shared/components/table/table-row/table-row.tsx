import React from 'react';

import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export const TableRow: ExtendedReactFunctionalComponent<TableRowProps> = ({
  children,
  ...rest
}) => {
  return <tr {...rest}>{children}</tr>;
};
