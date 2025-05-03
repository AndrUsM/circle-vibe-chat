import { StyleHTMLAttributes, useState } from "react";
import {
  AlignedPlacement,
  autoUpdate,
  Side,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
  Placement,
} from "@floating-ui/react";
import { DROPDOWN_ANIMATION_IN_BOTTOM_POSITION } from "@shared/constants";
import { DEFAULT_MIDDLEWARE } from "../../constants/default-middleware";

export interface UseDropdownOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
}

export const useDropdown = (options?: UseDropdownOptions) => {
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
    open: isMounted,
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
    transitionStyles: transitionStyles as StyleHTMLAttributes<HTMLDivElement>,
  };
};
