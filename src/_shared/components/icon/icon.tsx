import {
  CustomCssVariables,
} from "@circle-vibe/shared";

import React from "react";
import classNames from "classnames";

import "./icon.scss";

type ReactComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly name: string;
  readonly size?: string;
  readonly color?: string;
}

export const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ name, size, color, className, ...iconAttributes }, ref) => {
    const isMounted = React.useRef(true);
    const [IconSVG, setIcon] = React.useState<ReactComponent | null>(null);

    React.useEffect(() => {
      isMounted.current = true;

      import(`@material-ui/icons`)
        .then((icons) => {
          const icon = icons[name] ?? null;

          if (isMounted.current) {
            setIcon(() => icon);
          }
        })
        .catch(() => {
          console.error(`Could not find icon "${name}".`);

          if (isMounted.current) {
            setIcon(null);
          }
        });

      return () => {
        isMounted.current = false;
      };
    }, [name]);

    return (
      <span
        ref={ref}
        className={classNames("icon inline-block", className)}
        style={
          {
            "--vs-icon-size": size,
          } as CustomCssVariables
        }
        {...iconAttributes}
      >
        {IconSVG && <IconSVG color={color ?? "var(--cv-base)"} />}
      </span>
    );
  }
);

Icon.displayName = "Icon";
