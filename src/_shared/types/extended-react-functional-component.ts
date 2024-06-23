import React from "react";

export type ExtendedReactFunctionalComponent<T> = React.FC<
  T & {
    children?: React.ReactNode;
  }
>;
