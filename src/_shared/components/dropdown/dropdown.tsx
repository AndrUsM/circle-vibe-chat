import { StyleHTMLAttributes } from "react";
import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";
import { DropdownPortal } from "./dropdown-portal/dropdown-portal";

import "./dropdown.scss";

interface DropdownProps {
  readonly open?: boolean;
  readonly withOverlay?: boolean;
  readonly useOverlayDarkenBackground?: boolean;
  readonly transitionStyles?: StyleHTMLAttributes<HTMLDivElement>;
  readonly dropdownProps?: Record<string, unknown>;
  readonly zIndex?: number;
  readonly fullDropdownWidth?: boolean;
}

export const Dropdown: ExtendedReactFunctionalComponent<DropdownProps> = ({
  open,
  children,
  dropdownProps,
  transitionStyles,
  useOverlayDarkenBackground,
  zIndex = 10,
  fullDropdownWidth = false,
  ...props
}) => {
  if (!open) {
    return null;
  }

  return (
    <DropdownPortal useOverlayDarkenBackground={useOverlayDarkenBackground}>
      <div
        style={{
          zIndex: open ? zIndex : 1,
          width: fullDropdownWidth ? "100%" : "auto",
          ...transitionStyles,
        }}
        {...props}
        {...dropdownProps}
      >
        <div className="dropdown p-3 flex">{children}</div>
      </div>
    </DropdownPortal>
  );
};
