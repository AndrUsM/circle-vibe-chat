import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";

export const SectionHeader: ExtendedReactFunctionalComponent = ({
  children,
}) => {
  return <span className="block text-3xl text-center font-bold text-bold text-primary">{children}</span>;
};
