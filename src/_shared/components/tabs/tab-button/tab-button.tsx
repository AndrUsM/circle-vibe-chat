import { ExtendedReactFunctionalComponent } from "../../../types/extended-react-functional-component";

import '_shared/component/styles/buttons.scss';

interface TabsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const TabsButton: ExtendedReactFunctionalComponent<TabsButtonProps> = ({ children, disabled, active }) => {
  return (
    <button className={`base-button button_color-white button-style-emphasized ${disabled ? 'button_state_disabled' : ''} ${active ? 'button_state-active' : ''}`}>{children}</button>
  )
}