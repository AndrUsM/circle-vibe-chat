import { UseTransitionStylesProps } from "@floating-ui/react";

export const DROPDOWN_ANIMATION_IN_BOTTOM_POSITION: UseTransitionStylesProps = {
  initial: {
    opacity: 0,
    display: "flex",
    transform: "perspective(25rem) rotateX(-15deg)",
  },
  duration: 250,
  open: {
    opacity: 1,
    transform: "perspective(25rem) rotateX(0deg)",
  },
  close: {
    opacity: 0,
    transform: "perspective(25rem) rotateX(-15deg)",
  },
  common: {
    transformOrigin: "top center",
  },
};
