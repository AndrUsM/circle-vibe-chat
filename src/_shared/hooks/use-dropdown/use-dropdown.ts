import { StyleHTMLAttributes, useState } from "react";
import {
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react";
import { DROPDOWN_ANIMATION_IN_BOTTOM_POSITION } from "@shared/constants";
import { DEFAULT_MIDDLEWARE } from "../../constants/default-middleware";

export interface UseDropdownOptions {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const useDropdown = (options?: UseDropdownOptions) => {
  const [open, setIsOpen] = useState(options?.open ?? false);
  const onOpenChange = options?.onOpenChange ?? setIsOpen;
  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    transform: true,
    open: options?.open ?? open,
    onOpenChange: onOpenChange,
    strategy: "fixed",
    middleware: DEFAULT_MIDDLEWARE,
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
      ...getReferenceProps,
    },
    contentProps: {
      open: isMounted,
      ref: setFloating,
      ...getFloatingProps,
      style: floatingStyles,
    },
    setStatus: onOpenChange,
    transitionStyles: transitionStyles as StyleHTMLAttributes<HTMLDivElement>,
  };
};
