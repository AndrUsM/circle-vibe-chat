import React from "react";

export type ExtendedReactFunctionalComponent<
  T = React.HTMLAttributes<HTMLDivElement>
> = React.FC<
  T & {
    children?: React.ReactNode;
  }
>;
