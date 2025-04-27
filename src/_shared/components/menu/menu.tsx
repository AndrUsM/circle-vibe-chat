import React from "react";
import { Placement } from "@floating-ui/react";
import classNames from "classnames";

import { useDropdown } from "src/hooks";
import { MenuContext } from "./menu.context";
import { MenuButtonProps } from "./types/menu-button-props";
import { Dropdown } from "../dropdown";

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly button: (props: MenuButtonProps) => React.ReactNode;
  readonly isOpen?: boolean;
  readonly fullDropdownWidth?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly dropdownPlacement?: Placement;
  readonly zIndex?: number;
  readonly strategy?: "fixed" | "absolute";
}

export const Menu: React.FC<DropdownMenuProps> = ({
  button,
  isOpen,
  fullDropdownWidth = false,
  onOpenChange,
  dropdownPlacement = "bottom-end",
  zIndex = 10,
  strategy = "absolute",
  children,
  ...divAttributes
}) => {
  const {
    referenceProps,
    open,
    dropdownProps,
    setDropdownStatus,
    transitionStyles,
  } = useDropdown({
    strategy,
    placement: dropdownPlacement,
    ...(isOpen !== undefined && onOpenChange
      ? { open: isOpen, onOpenChange }
      : {}),
  });

  const closeMenu = () => {
    if (!onOpenChange) {
      return;
    }

    setDropdownStatus(false);
  };

  return (
    <MenuContext.Provider value={{ closeMenu }}>
      <div
        className={classNames("relative", ...(divAttributes?.className ?? ""))}
        {...divAttributes}
      >
        <div className="w-fit" {...referenceProps}>
          {button({
            active: open,
          })}
        </div>

        <Dropdown
          open={open}
          dropdownProps={dropdownProps}
          transitionStyles={transitionStyles}
          zIndex={zIndex}
          fullDropdownWidth={fullDropdownWidth}
        >
          {children}
        </Dropdown>
      </div>
    </MenuContext.Provider>
  );
};
