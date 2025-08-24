import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { CellGroupContext } from './cell-group.context';

export const CellGroupProvider: ExtendedReactFunctionalComponent = ({ children }) => {
  return (
    <CellGroupContext.Provider
      value={{
        isHead: true,
      }}
    >
      {children}
    </CellGroupContext.Provider>
  );
};
