
import { ExtendedReactFunctionalComponent } from '@shared/types/extended-react-functional-component';

export const Label: ExtendedReactFunctionalComponent = ({ children }) => {
  return (
    <div>
      <span>{children}</span>
    </div>
  )
}
