import { ExtendedReactFunctionalComponent } from "@shared/types/extended-react-functional-component";

import './centered-vertial-layout.scss';
import { CustomCssVariables } from "@shared/types/custom-css-variables";

interface CenteredVertialLayoutProps {
  space?: string;
  justifyContent?: string;
}

export const CenteredVertialLayout: ExtendedReactFunctionalComponent<CenteredVertialLayoutProps> = ({
  space = 'initial',
  justifyContent = 'initial',
  children
}) => (
  <div className="centered-vertial-layout" style={{
    '--space': space,
    '--justify-content': justifyContent
  } as CustomCssVariables}>{children}</div>
)