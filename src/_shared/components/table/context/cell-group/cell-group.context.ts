import { createContext } from 'react';

import { ICellGroupContext } from './cell-group.context.interface';

export const CellGroupContext = createContext<ICellGroupContext>({
  isHead: false,
});
