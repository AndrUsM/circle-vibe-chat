import React from "react";

import { FloatingArrow } from "@floating-ui/react";

import { useTooltip } from "../../hooks/use-tooltip/use-tooltip";
import { TooltipContent } from "./tooltip-content/tooltip-content";

import "./tooltip.scss";

interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  children?: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  ...rest
}) => {
  const { open, referenceProps, contentProps, transitionStyles } =
    useTooltip();

  if (!title) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="tooltip" {...rest} {...referenceProps}>
        {children}
      </div>

      <TooltipContent
        open={open}
        tooltipProps={contentProps}
        transitionStyles={transitionStyles}
      >
        {title}
      </TooltipContent>
    </>
  );
};
