import { ExtendedReactFunctionalComponent, StackLayout } from '@circle-vibe/components';

import classNames from 'classnames';

export const Section: ExtendedReactFunctionalComponent = ({ className, children, ...rest }) => {
  return (
    <StackLayout space='1rem' className={classNames('p-4 rounded-2', className)} {...rest}>
      {children}
    </StackLayout>
  );
};
