import { ExtendedReactFunctionalComponent, noop } from '@circle-vibe/components';

import classNames from 'classnames';

import { TableProvider } from '../context';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  onSort?: (sortingKey: string) => void;
  sortingKey?: string;
}

export const Table: ExtendedReactFunctionalComponent<TableProps> = ({
  children,
  onSort = noop,
  sortingKey = null,
  className,
  ...rest
}) => {
  return (
    <TableProvider onSort={onSort} sortingKey={sortingKey}>
      <table className={classNames('text-center', className)} {...rest}>
        {children}
      </table>
    </TableProvider>
  );
};
