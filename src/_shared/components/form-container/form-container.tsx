import { CustomCssVariables } from "../../types/custom-css-variables";
import { ExtendedReactFunctionalComponent } from "../../types/extended-react-functional-component";

import "./form-container.scss";

interface FormContainerProps {
  background?: string;
  textColor?: string;
  direction?: string;
  space?: string;
  boxRadius?: string;
  itemsAlignment?: string;
}

export const FormContainer: ExtendedReactFunctionalComponent<FormContainerProps> = ({
  background = 'var(--chat-var-color-white)',
  textColor = 'var(--chat-var-default-text-color)',
  itemsAlignment = 'flex-start',
  direction = 'row',
  space = 'var(--chat-var-default-form-gap)',
  boxRadius = 'var(--chat-var-default-elements-border-radius)',
  children,
}) => {
  return (
    <div className="form-container" style={{
      '--form-container-background': background,
      '--form-container-text-color': textColor,
      '--form-container-direction': direction,
      '--form-container-space': space,
      '--form-container-box-radius': boxRadius,
      '--form-container-items-alignment': itemsAlignment
    } as CustomCssVariables}>{children}</div>
  )
}
