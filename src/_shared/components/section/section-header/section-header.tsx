import { ExtendedReactFunctionalComponent } from "@circle-vibe/components";
import classNames from "classnames";

export const SectionHeader: ExtendedReactFunctionalComponent<
  React.HTMLAttributes<HTMLSpanElement>
> = ({ children, className, ...rest }) => {
  return (
    <span
      className={classNames(
        "block text-3xl text-left font-bold text-bold text-primary",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};
