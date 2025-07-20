
import classNames from 'classnames';
import { Button, ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import '_shared/component/styles/buttons.scss';

interface TabsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const TabsButton: ExtendedReactFunctionalComponent<TabsButtonProps> = ({ children, disabled, active }) => {
  return (
    <Button classNames={
      classNames({
        'button_state_disabled': disabled,
        'button_state-active': active
      })
    }>{children}</Button>
  )
}