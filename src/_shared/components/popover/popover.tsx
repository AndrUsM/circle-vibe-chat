import { CSSProperties } from "react";

import { FloatingPortal } from "@floating-ui/react";

import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";

import './popover.scss';

interface PopoverProps {
  readonly open?: boolean;
  readonly transitionStyles: CSSProperties;
  readonly tooltipProps?: Record<string, unknown>;
}

export const Popover: ExtendedReactFunctionalComponent<PopoverProps> = ({
  transitionStyles,
  tooltipProps,
  open,
  children,
  ...props
}) => {
  if (!open) {
    return null;
  }

  return (
    <FloatingPortal>
      <div
        className="bg-light text-default p-2 w-max rounded-1 text-xs popover"
        style={transitionStyles}
        {...props}
        {...tooltipProps}
      >
        {children}
      </div>
    </FloatingPortal>
  );
};
