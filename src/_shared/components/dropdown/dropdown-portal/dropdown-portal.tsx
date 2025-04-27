import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";
import { FloatingOverlay, FloatingPortal } from "@floating-ui/react";

import "./dropdown-portal.scss";
import classNames from "classnames";

interface DropdownPortalProps {
  useOverlayDarkenBackground?: boolean;
}

export const DropdownPortal: ExtendedReactFunctionalComponent<
  DropdownPortalProps
> = ({ children, useOverlayDarkenBackground = false }) => {
  return (
    <FloatingPortal>
      <FloatingOverlay
        className={classNames({
          "floating-overlay": useOverlayDarkenBackground,
        })}
        lockScroll
      />

      {children}
    </FloatingPortal>
  );
};
