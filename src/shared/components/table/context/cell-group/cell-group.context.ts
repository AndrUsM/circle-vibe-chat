import { createContext } from 'react';

import { ICellGroupContext } from './cell-group.context.interface.js';

export const CellGroupContext = createContext<ICellGroupContext>({
  isHead: false,
});
