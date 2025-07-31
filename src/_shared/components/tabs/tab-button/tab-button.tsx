import {
  Button,
  ExtendedReactFunctionalComponent,
} from "@circle-vibe/components";

interface TabsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const TabsButton: ExtendedReactFunctionalComponent<TabsButtonProps> = ({
  children,
  disabled,
  active,
  ...rest
}) => {
  return (
    <Button color={active && !disabled ? "primary" : "secondary"} {...rest}>
      {children}
    </Button>
  );
};
