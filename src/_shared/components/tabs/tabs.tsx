import classNames from "classnames";

import {
  CenteredVertialLayout,
  ExtendedReactFunctionalComponent,
  HorizontalDivider,
  StackLayout,
} from "@circle-vibe/components";

export const Tabs: ExtendedReactFunctionalComponent &
  React.HtmlHTMLAttributes<HTMLDivElement> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <StackLayout space="0.25rem">
      <CenteredVertialLayout
        space="0.25rem"
        className={classNames("rounded-2", className)}
        {...rest}
      >
        {children}
      </CenteredVertialLayout>

      <HorizontalDivider color="var(--cv-secondary)" height="3px" />
    </StackLayout>
  );
};
