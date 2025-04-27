import React, { CSSProperties } from "react";

import { FloatingPortal } from "@floating-ui/react";
import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";

interface TooltipProps {
  readonly open?: boolean;
  readonly transitionStyles: CSSProperties;
  readonly tooltipProps?: Record<string, unknown>;
}

export const TooltipContent: ExtendedReactFunctionalComponent<TooltipProps> = ({
  open,
  children,
  tooltipProps,
  transitionStyles,
  ...props
}) => {
  if (!open) {
    return null;
  }

  return (
    <FloatingPortal>
      <div
        className="tooltip-content"
        style={transitionStyles}
        {...props}
        {...tooltipProps}
      >
        {children}
      </div>
    </FloatingPortal>
  );
};
