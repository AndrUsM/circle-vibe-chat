import { useState } from "react";
import {
  autoUpdate,
  Placement,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import {
  DEFAULT_MIDDLEWARE,
  DROPDOWN_ANIMATION_IN_BOTTOM_POSITION,
} from "@shared/constants";

export interface UsePopoverOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
}

export const usePopover = (options?: UsePopoverOptions) => {
  const [open, onOpenChange] = useState(options?.open ?? false);
  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    transform: true,
    strategy: "fixed",
    middleware: DEFAULT_MIDDLEWARE,
    ...(options?.open !== undefined && options.onOpenChange
      ? { ...options }
      : { open, onOpenChange }),
    ...options,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
    useClick(context),
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
      ...getReferenceProps(),
    },
    contentProps: {
      open: isMounted,
      ref: setFloating,
      ...getFloatingProps(),
      style: floatingStyles,
    },
    setStatus: onOpenChange,
    transitionStyles,
  };
};
