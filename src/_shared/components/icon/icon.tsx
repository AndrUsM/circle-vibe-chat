import { CustomCssVariables } from "@circle-vibe/shared";
import CIcon from "@coreui/icons-react";
import classNames from "classnames";

import React from "react";

// https://coreui.io/icons/

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly name: any;
  readonly size?: number;
  readonly className?: string;
  readonly color?: string;
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ name, color, className, size = 10, ...iconAttributes }, ref) => {
    return (
      <div ref={ref} {...iconAttributes}>
        <CIcon
          icon={name}
          size={"custom-size"}
          height={size}
          width={size}
          color={color ?? "var(--cv-base)"}
        />
      </div>
    );
  }
);

Icon.displayName = "Icon";
