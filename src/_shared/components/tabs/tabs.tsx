import { ExtendedReactFunctionalComponent } from '@circle-vibe/shared';

import './styles/tabs.scss';

export const Tabs: ExtendedReactFunctionalComponent = ({ children }) => {
  return (
    <div className="tabs-container">
      {children}
    </div>
  )
}