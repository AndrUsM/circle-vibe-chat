import { useState } from "react";
import {
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import {
  DEFAULT_MIDDLEWARE,
  DROPDOWN_ANIMATION_IN_BOTTOM_POSITION,
} from "@shared/constants";

export interface UseTooltipOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const useTooltip = (options?: UseTooltipOptions) => {
  const [open, setIsOpen] = useState(options?.open ?? false);
  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    transform: true,
    open,
    onOpenChange: options?.onOpenChange ?? setIsOpen,
    strategy: "fixed",
    middleware: DEFAULT_MIDDLEWARE,
    ...options,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useClick(context),
    useHover(context),
  ]);
  const { setReference, setFloating } = refs;
  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    context,
    DROPDOWN_ANIMATION_IN_BOTTOM_POSITION
  );

  return {
    open,
    referenceProps: {
      ref: setReference,
      ...getReferenceProps,
    },
    contentProps: {
      open: isMounted,
      ref: setFloating,
      ...getFloatingProps,
      style: floatingStyles,
    },
    transitionStyles,
  };
};
