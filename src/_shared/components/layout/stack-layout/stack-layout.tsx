import { ExtendedReactFunctionalComponent } from "@shared/types/extended-react-functional-component";
import { CustomCssVariables } from "@shared/types/custom-css-variables";

import './stack-layout.scss';

interface StackLayoutProps {
  space?: string;
  justifyContent?: string;
  alignItems?: string;
}

export const StackLayout: ExtendedReactFunctionalComponent<StackLayoutProps> = ({
  children,
  alignItems = 'initial',
  justifyContent = 'initial',
  space = '1rem'
}) => (
  <div className="stack-layout" style={{
    '--space': space,
    '--justify-content': justifyContent,
    '--align-items': alignItems
  } as CustomCssVariables}>{children}</div>
)

