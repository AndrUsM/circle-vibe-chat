import React from 'react';

import { ExtendedReactFunctionalComponent } from '../../types/extended-react-functional-component';
import './styles/tabs.scss';

export const Tabs: ExtendedReactFunctionalComponent = ({ children }) => {
  return (
    <div className="tabs-container">
      {children}
    </div>
  )
}