import { noop } from '@circle-vibe/shared';
import React from 'react';

export interface MenuContextApi {
  closeMenu?: VoidFunction;
}

export const MenuContext = React.createContext<MenuContextApi>({
  closeMenu: noop,
});
