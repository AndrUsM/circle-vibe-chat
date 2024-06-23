export interface CustomCssVariables extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}
